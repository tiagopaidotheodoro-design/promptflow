import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política para Criadores" };

export default function CriadoresPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-text-primary mb-8">Política para Criadores</h1>
      <div className="space-y-6 text-text-secondary text-sm leading-relaxed">
        <p className="text-text-muted">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-primary">Quem pode ser criador</h2>
          <p>Qualquer usuário cadastrado pode solicitar acesso à área de criador. A aprovação é manual e analisamos a qualidade dos primeiros prompts enviados.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-primary">Comissão por venda</h2>
          <p>Criadores recebem <strong className="text-text-primary">70% do valor de cada prompt vendido</strong>. Os 30% restantes cobrem custos de plataforma, processamento e suporte.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-primary">Revisão de conteúdo</h2>
          <p>Todos os prompts passam por revisão antes de serem publicados. Aprovamos prompts que sejam originais, testados e que entregam resultados de qualidade.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-primary">Conteúdo não aceito</h2>
          <ul className="list-disc list-inside space-y-1 text-text-muted">
            <li>Conteúdo adulto explícito</li>
            <li>Prompts que incentivam ilegalidades</li>
            <li>Conteúdo copiado de outros criadores</li>
            <li>Prompts sem valor prático comprovado</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-text-primary">Pagamentos</h2>
          <p>Os pagamentos são realizados mensalmente via Pix, após integração com o gateway de pagamento. Valor mínimo para saque: R$ 50,00.</p>
        </section>
      </div>
    </div>
  );
}
