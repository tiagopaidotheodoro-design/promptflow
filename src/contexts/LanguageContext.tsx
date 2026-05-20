"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import pt from "../../messages/pt.json";
import en from "../../messages/en.json";
import es from "../../messages/es.json";

export type Locale = "pt" | "en" | "es";

const messages = { pt, en, es } as const;

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getNestedValue(obj: any, key: string): any {
  return key.split(".").reduce((acc, part) => acc?.[part], obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("promptflow-locale") as Locale | null;
    if (saved && ["pt", "en", "es"].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("promptflow-locale", newLocale);
  }, []);

  const t = useCallback(
    (key: string) => getNestedValue(messages[locale], key) ?? getNestedValue(messages["pt"], key) ?? key,
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

export function useT() {
  return useLanguage().t;
}
