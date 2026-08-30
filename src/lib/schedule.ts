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
import { en, type Strings } from '../i18n/en';

const DAY = 24 * 60 * 60 * 1000;

/** Days until the next review, indexed by box. Box 0 means "not started". */
export const BOX_INTERVALS = [0, 1, 3, 7, 14, 30];

export const MAX_BOX = BOX_INTERVALS.length - 1;

/** How many unseen items a day may introduce, so a fresh deck is not a wall. */
export const NEW_PER_DAY = 15;

/**
 * How much new material the learner has asked for.
 *
 * Two numbers rather than one, because "fifteen a day" and "four days a week"
 * are the two things people actually know about their own week, and together
 * they are the only input the finish date needs.
 */
export interface Pace {
  /** unseen items to introduce on a day you study */
  newPerDay: number;
  /** days a week you intend to sit down with it, 1–7 */
  daysPerWeek: number;
}

export const DEFAULT_PACE: Pace = { newPerDay: NEW_PER_DAY, daysPerWeek: 7 };

/** The bounds the pace controls offer, and what a stored pace is clamped to. */
export const PACE_LIMITS = { newPerDay: [3, 40], daysPerWeek: [1, 7] } as const;

const clamp = (value: number, [low, high]: readonly [number, number]): number =>
  Math.min(high, Math.max(low, Math.round(value)));

/** A pace read from storage, made safe: an edited export cannot stall intake. */
export function asPace(value: unknown): Pace {
  const raw = (value ?? {}) as Partial<Pace>;
  return {
    newPerDay: clamp(
      Number.isFinite(raw.newPerDay) ? (raw.newPerDay as number) : DEFAULT_PACE.newPerDay,
      PACE_LIMITS.newPerDay,
    ),
    daysPerWeek: clamp(
      Number.isFinite(raw.daysPerWeek) ? (raw.daysPerWeek as number) : DEFAULT_PACE.daysPerWeek,
      PACE_LIMITS.daysPerWeek,
    ),
  };
}

/**
 * New items answer to two limits, and each means exactly what its name says.
 *
 * `newPerDay` is the most one sitting introduces. `weeklyAllowance` is the most
 * a week does. Neither alone is enough:
 *
 * - **A daily cap alone leaves `daysPerWeek` decorative.** A learner who asks
 *   for fifteen a day across four days wants sixty a week; capped only by the
 *   day, sitting down all seven gets them a hundred and five, and the date the
 *   plan screen promised was for a course they are no longer taking.
 * - **A weekly budget alone arrives in a heap.** Whatever has not been spent is
 *   available the moment you sit down, so a fresh install opens on a week's
 *   worth at once, and a week away is met with the same wall on return. It is
 *   lumpy even in an ordinary week: two big sittings, then two with nothing new
 *   left in them.
 *
 * Together they are smooth. Study the days you promised and you get `newPerDay`
 * every time; study more and the week's ceiling throttles you back to the pace
 * you actually chose, rather than quietly running at the faster one.
 */
export const weeklyAllowance = (pace: Pace): number => pace.newPerDay * pace.daysPerWeek;

/**
 * New items this sitting may introduce: whichever of the two limits binds.
 *
 * A skipped day is therefore not carried forward into a double session. That is
 * deliberate — the budget is a ceiling, not a debt, and forty unfamiliar cards
 * in one evening is how people stop opening the app. Falling behind the pace
 * shows up where it belongs, in the date on the plan screen.
 */
export const sessionNewCap = (pace: Pace, allowance: number): number =>
  Math.max(0, Math.min(allowance, pace.newPerDay));

/** Introductions per calendar day, which is what a finish date is paced by. */
export const dailyIntake = (pace: Pace): number => weeklyAllowance(pace) / 7;

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
export function describeGap(from: number, to: number, s: Strings = en): string {
  const ms = Math.max(0, to - from);
  const hours = Math.round(ms / (60 * 60 * 1000));
  if (hours < 1) return s.gap.underAnHour;
  if (hours < 24) return s.gap.hours(hours);
  const days = Math.round(ms / DAY);
  return days <= 1 ? s.gap.tomorrow : s.gap.days(days);
}
