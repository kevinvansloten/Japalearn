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

export type DeckId =
  | 'kana' | 'kanji' | 'counters' | 'words' | 'conjugation' | 'particles' | 'reading';

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
  titleNl?: string;
  /** what you should be able to do at the end of it */
  goal: string;
  goalNl?: string;
  parts: StagePart[];
}

export const CURRICULUM: Stage[] = [
  {
    id: 'hiragana-basic',
    title: 'Hiragana — the basic 46',
    titleNl: 'Hiragana — de basis 46',
    goal: 'Read あ to ん without stopping to think.',
    goalNl: 'Lees あ tot ん zonder na te denken.',
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
    titleNl: 'Hiragana — dakuten en yōon',
    goal: 'Read が, ぱ and きゃ as easily as the plain kana.',
    goalNl: 'Lees が, ぱ en きゃ net zo makkelijk als de gewone kana.',
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
    titleNl: 'Katakana — de basis 46',
    goal: 'Read ア to ン, and tell シ from ツ.',
    goalNl: 'Lees ア tot ン, en houd シ en ツ uit elkaar.',
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
    titleNl: 'Katakana — dakuten en yōon',
    goal: 'Read the loanwords that fill a menu.',
    goalNl: 'Lees de leenwoorden waar een menukaart vol mee staat.',
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
    titleNl: 'Getallen en geld',
    goal: 'Count, and read a price.',
    goalNl: 'Tellen, en een prijs lezen.',
    parts: [{ deck: 'kanji', groupIds: ['numbers'] }],
  },
  {
    id: 'counting',
    title: 'Counting things',
    titleNl: 'Dingen tellen',
    goal: 'Ask for two of something without guessing at the counter.',
    goalNl: 'Vraag om twee van iets zonder naar het telwoord te gissen.',
    parts: [{ deck: 'counters', groupIds: ['generic', 'shapes'] }],
  },
  {
    id: 'time',
    title: 'Days, months and the time',
    titleNl: 'Dagen, maanden en de tijd',
    goal: 'Say what day it is and what time you are meeting.',
    goalNl: 'Zeg welke dag het is en hoe laat je afspreekt.',
    parts: [
      { deck: 'kanji', groupIds: ['time'] },
      { deck: 'counters', groupIds: ['days', 'time', 'months'] },
    ],
  },
  {
    id: 'people-places',
    title: 'People and places',
    titleNl: 'Mensen en plaatsen',
    goal: 'Talk about who you know and where you go.',
    goalNl: 'Praat over wie je kent en waar je heen gaat.',
    parts: [
      { deck: 'kanji', groupIds: ['people', 'places'] },
      { deck: 'words', groupIds: ['people', 'places'] },
    ],
  },
  {
    id: 'pointing',
    title: 'This, that, and asking questions',
    titleNl: 'Dit, dat, en vragen stellen',
    goal: 'Point at something and ask what it is.',
    goalNl: 'Wijs iets aan en vraag wat het is.',
    parts: [{ deck: 'words', groupIds: ['pointing'] }],
  },
  {
    id: 'everyday-things',
    title: 'Everyday things',
    titleNl: 'Alledaagse dingen',
    goal: 'Name what is in the room, and what is on the table.',
    goalNl: 'Benoem wat er in de kamer staat, en wat er op tafel ligt.',
    parts: [
      { deck: 'words', groupIds: ['things', 'food'] },
      { deck: 'kanji', groupIds: ['nature'] },
    ],
  },
  {
    id: 'verbs',
    title: 'Everyday verbs',
    titleNl: 'Alledaagse werkwoorden',
    goal: 'Say what you are doing, in the dictionary form.',
    goalNl: 'Zeg wat je doet, in de woordenboekvorm.',
    parts: [
      { deck: 'kanji', groupIds: ['verbs'] },
      { deck: 'words', groupIds: ['verbs'] },
    ],
  },
  {
    id: 'polite',
    title: 'Polite and past',
    titleNl: 'Beleefd en verleden',
    goal: 'Turn any verb into ます, ません and ました.',
    goalNl: 'Maak van elk werkwoord ます, ません en ました.',
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
    titleNl: 'De て-vorm',
    goal: 'Produce the て-form of any verb without counting on your fingers.',
    goalNl: 'Maak de て-vorm van elk werkwoord zonder op je vingers te tellen.',
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
    titleNl: 'Dingen beschrijven',
    goal: 'Say something was big, and that it was not cheap.',
    goalNl: 'Zeg dat iets groot was, en dat het niet goedkoop was.',
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
    titleNl: 'Partikels — を, に en で',
    goal: 'Mark the object, the destination and the place correctly.',
    goalNl: 'Markeer het lijdend voorwerp, de bestemming en de plaats correct.',
    parts: [{ deck: 'particles', groupIds: ['wo', 'ni', 'de'] }],
  },
  {
    id: 'particles-rest',
    title: 'Particles — the rest',
    titleNl: 'Partikels — de rest',
    goal: 'Handle が, と, の, も, から and まで.',
    goalNl: 'Ga om met が, と, の, も, から en まで.',
    parts: [{ deck: 'particles', groupIds: ['ga', 'joining', 'range'] }],
  },
  {
    id: 'position',
    title: 'Position, direction and the body',
    titleNl: 'Positie, richting en het lichaam',
    goal: 'Say where something is, and point at yourself while doing it.',
    goalNl: 'Zeg waar iets is, en wijs daarbij naar jezelf.',
    parts: [
      { deck: 'kanji', groupIds: ['position', 'body'] },
      { deck: 'words', groupIds: ['when'] },
    ],
  },
  {
    id: 'reading',
    title: 'Reading whole sentences',
    titleNl: 'Hele zinnen lezen',
    goal: 'Read a sentence and know what it says, without the furigana.',
    goalNl: 'Lees een zin en weet wat er staat, zonder de furigana.',
    parts: [
      { deck: 'reading', groupIds: ['statements', 'routine', 'going', 'describing', 'questions'] },
    ],
  },
  {
    id: 'finishing',
    title: 'Finishing up',
    titleNl: 'Afronden',
    goal: 'The last of the N5 material: bigger numbers, ages, and set phrases.',
    goalNl: 'De laatste N5-stof: grotere getallen, leeftijden en vaste uitdrukkingen.',
    parts: [
      { deck: 'counters', groupIds: ['objects', 'age', 'big'] },
      { deck: 'words', groupIds: ['adverbs', 'phrases'] },
    ],
  },
];
