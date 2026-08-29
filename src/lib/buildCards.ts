import { KANA_LOOKALIKES, KANJI_LOOKALIKES } from '../data/confusables';
import { ALL_COUNTERS, type CounterItem } from '../data/counters';
import { ALL_WORDS, hasKanji, type WordEntry } from '../data/words';
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
import { meaningLang, meaningOf, meaningsOf, sentenceOf, whyOf } from '../i18n/content';

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
