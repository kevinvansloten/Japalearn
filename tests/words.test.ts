import { ALL_WORDS, WORD_GROUPS, hasKanji } from '../src/data/words';
import { buildWordCards, wordPool, type WordConfig } from '../src/lib/buildCards';
import { checkMeaning, checkReading } from '../src/lib/romaji';
import { eq, ok } from './assert';

const base: WordConfig = {
  groupIds: WORD_GROUPS.map((g) => g.id),
  excluded: [],
  modes: ['meaning'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', listening: 'type' },
  flow: 'once',
  order: 'ordered',
};

// ---------------------------------------------------------- data health

ok('every group has words', WORD_GROUPS.every((g) => g.words.length > 0));
eq('no duplicate words', new Set(ALL_WORDS.map((w) => w.word)).size, ALL_WORDS.length);
ok('every word has a meaning', ALL_WORDS.every((w) => w.meanings.length > 0));
ok('no blank meanings', ALL_WORDS.every((w) => w.meanings.every((m) => m.trim().length > 0)));

// Readings must be kana, or they cannot be spoken or typed back.
const badReadings = ALL_WORDS.filter((w) => !/^[ぁ-ゖァ-ヺー]+$/.test(w.reading));
ok('every reading is kana', badReadings.length === 0,
  badReadings.slice(0, 5).map((w) => `${w.word}=${w.reading}`).join('; '));

// Every reading must survive the romaji round-trip the app grades with.
const untypeable = ALL_WORDS.filter((w) => !checkReading(w.reading, [w.reading]));
ok('every reading accepts itself', untypeable.length === 0,
  untypeable.slice(0, 5).map((w) => w.word).join('; '));

// And every meaning must be accepted by the meaning matcher, or the card it
// generates is unanswerable.
const unmatchable = ALL_WORDS.filter((w) => !checkMeaning(w.meanings[0], w.meanings));
ok('every meaning matches itself', unmatchable.length === 0,
  unmatchable.slice(0, 5).map((w) => `${w.word}="${w.meanings[0]}"`).join('; '));

// Two words sharing a canonical meaning make "meaning → word" ambiguous: the
// learner sees one prompt with two defensible answers.
const byMeaning = new Map<string, string[]>();
for (const w of ALL_WORDS) {
  const key = w.meanings[0].toLowerCase();
  byMeaning.set(key, [...(byMeaning.get(key) ?? []), w.word]);
}
const clashing = [...byMeaning.entries()].filter(([, words]) => words.length > 1);
ok('no two words share a canonical meaning', clashing.length === 0,
  clashing.slice(0, 5).map(([m, w]) => `"${m}": ${w.join(' / ')}`).join('; '));

// Kana-only entries are the whole point of this deck existing.
const kanaOnly = ALL_WORDS.filter((w) => !hasKanji(w));
ok('the deck includes kana-only vocabulary', kanaOnly.length > 40, `${kanaOnly.length}`);
ok('これ is in there', ALL_WORDS.some((w) => w.word === 'これ'));
ok('とても is in there', ALL_WORDS.some((w) => w.word === 'とても'));
ok('たくさん is in there', ALL_WORDS.some((w) => w.word === 'たくさん'));

// A kana-only word must have word and reading identical, or the reading card
// would ask a question that is already on screen.
const mismatched = kanaOnly.filter((w) => w.word !== w.reading);
eq('kana-only entries read as themselves', mismatched.length, 0);

// ---------------------------------------------------------------- cards

const meaning = buildWordCards(base);
eq('one meaning card per word', meaning.length, ALL_WORDS.length);

const tegami = meaning.find((c) => c.prompt === '手紙')!;
ok('手紙 accepts its meaning', tegami.check('letter'));
ok('手紙 rejects a wrong meaning', !tegami.check('newspaper'));
eq('手紙 speaks its reading', tegami.speech, 'てがみ');

const taberu = meaning.find((c) => c.prompt === '食べる')!;
ok('食べる accepts "to eat"', taberu.check('to eat'));
ok('食べる accepts "eat" without the "to"', taberu.check('eat'));

// Reading cards skip words already written in kana.
const reading = buildWordCards({ ...base, modes: ['reading'] });
eq('reading cards only for words with kanji', reading.length, ALL_WORDS.filter(hasKanji).length);
ok('no reading card for これ', !reading.some((c) => c.prompt === 'これ'));
ok('手紙 has a reading card', reading.some((c) => c.prompt === '手紙'));
const tegamiReading = reading.find((c) => c.prompt === '手紙')!;
ok('手紙 reading accepts romaji', tegamiReading.check('tegami'));
ok('手紙 reading accepts kana', tegamiReading.check('てがみ'));

// Listening covers every word, kana-only included.
const listening = buildWordCards({ ...base, modes: ['listening'] });
eq('a listening card for every word', listening.length, ALL_WORDS.length);
ok('listening prompts are audio', listening.every((c) => c.promptScript === 'audio'));
ok('listening cards all speak', listening.every((c) => Boolean(c.speech)));

// Multiple choice must have exactly one correct option in every mode.
const choices = (['meaning', 'reading', 'recall', 'listening'] as const).flatMap((mode) =>
  buildWordCards({
    ...base,
    modes: [mode],
    inputModes: { meaning: 'choice', reading: 'choice', recall: 'choice', listening: 'choice' },
  }),
);
const ambiguous = choices.filter((c) => c.choices!.filter((o) => c.check(o)).length !== 1);
ok('exactly one correct option per choice card', ambiguous.length === 0,
  ambiguous.slice(0, 5).map((c) => c.id).join('; '));

const everyMode = buildWordCards({ ...base, modes: ['meaning', 'reading', 'recall', 'listening'] });
eq('card ids are unique', new Set(everyMode.map((c) => c.id)).size, everyMode.length);

// Words shared with the kanji deck's examples must schedule as one item, not two.
eq('items share the kanji deck\'s vocab namespace', meaning[0].itemId.startsWith('vocab:'), true);

// ------------------------------------------------------------ selection

eq('groups filter the pool',
  wordPool({ ...base, groupIds: ['pointing'] }).length,
  WORD_GROUPS.find((g) => g.id === 'pointing')!.words.length);
eq('exclusions apply',
  wordPool({ ...base, groupIds: ['pointing'], excluded: ['これ', 'それ'] }).length,
  WORD_GROUPS.find((g) => g.id === 'pointing')!.words.length - 2);
eq('no groups means no cards', buildWordCards({ ...base, groupIds: [] }).length, 0);
