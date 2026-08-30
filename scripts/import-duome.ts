/**
 * Builds the Duolingo deck's dataset from duome.eu.
 *
 *   npm run import:duolingo
 *
 * Duolingo's Japanese course has no word list of its own, which is the whole
 * reason this deck exists: you can be forty units in with no way to go back
 * over the vocabulary you were taught in unit three. duome.eu mirrors the
 * course's word list per unit, in each source language it is offered in, so
 * both of ours come from the same place and line up unit for unit.
 *
 * Two pages are fetched, English and Dutch. Their unit hashes are identical
 * and in the same order, so a word's Dutch gloss is a lookup rather than a
 * guess, and a unit's name and goal arrive in both languages together.
 *
 * The hard part is readings. duome prints a romanisation, but for anything
 * written with kanji it is pinyin — 読みます comes out "dumimasu", 肉 "rou" —
 * so it is worse than useless and is dropped on sight. Readings are resolved
 * in three passes instead, in descending order of confidence:
 *
 *   written in kana already   the word is its own reading, and most of the
 *                             course is written that way
 *   JMdict has it verbatim    an entry whose written form is exactly ours;
 *                             anything looser risks 人 as じん where the
 *                             course means ひと
 *   a ます-form of a verb      the course teaches 食べます long before 食べる,
 *                             so the dictionary form is looked up and put
 *                             back through this app's own conjugation rules.
 *                             A candidate is accepted only if conjugating it
 *                             reproduces our written form character for
 *                             character, which is what stops 見ます matching
 *                             見すます
 *
 * Whatever is left — mostly phrases with a particle in the middle, メールを
 * 読みます and friends — keeps an empty reading. That is not a failure: the
 * card builder gives those entries meaning and recall cards and no reading or
 * listening card, exactly as it already does for the kana-only words in the
 * N5 deck.
 *
 * Nothing here runs in the app. Responses are cached under node_modules/.cache
 * so a re-run is free, and duome is asked for its two pages thirty seconds
 * apart, which is the crawl delay its robots.txt asks for.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { conjugateVerb, type VerbClass } from '../src/lib/conjugate';

const CACHE_DIR = 'node_modules/.cache';
const OUT = 'src/data/duolingo.generated.ts';
const PAUSE_MS = 350;

const PAGES = {
  en: 'https://duome.eu/vocabulary/en/ja/skills',
  nl: 'https://duome.eu/vocabulary/dn/ja/skills',
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true });

// ------------------------------------------------------------- fetching

async function page(lang: keyof typeof PAGES): Promise<string> {
  const file = `${CACHE_DIR}/duome-${lang}.html`;
  if (existsSync(file)) return readFileSync(file, 'utf8');

  process.stdout.write(`fetching ${PAGES[lang]}\n`);
  const res = await fetch(PAGES[lang], {
    headers: { 'User-Agent': 'JapanLearner import (one-off)' },
  });
  if (!res.ok) throw new Error(`${PAGES[lang]} returned ${res.status}`);
  const html = await res.text();
  writeFileSync(file, html);
  await sleep(30_000);
  return html;
}

// -------------------------------------------------------------- parsing

interface Row {
  word: string;
  meanings: string[];
}

interface Section {
  number: number;
  /** the unit's short name, e.g. "Basics" */
  name: string;
  /** what the unit teaches, e.g. "Order food and drinks" */
  goal: string;
  rows: Row[];
}

const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#039;': "'",
  '&nbsp;': ' ',
};

const decode = (s: string): string =>
  s.replace(/&(?:amp|lt|gt|quot|#039|nbsp);/g, (m) => ENTITIES[m] ?? m).trim();

/**
 * A gloss, split the way the app's meaning matcher will read it back.
 *
 * The matcher already treats both a comma and a slash as separating
 * alternatives, so a gloss stored whole as "Mr./Ms." is one the app displays
 * as the answer and then refuses to accept — it compares "mr/ms" against "mr"
 * and "ms" and finds neither. Splitting here rather than papering over it in
 * the matcher keeps the stored data and the grading in step.
 *
 * Brackets go the same way. duome writes "(explanation/emphasis)" and
 * "(your) mom", and a learner types neither bracket.
 */
const glosses = (raw: string): string[] => {
  const seen: string[] = [];
  for (const part of raw.split(/[,/]/)) {
    const gloss = part.replace(/[()[\]]/g, ' ').replace(/\s+/g, ' ').trim();
    if (gloss && !seen.includes(gloss)) seen.push(gloss);
  }
  return seen;
};

const SECTION =
  /<div class="path-section-delimiter">[\s\S]*?<span title="[0-9a-f]+">\s*(\d+)\s*<span class="small-label">([^<]*)<\/span>([^<]*)<\/span>/;

/** The romanisation between the word and the gloss is optional, and ignored. */
const WORD =
  /<span class="_blue[^"]*wA">([^<]*)<\/span>(?:\s*<span class="cCCC">[^<]*<\/span>)?<span class="cCCC wT">\s*-\s*([^<]*)<\/span>/;

function parse(html: string): Section[] {
  const body = html.slice(html.indexOf('<div id="words">'));
  const sections: Section[] = [];
  let current: Section | null = null;

  for (const [, inner] of body.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)) {
    const section = inner.match(SECTION);
    if (section) {
      current = {
        number: Number(section[1]),
        name: decode(section[2]),
        goal: decode(section[3]),
        rows: [],
      };
      sections.push(current);
      continue;
    }

    const word = inner.match(WORD);
    if (!word || !current) continue;
    current.rows.push({ word: decode(word[1]), meanings: glosses(decode(word[2])) });
  }

  return sections;
}

// --------------------------------------------------------------- merging

interface Folded {
  meanings: string[];
  unit: number;
}

/**
 * duome lists a word once per Duolingo lexeme, so おちゃ appears three times in
 * one unit as "green tea", "green tea, tea" and "tea". Those are one word to a
 * learner, and every one of those glosses is an answer worth accepting, so the
 * rows fold into a single entry holding the union. The first gloss seen stays
 * first: it is the one the card displays.
 */
function fold(sections: Section[]): Map<string, Folded> {
  const byWord = new Map<string, Folded>();

  for (const section of sections) {
    for (const row of section.rows) {
      if (!row.word || !row.meanings.length) continue;
      const found = byWord.get(row.word);
      if (!found) {
        // A word taught in two units belongs to the first: that is where you
        // met it, and where you would go looking to practise it again.
        byWord.set(row.word, { meanings: [...row.meanings], unit: section.number });
        continue;
      }
      for (const meaning of row.meanings) {
        if (!found.meanings.includes(meaning)) found.meanings.push(meaning);
      }
    }
  }

  return byWord;
}

// -------------------------------------------------------------- readings

const KANA_ONLY = /^[぀-ゟ゠-ヿー・々]+$/;
const HAS_JAPANESE = /[぀-ゟ゠-ヿ一-龯]/;

interface JishoJapanese {
  word?: string;
  reading?: string;
}

interface JishoEntry {
  japanese: JishoJapanese[];
  senses: { parts_of_speech: string[] }[];
}

const JISHO_CACHE = `${CACHE_DIR}/duome-jisho.json`;
const jisho: Record<string, JishoEntry[]> = existsSync(JISHO_CACHE)
  ? JSON.parse(readFileSync(JISHO_CACHE, 'utf8'))
  : {};
let fetched = 0;

async function lookup(term: string): Promise<JishoEntry[]> {
  if (jisho[term]) return jisho[term];

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch(
        `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(term)}`,
        { headers: { 'User-Agent': 'JapanLearner import (one-off)' } },
      );
      if (res.ok) {
        const json = (await res.json()) as { data?: JishoEntry[] };
        jisho[term] = json.data ?? [];
        fetched += 1;
        if (fetched % 200 === 0) writeFileSync(JISHO_CACHE, JSON.stringify(jisho));
        await sleep(PAUSE_MS);
        return jisho[term];
      }
    } catch {
      /* fall through to retry */
    }
    await sleep(1500 * (attempt + 1));
  }

  // A term the dictionary will not answer for keeps an empty reading, which
  // costs it two card types and nothing else. Failing the whole import over
  // one of six thousand words would be the worse trade.
  jisho[term] = [];
  return [];
}

/** An entry written exactly the way the course writes it, and its reading. */
function verbatim(word: string, entries: JishoEntry[]): string | null {
  for (const entry of entries) {
    for (const japanese of entry.japanese) {
      if (japanese.word === word && japanese.reading) return japanese.reading;
    }
  }
  return null;
}

function verbClassOf(entry: JishoEntry): VerbClass | null {
  const tags = entry.senses
    .flatMap((sense) => sense.parts_of_speech)
    .join(' ')
    .toLowerCase();
  if (tags.includes('ichidan verb')) return 'ichidan';
  if (tags.includes('godan verb')) return 'godan';
  return null;
}

/** The two verbs the rules cannot derive, which are also two of the commonest. */
const IRREGULAR: Record<string, string> = {
  来ます: 'きます',
  します: 'します',
  きます: 'きます',
};

/**
 * い-row → う-row: the dictionary form a godan ます-stem was built from.
 */
const GODAN_TAIL: Record<string, string> = {
  い: 'う', き: 'く', ぎ: 'ぐ', し: 'す', ち: 'つ',
  に: 'ぬ', び: 'ぶ', み: 'む', り: 'る',
};

/**
 * The dictionary forms a ます-stem could have come from, derived rather than
 * searched for.
 *
 * Searching is not enough on its own, because the dictionary matches on the
 * written surface and a great many stems are also ordinary nouns. Asking it
 * about 行き returns 行き the noun, 行き先, 行き過ぎ — never 行く. Asking about
 * 買います returns 買い増す, which reads かいます and is a different word
 * entirely. Undoing the conjugation by rule and asking about the results
 * instead turns both into one exact question.
 */
function dictionaryForms(stem: string): string[] {
  const tail = GODAN_TAIL[stem[stem.length - 1]];
  // 食べ → 食べる, and 行き → 行く. Which one is right is settled below by
  // conjugating the answer back, so both are worth asking about.
  return tail ? [`${stem}る`, stem.slice(0, -1) + tail] : [`${stem}る`];
}

/**
 * 電話します and friends: a noun plus する, which the dictionary lists as the
 * noun carrying a "suru verb" tag rather than as a word of its own.
 */
async function fromSuru(word: string): Promise<string | null> {
  const noun = word.replace(/します$/, '');
  if (noun === word || !noun) return null;

  for (const entry of await lookup(noun)) {
    const isSuru = entry.senses.some((sense) =>
      sense.parts_of_speech.some((part) => part.toLowerCase().includes('suru verb')),
    );
    if (!isSuru) continue;
    const reading = verbatim(noun, [entry]);
    if (reading) return `${reading}します`;
  }

  return null;
}

/**
 * The course teaches ます-forms, so the dictionary is asked about the stem and
 * every candidate goes back through this app's own conjugation rules. Only a
 * candidate that reproduces the written form character for character is
 * accepted — 見ます is 見る's, not 見すます's, and only conjugating says so.
 */
async function fromMasu(word: string): Promise<string | null> {
  if (IRREGULAR[word]) return IRREGULAR[word];

  const stem = word.replace(/(?:ます|ません|ました)$/, '');
  if (stem === word || !stem) return null;

  const suru = await fromSuru(word);
  if (suru) return suru;

  for (const term of [word, stem, ...dictionaryForms(stem)]) {
    for (const entry of await lookup(term)) {
      const verbClass = verbClassOf(entry);
      if (!verbClass) continue;
      for (const japanese of entry.japanese) {
        if (!japanese.word || !japanese.reading) continue;
        const masu = conjugateVerb(
          { word: japanese.word, reading: japanese.reading },
          verbClass,
          'masu',
        );
        if (masu.word === word) return masu.reading;
      }
    }
  }

  return null;
}

async function readingFor(word: string): Promise<string> {
  if (KANA_ONLY.test(word)) return word;
  // Tシャツ, WiFi, CEO: no Japanese script at all, so nothing to read back.
  if (!HAS_JAPANESE.test(word)) return '';
  const direct = verbatim(word, await lookup(word));
  if (direct) return direct;
  return (await fromMasu(word)) ?? '';
}

// ---------------------------------------------------------------- output

const escape = (s: string): string =>
  s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

/**
 * The format is delimited text, so a tab or a semicolon arriving inside a
 * gloss would not corrupt one row — it would shift every field after it and
 * quietly produce a deck of nonsense. Nothing in the course contains either
 * today. If that ever changes the import should stop, not paper over it.
 */
function field(value: string, what: string): string {
  if (/[\t\n;]/.test(value)) {
    throw new Error(`${what} contains a delimiter and would corrupt the file: ${value}`);
  }
  return value;
}

async function main(): Promise<void> {
  const en = parse(await page('en'));
  const nl = parse(await page('nl'));
  if (!en.length) throw new Error('no units parsed — the page markup has changed');

  const english = fold(en);
  const dutch = fold(nl);
  const dutchUnits = new Map(nl.map((section) => [section.number, section]));

  process.stdout.write(`${en.length} units, ${english.size} words\n`);

  interface Entry extends Folded {
    word: string;
    reading: string;
    meaningsNl: string[];
  }

  const entries: Entry[] = [];
  let done = 0;
  for (const [word, folded] of english) {
    entries.push({
      word,
      reading: await readingFor(word),
      meanings: folded.meanings,
      meaningsNl: dutch.get(word)?.meanings ?? [],
      unit: folded.unit,
    });
    done += 1;
    if (done % 500 === 0) process.stdout.write(`  ${done}/${english.size} resolved\n`);
  }
  writeFileSync(JISHO_CACHE, JSON.stringify(jisho));

  const withReading = entries.filter((entry) => entry.reading).length;
  const withDutch = entries.filter((entry) => entry.meaningsNl.length).length;
  process.stdout.write(
    `readings ${withReading}/${entries.length}, Dutch ${withDutch}/${entries.length}\n`,
  );

  const byUnit = new Map<number, Entry[]>();
  for (const entry of entries) {
    byUnit.set(entry.unit, [...(byUnit.get(entry.unit) ?? []), entry]);
  }

  const lines: string[] = [];
  for (const section of en) {
    const translated = dutchUnits.get(section.number);
    const where = `unit ${section.number}`;
    lines.push(
      [
        `#${section.number}`,
        field(section.name, `${where} name`),
        field(translated?.name || section.name, `${where} Dutch name`),
        field(section.goal, `${where} goal`),
        field(translated?.goal || section.goal, `${where} Dutch goal`),
      ].join('\t'),
    );
    for (const entry of byUnit.get(section.number) ?? []) {
      lines.push(
        [
          field(entry.word, 'a word'),
          // '=' rather than repeating the word: most of the course is kana.
          entry.reading === entry.word ? '=' : field(entry.reading, `${entry.word}'s reading`),
          entry.meanings.map((m) => field(m, `a meaning of ${entry.word}`)).join(';'),
          entry.meaningsNl.map((m) => field(m, `a Dutch meaning of ${entry.word}`)).join(';'),
        ].join('\t'),
      );
    }
  }

  const file = `/**
 * The Duolingo Japanese course's vocabulary, unit by unit.
 *
 * GENERATED — do not edit. Run \`npm run import:duolingo\` to rebuild it, and
 * read scripts/import-duome.ts for where each field comes from and why the
 * readings are the way they are.
 *
 * ${en.length} units and ${entries.length} words, ${withReading} of them with a known
 * reading and ${withDutch} with a Dutch gloss.
 *
 * Delimited text rather than object literals, because six thousand of those is
 * most of a megabyte of source nobody will ever read or edit. A line beginning
 * '#' opens a unit — number, name, name in Dutch, goal, goal in Dutch. Every
 * other line is a word — written form, reading ('=' when the word is already
 * its own reading, empty when unknown), meanings, meanings in Dutch. Fields
 * are tab-separated and the meaning lists are separated by semicolons.
 */
export const DUOLINGO_DATA = \`${escape(lines.join('\n'))}\`;
`;

  writeFileSync(OUT, file);
  process.stdout.write(`wrote ${OUT} (${Math.round(file.length / 1024)} kB)\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
