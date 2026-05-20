"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/contexts/LanguageContext";

const tools = ["Midjourney", "DALL·E", "Sora", "ChatGPT", "Gemini", "Runway"];

export function Hero() {
  const t = useT();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const objectives = t("hero.objectives") as string[];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/explorar${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`);
  };

  const handleChip = (value: string) => {
    router.push(`/explorar?q=${encodeURIComponent(value)}`);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-brand-purple/10 blur-[120px]" />
        <div className="absolute left-1/4 top-20 w-[300px] h-[300px] rounded-full bg-brand-blue/8 blur-[100px]" />
        <div className="absolute right-1/4 top-10 w-[250px] h-[250px] rounded-full bg-brand-green/6 blur-[100px]" />
      </div>

      <div className="container pt-12 pb-8 md:pt-20 md:pb-10 text-center">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
          <span className="text-xs font-semibold text-brand-purple">{t("hero.badge")}</span>
        </div>

        {/* Title */}
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl text-balance">
          {t("hero.title").replace(t("hero.titleHighlight"), "")}{" "}
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            {t("hero.titleHighlight")}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-base text-text-secondary md:text-lg text-balance">
          {t("hero.subtitle")}
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="mx-auto mt-7 max-w-2xl">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-text-muted pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("hero.searchPlaceholder")}
              className="w-full rounded-2xl border border-border bg-surface pl-12 pr-28 py-4 text-sm text-text-primary placeholder:text-text-muted shadow-lg shadow-black/5 transition-all focus:border-brand-purple/60 focus:outline-none focus:ring-2 focus:ring-brand-purple/20"
            />
            <button
              type="submit"
              className="absolute right-2 rounded-xl bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-purple/90 transition-colors"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Chips */}
        <div className="mx-auto mt-4 max-w-2xl space-y-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-text-muted">{t("hero.toolsLabel")}:</span>
            {tools.map((tool) => (
              <button
                key={tool}
                onClick={() => handleChip(tool)}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-secondary hover:border-brand-purple/40 hover:text-text-primary hover:bg-surface-2 transition-all"
              >
                {tool}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium text-text-muted">{t("hero.objectivesLabel")}:</span>
            {objectives.map((obj) => (
              <button
                key={obj}
                onClick={() => handleChip(obj)}
                className="rounded-full border border-brand-purple/20 bg-brand-purple/8 px-3 py-1 text-xs font-medium text-brand-purple hover:bg-brand-purple/15 hover:border-brand-purple/40 transition-all"
              >
                {obj}
              </button>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link href="/explorar">
            <Button size="lg" variant="gradient">
              {t("hero.ctaExplore")}
            </Button>
          </Link>
          <Link href="/vender">
            <Button size="lg" variant="secondary">
              {t("hero.ctaCreator")}
            </Button>
          </Link>
        </div>

        {/* Beta note */}
        <p className="mt-3 text-xs text-text-muted">
          {t("hero.betaNote")}
        </p>
      </div>
    </section>
  );
}
