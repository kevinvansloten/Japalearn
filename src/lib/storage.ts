/** Lightweight localStorage persistence: lifetime item stats + last-used setup. */
import { asPace, nextSchedule, weeklyAllowance, type Pace } from './schedule';
import { en, type Strings } from '../i18n/en';

const KEY = 'japanlearner.v1';

/** Local calendar day, used to budget how many new items a week introduces. */
const today = (now: number): string => new Date(now).toLocaleDateString('en-CA');

/**
 * The same, `back` days earlier. Anchored at midday so that the hour a clock
 * change moves cannot land the arithmetic on the wrong side of midnight and
 * either drop a day out of the window or count one twice.
 */
function daysBack(now: number, back: number): string {
  const date = new Date(now);
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - back);
  return date.toLocaleDateString('en-CA');
}

/** How many new items each of the last few days introduced, keyed by date. */
type NewLog = Record<string, number>;

/** The window the new-item budget is spent over: today and the six before it. */
const BUDGET_DAYS = 7;

/**
 * Introductions were once capped per day and stored as a single `{date, count}`,
 * so anything older than the weekly budget is read as that one day's total
 * rather than thrown away — the learner keeps the allowance they have spent.
 */
function readLog(value: unknown, now: number): NewLog {
  if (!value || typeof value !== 'object') return {};
  const legacy = value as { date?: unknown; count?: unknown };
  if (typeof legacy.date === 'string' && typeof legacy.count === 'number') {
    return { [legacy.date]: legacy.count };
  }
  const window = new Set(
    Array.from({ length: BUDGET_DAYS }, (_unused, back) => daysBack(now, back)),
  );
  const log: NewLog = {};
  for (const [date, count] of Object.entries(value as Record<string, unknown>)) {
    if (typeof count === 'number' && window.has(date)) log[date] = count;
  }
  return log;
}

/** New items introduced across the budget window ending today. */
function spentThisWeek(log: NewLog, now: number): number {
  let used = 0;
  for (let back = 0; back < BUDGET_DAYS; back += 1) used += log[daysBack(now, back)] ?? 0;
  return used;
}

export interface ItemStats {
  right: number;
  wrong: number;
  /** epoch ms of the last time this item was answered */
  lastSeen: number;
  /**
   * Leitner box, 1..MAX_BOX. Absent means the item has never been through a
   * review — including progress saved before scheduling existed, which simply
   * starts as new.
   */
  box?: number;
  /** epoch ms when this item is next due */
  due?: number;
}

interface Store {
  items: Record<string, ItemStats>;
  prefs: Record<string, unknown>;
}

/**
 * A fresh object every time. Callers mutate what read() hands back before
 * writing it, so a shared constant here would accumulate state across calls
 * and outlive resetProgress() whenever a write cannot land.
 */
const emptyStore = (): Store => ({ items: {}, prefs: {} });

function read(): Store {
  if (typeof localStorage === 'undefined') return emptyStore();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as Partial<Store>;
    return { items: migrate(parsed.items ?? {}), prefs: parsed.prefs ?? {} };
  } catch {
    return emptyStore();
  }
}

/**
 * Kana were once scheduled per glyph rather than per script, so あ and ア
 * shared an entry. Progress saved under the old key is read as hiragana, which
 * is what the default deck practises.
 */
const LEGACY_KANA = /^kana:(?!hira:|kata:)(.+)$/;

function migrate(items: Record<string, ItemStats>): Record<string, ItemStats> {
  const out: Record<string, ItemStats> = {};
  for (const [id, stats] of Object.entries(items)) {
    const legacy = LEGACY_KANA.exec(id);
    out[legacy ? `kana:hira:${legacy[1]}` : id] = stats;
  }
  return out;
}

function write(store: Store): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(KEY, JSON.stringify(store));
  } catch {
    // Storage full or blocked (private window) — practising still works.
  }
}

export const loadItemStats = (): Record<string, ItemStats> => read().items;

/** Fold a finished session's results into the lifetime totals. */
export function recordSession(results: Record<string, { right: number; wrong: number }>): void {
  const store = read();
  const now = Date.now();
  for (const [itemId, result] of Object.entries(results)) {
    const prior = store.items[itemId] ?? { right: 0, wrong: 0, lastSeen: 0 };
    // Spread the prior entry: practice must leave box and due untouched rather
    // than dropping them, which would silently reset the item to unscheduled.
    store.items[itemId] = {
      ...prior,
      right: prior.right + result.right,
      wrong: prior.wrong + result.wrong,
      lastSeen: now,
    };
  }
  write(store);
}

/**
 * Fold a review's results in *and* reschedule. An item counts as known only if
 * it was answered without a slip, so one miss keeps it in the daily box.
 *
 * Ordinary practice deliberately does not land here: drilling something ten
 * times in a row should not push its next review out a month.
 */
export function recordReview(
  results: Record<string, { right: number; wrong: number }>,
  now = Date.now(),
): void {
  const store = read();
  let introduced = 0;

  for (const [itemId, result] of Object.entries(results)) {
    const prior = store.items[itemId];
    if (!prior?.box) introduced += 1;

    const { box, due } = nextSchedule(prior, result.wrong === 0, now);
    store.items[itemId] = {
      ...prior,
      right: (prior?.right ?? 0) + result.right,
      wrong: (prior?.wrong ?? 0) + result.wrong,
      lastSeen: now,
      box,
      due,
    };
  }

  // Trimmed to the window on the way in, so the log cannot grow without bound.
  const log = readLog(store.prefs.newIntroduced, now);
  const date = today(now);
  log[date] = (log[date] ?? 0) + introduced;
  store.prefs.newIntroduced = log;

  write(store);
}

/**
 * How many unseen items this review may still introduce.
 *
 * The budget is the week's, not the day's, so a learner who studies three days
 * a week gets three full sessions rather than four expired allowances. Miss a
 * few days and the unspent remainder is still there when you come back — which
 * is the point, though it does mean the session after a week away is a long
 * one.
 */
export function newAllowanceToday(now = Date.now()): number {
  const store = read();
  const spent = spentThisWeek(readLog(store.prefs.newIntroduced, now), now);
  return Math.max(0, weeklyAllowance(asPace(store.prefs.pace)) - spent);
}

/** The pace the learner has asked for, defaulted and clamped. */
export const loadPace = (): Pace => asPace(read().prefs.pace);

export function savePace(pace: Pace): void {
  savePref('pace', asPace(pace));
}

/**
 * How long a card actually takes this learner.
 *
 * The plan screen talks in minutes a day, which needs a seconds-per-card
 * figure, and guessing one would make every number downstream of it a guess
 * too. So it is measured: each finished session folds its own rate into a
 * running mean.
 */
interface Tempo {
  cards: number;
  ms: number;
}

/** Before there is enough of the learner's own data to trust. */
export const DEFAULT_SECONDS_PER_CARD = 8;

/** Cards needed before the measured rate is used instead of the default. */
const TEMPO_SAMPLE = 40;

/** Sessions where the learner clearly walked away are not evidence of a pace. */
const TEMPO_BOUNDS = { min: 1, max: 60 };

/** Keep the mean recent: past this, old sessions are halved out of it. */
const TEMPO_MEMORY = 600;

export function recordTempo(cards: number, ms: number): void {
  if (cards <= 0 || !Number.isFinite(ms) || ms <= 0) return;
  const seconds = ms / 1000 / cards;
  if (seconds < TEMPO_BOUNDS.min || seconds > TEMPO_BOUNDS.max) return;

  const store = read();
  const prior = (store.prefs.tempo ?? {}) as Partial<Tempo>;
  let total = (Number.isFinite(prior.cards) ? (prior.cards as number) : 0) + cards;
  let elapsed = (Number.isFinite(prior.ms) ? (prior.ms as number) : 0) + seconds * 1000 * cards;
  if (total > TEMPO_MEMORY) {
    total /= 2;
    elapsed /= 2;
  }
  store.prefs.tempo = { cards: total, ms: elapsed };
  write(store);
}

export interface CardTempo {
  seconds: number;
  /** false while the default is standing in for the learner's own rate */
  measured: boolean;
}

export function secondsPerCard(): CardTempo {
  const tempo = (read().prefs.tempo ?? {}) as Partial<Tempo>;
  const cards = Number.isFinite(tempo.cards) ? (tempo.cards as number) : 0;
  const ms = Number.isFinite(tempo.ms) ? (tempo.ms as number) : 0;
  if (cards < TEMPO_SAMPLE || ms <= 0) {
    return { seconds: DEFAULT_SECONDS_PER_CARD, measured: false };
  }
  return { seconds: ms / 1000 / cards, measured: true };
}

export function loadPref<T>(key: string, fallback: T): T {
  const value = read().prefs[key];
  return value === undefined ? fallback : (value as T);
}

export function savePref(key: string, value: unknown): void {
  const store = read();
  store.prefs[key] = value;
  write(store);
}

/**
 * Everything worth keeping, as JSON. localStorage is one cleared cache away
 * from gone, and the schedule represents weeks of work that cannot be
 * reconstructed, so it is worth being able to take a copy.
 */
export function exportProgress(): string {
  const store = read();
  return JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), ...store }, null, 2);
}

export interface ImportResult {
  ok: boolean;
  items: number;
  message: string;
}

/** Replaces saved progress with the contents of a previous export. */
export function importProgress(json: string, s: Strings = en): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    return { ok: false, items: 0, message: s.storage.notJson };
  }

  const candidate = parsed as Partial<Store>;
  if (!candidate || typeof candidate !== 'object' || typeof candidate.items !== 'object') {
    return { ok: false, items: 0, message: s.storage.notAnExport };
  }

  // Keep only entries shaped like real stats, so a malformed file cannot
  // poison the scheduler with NaN due dates.
  const items: Record<string, ItemStats> = {};
  for (const [id, value] of Object.entries(candidate.items ?? {})) {
    const v = value as Partial<ItemStats>;
    if (typeof v?.right !== 'number' || typeof v?.wrong !== 'number') continue;
    items[id] = {
      right: v.right,
      wrong: v.wrong,
      lastSeen: typeof v.lastSeen === 'number' ? v.lastSeen : 0,
      ...(typeof v.box === 'number' ? { box: v.box } : {}),
      ...(typeof v.due === 'number' ? { due: v.due } : {}),
    };
  }

  // The imported prefs replace the local ones, but the chosen language is a
  // property of this device rather than of the progress being restored:
  // importing a friend's export should not switch the interface out from under
  // you.
  const prefs = (candidate.prefs as Record<string, unknown>) ?? {};
  const lang = read().prefs.lang;
  write({ items, prefs: lang === undefined ? prefs : { ...prefs, lang } });

  return {
    ok: true,
    items: Object.keys(items).length,
    message: s.storage.restored(Object.keys(items).length),
  };
}

export function resetProgress(): void {
  const store = read();
  const { newIntroduced: _discarded, ...prefs } = store.prefs;
  write({ items: {}, prefs });
}

/** Accuracy over the lifetime of an item, or null if never practised. */
export function itemAccuracy(stats: ItemStats | undefined): number | null {
  if (!stats) return null;
  const total = stats.right + stats.wrong;
  if (!total) return null;
  return Math.round((stats.right / total) * 100);
}
