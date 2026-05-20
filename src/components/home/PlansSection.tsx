"use client";

import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useT } from "@/contexts/LanguageContext";

const planHighlight = [false, true, false];
const planColors = ["text-brand-green-neon", "text-brand-purple", "text-text-muted"];

export function PlansSection() {
  const t = useT();
  const plans = t("plans.plans") as {
    name: string;
    price: string;
    badge?: string;
    description: string;
    features: string[];
  }[];

  return (
    <section className="container py-16">
      <div className="text-center mb-10">
        <h2 className="section-title">{t("plans.title")}</h2>
        <p className="mt-2 text-text-secondary max-w-xl mx-auto">
          {t("plans.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-4xl mx-auto">
        {plans.map((plan, i) => {
          const isHighlight = planHighlight[i];
          const isComingSoon = plan.badge === "Em breve" || plan.badge === "Coming soon" || plan.badge === "Próximamente";

          return (
            <div
              key={i}
              className={cn(
                "rounded-2xl border p-6 transition-all flex flex-col",
                isHighlight
                  ? "border-brand-purple/50 bg-gradient-card relative overflow-hidden shadow-lg shadow-brand-purple/10"
                  : "border-border bg-surface hover:border-border/80",
                isComingSoon && "opacity-75"
              )}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <span className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-bold text-white",
                    isHighlight ? "bg-gradient-purple" : "bg-surface-2 border border-border text-text-muted"
                  )}>
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-4">
                <p className={cn("text-sm font-semibold mb-1", planColors[i])}>{plan.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className={cn(
                    "text-2xl font-extrabold",
                    isComingSoon ? "text-text-muted" : "text-text-primary"
                  )}>
                    {plan.price}
                  </span>
                </div>
                <p className="mt-1 text-xs text-text-muted leading-relaxed">{plan.description}</p>
              </div>

              <ul className="flex-1 space-y-2.5 mb-6">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2.5 text-sm">
                    {isComingSoon
                      ? <Clock className="h-4 w-4 mt-0.5 shrink-0 text-text-muted" />
                      : <Check className="h-4 w-4 mt-0.5 shrink-0 text-brand-green-neon" />
                    }
                    <span className="text-text-secondary">{f}</span>
                  </li>
                ))}
              </ul>

              {isComingSoon ? (
                <Button variant="secondary" className="w-full cursor-not-allowed opacity-60" disabled>
                  {t("plans.comingSoon")}
                </Button>
              ) : (
                <Link href="/cadastro">
                  <Button
                    variant={isHighlight ? "default" : "secondary"}
                    className="w-full"
                  >
                    {t("plans.cta")}
                  </Button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
