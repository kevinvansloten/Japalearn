/**
 * The Duolingo course's vocabulary, as a deck.
 *
 * Everything else in src/data is hand-authored. This is not: it is built by
 * scripts/import-duome.ts from duome.eu's mirror of the course word list, and
 * arrives as the delimited blob in ./duolingo.generated.ts. That file is
 * machine-written and unreadable by design; this one turns it back into the
 * shapes the rest of the app already knows how to use, and is the only place
 * that knows the format.
 *
 * It stands apart from the N5 vocabulary deck on purpose. That deck is a
 * curated route through the exam's core words; this one is a record of what
 * one particular course happened to teach, in the order it taught it, phrases
 * and proper nouns and all. They overlap by about eighty words and answer
 * different questions — "what should I know?" against "what have I been
 * shown?" — so they are scheduled under separate item ids and neither one's
 * progress moves the other's.
 *
 * The awkwardness the format carries is `reading`, which can be empty. The
 * course writes a good deal of its vocabulary as phrases with a particle in
 * the middle, and no dictionary will hand back a reading for メールを読みます.
 * Rather than guess one, those entries say so, and the card builder gives them
 * the cards it can and skips the ones it cannot.
 */
import { DUOLINGO_DATA } from './duolingo.generated';

export interface DuolingoEntry {
  /** as the course writes it, which is not always with kanji */
  word: string;
  /** kana reading; empty when it could not be established */
  reading: string;
  /** accepted English meanings; the first is the canonical one */
  meanings: string[];
  /** the same in Dutch, taken from the course's Dutch edition */
  meaningsNl?: string[];
  unitId: string;
}

export interface DuolingoUnit {
  id: string;
  /** the unit's position in the course path, 1-based */
  number: number;
  label: string;
  labelNl?: string;
  blurb: string;
  blurbNl?: string;
  words: DuolingoEntry[];
}

export const unitId = (number: number): string => `unit-${number}`;

/**
 * Scheduled under their own namespace rather than the N5 deck's `vocab:`, so
 * that drilling six thousand course words does not silently rewrite the
 * progress and mastery dots of the curated deck next door.
 */
export const duolingoItemId = (entry: DuolingoEntry): string => `duo:${entry.word}`;

const KANJI = /[一-龯]/;

export const hasKanji = (entry: DuolingoEntry): boolean => KANJI.test(entry.word);

/** Whether the entry can be spoken, read aloud, or asked for the reading of. */
export const hasReading = (entry: DuolingoEntry): boolean => entry.reading.length > 0;

function parse(): DuolingoUnit[] {
  const units: DuolingoUnit[] = [];
  let current: DuolingoUnit | null = null;

  for (const line of DUOLINGO_DATA.split('\n')) {
    if (!line) continue;

    if (line.startsWith('#')) {
      const [number, label, labelNl, blurb, blurbNl] = line.slice(1).split('\t');
      current = {
        id: unitId(Number(number)),
        number: Number(number),
        label,
        labelNl,
        blurb,
        blurbNl,
        words: [],
      };
      units.push(current);
      continue;
    }

    if (!current) continue;
    const [word, reading, meanings, meaningsNl] = line.split('\t');
    current.words.push({
      word,
      // '=' means the word is already written the way it is read.
      reading: reading === '=' ? word : reading,
      meanings: meanings.split(';'),
      meaningsNl: meaningsNl ? meaningsNl.split(';') : undefined,
      unitId: current.id,
    });
  }

  return units;
}

export const DUOLINGO_UNITS: DuolingoUnit[] = parse();

export const ALL_DUOLINGO_WORDS: DuolingoEntry[] = DUOLINGO_UNITS.flatMap((unit) => unit.words);

export const FIRST_UNIT = 1;
export const LAST_UNIT = DUOLINGO_UNITS.length;
