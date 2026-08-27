/** Lightweight localStorage persistence: lifetime item stats + last-used setup. */

const KEY = 'japanlearner.v1';

export interface ItemStats {
  right: number;
  wrong: number;
  /** epoch ms of the last time this item was answered */
  lastSeen: number;
}

interface Store {
  items: Record<string, ItemStats>;
  prefs: Record<string, unknown>;
}

const EMPTY: Store = { items: {}, prefs: {} };

function read(): Store {
  if (typeof localStorage === 'undefined') return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Store>;
    return { items: parsed.items ?? {}, prefs: parsed.prefs ?? {} };
  } catch {
    return EMPTY;
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
    store.items[itemId] = {
      right: prior.right + result.right,
      wrong: prior.wrong + result.wrong,
      lastSeen: now,
    };
  }
  write(store);
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
  write({ items: {}, prefs: store.prefs });
}

/** Accuracy over the lifetime of an item, or null if never practised. */
export function itemAccuracy(stats: ItemStats | undefined): number | null {
  if (!stats) return null;
  const total = stats.right + stats.wrong;
  if (!total) return null;
  return Math.round((stats.right / total) * 100);
}
