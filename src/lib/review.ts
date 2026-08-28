/**
 * Composes the deck for a review session.
 *
 * Two sources feed it, and they answer to different rules:
 *
 * - **Due items** come back regardless of what is currently selected. Once you
 *   have started learning 日 it should keep coming round, even if you have
 *   since unticked the group it lives in.
 * - **New items** are only ever drawn from your current selection, capped per
 *   day. That is what keeps the setup screens meaningful: you choose what to
 *   start learning, the scheduler decides when it comes back.
 */
import { COUNTER_GROUPS } from '../data/counters';
import { KANA_GROUPS } from '../data/kana';
import { CONJUGATION_GROUPS } from '../data/conjugation';
import { PARTICLE_GROUPS } from '../data/particles';
import { WORD_GROUPS } from '../data/words';
import { KANJI_GROUPS } from '../data/kanji';
import {
  buildCounterCards,
  buildKanaCards,
  buildKanjiCards,
  buildConjugationCards,
  buildParticleCards,
  buildWordCards,
  type ConjugationConfig,
  type CounterConfig,
  type ParticleConfig,
  type KanaConfig,
  type KanjiConfig,
  type WordConfig,
} from './buildCards';
import { isDue, isNew } from './schedule';
import { shuffle, type Card } from './session';
import type { ItemStats } from './storage';

/** Every deck's current settings. One field per deck, so adding another does
 *  not grow an argument list that three call sites have to track. */
export interface Decks {
  kana: KanaConfig;
  kanji: KanjiConfig;
  counters: CounterConfig;
  words: WordConfig;
  conjugation: ConjugationConfig;
  particles: ParticleConfig;
}

export interface ReviewPlan {
  cards: Card[];
  /** items coming back round */
  due: number;
  /** items being introduced for the first time */
  fresh: number;
}

const indexByItem = (cards: Card[]): Map<string, Card[]> => {
  const index = new Map<string, Card[]>();
  for (const card of cards) {
    const existing = index.get(card.itemId);
    if (existing) existing.push(card);
    else index.set(card.itemId, [card]);
  }
  return index;
};

const pick = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export function planReview(
  decks: Decks,
  stats: Record<string, ItemStats>,
  newAllowance: number,
  now = Date.now(),
): ReviewPlan {
  const { kana, kanji, counters, words, conjugation, particles } = decks;
  // Everything askable in the modes currently enabled, ignoring group
  // selection, so a due item can always be built into a card.
  const everything = [
    ...buildKanaCards({ ...kana, groupIds: KANA_GROUPS.map((g) => g.id) }),
    ...buildKanjiCards({
      ...kanji,
      groupIds: KANJI_GROUPS.map((g) => g.id),
      excluded: [],
    }),
    ...buildCounterCards({
      ...counters,
      groupIds: COUNTER_GROUPS.map((g) => g.id),
      excluded: [],
    }),
    ...buildWordCards({
      ...words,
      groupIds: WORD_GROUPS.map((g) => g.id),
      excluded: [],
    }),
    ...buildConjugationCards({
      ...conjugation,
      groupIds: CONJUGATION_GROUPS.map((g) => g.id),
      excluded: [],
    }),
    ...buildParticleCards({
      ...particles,
      groupIds: PARTICLE_GROUPS.map((g) => g.id),
      excluded: [],
    }),
  ];
  const index = indexByItem(everything);

  // What the learner has actually chosen to study right now.
  const selected = new Set(
    [
      ...buildKanaCards(kana),
      ...buildKanjiCards(kanji),
      ...buildCounterCards(counters),
      ...buildWordCards(words),
      ...buildConjugationCards(conjugation),
      ...buildParticleCards(particles),
    ].map((c) => c.itemId),
  );

  const dueIds: string[] = [];
  const freshIds: string[] = [];

  for (const itemId of index.keys()) {
    const item = stats[itemId];
    if (isDue(item, now)) dueIds.push(itemId);
    else if (isNew(item) && selected.has(itemId)) freshIds.push(itemId);
  }

  // Oldest due first, so nothing is left languishing when a backlog builds up.
  dueIds.sort((a, b) => (stats[a].due ?? 0) - (stats[b].due ?? 0));
  const introduce = shuffle(freshIds).slice(0, Math.max(0, newAllowance));

  const cards = shuffle([...dueIds, ...introduce].map((itemId) => pick(index.get(itemId)!)));

  return { cards, due: dueIds.length, fresh: introduce.length };
}
