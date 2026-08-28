/**
 * A route through the material.
 *
 * The app can tell you what is due, but not what you should be learning in the
 * first place — and with 739 items across 65 groups, that is the harder
 * question for a beginner. The order below is the conventional one: the kana
 * before anything written with them, numbers before counters, verbs before
 * conjugating them, and everything before the particles that join them up.
 *
 * It suggests and never restricts. Nothing is locked, and choosing decks by
 * hand works exactly as it did.
 */
import type { KanaScript } from '../lib/buildCards';
import type { AdjectiveForm, VerbForm } from '../lib/conjugate';

export type DeckId = 'kana' | 'kanji' | 'counters' | 'words' | 'conjugation' | 'particles';

/** One deck's contribution to a stage. */
export interface StagePart {
  deck: DeckId;
  groupIds: string[];
  /** kana only: which script this stage is about */
  scripts?: KanaScript[];
  /** conjugation only: which forms this stage drills */
  verbForms?: VerbForm[];
  adjectiveForms?: AdjectiveForm[];
}

export interface Stage {
  id: string;
  title: string;
  /** what you should be able to do at the end of it */
  goal: string;
  parts: StagePart[];
}

export const CURRICULUM: Stage[] = [
  {
    id: 'hiragana-basic',
    title: 'Hiragana — the basic 46',
    goal: 'Read あ to ん without stopping to think.',
    parts: [
      {
        deck: 'kana',
        scripts: ['hira'],
        groupIds: ['vowels', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'],
      },
    ],
  },
  {
    id: 'hiragana-rest',
    title: 'Hiragana — dakuten and yōon',
    goal: 'Read が, ぱ and きゃ as easily as the plain kana.',
    parts: [
      {
        deck: 'kana',
        scripts: ['hira'],
        groupIds: ['g', 'z', 'd', 'b', 'p', 'ky', 'sh', 'ch', 'ny', 'hy', 'my', 'ry', 'gy', 'j', 'by', 'py'],
      },
    ],
  },
  {
    id: 'katakana-basic',
    title: 'Katakana — the basic 46',
    goal: 'Read ア to ン, and tell シ from ツ.',
    parts: [
      {
        deck: 'kana',
        scripts: ['kata'],
        groupIds: ['vowels', 'k', 's', 't', 'n', 'h', 'm', 'y', 'r', 'w'],
      },
    ],
  },
  {
    id: 'katakana-rest',
    title: 'Katakana — dakuten and yōon',
    goal: 'Read the loanwords that fill a menu.',
    parts: [
      {
        deck: 'kana',
        scripts: ['kata'],
        groupIds: ['g', 'z', 'd', 'b', 'p', 'ky', 'sh', 'ch', 'ny', 'hy', 'my', 'ry', 'gy', 'j', 'by', 'py'],
      },
    ],
  },
  {
    id: 'numbers',
    title: 'Numbers and money',
    goal: 'Count, and read a price.',
    parts: [{ deck: 'kanji', groupIds: ['numbers'] }],
  },
  {
    id: 'counting',
    title: 'Counting things',
    goal: 'Ask for two of something without guessing at the counter.',
    parts: [{ deck: 'counters', groupIds: ['generic', 'shapes'] }],
  },
  {
    id: 'time',
    title: 'Days, months and the time',
    goal: 'Say what day it is and what time you are meeting.',
    parts: [
      { deck: 'kanji', groupIds: ['time'] },
      { deck: 'counters', groupIds: ['days', 'time', 'months'] },
    ],
  },
  {
    id: 'people-places',
    title: 'People and places',
    goal: 'Talk about who you know and where you go.',
    parts: [
      { deck: 'kanji', groupIds: ['people', 'places'] },
      { deck: 'words', groupIds: ['people', 'places'] },
    ],
  },
  {
    id: 'pointing',
    title: 'This, that, and asking questions',
    goal: 'Point at something and ask what it is.',
    parts: [{ deck: 'words', groupIds: ['pointing'] }],
  },
  {
    id: 'everyday-things',
    title: 'Everyday things',
    goal: 'Name what is in the room, and what is on the table.',
    parts: [
      { deck: 'words', groupIds: ['things', 'food'] },
      { deck: 'kanji', groupIds: ['nature'] },
    ],
  },
  {
    id: 'verbs',
    title: 'Everyday verbs',
    goal: 'Say what you are doing, in the dictionary form.',
    parts: [
      { deck: 'kanji', groupIds: ['verbs'] },
      { deck: 'words', groupIds: ['verbs'] },
    ],
  },
  {
    id: 'polite',
    title: 'Polite and past',
    goal: 'Turn any verb into ます, ません and ました.',
    parts: [
      {
        deck: 'conjugation',
        groupIds: ['godan', 'godan-trap', 'ichidan', 'irregular'],
        verbForms: ['masu', 'masen', 'mashita'],
        adjectiveForms: ['negative'],
      },
    ],
  },
  {
    id: 'te-form',
    title: 'The て-form',
    goal: 'Produce the て-form of any verb without counting on your fingers.',
    parts: [
      {
        deck: 'conjugation',
        groupIds: ['godan', 'godan-trap', 'ichidan', 'irregular'],
        verbForms: ['te', 'ta', 'nai'],
        adjectiveForms: ['negative'],
      },
    ],
  },
  {
    id: 'describing',
    title: 'Describing things',
    goal: 'Say something was big, and that it was not cheap.',
    parts: [
      { deck: 'kanji', groupIds: ['adjectives'] },
      { deck: 'words', groupIds: ['adjectives'] },
      {
        deck: 'conjugation',
        groupIds: ['i-adj', 'na-adj'],
        verbForms: ['masu'],
        adjectiveForms: ['negative', 'past', 'pastNegative'],
      },
    ],
  },
  {
    id: 'particles-core',
    title: 'Particles — を, に and で',
    goal: 'Mark the object, the destination and the place correctly.',
    parts: [{ deck: 'particles', groupIds: ['wo', 'ni', 'de'] }],
  },
  {
    id: 'particles-rest',
    title: 'Particles — the rest',
    goal: 'Handle が, と, の, も, から and まで.',
    parts: [{ deck: 'particles', groupIds: ['ga', 'joining', 'range'] }],
  },
  {
    id: 'position',
    title: 'Position, direction and the body',
    goal: 'Say where something is, and point at yourself while doing it.',
    parts: [
      { deck: 'kanji', groupIds: ['position', 'body'] },
      { deck: 'words', groupIds: ['when'] },
    ],
  },
  {
    id: 'finishing',
    title: 'Finishing up',
    goal: 'The last of the N5 material: bigger numbers, ages, and set phrases.',
    parts: [
      { deck: 'counters', groupIds: ['objects', 'age', 'big'] },
      { deck: 'words', groupIds: ['adverbs', 'phrases'] },
    ],
  },
];
