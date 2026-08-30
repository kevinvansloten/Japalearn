import { KANA_GROUPS } from '../src/data/kana';
import { KANJI_GROUPS } from '../src/data/kanji';
import type {
  ConjugationConfig,
  CounterConfig,
  KanaConfig,
  ParticleConfig,
  ReadingConfig,
  KanjiConfig,
  WordConfig,
} from '../src/lib/buildCards';
import { planReview, type Decks } from '../src/lib/review';
import {
  BOX_INTERVALS,
  DEFAULT_PACE,
  MAX_BOX,
  NEW_PER_DAY,
  describeGap,
  isDue,
  isNew,
  nextDueAt,
  nextSchedule,
  sessionNewCap,
  weeklyAllowance,
  type Pace,
} from '../src/lib/schedule';
import type { ItemStats } from '../src/lib/storage';
import { eq, ok } from './assert';

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);

const stat = (over: Partial<ItemStats> = {}): ItemStats => ({
  right: 0, wrong: 0, lastSeen: 0, ...over,
});

// -------------------------------------------------------------- box moves

eq('new item promotes into box 1', nextSchedule(undefined, true, NOW).box, 1);
eq('box 1 is due tomorrow', nextSchedule(undefined, true, NOW).due, NOW + 1 * DAY);
eq('a right answer moves up one', nextSchedule(stat({ box: 2 }), true, NOW).box, 3);
eq('box 3 waits a week', nextSchedule(stat({ box: 2 }), true, NOW).due, NOW + 7 * DAY);
eq('a wrong answer drops to box 1', nextSchedule(stat({ box: 5 }), false, NOW).box, 1);
eq('a demoted item returns tomorrow', nextSchedule(stat({ box: 5 }), false, NOW).due, NOW + 1 * DAY);
eq('a new item answered wrong starts at box 1', nextSchedule(undefined, false, NOW).box, 1);

// The top box must be a fixed point, not run off the end of the interval table.
const topped = nextSchedule(stat({ box: MAX_BOX }), true, NOW);
eq('the last box does not overflow', topped.box, MAX_BOX);
eq('the last box keeps its interval', topped.due, NOW + BOX_INTERVALS[MAX_BOX] * DAY);
ok('every box has an interval', BOX_INTERVALS.length === MAX_BOX + 1);
ok('intervals only grow',
  BOX_INTERVALS.every((d, i) => i === 0 || d > BOX_INTERVALS[i - 1]),
  BOX_INTERVALS.join(','));

// ------------------------------------------------------------- due checks

ok('an unseen item is new', isNew(undefined));
// Progress saved before scheduling existed has counts but no box.
ok('pre-scheduling progress counts as new', isNew(stat({ right: 9, wrong: 1 })));
ok('a scheduled item is not new', !isNew(stat({ box: 1, due: NOW })));
ok('due when the time has passed', isDue(stat({ box: 2, due: NOW - 1 }), NOW));
ok('due exactly on the boundary', isDue(stat({ box: 2, due: NOW }), NOW));
ok('not due yet', !isDue(stat({ box: 2, due: NOW + 1 }), NOW));
ok('a new item is never "due"', !isDue(stat({ right: 5, wrong: 0 }), NOW));

eq('finds the soonest upcoming review',
  nextDueAt({ a: stat({ box: 1, due: NOW + 5 * DAY }), b: stat({ box: 1, due: NOW + 2 * DAY }) }, NOW),
  NOW + 2 * DAY);
eq('ignores items already due',
  nextDueAt({ a: stat({ box: 1, due: NOW - DAY }) }, NOW),
  null);
eq('nothing scheduled at all', nextDueAt({}, NOW), null);

eq('gap in hours', describeGap(NOW, NOW + 3 * 60 * 60 * 1000), 'in 3 hours');
eq('gap of a day', describeGap(NOW, NOW + DAY), 'tomorrow');
eq('gap in days', describeGap(NOW, NOW + 5 * DAY), 'in 5 days');

// -------------------------------------------------------- one sitting

// A fresh account has the whole week unspent. It still only gets a day of it:
// opening the app for the first time on a hundred unfamiliar cards is the wall
// the per-day limit exists to prevent.
eq('a sitting takes a day at a time',
  sessionNewCap(DEFAULT_PACE, weeklyAllowance(DEFAULT_PACE)), NEW_PER_DAY);
eq('and a week away is met with the same day', sessionNewCap({ newPerDay: 15, daysPerWeek: 4 }, 60), 15);
eq('a thin allowance is all there is to take', sessionNewCap(DEFAULT_PACE, 4), 4);
eq('a spent budget introduces nothing', sessionNewCap(DEFAULT_PACE, 0), 0);
eq('and it never goes negative', sessionNewCap(DEFAULT_PACE, -20), 0);

/**
 * A month of sittings, returning what the last settled week introduced.
 *
 * The allowance is read the way storage reads it — the six days behind you
 * plus today, which has not been spent yet when the deck is built.
 */
function settledWeek(pace: Pace, studyDays: number): number {
  const log: number[] = [];
  let total = 0;
  for (let day = 0; day < 28; day += 1) {
    const spent = log.slice(Math.max(0, log.length - 6)).reduce((a, b) => a + b, 0);
    const takes =
      day % 7 < studyDays
        ? sessionNewCap(pace, Math.max(0, weeklyAllowance(pace) - spent))
        : 0;
    log.push(takes);
    if (day >= 21) total += takes;
  }
  return total;
}

// The two limits together, over a real week. Study the days you promised and
// you get the pace you asked for; study fewer and you get fewer; study more and
// the week's ceiling holds you to the course you actually chose rather than
// quietly running the faster one.
const fourDays: Pace = { newPerDay: 15, daysPerWeek: 4 };
for (const studyDays of [1, 2, 3, 4, 5, 6, 7]) {
  eq(`four days a week, studied ${studyDays}`,
    settledWeek(fourDays, studyDays), Math.min(studyDays, 4) * 15);
}
eq('every day at seven days a week', settledWeek(DEFAULT_PACE, 7), weeklyAllowance(DEFAULT_PACE));
eq('a once-a-week pace stays once a week', settledWeek({ newPerDay: 20, daysPerWeek: 1 }, 7), 20);

// ------------------------------------------------------------ review plan

const kana: KanaConfig = {
  scripts: ['hira'], groupIds: ['vowels'], modes: ['recognition'], flow: 'once', order: 'ordered',
};
const kanji: KanjiConfig = {
  groupIds: ['numbers'],
  excluded: [],
  modes: ['meaning'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', vocab: 'type', listening: 'type' },
  flow: 'once', order: 'ordered',
};

// No counters in play for these cases; the deck is exercised separately below.
const counters: CounterConfig = {
  groupIds: [],
  excluded: [],
  modes: ['reading'],
  inputModes: { reading: 'type', meaning: 'type', listening: 'type' },
  flow: 'once',
  order: 'ordered',
};

const words: WordConfig = {
  groupIds: [],
  excluded: [],
  modes: ['meaning'],
  inputModes: { meaning: 'type', reading: 'type', recall: 'choice', listening: 'type' },
  flow: 'once',
  order: 'ordered',
};

const conjugation: ConjugationConfig = {
  groupIds: [],
  excluded: [],
  verbForms: ['te'],
  adjectiveForms: ['negative'],
  modes: ['produce'],
  inputModes: { produce: 'type', identify: 'choice', dictionary: 'type' },
  flow: 'once',
  order: 'ordered',
};

const particles: ParticleConfig = {
  groupIds: [],
  excluded: [],
  inputMode: 'choice',
  flow: 'once',
  order: 'ordered',
};

const reading: ReadingConfig = {
  groupIds: [],
  excluded: [],
  modes: ['meaning'],
  flow: 'once',
  order: 'ordered',
};

const decks: Decks = { kana, kanji, counters, words, conjugation, particles, reading };

const empty = planReview(decks, {}, 5, NOW);
eq('a fresh account introduces up to the allowance', empty.cards.length, 5);
eq('all of them are new', empty.fresh, 5);
eq('none are due', empty.due, 0);
ok('new cards come from the selection',
  empty.cards.every((c) => c.itemId.startsWith('kana:hira:') || c.itemId.startsWith('kanji:')));

eq('a zero allowance introduces nothing', planReview(decks, {}, 0, NOW).cards.length, 0);

// Due items must come back even after their group is unticked, or unticking a
// group would quietly orphan everything you had already learned in it.
const dropped = planReview(decks, { 'kanji:山': stat({ box: 2, due: NOW - DAY }) }, 0, NOW);
eq('a due item outside the selection still comes back', dropped.due, 1);
eq('and it is the only card', dropped.cards.length, 1);
eq('built for the right item', dropped.cards[0].itemId, 'kanji:山');

// Not-yet-due items stay out of the deck entirely.
const resting = planReview(decks, { 'kanji:一': stat({ box: 3, due: NOW + DAY }) }, 0, NOW);
eq('an item that is not due is left alone', resting.cards.length, 0);

// A scheduled item is no longer new, so it must not be counted twice.
const mixed = planReview(decks, { 'kanji:一': stat({ box: 1, due: NOW - DAY }) }, 3, NOW);
eq('due and new are counted separately', mixed.due, 1);
eq('the allowance still applies to the new ones', mixed.fresh, 3);
eq('the deck is the sum of both', mixed.cards.length, 4);
ok('no item appears twice in one review',
  new Set(mixed.cards.map((c) => c.itemId)).size === mixed.cards.length);

// The whole deck, so a big backlog is not silently truncated.
const everyItem: Record<string, ItemStats> = {};
for (const g of KANJI_GROUPS) {
  for (const k of g.kanji) everyItem[`kanji:${k.char}`] = stat({ box: 1, due: NOW - DAY });
}
const backlog = planReview(decks, everyItem, 0, NOW);
eq('every due item is served', backlog.due, KANJI_GROUPS.flatMap((g) => g.kanji).length);

// Review cards must be answerable: one card per due item, drawn from the
// enabled modes even when the item's group is not selected.
ok('review cards are real cards', backlog.cards.every((c) => typeof c.check === 'function'));
ok('kana groups are all reachable', KANA_GROUPS.length > 0);

// A due counter must be buildable even though no counter group is selected,
// the same way a due kanji is.
const dueCounter = planReview(decks, { 'counter:六本': stat({ box: 2, due: NOW - DAY }) }, 0, NOW);
eq('a due counter comes back', dueCounter.cards.length, 1);
eq('and it is the right item', dueCounter.cards[0].itemId, 'counter:六本');
