"use client";

import { Users, Gift, Globe, Wrench } from "lucide-react";

const icons = [Users, Gift, Globe, Wrench];

const reasons = [
  {
    title: "Comunidade em crescimento",
    description: "Seja um dos primeiros criadores e construa reputação enquanto a biblioteca cresce.",
  },
  {
    title: "Totalmente gratuito",
    description: "Sem freemium agressivo. Acesse e publique prompts sem custo algum durante o beta.",
  },
  {
    title: "Criadores do mundo todo",
    description: "Uma biblioteca aberta de prompts para criadores do mundo todo, em múltiplos idiomas.",
  },
  {
    title: "Todas as ferramentas",
    description: "Midjourney, DALL·E, Sora, ChatGPT, Gemini, Stable Diffusion e muito mais.",
  },
];

export function WhyJoinSection() {
  return (
    <section className="container py-14">
      <div className="text-center mb-10">
        <h2 className="section-title">Por que participar agora?</h2>
        <p className="mt-2 text-text-secondary max-w-xl mx-auto">
          Uma comunidade global de prompts para criadores com IA — aberta, gratuita e em construção.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((reason, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface p-6 hover:border-brand-purple/30 hover:bg-surface-2 transition-all"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-purple/10 border border-brand-purple/20">
                <Icon className="h-5 w-5 text-brand-purple" />
              </div>
              <h3 className="mb-2 font-semibold text-text-primary">{reason.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{reason.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
