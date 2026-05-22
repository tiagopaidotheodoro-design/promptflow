import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NewPromptForm } from "@/components/prompts/NewPromptForm";

export default async function EditarPromptPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const user = session?.user as any;

  const { id } = await params;
  const prompt = await prisma.prompt.findUnique({ where: { id } });
  if (!prompt) notFound();
  if (prompt.creatorId !== user.id && user.role !== "ADMIN") redirect("/creator/prompts");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Editar Prompt</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Após salvar, o prompt voltará para revisão.
        </p>
      </div>
      <NewPromptForm initialData={{ ...prompt, tags: prompt.tags }} />
    </div>
  );
}
