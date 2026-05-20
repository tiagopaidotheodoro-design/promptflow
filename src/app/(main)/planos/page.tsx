import Link from "next/link";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/types";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planos e Preços",
  description: "Escolha o plano ideal para acessar prompts premium de IA.",
};

const planKeys = ["FREE", "PRO", "CREATOR"] as const;

export default function PlanosPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-semibold text-brand-purple">
          <Zap className="h-3.5 w-3.5" /> Sem fidelidade — cancele quando quiser
        </div>
        <h1 className="text-4xl font-extrabold text-text-primary mb-3">
          Planos simples e transparentes
        </h1>
        <p className="text-text-secondary max-w-lg mx-auto">
          Comece grátis. Faça upgrade apenas quando precisar de mais poder.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {planKeys.map((key) => {
          const plan = PLANS[key];
          const isPro = key === "PRO";
          return (
            <div
              key={key}
              className={cn(
                "rounded-2xl border p-8 flex flex-col relative",
                isPro
                  ? "border-brand-purple/50 bg-gradient-card shadow-xl shadow-brand-purple/15"
                  : "border-border bg-surface"
              )}
            >
              {isPro && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-gradient-purple px-4 py-1 text-xs font-bold text-white shadow-lg">
                    ⭐ Mais popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={cn("text-sm font-bold uppercase tracking-wider mb-2", plan.color)}>
                  {plan.name}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-text-primary">
                    {plan.price === 0 ? "Grátis" : `R$ ${plan.price.toFixed(2).replace(".", ",")}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-sm text-text-muted">/mês</span>
                  )}
                </div>
                {plan.price > 0 && (
                  <p className="text-xs text-text-muted mt-1">
                    Cobrado mensalmente · Cancele quando quiser
                  </p>
                )}
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/15">
                      <Check className="h-3 w-3 text-brand-green-neon" />
                    </div>
                    <span className="text-sm text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.price === 0 ? "/cadastro" : "#"}>
                <Button
                  variant={isPro ? "gradient" : "secondary"}
                  size="lg"
                  className="w-full"
                >
                  {plan.price === 0 ? "Começar grátis" : "Assinar agora"}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* FAQ mini */}
      <div className="mt-16 max-w-2xl mx-auto text-center">
        <p className="text-text-muted text-sm">
          Precisa de um plano personalizado para empresas ou agências?{" "}
          <a href="mailto:contato@prompthub.com.br" className="text-brand-purple hover:underline">
            Entre em contato
          </a>
        </p>
      </div>
    </div>
  );
}
