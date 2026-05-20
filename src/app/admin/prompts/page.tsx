import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

const statusColor: Record<string, string> = {
  APPROVED: "bg-brand-green/15 text-brand-green-neon",
  PENDING: "bg-yellow-400/15 text-yellow-400",
  REJECTED: "bg-red-500/15 text-red-400",
};

const statusLabel: Record<string, string> = {
  APPROVED: "Aprovado",
  PENDING: "Pendente",
  REJECTED: "Recusado",
};

export default async function AdminPromptsPage() {
  const prompts = await prisma.prompt.findMany({
    include: {
      creator: { select: { name: true } },
      category: { select: { name: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Gerenciar Prompts</h1>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Título</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Tipo</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Criador</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Preço</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Status</th>
                <th className="px-4 py-3 text-xs font-semibold text-text-muted">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {prompts.map((p) => (
                <tr key={p.id} className="hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="font-medium text-text-primary truncate">{p.title}</p>
                    <p className="text-xs text-text-muted">{(p as any).category?.name}</p>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">{p.type}</td>
                  <td className="px-4 py-3 text-text-secondary truncate max-w-[120px]">{(p as any).creator?.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{p.isFree ? "Grátis" : formatPrice(p.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusColor[p.status]}`}>
                      {statusLabel[p.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/prompts/${p.slug}`} className="text-xs text-brand-purple hover:underline">
                        Ver
                      </Link>
                      {p.status === "PENDING" && (
                        <>
                          <AdminAction promptId={p.id} action="approve" label="Aprovar" className="text-brand-green-neon" />
                          <AdminAction promptId={p.id} action="reject" label="Recusar" className="text-red-400" />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminAction({ promptId, action, label, className }: any) {
  return (
    <form action={`/api/admin/prompts/${promptId}/${action}`} method="POST" className="inline">
      <button type="submit" className={`text-xs hover:underline ${className}`}>{label}</button>
    </form>
  );
}
