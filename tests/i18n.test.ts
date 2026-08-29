/**
 * The two languages, and the half-finished content translation between them.
 *
 * TypeScript already guarantees that `nl` has exactly the keys of `en` — it is
 * typed as `Strings`, which is derived from the English bundle. What it cannot
 * see is a key that is present but empty, or a Dutch table keyed by a word the
 * deck does not contain, which would silently translate nothing at all. Both
 * are what this file is for.
 */
import { en } from '../src/i18n/en';
import { nl } from '../src/i18n/nl';
import { LANGS } from '../src/i18n/lang';
import { meaningLang, meaningsOf, meaningOf } from '../src/i18n/content';
import { ALL_COUNTERS, COUNTER_GROUPS, NL_KEYS as COUNTER_NL } from '../src/data/counters';
import { ALL_KANJI, KANJI_GROUPS, NL_KEYS as KANJI_NL } from '../src/data/kanji';
import { ALL_WORDS, WORD_GROUPS, NL_KEYS as WORD_NL } from '../src/data/words';
import {
  ALL_ADJECTIVES,
  ALL_VERBS,
  CONJUGATION_GROUPS,
  NL_KEYS as CONJUGATION_NL,
} from '../src/data/conjugation';
import { ALL_PARTICLE_SENTENCES, PARTICLE_GROUPS, NL_KEYS as PARTICLE_NL } from '../src/data/particles';
import { CURRICULUM } from '../src/data/curriculum';
import {
  buildConjugationCards,
  buildWordCards,
  type ConjugationConfig,
  type WordConfig,
} from '../src/lib/buildCards';
import { ADJECTIVE_FORMS, VERB_FORMS } from '../src/lib/conjugate';
import { checkMeaning } from '../src/lib/romaji';
import { eq, ok } from './assert';

// ------------------------------------------------------- bundle health

/**
 * Every leaf of a bundle, as `path -> value`. Functions are called with
 * stand-in arguments: what matters is that they produce something, not what.
 */
function leaves(node: unknown, path = ''): [string, string][] {
  if (typeof node === 'string') return [[path, node]];
  if (typeof node === 'function') {
    const args = Array.from({ length: node.length }, () => 1);
    return [[path, String((node as (...a: unknown[]) => unknown)(...args))]];
  }
  if (node && typeof node === 'object') {
    return Object.entries(node).flatMap(([key, value]) =>
      leaves(value, path ? `${path}.${key}` : key),
    );
  }
  return [];
}

const enLeaves = leaves(en);
const nlLeaves = leaves(nl);

eq('both bundles have the same shape', nlLeaves.length, enLeaves.length);

const enPaths = enLeaves.map(([p]) => p).sort();
const nlPaths = nlLeaves.map(([p]) => p).sort();
const differing = enPaths.filter((p, i) => nlPaths[i] !== p);
ok('both bundles have the same keys', differing.length === 0, differing.slice(0, 5).join('; '));

for (const [name, list] of [
  ['en', enLeaves],
  ['nl', nlLeaves],
] as const) {
  const blank = list.filter(([, value]) => value.trim().length === 0);
  ok(`no blank strings in ${name}`, blank.length === 0, blank.slice(0, 5).map(([p]) => p).join('; '));
}

eq('the bundles know which language they are', `${en.lang}${nl.lang}`, 'ennl');
ok('every language has a bundle', LANGS.length === 2);

// A Dutch bundle that still reads as English is the mistake this catches: the
// prose keys are the ones that must differ, unlike 'hiragana' or 'Enter'.
const PROSE = ['home.intro', 'flow.title', 'setup.howAsked', 'progress.whereYouAreHint'];
const untranslated = PROSE.filter(
  (path) =>
    enLeaves.find(([p]) => p === path)?.[1] === nlLeaves.find(([p]) => p === path)?.[1],
);
ok('the Dutch prose is actually Dutch', untranslated.length === 0, untranslated.join('; '));

// --------------------------------------------------- group translations

const groups = [
  ['kanji', KANJI_GROUPS],
  ['counters', COUNTER_GROUPS],
  ['words', WORD_GROUPS],
  ['conjugation', CONJUGATION_GROUPS],
  ['particles', PARTICLE_GROUPS],
] as const;

for (const [name, list] of groups) {
  const missing = list.filter((g) => !g.labelNl?.trim() || !g.blurbNl?.trim());
  ok(`every ${name} group is named in Dutch`, missing.length === 0,
    missing.map((g) => g.id).join('; '));
}

const stagesMissing = CURRICULUM.filter((s) => !s.titleNl?.trim() || !s.goalNl?.trim());
ok('every curriculum stage is named in Dutch', stagesMissing.length === 0,
  stagesMissing.map((s) => s.id).join('; '));

// ------------------------------------------------- content translations

/**
 * The per-item Dutch meanings are being filled in a deck at a time, so these
 * tables are allowed to be empty or partial. What they are not allowed to be
 * is keyed by something that does not exist: a typo there translates nothing
 * and says nothing, which is the failure worth catching early.
 */
const keyed = [
  ['words', WORD_NL, ALL_WORDS.map((w) => w.word)],
  ['kanji meanings', KANJI_NL.meanings, ALL_KANJI.map((k) => k.char)],
  ['kanji vocabulary', KANJI_NL.vocab, ALL_KANJI.flatMap((k) => k.vocab.map((v) => v.word))],
  ['counters', COUNTER_NL, ALL_COUNTERS.map((c) => c.form)],
  ['conjugation', CONJUGATION_NL, [...ALL_VERBS, ...ALL_ADJECTIVES].map((v) => v.word)],
  ['particles', PARTICLE_NL, ALL_PARTICLE_SENTENCES.map((s) => s.text)],
] as const;

for (const [name, keys, known] of keyed) {
  const pool = new Set(known);
  const unknown = keys.filter((key) => !pool.has(key));
  ok(`every Dutch ${name} key matches a real entry`, unknown.length === 0,
    unknown.slice(0, 5).join('; '));
}

// Where a Dutch meaning does exist it has to hold up to everything the English
// one does, or the card it produces cannot be answered.
const dutchWords = ALL_WORDS.filter((w) => w.meaningsNl?.length);

const unmatchable = dutchWords.filter((w) => !checkMeaning(w.meaningsNl![0], w.meaningsNl!));
ok('every Dutch meaning matches itself', unmatchable.length === 0,
  unmatchable.slice(0, 5).map((w) => w.word).join('; '));

const blankDutch = dutchWords.filter((w) => w.meaningsNl!.some((m) => !m.trim()));
ok('no blank Dutch meanings', blankDutch.length === 0,
  blankDutch.slice(0, 5).map((w) => w.word).join('; '));

// Two words sharing a canonical Dutch meaning makes "meaning → word" ambiguous
// in Dutch, exactly as it would in English.
const byMeaning = new Map<string, string[]>();
for (const w of dutchWords) {
  const key = w.meaningsNl![0].toLowerCase();
  byMeaning.set(key, [...(byMeaning.get(key) ?? []), w.word]);
}
const clashing = [...byMeaning.entries()].filter(([, words]) => words.length > 1);
ok('no two words share a canonical Dutch meaning', clashing.length === 0,
  clashing.slice(0, 5).map(([m, w]) => `"${m}": ${w.join(' / ')}`).join('; '));

const dutchCounters = ALL_COUNTERS.filter((c) => c.meaningNl);
const blankCounters = dutchCounters.filter((c) => !c.meaningNl!.trim());
ok('no blank Dutch counter meanings', blankCounters.length === 0,
  blankCounters.slice(0, 5).map((c) => c.form).join('; '));

// ------------------------------------------------------------ fallback

// The whole point of the fallback: an untranslated entry still reaches the
// screen, in English, rather than as a blank.
const untranslatedWord = ALL_WORDS.find((w) => !w.meaningsNl?.length);
if (untranslatedWord) {
  eq('an untranslated word falls back to English',
    meaningsOf(untranslatedWord, 'nl').join(),
    untranslatedWord.meanings.join());
  eq('and the card says which language it wants', meaningLang(untranslatedWord, 'nl'), 'en');
}

eq('a translated entry is used', meaningsOf({ meanings: ['one'], meaningsNl: ['een'] }, 'nl')[0], 'een');
eq('an empty translation is not', meaningsOf({ meanings: ['one'], meaningsNl: [] }, 'nl')[0], 'one');
eq('English never sees the Dutch', meaningsOf({ meanings: ['one'], meaningsNl: ['een'] }, 'en')[0], 'one');
eq('single meanings fall back too', meaningOf({ meaning: 'one' }, 'nl'), 'one');

// ------------------------------------------------------ cards in Dutch

const wordConfig: WordConfig = {
  groupIds: WORD_GROUPS.map((g) => g.id),
  excluded: [],
  modes: ['meaning'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', listening: 'type' },
  flow: 'once',
  order: 'ordered',
};

const dutchCards = buildWordCards(wordConfig, nl);
const englishCards = buildWordCards(wordConfig, en);

eq('a Dutch deck has the same cards', dutchCards.length, englishCards.length);
ok('the questions are in Dutch', dutchCards.every((c) => c.question === nl.card.whatDoesThisMean));
ok('and every card is still answerable', dutchCards.every((c) => c.check(c.answer.split(' / ')[0])));

/**
 * "Name the form" is the one mode where a piece of interface text *is* the
 * graded answer, so a form label that came from the wrong bundle would offer
 * four Dutch options and mark the right one wrong.
 */
const conjugationConfig: ConjugationConfig = {
  groupIds: CONJUGATION_GROUPS.map((g) => g.id),
  excluded: [],
  verbForms: [...VERB_FORMS],
  adjectiveForms: [...ADJECTIVE_FORMS],
  modes: ['identify'],
  inputModes: { produce: 'type', identify: 'choice', dictionary: 'type' },
  flow: 'once',
  order: 'ordered',
};

const identify = buildConjugationCards(conjugationConfig, nl);
const dutchLabels = new Set([
  ...Object.values(nl.verbForm),
  ...Object.values(nl.adjectiveForm),
]);

ok('the form names are in Dutch', identify.every((c) => dutchLabels.has(c.answer)));
ok('the options are all Dutch', identify.every((c) => c.choices!.every((o) => dutchLabels.has(o))));
ok('and the right one is accepted', identify.every((c) => c.check(c.answer)));
