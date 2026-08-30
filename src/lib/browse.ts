/**
 * The material, flattened into something readable.
 *
 * Every deck in this app exists to ask questions, and until now that was the
 * only way to meet any of it: you could be asked what 手紙 means but never sit
 * and read that it means "letter". This turns each dataset into plain lines —
 * the Japanese, how it is read, what it means — so there is a page to learn
 * from rather than only a page to be tested by.
 *
 * It is a projection, not a second copy. Nothing is written down here that is
 * not already in src/data; this module only decides what a deck looks like
 * when it is being read instead of drilled, which is why the kanji deck brings
 * its readings and example words along and the conjugation deck brings every
 * form it can derive. The item ids match the ones the scheduler uses, so the
 * mastery dots on the page are the same numbers the progress screen reports.
 */
import { ALL_KANA, KANA_GROUPS } from '../data/kana';
import { ALL_KANJI, KANJI_GROUPS } from '../data/kanji';
import { ALL_COUNTERS, COUNTER_GROUPS } from '../data/counters';
import { ALL_WORDS, WORD_GROUPS, hasKanji } from '../data/words';
import { ALL_ADJECTIVES, ALL_VERBS, CONJUGATION_GROUPS } from '../data/conjugation';
import { ALL_PARTICLE_SENTENCES, PARTICLE_GROUPS, filled } from '../data/particles';
import {
  ALL_READING_SENTENCES,
  READING_GROUPS,
  reading as sentenceKana,
  written,
} from '../data/reading';
import {
  ALL_DUOLINGO_WORDS,
  DUOLINGO_UNITS,
  duolingoItemId,
  hasKanji as duolingoHasKanji,
  hasReading,
} from '../data/duolingo';
import {
  ADJECTIVE_FORMS,
  VERB_FORMS,
  conjugateAdjective,
  conjugateVerb,
} from './conjugate';
import { kanaItemId } from './buildCards';
import { kanaToRomaji } from './romaji';
import { en, type Strings } from '../i18n/en';
import { blurbOf, labelOf, meaningOf, meaningsOf, sentenceOf, whyOf } from '../i18n/content';

export type BrowseDeck =
  | 'kana'
  | 'kanji'
  | 'counters'
  | 'words'
  | 'conjugation'
  | 'particles'
  | 'reading'
  | 'duolingo';

export const BROWSE_DECKS: BrowseDeck[] = [
  'kana',
  'kanji',
  'counters',
  'words',
  'conjugation',
  'particles',
  'reading',
  'duolingo',
];

export interface Line {
  /** the scheduler's id, so the page can show what you already know */
  itemId: string;
  /** the Japanese, written as the deck writes it */
  jp: string;
  /** kana reading, when the writing does not already give it away */
  reading: string;
  /** what it means, or for kana, how it sounds */
  gloss: string;
  /** the second line: readings, example words, derived forms, a why */
  note?: string;
  /** what to read aloud; empty when there is nothing sayable */
  speech: string;
}

export interface Section {
  id: string;
  label: string;
  blurb?: string;
  lines: Line[];
}

const join = '　·　';

/**
 * A second line, or none at all. An empty string is not the same as no note:
 * it would render as a blank row under the meaning, which reads as something
 * missing rather than as nothing to add.
 */
const note = (parts: (string | false | undefined)[]): string | undefined => {
  const written = parts.filter((part): part is string => Boolean(part && part.trim()));
  return written.length ? written.join(join) : undefined;
};

// ------------------------------------------------------------------ decks

function kanjiSections(s: Strings): Section[] {
  return KANJI_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    lines: group.kanji.map((kanji) => {
      const readings = [
        kanji.on.length ? s.card.on(kanji.on.join('、')) : '',
        kanji.kun.length ? s.card.kun(kanji.kun.join('、')) : '',
      ].filter(Boolean);
      const vocab = kanji.vocab.map(
        (word) => `${word.word}（${word.reading}）${meaningOf(word, s.lang)}`,
      );
      return {
        itemId: `kanji:${kanji.char}`,
        jp: kanji.char,
        reading: '',
        gloss: meaningsOf(kanji, s.lang).join(', '),
        note: note([...readings, ...vocab]),
        // The character alone is ambiguous to a speech engine; its first
        // example word is the reading a learner would want to hear.
        speech: kanji.vocab[0]?.reading ?? '',
      };
    }),
  }));
}

function counterSections(s: Strings): Section[] {
  return COUNTER_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    lines: group.items.map((item) => ({
      itemId: `counter:${item.form}`,
      jp: item.form,
      reading: item.reading,
      gloss: meaningOf(item, s.lang),
      note: note([
        item.irregular && s.browse.soundChange,
        item.alt?.length ? s.card.alsoRead(item.alt.join('、')) : '',
      ]),
      speech: item.reading,
    })),
  }));
}

function wordSections(s: Strings): Section[] {
  return WORD_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    lines: group.words.map((word) => ({
      itemId: `vocab:${word.word}`,
      jp: word.word,
      reading: hasKanji(word) ? word.reading : '',
      gloss: meaningsOf(word, s.lang).join(', '),
      note: s.wordKind[word.kind],
      speech: word.reading,
    })),
  }));
}

/**
 * The one deck whose page is worth more than its cards.
 *
 * Every form is derived rather than stored, so the app can show all of them at
 * once for nothing: 書く beside 書きます, 書いて, 書かない and 書いた is the
 * table a textbook would print, and the thing a learner actually wants to sit
 * and stare at.
 */
function conjugationSections(s: Strings): Section[] {
  return CONJUGATION_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    lines: [
      ...group.verbs.map((verb) => ({
        itemId: `conj:${verb.word}`,
        jp: verb.word,
        reading: verb.reading,
        gloss: meaningOf(verb, s.lang),
        note: VERB_FORMS.map((form) => {
          const conjugated = conjugateVerb(verb, verb.verbClass, form, verb.overrides);
          return `${s.verbForm[form]} ${conjugated.word}`;
        }).join(join),
        speech: verb.reading,
      })),
      ...group.adjectives.map((adjective) => ({
        itemId: `conj:${adjective.word}`,
        jp: adjective.word,
        reading: adjective.reading,
        gloss: meaningOf(adjective, s.lang),
        note: ADJECTIVE_FORMS.map((form) => {
          const conjugated = conjugateAdjective(
            adjective,
            adjective.adjectiveClass,
            form,
            adjective.overrides,
          );
          return `${s.adjectiveForm[form]} ${conjugated.word}`;
        }).join(join),
        speech: adjective.reading,
      })),
    ],
  })).filter((section) => section.lines.length > 0);
}

function particleSections(s: Strings): Section[] {
  return PARTICLE_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    lines: group.sentences.map((sentence) => ({
      itemId: `particle:${sentence.text}`,
      // Filled in, because a gap is a question and this page is not asking one.
      jp: filled(sentence),
      reading: '',
      gloss: sentenceOf(sentence, s.lang),
      note: whyOf(sentence, s.lang),
      speech: filled(sentence),
    })),
  }));
}

/**
 * The reading deck is the one place a whole sentence is the entry, so the
 * reading goes on the second line rather than beside the written form: a
 * sentence and its kana do not fit side by side.
 */
function readingSections(s: Strings): Section[] {
  return READING_GROUPS.map((group) => ({
    id: group.id,
    label: labelOf(group, s.lang),
    blurb: blurbOf(group, s.lang),
    lines: group.sentences.map((sentence) => ({
      itemId: `reading:${written(sentence)}`,
      jp: written(sentence),
      reading: sentenceKana(sentence),
      gloss: sentenceOf(sentence, s.lang),
      speech: sentenceKana(sentence),
    })),
  }));
}

function duolingoSections(s: Strings): Section[] {
  return DUOLINGO_UNITS.map((unit) => ({
    id: unit.id,
    label: `${unit.number}. ${labelOf(unit, s.lang)}`,
    blurb: blurbOf(unit, s.lang),
    lines: unit.words.map((word) => ({
      itemId: duolingoItemId(word),
      jp: word.word,
      reading: hasReading(word) && duolingoHasKanji(word) ? word.reading : '',
      gloss: meaningsOf(word, s.lang).join(', '),
      speech: word.reading,
    })),
  }));
}

/**
 * Kana are the exception: they are laid out as the syllabary rather than as a
 * list, so the screen renders them itself from KANA_GROUPS. They are flattened
 * here anyway, because search has to reach them like anything else.
 */
function kanaSections(s: Strings): Section[] {
  return KANA_GROUPS.map((group) => ({
    id: group.id,
    label: group.label,
    blurb: s.kanaSection[group.section],
    lines: group.kana.map((kana) => ({
      itemId: kanaItemId('hira', kana),
      jp: `${kana.hira}　${kana.kata}`,
      reading: '',
      gloss: kana.romaji,
      note: kana.alt.length ? s.card.alsoAccepted(kana.alt.join(', ')) : undefined,
      speech: kana.hira,
    })),
  }));
}

export function sectionsFor(deck: BrowseDeck, s: Strings = en): Section[] {
  switch (deck) {
    case 'kana':
      return kanaSections(s);
    case 'kanji':
      return kanjiSections(s);
    case 'counters':
      return counterSections(s);
    case 'words':
      return wordSections(s);
    case 'conjugation':
      return conjugationSections(s);
    case 'particles':
      return particleSections(s);
    case 'reading':
      return readingSections(s);
    case 'duolingo':
      return duolingoSections(s);
  }
}

/**
 * How many entries a deck holds, for the deck picker.
 *
 * Counted off the datasets rather than by projecting them: the picker asks
 * this for all seven decks on every keystroke in the search box, and building
 * six thousand Duolingo lines to take their length is how the last screen
 * became slow.
 */
export const deckSize = (deck: BrowseDeck): number => {
  switch (deck) {
    case 'kana':
      return ALL_KANA.length;
    case 'kanji':
      return ALL_KANJI.length;
    case 'counters':
      return ALL_COUNTERS.length;
    case 'words':
      return ALL_WORDS.length;
    case 'conjugation':
      return ALL_VERBS.length + ALL_ADJECTIVES.length;
    case 'particles':
      return ALL_PARTICLE_SENTENCES.length;
    case 'reading':
      return ALL_READING_SENTENCES.length;
    case 'duolingo':
      return ALL_DUOLINGO_WORDS.length;
  }
};

// ----------------------------------------------------------------- search

/**
 * Matching is deliberately loose: the point of the box is to find a word you
 * half-remember. It looks at the Japanese, the reading, the meaning and the
 * note, and at the reading written in romaji too — someone who cannot type
 * kana should still be able to look up たべます by typing "tabemasu".
 */
export function matches(line: Line, query: string): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const haystack = [
    line.jp,
    line.reading,
    line.gloss,
    line.note ?? '',
    line.reading ? kanaToRomaji(line.reading) : '',
    kanaToRomaji(line.jp),
  ];
  return haystack.some((field) => field.toLowerCase().includes(needle));
}

export function search(sections: Section[], query: string): Line[] {
  return sections.flatMap((section) => section.lines.filter((line) => matches(line, query)));
}
