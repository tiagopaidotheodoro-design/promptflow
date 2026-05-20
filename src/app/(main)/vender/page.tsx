import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, BarChart3, Globe, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicar Prompts",
  description: "Compartilhe seus prompts de IA com a comunidade global do PromptFlow. Grátis e aberto.",
};

const benefits = [
  { icon: Globe, title: "Ajude a comunidade", desc: "Seus prompts ficam disponíveis gratuitamente para criadores do mundo todo." },
  { icon: BarChart3, title: "Acompanhe o alcance", desc: "Veja quantas cópias e favoritos cada prompt seu recebeu, em tempo real." },
  { icon: Award, title: "Construa reputação", desc: "Tenha um perfil público de criador e ganhe destaque na biblioteca." },
  { icon: Sparkles, title: "Revisão de qualidade", desc: "Nossa equipe revisa cada prompt antes de publicar para manter o padrão." },
];

const steps = [
  { num: "01", title: "Crie sua conta", desc: "Cadastre-se gratuitamente e acesse a área do criador." },
  { num: "02", title: "Publique seu prompt", desc: "Preencha as informações, adicione a imagem de preview e as tags." },
  { num: "03", title: "Aguarde a revisão", desc: "Nossa equipe revisa em até 24h e publica na biblioteca." },
  { num: "04", title: "Acompanhe", desc: "Veja seus prompts ganharem cópias e favoritos da comunidade." },
];

export default function PublicarPage() {
  return (
    <div className="container py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5">
          <Sparkles className="h-3.5 w-3.5 text-brand-purple" />
          <span className="text-xs font-semibold text-brand-purple">Comunidade aberta e gratuita</span>
        </div>
        <h1 className="text-4xl font-extrabold text-text-primary mb-4 text-balance">
          Compartilhe seus prompts com a comunidade
        </h1>
        <p className="text-text-secondary max-w-xl mx-auto mb-8 text-balance">
          Publique seus melhores prompts no PromptFlow e ajude a construir uma biblioteca
          aberta de IA para criadores do mundo todo. É grátis.
        </p>
        <Link href="/creator/prompts/novo">
          <Button size="xl" variant="gradient">Publicar meu prompt →</Button>
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
        <p className="text-text-secondary mb-6">Crie sua conta e publique seu primeiro prompt hoje.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/cadastro"><Button size="lg" variant="gradient">Criar conta grátis</Button></Link>
          <Link href="/creator/prompts/novo"><Button size="lg" variant="secondary">Publicar prompt</Button></Link>
        </div>
      </div>
    </div>
  );
}
