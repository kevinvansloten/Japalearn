/** Lightweight localStorage persistence: lifetime item stats + last-used setup. */
import { NEW_PER_DAY, nextSchedule } from './schedule';

const KEY = 'japanlearner.v1';

/** Local calendar day, used to cap how many new items a day introduces. */
const today = (now: number): string => new Date(now).toLocaleDateString('en-CA');

interface NewCounter {
  date: string;
  count: number;
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
    return { items: parsed.items ?? {}, prefs: parsed.prefs ?? {} };
  } catch {
    return emptyStore();
  }
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

  const counter = store.prefs.newIntroduced as NewCounter | undefined;
  const date = today(now);
  store.prefs.newIntroduced = {
    date,
    count: (counter?.date === date ? counter.count : 0) + introduced,
  };

  write(store);
}

/** How many unseen items today's review may still introduce. */
export function newAllowanceToday(now = Date.now()): number {
  const counter = read().prefs.newIntroduced as NewCounter | undefined;
  const used = counter?.date === today(now) ? counter.count : 0;
  return Math.max(0, NEW_PER_DAY - used);
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
