import { NewPromptForm } from "@/components/prompts/NewPromptForm";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Novo Prompt" };

export default function NovoPomptPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Cadastrar novo prompt</h1>
        <p className="text-sm text-text-secondary mt-0.5">
          Preencha as informações abaixo. Após envio, nossa equipe revisará em até 24h.
        </p>
      </div>
      <NewPromptForm />
    </div>
  );
}
