import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Heart, Copy, ShoppingBag, Star } from "lucide-react";
import { planLabel } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user as any;

  const [favCount, copiesCount, purchasesCount] = await Promise.all([
    prisma.favorite.count({ where: { userId: user.id } }),
    prisma.promptCopy.count({ where: { userId: user.id } }),
    prisma.purchase.count({ where: { userId: user.id } }),
  ]);

  const stats = [
    { label: "Favoritos", value: favCount, icon: Heart, color: "text-red-400" },
    { label: "Prompts copiados", value: copiesCount, icon: Copy, color: "text-brand-blue-neon" },
    { label: "Compras", value: purchasesCount, icon: ShoppingBag, color: "text-brand-purple" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Olá, {user?.name?.split(" ")[0] ?? "usuário"} 👋
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            Plano atual: <span className="font-semibold text-brand-purple">{planLabel(user?.plan)}</span>
          </p>
        </div>
        {user?.plan === "FREE" && (
          <Link href="/planos">
            <Button size="sm" variant="gradient">Fazer upgrade →</Button>
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-4 text-center">
            <s.icon className={`mx-auto h-5 w-5 mb-2 ${s.color}`} />
            <div className="text-2xl font-bold text-text-primary">{s.value}</div>
            <div className="text-xs text-text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Plan card */}
      <div className="rounded-2xl border border-brand-purple/30 bg-gradient-card p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-text-primary">Plano {planLabel(user?.plan)}</p>
            <p className="text-sm text-text-secondary mt-0.5">
              {user?.plan === "FREE"
                ? "Faça upgrade para acessar prompts premium ilimitados."
                : "Você tem acesso a todos os prompts premium da plataforma."}
            </p>
          </div>
          {user?.plan === "FREE" && (
            <Link href="/planos" className="shrink-0">
              <Button size="sm">Ver planos</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/dashboard/favoritos" className="rounded-xl border border-border bg-surface p-4 hover:border-brand-purple/30 transition-colors">
          <Heart className="h-5 w-5 text-red-400 mb-2" />
          <p className="font-medium text-text-primary text-sm">Meus favoritos</p>
          <p className="text-xs text-text-muted">{favCount} prompts</p>
        </Link>
        <Link href="/explorar" className="rounded-xl border border-border bg-surface p-4 hover:border-brand-purple/30 transition-colors">
          <Star className="h-5 w-5 text-brand-purple mb-2" />
          <p className="font-medium text-text-primary text-sm">Explorar prompts</p>
          <p className="text-xs text-text-muted">Novos todos os dias</p>
        </Link>
      </div>
    </div>
  );
}
