import { KANA_LOOKALIKES, KANJI_LOOKALIKES } from '../data/confusables';
import { ALL_COUNTERS, type CounterItem } from '../data/counters';
import { ALL_WORDS, hasKanji, type WordEntry } from '../data/words';
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
          itemId: `kana:${entry.id}`,
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
          itemId: `kana:${entry.id}`,
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
