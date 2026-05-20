import type { Metadata } from "next";

export const metadata: Metadata = { title: "Termos de Uso" };

export default function TermosPage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-text-primary mb-8">Termos de Uso</h1>
      <div className="prose prose-invert prose-sm max-w-none space-y-6 text-text-secondary">
        <p className="text-text-muted text-sm">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">1. Aceitação dos Termos</h2>
          <p>Ao acessar e utilizar o PromptFlow, você concorda com estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize nossa plataforma.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">2. Descrição do Serviço</h2>
          <p>O PromptFlow é um marketplace digital onde usuários podem explorar, comprar e vender prompts para ferramentas de inteligência artificial como ChatGPT, Midjourney, Sora, Gemini, entre outras.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">3. Conta de Usuário</h2>
          <p>Para acessar determinadas funcionalidades, você deve criar uma conta. Você é responsável por manter a segurança da sua conta e senha. Notifique-nos imediatamente sobre qualquer uso não autorizado.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">4. Propriedade Intelectual dos Prompts</h2>
          <p>Ao comprar um prompt, você adquire o direito de uso pessoal e comercial do conteúdo gerado a partir dele. Os direitos autorais do prompt permanecem com o criador. Revenda ou redistribuição de prompts adquiridos é proibida.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">5. Conteúdo Proibido</h2>
          <p>Não é permitido cadastrar prompts que gerem conteúdo ilegal, difamatório, pornográfico infantil, ou que incentive violência. O PromptFlow se reserva o direito de remover qualquer conteúdo que viole estas diretrizes.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">6. Pagamentos</h2>
          <p>Os preços são exibidos em Reais (BRL). Todas as transações são processadas de forma segura. Em caso de dúvidas sobre cobranças, entre em contato com nosso suporte.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">7. Limitação de Responsabilidade</h2>
          <p>O PromptFlow não se responsabiliza pelos resultados gerados pelas ferramentas de IA ao usar os prompts adquiridos. Os prompts são fornecidos "como estão" e os resultados podem variar.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">8. Contato</h2>
          <p>Para dúvidas sobre estes Termos, entre em contato: <a href="mailto:contato@promptflow.app" className="text-brand-purple hover:underline">contato@promptflow.app</a></p>
        </section>
      </div>
    </div>
  );
}
