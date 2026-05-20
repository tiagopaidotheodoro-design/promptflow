import { prisma } from "@/lib/prisma";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import type { Prompt } from "@/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Packs de Prompts",
  description: "Pacotes completos de prompts para criadores. E-commerce, vídeos virais, anime e muito mais.",
};

export default async function PacksPage() {
  const packs = await prisma.prompt.findMany({
    where: { status: "APPROVED", type: "PACK" },
    include: { category: true, creator: { select: { id: true, name: true, image: true } } },
    orderBy: { salesCount: "desc" },
  });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-3 py-1 text-xs font-semibold text-brand-purple">
          📦 Packs premium
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary">Packs de Prompts</h1>
        <p className="mt-1 text-text-secondary">
          Pacotes completos com múltiplos prompts temáticos. Economize comprando em conjunto.
        </p>
      </div>
      <PromptGrid prompts={packs as unknown as Prompt[]} columns={4} />
    </div>
  );
}
