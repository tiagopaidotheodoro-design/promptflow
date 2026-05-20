"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/contexts/LanguageContext";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const t = useT();
  const items = t("faq.items") as { question: string; answer: string }[];

  return (
    <section className="container py-16 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="section-title">{t("faq.title")}</h2>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-surface overflow-hidden"
          >
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-text-primary hover:bg-surface-2 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{item.question}</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-text-muted transition-transform duration-200",
                  open === i && "rotate-180"
                )}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-text-secondary leading-relaxed border-t border-border">
                <p className="pt-3">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
