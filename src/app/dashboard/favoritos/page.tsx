import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import type { Prompt } from "@/types";

export default async function FavoritosPage() {
  const session = await auth();
  const user = session?.user as any;

  const favorites = await prisma.favorite.findMany({
    where: { userId: user.id },
    include: {
      prompt: {
        include: {
          category: true,
          creator: { select: { id: true, name: true, image: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const prompts = favorites.map((f) => f.prompt);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Meus Favoritos</h1>
        <p className="text-sm text-text-secondary mt-0.5">{prompts.length} prompts salvos</p>
      </div>
      <PromptGrid prompts={prompts as unknown as Prompt[]} columns={3} />
    </div>
  );
}
