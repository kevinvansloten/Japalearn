/**
 * The verbs and adjectives the conjugation deck drills.
 *
 * Only three things here are authored: the word, its meaning, and its class.
 * Every conjugated form is derived from those by the rules in lib/conjugate.
 * The class is the fallible part — misfile a verb and every one of its forms
 * is wrong — so `npm run check:data verbs` checks each one against the
 * dictionary's own part-of-speech tag.
 *
 * The verbs that look ichidan but are not (帰る, 入る, 走る, 知る) are the
 * classic trap and are deliberately included.
 */
import type {
  AdjectiveClass,
  AdjectiveForm,
  Conjugated,
  VerbClass,
  VerbForm,
} from '../lib/conjugate';

export interface VerbEntry {
  word: string;
  reading: string;
  meaning: string;
  /** the same in Dutch, where it has been written; see MEANINGS_NL */
  meaningNl?: string;
  verbClass: VerbClass;
  /** forms the rules cannot produce */
  overrides?: Partial<Record<VerbForm, Conjugated>>;
  groupId: string;
}

export interface AdjectiveEntry {
  word: string;
  reading: string;
  meaning: string;
  meaningNl?: string;
  adjectiveClass: AdjectiveClass;
  overrides?: Partial<Record<AdjectiveForm, Conjugated>>;
  groupId: string;
}

const c = (word: string, reading: string): Conjugated => ({ word, reading });

/** [word, reading, meaning, class] */
type VerbRow = [string, string, string, VerbClass, Partial<Record<VerbForm, Conjugated>>?];
type AdjRow = [string, string, string, AdjectiveClass, Partial<Record<AdjectiveForm, Conjugated>>?];

const GODAN: VerbRow[] = [
  ['書く', 'かく', 'to write', 'godan'],
  ['聞く', 'きく', 'to listen', 'godan'],
  ['歩く', 'あるく', 'to walk', 'godan'],
  ['働く', 'はたらく', 'to work', 'godan'],
  ['泳ぐ', 'およぐ', 'to swim', 'godan'],
  ['話す', 'はなす', 'to speak', 'godan'],
  ['消す', 'けす', 'to turn off', 'godan'],
  ['待つ', 'まつ', 'to wait', 'godan'],
  ['立つ', 'たつ', 'to stand', 'godan'],
  ['持つ', 'もつ', 'to hold', 'godan'],
  ['遊ぶ', 'あそぶ', 'to play', 'godan'],
  ['飲む', 'のむ', 'to drink', 'godan'],
  ['読む', 'よむ', 'to read', 'godan'],
  ['休む', 'やすむ', 'to rest', 'godan'],
  ['買う', 'かう', 'to buy', 'godan'],
  ['会う', 'あう', 'to meet', 'godan'],
  ['使う', 'つかう', 'to use', 'godan'],
  ['言う', 'いう', 'to say', 'godan'],
  ['作る', 'つくる', 'to make', 'godan'],
  ['座る', 'すわる', 'to sit', 'godan'],
  ['取る', 'とる', 'to take', 'godan'],
  ['分かる', 'わかる', 'to understand', 'godan'],
  // 行く is the one godan く verb that takes って rather than いて.
  ['行く', 'いく', 'to go', 'godan', { te: c('行って', 'いって'), ta: c('行った', 'いった') }],
  // ある is regular except that its plain negative is simply ない.
  ['ある', 'ある', 'to be (objects)', 'godan', { nai: c('ない', 'ない') }],
];

/** Godan verbs ending in る, which look ichidan and are the usual trap. */
const GODAN_TRAP: VerbRow[] = [
  ['帰る', 'かえる', 'to return home', 'godan'],
  ['入る', 'はいる', 'to enter', 'godan'],
  ['走る', 'はしる', 'to run', 'godan'],
  ['知る', 'しる', 'to know', 'godan'],
];

const ICHIDAN: VerbRow[] = [
  ['食べる', 'たべる', 'to eat', 'ichidan'],
  ['見る', 'みる', 'to see', 'ichidan'],
  ['寝る', 'ねる', 'to sleep', 'ichidan'],
  ['起きる', 'おきる', 'to get up', 'ichidan'],
  ['出る', 'でる', 'to go out', 'ichidan'],
  ['開ける', 'あける', 'to open', 'ichidan'],
  ['閉める', 'しめる', 'to close', 'ichidan'],
  ['教える', 'おしえる', 'to teach', 'ichidan'],
  ['借りる', 'かりる', 'to borrow', 'ichidan'],
  ['いる', 'いる', 'to be (living things)', 'ichidan'],
];

const IRREGULAR: VerbRow[] = [
  ['する', 'する', 'to do', 'irregular', {
    masu: c('します', 'します'),
    masen: c('しません', 'しません'),
    mashita: c('しました', 'しました'),
    te: c('して', 'して'),
    nai: c('しない', 'しない'),
    ta: c('した', 'した'),
  }],
  ['来る', 'くる', 'to come', 'irregular', {
    masu: c('来ます', 'きます'),
    masen: c('来ません', 'きません'),
    mashita: c('来ました', 'きました'),
    te: c('来て', 'きて'),
    nai: c('来ない', 'こない'),
    ta: c('来た', 'きた'),
  }],
  ['勉強する', 'べんきょうする', 'to study', 'irregular', {
    masu: c('勉強します', 'べんきょうします'),
    masen: c('勉強しません', 'べんきょうしません'),
    mashita: c('勉強しました', 'べんきょうしました'),
    te: c('勉強して', 'べんきょうして'),
    nai: c('勉強しない', 'べんきょうしない'),
    ta: c('勉強した', 'べんきょうした'),
  }],
];

const I_ADJ: AdjRow[] = [
  ['大きい', 'おおきい', 'big', 'i'],
  ['小さい', 'ちいさい', 'small', 'i'],
  ['新しい', 'あたらしい', 'new', 'i'],
  ['古い', 'ふるい', 'old', 'i'],
  ['高い', 'たかい', 'expensive', 'i'],
  ['安い', 'やすい', 'cheap', 'i'],
  ['長い', 'ながい', 'long', 'i'],
  ['短い', 'みじかい', 'short', 'i'],
  ['暑い', 'あつい', 'hot', 'i'],
  ['寒い', 'さむい', 'cold', 'i'],
  ['楽しい', 'たのしい', 'fun', 'i'],
  ['面白い', 'おもしろい', 'interesting', 'i'],
  ['難しい', 'むずかしい', 'difficult', 'i'],
  ['忙しい', 'いそがしい', 'busy', 'i'],
  ['おいしい', 'おいしい', 'delicious', 'i'],
  // いい is the one irregular adjective: it conjugates from よい.
  ['いい', 'いい', 'good', 'i', {
    negative: c('よくない', 'よくない'),
    past: c('よかった', 'よかった'),
    pastNegative: c('よくなかった', 'よくなかった'),
  }],
];

const NA_ADJ: AdjRow[] = [
  ['元気', 'げんき', 'well', 'na'],
  ['静か', 'しずか', 'quiet', 'na'],
  ['有名', 'ゆうめい', 'famous', 'na'],
  ['好き', 'すき', 'liked', 'na'],
  ['嫌い', 'きらい', 'disliked', 'na'],
  ['上手', 'じょうず', 'skilful', 'na'],
  ['下手', 'へた', 'unskilful', 'na'],
  ['便利', 'べんり', 'convenient', 'na'],
  ['きれい', 'きれい', 'pretty', 'na'],
  ['にぎやか', 'にぎやか', 'lively', 'na'],
];

export interface ConjugationGroup {
  id: string;
  label: string;
  labelNl?: string;
  blurb: string;
  blurbNl?: string;
  verbs: VerbEntry[];
  adjectives: AdjectiveEntry[];
}

/**
 * Dutch meanings, keyed by the dictionary form. Kept apart from the rows above
 * so a translation can be added without disturbing tables that are checked
 * against the dictionary. Anything absent falls back to the English meaning.
 */
const MEANINGS_NL: Record<string, string> = {};

/** The keys the Dutch table above is allowed to use, for the data tests. */
export const NL_KEYS: string[] = Object.keys(MEANINGS_NL);

const dutch = (word: string) => (MEANINGS_NL[word] ? { meaningNl: MEANINGS_NL[word] } : {});

const verbs = (rows: VerbRow[], groupId: string): VerbEntry[] =>
  rows.map(([word, reading, meaning, verbClass, overrides]) => ({
    word, reading, meaning, ...dutch(word), verbClass, groupId,
    ...(overrides ? { overrides } : {}),
  }));

const adjectives = (rows: AdjRow[], groupId: string): AdjectiveEntry[] =>
  rows.map(([word, reading, meaning, adjectiveClass, overrides]) => ({
    word, reading, meaning, ...dutch(word), adjectiveClass, groupId,
    ...(overrides ? { overrides } : {}),
  }));

export const CONJUGATION_GROUPS: ConjugationGroup[] = [
  {
    id: 'godan',
    label: 'Godan verbs (う-verbs)',
    labelNl: 'Godan-werkwoorden (う-werkwoorden)',
    blurb: 'The big class. The ending shifts row by row, and the て-form depends on which kana it ends in.',
    blurbNl: 'De grote klasse. De uitgang verschuift per rij, en de て-vorm hangt af van de kana waarop het woord eindigt.',
    verbs: verbs(GODAN, 'godan'),
    adjectives: [],
  },
  {
    id: 'godan-trap',
    label: 'Godan verbs that look ichidan',
    labelNl: 'Godan-werkwoorden die op ichidan lijken',
    blurb: '帰る, 入る, 走る, 知る all end in る but conjugate as godan. The classic trap.',
    blurbNl: '帰る, 入る, 走る en 知る eindigen op る maar vervoegen als godan. De klassieke valkuil.',
    verbs: verbs(GODAN_TRAP, 'godan-trap'),
    adjectives: [],
  },
  {
    id: 'ichidan',
    label: 'Ichidan verbs (る-verbs)',
    labelNl: 'Ichidan-werkwoorden (る-werkwoorden)',
    blurb: 'Drop る and add the ending. The easy class, once you know a verb belongs to it.',
    blurbNl: 'Haal る weg en plak de uitgang eraan. De makkelijke klasse, zodra je weet dat een werkwoord erbij hoort.',
    verbs: verbs(ICHIDAN, 'ichidan'),
    adjectives: [],
  },
  {
    id: 'irregular',
    label: 'Irregular verbs',
    labelNl: 'Onregelmatige werkwoorden',
    blurb: 'する and 来る, and the する compounds that follow them.',
    blurbNl: 'する en 来る, en de する-samenstellingen die daarop volgen.',
    verbs: verbs(IRREGULAR, 'irregular'),
    adjectives: [],
  },
  {
    id: 'i-adj',
    label: 'い-adjectives',
    labelNl: 'い-adjectieven',
    blurb: 'Drop い and add くない, かった, くなかった. いい conjugates from よい instead.',
    blurbNl: 'Haal い weg en plak くない, かった of くなかった eraan. いい vervoegt in plaats daarvan vanuit よい.',
    verbs: [],
    adjectives: adjectives(I_ADJ, 'i-adj'),
  },
  {
    id: 'na-adj',
    label: 'な-adjectives',
    labelNl: 'な-adjectieven',
    blurb: 'No stem change at all — じゃない, だった, じゃなかった attach to the word.',
    blurbNl: 'Geen stamverandering — じゃない, だった en じゃなかった hangen gewoon aan het woord.',
    verbs: [],
    adjectives: adjectives(NA_ADJ, 'na-adj'),
  },
];

export const ALL_VERBS: VerbEntry[] = CONJUGATION_GROUPS.flatMap((g) => g.verbs);
export const ALL_ADJECTIVES: AdjectiveEntry[] = CONJUGATION_GROUPS.flatMap((g) => g.adjectives);
