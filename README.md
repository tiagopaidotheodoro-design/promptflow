# PromptHub Brasil 🚀

Marketplace de prompts para IA em português do Brasil. Explore, compre, venda e use prompts para ChatGPT, Midjourney, Sora, Veo, Gemini, Runway e muito mais.

---

## Stack

| Tecnologia        | Versão     | Uso                            |
|-------------------|------------|-------------------------------|
| Next.js           | 15.x       | Framework full-stack (App Router) |
| React             | 18.x       | UI                            |
| TypeScript        | 5.x        | Tipagem                       |
| Tailwind CSS      | 3.x        | Estilização                   |
| Prisma ORM        | 5.x        | Banco de dados                |
| PostgreSQL        | 14+        | Banco relacional              |
| NextAuth v5 beta  | 5.0.0-beta | Autenticação (JWT + Google)   |
| bcryptjs          | —          | Hash de senhas                |

---

## Pré-requisitos

- Node.js 18+
- npm 9+
- PostgreSQL 14+ (local ou nuvem)

---

## Instalação local

### 1. Clone e instale

```bash
git clone <url-do-repo>
cd prompthub-brasil
npm install
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite `.env.local` com seus valores:

```env
# Banco de dados
# Opção A — Neon.tech (recomendado para Hostinger):
DATABASE_URL="postgresql://user:pass@host/dbname?sslmode=require"

# Opção B — PostgreSQL local:
DATABASE_URL="postgresql://postgres:senha@localhost:5432/prompthub"

# Auth
NEXTAUTH_SECRET="sua-chave-secreta-aqui"  # gere com: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (opcional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# URL pública
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Configure o banco de dados

```bash
# Gera o Prisma Client
npm run db:generate

# Cria as tabelas (primeira vez)
npm run db:migrate

# Popula com dados fake
npm run db:seed
```

### 4. Rode o projeto

```bash
npm run dev
```

Acesse: http://localhost:3000

---

## Contas de teste (após seed)

| Tipo      | Email                        | Senha     |
|-----------|------------------------------|-----------|
| Admin     | admin@prompthub.com.br       | senha123  |
| Criador 1 | lucas@prompthub.com.br       | senha123  |
| Criador 2 | ana@prompthub.com.br         | senha123  |
| Criador 3 | rafael@prompthub.com.br      | senha123  |
| Usuário   | usuario@prompthub.com.br     | senha123  |

---

## Comandos disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção (após build)
npm run lint         # Lint do código
npm run db:generate  # Gera o Prisma Client
npm run db:migrate   # Aplica migrations
npm run db:seed      # Popula dados fake
npm run db:studio    # Abre Prisma Studio (UI do banco)
npm run db:reset     # Reseta e re-popula o banco
```

---

## Estrutura de pastas

```
src/
├── app/
│   ├── (auth)/          # Páginas de login e cadastro (sem header)
│   ├── (main)/          # Páginas públicas com header/footer
│   ├── dashboard/       # Painel do usuário (protegido)
│   ├── creator/         # Painel do criador (CREATOR/ADMIN)
│   ├── admin/           # Painel admin (ADMIN)
│   └── api/             # API Routes
├── components/
│   ├── ui/              # Componentes base (Button, Badge, Card...)
│   ├── layout/          # Header, Footer
│   ├── home/            # Seções da Home
│   ├── prompts/         # PromptCard, PromptGrid, Filtros...
│   └── auth/            # LoginForm, RegisterForm
├── lib/
│   ├── prisma.ts        # Cliente Prisma singleton
│   ├── auth.ts          # Configuração NextAuth
│   ├── utils.ts         # Funções utilitárias
│   └── constants.ts     # Constantes da aplicação
├── types/               # Tipos TypeScript
└── hooks/               # React hooks customizados
```

---

## Deploy na Hostinger

### Opção A — VPS (recomendado ✅)

> **Por que VPS?** O Next.js com App Router requer Node.js rodando continuamente. Hospedagem compartilhada não suporta isso.

**Configuração recomendada:** VPS KVM 2 (2 vCPU, 8GB RAM) com Ubuntu 22.04.

#### 1. Preparar o servidor

```bash
# Conectar via SSH
ssh root@seu-ip

# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 (gerenciador de processos)
npm install -g pm2

# Instalar Nginx
sudo apt-get install -y nginx
```

#### 2. Configurar PostgreSQL

**Opção recomendada:** Use [Neon.tech](https://neon.tech) (PostgreSQL gratuito na nuvem, sem configurar no servidor).

Ou instale localmente:
```bash
sudo apt-get install -y postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE USER prompthub WITH PASSWORD 'suasenha';"
sudo -u postgres psql -c "CREATE DATABASE prompthub OWNER prompthub;"
```

#### 3. Deploy do projeto

```bash
# No servidor, clone o repositório
git clone <seu-repo> /var/www/prompthub
cd /var/www/prompthub

# Instale dependências
npm install

# Configure variáveis de ambiente
cp .env.example .env.local
nano .env.local  # preencha os valores

# Build
npm run build

# Migrate e seed
npm run db:migrate
npm run db:seed

# Inicia com PM2
pm2 start npm --name "prompthub" -- start
pm2 save
pm2 startup
```

#### 4. Configurar Nginx como proxy reverso

```nginx
# /etc/nginx/sites-available/prompthub
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/prompthub /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. SSL (HTTPS) com Certbot

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

---

### Opção B — Hostinger Node.js Hosting

A Hostinger oferece planos de hospedagem Node.js gerenciada. Verifique se o plano suporta Next.js + start server.

1. Suba os arquivos pelo painel ou Git
2. Configure o comando de start: `npm run start`
3. Configure as variáveis de ambiente no painel
4. Use banco Neon.tech para o PostgreSQL

---

## Integrar Mercado Pago (futuro)

```bash
npm install mercadopago
```

Adicione ao `.env.local`:
```env
MERCADO_PAGO_ACCESS_TOKEN=seu_access_token
```

Crie a rota `/api/checkout` e use o SDK:
```typescript
import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
```

---

## Integrar Stripe (futuro)

```bash
npm install stripe @stripe/stripe-js
```

Adicione ao `.env.local`:
```env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

---

## Variáveis de ambiente (resumo)

| Variável                           | Obrigatória | Descrição                        |
|------------------------------------|-------------|----------------------------------|
| `DATABASE_URL`                     | ✅ Sim      | URL do PostgreSQL                |
| `NEXTAUTH_SECRET`                  | ✅ Sim      | Segredo JWT (32+ chars)          |
| `NEXTAUTH_URL`                     | ✅ Sim      | URL pública da aplicação         |
| `GOOGLE_CLIENT_ID`                 | ⬜ Opcional | OAuth Google                     |
| `GOOGLE_CLIENT_SECRET`             | ⬜ Opcional | OAuth Google                     |
| `MERCADO_PAGO_ACCESS_TOKEN`        | ⬜ Futuro   | Gateway de pagamento BR          |
| `STRIPE_SECRET_KEY`                | ⬜ Futuro   | Gateway de pagamento global      |
| `NEXT_PUBLIC_APP_URL`              | ✅ Sim      | URL pública (com https em prod)  |

---

## Próximas funcionalidades (roadmap)

- [ ] Upload de imagem de preview via Uploadthing
- [ ] Integração Mercado Pago (pagamento)
- [ ] Notificações por e-mail (Resend)
- [ ] Sistema de assinatura recorrente
- [ ] Página de perfil público do criador
- [ ] Busca semântica de prompts
- [ ] Variações de prompts (Pro/Creator)
- [ ] Painel de analytics avançado para criadores

---

## Licença

MIT © PromptHub Brasil — 2025
