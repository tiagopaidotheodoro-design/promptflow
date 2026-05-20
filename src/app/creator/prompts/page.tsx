import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle, Edit2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { promptTypeLabel } from "@/lib/utils";

const statusConfig: Record<string, { label: string; class: string }> = {
  APPROVED: { label: "Aprovado", class: "bg-brand-green/15 text-brand-green-neon" },
  PENDING: { label: "Pendente", class: "bg-yellow-400/15 text-yellow-400" },
  REJECTED: { label: "Recusado", class: "bg-red-500/15 text-red-400" },
};

export default async function CreatorPromptsPage() {
  const session = await auth();
  const user = session?.user as any;

  const prompts = await prisma.prompt.findMany({
    where: { creatorId: user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true, title: true, slug: true, type: true, status: true,
      copiesCount: true, favoritesCount: true, createdAt: true,
    },
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Meus Prompts ({prompts.length})</h1>
        <Link href="/creator/prompts/novo">
          <Button size="sm" variant="gradient">
            <PlusCircle className="h-4 w-4" /> Novo
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        {prompts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-text-muted mb-4">Você ainda não publicou nenhum prompt.</p>
            <Link href="/creator/prompts/novo">
              <Button size="sm" variant="gradient">Publicar primeiro prompt</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-text-muted">Título</th>
                  <th className="px-4 py-3 text-xs font-semibold text-text-muted">Tipo</th>
                  <th className="px-4 py-3 text-xs font-semibold text-text-muted">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-text-muted">Cópias</th>
                  <th className="px-4 py-3 text-xs font-semibold text-text-muted">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {prompts.map((p) => {
                  const s = statusConfig[p.status] ?? statusConfig.PENDING;
                  return (
                    <tr key={p.id} className="hover:bg-surface-2 transition-colors">
                      <td className="px-4 py-3 max-w-[240px]">
                        <p className="font-medium text-text-primary truncate">{p.title}</p>
                      </td>
                      <td className="px-4 py-3 text-text-muted text-xs">{promptTypeLabel(p.type)}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.class}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{p.copiesCount}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 items-center">
                          <Link href={`/prompts/${p.slug}`} className="text-text-muted hover:text-text-primary">
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                          <Link href={`/creator/prompts/${p.id}/editar`} className="text-text-muted hover:text-brand-purple">
                            <Edit2 className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
