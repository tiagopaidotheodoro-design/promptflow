import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de Reembolso" };

export default function ReembolsoPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-text-primary mb-8">Política de Reembolso</h1>
      <div className="space-y-6 text-text-secondary text-sm leading-relaxed">
        <p className="text-text-muted">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

        <div className="rounded-xl border border-brand-green/20 bg-brand-green/5 p-4">
          <p className="font-semibold text-brand-green-neon mb-1">Garantia de 7 dias</p>
          <p>Oferecemos reembolso completo em até 7 dias após a compra, sem perguntas, para qualquer prompt individual.</p>
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-primary">Compras avulsas</h2>
          <p>Para prompts comprados individualmente, solicite reembolso em até 7 dias pelo e-mail <a href="mailto:suporte@prompthub.com.br" className="text-brand-purple hover:underline">suporte@prompthub.com.br</a>. O valor é estornado em até 5 dias úteis.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-primary">Assinaturas</h2>
          <p>Assinaturas podem ser canceladas a qualquer momento. O acesso permanece ativo até o fim do período pago. Não há reembolso proporcional para períodos já utilizados.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-primary">Quando não aplicamos reembolso</h2>
          <ul className="list-disc list-inside space-y-1 text-text-muted">
            <li>Após o prazo de 7 dias</li>
            <li>Uso abusivo (múltiplas compras e estornos)</li>
            <li>Violação dos Termos de Uso</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
