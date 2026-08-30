/**
 * How long the plan takes at a pace you choose.
 *
 * Everything here is arithmetic on things the app already knows: the 18 stages
 * and the items in them, the Leitner ladder, and how much of it you have
 * already got. The only new input is the pace, and the only new output is a
 * date — but the date is a real prediction rather than a slogan, because the
 * same pace is what `newAllowanceToday` actually spends.
 *
 * Two properties of the ladder do most of the work:
 *
 * - **Getting one item known takes a fixed run of days.** Introduced today, it
 *   comes back tomorrow, then three days later, and that third answer is what
 *   puts it in box 3. Four days if you never miss it, longer if you do, and
 *   `daysToKnown` says how much longer.
 * - **A steady intake settles at a predictable review load.** An item in box
 *   `b` waits `BOX_INTERVALS[b]` days, so at `r` introductions a day exactly
 *   `r × BOX_INTERVALS[b]` items are sitting in that box and exactly `r` of
 *   them fall due each day. Every box below the top therefore contributes `r`
 *   reviews a day, whatever its interval — which is why doubling the pace
 *   roughly doubles the daily session, and why the plan screen says so.
 */
import { CURRICULUM, type Stage } from '../data/curriculum';
import { STAGE_PASS_MARK, isStageComplete, stageItems } from './curriculum';
import { KNOWN_FROM_BOX, masteryOf } from './progress';
import { BOX_INTERVALS, MAX_BOX, dailyIntake, type Pace } from './schedule';
import type { ItemStats } from './storage';

const DAY = 24 * 60 * 60 * 1000;

/** The waits an item sits through on its way from first sight to "known". */
const CLIMB = BOX_INTERVALS.slice(1, KNOWN_FROM_BOX);

/** Boxes below the top, each contributing one review a day per item introduced. */
const CLIMBING_BOXES = MAX_BOX - 1;

/** How often a fully-learned item still comes round. */
const TOP_INTERVAL = BOX_INTERVALS[MAX_BOX];

/** Assumed while nothing has been answered yet. */
export const DEFAULT_ACCURACY = 0.9;

/**
 * Below this the model stops describing anything useful: an item missed more
 * often than not never climbs, and the estimate would run off towards infinity
 * rather than admit the deck is simply set up too hard.
 */
const ACCURACY_FLOOR = 0.5;

/**
 * Expected days from an item's first appearance to box 3, at a given accuracy.
 *
 * A miss sends it back to box 1, so this is not merely the sum of the
 * intervals. Writing p for accuracy and i(b) for the wait at box b, the
 * expected time from box 1 solves to sum(p^(b-1) · i(b)) / p^(K-1) over the
 * boxes below "known" — four days at p = 1, and stretching from there.
 */
export function daysToKnown(accuracy: number): number {
  const p = Math.min(1, Math.max(ACCURACY_FLOOR, accuracy));
  const weighted = CLIMB.reduce((sum, days, rung) => sum + days * p ** rung, 0);
  return weighted / p ** CLIMB.length;
}

export interface StageForecast {
  stage: Stage;
  complete: boolean;
  known: number;
  total: number;
  /** unseen items this stage is the first to call for */
  introduces: number;
  /** calendar days until it reaches the pass mark, 0 if it is already there */
  days: number;
  /** when that lands, or null for a stage already finished */
  finishesOn: number | null;
}

export interface Load {
  /** cards in a session while new items are still arriving, at its busiest */
  perSession: number;
  minutes: number;
  /** cards in a session once the plan is done and only upkeep is left */
  upkeep: number;
  upkeepMinutes: number;
}

export interface Forecast {
  pace: Pace;
  accuracy: number;
  /** items not yet known, of which `unseen` have never been introduced */
  remaining: number;
  unseen: number;
  total: number;
  stages: StageForecast[];
  /** calendar days until the last stage passes, 0 when the plan is done */
  days: number;
  finishesOn: number | null;
  load: Load;
}

/**
 * The whole plan, dated.
 *
 * Stages are walked in curriculum order and each unseen item is charged to the
 * first stage that calls for it, so the two stages built on the same verbs —
 * the ます-forms and the て-form — do not each pay to introduce them. A stage
 * finishes at the same 90% pass mark the rest of the app uses, and items
 * already part-learned count towards it without spending any of the budget.
 */
export function forecast(
  stats: Record<string, ItemStats>,
  pace: Pace,
  accuracy = DEFAULT_ACCURACY,
  secondsPerCard = 8,
  now = Date.now(),
): Forecast {
  const rate = dailyIntake(pace);
  const tail = daysToKnown(accuracy);

  const queued = new Set<string>();
  let queueSize = 0;

  const stages = CURRICULUM.map((stage) => {
    const items = stageItems(stage);
    const complete = isStageComplete(stage, stats);
    const stageKnown = items.filter((id) => masteryOf(stats[id]) === 'known').length;
    const learning = items.filter((id) => masteryOf(stats[id]) === 'learning').length;
    const stageUnseen = items.filter((id) => masteryOf(stats[id]) === 'unseen');

    // Only the items up to the pass mark have to be learned, and the ones
    // already in flight close the gap without costing a new introduction.
    let shortfall = Math.max(0, Math.ceil(items.length * STAGE_PASS_MARK) - stageKnown);
    shortfall -= Math.min(shortfall, learning);

    let introduces = 0;
    for (const id of stageUnseen) {
      if (shortfall <= 0) break;
      shortfall -= 1;
      // Already paid for by an earlier stage: it still has to be known by the
      // time this one passes, but it does not queue twice.
      if (queued.has(id)) continue;
      queued.add(id);
      queueSize += 1;
      introduces += 1;
    }

    const days = complete ? 0 : queueSize / rate + tail;
    return {
      stage,
      complete,
      known: stageKnown,
      total: items.length,
      introduces,
      days,
      finishesOn: complete ? null : now + days * DAY,
    };
  });

  // Every item, counted once, for the totals under the headline.
  let total = 0;
  let known = 0;
  let unseen = 0;
  for (const id of new Set(CURRICULUM.flatMap(stageItems))) {
    total += 1;
    const mastery = masteryOf(stats[id]);
    if (mastery === 'known') known += 1;
    else if (mastery === 'unseen') unseen += 1;
  }

  const days = Math.max(0, ...stages.map((entry) => entry.days));

  return {
    pace,
    accuracy,
    remaining: total - known,
    unseen,
    total,
    stages,
    days,
    finishesOn: days > 0 ? now + days * DAY : null,
    load: dailyLoad(pace, total, accuracy, secondsPerCard),
  };
}

/**
 * What a session costs at this pace, at the point it costs the most.
 *
 * The busiest stretch is while new items are still arriving and most of the
 * earlier ones have already reached the top box, so that is what is quoted:
 * the intake itself, one review a day from each box below the top, and the top
 * box coming round every thirty days. Missed cards are asked again, hence the
 * accuracy term.
 *
 * Reviews do not observe rest days — an item due on Thursday is still waiting
 * on Saturday — so studying fewer days a week makes each session longer in
 * proportion rather than making the week's work smaller.
 */
export function dailyLoad(
  pace: Pace,
  totalItems: number,
  accuracy = DEFAULT_ACCURACY,
  secondsPerCard = 8,
): Load {
  const p = Math.min(1, Math.max(ACCURACY_FLOOR, accuracy));
  const rate = dailyIntake(pace);
  const sessions = 7 / pace.daysPerWeek;

  const perSession = (rate + (CLIMBING_BOXES * rate) / p + totalItems / TOP_INTERVAL) * sessions;
  const upkeep = (totalItems / TOP_INTERVAL) * sessions;

  return {
    perSession,
    minutes: (perSession * secondsPerCard) / 60,
    upkeep,
    upkeepMinutes: (upkeep * secondsPerCard) / 60,
  };
}
