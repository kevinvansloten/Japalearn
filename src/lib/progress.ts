/**
 * How well the learner knows things, derived from what the scheduler already
 * records. Both the guided path and the progress screen read from here, so
 * "known" means one thing across the app.
 */
import { MAX_BOX } from './schedule';
import type { ItemStats } from './storage';

export type Mastery = 'unseen' | 'learning' | 'known';

/**
 * An item counts as known once it reaches box 3, which is the first box whose
 * interval is a week: it has survived long enough to be worth trusting.
 * Anything answered but not yet there is still being learned.
 */
export const KNOWN_FROM_BOX = 3;

export function masteryOf(stats: ItemStats | undefined): Mastery {
  if (!stats?.box) return 'unseen';
  return stats.box >= KNOWN_FROM_BOX ? 'known' : 'learning';
}

export interface Summary {
  total: number;
  unseen: number;
  learning: number;
  known: number;
  /** lifetime accuracy over the items that have been answered at all */
  accuracy: number | null;
  /** known / total, as a percentage */
  percent: number;
}

export function summarise(itemIds: string[], stats: Record<string, ItemStats>): Summary {
  let unseen = 0;
  let learning = 0;
  let known = 0;
  let right = 0;
  let wrong = 0;

  for (const id of itemIds) {
    const item = stats[id];
    switch (masteryOf(item)) {
      case 'known':
        known += 1;
        break;
      case 'learning':
        learning += 1;
        break;
      default:
        unseen += 1;
    }
    if (item) {
      right += item.right;
      wrong += item.wrong;
    }
  }

  const total = itemIds.length;
  return {
    total,
    unseen,
    learning,
    known,
    accuracy: right + wrong ? Math.round((right / (right + wrong)) * 100) : null,
    percent: total ? Math.round((known / total) * 100) : 0,
  };
}

/** How many items fall due on each of the next `days` days, today first. */
export function reviewForecast(
  stats: Record<string, ItemStats>,
  days = 7,
  now = Date.now(),
): number[] {
  const DAY = 24 * 60 * 60 * 1000;
  const buckets = new Array<number>(days).fill(0);
  const startOfToday = new Date(now).setHours(0, 0, 0, 0);

  for (const item of Object.values(stats)) {
    if (!item.box || item.due === undefined) continue;
    // Anything already overdue belongs to today.
    const offset = Math.floor((item.due - startOfToday) / DAY);
    const bucket = Math.max(0, offset);
    if (bucket < days) buckets[bucket] += 1;
  }
  return buckets;
}

/** Items answered enough to judge, worst first. */
export function weakest(
  itemIds: string[],
  stats: Record<string, ItemStats>,
  limit = 12,
): { id: string; accuracy: number }[] {
  return itemIds
    .map((id) => {
      const item = stats[id];
      const attempts = (item?.right ?? 0) + (item?.wrong ?? 0);
      return { id, accuracy: attempts ? Math.round(((item!.right) / attempts) * 100) : -1, attempts };
    })
    .filter((entry) => entry.attempts >= 2 && entry.accuracy < 80)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, limit)
    .map(({ id, accuracy }) => ({ id, accuracy }));
}

export const BOX_COUNT = MAX_BOX;
