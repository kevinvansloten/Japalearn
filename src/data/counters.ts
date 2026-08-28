/**
 * Counters, dates and times.
 *
 * These are the highest-error-rate items in N5, and the difficulty is not
 * memorising a word — it is that the number changes shape in front of the
 * counter. 一本 is いっぽん, 三本 is さんぼん, 六本 is ろっぽん. Nothing about
 * knowing 本 tells you that, so it has to be drilled.
 *
 * Items flagged `irregular` are the ones where the sound shifts, or where the
 * reading is simply not what the kanji suggests (ついたち, はたち, よじ).
 */

export interface CounterItem {
  /** written form, e.g. 六本 */
  form: string;
  /** reading in hiragana */
  reading: string;
  /** other readings that are also correct */
  alt?: string[];
  meaning: string;
  /** the reading shifts, or is outright irregular */
  irregular?: boolean;
  groupId: string;
}

export interface CounterGroup {
  id: string;
  label: string;
  blurb: string;
  items: CounterItem[];
}

/** [form, reading, meaning, irregular?, ...alt] */
type Row = [string, string, string, boolean?, ...string[]];

const SPECS: { id: string; label: string; blurb: string; rows: Row[] }[] = [
  {
    id: 'generic',
    label: 'Things & people',
    blurb: 'つ for objects and 人 for people — both irregular almost all the way.',
    rows: [
      ['一つ', 'ひとつ', 'one thing', true],
      ['二つ', 'ふたつ', 'two things', true],
      ['三つ', 'みっつ', 'three things', true],
      ['四つ', 'よっつ', 'four things', true],
      ['五つ', 'いつつ', 'five things', true],
      ['六つ', 'むっつ', 'six things', true],
      ['七つ', 'ななつ', 'seven things', true],
      ['八つ', 'やっつ', 'eight things', true],
      ['九つ', 'ここのつ', 'nine things', true],
      ['十', 'とお', 'ten things', true],
      ['一人', 'ひとり', 'one person', true],
      ['二人', 'ふたり', 'two people', true],
      ['三人', 'さんにん', 'three people'],
      ['四人', 'よにん', 'four people', true],
      ['五人', 'ごにん', 'five people'],
      ['六人', 'ろくにん', 'six people'],
      ['七人', 'しちにん', 'seven people', false, 'ななにん'],
      ['八人', 'はちにん', 'eight people'],
      ['九人', 'きゅうにん', 'nine people'],
      ['十人', 'じゅうにん', 'ten people'],
    ],
  },
  {
    id: 'shapes',
    label: 'Long, flat & small',
    blurb: '本 for long things, 匹 for small animals — and 枚 for flat things, which is refreshingly regular.',
    rows: [
      ['一本', 'いっぽん', 'one long object', true],
      ['二本', 'にほん', 'two long objects'],
      ['三本', 'さんぼん', 'three long objects', true],
      ['四本', 'よんほん', 'four long objects'],
      ['五本', 'ごほん', 'five long objects'],
      ['六本', 'ろっぽん', 'six long objects', true],
      ['七本', 'ななほん', 'seven long objects'],
      ['八本', 'はっぽん', 'eight long objects', true],
      ['九本', 'きゅうほん', 'nine long objects'],
      ['十本', 'じゅっぽん', 'ten long objects', true, 'じっぽん'],
      ['一匹', 'いっぴき', 'one small animal', true],
      ['二匹', 'にひき', 'two small animals'],
      ['三匹', 'さんびき', 'three small animals', true],
      ['四匹', 'よんひき', 'four small animals'],
      ['五匹', 'ごひき', 'five small animals'],
      ['六匹', 'ろっぴき', 'six small animals', true],
      ['七匹', 'ななひき', 'seven small animals'],
      ['八匹', 'はっぴき', 'eight small animals', true],
      ['九匹', 'きゅうひき', 'nine small animals'],
      ['十匹', 'じゅっぴき', 'ten small animals', true, 'じっぴき'],
      ['一枚', 'いちまい', 'one flat object'],
      ['二枚', 'にまい', 'two flat objects'],
      ['三枚', 'さんまい', 'three flat objects'],
      ['四枚', 'よんまい', 'four flat objects'],
      ['五枚', 'ごまい', 'five flat objects'],
      ['六枚', 'ろくまい', 'six flat objects'],
      ['七枚', 'ななまい', 'seven flat objects'],
      ['八枚', 'はちまい', 'eight flat objects'],
      ['九枚', 'きゅうまい', 'nine flat objects'],
      ['十枚', 'じゅうまい', 'ten flat objects'],
    ],
  },
  {
    id: 'objects',
    label: 'Cups, books & machines',
    blurb: '杯 for drinks, 冊 for books, 台 for machines and vehicles.',
    rows: [
      ['一杯', 'いっぱい', 'one cupful', true],
      ['二杯', 'にはい', 'two cupfuls'],
      ['三杯', 'さんばい', 'three cupfuls', true],
      ['四杯', 'よんはい', 'four cupfuls'],
      ['五杯', 'ごはい', 'five cupfuls'],
      ['六杯', 'ろっぱい', 'six cupfuls', true],
      ['七杯', 'ななはい', 'seven cupfuls'],
      ['八杯', 'はっぱい', 'eight cupfuls', true],
      ['九杯', 'きゅうはい', 'nine cupfuls'],
      ['十杯', 'じゅっぱい', 'ten cupfuls', true, 'じっぱい'],
      ['一冊', 'いっさつ', 'one book', true],
      ['二冊', 'にさつ', 'two books'],
      ['三冊', 'さんさつ', 'three books'],
      ['四冊', 'よんさつ', 'four books'],
      ['五冊', 'ごさつ', 'five books'],
      ['六冊', 'ろくさつ', 'six books'],
      ['七冊', 'ななさつ', 'seven books'],
      ['八冊', 'はっさつ', 'eight books', true],
      ['九冊', 'きゅうさつ', 'nine books'],
      ['十冊', 'じゅっさつ', 'ten books', true, 'じっさつ'],
      ['一台', 'いちだい', 'one machine'],
      ['二台', 'にだい', 'two machines'],
      ['三台', 'さんだい', 'three machines'],
      ['四台', 'よんだい', 'four machines'],
      ['五台', 'ごだい', 'five machines'],
      ['六台', 'ろくだい', 'six machines'],
      ['七台', 'ななだい', 'seven machines'],
      ['八台', 'はちだい', 'eight machines'],
      ['九台', 'きゅうだい', 'nine machines'],
      ['十台', 'じゅうだい', 'ten machines'],
    ],
  },
  {
    id: 'age',
    label: 'Age',
    blurb: '歳 for years old — and 二十歳, which ignores the pattern entirely.',
    rows: [
      ['一歳', 'いっさい', 'one year old', true],
      ['二歳', 'にさい', 'two years old'],
      ['三歳', 'さんさい', 'three years old'],
      ['四歳', 'よんさい', 'four years old'],
      ['五歳', 'ごさい', 'five years old'],
      ['六歳', 'ろくさい', 'six years old'],
      ['七歳', 'ななさい', 'seven years old'],
      ['八歳', 'はっさい', 'eight years old', true],
      ['九歳', 'きゅうさい', 'nine years old'],
      ['十歳', 'じゅっさい', 'ten years old', true, 'じっさい'],
      ['二十歳', 'はたち', 'twenty years old', true],
    ],
  },
  {
    id: 'days',
    label: 'Days of the month',
    blurb: 'The first ten are their own words, and 20th is はつか. Everything else is regular.',
    rows: [
      ['一日', 'ついたち', '1st of the month', true],
      ['二日', 'ふつか', '2nd of the month', true],
      ['三日', 'みっか', '3rd of the month', true],
      ['四日', 'よっか', '4th of the month', true],
      ['五日', 'いつか', '5th of the month', true],
      ['六日', 'むいか', '6th of the month', true],
      ['七日', 'なのか', '7th of the month', true],
      ['八日', 'ようか', '8th of the month', true],
      ['九日', 'ここのか', '9th of the month', true],
      ['十日', 'とおか', '10th of the month', true],
      ['十一日', 'じゅういちにち', '11th of the month'],
      ['十四日', 'じゅうよっか', '14th of the month', true],
      ['十七日', 'じゅうしちにち', '17th of the month'],
      ['二十日', 'はつか', '20th of the month', true],
      ['二十四日', 'にじゅうよっか', '24th of the month', true],
    ],
  },
  {
    id: 'time',
    label: 'Telling the time',
    blurb: '時 for hours and 分 for minutes. 4, 7 and 9 o’clock are the ones that catch people.',
    rows: [
      ['一時', 'いちじ', "one o'clock"],
      ['二時', 'にじ', "two o'clock"],
      ['三時', 'さんじ', "three o'clock"],
      ['四時', 'よじ', "four o'clock", true],
      ['五時', 'ごじ', "five o'clock"],
      ['六時', 'ろくじ', "six o'clock"],
      ['七時', 'しちじ', "seven o'clock", true],
      ['八時', 'はちじ', "eight o'clock"],
      ['九時', 'くじ', "nine o'clock", true],
      ['十時', 'じゅうじ', "ten o'clock"],
      ['十一時', 'じゅういちじ', "eleven o'clock"],
      ['十二時', 'じゅうにじ', "twelve o'clock"],
      ['一分', 'いっぷん', 'one minute', true],
      ['二分', 'にふん', 'two minutes'],
      ['三分', 'さんぷん', 'three minutes', true],
      ['四分', 'よんぷん', 'four minutes', true],
      ['五分', 'ごふん', 'five minutes'],
      ['六分', 'ろっぷん', 'six minutes', true],
      ['七分', 'ななふん', 'seven minutes'],
      ['八分', 'はっぷん', 'eight minutes', true],
      ['九分', 'きゅうふん', 'nine minutes'],
      ['十分', 'じゅっぷん', 'ten minutes', true, 'じっぷん'],
      ['十五分', 'じゅうごふん', 'fifteen minutes'],
      ['三十分', 'さんじゅっぷん', 'thirty minutes', true, 'さんじっぷん'],
    ],
  },
  {
    id: 'months',
    label: 'Months',
    blurb: 'がつ throughout, but April, July and September do not use the number you expect.',
    rows: [
      ['一月', 'いちがつ', 'January'],
      ['二月', 'にがつ', 'February'],
      ['三月', 'さんがつ', 'March'],
      ['四月', 'しがつ', 'April', true],
      ['五月', 'ごがつ', 'May'],
      ['六月', 'ろくがつ', 'June'],
      ['七月', 'しちがつ', 'July', true],
      ['八月', 'はちがつ', 'August'],
      ['九月', 'くがつ', 'September', true],
      ['十月', 'じゅうがつ', 'October'],
      ['十一月', 'じゅういちがつ', 'November'],
      ['十二月', 'じゅうにがつ', 'December'],
    ],
  },
  {
    id: 'big',
    label: 'Hundreds & thousands',
    blurb: '300, 600 and 800 shift, and so do 3000 and 8000. Prices depend on these.',
    rows: [
      ['百', 'ひゃく', 'one hundred'],
      ['二百', 'にひゃく', 'two hundred'],
      ['三百', 'さんびゃく', 'three hundred', true],
      ['四百', 'よんひゃく', 'four hundred'],
      ['五百', 'ごひゃく', 'five hundred'],
      ['六百', 'ろっぴゃく', 'six hundred', true],
      ['七百', 'ななひゃく', 'seven hundred'],
      ['八百', 'はっぴゃく', 'eight hundred', true],
      ['九百', 'きゅうひゃく', 'nine hundred'],
      ['千', 'せん', 'one thousand'],
      ['二千', 'にせん', 'two thousand'],
      ['三千', 'さんぜん', 'three thousand', true],
      ['四千', 'よんせん', 'four thousand'],
      ['五千', 'ごせん', 'five thousand'],
      ['六千', 'ろくせん', 'six thousand'],
      ['七千', 'ななせん', 'seven thousand'],
      ['八千', 'はっせん', 'eight thousand', true],
      ['九千', 'きゅうせん', 'nine thousand'],
    ],
  },
];

export const COUNTER_GROUPS: CounterGroup[] = SPECS.map((spec) => ({
  id: spec.id,
  label: spec.label,
  blurb: spec.blurb,
  items: spec.rows.map(([form, reading, meaning, irregular, ...alt]) => ({
    form,
    reading,
    meaning,
    ...(irregular ? { irregular: true } : {}),
    ...(alt.length ? { alt } : {}),
    groupId: spec.id,
  })),
}));

export const ALL_COUNTERS: CounterItem[] = COUNTER_GROUPS.flatMap((g) => g.items);
