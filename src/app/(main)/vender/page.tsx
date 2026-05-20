import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DollarSign, BarChart3, Shield, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vender Prompts",
  description: "Monetize seus prompts de IA compartilhando na maior comunidade global.",
};

const benefits = [
  { icon: DollarSign, title: "Ganhe por cada venda", desc: "Receba uma porcentagem de cada prompt vendido. Quanto mais prompts, mais ganhos." },
  { icon: BarChart3, title: "Painel de estatísticas", desc: "Acompanhe vendas, visualizações, cópias e favoritos em tempo real." },
  { icon: Shield, title: "Revisão de qualidade", desc: "Nossa equipe revisa cada prompt antes de publicar para garantir a qualidade." },
  { icon: Zap, title: "Acesso Creator gratuito", desc: "Criadores aprovados ganham acesso à área Creator com benefícios exclusivos." },
];

const steps = [
  { num: "01", title: "Crie sua conta", desc: "Cadastre-se gratuitamente e acesse o painel do criador." },
  { num: "02", title: "Cadastre seus prompts", desc: "Preencha as informações, faça upload do preview e defina o preço." },
  { num: "03", title: "Aguarde aprovação", desc: "Nossa equipe revisa em até 24h e publica na plataforma." },
  { num: "04", title: "Comece a ganhar", desc: "Seus prompts ficam disponíveis para compra e você recebe por cada venda." },
];

export default function VenderPage() {
  return (
    <div className="container py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-text-primary mb-4">
          Monetize seus prompts de IA
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto mb-8">
          Cadastre seus melhores prompts no PromptFlow e contribua com a comunidade global de IA.
          Simples, rápido e sem taxas abusivas.
        </p>
        <Link href="/cadastro">
          <Button size="xl" variant="gradient">Começar a vender →</Button>
        </Link>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16">
        {benefits.map((b) => (
          <div key={b.title} className="rounded-2xl border border-border bg-surface p-6 flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-purple/15 border border-brand-purple/20">
              <b.icon className="h-5 w-5 text-brand-purple" />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary mb-1">{b.title}</h3>
              <p className="text-sm text-text-secondary">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">Como funciona</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <div key={s.num} className="rounded-2xl border border-border bg-surface p-5 relative">
              <div className="absolute right-4 top-4 text-2xl font-black text-border">{s.num}</div>
              <h3 className="font-semibold text-text-primary mb-1.5">{s.title}</h3>
              <p className="text-sm text-text-secondary">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-3xl border border-brand-purple/30 bg-gradient-card p-10 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-3">Pronto para começar?</h2>
        <p className="text-text-secondary mb-6">Crie sua conta e cadastre seu primeiro prompt hoje.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/cadastro"><Button size="lg" variant="gradient">Criar conta de criador</Button></Link>
          <Link href="/creator"><Button size="lg" variant="secondary">Acessar painel</Button></Link>
        </div>
      </div>
    </div>
  );
}
