import { ALL_KANA, type KanaEntry } from '../data/kana';
import { ALL_KANJI, type KanjiEntry } from '../data/kanji';
import { checkMeaning, checkReading, kanaToRomaji } from './romaji';
import { shuffle, type Card, type Flow, type InputMode, type Order } from './session';

const CHOICE_COUNT = 4;

/** Correct answer plus up to three distinct distractors, shuffled. */
function pickChoices(correct: string, pool: string[]): string[] {
  const others = shuffle([...new Set(pool)].filter((p) => p !== correct));
  return shuffle([correct, ...others.slice(0, CHOICE_COUNT - 1)]);
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
          choices: pickChoices(shown, glyphPool),
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

export type KanjiMode = 'meaning' | 'reading' | 'recall' | 'vocab';

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
};

export const KANJI_MODE_BLURB: Record<KanjiMode, string> = {
  meaning: 'See 日, answer “day / sun”.',
  reading: 'See 日, answer any on or kun reading.',
  recall: 'See “day / sun”, produce 日.',
  vocab: 'See 日本, answer the reading にほん.',
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
        choices: choice ? pickChoices(k.char, charPool) : undefined,
        answer: k.char,
        answerScript: 'jp',
        details: readingDetails(k),
        check: exact(k.char),
      });
    }

    if (config.modes.includes('vocab')) {
      const choice = config.inputModes.vocab === 'choice';
      for (const word of k.vocab) {
        const vocabReadingPool = pool.flatMap((other) => other.vocab.map((w) => w.reading));
        cards.push({
          id: `kanji-vocab-${k.char}-${word.word}`,
          itemId: `vocab:${word.word}`,
          question: choice ? 'How is this word read?' : 'Type the reading of this word',
          prompt: word.word,
          promptScript: 'jp',
          inputMode: config.inputModes.vocab,
          placeholder: 'romaji or kana',
          choices: choice ? pickChoices(word.reading, vocabReadingPool) : undefined,
          answer: `${word.reading} (${kanaToRomaji(word.reading)})`,
          answerScript: 'jp',
          details: [`${word.word} — ${word.meaning}`, ...readingDetails(k)],
          check: choice ? exact(word.reading) : (given) => checkReading(given, [word.reading]),
        });
      }
    }
  }

  return cards;
}
