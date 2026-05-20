import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { DollarSign, TrendingUp } from "lucide-react";

export default async function GanhosPage() {
  const session = await auth();
  const user = session?.user as any;

  const prompts = await prisma.prompt.findMany({
    where: { creatorId: user.id },
    select: { id: true, title: true, price: true, salesCount: true },
    orderBy: { salesCount: "desc" },
  });

  const totalRevenue = prompts.reduce((s, p) => s + p.salesCount * p.price * 0.7, 0);
  const totalSales = prompts.reduce((s, p) => s + p.salesCount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">Ganhos (simulado)</h1>

      <div className="rounded-xl border border-brand-purple/30 bg-brand-purple/10 p-4 text-sm text-brand-purple">
        ⚠️ Os valores abaixo são simulados. Integração com Mercado Pago será ativada em breve.
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-surface p-5 text-center">
          <DollarSign className="mx-auto h-6 w-6 mb-2 text-brand-green-neon" />
          <div className="text-2xl font-bold text-text-primary">
            R$ {totalRevenue.toFixed(2).replace(".", ",")}
          </div>
          <div className="text-xs text-text-muted mt-0.5">Ganhos totais estimados (70%)</div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-5 text-center">
          <TrendingUp className="mx-auto h-6 w-6 mb-2 text-brand-purple" />
          <div className="text-2xl font-bold text-text-primary">{totalSales}</div>
          <div className="text-xs text-text-muted mt-0.5">Vendas totais</div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden">
        <div className="px-5 py-3 border-b border-border">
          <h2 className="font-semibold text-text-primary text-sm">Prompts com mais vendas</h2>
        </div>
        <div className="divide-y divide-border">
          {prompts.filter((p) => p.salesCount > 0).map((p) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{p.title}</p>
                <p className="text-xs text-text-muted">{p.salesCount} vendas · R$ {p.price.toFixed(2).replace(".", ",")}/unid.</p>
              </div>
              <div className="text-sm font-bold text-brand-green-neon shrink-0">
                R$ {(p.salesCount * p.price * 0.7).toFixed(2).replace(".", ",")}
              </div>
            </div>
          ))}
          {prompts.filter((p) => p.salesCount > 0).length === 0 && (
            <p className="py-8 text-center text-sm text-text-muted">Nenhuma venda ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
