"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  applySiteLanguage,
  LANGUAGE_CHANGE_EVENT,
  readStoredLanguage,
  translate,
  type SiteLanguage,
} from "./dictionaries";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SiteLanguage>("vi");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readStoredLanguage();
    setLanguageState(initial);
    applySiteLanguage(initial);
    setReady(true);

    const onExternalChange = (event: Event) => {
      const next = (event as CustomEvent<SiteLanguage>).detail;
      if (next) setLanguageState(next);
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, onExternalChange);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, onExternalChange);
  }, []);

  const setLanguage = useCallback((next: SiteLanguage) => {
    setLanguageState(next);
    applySiteLanguage(next);
  }, []);

  const t = useCallback((key: string) => translate(language, key), [language]);

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  );

  // Avoid flashing wrong language labels after hydration.
  if (!ready) {
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
