/**
 * The chosen language, and the strings that go with it.
 *
 * The choice is a preference like any other, so it rides along in the same
 * localStorage record as the deck settings and survives a reload. Nothing is
 * fetched: both languages are in the bundle, so switching is instant and works
 * offline, which is the whole point of an app you drill on a train.
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { loadPref, savePref } from '../lib/storage';
import { en, type Strings } from './en';
import { nl } from './nl';
import { asLang, detectLang, type Lang } from './lang';

export { LANGS, detectLang, type Lang } from './lang';
export { en, type Strings } from './en';
export { nl } from './nl';

export const BUNDLES: Record<Lang, Strings> = { en, nl };

interface Language {
  lang: Lang;
  /** the strings for `lang`; named short because every component uses it */
  s: Strings;
  setLang: (lang: Lang) => void;
}

/**
 * English until a provider says otherwise, so anything rendered outside one —
 * a test, a stray component — still reads sensibly rather than crashing.
 */
const LanguageContext = createContext<Language>({ lang: 'en', s: en, setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() =>
    asLang(loadPref<unknown>('lang', undefined), detectLang()),
  );

  useEffect(() => {
    savePref('lang', lang);
    // Screen readers and the browser's own translation prompt both read this.
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, s: BUNDLES[lang], setLang }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = (): Language => useContext(LanguageContext);

/** The common case: a component that only needs to read text. */
export const useStrings = (): Strings => useContext(LanguageContext).s;
