/**
 * Cross-checks the hand-authored datasets against JMdict, via the Jisho API.
 *
 *   npm run check:data            # the vocabulary deck
 *   npm run check:data counters   # counters, dates and times
 *   npm run check:data kanjivocab # the kanji deck's example words
 *   npm run check:data verbs      # conjugation classes, against the POS tags
 *
 * This only ever reads. Nothing fetched here is written into the repository,
 * so the CC-BY-SA question that kept JMdict out of the data files does not
 * arise: it is a reference being consulted, not a source being redistributed.
 * Responses are cached under node_modules/.cache so re-runs are free.
 *
 * Three kinds of finding, and only the second is necessarily a bug:
 *
 *   No entry written that way  — usually a compositional form the dictionary
 *                                does not list (七台, 六千), so unverifiable
 *                                rather than wrong.
 *   Reading disagrees          — a real error. Investigate every one.
 *   Meaning not corroborated   — often just our simpler learner gloss, but
 *                                worth reading: it also catches glosses too
 *                                unusual for anyone to type.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { ALL_COUNTERS } from '../src/data/counters';
import { ALL_KANJI } from '../src/data/kanji';
import { ALL_WORDS } from '../src/data/words';
import { ALL_ADJECTIVES, ALL_VERBS } from '../src/data/conjugation';

const CACHE = process.argv[3] ?? `node_modules/.cache/jisho-${process.argv[2] ?? 'words'}.json`;
const WHICH = process.argv[2] ?? 'words';
const PAUSE_MS = 350;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface JishoEntry {
  japanese: { word?: string; reading?: string }[];
  senses: { english_definitions: string[]; parts_of_speech: string[] }[];
}

const cache: Record<string, JishoEntry[]> = existsSync(CACHE)
  ? JSON.parse(readFileSync(CACHE, 'utf8'))
  : {};

async function lookup(term: string): Promise<JishoEntry[]> {
  if (cache[term]) return cache[term];
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(
        `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(term)}`,
        { headers: { 'User-Agent': 'JapanLearner dataset check (one-off)' } },
      );
      if (res.ok) {
        const json = (await res.json()) as { data: JishoEntry[] };
        cache[term] = json.data ?? [];
        await sleep(PAUSE_MS);
        return cache[term];
      }
    } catch {
      /* fall through to retry */
    }
    await sleep(1500 * (attempt + 1));
  }
  throw new Error(`lookup failed for ${term}`);
}

/** Strip the things that should not decide whether two glosses agree. */
const norm = (s: string): string =>
  s
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9 ]/g, ' ')
    .replace(/\b(to|the|a|an|one|s)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const overlaps = (mine: string, theirs: string[]): boolean => {
  const m = norm(mine);
  if (!m) return false;
  return theirs.some((t) => {
    const n = norm(t);
    if (!n) return false;
    if (n === m) return true;
    // Accept a gloss that contains ours as a whole phrase, or vice versa.
    return ` ${n} `.includes(` ${m} `) || ` ${m} `.includes(` ${n} `);
  });
};

type Item = { form: string; reading: string; meanings: string[]; kind: string };

const items: Item[] =
  WHICH === 'kanjivocab'
    ? ALL_KANJI.flatMap((k) =>
        k.vocab.map((v) => ({
          form: v.word,
          reading: v.reading,
          meanings: [v.meaning],
          kind: 'vocab',
        })),
      )
    : WHICH === 'counters'
    ? ALL_COUNTERS.map((c) => ({
        form: c.form,
        reading: c.reading,
        meanings: [c.meaning],
        kind: 'counter',
      }))
    : ALL_WORDS.map((w) => ({
        form: w.word,
        reading: w.reading,
        meanings: w.meanings,
        kind: w.kind,
      }));

/**
 * The conjugation deck is a special case: what needs checking is not the
 * reading but the class, and JMdict states it outright in parts_of_speech.
 * Get this wrong and every form the rules derive from it is wrong too.
 */
if (WHICH === 'verbs') {
  const wrong: string[] = [];
  const unknown: string[] = [];

  const classify = (pos: string[]): string | null => {
    const all = pos.join(' | ');
    // Order matters: 行く is tagged "Godan verb - Iku/Yuku special class",
    // which is a godan verb with one exception, not an irregular one.
    if (/Suru verb|Kuru verb/i.test(all)) return 'irregular';
    if (/Ichidan verb/i.test(all)) return 'ichidan';
    if (/Godan verb/i.test(all)) return 'godan';
    if (/I-adjective/i.test(all)) return 'i';
    if (/Na-adjective|adjectival noun/i.test(all)) return 'na';
    return null;
  };

  const targets = [
    ...ALL_VERBS.map((v) => ({ word: v.word, reading: v.reading, ours: v.verbClass })),
    ...ALL_ADJECTIVES.map((a) => ({ word: a.word, reading: a.reading, ours: a.adjectiveClass })),
  ];

  let n = 0;
  for (const t of targets) {
    const results = await lookup(t.word);
    const entry = results.find((r) =>
      r.japanese.some((j) => j.word === t.word || j.reading === t.word),
    );
    const tags = entry?.senses.flatMap((sense) => sense.parts_of_speech) ?? [];
    const theirs = classify(tags);

    // 行く carries its own special-class tag but conjugates as godan apart
    // from the て-form, which the data already overrides.
    const ours = t.word === '行く' ? 'godan' : t.ours;

    if (theirs === null) unknown.push(`${t.word} — no class in "${tags.join(', ')}"`);
    else if (theirs !== ours) {
      wrong.push(`${t.word} (${t.reading}): ours "${ours}", dictionary says "${theirs}" [${tags.slice(0, 3).join(', ')}]`);
    }
    n += 1;
    if (n % 25 === 0) {
      process.stderr.write(`  ...${n}/${targets.length}
`);
      writeFileSync(CACHE, JSON.stringify(cache));
    }
  }

  writeFileSync(CACHE, JSON.stringify(cache));
  console.log(`
Checked ${targets.length} conjugation classes against JMdict.`);
  console.log(`
### Class disagrees (${wrong.length})`);
  for (const line of wrong) console.log(`  ${line}`);
  console.log(`
### No class stated (${unknown.length})`);
  for (const line of unknown) console.log(`  ${line}`);
  console.log(`
clean: ${targets.length - wrong.length - unknown.length}/${targets.length}`);
  process.exit(wrong.length ? 1 : 0);
}

const missing: string[] = [];
const readingIssues: string[] = [];
const meaningIssues: string[] = [];

let done = 0;
for (const item of items) {
  const results = await lookup(item.form);

  // The entry whose written form is exactly what we show on the card.
  const isForm = (j: { word?: string; reading?: string }) =>
    j.word === item.form || j.reading === item.form;
  const matches = results.filter((r) => r.japanese.some(isForm));

  if (!matches.length) {
    missing.push(`${item.form} (${item.reading}) — no dictionary entry written that way`);
  } else {
    const readings = matches.flatMap((r) =>
      r.japanese.filter(isForm).map((j) => j.reading ?? j.word ?? ''),
    );
    if (!readings.includes(item.reading)) {
      readingIssues.push(
        `${item.form}: ours "${item.reading}", dictionary has ${[...new Set(readings)]
          .map((r) => `"${r}"`)
          .join(', ')}`,
      );
    }

    const glosses = matches
      .flatMap((r) => r.senses)
      .filter((s) => !s.parts_of_speech.some((p) => /Wikipedia|Other forms/i.test(p)))
      .flatMap((s) => s.english_definitions);
    if (!item.meanings.some((m) => overlaps(m, glosses))) {
      meaningIssues.push(
        `${item.form} (${item.reading}): ours "${item.meanings.join(
          ' / ',
        )}", dictionary has "${glosses.slice(0, 6).join(', ')}"`,
      );
    }
  }

  done += 1;
  if (done % 25 === 0) {
    process.stderr.write(`  ...${done}/${items.length}\n`);
    writeFileSync(CACHE, JSON.stringify(cache));
  }
}

writeFileSync(CACHE, JSON.stringify(cache));

const section = (title: string, lines: string[]) => {
  console.log(`\n### ${title} (${lines.length})`);
  for (const line of lines) console.log(`  ${line}`);
};

console.log(`\nChecked ${items.length} ${WHICH} against JMdict.`);
section('No entry written that way', missing);
section('Reading disagrees', readingIssues);
section('Meaning not corroborated', meaningIssues);
console.log(
  `\nclean: ${items.length - missing.length - readingIssues.length - meaningIssues.length}/${
    items.length
  }`,
);
