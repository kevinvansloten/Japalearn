/** The languages the interface speaks. English is the source of truth. */
export type Lang = 'en' | 'nl';

export const LANGS: Lang[] = ['en', 'nl'];

const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

/**
 * The language to open in when nothing has been chosen yet. A Dutch browser
 * gets Dutch; everything else falls back to English rather than guessing.
 */
export function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'en';
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag?.toLowerCase().split('-')[0];
    if (base === 'nl') return 'nl';
    if (base === 'en') return 'en';
  }
  return 'en';
}

/** Narrow whatever came back out of storage, which may be anything at all. */
export const asLang = (value: unknown, fallback: Lang): Lang => (isLang(value) ? value : fallback);
