"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, ArrowRight } from "lucide-react";
import { promptTypeEmoji, cn } from "@/lib/utils";
import type { Prompt } from "@/types";

interface PromptCardProps {
  prompt: Prompt;
  className?: string;
}

const typeLabel: Record<string, string> = {
  IMAGE: "Imagem",
  VIDEO: "Vídeo",
  TEXT: "Texto",
  PACK: "Pack",
};

const typeBadgeStyle: Record<string, string> = {
  IMAGE: "border-brand-blue/40 text-brand-blue-neon",
  VIDEO: "border-red-500/40 text-red-400",
  TEXT: "border-brand-green/40 text-brand-green-neon",
  PACK: "border-brand-purple/40 text-brand-purple",
};

export function PromptCard({ prompt, className }: PromptCardProps) {
  const isVideo = prompt.type === "VIDEO";
  const badgeStyle = typeBadgeStyle[prompt.type] ?? "border-border text-text-muted";

  return (
    <Link href={`/prompts/${prompt.slug}`} className={cn("group block", className)}>
      <div className="flex flex-col rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/10 hover:-translate-y-0.5">

        {/* Preview */}
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2 shrink-0">
          {prompt.previewImage ? (
            <Image
              src={prompt.previewImage}
              alt={prompt.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-5xl">
              {promptTypeEmoji(prompt.type)}
            </div>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Play className="h-5 w-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          )}

          {/* Type badge */}
          <div className="absolute left-3 top-3">
            <span className={cn(
              "inline-flex items-center rounded-lg border bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
              badgeStyle
            )}>
              {typeLabel[prompt.type] ?? prompt.type}
            </span>
          </div>

          {/* "Novo" badge — shown when there are no real usage stats */}
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center rounded-lg bg-brand-purple/80 backdrop-blur-sm px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wide">
              Novo
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col flex-1 p-4">
          {/* Tool */}
          <p className="mb-1.5 text-xs font-medium text-brand-purple/80 truncate">
            {prompt.recommendedTool}
          </p>

          {/* Title */}
          <h3 className="flex-1 font-semibold text-sm text-text-primary leading-snug line-clamp-2 mb-3 group-hover:text-brand-purple/90 transition-colors">
            {prompt.title}
          </h3>

          {/* "Ver prompt" on hover */}
          <div className="mt-auto flex justify-end">
            <span className="flex items-center gap-1 text-xs font-semibold text-brand-purple opacity-0 group-hover:opacity-100 transition-opacity">
              Ver prompt <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
