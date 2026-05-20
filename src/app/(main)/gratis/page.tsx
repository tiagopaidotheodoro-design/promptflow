import { prisma } from "@/lib/prisma";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import type { Prompt } from "@/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Prompts Grátis",
  description: "Centenas de prompts gratuitos para criar imagens, vídeos e textos com IA.",
};

export default async function GratisPage() {
  const prompts = await prisma.prompt.findMany({
    where: { status: "APPROVED", isFree: true },
    include: { category: true, creator: { select: { id: true, name: true, image: true } } },
    orderBy: { copiesCount: "desc" },
  });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/10 px-3 py-1 text-xs font-semibold text-brand-green-neon">
          🎁 100% grátis
        </div>
        <h1 className="text-3xl font-extrabold text-text-primary">Prompts Gratuitos</h1>
        <p className="mt-1 text-text-secondary">
          {prompts.length} prompts prontos para usar — sem pagar nada
        </p>
      </div>
      <PromptGrid prompts={prompts as unknown as Prompt[]} columns={4} />
    </div>
  );
}
