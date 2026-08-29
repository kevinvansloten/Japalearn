/**
 * Turning a curriculum stage into something the rest of the app understands:
 * the items it is measured on, how far through it you are, and a deck of cards
 * that drills exactly it.
 */
import { CURRICULUM, type Stage, type StagePart } from '../data/curriculum';
import { CONJUGATION_GROUPS } from '../data/conjugation';
import { COUNTER_GROUPS } from '../data/counters';
import { KANA_GROUPS } from '../data/kana';
import { KANJI_GROUPS } from '../data/kanji';
import { PARTICLE_GROUPS } from '../data/particles';
import { WORD_GROUPS } from '../data/words';
import {
  buildConjugationCards,
  buildCounterCards,
  buildKanaCards,
  buildKanjiCards,
  buildParticleCards,
  buildWordCards,
} from './buildCards';
import type { Decks } from './review';
import { summarise, type Summary } from './progress';
import type { Card } from './session';
import type { ItemStats } from './storage';
import { en, type Strings } from '../i18n/en';

/** A stage counts as done once this share of its items is known. */
export const STAGE_PASS_MARK = 0.9;

/** The item ids one part of a stage covers. */
function partItems(part: StagePart): string[] {
  switch (part.deck) {
    case 'kana': {
      const scripts = part.scripts ?? ['hira', 'kata'];
      return KANA_GROUPS.filter((g) => part.groupIds.includes(g.id)).flatMap((g) =>
        g.kana.flatMap((k) => scripts.map((script) => `kana:${script}:${k.id}`)),
      );
    }
    case 'kanji':
      return KANJI_GROUPS.filter((g) => part.groupIds.includes(g.id)).flatMap((g) =>
        g.kanji.map((k) => `kanji:${k.char}`),
      );
    case 'counters':
      return COUNTER_GROUPS.filter((g) => part.groupIds.includes(g.id)).flatMap((g) =>
        g.items.map((i) => `counter:${i.form}`),
      );
    case 'words':
      return WORD_GROUPS.filter((g) => part.groupIds.includes(g.id)).flatMap((g) =>
        g.words.map((w) => `vocab:${w.word}`),
      );
    case 'conjugation':
      return CONJUGATION_GROUPS.filter((g) => part.groupIds.includes(g.id)).flatMap((g) =>
        [...g.verbs, ...g.adjectives].map((w) => `conj:${w.word}`),
      );
    case 'particles':
      return PARTICLE_GROUPS.filter((g) => part.groupIds.includes(g.id)).flatMap((g) =>
        g.sentences.map((s) => `particle:${s.text}`),
      );
  }
}

export const stageItems = (stage: Stage): string[] => [
  ...new Set(stage.parts.flatMap(partItems)),
];

export const stageProgress = (stage: Stage, stats: Record<string, ItemStats>): Summary =>
  summarise(stageItems(stage), stats);

export const isStageComplete = (stage: Stage, stats: Record<string, ItemStats>): boolean => {
  const { known, total } = stageProgress(stage, stats);
  return total > 0 && known / total >= STAGE_PASS_MARK;
};

/**
 * The stage to be getting on with: the first that is not finished. Everything
 * finished means the curriculum is done.
 */
export function currentStage(stats: Record<string, ItemStats>): Stage | null {
  return CURRICULUM.find((stage) => !isStageComplete(stage, stats)) ?? null;
}

export const stageNumber = (stage: Stage): number =>
  CURRICULUM.findIndex((s) => s.id === stage.id) + 1;

/**
 * Cards for exactly this stage, using the learner's own settings for each deck
 * so their choice of modes and typing still applies — only the selection is
 * overridden.
 */
export function buildStageCards(stage: Stage, decks: Decks, s: Strings = en): Card[] {
  return stage.parts.flatMap((part) => {
    switch (part.deck) {
      case 'kana':
        return buildKanaCards(
          {
            ...decks.kana,
            groupIds: part.groupIds,
            ...(part.scripts ? { scripts: part.scripts } : {}),
          },
          s,
        );
      case 'kanji':
        return buildKanjiCards({ ...decks.kanji, groupIds: part.groupIds, excluded: [] }, s);
      case 'counters':
        return buildCounterCards({ ...decks.counters, groupIds: part.groupIds, excluded: [] }, s);
      case 'words':
        return buildWordCards({ ...decks.words, groupIds: part.groupIds, excluded: [] }, s);
      case 'conjugation':
        return buildConjugationCards(
          {
            ...decks.conjugation,
            groupIds: part.groupIds,
            excluded: [],
            ...(part.verbForms ? { verbForms: part.verbForms } : {}),
            ...(part.adjectiveForms ? { adjectiveForms: part.adjectiveForms } : {}),
          },
          s,
        );
      case 'particles':
        return buildParticleCards({ ...decks.particles, groupIds: part.groupIds, excluded: [] }, s);
    }
  });
}

/** The deck settings a stage implies, for when the learner wants to keep them. */
export function applyStage(stage: Stage, decks: Decks): Decks {
  let next = { ...decks };
  for (const part of stage.parts) {
    switch (part.deck) {
      case 'kana':
        next = {
          ...next,
          kana: {
            ...next.kana,
            groupIds: part.groupIds,
            ...(part.scripts ? { scripts: part.scripts } : {}),
          },
        };
        break;
      case 'kanji':
        next = { ...next, kanji: { ...next.kanji, groupIds: part.groupIds, excluded: [] } };
        break;
      case 'counters':
        next = { ...next, counters: { ...next.counters, groupIds: part.groupIds, excluded: [] } };
        break;
      case 'words':
        next = { ...next, words: { ...next.words, groupIds: part.groupIds, excluded: [] } };
        break;
      case 'conjugation':
        next = {
          ...next,
          conjugation: {
            ...next.conjugation,
            groupIds: part.groupIds,
            excluded: [],
            ...(part.verbForms ? { verbForms: part.verbForms } : {}),
            ...(part.adjectiveForms ? { adjectiveForms: part.adjectiveForms } : {}),
          },
        };
        break;
      case 'particles':
        next = { ...next, particles: { ...next.particles, groupIds: part.groupIds, excluded: [] } };
        break;
    }
  }
  return next;
}
