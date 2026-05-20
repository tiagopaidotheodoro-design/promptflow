"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TOOLS, SORT_OPTIONS, PRICE_OPTIONS, QUICK_FILTERS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

const TYPE_OPTIONS = [
  { value: "", label: "Todos" },
  { value: "IMAGE", label: "🖼️ Imagem" },
  { value: "VIDEO", label: "🎬 Vídeo" },
  { value: "TEXT", label: "📝 Texto" },
  { value: "PACK", label: "📦 Pack" },
];

export function PromptFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = (key: string) => searchParams.get(key) ?? "";

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const clearAll = () => router.push(pathname);
  const hasFilters = ["type", "tool", "price", "sort", "q"].some((k) => get(k));

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
        <Input
          placeholder="Buscar prompts..."
          className="pl-10"
          defaultValue={get("q")}
          onChange={(e) => setParam("q", e.target.value)}
        />
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        {QUICK_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setParam("q", f.label.split(" ").slice(1).join(" "))}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-secondary hover:border-brand-purple/40 hover:text-text-primary transition-colors whitespace-nowrap"
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap gap-3">
        {/* Type */}
        <div className="flex gap-1.5 flex-wrap">
          {TYPE_OPTIONS.map((t) => (
            <button
              key={t.value}
              onClick={() => setParam("type", t.value)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                get("type") === t.value
                  ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
                  : "border-border bg-surface text-text-secondary hover:border-brand-purple/30 hover:text-text-primary"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <span className="hidden sm:block w-px bg-border" />

        {/* Price */}
        <div className="flex gap-1.5 flex-wrap">
          {PRICE_OPTIONS.map((p) => (
            <button
              key={p.value}
              onClick={() => setParam("price", p.value === "all" ? "" : p.value)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                (get("price") === p.value || (p.value === "all" && !get("price")))
                  ? "border-brand-green bg-brand-green/10 text-brand-green-neon"
                  : "border-border bg-surface text-text-secondary hover:border-brand-green/30 hover:text-text-primary"
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Tool select */}
          <select
            value={get("tool")}
            onChange={(e) => setParam("tool", e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary focus:border-brand-purple/50 focus:outline-none"
          >
            <option value="">Ferramenta</option>
            {TOOLS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={get("sort")}
            onChange={(e) => setParam("sort", e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary focus:border-brand-purple/50 focus:outline-none"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-xs text-text-muted hover:text-text-primary hover:border-border/80 transition-colors"
            >
              <X className="h-3 w-3" /> Limpar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
