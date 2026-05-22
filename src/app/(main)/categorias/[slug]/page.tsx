import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import type { Prompt } from "@/types";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  if (!cat) return { title: "Categoria não encontrada" };
  return { title: cat.name, description: cat.description ?? undefined };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const prompts = await prisma.prompt.findMany({
    where: { status: "APPROVED", categoryId: category.id },
    include: { category: true, creator: { select: { id: true, name: true, image: true } } },
    orderBy: { copiesCount: "desc" },
  });

  return (
    <div className="container py-10">
      <div className="mb-8">
        <div className="mb-2 text-3xl">{category.icon}</div>
        <h1 className="text-3xl font-extrabold text-text-primary">{category.name}</h1>
        {category.description && (
          <p className="mt-1 text-text-secondary">{category.description}</p>
        )}
        <p className="mt-2 text-sm text-text-muted">{prompts.length} prompts nesta categoria</p>
      </div>
      <PromptGrid prompts={prompts as unknown as Prompt[]} columns={4} />
    </div>
  );
}
