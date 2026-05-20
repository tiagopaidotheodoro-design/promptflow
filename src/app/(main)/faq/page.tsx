import type { Metadata } from "next";
import { FaqSection } from "@/components/home/FaqSection";

export const metadata: Metadata = {
  title: "FAQ — Perguntas Frequentes",
  description: "Respostas para as principais dúvidas sobre o PromptFlow.",
};

export default function FaqPage() {
  return (
    <div className="container py-16 max-w-3xl mx-auto">
      <div className="mb-2 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-purple">Ajuda</span>
      </div>
      <FaqSection />
    </div>
  );
}
