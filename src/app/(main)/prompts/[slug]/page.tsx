import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatNumber, promptTypeEmoji } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import { CopyPromptButton } from "@/components/prompts/CopyPromptButton";
import { FavoriteButton } from "@/components/prompts/FavoriteButton";
import {
  Heart, Copy, Star, Share2, User, Tag, Wrench, Maximize2, Globe,
} from "lucide-react";
import type { Prompt } from "@/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = await prisma.prompt.findUnique({
    where: { slug },
    select: { title: true, description: true, previewImage: true },
  });
  if (!prompt) return { title: "Prompt não encontrado" };
  return {
    title: prompt.title,
    description: prompt.description,
    openGraph: {
      images: prompt.previewImage ? [prompt.previewImage] : [],
    },
  };
}

async function getPromptData(slug: string) {
  const prompt = await prisma.prompt.findUnique({
    where: { slug },
    include: {
      category: true,
      creator: {
        select: { id: true, name: true, image: true },
      },
      reviews: {
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!prompt) return null;

  const related = await prisma.prompt.findMany({
    where: {
      status: "APPROVED",
      categoryId: prompt.categoryId,
      id: { not: prompt.id },
    },
    include: { category: true, creator: { select: { id: true, name: true, image: true } } },
    take: 4,
    orderBy: { copiesCount: "desc" },
  });

  return { prompt, related };
}

const typeLabel: Record<string, string> = {
  IMAGE: "Imagem",
  VIDEO: "Vídeo",
  TEXT: "Texto",
  PACK: "Pack",
};

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getPromptData(slug);
  if (!data) notFound();

  const { prompt, related } = data;
  const p = prompt as any;

  const avgRating =
    p.reviews.length > 0
      ? (p.reviews.reduce((s: number, r: any) => s + r.rating, 0) / p.reviews.length).toFixed(1)
      : null;

  const tagList: string[] = p.tags
    ? typeof p.tags === "string"
      ? JSON.parse(p.tags)
      : p.tags
    : [];

  // Proporção real da imagem com base no aspectRatio do prompt
  const ratioMap: Record<string, string> = {
    "1:1": "1 / 1", "16:9": "16 / 9", "9:16": "9 / 16",
    "4:5": "4 / 5", "2:3": "2 / 3", "3:2": "3 / 2",
  };
  const previewAspect = ratioMap[p.aspectRatio] ?? "4 / 3";

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">

        {/* Left — Preview */}
        <div className="lg:col-span-3 space-y-6">
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-border bg-surface-2 mx-auto"
            style={{ aspectRatio: previewAspect, maxHeight: "80vh" }}
          >
            {p.previewImage ? (
              <Image
                src={p.previewImage}
                alt={p.title}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-7xl">
                {promptTypeEmoji(p.type)}
              </div>
            )}
          </div>

          {/* Reviews */}
          {p.reviews.length > 0 && (
            <div>
              <h3 className="mb-4 font-semibold text-text-primary">
                Avaliações{" "}
                {avgRating && <span className="text-brand-purple">★ {avgRating}</span>}
              </h3>
              <div className="space-y-3">
                {p.reviews.map((r: any) => (
                  <div key={r.id} className="rounded-xl border border-border bg-surface p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-7 w-7 rounded-full bg-gradient-purple flex items-center justify-center text-xs font-bold text-white">
                        {r.user?.name?.[0]?.toUpperCase() ?? "?"}
                      </div>
                      <span className="text-sm font-medium text-text-primary">{r.user?.name}</span>
                      <div className="ml-auto flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${i < r.rating ? "text-yellow-400 fill-yellow-400" : "text-border"}`}
                          />
                        ))}
                      </div>
                    </div>
                    {r.comment && <p className="text-sm text-text-secondary">{r.comment}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{typeLabel[p.type] ?? p.type}</Badge>
            {p.isFeatured && <Badge variant="default">🔥 Destaque</Badge>}
            {p.category && <Badge variant="secondary">{p.category.name}</Badge>}
          </div>

          {/* Title */}
          <h1 className="text-2xl font-extrabold text-text-primary leading-tight">{p.title}</h1>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed">{p.description}</p>

          {/* Meta grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-text-secondary">
              <Wrench className="h-4 w-4 text-text-muted" />
              <span className="font-medium text-text-primary">{p.recommendedTool}</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Maximize2 className="h-4 w-4 text-text-muted" />
              <span className="font-medium text-text-primary">{p.aspectRatio ?? "Livre"}</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Globe className="h-4 w-4 text-text-muted" />
              <span className="font-medium text-text-primary">PT{p.promptEn ? " + EN" : ""}</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <User className="h-4 w-4 text-text-muted" />
              <span className="font-medium text-text-primary truncate">{p.creator?.name}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-5 text-sm text-text-muted border-y border-border py-3">
            <span className="flex items-center gap-1.5">
              <Copy className="h-4 w-4" /> {formatNumber(p.copiesCount)} cópias
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4" /> {formatNumber(p.favoritesCount)} salvos
            </span>
            {avgRating && (
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {avgRating}
              </span>
            )}
          </div>

          {/* Prompt — sempre visível, sem bloqueio */}
          <div className="space-y-3">
            <h3 className="font-semibold text-text-primary">Prompt em Português</h3>
            <div className="rounded-xl border border-border bg-surface-2 p-4 font-mono text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
              {p.promptPt}
            </div>
            <CopyPromptButton text={p.promptPt} promptId={p.id} />

            {p.promptEn && (
              <>
                <h3 className="font-semibold text-text-primary pt-2">Prompt em Inglês</h3>
                <div className="rounded-xl border border-border bg-surface-2 p-4 font-mono text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                  {p.promptEn}
                </div>
                <CopyPromptButton text={p.promptEn} promptId={p.id} label="Copiar em inglês" />
              </>
            )}

            {p.negativePrompt && (
              <>
                <h3 className="font-semibold text-text-primary pt-2">Prompt negativo</h3>
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 font-mono text-sm text-text-secondary leading-relaxed">
                  {p.negativePrompt}
                </div>
              </>
            )}

            {p.instructions && (
              <>
                <h3 className="font-semibold text-text-primary pt-2">Instruções de uso</h3>
                <div className="rounded-xl border border-border bg-surface-2 p-4 text-sm text-text-secondary leading-relaxed">
                  {p.instructions}
                </div>
              </>
            )}
          </div>

          {/* Tags */}
          {tagList.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tagList.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/explorar?q=${tag}`}
                  className="flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-text-muted hover:text-text-primary hover:border-brand-purple/30 transition-colors"
                >
                  <Tag className="h-2.5 w-2.5" /> {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <FavoriteButton promptId={p.id} className="flex-1" />
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-muted hover:text-text-primary hover:border-border/80 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-bold text-text-primary mb-6">Prompts semelhantes</h2>
          <PromptGrid prompts={related as unknown as Prompt[]} columns={4} />
        </div>
      )}
    </div>
  );
}
