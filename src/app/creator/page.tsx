import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Heart, Copy, DollarSign } from "lucide-react";
import { formatNumber } from "@/lib/utils";

export default async function CreatorDashboardPage() {
  const session = await auth();
  const user = session?.user as any;

  const prompts = await prisma.prompt.findMany({
    where: { creatorId: user.id },
    select: {
      id: true, title: true, slug: true, status: true,
      copiesCount: true, favoritesCount: true, salesCount: true, price: true,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const totals = prompts.reduce(
    (acc, p) => ({
      copies: acc.copies + p.copiesCount,
      favorites: acc.favorites + p.favoritesCount,
      sales: acc.sales + p.salesCount,
      revenue: acc.revenue + p.salesCount * p.price * 0.7,
    }),
    { copies: 0, favorites: 0, sales: 0, revenue: 0 }
  );

  const totalPrompts = await prisma.prompt.count({ where: { creatorId: user.id } });

  const stats = [
    { label: "Prompts", value: totalPrompts, icon: FileText, color: "text-brand-purple" },
    { label: "Cópias", value: formatNumber(totals.copies), icon: Copy, color: "text-brand-blue-neon" },
    { label: "Favoritos", value: formatNumber(totals.favorites), icon: Heart, color: "text-red-400" },
    { label: "Ganhos sim.", value: `R$ ${totals.revenue.toFixed(2).replace(".", ",")}`, icon: DollarSign, color: "text-brand-green-neon" },
  ];

  const statusLabel: Record<string, string> = {
    APPROVED: "✅ Aprovado",
    PENDING: "⏳ Pendente",
    REJECTED: "❌ Recusado",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-text-primary">Painel do Criador</h1>
        <Link href="/creator/prompts/novo">
          <Button size="sm" variant="gradient">
            <PlusCircle className="h-4 w-4" /> Novo prompt
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-4 text-center">
            <s.icon className={`mx-auto h-5 w-5 mb-2 ${s.color}`} />
            <div className="text-xl font-bold text-text-primary">{s.value}</div>
            <div className="text-xs text-text-muted">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent prompts */}
      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-semibold text-text-primary">Últimos prompts</h2>
          <Link href="/creator/prompts" className="text-sm text-brand-purple hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="divide-y divide-border">
          {prompts.length === 0 && (
            <div className="py-10 text-center text-text-muted text-sm">
              Você ainda não cadastrou nenhum prompt.
            </div>
          )}
          {prompts.map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{p.title}</p>
                <p className="text-xs text-text-muted">{statusLabel[p.status] ?? p.status}</p>
              </div>
              <div className="flex items-center gap-4 text-xs text-text-muted shrink-0">
                <span className="flex items-center gap-1"><Copy className="h-3 w-3" />{p.copiesCount}</span>
                <span className="flex items-center gap-1"><Heart className="h-3 w-3" />{p.favoritesCount}</span>
              </div>
              <Link href={`/creator/prompts/${p.id}/editar`} className="text-xs text-brand-purple hover:underline shrink-0">
                Editar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
