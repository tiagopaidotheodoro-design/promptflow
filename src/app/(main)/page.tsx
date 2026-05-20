import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyJoinSection } from "@/components/home/WhyJoinSection";
import { CtaSection } from "@/components/home/CtaSection";
import { PromptGrid } from "@/components/prompts/PromptGrid";
import type { Prompt } from "@/types";

export const dynamic = "force-dynamic";

async function getHomeData() {
  const [featured, packs] = await Promise.all([
    // Apenas IMAGE, VIDEO e TEXT — sem packs
    prisma.prompt.findMany({
      where: {
        status: "APPROVED",
        type: { in: ["IMAGE", "VIDEO", "TEXT"] },
      },
      include: { category: true, creator: { select: { id: true, name: true, image: true } } },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
      take: 6,
    }),
    // Apenas PACK
    prisma.prompt.findMany({
      where: { status: "APPROVED", type: "PACK" },
      include: { category: true, creator: { select: { id: true, name: true, image: true } } },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);
  return { featured, packs };
}

function SectionHeader({
  title,
  subtitle,
  href,
  seeAll = "Ver todos",
}: {
  title: string;
  subtitle?: string;
  href: string;
  seeAll?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-text-primary sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>}
      </div>
      <Link
        href={href}
        className="flex items-center gap-1.5 text-sm font-medium text-brand-purple hover:text-brand-purple/80 transition-colors shrink-0"
      >
        {seeAll} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default async function HomePage() {
  const { featured, packs } = await getHomeData();

  return (
    <>
      <Hero />

      {/* Prompts em destaque */}
      <section className="container py-4">
        <SectionHeader
          title="✦ Prompts em destaque"
          subtitle="Uma seleção inicial para você começar a criar agora."
          href="/explorar"
        />
        <PromptGrid prompts={featured as unknown as Prompt[]} columns={3} />
      </section>

      {/* Como funciona */}
      <HowItWorks />

      {/* Packs gratuitos */}
      {packs.length > 0 && (
        <section className="container py-10">
          <SectionHeader
            title="📦 Packs gratuitos"
            subtitle="Coleções de prompts organizadas por tema."
            href="/explorar?tipo=PACK"
          />
          <PromptGrid prompts={packs as unknown as Prompt[]} columns={4} />
        </section>
      )}

      {/* Por que participar */}
      <WhyJoinSection />

      {/* CTA final */}
      <CtaSection />
    </>
  );
}
