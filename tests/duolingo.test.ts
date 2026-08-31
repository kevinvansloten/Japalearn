/**
 * The imported Duolingo deck.
 *
 * This is the only dataset in the project nobody wrote by hand, which changes
 * what the tests are for. The others check craftsmanship — that a reading is
 * typeable, that no two words claim the same gloss. Those guarantees cannot be
 * asked of six thousand imported rows, so what is checked here instead is that
 * the builder copes with data that does not have them: that a shared meaning
 * never puts two right answers on screen, that an entry with no reading gets
 * the cards it can and not the ones it cannot, and that the writing system
 * setting really does change what is being asked.
 */
import {
  ALL_DUOLINGO_WORDS,
  DUOLINGO_UNITS,
  duolingoItemId,
  hasKanji,
  hasReading,
  LAST_UNIT,
} from '../src/data/duolingo';
import { ALL_WORDS } from '../src/data/words';
import {
  buildDuolingoCards,
  duolingoCardCount,
  duolingoPool,
  type DuolingoConfig,
  type DuolingoMode,
} from '../src/lib/buildCards';
import { checkMeaning, checkReading } from '../src/lib/romaji';
import { nl } from '../src/i18n/nl';
import { eq, ok } from './assert';

const MODES: DuolingoMode[] = ['meaning', 'recall', 'reading', 'listening'];

const base: DuolingoConfig = {
  fromUnit: 1,
  toUnit: LAST_UNIT,
  excluded: [],
  modes: ['meaning'],
  inputModes: { meaning: 'type', recall: 'type', reading: 'type', listening: 'type' },
  script: 'word',
  flow: 'once',
  order: 'ordered',
};

const choosing = (config: DuolingoConfig): DuolingoConfig => ({
  ...config,
  inputModes: { meaning: 'choice', recall: 'choice', reading: 'choice', listening: 'choice' },
});

// ---------------------------------------------------------- data health

ok('the course parsed into units', DUOLINGO_UNITS.length > 100, `${DUOLINGO_UNITS.length}`);
ok('and into words', ALL_DUOLINGO_WORDS.length > 3000, `${ALL_DUOLINGO_WORDS.length}`);
ok('every unit has words', DUOLINGO_UNITS.every((unit) => unit.words.length > 0));

// The unit numbers are the range control's domain, so a gap in them would make
// a range that silently skips part of the course.
const numbers = DUOLINGO_UNITS.map((unit) => unit.number);
ok('unit numbers run 1..n without gaps', numbers.every((n, i) => n === i + 1));
eq('LAST_UNIT is the last one', LAST_UNIT, numbers[numbers.length - 1]);

eq('no duplicate words',
  new Set(ALL_DUOLINGO_WORDS.map((w) => w.word)).size, ALL_DUOLINGO_WORDS.length);
ok('every word has a meaning', ALL_DUOLINGO_WORDS.every((w) => w.meanings.length > 0));
ok('no blank meanings',
  ALL_DUOLINGO_WORDS.every((w) => w.meanings.every((m) => m.trim().length > 0)));
ok('no blank words', ALL_DUOLINGO_WORDS.every((w) => w.word.trim().length > 0));

// A reading is optional here, but one that exists has to be kana or it cannot
// be spoken, typed back, or converted to romaji.
const readable = ALL_DUOLINGO_WORDS.filter(hasReading);
ok('a good share of the deck has a reading',
  readable.length > ALL_DUOLINGO_WORDS.length / 2,
  `${readable.length}/${ALL_DUOLINGO_WORDS.length}`);

const badReadings = readable.filter((w) => !/^[ぁ-ゖァ-ヺーヽヾ・]+$/.test(w.reading));
ok('every reading that exists is kana', badReadings.length === 0,
  badReadings.slice(0, 5).map((w) => `${w.word}=${w.reading}`).join('; '));

const untypeable = readable.filter((w) => !checkReading(w.reading, [w.reading]));
ok('every reading accepts itself', untypeable.length === 0,
  untypeable.slice(0, 5).map((w) => w.word).join('; '));

const unmatchable = ALL_DUOLINGO_WORDS.filter((w) => !checkMeaning(w.meanings[0], w.meanings));
ok('every meaning matches itself', unmatchable.length === 0,
  unmatchable.slice(0, 5).map((w) => `${w.word}="${w.meanings[0]}"`).join('; '));

// The import writes '=' for a word that is already its own reading, so a
// kana-only entry reading as anything else means the encoding was misread.
const kanaOnly = readable.filter((w) => !hasKanji(w) && /^[ぁ-ゖァ-ヺー]+$/.test(w.word));
const mismatched = kanaOnly.filter((w) => w.word !== w.reading);
eq('kana-only entries read as themselves', mismatched.length, 0);

// The two vocabulary decks overlap by design and schedule separately by
// design. Sharing a namespace would make drilling one quietly rewrite the
// other's mastery dots.
const vocabIds = new Set(ALL_WORDS.map((w) => `vocab:${w.word}`));
const collisions = ALL_DUOLINGO_WORDS.filter((w) => vocabIds.has(duolingoItemId(w)));
eq('the two word decks schedule separately', collisions.length, 0);
ok('and the deck really does overlap the N5 one',
  ALL_DUOLINGO_WORDS.some((w) => ALL_WORDS.some((n5) => n5.word === w.word)));

// ------------------------------------------------------------ selection

const firstUnit = DUOLINGO_UNITS[0];
eq('a single unit selects its own words',
  duolingoPool({ ...base, fromUnit: 1, toUnit: 1 }).length, firstUnit.words.length);
eq('a range adds them up',
  duolingoPool({ ...base, fromUnit: 1, toUnit: 3 }).length,
  DUOLINGO_UNITS.slice(0, 3).reduce((total, unit) => total + unit.words.length, 0));
eq('a reversed range is read the same way round',
  duolingoPool({ ...base, fromUnit: 3, toUnit: 1 }).length,
  duolingoPool({ ...base, fromUnit: 1, toUnit: 3 }).length);
eq('exclusions apply',
  duolingoPool({ ...base, fromUnit: 1, toUnit: 1, excluded: [firstUnit.words[0].word] }).length,
  firstUnit.words.length - 1);

// ---------------------------------------------------------------- cards

const oneUnit: DuolingoConfig = { ...base, fromUnit: 1, toUnit: 1 };

eq('one meaning card per word',
  buildDuolingoCards(oneUnit).length, firstUnit.words.length);

// The count shown on the setup screen is worked out arithmetically rather than
// by building the deck, so it has to agree with the deck it predicts.
for (const mode of MODES) {
  const config = { ...base, fromUnit: 1, toUnit: 12, modes: [mode] };
  eq(`the ${mode} count matches the cards built`,
    duolingoCardCount(config), buildDuolingoCards(config).length);
}
const everyMode = { ...base, fromUnit: 1, toUnit: 12, modes: MODES };
eq('and the count is right for every mode at once',
  duolingoCardCount(everyMode), buildDuolingoCards(everyMode).length);
eq('card ids are unique',
  new Set(buildDuolingoCards(everyMode).map((c) => c.id)).size,
  buildDuolingoCards(everyMode).length);

// Reading cards are the ones with two conditions on them: something has to be
// hidden by the writing, and the reading has to be known.
const readingCards = buildDuolingoCards({ ...base, modes: ['reading'] });
ok('reading cards all have kanji in the prompt',
  readingCards.every((c) => /[一-龯]/.test(c.prompt)));
eq('a reading card for every kanji word with a known reading',
  readingCards.length, ALL_DUOLINGO_WORDS.filter((w) => hasKanji(w) && hasReading(w)).length);

// Listening needs something to say, so the entries without a reading drop out
// rather than producing a silent card.
const listening = buildDuolingoCards({ ...base, modes: ['listening'] });
ok('every listening card speaks', listening.every((c) => Boolean(c.speech)));
ok('listening prompts are audio', listening.every((c) => c.promptScript === 'audio'));
eq('a listening card for every word with a reading', listening.length, readable.length);

// ------------------------------------------------------- writing system

const kana = buildDuolingoCards({ ...base, fromUnit: 1, toUnit: 40, script: 'kana' });
ok('a kana session never shows a kanji', kana.every((c) => !/[一-龯]/.test(c.prompt)),
  kana.filter((c) => /[一-龯]/.test(c.prompt)).slice(0, 3).map((c) => c.prompt).join('; '));

const romaji = buildDuolingoCards({
  ...base,
  fromUnit: 1,
  toUnit: 40,
  modes: ['recall'],
  script: 'romaji',
});
ok('a romaji session answers in latin script', romaji.every((c) => c.answerScript === 'latin'));
ok('and its answers are romaji', romaji.every((c) => !/[ぁ-ヿ一-龯]/.test(c.answer)),
  romaji.filter((c) => /[ぁ-ヿ一-龯]/.test(c.answer)).slice(0, 3).map((c) => c.answer).join('; '));
ok('every romaji answer is accepted as typed', romaji.every((c) => c.check(c.answer)));

/**
 * A romaji session grades through the same reading matcher as everywhere else,
 * so someone who can type kana is not forced into romaji by the setting. Asked
 * of the reading rather than of the card's own answer on purpose: romaji
 * cannot represent a long vowel unambiguously, so ケーキ comes back as "keeki"
 * and converting that gives けえき, which is a limit of the notation and not
 * something the deck should pretend to have solved.
 */
const romajiCards = new Map(romaji.map((c) => [c.id, c]));
const kanaRejected = duolingoPool({ ...base, fromUnit: 1, toUnit: 40 })
  .filter(hasReading)
  .filter((entry) => {
    const card = romajiCards.get(`duo-recall-${entry.word}`);
    return card ? !card.check(entry.reading) : false;
  });
ok('and the kana spelling counts too', kanaRejected.length === 0,
  kanaRejected.slice(0, 5).map((e) => `${e.word}=${e.reading}`).join('; '));

// Asking the reading of a word shown in kana would be showing the answer, so
// the mode produces nothing rather than a free card.
eq('no reading cards when the Japanese is already kana',
  buildDuolingoCards({ ...base, modes: ['reading'], script: 'kana' }).length, 0);
eq('nor when it is romaji',
  buildDuolingoCards({ ...base, modes: ['reading'], script: 'romaji' }).length, 0);

// Written as the course writes it, "meaning → word" wants the written form.
const recall = buildDuolingoCards({ ...base, fromUnit: 1, toUnit: 5, modes: ['recall'] });
ok('recall accepts the written form', recall.every((c) => c.check(c.answer)));

// Romaji is a display aid: keep Japanese prompts and grading, and never give
// away a typed reading, recall or listening answer before it is revealed.
const aidedConfig: DuolingoConfig = { ...base, toUnit: 25, modes: MODES, showRomaji: true };
const aidedCards = buildDuolingoCards(aidedConfig);
const unaidedCards = new Map(buildDuolingoCards({ ...aidedConfig, showRomaji: false })
  .map((card) => [card.id, card]));
const aided = new Map(aidedCards.map((card) => [card.id, card]));
eq('practice displays hello with wa', aided.get('duo-meaning-こんにちは')?.promptNote, 'konnichiwa');
eq('practice displays good evening with wa', aided.get('duo-meaning-こんばんは')?.promptNote, 'konbanwa');
eq('romaji answers use the spoken greeting', romajiCards.get('duo-recall-こんにちは')?.answer, 'konnichiwa');
ok('spoken greeting is accepted when typed', romajiCards.get('duo-recall-こんにちは')!.check('konnichiwa'));
eq('romaji aids preserve the card count', aidedCards.length, unaidedCards.size);
for (const card of aidedCards) {
  const plain = unaidedCards.get(card.id)!;
  eq(`romaji preserves the Japanese or audio prompt: ${card.id}`, card.prompt, plain.prompt);
  eq(`romaji preserves the answer: ${card.id}`, card.answer, plain.answer);
  eq(`romaji preserves grading: ${card.id}`, card.check(card.answer), plain.check(card.answer));
  if (!card.id.startsWith('duo-meaning-')) {
    eq(`no pronunciation hint on a typed question: ${card.id}`, card.promptNote, plain.promptNote);
  }
}
eq('kanji meaning prompt has romaji', aided.get('duo-meaning-食べます')?.promptNote, 'tabemasu');
eq('kana meaning prompt has romaji', aided.get('duo-meaning-おちゃ')?.promptNote, 'ocha');
eq('katakana meaning prompt has romaji', aided.get('duo-meaning-カフェ')?.promptNote, 'kafe');
ok('answer feedback includes romaji', aided.get('duo-recall-食べます')!.details![0].includes('tabemasu'));
ok('romaji aid does not accept romaji instead of the requested written form',
  !aided.get('duo-recall-食べます')!.check('tabemasu'));

const aidedChoices = buildDuolingoCards(choosing(aidedConfig));
const knownReadings = new Map(duolingoPool(aidedConfig).filter(hasReading)
  .map((entry) => [entry.word, entry.reading]));
for (const card of aidedChoices.filter((card) => card.answerScript === 'jp')) {
  for (const option of card.choices!) {
    if (card.id.startsWith('duo-reading-') || knownReadings.has(option)) {
      const pronunciation = card.choiceNotes?.[option];
      ok(`each Japanese choice has its own pronunciation: ${card.id} / ${option}`,
        Boolean(pronunciation) && checkReading(pronunciation!, [knownReadings.get(option) ?? option]));
    }
  }
  eq(`romaji hints preserve one correct choice: ${card.id}`,
    card.choices!.filter((option) => card.check(option)).length, 1);
}

const aidedKana = buildDuolingoCards({ ...base, toUnit: 25, script: 'kana', showRomaji: true });
eq('kana script can show romaji alongside it',
  aidedKana.find((card) => card.id === 'duo-meaning-食べます')?.promptNote, 'tabemasu');
const alreadyRomaji = buildDuolingoCards(choosing({ ...aidedConfig, script: 'romaji' }));
ok('romaji script does not repeat pronunciation hints',
  alreadyRomaji.every((card) => !card.promptNote && !card.choiceNotes));

const unknownReading = ALL_DUOLINGO_WORDS.find((entry) => !hasReading(entry))!;
const unknownCard = buildDuolingoCards({ ...base, showRomaji: true })
  .find((card) => card.itemId === duolingoItemId(unknownReading))!;
ok('words without readings remain available without invented romaji',
  Boolean(unknownCard) && !unknownCard.promptNote && !unknownCard.details![0].includes(' · '));

// ------------------------------------------------------------- ambiguity

/**
 * The invariant the whole deck turns on. Imported glosses collide freely — a
 * dozen words gloss as "to go" — and a multiple-choice question with two
 * defensible options is a question the learner cannot get right on purpose.
 */
for (const mode of MODES) {
  const cards = buildDuolingoCards(choosing({ ...base, modes: [mode] }));
  const ambiguous = cards.filter((c) => c.choices!.filter((o) => c.check(o)).length !== 1);
  ok(`exactly one correct option per ${mode} card`, ambiguous.length === 0,
    ambiguous.slice(0, 5).map((c) => `${c.id}: ${c.choices!.join(' / ')}`).join('; '));
}

const choiceCards = buildDuolingoCards(choosing({ ...base, modes: MODES }));
ok('no choice card offers the same option twice',
  choiceCards.every((c) => new Set(c.choices).size === c.choices!.length));
ok('and every choice card offers something to choose between',
  choiceCards.every((c) => c.choices!.length > 1));

// Typed, a shared gloss is the opposite problem: every word that fairly
// answers it has to be accepted, or the learner is marked wrong for being
// right. 行きます and いきます both gloss as "go".
const shared = new Map<string, string[]>();
for (const entry of duolingoPool(base)) {
  const key = entry.meanings[0].toLowerCase();
  shared.set(key, [...(shared.get(key) ?? []), entry.word]);
}
const clashing = [...shared.values()].filter((words) => words.length > 1);
ok('the deck really does have words sharing a gloss', clashing.length > 0);

const typedRecall = buildDuolingoCards({ ...base, modes: ['recall'] });
const byPrompt = new Map(typedRecall.map((c) => [c.id, c]));
const rejected = clashing
  .flatMap((words) => words.map((word) => ({ word, words })))
  .filter(({ word, words }) => {
    const card = byPrompt.get(`duo-recall-${word}`);
    return card ? !words.every((rival) => card.check(rival)) : false;
  });
ok('a typed answer accepts every word that shares the gloss', rejected.length === 0,
  rejected.slice(0, 5).map((r) => r.word).join('; '));

// ------------------------------------------------------------ in Dutch

const dutchConfig = { ...base, fromUnit: 1, toUnit: 20 };
const dutch = buildDuolingoCards(dutchConfig, nl);
eq('a Dutch deck has the same cards', dutch.length, buildDuolingoCards(dutchConfig).length);
ok('the questions are in Dutch', dutch.every((c) => c.question === nl.card.whatDoesThisMean));
ok('and every card is still answerable', dutch.every((c) => c.check(c.answer.split(' / ')[0])));
ok('most of the deck carries a Dutch gloss',
  ALL_DUOLINGO_WORDS.filter((w) => w.meaningsNl?.length).length > ALL_DUOLINGO_WORDS.length / 2);
