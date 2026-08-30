/**
 * Storage was the one module with no coverage, because it needs localStorage.
 * A tiny in-memory stand-in is enough, and it is where the schedule actually
 * lives, so it is worth testing.
 */
export {}; // the dynamic imports below need this file treated as a module

const backing = new Map<string, string>();
(globalThis as { localStorage?: unknown }).localStorage = {
  getItem: (key: string) => backing.get(key) ?? null,
  setItem: (key: string, value: string) => void backing.set(key, String(value)),
  removeItem: (key: string) => void backing.delete(key),
  clear: () => backing.clear(),
  key: (i: number) => [...backing.keys()][i] ?? null,
  get length() {
    return backing.size;
  },
};

const {
  DEFAULT_SECONDS_PER_CARD, exportProgress, importProgress, loadItemStats, loadPace,
  newAllowanceToday, recordReview, recordSession, recordTempo, resetProgress, savePace,
  savePref, loadPref, secondsPerCard,
} = await import('../src/lib/storage');
const { NEW_PER_DAY } = await import('../src/lib/schedule');
const { eq, ok } = await import('./assert');

/** The default pace spends its allowance over a week, not a day. */
const WEEKLY = NEW_PER_DAY * 7;

const DAY = 24 * 60 * 60 * 1000;
const NOW = Date.UTC(2026, 0, 15, 12, 0, 0);
const reset = () => backing.clear();

// ------------------------------------------------------------- reviewing

reset();
recordReview({ 'kanji:日': { right: 1, wrong: 0 } }, NOW);
let stats = loadItemStats();
eq('a first correct review enters box 1', stats['kanji:日'].box, 1);
eq('and is due tomorrow', stats['kanji:日'].due, NOW + DAY);

recordReview({ 'kanji:日': { right: 1, wrong: 0 } }, NOW + DAY);
stats = loadItemStats();
eq('a second correct review promotes', stats['kanji:日'].box, 2);
eq('counts accumulate', stats['kanji:日'].right, 2);

// One slip is enough to keep an item in the daily box.
recordReview({ 'kanji:日': { right: 1, wrong: 1 } }, NOW + 2 * DAY);
stats = loadItemStats();
eq('a slip demotes to box 1', stats['kanji:日'].box, 1);
eq('and it comes back tomorrow', stats['kanji:日'].due, NOW + 3 * DAY);

// --------------------------------------------- practice leaves the schedule

// The regression: practice rebuilt the stats entry from scratch and dropped
// box and due, quietly resetting a scheduled item to unscheduled.
reset();
recordReview({ 'kanji:山': { right: 1, wrong: 0 } }, NOW);
const scheduled = loadItemStats()['kanji:山'];

recordSession({ 'kanji:山': { right: 3, wrong: 0 } });
const afterPractice = loadItemStats()['kanji:山'];
eq('practice keeps the box', afterPractice.box, scheduled.box);
eq('practice keeps the due date', afterPractice.due, scheduled.due);
eq('practice still counts answers', afterPractice.right, 4);

// Practice on something never reviewed must not invent a schedule either.
recordSession({ 'kanji:川': { right: 1, wrong: 0 } });
eq('practice alone does not schedule', loadItemStats()['kanji:川'].box, undefined);

// ------------------------------------------------------- new-item budget

reset();
eq('a fresh week offers the full budget', newAllowanceToday(NOW), WEEKLY);

recordReview({ 'kanji:一': { right: 1, wrong: 0 }, 'kanji:二': { right: 1, wrong: 0 } }, NOW);
eq('introducing two spends two', newAllowanceToday(NOW), WEEKLY - 2);

// Reviewing something already scheduled is not an introduction.
recordReview({ 'kanji:一': { right: 1, wrong: 0 } }, NOW);
eq('a repeat review spends nothing', newAllowanceToday(NOW), WEEKLY - 2);

// The budget is the week's, so tomorrow is still charged for today — and a day
// skipped is not a day lost, which is the whole point of it being weekly.
eq('tomorrow still owes what today spent', newAllowanceToday(NOW + DAY), WEEKLY - 2);
eq('the window has cleared a week later', newAllowanceToday(NOW + 7 * DAY), WEEKLY);

// A pace the learner has chosen is what the budget is measured against, and
// three days a week means three whole sittings rather than three daily caps.
reset();
savePace({ newPerDay: 10, daysPerWeek: 3 });
eq('the chosen pace sets the budget', newAllowanceToday(NOW), 30);
eq('and it survives a reload', loadPace().newPerDay, 10);

// A pace outside the controls — a hand-edited export — must not stall intake.
savePace({ newPerDay: -5, daysPerWeek: 99 });
ok('a nonsense pace is clamped', newAllowanceToday(NOW) > 0);

// Progress saved when introductions were capped per day is read as that day's
// spending rather than discarded.
reset();
backing.set('japanlearner.v1', JSON.stringify({
  items: {},
  prefs: { newIntroduced: { date: new Date(NOW).toLocaleDateString('en-CA'), count: 4 } },
}));
eq('the old daily counter still counts', newAllowanceToday(NOW), WEEKLY - 4);

// ------------------------------------------------------------ card tempo

reset();
eq('an untimed learner gets the default', secondsPerCard().seconds, DEFAULT_SECONDS_PER_CARD);
ok('and is told it is a default', !secondsPerCard().measured);

recordTempo(50, 50 * 6000);
eq('enough cards switches to the measured rate', Math.round(secondsPerCard().seconds), 6);
ok('and says so', secondsPerCard().measured);

// A session left open all afternoon says nothing about how fast anyone reads.
recordTempo(10, 10 * 600_000);
eq('an abandoned session is ignored', Math.round(secondsPerCard().seconds), 6);
recordTempo(0, 1000);
eq('and so is an empty one', Math.round(secondsPerCard().seconds), 6);

// --------------------------------------------------------------- resetting

reset();
savePref('kana', { groupIds: ['k'] });
recordReview({ 'kanji:日': { right: 1, wrong: 0 } }, NOW);
resetProgress();
eq('reset clears every item', Object.keys(loadItemStats()).length, 0);
eq('reset restores the new-item budget', newAllowanceToday(NOW), WEEKLY);
ok('reset keeps your setup',
  JSON.stringify(loadPref('kana', null)) === JSON.stringify({ groupIds: ['k'] }));

// Unreadable storage must not take the app down with it.
reset();
backing.set('japanlearner.v1', '{ this is not json');
eq('corrupt storage reads as empty', Object.keys(loadItemStats()).length, 0);

// -------------------------------------------------------- export/import

// The schedule is weeks of work that cannot be reconstructed, so a round trip
// has to preserve it exactly.
reset();
recordReview({ 'kanji:日': { right: 3, wrong: 1 } }, NOW);
savePref('kana', { groupIds: ['k'] });
const backup = exportProgress();
const before = loadItemStats()['kanji:日'];

reset();
eq('cleared before restoring', Object.keys(loadItemStats()).length, 0);

const restored = importProgress(backup);
ok('import reports success', restored.ok, restored.message);
eq('import restores the item', loadItemStats()['kanji:日'].box, before.box);
eq('and its due date', loadItemStats()['kanji:日'].due, before.due);
eq('and its counts', loadItemStats()['kanji:日'].right, before.right);
ok('and the saved setup',
  JSON.stringify(loadPref('kana', null)) === JSON.stringify({ groupIds: ['k'] }));

// A bad file must be refused rather than half-applied.
reset();
recordReview({ 'kanji:山': { right: 1, wrong: 0 } }, NOW);
const junk = importProgress('not json at all');
ok('junk is rejected', !junk.ok);
eq('and nothing was touched', Object.keys(loadItemStats()).length, 1);

const wrongShape = importProgress('{"hello":"world"}');
ok('a file of the wrong shape is rejected', !wrongShape.ok);
eq('and still nothing was touched', Object.keys(loadItemStats()).length, 1);

// Entries that are not real stats must be dropped, so a malformed export
// cannot put NaN due dates into the scheduler.
reset();
const dirty = importProgress(
  JSON.stringify({ items: { 'kanji:川': { right: 1, wrong: 0, box: 2, due: 5 }, bad: { nope: true } }, prefs: {} }),
);
ok('a partly malformed file still imports', dirty.ok);
eq('keeping only the valid entries', dirty.items, 1);
eq('the good entry survives', loadItemStats()['kanji:川'].box, 2);
ok('the bad entry is gone', loadItemStats()['bad'] === undefined);

// ------------------------------------------------- legacy kana migration

// Progress saved before kana were split by script must not simply vanish.
reset();
backing.set('japanlearner.v1', JSON.stringify({
  items: { 'kana:vowels-あ': { right: 7, wrong: 1, lastSeen: NOW, box: 3, due: NOW + DAY } },
  prefs: {},
}));
const migrated = loadItemStats();
eq('the old key is gone', migrated['kana:vowels-あ'], undefined);
eq('and is read as hiragana', migrated['kana:hira:vowels-あ'].box, 3);
eq('with its counts intact', migrated['kana:hira:vowels-あ'].right, 7);
ok('and it is not also claimed as katakana',
  migrated['kana:kata:vowels-あ'] === undefined);

// Already-migrated ids must pass through untouched.
reset();
backing.set('japanlearner.v1', JSON.stringify({
  items: { 'kana:kata:vowels-あ': { right: 2, wrong: 0, lastSeen: NOW, box: 2 } },
  prefs: {},
}));
eq('a katakana id survives as itself', loadItemStats()['kana:kata:vowels-あ'].box, 2);
