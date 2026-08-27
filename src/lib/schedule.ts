/**
 * Leitner-box scheduling.
 *
 * Answers here are binary — the app already grades right or wrong, and asking
 * a learner to also rate their own confidence on every card is a lot of taps
 * for a scheduler this simple. Get it right and the item moves up a box and is
 * not seen for longer; get it wrong and it drops back to daily.
 *
 * Scheduling is per *item* (日, あ, 日本), not per item-and-mode. Knowing
 * 日 → "day" is admittedly not the same as knowing 日 → ニチ, but scheduling
 * them separately triples the daily load, which is the surest way to stop
 * doing reviews at all. The review deck picks a random enabled mode each time
 * the item comes round, so both get exercised over the weeks.
 */
import type { ItemStats } from './storage';

const DAY = 24 * 60 * 60 * 1000;

/** Days until the next review, indexed by box. Box 0 means "not started". */
export const BOX_INTERVALS = [0, 1, 3, 7, 14, 30];

export const MAX_BOX = BOX_INTERVALS.length - 1;

/** How many unseen items a day may introduce, so a fresh deck is not a wall. */
export const NEW_PER_DAY = 15;

export interface Schedule {
  box: number;
  due: number;
}

/** Where an item lands after being answered. */
export function nextSchedule(prior: ItemStats | undefined, correct: boolean, now: number): Schedule {
  const box = correct ? Math.min((prior?.box ?? 0) + 1, MAX_BOX) : 1;
  return { box, due: now + BOX_INTERVALS[box] * DAY };
}

/** Never scheduled: either unseen, or only ever practised outside a review. */
export const isNew = (stats: ItemStats | undefined): boolean => !stats?.box;

export const isDue = (stats: ItemStats | undefined, now: number): boolean =>
  !isNew(stats) && (stats?.due ?? 0) <= now;

/** When the earliest not-yet-due item comes back, or null if nothing is scheduled. */
export function nextDueAt(stats: Record<string, ItemStats>, now: number): number | null {
  let soonest: number | null = null;
  for (const item of Object.values(stats)) {
    if (isNew(item) || item.due === undefined || item.due <= now) continue;
    if (soonest === null || item.due < soonest) soonest = item.due;
  }
  return soonest;
}

/** "in 3 hours", "tomorrow", "in 5 days" — for the nothing-due message. */
export function describeGap(from: number, to: number): string {
  const ms = Math.max(0, to - from);
  const hours = Math.round(ms / (60 * 60 * 1000));
  if (hours < 1) return 'in under an hour';
  if (hours < 24) return `in ${hours} hour${hours === 1 ? '' : 's'}`;
  const days = Math.round(ms / DAY);
  return days <= 1 ? 'tomorrow' : `in ${days} days`;
}
