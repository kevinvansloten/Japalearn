/**
 * Reading translated content out of the datasets.
 *
 * The interface strings in ./en.ts and ./nl.ts are complete in both languages.
 * The content is not, and deliberately so: the meanings the decks are graded
 * on are hand-authored beside the data they belong to, and are being
 * translated a deck at a time. Every field here therefore falls back to the
 * English original rather than showing a blank, so a half-translated dataset
 * is a partly Dutch app rather than a broken one.
 *
 * The convention across the datasets is a `…Nl` sibling for anything
 * translatable: `meanings` / `meaningsNl`, `label` / `labelNl`. An empty
 * string or empty array counts as untranslated, so a placeholder left behind
 * by accident cannot reach the screen.
 */
import type { Lang } from './lang';

const text = (english: string, dutch: string | undefined, lang: Lang): string =>
  lang === 'nl' && dutch ? dutch : english;

const list = (english: string[], dutch: string[] | undefined, lang: Lang): string[] =>
  lang === 'nl' && dutch?.length ? dutch : english;

export interface Translatable {
  label: string;
  labelNl?: string;
  blurb: string;
  blurbNl?: string;
}

/** A deck group's name, e.g. "Numbers & money". */
export const labelOf = (group: Pick<Translatable, 'label' | 'labelNl'>, lang: Lang): string =>
  text(group.label, group.labelNl, lang);

/** The line of explanation under a group's name. */
export const blurbOf = (group: Pick<Translatable, 'blurb' | 'blurbNl'>, lang: Lang): string =>
  text(group.blurb, group.blurbNl, lang);

/** The accepted meanings of a word or kanji, canonical one first. */
export const meaningsOf = (
  entry: { meanings: string[]; meaningsNl?: string[] },
  lang: Lang,
): string[] => list(entry.meanings, entry.meaningsNl, lang);

/** The single meaning a counter or example word carries. */
export const meaningOf = (entry: { meaning: string; meaningNl?: string }, lang: Lang): string =>
  text(entry.meaning, entry.meaningNl, lang);

/**
 * Which language the meaning actually came back in. A card asks for what it is
 * going to grade, so an untranslated entry has to say "meaning in English"
 * even while the rest of the interface is Dutch.
 */
export const meaningLang = (
  entry: { meaningsNl?: string[]; meaningNl?: string },
  lang: Lang,
): Lang => (lang === 'nl' && (entry.meaningsNl?.length || entry.meaningNl) ? 'nl' : 'en');

/** A curriculum stage's name. */
export const titleOf = (stage: { title: string; titleNl?: string }, lang: Lang): string =>
  text(stage.title, stage.titleNl, lang);

/** What a curriculum stage leaves you able to do. */
export const goalOf = (stage: { goal: string; goalNl?: string }, lang: Lang): string =>
  text(stage.goal, stage.goalNl, lang);

/** The translation of a particle sentence, shown as the prompt's note. */
export const sentenceOf = (
  sentence: { english: string; dutch?: string },
  lang: Lang,
): string => text(sentence.english, sentence.dutch, lang);

/** Why a particle sentence takes the particle it does, shown on reveal. */
export const whyOf = (sentence: { why: string; whyNl?: string }, lang: Lang): string =>
  text(sentence.why, sentence.whyNl, lang);
