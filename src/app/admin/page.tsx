import { prisma } from "@/lib/prisma";
import { Users, FileText, ShoppingBag, Clock } from "lucide-react";

export default async function AdminPage() {
  const [totalUsers, totalPrompts, pendingPrompts, totalPurchases] = await Promise.all([
    prisma.user.count(),
    prisma.prompt.count(),
    prisma.prompt.count({ where: { status: "PENDING" } }),
    prisma.purchase.count(),
  ]);

  const stats = [
    { label: "Usuários", value: totalUsers, icon: Users, color: "text-brand-blue-neon" },
    { label: "Prompts", value: totalPrompts, icon: FileText, color: "text-brand-purple" },
    { label: "Pendentes", value: pendingPrompts, icon: Clock, color: "text-yellow-400" },
    { label: "Compras", value: totalPurchases, icon: ShoppingBag, color: "text-brand-green-neon" },
  ];

  const recent = await prisma.prompt.findMany({
    where: { status: "PENDING" },
    include: { creator: { select: { name: true } } },
    take: 8,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Painel Administrativo</h1>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-4 text-center">
            <s.icon className={`mx-auto h-5 w-5 mb-2 ${s.color}`} />
            <div className="text-2xl font-bold text-text-primary">{s.value}</div>
            <div className="text-xs text-text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pending prompts */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-text-primary">Prompts pendentes de aprovação</h2>
          <span className="text-xs bg-yellow-400/15 text-yellow-400 px-2.5 py-0.5 rounded-full font-semibold">
            {pendingPrompts} pendentes
          </span>
        </div>
        <div className="divide-y divide-border">
          {recent.length === 0 && (
            <p className="py-8 text-center text-sm text-text-muted">Nenhum prompt pendente.</p>
          )}
          {recent.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{p.title}</p>
                <p className="text-xs text-text-muted">por {(p as any).creator?.name}</p>
              </div>
              <AdminPromptActions promptId={p.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminPromptActions({ promptId }: { promptId: string }) {
  return (
    <div className="flex gap-2 shrink-0">
      <form action={`/api/admin/prompts/${promptId}/approve`} method="POST">
        <button type="submit" className="rounded-lg bg-brand-green/15 px-2.5 py-1 text-xs font-semibold text-brand-green-neon hover:bg-brand-green/25 transition-colors">
          Aprovar
        </button>
      </form>
      <form action={`/api/admin/prompts/${promptId}/reject`} method="POST">
        <button type="submit" className="rounded-lg bg-red-500/15 px-2.5 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/25 transition-colors">
          Recusar
        </button>
      </form>
    </div>
  );
}
