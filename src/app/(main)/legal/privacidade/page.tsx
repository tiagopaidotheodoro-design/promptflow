import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function PrivacidadePage() {
  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-extrabold text-text-primary mb-8">Política de Privacidade</h1>
      <div className="prose prose-sm max-w-none space-y-6 text-text-secondary">
        <p className="text-text-muted text-sm">Última atualização: {new Date().toLocaleDateString("pt-BR")}</p>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">1. Dados Coletados</h2>
          <p>Coletamos: nome, e-mail, histórico de prompts adquiridos e copiados, dados de pagamento (processados por terceiros), e dados de uso da plataforma para melhorar a experiência.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">2. Uso dos Dados</h2>
          <p>Seus dados são usados para: fornecer e melhorar nossos serviços, processar pagamentos, enviar atualizações importantes, e personalizar a experiência na plataforma.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">3. Compartilhamento</h2>
          <p>Não vendemos seus dados a terceiros. Compartilhamos apenas com processadores de pagamento e serviços de autenticação (Google OAuth) quando necessário.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">4. Seus Direitos (LGPD)</h2>
          <p>Você tem direito a: acessar, corrigir e excluir seus dados pessoais. Solicite pelo e-mail: <a href="mailto:privacidade@prompthub.com.br" className="text-brand-purple hover:underline">privacidade@prompthub.com.br</a></p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-text-primary">5. Cookies</h2>
          <p>Utilizamos cookies essenciais para autenticação e cookies de análise para melhorar a plataforma. Você pode gerenciar cookies nas configurações do seu navegador.</p>
        </section>
      </div>
    </div>
  );
}
