export type KanaSection = 'gojuon' | 'dakuten' | 'yoon';

export interface KanaEntry {
  /** stable id, e.g. "k-ka-か" */
  id: string;
  hira: string;
  kata: string;
  /** canonical romaji shown in answers */
  romaji: string;
  /** other spellings we also accept when typed */
  alt: string[];
  groupId: string;
}

export interface KanaGroup {
  id: string;
  label: string;
  section: KanaSection;
  kana: KanaEntry[];
}

/** [hiragana, katakana, romaji, ...alternate spellings] */
type Row = [string, string, string, ...string[]];

interface GroupSpec {
  id: string;
  label: string;
  section: KanaSection;
  rows: Row[];
}

const SPECS: GroupSpec[] = [
  {
    id: 'vowels', label: 'あ / a', section: 'gojuon',
    rows: [['あ', 'ア', 'a'], ['い', 'イ', 'i'], ['う', 'ウ', 'u'], ['え', 'エ', 'e'], ['お', 'オ', 'o']],
  },
  {
    id: 'k', label: 'か / k', section: 'gojuon',
    rows: [['か', 'カ', 'ka'], ['き', 'キ', 'ki'], ['く', 'ク', 'ku'], ['け', 'ケ', 'ke'], ['こ', 'コ', 'ko']],
  },
  {
    id: 's', label: 'さ / s', section: 'gojuon',
    rows: [['さ', 'サ', 'sa'], ['し', 'シ', 'shi', 'si'], ['す', 'ス', 'su'], ['せ', 'セ', 'se'], ['そ', 'ソ', 'so']],
  },
  {
    id: 't', label: 'た / t', section: 'gojuon',
    rows: [['た', 'タ', 'ta'], ['ち', 'チ', 'chi', 'ti'], ['つ', 'ツ', 'tsu', 'tu'], ['て', 'テ', 'te'], ['と', 'ト', 'to']],
  },
  {
    id: 'n', label: 'な / n', section: 'gojuon',
    rows: [['な', 'ナ', 'na'], ['に', 'ニ', 'ni'], ['ぬ', 'ヌ', 'nu'], ['ね', 'ネ', 'ne'], ['の', 'ノ', 'no']],
  },
  {
    id: 'h', label: 'は / h', section: 'gojuon',
    rows: [['は', 'ハ', 'ha'], ['ひ', 'ヒ', 'hi'], ['ふ', 'フ', 'fu', 'hu'], ['へ', 'ヘ', 'he'], ['ほ', 'ホ', 'ho']],
  },
  {
    id: 'm', label: 'ま / m', section: 'gojuon',
    rows: [['ま', 'マ', 'ma'], ['み', 'ミ', 'mi'], ['む', 'ム', 'mu'], ['め', 'メ', 'me'], ['も', 'モ', 'mo']],
  },
  {
    id: 'y', label: 'や / y', section: 'gojuon',
    rows: [['や', 'ヤ', 'ya'], ['ゆ', 'ユ', 'yu'], ['よ', 'ヨ', 'yo']],
  },
  {
    id: 'r', label: 'ら / r', section: 'gojuon',
    rows: [['ら', 'ラ', 'ra'], ['り', 'リ', 'ri'], ['る', 'ル', 'ru'], ['れ', 'レ', 're'], ['ろ', 'ロ', 'ro']],
  },
  {
    id: 'w', label: 'わ / w + ん', section: 'gojuon',
    rows: [['わ', 'ワ', 'wa'], ['を', 'ヲ', 'wo', 'o'], ['ん', 'ン', 'n', 'nn']],
  },
  {
    id: 'g', label: 'が / g', section: 'dakuten',
    rows: [['が', 'ガ', 'ga'], ['ぎ', 'ギ', 'gi'], ['ぐ', 'グ', 'gu'], ['げ', 'ゲ', 'ge'], ['ご', 'ゴ', 'go']],
  },
  {
    id: 'z', label: 'ざ / z', section: 'dakuten',
    rows: [['ざ', 'ザ', 'za'], ['じ', 'ジ', 'ji', 'zi'], ['ず', 'ズ', 'zu'], ['ぜ', 'ゼ', 'ze'], ['ぞ', 'ゾ', 'zo']],
  },
  {
    id: 'd', label: 'だ / d', section: 'dakuten',
    rows: [['だ', 'ダ', 'da'], ['ぢ', 'ヂ', 'ji', 'di', 'dzi'], ['づ', 'ヅ', 'zu', 'du', 'dzu'], ['で', 'デ', 'de'], ['ど', 'ド', 'do']],
  },
  {
    id: 'b', label: 'ば / b', section: 'dakuten',
    rows: [['ば', 'バ', 'ba'], ['び', 'ビ', 'bi'], ['ぶ', 'ブ', 'bu'], ['べ', 'ベ', 'be'], ['ぼ', 'ボ', 'bo']],
  },
  {
    id: 'p', label: 'ぱ / p', section: 'dakuten',
    rows: [['ぱ', 'パ', 'pa'], ['ぴ', 'ピ', 'pi'], ['ぷ', 'プ', 'pu'], ['ぺ', 'ペ', 'pe'], ['ぽ', 'ポ', 'po']],
  },
  {
    id: 'ky', label: 'きゃ / ky', section: 'yoon',
    rows: [['きゃ', 'キャ', 'kya'], ['きゅ', 'キュ', 'kyu'], ['きょ', 'キョ', 'kyo']],
  },
  {
    id: 'sh', label: 'しゃ / sh', section: 'yoon',
    rows: [['しゃ', 'シャ', 'sha', 'sya'], ['しゅ', 'シュ', 'shu', 'syu'], ['しょ', 'ショ', 'sho', 'syo']],
  },
  {
    id: 'ch', label: 'ちゃ / ch', section: 'yoon',
    rows: [['ちゃ', 'チャ', 'cha', 'tya'], ['ちゅ', 'チュ', 'chu', 'tyu'], ['ちょ', 'チョ', 'cho', 'tyo']],
  },
  {
    id: 'ny', label: 'にゃ / ny', section: 'yoon',
    rows: [['にゃ', 'ニャ', 'nya'], ['にゅ', 'ニュ', 'nyu'], ['にょ', 'ニョ', 'nyo']],
  },
  {
    id: 'hy', label: 'ひゃ / hy', section: 'yoon',
    rows: [['ひゃ', 'ヒャ', 'hya'], ['ひゅ', 'ヒュ', 'hyu'], ['ひょ', 'ヒョ', 'hyo']],
  },
  {
    id: 'my', label: 'みゃ / my', section: 'yoon',
    rows: [['みゃ', 'ミャ', 'mya'], ['みゅ', 'ミュ', 'myu'], ['みょ', 'ミョ', 'myo']],
  },
  {
    id: 'ry', label: 'りゃ / ry', section: 'yoon',
    rows: [['りゃ', 'リャ', 'rya'], ['りゅ', 'リュ', 'ryu'], ['りょ', 'リョ', 'ryo']],
  },
  {
    id: 'gy', label: 'ぎゃ / gy', section: 'yoon',
    rows: [['ぎゃ', 'ギャ', 'gya'], ['ぎゅ', 'ギュ', 'gyu'], ['ぎょ', 'ギョ', 'gyo']],
  },
  {
    id: 'j', label: 'じゃ / j', section: 'yoon',
    rows: [['じゃ', 'ジャ', 'ja', 'jya', 'zya'], ['じゅ', 'ジュ', 'ju', 'jyu', 'zyu'], ['じょ', 'ジョ', 'jo', 'jyo', 'zyo']],
  },
  {
    id: 'by', label: 'びゃ / by', section: 'yoon',
    rows: [['びゃ', 'ビャ', 'bya'], ['びゅ', 'ビュ', 'byu'], ['びょ', 'ビョ', 'byo']],
  },
  {
    id: 'py', label: 'ぴゃ / py', section: 'yoon',
    rows: [['ぴゃ', 'ピャ', 'pya'], ['ぴゅ', 'ピュ', 'pyu'], ['ぴょ', 'ピョ', 'pyo']],
  },
];

export const KANA_GROUPS: KanaGroup[] = SPECS.map((spec) => ({
  id: spec.id,
  label: spec.label,
  section: spec.section,
  kana: spec.rows.map(([hira, kata, romaji, ...alt]) => ({
    id: `${spec.id}-${hira}`,
    hira,
    kata,
    romaji,
    alt,
    groupId: spec.id,
  })),
}));

export const ALL_KANA: KanaEntry[] = KANA_GROUPS.flatMap((g) => g.kana);

// The names of the three sections are interface text rather than data — they
// are translated alongside the rest of it, in i18n/en.ts under `kanaSection`.
// The group labels below stay here: あ / a reads the same in every language.

export const groupsBySection = (section: KanaSection): KanaGroup[] =>
  KANA_GROUPS.filter((g) => g.section === section);
