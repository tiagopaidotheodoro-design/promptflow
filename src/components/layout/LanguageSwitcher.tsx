"use client";

import { useLanguage, type Locale } from "@/contexts/LanguageContext";

const LOCALES: { value: Locale; label: string }[] = [
  { value: "pt", label: "PT" },
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
];

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-0.5 text-xs font-semibold text-text-muted">
      {LOCALES.map(({ value, label }, i) => (
        <span key={value} className="flex items-center">
          {i > 0 && <span className="mx-1 text-border select-none">|</span>}
          <button
            onClick={() => setLocale(value)}
            className={
              locale === value
                ? "text-brand-purple"
                : "hover:text-text-secondary transition-colors"
            }
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
