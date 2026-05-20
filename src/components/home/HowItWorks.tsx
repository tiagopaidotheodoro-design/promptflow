"use client";

import { useT } from "@/contexts/LanguageContext";

const emojis = ["🔍", "📋", "✨"];

export function HowItWorks() {
  const t = useT();
  const steps = t("howItWorks.steps") as { title: string; description: string }[];

  return (
    <section className="container py-14">
      <div className="text-center mb-10">
        <h2 className="section-title">{t("howItWorks.title")}</h2>
        <p className="mt-2 text-text-secondary max-w-md mx-auto">
          {t("howItWorks.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
        {steps.map((step, i) => (
          <div
            key={i}
            className="relative rounded-2xl border border-border bg-surface p-6 text-center hover:border-brand-purple/30 hover:bg-surface-2 transition-all"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-2 text-2xl border border-border">
              {emojis[i]}
            </div>
            <div className="absolute right-4 top-4 text-2xl font-black text-border select-none">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mb-2 font-semibold text-text-primary">{step.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
