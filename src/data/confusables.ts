/**
 * Characters that learners routinely mix up.
 *
 * Multiple choice is only as useful as its wrong answers: picking か out of
 * か, ぬ, ほ, り proves nothing, while picking シ out of シ, ツ, ソ, ン is the
 * distinction that actually costs you marks. Every character in a set is worth
 * contrasting with every other, and sets may overlap.
 */

export const KANA_LOOKALIKE_SETS: string[][] = [
  // Hiragana
  ['あ', 'お'],
  ['ぬ', 'め'],
  ['は', 'ほ', 'ま'],
  ['ね', 'れ', 'わ'],
  ['る', 'ろ'],
  ['さ', 'き', 'ち'],
  ['い', 'り'],
  ['す', 'む'],
  ['つ', 'う'],
  ['こ', 'に'],
  // Katakana
  ['シ', 'ツ', 'ソ', 'ン'],
  ['ク', 'タ', 'ワ', 'ケ'],
  ['ノ', 'メ', 'ヌ', 'ス'],
  ['コ', 'ユ', 'エ'],
  ['チ', 'テ'],
  ['マ', 'ム', 'ア'],
  ['ラ', 'フ', 'ワ'],
  ['レ', 'ル'],
  ['サ', 'セ', 'ヤ'],
  ['ホ', 'オ'],
  ['ウ', 'ワ'],
];

/** Only kanji that are actually in the N5 deck, or they can never be drawn. */
export const KANJI_LOOKALIKE_SETS: string[][] = [
  ['人', '入', '八'],
  ['大', '犬', '天'],
  ['日', '白', '目', '百'],
  ['千', '十'],
  ['木', '本', '休', '体'],
  ['田', '男'],
  ['車', '東'],
  ['力', '九'],
  ['小', '少'],
  ['学', '字'],
  ['右', '石', '左'],
  ['会', '今'],
  ['言', '語', '話', '読'],
  ['聞', '間'],
  ['母', '毎'],
  ['名', '多'],
  ['電', '雨'],
];

/** char -> every other character it is confusable with, merged across sets. */
function buildLookup(sets: string[][]): Map<string, string[]> {
  const lookup = new Map<string, string[]>();
  for (const set of sets) {
    for (const char of set) {
      const merged = new Set(lookup.get(char) ?? []);
      for (const other of set) if (other !== char) merged.add(other);
      lookup.set(char, [...merged]);
    }
  }
  return lookup;
}

export const KANA_LOOKALIKES = buildLookup(KANA_LOOKALIKE_SETS);
export const KANJI_LOOKALIKES = buildLookup(KANJI_LOOKALIKE_SETS);
