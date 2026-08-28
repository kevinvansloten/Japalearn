/**
 * Conjugation by rule.
 *
 * Unlike every other dataset here, these forms are not written out by hand —
 * they are derived. Given a verb and its class, 書く becomes 書きます, 書いて,
 * 書かない and 書いた mechanically, so the forms are as correct as the rules
 * and the class are. The rules are unit-tested against a table of known
 * conjugations, and the classes are checked against the dictionary by
 * `npm run check:data verbs`.
 *
 * Only the trailing kana ever changes, and it changes identically in the
 * written form and the reading — 書く/かく both end in く — so one rule can be
 * applied to both. The exceptions where that breaks down (する, 来る, whose
 * stems change) carry explicit forms instead.
 */

export type VerbClass = 'godan' | 'ichidan' | 'irregular';
export type VerbForm = 'masu' | 'masen' | 'mashita' | 'te' | 'nai' | 'ta';

export type AdjectiveClass = 'i' | 'na';
export type AdjectiveForm = 'negative' | 'past' | 'pastNegative';

export interface Conjugated {
  word: string;
  reading: string;
}

export const VERB_FORM_LABEL: Record<VerbForm, string> = {
  masu: 'polite (ます)',
  masen: 'polite negative (ません)',
  mashita: 'polite past (ました)',
  te: 'て-form',
  nai: 'plain negative (ない)',
  ta: 'plain past (た)',
};

export const ADJECTIVE_FORM_LABEL: Record<AdjectiveForm, string> = {
  negative: 'negative',
  past: 'past',
  pastNegative: 'past negative',
};

/** う-row → い-row, the ます stem for a godan verb. */
const I_ROW: Record<string, string> = {
  う: 'い', く: 'き', ぐ: 'ぎ', す: 'し', つ: 'ち', ぬ: 'に', ぶ: 'び', む: 'み', る: 'り',
};

/** う-row → あ-row for the ない stem. う becomes わ, not あ. */
const A_ROW: Record<string, string> = {
  う: 'わ', く: 'か', ぐ: 'が', す: 'さ', つ: 'た', ぬ: 'な', ぶ: 'ば', む: 'ま', る: 'ら',
};

const TE_ENDING: Record<string, string> = {
  う: 'って', つ: 'って', る: 'って',
  む: 'んで', ぶ: 'んで', ぬ: 'んで',
  く: 'いて', ぐ: 'いで', す: 'して',
};

const TA_ENDING: Record<string, string> = {
  う: 'った', つ: 'った', る: 'った',
  む: 'んだ', ぶ: 'んだ', ぬ: 'んだ',
  く: 'いた', ぐ: 'いだ', す: 'した',
};

const tail = (s: string): string => s.slice(-1);
const body = (s: string): string => s.slice(0, -1);

/** Apply the same tail rule to the written form and the reading. */
const both = (v: Conjugated, rule: (s: string) => string): Conjugated => ({
  word: rule(v.word),
  reading: rule(v.reading),
});

function conjugateGodan(v: Conjugated, form: VerbForm): Conjugated {
  const rule = (s: string): string => {
    const end = tail(s);
    switch (form) {
      case 'masu':
        return body(s) + I_ROW[end] + 'ます';
      case 'masen':
        return body(s) + I_ROW[end] + 'ません';
      case 'mashita':
        return body(s) + I_ROW[end] + 'ました';
      case 'te':
        return body(s) + TE_ENDING[end];
      case 'ta':
        return body(s) + TA_ENDING[end];
      case 'nai':
        return body(s) + A_ROW[end] + 'ない';
    }
  };
  return both(v, rule);
}

function conjugateIchidan(v: Conjugated, form: VerbForm): Conjugated {
  const suffix: Record<VerbForm, string> = {
    masu: 'ます', masen: 'ません', mashita: 'ました', te: 'て', nai: 'ない', ta: 'た',
  };
  // Ichidan verbs simply drop る.
  return both(v, (s) => body(s) + suffix[form]);
}

/**
 * Conjugate a verb. `overrides` carries the forms a rule cannot produce —
 * する and 来る change stem, and 行く takes って rather than いて.
 */
export function conjugateVerb(
  dictionary: Conjugated,
  verbClass: VerbClass,
  form: VerbForm,
  overrides?: Partial<Record<VerbForm, Conjugated>>,
): Conjugated {
  const override = overrides?.[form];
  if (override) return override;
  if (verbClass === 'irregular') {
    throw new Error(`irregular verb ${dictionary.word} has no override for ${form}`);
  }
  return verbClass === 'godan'
    ? conjugateGodan(dictionary, form)
    : conjugateIchidan(dictionary, form);
}

export function conjugateAdjective(
  dictionary: Conjugated,
  adjectiveClass: AdjectiveClass,
  form: AdjectiveForm,
  overrides?: Partial<Record<AdjectiveForm, Conjugated>>,
): Conjugated {
  const override = overrides?.[form];
  if (override) return override;

  const suffix: Record<AdjectiveForm, string> =
    adjectiveClass === 'i'
      ? { negative: 'くない', past: 'かった', pastNegative: 'くなかった' }
      : { negative: 'じゃない', past: 'だった', pastNegative: 'じゃなかった' };

  // い-adjectives drop their final い; な-adjectives take the ending as-is.
  const rule = (s: string): string =>
    adjectiveClass === 'i' ? body(s) + suffix[form] : s + suffix[form];

  return both(dictionary, rule);
}

export const VERB_FORMS: VerbForm[] = ['masu', 'masen', 'mashita', 'te', 'nai', 'ta'];
export const ADJECTIVE_FORMS: AdjectiveForm[] = ['negative', 'past', 'pastNegative'];
