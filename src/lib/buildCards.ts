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
  ALL_READING_SENTENCES,
  reading as sentenceReading,
  written,
  type ReadingSentence,
} from '../data/reading';
import {
  ADJECTIVE_FORM_LABEL,
  VERB_FORM_LABEL,
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

export const SCRIPT_LABEL: Record<KanaScript, string> = {
  hira: 'hiragana',
  kata: 'katakana',
};

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

export function buildKanaCards(config: KanaConfig): Card[] {
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
          question: 'Type the sound',
          prompt: shown,
          promptScript: 'jp',
          inputMode: 'type',
          placeholder: 'romaji',
          speech: entry.hira,
          answer: entry.romaji,
          answerScript: 'latin',
          details: entry.alt.length
            ? [...details, `also accepted: ${entry.alt.join(', ')}`]
            : details,
          check: (given) => accepted.includes(given.trim().toLowerCase()),
        });
      }

      if (config.modes.includes('recall')) {
        cards.push({
          id: `kana-recall-${script}-${entry.id}`,
          itemId: kanaItemId(script, entry),
          question: `Pick the ${SCRIPT_LABEL[script]}`,
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

export const KANJI_MODE_LABEL: Record<KanjiMode, string> = {
  meaning: 'Kanji → meaning',
  reading: 'Kanji → reading',
  recall: 'Meaning → kanji',
  vocab: 'Vocabulary word',
  listening: 'Listening',
};

export const KANJI_MODE_BLURB: Record<KanjiMode, string> = {
  meaning: 'See 日, answer “day / sun”.',
  reading: 'See 日, answer any on or kun reading.',
  recall: 'See “day / sun”, produce 日.',
  vocab: 'See 日本, answer the reading にほん.',
  listening: 'Hear にほん, write down what you heard.',
};

export function kanjiPool(config: KanjiConfig): KanjiEntry[] {
  return ALL_KANJI.filter(
    (k) => config.groupIds.includes(k.groupId) && !config.excluded.includes(k.char),
  );
}

/** The reading we show as "the" answer in multiple choice: on'yomi first. */
const headReading = (k: KanjiEntry): string => k.on[0] ?? k.kun[0] ?? '';

const readingDetails = (k: KanjiEntry): string[] => {
  const lines: string[] = [];
  if (k.on.length) lines.push(`on: ${k.on.join('、')}`);
  if (k.kun.length) lines.push(`kun: ${k.kun.join('、')}`);
  if (k.vocab.length) {
    lines.push(k.vocab.map((w) => `${w.word} (${w.reading}) — ${w.meaning}`).join('　·　'));
  }
  return lines;
};

export function buildKanjiCards(config: KanjiConfig): Card[] {
  const pool = kanjiPool(config);
  const cards: Card[] = [];

  const meaningPool = pool.map((k) => k.meanings[0]);
  const charPool = pool.map((k) => k.char);
  const readingPool = pool.map(headReading).filter(Boolean);
  const vocabReadingPool = pool.flatMap((k) => k.vocab.map((w) => w.reading));
  const vocabWordPool = pool.flatMap((k) => k.vocab.map((w) => w.word));

  for (const k of pool) {
    const allReadings = [...k.on, ...k.kun];

    if (config.modes.includes('meaning')) {
      const choice = config.inputModes.meaning === 'choice';
      cards.push({
        id: `kanji-meaning-${k.char}`,
        itemId: `kanji:${k.char}`,
        question: 'What does this mean?',
        prompt: k.char,
        promptScript: 'jp',
        inputMode: config.inputModes.meaning,
        placeholder: 'meaning in English',
        speech: k.vocab[0]?.reading,
        choices: choice ? pickChoices(k.meanings[0], meaningPool) : undefined,
        answer: k.meanings.join(' / '),
        answerScript: 'latin',
        details: readingDetails(k),
        check: choice
          ? exact(k.meanings[0])
          : (given) => checkMeaning(given, k.meanings),
      });
    }

    if (config.modes.includes('reading') && allReadings.length) {
      const choice = config.inputModes.reading === 'choice';
      const head = headReading(k);
      cards.push({
        id: `kanji-reading-${k.char}`,
        itemId: `kanji:${k.char}`,
        question: choice ? 'Which reading belongs to this kanji?' : 'Type any reading (on or kun)',
        prompt: k.char,
        promptScript: 'jp',
        promptNote: k.meanings[0],
        inputMode: config.inputModes.reading,
        placeholder: 'romaji or kana',
        speech: headReading(k),
        choices: choice ? pickChoices(head, readingPool) : undefined,
        answer: allReadings.join('、'),
        answerScript: 'jp',
        details: readingDetails(k),
        check: choice ? exact(head) : (given) => checkReading(given, allReadings),
      });
    }

    if (config.modes.includes('recall')) {
      const choice = config.inputModes.recall === 'choice';
      cards.push({
        id: `kanji-recall-${k.char}`,
        itemId: `kanji:${k.char}`,
        question: choice ? 'Which kanji is this?' : 'Write the kanji (needs a Japanese IME)',
        prompt: k.meanings.join(' / '),
        promptScript: 'latin',
        inputMode: config.inputModes.recall,
        placeholder: 'the kanji',
        speech: k.vocab[0]?.reading,
        choices: choice ? pickChoices(k.char, charPool, KANJI_LOOKALIKES) : undefined,
        answer: k.char,
        answerScript: 'jp',
        details: readingDetails(k),
        check: exact(k.char),
      });
    }

    if (config.modes.includes('vocab')) {
      const choice = config.inputModes.vocab === 'choice';
      for (const word of k.vocab) {
        cards.push({
          id: `kanji-vocab-${k.char}-${word.word}`,
          itemId: `vocab:${word.word}`,
          question: choice ? 'How is this word read?' : 'Type the reading of this word',
          prompt: word.word,
          promptScript: 'jp',
          inputMode: config.inputModes.vocab,
          placeholder: 'romaji or kana',
          speech: word.reading,
          choices: choice ? pickChoices(word.reading, vocabReadingPool) : undefined,
          answer: `${word.reading} (${kanaToRomaji(word.reading)})`,
          answerScript: 'jp',
          details: [`${word.word} — ${word.meaning}`, ...readingDetails(k)],
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
          question: choice ? 'Which word did you hear?' : 'Write down what you hear',
          // The audio is the question, so there is nothing to show.
          prompt: '',
          promptScript: 'audio',
          speech: word.reading,
          inputMode: config.inputModes.listening,
          placeholder: 'romaji or kana',
          choices: choice ? pickChoices(word.word, vocabWordPool) : undefined,
          answer: `${word.word}　${word.reading}`,
          answerScript: 'jp',
          details: [`${word.word} (${word.reading}) — ${word.meaning}`],
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

export const COUNTER_MODE_LABEL: Record<CounterMode, string> = {
  reading: 'Written → reading',
  meaning: 'Written → meaning',
  listening: 'Listening',
};

export const COUNTER_MODE_BLURB: Record<CounterMode, string> = {
  reading: 'See 六本, answer ろっぽん. This is where the sound changes live.',
  meaning: 'See 二十歳, answer “twenty years old”.',
  listening: 'Hear ろっぽん, work out which one it was.',
};

export function counterPool(config: CounterConfig): CounterItem[] {
  return ALL_COUNTERS.filter(
    (c) => config.groupIds.includes(c.groupId) && !config.excluded.includes(c.form),
  );
}

const counterDetails = (item: CounterItem): string[] => {
  const lines = [`${item.form}（${item.reading}）— ${item.meaning}`];
  if (item.alt?.length) lines.push(`also read ${item.alt.join('、')}`);
  if (item.irregular) lines.push('⚠ the reading shifts here — worth noting');
  return lines;
};

export function buildCounterCards(config: CounterConfig): Card[] {
  const pool = counterPool(config);
  const cards: Card[] = [];

  const readingPool = pool.map((c) => c.reading);
  const meaningPool = pool.map((c) => c.meaning);
  const formPool = pool.map((c) => c.form);

  for (const item of pool) {
    const accepted = [item.reading, ...(item.alt ?? [])];

    if (config.modes.includes('reading')) {
      const choice = config.inputModes.reading === 'choice';
      cards.push({
        id: `counter-reading-${item.form}`,
        itemId: `counter:${item.form}`,
        question: choice ? 'How is this read?' : 'Type the reading',
        prompt: item.form,
        promptScript: 'jp',
        promptNote: item.meaning,
        inputMode: config.inputModes.reading,
        placeholder: 'romaji or kana',
        speech: item.reading,
        choices: choice ? pickChoices(item.reading, readingPool) : undefined,
        answer: `${item.reading}（${kanaToRomaji(item.reading)}）`,
        answerScript: 'jp',
        details: counterDetails(item),
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
        question: 'What does this mean?',
        prompt: item.form,
        promptScript: 'jp',
        inputMode: config.inputModes.meaning,
        placeholder: 'meaning in English',
        speech: item.reading,
        choices: choice ? pickChoices(item.meaning, meaningPool) : undefined,
        answer: item.meaning,
        answerScript: 'latin',
        details: counterDetails(item),
        check: choice ? exact(item.meaning) : (given) => checkMeaning(given, [item.meaning]),
      });
    }

    if (config.modes.includes('listening')) {
      const choice = config.inputModes.listening === 'choice';
      cards.push({
        id: `counter-listening-${item.form}`,
        itemId: `counter:${item.form}`,
        question: choice ? 'Which one did you hear?' : 'Write down what you hear',
        prompt: '',
        promptScript: 'audio',
        speech: item.reading,
        inputMode: config.inputModes.listening,
        placeholder: 'romaji or kana',
        choices: choice ? pickChoices(item.form, formPool) : undefined,
        answer: `${item.form}　${item.reading}`,
        answerScript: 'jp',
        details: counterDetails(item),
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

export const WORD_MODE_LABEL: Record<WordMode, string> = {
  meaning: 'Word → meaning',
  reading: 'Word → reading',
  recall: 'Meaning → word',
  listening: 'Listening',
};

export const WORD_MODE_BLURB: Record<WordMode, string> = {
  meaning: 'See 手紙, answer “letter”.',
  reading: 'See 手紙, answer てがみ. Skipped for words already written in kana.',
  recall: 'See “letter”, pick 手紙 out of four.',
  listening: 'Hear てがみ, work out which word it was.',
};

export function wordPool(config: WordConfig): WordEntry[] {
  return ALL_WORDS.filter(
    (w) => config.groupIds.includes(w.groupId) && !config.excluded.includes(w.word),
  );
}

const KIND_LABEL: Record<WordEntry['kind'], string> = {
  noun: 'noun',
  verb: 'verb',
  adjective: 'adjective',
  adverb: 'adverb',
  expression: 'expression',
  pronoun: 'pronoun',
};

const wordDetails = (entry: WordEntry): string[] => [
  hasKanji(entry)
    ? `${entry.word}（${entry.reading}）— ${entry.meanings.join(', ')}`
    : `${entry.word} — ${entry.meanings.join(', ')}`,
  KIND_LABEL[entry.kind],
];

export function buildWordCards(config: WordConfig): Card[] {
  const pool = wordPool(config);
  const cards: Card[] = [];

  const meaningPool = pool.map((w) => w.meanings[0]);
  const wordPoolText = pool.map((w) => w.word);
  const readingPool = pool.filter(hasKanji).map((w) => w.reading);

  for (const entry of pool) {
    // The kanji deck already tracks its example words under this key, so a word
    // learned there and here shares one schedule rather than being asked twice.
    const itemId = `vocab:${entry.word}`;

    if (config.modes.includes('meaning')) {
      const choice = config.inputModes.meaning === 'choice';
      cards.push({
        id: `word-meaning-${entry.word}`,
        itemId,
        question: 'What does this mean?',
        prompt: entry.word,
        promptScript: 'jp',
        inputMode: config.inputModes.meaning,
        placeholder: 'meaning in English',
        speech: entry.reading,
        choices: choice ? pickChoices(entry.meanings[0], meaningPool) : undefined,
        answer: entry.meanings.join(' / '),
        answerScript: 'latin',
        details: wordDetails(entry),
        check: choice
          ? exact(entry.meanings[0])
          : (given) => checkMeaning(given, entry.meanings),
      });
    }

    // Asking for the reading of a word already written in kana is not a question.
    if (config.modes.includes('reading') && hasKanji(entry)) {
      const choice = config.inputModes.reading === 'choice';
      cards.push({
        id: `word-reading-${entry.word}`,
        itemId,
        question: choice ? 'How is this read?' : 'Type the reading',
        prompt: entry.word,
        promptScript: 'jp',
        promptNote: entry.meanings[0],
        inputMode: config.inputModes.reading,
        placeholder: 'romaji or kana',
        speech: entry.reading,
        choices: choice ? pickChoices(entry.reading, readingPool) : undefined,
        answer: `${entry.reading}（${kanaToRomaji(entry.reading)}）`,
        answerScript: 'jp',
        details: wordDetails(entry),
        check: choice ? exact(entry.reading) : (given) => checkReading(given, [entry.reading]),
      });
    }

    if (config.modes.includes('recall')) {
      const choice = config.inputModes.recall === 'choice';
      cards.push({
        id: `word-recall-${entry.word}`,
        itemId,
        question: choice ? 'Which word is this?' : 'Write the word (needs a Japanese IME)',
        prompt: entry.meanings.join(' / '),
        promptScript: 'latin',
        inputMode: config.inputModes.recall,
        placeholder: 'the word',
        speech: entry.reading,
        choices: choice ? pickChoices(entry.word, wordPoolText) : undefined,
        answer: entry.word,
        answerScript: 'jp',
        details: wordDetails(entry),
        check: exact(entry.word),
      });
    }

    if (config.modes.includes('listening')) {
      const choice = config.inputModes.listening === 'choice';
      cards.push({
        id: `word-listening-${entry.word}`,
        itemId,
        question: choice ? 'Which word did you hear?' : 'Write down what you hear',
        prompt: '',
        promptScript: 'audio',
        speech: entry.reading,
        inputMode: config.inputModes.listening,
        placeholder: 'romaji or kana',
        choices: choice ? pickChoices(entry.word, wordPoolText) : undefined,
        answer: hasKanji(entry) ? `${entry.word}　${entry.reading}` : entry.word,
        answerScript: 'jp',
        details: wordDetails(entry),
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

export const CONJUGATION_MODE_LABEL: Record<ConjugationMode, string> = {
  produce: 'Produce the form',
  identify: 'Name the form',
  dictionary: 'Back to the dictionary form',
};

export const CONJUGATION_MODE_BLURB: Record<ConjugationMode, string> = {
  produce: 'See 書く and “て-form”, answer 書いて.',
  identify: 'See 書いて, work out which form it is.',
  dictionary: 'See 書きました, answer 書く.',
};

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

function inflectionsFor(config: ConjugationConfig): Inflection[] {
  const out: Inflection[] = [];
  const verbLabels = config.verbForms.map((f) => VERB_FORM_LABEL[f]);
  const adjectiveLabels = config.adjectiveForms.map((f) => ADJECTIVE_FORM_LABEL[f]);

  for (const entry of ALL_VERBS) {
    if (!config.groupIds.includes(entry.groupId) || config.excluded.includes(entry.word)) continue;
    const dictionary = { word: entry.word, reading: entry.reading };
    for (const form of config.verbForms) {
      out.push({
        dictionary,
        meaning: entry.meaning,
        formId: form,
        formLabel: VERB_FORM_LABEL[form],
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
        meaning: entry.meaning,
        formId: form,
        formLabel: ADJECTIVE_FORM_LABEL[form],
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

export function buildConjugationCards(config: ConjugationConfig): Card[] {
  const inflections = inflectionsFor(config);
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
        question: choice ? 'Pick the right form' : 'Write this form',
        prompt: item.dictionary.word,
        promptScript: 'jp',
        promptNote: item.formLabel,
        inputMode: config.inputModes.produce,
        placeholder: 'romaji or kana',
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
        question: 'Which form is this?',
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
        question: choice ? 'Which is the dictionary form?' : 'Write the dictionary form',
        prompt: item.conjugated.word,
        promptScript: 'jp',
        promptNote: item.formLabel,
        inputMode: config.inputModes.dictionary,
        placeholder: 'romaji or kana',
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

export function buildParticleCards(config: ParticleConfig): Card[] {
  return particlePool(config).map((sentence) => {
    const accepted = acceptedFor(sentence);
    const choice = config.inputMode === 'choice';

    // Distractors must exclude every particle that would also be correct, or
    // the question would have more than one right answer.
    const distractorPool = PARTICLES.filter((p) => !accepted.includes(p));

    const alsoNote = sentence.alsoAccepted?.length
      ? `${sentence.alsoAccepted.join('、')} also works here.`
      : null;

    return {
      id: `particle-${sentence.text}`,
      itemId: `particle:${sentence.text}`,
      question: 'Which particle belongs in the gap?',
      prompt: sentence.text,
      promptScript: 'jp',
      promptNote: sentence.english,
      inputMode: config.inputMode,
      placeholder: 'the particle',
      speech: filled(sentence),
      choices: choice
        ? shuffle([sentence.answer, ...shuffle(distractorPool).slice(0, CHOICE_COUNT - 1)])
        : undefined,
      answer: accepted.join(' / '),
      answerScript: 'jp',
      details: [filled(sentence), sentence.why, ...(alsoNote ? [alsoNote] : [])],
      // Typed answers accept kana directly; particles are too short for romaji
      // conversion to be worth the ambiguity.
      check: (given: string) => accepted.includes(given.trim()),
    };
  });
}

// ---------------------------------------------------------------- reading

export type ReadingMode = 'meaning' | 'listening';

export interface ReadingConfig {
  groupIds: string[];
  /** sentences explicitly switched off inside a selected group */
  excluded: string[];
  modes: ReadingMode[];
  flow: Flow;
  order: Order;
}

export const READING_MODE_LABEL: Record<ReadingMode, string> = {
  meaning: 'Read it',
  listening: 'Hear it',
};

export const READING_MODE_BLURB: Record<ReadingMode, string> = {
  meaning: 'Read the sentence and pick what it means.',
  listening: 'Hear the sentence and pick what it means.',
};

export function readingPool(config: ReadingConfig): ReadingSentence[] {
  return ALL_READING_SENTENCES.filter(
    (s) => config.groupIds.includes(s.groupId) && !config.excluded.includes(written(s)),
  );
}

export function buildReadingCards(config: ReadingConfig): Card[] {
  const pool = readingPool(config);
  const cards: Card[] = [];
  const englishPool = pool.map((s) => s.english);

  for (const sentence of pool) {
    const text = written(sentence);
    const kana = sentenceReading(sentence);
    const itemId = `reading:${text}`;
    // Translating a whole sentence by typing cannot be graded fairly, so
    // comprehension is always multiple choice.
    const choices = pickChoices(sentence.english, englishPool);
    const details = [kana, sentence.english];

    if (config.modes.includes('meaning')) {
      cards.push({
        id: `reading-meaning-${text}`,
        itemId,
        question: 'What does this say?',
        prompt: text,
        promptScript: 'jp',
        promptRuby: sentence.segments,
        inputMode: 'choice',
        speech: kana,
        choices,
        answer: sentence.english,
        answerScript: 'latin',
        details,
        check: exact(sentence.english),
      });
    }

    if (config.modes.includes('listening')) {
      cards.push({
        id: `reading-listening-${text}`,
        itemId,
        question: 'What did you hear?',
        prompt: '',
        promptScript: 'audio',
        speech: kana,
        inputMode: 'choice',
        choices,
        answer: sentence.english,
        answerScript: 'latin',
        details: [text, ...details],
        check: exact(sentence.english),
      });
    }
  }

  return cards;
}
