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
  exportProgress, importProgress, loadItemStats, newAllowanceToday,
  recordReview, recordSession, resetProgress, savePref, loadPref,
} = await import('../src/lib/storage');
const { NEW_PER_DAY } = await import('../src/lib/schedule');
const { eq, ok } = await import('./assert');

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
eq('a fresh day offers the full budget', newAllowanceToday(NOW), NEW_PER_DAY);

recordReview({ 'kanji:一': { right: 1, wrong: 0 }, 'kanji:二': { right: 1, wrong: 0 } }, NOW);
eq('introducing two spends two', newAllowanceToday(NOW), NEW_PER_DAY - 2);

// Reviewing something already scheduled is not an introduction.
recordReview({ 'kanji:一': { right: 1, wrong: 0 } }, NOW);
eq('a repeat review spends nothing', newAllowanceToday(NOW), NEW_PER_DAY - 2);

eq('the budget resets the next day', newAllowanceToday(NOW + DAY), NEW_PER_DAY);

// --------------------------------------------------------------- resetting

reset();
savePref('kana', { groupIds: ['k'] });
recordReview({ 'kanji:日': { right: 1, wrong: 0 } }, NOW);
resetProgress();
eq('reset clears every item', Object.keys(loadItemStats()).length, 0);
eq('reset restores the new-item budget', newAllowanceToday(NOW), NEW_PER_DAY);
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
