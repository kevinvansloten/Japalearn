import { KANA_LOOKALIKES, KANJI_LOOKALIKES } from '../data/confusables';
import { ALL_COUNTERS, type CounterItem } from '../data/counters';
import { ALL_WORDS, hasKanji, type WordEntry } from '../data/words';
import {
  DUOLINGO_UNITS,
  duolingoItemId,
  hasKanji as duolingoHasKanji,
  hasReading,
  type DuolingoEntry,
  type DuolingoUnit,
} from '../data/duolingo';
import { ALL_ADJECTIVES, ALL_VERBS } from '../data/conjugation';
import {
  ALL_PARTICLE_SENTENCES,
  PARTICLES,
  acceptedFor,
  filled,
  type ParticleSentence,
} from '../data/particles';
import {
  conjugateAdjective,
  conjugateVerb,
  type AdjectiveForm,
  type Conjugated,
  type VerbForm,
} from './conjugate';
import { ALL_KANA, type KanaEntry } from '../data/kana';
import { ALL_KANJI, type KanjiEntry } from '../data/kanji';
import { checkMeaning, checkReading, kanaToRomaji } from './romaji';
import { shuffle, type Card, type Flow, type InputMode, type Order } from './session';
import { en, type Strings } from '../i18n/en';
import { labelOf, meaningLang, meaningOf, meaningsOf, sentenceOf, whyOf } from '../i18n/content';

const CHOICE_COUNT = 4;

/**
 * Correct answer plus up to three distinct distractors, shuffled.
 *
 * When `lookalikes` is supplied, characters that are genuinely easy to confuse
 * with the answer are drawn first: picking シ out of シ ツ ソ ン tests the
 * distinction that actually trips people up, where four random kana do not.
 * Any remaining slots are filled at random from the pool.
 */
function pickChoices(
  correct: string,
  pool: string[],
  lookalikes?: Map<string, string[]>,
): string[] {
  const others = [...new Set(pool)].filter((p) => p !== correct);
  const near = lookalikes?.get(correct) ?? [];
  const confusable = shuffle(others.filter((o) => near.includes(o)));
  const rest = shuffle(others.filter((o) => !near.includes(o)));
  return shuffle([correct, ...[...confusable, ...rest].slice(0, CHOICE_COUNT - 1)]);
}

const exact = (answer: string) => (given: string) => given.trim() === answer;

/**
 * Every builder takes the strings it should write its cards in, defaulting to
 * English. A card carries its own question, placeholder and revealed detail,
 * so the language has to be decided when the deck is built rather than when it
 * is rendered — and in the "name the form" mode the label is the graded answer
 * itself, which makes this the difference between a card being right and being
 * unanswerable.
 */

// ---------------------------------------------------------------- kana

export type KanaScript = 'hira' | 'kata';
/** recognition: see the kana, type the sound. recall: see the sound, pick the kana. */
export type KanaMode = 'recognition' | 'recall';

export interface KanaConfig {
  scripts: KanaScript[];
  groupIds: string[];
  modes: KanaMode[];
  flow: Flow;
  order: Order;
}

const glyph = (entry: KanaEntry, script: KanaScript): string =>
  script === 'hira' ? entry.hira : entry.kata;

/**
 * Scheduled per script, because knowing あ says very little about knowing ア.
 * They were one item until the guided path made the conflation visible: it
 * marked the katakana stage finished the moment the hiragana one was.
 */
export const kanaItemId = (script: KanaScript, entry: KanaEntry): string =>
  `kana:${script}:${entry.id}`;

export function kanaPool(config: KanaConfig): KanaEntry[] {
  return ALL_KANA.filter((k) => config.groupIds.includes(k.groupId));
}

export function buildKanaCards(config: KanaConfig, s: Strings = en): Card[] {
  const pool = kanaPool(config);
  const cards: Card[] = [];

  for (const script of config.scripts) {
    const glyphPool = pool.map((k) => glyph(k, script));

    for (const entry of pool) {
      const shown = glyph(entry, script);
      const accepted = [entry.romaji, ...entry.alt];
      const details = [`ひらがな ${entry.hira}　·　カタカナ ${entry.kata}`];

      if (config.modes.includes('recognition')) {
        cards.push({
          id: `kana-recognition-${script}-${entry.id}`,
          itemId: kanaItemId(script, entry),
          question: s.card.typeTheSound,
          prompt: shown,
          promptScript: 'jp',
          inputMode: 'type',
          placeholder: 'romaji',
          speech: entry.hira,
          answer: entry.romaji,
          answerScript: 'latin',
          details: entry.alt.length
            ? [...details, s.card.alsoAccepted(entry.alt.join(', '))]
            : details,
          check: (given) => accepted.includes(given.trim().toLowerCase()),
        });
      }

      if (config.modes.includes('recall')) {
        cards.push({
          id: `kana-recall-${script}-${entry.id}`,
          itemId: kanaItemId(script, entry),
          question: s.card.pickThe(s.script[script]),
          prompt: entry.romaji,
          promptScript: 'latin',
          inputMode: 'choice',
          choices: pickChoices(shown, glyphPool, KANA_LOOKALIKES),
          answer: shown,
          answerScript: 'jp',
          details,
          check: exact(shown),
        });
      }
    }
  }

  return cards;
}

// --------------------------------------------------------------- kanji

export type KanjiMode = 'meaning' | 'reading' | 'recall' | 'vocab' | 'listening';

export interface KanjiConfig {
  groupIds: string[];
  /** kanji explicitly switched off inside an otherwise selected group */
  excluded: string[];
  modes: KanjiMode[];
  inputModes: Record<KanjiMode, InputMode>;
  flow: Flow;
  order: Order;
}

export function kanjiPool(config: KanjiConfig): KanjiEntry[] {
  return ALL_KANJI.filter(
    (k) => config.groupIds.includes(k.groupId) && !config.excluded.includes(k.char),
  );
}

/** The reading we show as "the" answer in multiple choice: on'yomi first. */
const headReading = (k: KanjiEntry): string => k.on[0] ?? k.kun[0] ?? '';

const readingDetails = (k: KanjiEntry, s: Strings): string[] => {
  const lines: string[] = [];
  if (k.on.length) lines.push(s.card.on(k.on.join('、')));
  if (k.kun.length) lines.push(s.card.kun(k.kun.join('、')));
  if (k.vocab.length) {
    lines.push(
      k.vocab
        .map((w) => `${w.word} (${w.reading}) — ${meaningOf(w, s.lang)}`)
        .join('　·　'),
    );
  }
  return lines;
};

export function buildKanjiCards(config: KanjiConfig, s: Strings = en): Card[] {
  const pool = kanjiPool(config);
  const cards: Card[] = [];

  const meaningPool = pool.map((k) => meaningsOf(k, s.lang)[0]);
  const charPool = pool.map((k) => k.char);
  const readingPool = pool.map(headReading).filter(Boolean);
  const vocabReadingPool = pool.flatMap((k) => k.vocab.map((w) => w.reading));
  const vocabWordPool = pool.flatMap((k) => k.vocab.map((w) => w.word));

  for (const k of pool) {
    const allReadings = [...k.on, ...k.kun];
    const meanings = meaningsOf(k, s.lang);

    if (config.modes.includes('meaning')) {
      const choice = config.inputModes.meaning === 'choice';
      cards.push({
        id: `kanji-meaning-${k.char}`,
        itemId: `kanji:${k.char}`,
        question: s.card.whatDoesThisMean,
        prompt: k.char,
        promptScript: 'jp',
        inputMode: config.inputModes.meaning,
        placeholder: s.card.meaningPlaceholder(meaningLang(k, s.lang)),
        speech: k.vocab[0]?.reading,
        choices: choice ? pickChoices(meanings[0], meaningPool) : undefined,
        answer: meanings.join(' / '),
        answerScript: 'latin',
        details: readingDetails(k, s),
        check: choice ? exact(meanings[0]) : (given) => checkMeaning(given, meanings),
      });
    }

    if (config.modes.includes('reading') && allReadings.length) {
      const choice = config.inputModes.reading === 'choice';
      const head = headReading(k);
      cards.push({
        id: `kanji-reading-${k.char}`,
        itemId: `kanji:${k.char}`,
        question: choice ? s.card.whichReading : s.card.typeAnyReading,
        prompt: k.char,
        promptScript: 'jp',
        promptNote: meanings[0],
        inputMode: config.inputModes.reading,
        placeholder: s.card.romajiOrKana,
        speech: headReading(k),
        choices: choice ? pickChoices(head, readingPool) : undefined,
        answer: allReadings.join('、'),
        answerScript: 'jp',
        details: readingDetails(k, s),
        check: choice ? exact(head) : (given) => checkReading(given, allReadings),
      });
    }

    if (config.modes.includes('recall')) {
      const choice = config.inputModes.recall === 'choice';
      cards.push({
        id: `kanji-recall-${k.char}`,
        itemId: `kanji:${k.char}`,
        question: choice ? s.card.whichKanji : s.card.writeTheKanji,
        prompt: meanings.join(' / '),
        promptScript: 'latin',
        inputMode: config.inputModes.recall,
        placeholder: s.card.theKanji,
        speech: k.vocab[0]?.reading,
        choices: choice ? pickChoices(k.char, charPool, KANJI_LOOKALIKES) : undefined,
        answer: k.char,
        answerScript: 'jp',
        details: readingDetails(k, s),
        check: exact(k.char),
      });
    }

    if (config.modes.includes('vocab')) {
      const choice = config.inputModes.vocab === 'choice';
      for (const word of k.vocab) {
        cards.push({
          id: `kanji-vocab-${k.char}-${word.word}`,
          itemId: `vocab:${word.word}`,
          question: choice ? s.card.howIsWordRead : s.card.typeWordReading,
          prompt: word.word,
          promptScript: 'jp',
          inputMode: config.inputModes.vocab,
          placeholder: s.card.romajiOrKana,
          speech: word.reading,
          choices: choice ? pickChoices(word.reading, vocabReadingPool) : undefined,
          answer: `${word.reading} (${kanaToRomaji(word.reading)})`,
          answerScript: 'jp',
          details: [`${word.word} — ${meaningOf(word, s.lang)}`, ...readingDetails(k, s)],
          check: choice ? exact(word.reading) : (given) => checkReading(given, [word.reading]),
        });
      }
    }

    if (config.modes.includes('listening')) {
      const choice = config.inputModes.listening === 'choice';
      for (const word of k.vocab) {
        cards.push({
          id: `kanji-listening-${k.char}-${word.word}`,
          itemId: `vocab:${word.word}`,
          question: choice ? s.card.whichWordHeard : s.card.writeWhatYouHear,
          // The audio is the question, so there is nothing to show.
          prompt: '',
          promptScript: 'audio',
          speech: word.reading,
          inputMode: config.inputModes.listening,
          placeholder: s.card.romajiOrKana,
          choices: choice ? pickChoices(word.word, vocabWordPool) : undefined,
          answer: `${word.word}　${word.reading}`,
          answerScript: 'jp',
          details: [`${word.word} (${word.reading}) — ${meaningOf(word, s.lang)}`],
          check: choice ? exact(word.word) : (given) => checkReading(given, [word.reading]),
        });
      }
    }
  }

  return cards;
}

// ------------------------------------------------------------- counters

export type CounterMode = 'reading' | 'meaning' | 'listening';

export interface CounterConfig {
  groupIds: string[];
  /** forms explicitly switched off inside an otherwise selected group */
  excluded: string[];
  modes: CounterMode[];
  inputModes: Record<CounterMode, InputMode>;
  flow: Flow;
  order: Order;
}

export function counterPool(config: CounterConfig): CounterItem[] {
  return ALL_COUNTERS.filter(
    (c) => config.groupIds.includes(c.groupId) && !config.excluded.includes(c.form),
  );
}

const counterDetails = (item: CounterItem, s: Strings): string[] => {
  const lines = [`${item.form}（${item.reading}）— ${meaningOf(item, s.lang)}`];
  if (item.alt?.length) lines.push(s.card.alsoRead(item.alt.join('、')));
  if (item.irregular) lines.push(s.card.soundShifts);
  return lines;
};

export function buildCounterCards(config: CounterConfig, s: Strings = en): Card[] {
  const pool = counterPool(config);
  const cards: Card[] = [];

  const readingPool = pool.map((c) => c.reading);
  const meaningPool = pool.map((c) => meaningOf(c, s.lang));
  const formPool = pool.map((c) => c.form);

  for (const item of pool) {
    const accepted = [item.reading, ...(item.alt ?? [])];
    const meaning = meaningOf(item, s.lang);

    if (config.modes.includes('reading')) {
      const choice = config.inputModes.reading === 'choice';
      cards.push({
        id: `counter-reading-${item.form}`,
        itemId: `counter:${item.form}`,
        question: choice ? s.card.howIsThisRead : s.card.typeTheReading,
        prompt: item.form,
        promptScript: 'jp',
        promptNote: meaning,
        inputMode: config.inputModes.reading,
        placeholder: s.card.romajiOrKana,
        speech: item.reading,
        choices: choice ? pickChoices(item.reading, readingPool) : undefined,
        answer: `${item.reading}（${kanaToRomaji(item.reading)}）`,
        answerScript: 'jp',
        details: counterDetails(item, s),
        check: choice
          ? exact(item.reading)
          : (given) => checkReading(given, accepted),
      });
    }

    if (config.modes.includes('meaning')) {
      const choice = config.inputModes.meaning === 'choice';
      cards.push({
        id: `counter-meaning-${item.form}`,
        itemId: `counter:${item.form}`,
        question: s.card.whatDoesThisMean,
        prompt: item.form,
        promptScript: 'jp',
        inputMode: config.inputModes.meaning,
        placeholder: s.card.meaningPlaceholder(meaningLang(item, s.lang)),
        speech: item.reading,
        choices: choice ? pickChoices(meaning, meaningPool) : undefined,
        answer: meaning,
        answerScript: 'latin',
        details: counterDetails(item, s),
        check: choice ? exact(meaning) : (given) => checkMeaning(given, [meaning]),
      });
    }

    if (config.modes.includes('listening')) {
      const choice = config.inputModes.listening === 'choice';
      cards.push({
        id: `counter-listening-${item.form}`,
        itemId: `counter:${item.form}`,
        question: choice ? s.card.whichOneHeard : s.card.writeWhatYouHear,
        prompt: '',
        promptScript: 'audio',
        speech: item.reading,
        inputMode: config.inputModes.listening,
        placeholder: s.card.romajiOrKana,
        choices: choice ? pickChoices(item.form, formPool) : undefined,
        answer: `${item.form}　${item.reading}`,
        answerScript: 'jp',
        details: counterDetails(item, s),
        check: choice ? exact(item.form) : (given) => checkReading(given, accepted),
      });
    }
  }

  return cards;
}

// ------------------------------------------------------------- vocabulary

export type WordMode = 'meaning' | 'reading' | 'recall' | 'listening';

export interface WordConfig {
  groupIds: string[];
  /** words explicitly switched off inside an otherwise selected group */
  excluded: string[];
  modes: WordMode[];
  inputModes: Record<WordMode, InputMode>;
  flow: Flow;
  order: Order;
}

export function wordPool(config: WordConfig): WordEntry[] {
  return ALL_WORDS.filter(
    (w) => config.groupIds.includes(w.groupId) && !config.excluded.includes(w.word),
  );
}

const wordDetails = (entry: WordEntry, s: Strings): string[] => {
  const meanings = meaningsOf(entry, s.lang).join(', ');
  return [
    hasKanji(entry)
      ? `${entry.word}（${entry.reading}）— ${meanings}`
      : `${entry.word} — ${meanings}`,
    s.wordKind[entry.kind],
  ];
};

export function buildWordCards(config: WordConfig, s: Strings = en): Card[] {
  const pool = wordPool(config);
  const cards: Card[] = [];

  const meaningPool = pool.map((w) => meaningsOf(w, s.lang)[0]);
  const wordPoolText = pool.map((w) => w.word);
  const readingPool = pool.filter(hasKanji).map((w) => w.reading);

  for (const entry of pool) {
    // The kanji deck already tracks its example words under this key, so a word
    // learned there and here shares one schedule rather than being asked twice.
    const itemId = `vocab:${entry.word}`;
    const meanings = meaningsOf(entry, s.lang);

    if (config.modes.includes('meaning')) {
      const choice = config.inputModes.meaning === 'choice';
      cards.push({
        id: `word-meaning-${entry.word}`,
        itemId,
        question: s.card.whatDoesThisMean,
        prompt: entry.word,
        promptScript: 'jp',
        inputMode: config.inputModes.meaning,
        placeholder: s.card.meaningPlaceholder(meaningLang(entry, s.lang)),
        speech: entry.reading,
        choices: choice ? pickChoices(meanings[0], meaningPool) : undefined,
        answer: meanings.join(' / '),
        answerScript: 'latin',
        details: wordDetails(entry, s),
        check: choice ? exact(meanings[0]) : (given) => checkMeaning(given, meanings),
      });
    }

    // Asking for the reading of a word already written in kana is not a question.
    if (config.modes.includes('reading') && hasKanji(entry)) {
      const choice = config.inputModes.reading === 'choice';
      cards.push({
        id: `word-reading-${entry.word}`,
        itemId,
        question: choice ? s.card.howIsThisRead : s.card.typeTheReading,
        prompt: entry.word,
        promptScript: 'jp',
        promptNote: meanings[0],
        inputMode: config.inputModes.reading,
        placeholder: s.card.romajiOrKana,
        speech: entry.reading,
        choices: choice ? pickChoices(entry.reading, readingPool) : undefined,
        answer: `${entry.reading}（${kanaToRomaji(entry.reading)}）`,
        answerScript: 'jp',
        details: wordDetails(entry, s),
        check: choice ? exact(entry.reading) : (given) => checkReading(given, [entry.reading]),
      });
    }

    if (config.modes.includes('recall')) {
      const choice = config.inputModes.recall === 'choice';
      cards.push({
        id: `word-recall-${entry.word}`,
        itemId,
        question: choice ? s.card.whichWord : s.card.writeTheWord,
        prompt: meanings.join(' / '),
        promptScript: 'latin',
        inputMode: config.inputModes.recall,
        placeholder: s.card.theWord,
        speech: entry.reading,
        choices: choice ? pickChoices(entry.word, wordPoolText) : undefined,
        answer: entry.word,
        answerScript: 'jp',
        details: wordDetails(entry, s),
        check: exact(entry.word),
      });
    }

    if (config.modes.includes('listening')) {
      const choice = config.inputModes.listening === 'choice';
      cards.push({
        id: `word-listening-${entry.word}`,
        itemId,
        question: choice ? s.card.whichWordHeard : s.card.writeWhatYouHear,
        prompt: '',
        promptScript: 'audio',
        speech: entry.reading,
        inputMode: config.inputModes.listening,
        placeholder: s.card.romajiOrKana,
        choices: choice ? pickChoices(entry.word, wordPoolText) : undefined,
        answer: hasKanji(entry) ? `${entry.word}　${entry.reading}` : entry.word,
        answerScript: 'jp',
        details: wordDetails(entry, s),
        check: choice ? exact(entry.word) : (given) => checkReading(given, [entry.reading]),
      });
    }
  }

  return cards;
}

// ------------------------------------------------------------ conjugation

export type ConjugationMode = 'produce' | 'identify' | 'dictionary';

export interface ConjugationConfig {
  groupIds: string[];
  /** dictionary forms explicitly switched off inside a selected group */
  excluded: string[];
  verbForms: VerbForm[];
  adjectiveForms: AdjectiveForm[];
  modes: ConjugationMode[];
  inputModes: Record<ConjugationMode, InputMode>;
  flow: Flow;
  order: Order;
}

/** A dictionary entry paired with one of its conjugated forms. */
interface Inflection {
  dictionary: Conjugated;
  meaning: string;
  formId: string;
  formLabel: string;
  conjugated: Conjugated;
  /** labels of the other forms of the same kind, for multiple choice */
  siblingLabels: string[];
}

function inflectionsFor(config: ConjugationConfig, s: Strings): Inflection[] {
  const out: Inflection[] = [];
  const verbLabels = config.verbForms.map((f) => s.verbForm[f]);
  const adjectiveLabels = config.adjectiveForms.map((f) => s.adjectiveForm[f]);

  for (const entry of ALL_VERBS) {
    if (!config.groupIds.includes(entry.groupId) || config.excluded.includes(entry.word)) continue;
    const dictionary = { word: entry.word, reading: entry.reading };
    for (const form of config.verbForms) {
      out.push({
        dictionary,
        meaning: meaningOf(entry, s.lang),
        formId: form,
        formLabel: s.verbForm[form],
        conjugated: conjugateVerb(dictionary, entry.verbClass, form, entry.overrides),
        siblingLabels: verbLabels,
      });
    }
  }

  for (const entry of ALL_ADJECTIVES) {
    if (!config.groupIds.includes(entry.groupId) || config.excluded.includes(entry.word)) continue;
    const dictionary = { word: entry.word, reading: entry.reading };
    for (const form of config.adjectiveForms) {
      out.push({
        dictionary,
        meaning: meaningOf(entry, s.lang),
        formId: form,
        formLabel: s.adjectiveForm[form],
        conjugated: conjugateAdjective(dictionary, entry.adjectiveClass, form, entry.overrides),
        siblingLabels: adjectiveLabels,
      });
    }
  }

  return out;
}

/** Accept the written form, the kana reading, or romaji for either. */
const acceptForm = (target: Conjugated) => (given: string) => {
  const answer = given.trim();
  return answer === target.word || checkReading(answer, [target.reading]);
};

export function buildConjugationCards(config: ConjugationConfig, s: Strings = en): Card[] {
  const inflections = inflectionsFor(config, s);
  const cards: Card[] = [];

  const conjugatedPool = inflections.map((i) => i.conjugated.word);
  const dictionaryPool = [...new Set(inflections.map((i) => i.dictionary.word))];

  for (const item of inflections) {
    const itemId = `conj:${item.dictionary.word}`;
    const detail = [
      `${item.dictionary.word}（${item.dictionary.reading}）— ${item.meaning}`,
      `${item.formLabel}: ${item.conjugated.word}（${item.conjugated.reading}）`,
    ];

    if (config.modes.includes('produce')) {
      const choice = config.inputModes.produce === 'choice';
      cards.push({
        id: `conj-produce-${item.dictionary.word}-${item.formId}`,
        itemId,
        question: choice ? s.card.pickTheForm : s.card.writeThisForm,
        prompt: item.dictionary.word,
        promptScript: 'jp',
        promptNote: item.formLabel,
        inputMode: config.inputModes.produce,
        placeholder: s.card.romajiOrKana,
        speech: item.conjugated.reading,
        choices: choice ? pickChoices(item.conjugated.word, conjugatedPool) : undefined,
        answer: `${item.conjugated.word}（${item.conjugated.reading}）`,
        answerScript: 'jp',
        details: detail,
        check: choice ? exact(item.conjugated.word) : acceptForm(item.conjugated),
      });
    }

    if (config.modes.includes('identify')) {
      cards.push({
        id: `conj-identify-${item.dictionary.word}-${item.formId}`,
        itemId,
        question: s.card.whichForm,
        prompt: item.conjugated.word,
        promptScript: 'jp',
        promptNote: item.meaning,
        // Naming a grammatical form is a recognition task, never typed.
        inputMode: 'choice',
        speech: item.conjugated.reading,
        choices: pickChoices(item.formLabel, item.siblingLabels),
        answer: item.formLabel,
        answerScript: 'latin',
        details: detail,
        check: exact(item.formLabel),
      });
    }

    if (config.modes.includes('dictionary')) {
      const choice = config.inputModes.dictionary === 'choice';
      cards.push({
        id: `conj-dictionary-${item.dictionary.word}-${item.formId}`,
        itemId,
        question: choice ? s.card.whichDictionaryForm : s.card.writeDictionaryForm,
        prompt: item.conjugated.word,
        promptScript: 'jp',
        promptNote: item.formLabel,
        inputMode: config.inputModes.dictionary,
        placeholder: s.card.romajiOrKana,
        speech: item.dictionary.reading,
        choices: choice ? pickChoices(item.dictionary.word, dictionaryPool) : undefined,
        answer: `${item.dictionary.word}（${item.dictionary.reading}）`,
        answerScript: 'jp',
        details: detail,
        check: choice ? exact(item.dictionary.word) : acceptForm(item.dictionary),
      });
    }
  }

  return cards;
}

// -------------------------------------------------------------- particles

export interface ParticleConfig {
  groupIds: string[];
  /** sentences explicitly switched off inside a selected group */
  excluded: string[];
  inputMode: InputMode;
  flow: Flow;
  order: Order;
}

export function particlePool(config: ParticleConfig): ParticleSentence[] {
  return ALL_PARTICLE_SENTENCES.filter(
    (s) => config.groupIds.includes(s.groupId) && !config.excluded.includes(s.text),
  );
}

export function buildParticleCards(config: ParticleConfig, s: Strings = en): Card[] {
  return particlePool(config).map((sentence) => {
    const accepted = acceptedFor(sentence);
    const choice = config.inputMode === 'choice';

    // Distractors must exclude every particle that would also be correct, or
    // the question would have more than one right answer.
    const distractorPool = PARTICLES.filter((p) => !accepted.includes(p));

    const alsoNote = sentence.alsoAccepted?.length
      ? s.card.alsoWorks(sentence.alsoAccepted.join('、'))
      : null;

    return {
      id: `particle-${sentence.text}`,
      itemId: `particle:${sentence.text}`,
      question: s.card.whichParticle,
      prompt: sentence.text,
      promptScript: 'jp',
      promptNote: sentenceOf(sentence, s.lang),
      inputMode: config.inputMode,
      placeholder: s.card.theParticle,
      speech: filled(sentence),
      choices: choice
        ? shuffle([sentence.answer, ...shuffle(distractorPool).slice(0, CHOICE_COUNT - 1)])
        : undefined,
      answer: accepted.join(' / '),
      answerScript: 'jp',
      details: [filled(sentence), whyOf(sentence, s.lang), ...(alsoNote ? [alsoNote] : [])],
      // Typed answers accept kana directly; particles are too short for romaji
      // conversion to be worth the ambiguity.
      check: (given: string) => accepted.includes(given.trim()),
    };
  });
}

// -------------------------------------------------------------- duolingo

/**
 * Which of the four questions to ask. The same four the N5 vocabulary deck
 * asks, because they are the four a word deck has: both directions of the
 * translation, the reading, and the sound.
 */
export type DuolingoMode = 'meaning' | 'recall' | 'reading' | 'listening';

/**
 * How the Japanese side is written — and therefore how it has to be answered.
 *
 * The course writes 見ます with the kanji, which makes "meaning → word" a
 * question you cannot answer without a Japanese IME. Switching the script to
 * kana or romaji rewrites the prompt and the accepted answer together, so the
 * same deck is drillable on a laptop with nothing installed. It also decides
 * how much is really being asked: みます is a different exercise from 見ます,
 * and mimasu is easier again.
 */
export type DuolingoScript = 'word' | 'kana' | 'romaji';

export interface DuolingoConfig {
  /** the course's units are a range, not a set: you are somewhere along them */
  fromUnit: number;
  toUnit: number;
  /** words explicitly switched off inside a unit that is otherwise in range */
  excluded: string[];
  modes: DuolingoMode[];
  inputModes: Record<DuolingoMode, InputMode>;
  script: DuolingoScript;
  flow: Flow;
  order: Order;
}

const inRange = (config: DuolingoConfig, unit: number): boolean =>
  unit >= Math.min(config.fromUnit, config.toUnit) &&
  unit <= Math.max(config.fromUnit, config.toUnit);

export function duolingoUnits(config: DuolingoConfig): DuolingoUnit[] {
  return DUOLINGO_UNITS.filter((unit) => inRange(config, unit.number));
}

export function duolingoPool(config: DuolingoConfig): DuolingoEntry[] {
  return duolingoUnits(config).flatMap((unit) =>
    unit.words.filter((word) => !config.excluded.includes(word.word)),
  );
}

/**
 * The Japanese side, written as the config asks for it. Null when it cannot be
 * written that way at all: a phrase no dictionary will give a reading for has
 * no kana or romaji form to show, so those cards go unbuilt rather than wrong.
 */
function japanese(entry: DuolingoEntry, script: DuolingoScript): string | null {
  if (script === 'word') return entry.word;
  if (!hasReading(entry)) return null;
  return script === 'kana' ? entry.reading : kanaToRomaji(entry.reading);
}

/** Whether this mode has a question to ask about this entry. */
const asks = (mode: DuolingoMode, config: DuolingoConfig, entry: DuolingoEntry): boolean => {
  if (mode === 'reading') {
    // Asking for the reading only makes sense written as the course writes it,
    // and only when that writing hides something: みず is already its reading.
    return config.script === 'word' && hasReading(entry) && duolingoHasKanji(entry);
  }
  if (mode === 'listening' && !hasReading(entry)) return false;
  return japanese(entry, config.script) !== null;
};

/**
 * What Start would produce, without producing it. The deck runs to six
 * thousand words and the setup screen recounts on every keystroke, so the
 * count is worked out arithmetically rather than by building twenty thousand
 * cards and taking their length.
 */
export function duolingoCardCount(config: DuolingoConfig): number {
  let total = 0;
  for (const entry of duolingoPool(config)) {
    for (const mode of config.modes) if (asks(mode, config, entry)) total += 1;
  }
  return total;
}

export function buildDuolingoCards(config: DuolingoConfig, s: Strings = en): Card[] {
  const pool = duolingoPool(config);
  const cards: Card[] = [];
  const units = new Map(DUOLINGO_UNITS.map((unit) => [unit.id, unit]));

  const canonical = (entry: DuolingoEntry): string => meaningsOf(entry, s.lang)[0];

  /**
   * Six thousand imported words share meanings freely — a dozen of them gloss
   * as "to go" — where the hand-written N5 deck has a test forbidding it. So
   * the clash is handled rather than legislated away: every word carrying the
   * same gloss is accepted when the answer is typed, and none of them is ever
   * offered as a distractor to another. Otherwise "go" would put two
   * defensible options on screen with only one of them marked right.
   */
  const byMeaning = new Map<string, DuolingoEntry[]>();
  const byReading = new Map<string, DuolingoEntry[]>();
  /**
   * And the same collision the other way up. 花 and 鼻 are separate words with
   * separate glosses, but written in kana they are both はな, so a session in
   * kana or romaji has to accept "nose" for the one that means flower. Written
   * as the course writes it this map has one entry per key and changes nothing.
   */
  const byWritten = new Map<string, DuolingoEntry[]>();
  for (const entry of pool) {
    const meaning = canonical(entry).toLowerCase();
    byMeaning.set(meaning, [...(byMeaning.get(meaning) ?? []), entry]);
    if (hasReading(entry)) {
      byReading.set(entry.reading, [...(byReading.get(entry.reading) ?? []), entry]);
    }
    const written = japanese(entry, config.script);
    if (written !== null) byWritten.set(written, [...(byWritten.get(written) ?? []), entry]);
  }

  const meaningPool = pool.map(canonical);
  const writtenPool = pool
    .map((entry) => japanese(entry, config.script))
    .filter((written): written is string => written !== null);
  const readingPool = pool.filter(hasReading).map((entry) => entry.reading);

  /**
   * Distractors, drawn rather than filtered.
   *
   * `pickChoices` deduplicates and shuffles whatever pool it is handed, which
   * is right for a deck of two hundred words and quadratic for one of six
   * thousand: building the whole deck that way took eight seconds, nearly all
   * of it rebuilding the same Set once per card. Three options is all it ever
   * needs, so past a certain size it gets a short random sample of the pool
   * instead of the pool. Below that size nothing changes.
   */
  const SAMPLE = 16;
  const drawFrom = (options: string[], correct: string, barred: string[]): string[] => {
    if (options.length <= SAMPLE) {
      return options.filter((option) => option !== correct && !barred.includes(option));
    }
    const drawn: string[] = [];
    for (let i = 0; i < SAMPLE; i++) {
      const option = options[Math.floor(Math.random() * options.length)];
      if (option !== correct && !barred.includes(option)) drawn.push(option);
    }
    return drawn;
  };

  /** The written forms of every other entry that would also be a fair answer. */
  const rivals = (others: DuolingoEntry[] | undefined, entry: DuolingoEntry): string[] =>
    (others ?? [])
      .filter((other) => other.word !== entry.word)
      .map((other) => japanese(other, config.script))
      .filter((written): written is string => written !== null);

  for (const entry of pool) {
    const itemId = duolingoItemId(entry);
    const meanings = meaningsOf(entry, s.lang);
    const written = japanese(entry, config.script);
    const writtenScript = config.script === 'romaji' ? 'latin' : 'jp';
    const unit = units.get(entry.unitId);
    const details = [
      hasReading(entry) && duolingoHasKanji(entry)
        ? `${entry.word}（${entry.reading}）— ${meanings.join(', ')}`
        : `${entry.word} — ${meanings.join(', ')}`,
      unit ? s.duolingo.fromUnit(unit.number, labelOf(unit, s.lang)) : '',
    ].filter(Boolean);

    if (config.modes.includes('meaning') && written !== null) {
      const choice = config.inputModes.meaning === 'choice';
      const homophones = (byWritten.get(written) ?? []).filter(
        (other) => other.word !== entry.word,
      );
      const alsoMeans = homophones.flatMap((other) => meaningsOf(other, s.lang));
      const rivalGlosses = homophones.map(canonical);
      cards.push({
        id: `duo-meaning-${entry.word}`,
        itemId,
        question: s.card.whatDoesThisMean,
        prompt: written,
        promptScript: writtenScript,
        inputMode: config.inputModes.meaning,
        placeholder: s.card.meaningPlaceholder(meaningLang(entry, s.lang)),
        speech: hasReading(entry) ? entry.reading : undefined,
        choices: choice
          ? pickChoices(meanings[0], drawFrom(meaningPool, meanings[0], rivalGlosses))
          : undefined,
        answer: meanings.join(' / '),
        answerScript: 'latin',
        details,
        check: choice
          ? exact(meanings[0])
          : (given) => checkMeaning(given, [...meanings, ...alsoMeans]),
      });
    }

    if (config.modes.includes('recall') && written !== null) {
      const choice = config.inputModes.recall === 'choice';
      const alsoRight = rivals(byMeaning.get(canonical(entry).toLowerCase()), entry);
      const accepted = [written, ...alsoRight];
      cards.push({
        id: `duo-recall-${entry.word}`,
        itemId,
        question: choice ? s.card.whichWord : s.duolingo.writeItAs[config.script],
        prompt: meanings.join(' / '),
        promptScript: 'latin',
        inputMode: config.inputModes.recall,
        placeholder: config.script === 'word' ? s.card.theWord : s.card.romajiOrKana,
        speech: hasReading(entry) ? entry.reading : undefined,
        choices: choice
          ? pickChoices(written, drawFrom(writtenPool, written, alsoRight))
          : undefined,
        answer: written,
        answerScript: writtenScript,
        // Written as the course writes it there is one right spelling. Asked in
        // kana or romaji the reading matcher applies instead, so mimasu and
        // みます both count, exactly as they do everywhere else in the app.
        details,
        check:
          choice || config.script === 'word'
            ? (given) => accepted.includes(given.trim())
            : (given) => checkReading(given, [entry.reading]),
      });
    }

    if (config.modes.includes('reading') && asks('reading', config, entry)) {
      const choice = config.inputModes.reading === 'choice';
      cards.push({
        id: `duo-reading-${entry.word}`,
        itemId,
        question: choice ? s.card.howIsThisRead : s.card.typeTheReading,
        prompt: entry.word,
        promptScript: 'jp',
        promptNote: meanings[0],
        inputMode: config.inputModes.reading,
        placeholder: s.card.romajiOrKana,
        speech: entry.reading,
        choices: choice
          ? pickChoices(entry.reading, drawFrom(readingPool, entry.reading, []))
          : undefined,
        answer: `${entry.reading}（${kanaToRomaji(entry.reading)}）`,
        answerScript: 'jp',
        details,
        check: choice ? exact(entry.reading) : (given) => checkReading(given, [entry.reading]),
      });
    }

    if (config.modes.includes('listening') && written !== null && hasReading(entry)) {
      const choice = config.inputModes.listening === 'choice';
      const alsoRight = rivals(byReading.get(entry.reading), entry);
      const accepted = [written, ...alsoRight];
      cards.push({
        id: `duo-listening-${entry.word}`,
        itemId,
        question: choice ? s.card.whichWordHeard : s.card.writeWhatYouHear,
        prompt: '',
        promptScript: 'audio',
        speech: entry.reading,
        inputMode: config.inputModes.listening,
        placeholder: s.card.romajiOrKana,
        choices: choice
          ? pickChoices(written, drawFrom(writtenPool, written, alsoRight))
          : undefined,
        answer:
          config.script === 'word' && duolingoHasKanji(entry)
            ? `${entry.word}　${entry.reading}`
            : written,
        answerScript: writtenScript,
        details,
        // Homophones are settled by ear and not by spelling, so anything read
        // that way counts — typed, and as an option too.
        check: choice
          ? (given) => accepted.includes(given.trim())
          : (given) => checkReading(given, [entry.reading]),
      });
    }
  }

  return cards;
}
