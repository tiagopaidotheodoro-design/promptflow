"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/contexts/LanguageContext";

export function CtaSection() {
  const t = useT();

  return (
    <section className="container py-16">
      <div className="relative overflow-hidden rounded-3xl border border-brand-purple/30 bg-gradient-card p-10 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-brand-purple/15 blur-[100px]" />
        </div>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-purple shadow-lg shadow-brand-purple/30">
          <Zap className="h-7 w-7 text-white" />
        </div>

        <h2 className="text-2xl font-extrabold text-text-primary sm:text-3xl text-balance">
          {t("cta.title")}
        </h2>
        <p className="mt-3 text-text-secondary max-w-md mx-auto text-balance">
          {t("cta.subtitle")}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/cadastro">
            <Button size="lg" variant="gradient">{t("cta.button")}</Button>
          </Link>
          <Link href="/vender">
            <Button size="lg" variant="secondary">{t("cta.secondary")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
