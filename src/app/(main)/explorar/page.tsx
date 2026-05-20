import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import { PromptFilters } from "@/components/prompts/PromptFilters";
import type { Prompt } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorar Prompts",
  description: "Explore centenas de prompts para IA em português. Imagens, vídeos, textos e packs.",
};

interface PageProps {
  searchParams: {
    type?: string;
    tool?: string;
    price?: string;
    sort?: string;
    q?: string;
    page?: string;
  };
}

async function getPrompts(params: PageProps["searchParams"]) {
  const { type, tool, price, sort = "copies", q, page = "1" } = params;
  const take = 24;
  const skip = (parseInt(page) - 1) * take;

  const where: any = { status: "APPROVED" };

  if (type) where.type = type;
  if (tool) where.recommendedTool = { contains: tool };
  if (price === "free") where.isFree = true;
  if (price === "premium") where.isPremium = true;
  if (price === "paid") { where.isFree = false; where.isPremium = false; where.price = { gt: 0 }; }
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
      { tags: { contains: q.toLowerCase() } },
    ];
  }

  const orderBy =
    sort === "favorites" ? { favoritesCount: "desc" as const }
    : sort === "newest"  ? { createdAt: "desc" as const }
    : sort === "sales"   ? { salesCount: "desc" as const }
    :                      { copiesCount: "desc" as const };

  const [prompts, total] = await Promise.all([
    prisma.prompt.findMany({
      where,
      include: {
        category: true,
        creator: { select: { id: true, name: true, image: true } },
      },
      orderBy,
      take,
      skip,
    }),
    prisma.prompt.count({ where }),
  ]);

  return { prompts, total, pages: Math.ceil(total / take) };
}

export default async function ExplorarPage({ searchParams }: PageProps) {
  const { prompts, total, pages } = await getPrompts(searchParams);
  const page = parseInt(searchParams.page ?? "1");

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-text-primary">Explorar Prompts</h1>
        <p className="mt-1 text-text-secondary">
          {total} prompts disponíveis — encontre o ideal para o seu projeto
        </p>
      </div>

      <Suspense fallback={null}>
        <PromptFilters />
      </Suspense>

      <div className="mt-8">
        <PromptGrid prompts={prompts as unknown as Prompt[]} columns={4} />
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                p === page
                  ? "border-brand-purple bg-brand-purple/15 text-brand-purple"
                  : "border-border bg-surface text-text-secondary hover:border-brand-purple/30"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
