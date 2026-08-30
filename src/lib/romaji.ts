/**
 * Romaji <-> kana conversion and lenient answer checking.
 *
 * The goal is not to be a perfect IME, it is to accept anything a learner
 * would reasonably type for a given reading: shi/si, tsu/tu, ja/jya/zya,
 * okurigana included or not, kana typed directly, and so on.
 */

const ROMAJI_TO_KANA: Record<string, string> = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  sa: 'さ', shi: 'し', si: 'し', su: 'す', se: 'せ', so: 'そ',
  za: 'ざ', ji: 'じ', zi: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  ta: 'た', chi: 'ち', ti: 'ち', tsu: 'つ', tu: 'つ', te: 'て', to: 'と',
  da: 'だ', di: 'ぢ', dzi: 'ぢ', du: 'づ', dzu: 'づ', de: 'で', do: 'ど',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', hu: 'ふ', he: 'へ', ho: 'ほ',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を', n: 'ん',
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  sha: 'しゃ', shu: 'しゅ', sho: 'しょ',
  sya: 'しゃ', syu: 'しゅ', syo: 'しょ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ',
  jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
  zya: 'じゃ', zyu: 'じゅ', zyo: 'じょ',
  cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ',
  tya: 'ちゃ', tyu: 'ちゅ', tyo: 'ちょ',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',

  // The syllables that only ever turn up in loanwords. The N5 decks barely
  // need them, but the Duolingo course is a seventh katakana — カフェ, ファン
  // タジー, コメディー, パーティー — and without these a reading converts only
  // halfway and comes back as "kafuぇ".
  fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ',
  wi: 'うぃ', we: 'うぇ',
  va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ',
  she: 'しぇ', je: 'じぇ', che: 'ちぇ',
  tsa: 'つぁ', tse: 'つぇ', tso: 'つぉ',
  // "ti" and "di" are already ち and ぢ and stay that way, so the IME spellings
  // are what convert here. Someone typing the natural "paatii" is still
  // accepted: checkReading compares in romaji as well as in kana.
  thi: 'てぃ', dhi: 'でぃ', dhu: 'でゅ', thu: 'てゅ',
};

/** Longest key first, so greedy matching finds "tsu" before "tu". */
const MAX_ROMAJI_LEN = 3;

/**
 * The spelling each kana is written back as. Where several romaji produce the
 * same kana the first listed here wins, so readings are shown the way a course
 * would write them rather than the way an IME would take them.
 */
const KANA_TO_ROMAJI: Record<string, string> = (() => {
  const preferred: Record<string, string> = {};
  const order = ['shi', 'chi', 'tsu', 'fu', 'ji', 'zu', 'sha', 'shu', 'sho', 'ja', 'ju', 'jo', 'cha', 'chu', 'cho'];
  for (const romaji of order) preferred[ROMAJI_TO_KANA[romaji]] = romaji;
  // てぃ and でぃ are written "ti" and "di" even though typing those gives ち
  // and ぢ: this map is for showing an answer, not for taking one.
  preferred['てぃ'] = 'ti';
  preferred['でぃ'] = 'di';
  preferred['でゅ'] = 'dyu';
  preferred['てゅ'] = 'tyu';
  for (const [romaji, kana] of Object.entries(ROMAJI_TO_KANA)) {
    if (!(kana in preferred)) preferred[kana] = romaji;
  }
  return preferred;
})();

/**
 * Small kana that reached the end of a word on their own, or followed
 * something with no combined form. Nothing should be written back as raw kana
 * inside a romaji answer, so these are the backstop.
 */
const SMALL_KANA: Record<string, string> = {
  ぁ: 'a', ぃ: 'i', ぅ: 'u', ぇ: 'e', ぉ: 'o',
  ゃ: 'ya', ゅ: 'yu', ょ: 'yo', ゎ: 'wa',
};

const DOUBLE_CONSONANT = /[bcdfghjkmpqrstvwyz]/;

export const isKana = (s: string): boolean => /[぀-ヿ]/.test(s);

/** カタカナ -> ひらがな (leaves everything else untouched). */
export function toHiragana(input: string): string {
  return input.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
}

/** ひらがな -> カタカナ. */
export function toKatakana(input: string): string {
  return input.replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60));
}

/** Romaji -> hiragana. Unknown characters pass through unchanged. */
export function romajiToKana(input: string): string {
  const s = input.toLowerCase().replace(/\s+/g, '');
  let out = '';
  let i = 0;

  while (i < s.length) {
    const c = s[i];
    const next = s[i + 1];

    // Sokuon: "kk" -> っk, but never for "nn" (that is ん).
    if (c === next && c !== 'n' && DOUBLE_CONSONANT.test(c)) {
      out += 'っ';
      i += 1;
      continue;
    }

    // Syllabic ん: "nn", "n'", or an n not followed by a vowel/y.
    if (c === 'n') {
      if (next === 'n' || next === "'") {
        out += 'ん';
        i += 2;
        continue;
      }
      if (next === undefined || !/[aiueoy]/.test(next)) {
        out += 'ん';
        i += 1;
        continue;
      }
    }

    let matched = false;
    for (let len = MAX_ROMAJI_LEN; len >= 1; len--) {
      const chunk = s.slice(i, i + len);
      const kana = ROMAJI_TO_KANA[chunk];
      if (kana) {
        out += kana;
        i += len;
        matched = true;
        break;
      }
    }
    if (!matched) {
      out += c;
      i += 1;
    }
  }

  return out;
}

/** Kana -> romaji, used for showing answers and as a second comparison path. */
export function kanaToRomaji(input: string): string {
  const s = toHiragana(input);
  let out = '';
  let i = 0;

  while (i < s.length) {
    const pair = s.slice(i, i + 2);
    if (pair.length === 2 && KANA_TO_ROMAJI[pair]) {
      out += KANA_TO_ROMAJI[pair];
      i += 2;
      continue;
    }
    const c = s[i];
    if (c === 'っ') {
      // Double the consonant of the following syllable.
      const following = KANA_TO_ROMAJI[s.slice(i + 1, i + 3)] ?? KANA_TO_ROMAJI[s[i + 1]] ?? '';
      if (following && DOUBLE_CONSONANT.test(following[0])) out += following[0];
      i += 1;
      continue;
    }
    if (c === 'ー') {
      // Long vowel mark: repeat the previous vowel.
      const prev = out[out.length - 1];
      if (prev && 'aiueo'.includes(prev)) out += prev;
      i += 1;
      continue;
    }
    out += KANA_TO_ROMAJI[c] ?? SMALL_KANA[c] ?? c;
    i += 1;
  }

  return out;
}

/** Strip everything that should not affect a comparison. */
const tidy = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[\s.,!?"“”'’`\-–—_/()[\]{}]/g, '')
    .trim();

/**
 * A reading like `い(く)` yields both `い` (the kanji's own reading) and
 * `いく` (the whole word), so either answer is accepted.
 */
export function readingVariants(reading: string): string[] {
  const withOkurigana = toHiragana(reading.replace(/[()（）]/g, ''));
  const stem = toHiragana(reading.replace(/[(（].*?[)）]/g, ''));
  return stem && stem !== withOkurigana ? [stem, withOkurigana] : [withOkurigana];
}

/** Display form: strips the parentheses markers but keeps the full word. */
export const displayReading = (reading: string): string => reading;

/**
 * True when `given` is an acceptable spelling of any of `targets`.
 * Targets may be katakana on'yomi, hiragana kun'yomi, or contain okurigana.
 * `given` may be romaji or kana typed directly.
 */
export function checkReading(given: string, targets: string[]): boolean {
  const raw = given.trim();
  if (!raw) return false;

  const candidates = new Set<string>();
  candidates.add(tidy(toHiragana(raw)));
  candidates.add(tidy(romajiToKana(raw)));

  for (const target of targets) {
    for (const variant of readingVariants(target)) {
      const kana = tidy(variant);
      if (!kana) continue;
      if (candidates.has(kana)) return true;
      // Second path: compare in romaji, which forgives ん/nn edge cases.
      if (tidy(raw) === tidy(kanaToRomaji(variant))) return true;
    }
  }
  return false;
}

const MEANING_NOISE = /^(to|the|a|an)\s+/;

/** Normalise an English meaning: "to go" ~ "go", "a car" ~ "car". */
export function normalizeMeaning(s: string): string {
  let out = s.toLowerCase().trim().replace(/[.,!?"“”'’`]/g, '');
  let previous = '';
  while (out !== previous) {
    previous = out;
    out = out.replace(MEANING_NOISE, '');
  }
  return out.replace(/\s+/g, ' ').trim();
}

/** True when `given` matches any accepted meaning. */
export function checkMeaning(given: string, meanings: string[]): boolean {
  const answer = normalizeMeaning(given);
  if (!answer) return false;
  return meanings.some((m) =>
    // Meanings may themselves be multi-word alternatives, e.g. "to see, to look".
    m
      .split(/[,/]/)
      .map(normalizeMeaning)
      .some((option) => option === answer),
  );
}
