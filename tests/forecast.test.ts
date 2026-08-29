/**
 * The finish date, and the daily load that pays for it.
 *
 * Most of these are properties rather than numbers: a faster pace must finish
 * sooner, the same weekly budget must land on the same date however it is
 * split up, and material shared between two stages must only be paid for once.
 * The few hard numbers are the ones the whole estimate rests on — four days
 * from first sight to "known", and the top box coming round every thirty.
 */
import { CURRICULUM } from '../src/data/curriculum';
import { stageItems } from '../src/lib/curriculum';
import { DEFAULT_ACCURACY, dailyLoad, daysToKnown, forecast } from '../src/lib/forecast';
import { BOX_INTERVALS, DEFAULT_PACE, MAX_BOX, type Pace } from '../src/lib/schedule';
import type { ItemStats } from '../src/lib/storage';
import { eq, ok } from './assert';

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);

const stat = (over: Partial<ItemStats> = {}): ItemStats => ({
  right: 0, wrong: 0, lastSeen: 0, ...over,
});

const EVERY_ITEM = [...new Set(CURRICULUM.flatMap(stageItems))];
const pace = (newPerDay: number, daysPerWeek: number): Pace => ({ newPerDay, daysPerWeek });
const daysAt = (p: Pace, stats: Record<string, ItemStats> = {}): number =>
  forecast(stats, p, DEFAULT_ACCURACY, 8, NOW).days;

// ------------------------------------------------------ time to "known"

// An item introduced today comes back tomorrow and again three days later, and
// it is that third answer that puts it in box 3.
eq('a perfect learner takes the ladder at face value', daysToKnown(1), BOX_INTERVALS[1] + BOX_INTERVALS[2]);
ok('missing things takes longer', daysToKnown(0.9) > daysToKnown(1));
ok('missing more takes longer still', daysToKnown(0.7) > daysToKnown(0.9));
ok('an impossible deck does not return infinity',
  Number.isFinite(daysToKnown(0.01)), String(daysToKnown(0.01)));
eq('accuracy is floored rather than trusted', daysToKnown(0.01), daysToKnown(0.5));
eq('and capped at perfect', daysToKnown(1.5), daysToKnown(1));

// ------------------------------------------------------------ the plan

const fresh = forecast({}, DEFAULT_PACE, DEFAULT_ACCURACY, 8, NOW);

eq('a fresh learner has everything to do', fresh.unseen, EVERY_ITEM.length);
eq('and knows none of it', fresh.remaining, EVERY_ITEM.length);
eq('the plan covers every item', fresh.total, EVERY_ITEM.length);
eq('every stage is still open', fresh.stages.filter((s) => s.complete).length, 0);
ok('which takes a while', fresh.days > 0);
eq('and the date matches the count', fresh.finishesOn, NOW + fresh.days * DAY);

ok('stages land in order',
  fresh.stages.every((s, i) => i === 0 || s.days >= fresh.stages[i - 1].days));
eq('the last stage is the finish', fresh.stages[fresh.stages.length - 1].days, fresh.days);

// Nothing can finish before the first item it introduces has had time to climb.
ok('even the first stage waits for the ladder', fresh.stages[0].days > daysToKnown(DEFAULT_ACCURACY));

// ------------------------------------------------------- pace behaviour

ok('a faster pace finishes sooner', daysAt(pace(30, 7)) < daysAt(pace(15, 7)));
ok('fewer days a week takes longer', daysAt(pace(15, 4)) > daysAt(pace(15, 7)));

// The whole point of budgeting by the week: how you slice it does not matter,
// only how much of it there is.
eq('the same weekly budget lands on the same day',
  Math.round(daysAt(pace(10, 7))), Math.round(daysAt(pace(14, 5))));
ok('and a bigger one lands sooner', daysAt(pace(20, 7)) < daysAt(pace(10, 7)));

// -------------------------------------------------- credit for progress

// Stage 1 is the basic hiragana; knowing them must both close the stage and
// pull the whole plan in, since those items no longer need introducing.
const hiragana = stageItems(CURRICULUM[0]);
const learned: Record<string, ItemStats> = {};
for (const id of hiragana) learned[id] = stat({ box: MAX_BOX, right: 5, due: NOW + 30 * DAY });

const after = forecast(learned, DEFAULT_PACE, DEFAULT_ACCURACY, 8, NOW);
ok('a finished stage is marked done', after.stages[0].complete);
eq('and needs no date', after.stages[0].finishesOn, null);
eq('its items are known', after.remaining, EVERY_ITEM.length - hiragana.length);
ok('and the finish moves closer', after.days < fresh.days);

// Items part-way up the ladder cost no allowance, only time.
const started: Record<string, ItemStats> = {};
for (const id of hiragana) started[id] = stat({ box: 1, right: 1, due: NOW });
const partway = forecast(started, DEFAULT_PACE, DEFAULT_ACCURACY, 8, NOW);
ok('items already in flight are not queued again', partway.days < fresh.days);
ok('but they are not counted as known', partway.remaining === EVERY_ITEM.length);

// Everything known means there is nothing left to plan.
const done: Record<string, ItemStats> = {};
for (const id of EVERY_ITEM) done[id] = stat({ box: MAX_BOX, right: 5 });
const finished = forecast(done, DEFAULT_PACE, DEFAULT_ACCURACY, 8, NOW);
eq('a finished plan takes no time', finished.days, 0);
eq('and has no finish date', finished.finishesOn, null);
eq('every stage is complete', finished.stages.filter((s) => s.complete).length, CURRICULUM.length);

// ------------------------------------------------- shared material once

// ます-forms and the て-form drill the same verbs. The second of them must not
// pay to introduce material the first has already queued, or the estimate
// charges the learner twice for one set of words.
const teForm = fresh.stages.find((s) => s.stage.id === 'te-form');
const polite = fresh.stages.find((s) => s.stage.id === 'polite');
ok('both conjugation stages are in the plan', Boolean(teForm && polite));
ok('the first pays for the verbs', (polite?.introduces ?? 0) > 0);
eq('the second does not pay again', teForm?.introduces, 0);

const queued = fresh.stages.reduce((sum, s) => sum + s.introduces, 0);
ok('no item is queued twice', queued <= EVERY_ITEM.length, `${queued} of ${EVERY_ITEM.length}`);
// The pass mark is 90%, so the plan deliberately stops short of every last item.
ok('and the pass mark leaves a few behind', queued < EVERY_ITEM.length);

// ------------------------------------------------------------- the load

const total = EVERY_ITEM.length;
const weekly = dailyLoad(pace(15, 7), total, 1, 8);

// Every box below the top hands back one review a day per item introduced, so
// at 15 a day that is 15 new + 4x15 climbing + the top box coming round.
eq('the busiest session is the ladder plus the upkeep',
  Math.round(weekly.perSession),
  Math.round(15 + 4 * 15 + total / BOX_INTERVALS[MAX_BOX]));
eq('upkeep is the top box alone', Math.round(weekly.upkeep), Math.round(total / BOX_INTERVALS[MAX_BOX]));
ok('and upkeep is the cheaper half', weekly.upkeep < weekly.perSession);

// Reviews do not take days off: the same week's cards arrive in fewer sittings.
const thrice = dailyLoad(pace(35, 3), total, 1, 8);
eq('three days a week means longer sessions',
  Math.round(thrice.perSession), Math.round(dailyLoad(pace(15, 7), total, 1, 8).perSession * (7 / 3)));

ok('missing cards makes for more of them',
  dailyLoad(pace(15, 7), total, 0.7, 8).perSession > weekly.perSession);

eq('minutes follow from the seconds a card', Math.round(weekly.minutes),
  Math.round((weekly.perSession * 8) / 60));
ok('a faster learner spends fewer minutes on the same cards',
  dailyLoad(pace(15, 7), total, 1, 4).minutes < weekly.minutes);
