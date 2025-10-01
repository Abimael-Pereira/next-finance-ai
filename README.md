# 💰 Finance AI

<div align="center">

![Finance AI Logo](./public/logo.svg)

**Sistema inteligente de controle financeiro pessoal com IA**

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
[![https:/TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://prisma.io/)

[🚀 Ver Demo](#) • [📖 Documentação](#funcionalidades) • [🛠️ Instalação](#instalação)

</div>

---

## 📋 Sobre o Projeto

O **Finance AI** é uma aplicação web moderna para controle financeiro pessoal que utiliza **Inteligência Artificial** para gerar relatórios e insights personalizados sobre suas finanças. Desenvolvido com as mais modernas tecnologias do ecossistema React/Next.js.

### 🎯 Principais Diferenciais

- 🤖 **Relatórios com IA**: Análises inteligentes powered by OpenAI GPT-4
- 💳 **Sistema de Assinatura**: Modelo freemium com integração Stripe
- 🎨 **Interface Moderna**: Design responsivo e acessível
- 🔒 **Autenticação Robusta**: Sistema completo com Clerk
- 📊 **Visualizações Interativas**: Gráficos e dashboards em tempo real
- 🛡️ **Type Safety**: 100% TypeScript com validação Zod

---

## ✨ Funcionalidades

### 📈 Dashboard Inteligente

- **Resumo Financeiro**: Visão geral de receitas, despesas e investimentos
- **Gráficos Interativos**: Pizza charts e gráficos de barras
- **Últimas Transações**: Lista em tempo real das movimentações
- **Filtros Temporais**: Análise por mês/período

### 💸 Gestão de Transações

- **CRUD Completo**: Criar, editar, visualizar e deletar transações
- **Categorização Inteligente**: 9 categorias pré-definidas
- **Múltiplos Métodos**: Cartão, PIX, transferência, boleto, dinheiro
- **Tipos Flexíveis**: Receitas, despesas e investimentos

### 🤖 Relatórios com IA

- **Análise Personalizada**: Insights baseados no seu perfil financeiro
- **Dicas Inteligentes**: Orientações para melhoria financeira
- **Integração OpenAI**: Powered by GPT-4 mini
- **Recurso Premium**: Exclusivo para assinantes

### 💎 Sistema de Assinatura

- **Plano Básico**: Gratuito (10 transações/mês)
- **Plano Premium**: Ilimitado + IA (via Stripe)
- **Checkout Seguro**: Integração completa com webhooks
- **Gestão Automática**: Status de assinatura em tempo real

---

## 🏗️ Tecnologias

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Componentes**: Radix UI primitives
- **Formulários**: React Hook Form + Zod
- **Gráficos**: Recharts
- **Notificações**: Sonner

### Backend

- **Runtime**: Node.js
- **API**: Next.js API Routes + Server Actions
- **Validação**: Zod schemas
- **ORM**: Prisma
- **Banco**: PostgreSQL

### Integrações

- **Autenticação**: Clerk
- **IA**: OpenAI API (GPT-4 mini)
- **Pagamentos**: Stripe
- **Deploy**: Vercel

### Qualidade

- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged
- **Tipagem**: TypeScript strict mode

---

## 🚀 Instalação

### Pré-requisitos

- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL
- Contas nos serviços: Clerk, OpenAI, Stripe

### 1. Clone o repositório

```bash
git clone https://github.com/Abimael-Pereira/next-finance-ai.git
cd next-finance-ai
```

### 2. Instale as dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/finance_ai"

# Clerk (Autenticação)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/login"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/login"

# OpenAI
OPENAI_API_KEY="sk-..."

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PREMIUM_PLAN_PRICE_ID="price_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# App
APP_URL="http://localhost:3000"
```

### 4. Configure o banco de dados

```bash
# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# (Opcional) Visualizar banco
npx prisma studio
```

### 5. Execute o projeto

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## 📁 Estrutura do Projeto

```
finance-ai/
├── app/                          # App Router (Next.js 14)
│   ├── (home)/                   # Dashboard principal
│   │   ├── _actions/             # Server Actions (AI reports)
│   │   └── _components/          # Componentes do dashboard
│   ├── _actions/                 # Server Actions globais
│   ├── _components/              # Componentes reutilizáveis
│   │   └── ui/                   # shadcn/ui components
│   ├── _constants/               # Constantes da aplicação
│   ├── _data/                    # Data fetching functions
│   ├── _lib/                     # Utilitários (Prisma, utils)
│   ├── api/                      # API Routes
│   │   └── webhooks/stripe/      # Webhook do Stripe
│   ├── login/                    # Página de login
│   ├── subscription/             # Página de assinatura
│   ├── transactions/             # Página de transações
│   └── utils/                    # Utilitários específicos
├── prisma/                       # Schema e migrações
├── public/                       # Assets estáticos
└── ...configs                   # Configurações (tailwind, next, etc.)
```

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build de produção
npm run start        # Inicia servidor de produção

# Qualidade
npm run lint         # Executar ESLint

# Banco de dados
npx prisma generate  # Gerar cliente Prisma
npx prisma migrate   # Executar migrações
npx prisma studio    # Interface visual do banco
```

---

## 🎨 Screenshots

<div align="center">

### Dashboard Principal

![Dashboard](./docs/dashboard.png)

### Gestão de Transações

![Transactions](./docs/transactions.png)

### Relatório com IA

![AI Report](./docs/ai-report.png)

</div>

---

## ❓ FAQ

<details>
<summary><strong>Como configurar as variáveis de ambiente?</strong></summary>

Copie o arquivo `.env.example` para `.env.local` e preencha com suas credenciais:

```bash
cp .env.example .env.local
```

</details>

<details>
<summary><strong>O projeto funciona sem as APIs externas?</strong></summary>

Sim! O projeto tem fallbacks:

- **Sem OpenAI**: Usa relatório dummy
- **Sem Stripe**: Sistema funciona só sem pagamentos
- **Sem Clerk**: Precisa configurar para autenticação
</details>

<details>
<summary><strong>Como obter as chaves das APIs?</strong></summary>

- **Clerk**: [clerk.com](https://clerk.com) - Cadastre-se e crie uma aplicação
- **OpenAI**: [platform.openai.com](https://platform.openai.com) - Gere uma API key
- **Stripe**: [stripe.com](https://stripe.com) - Acesse o dashboard e pegue as chaves
</details>

<details>
<summary><strong>Este é um projeto real ou apenas para portfólio?</strong></summary>

Este é um **projeto acadêmico** desenvolvido para demonstrar habilidades em:

- Desenvolvimento Full Stack com Next.js 14
- Integração com APIs modernas (OpenAI, Stripe, Clerk)
- Arquitetura escalável e boas práticas de código
- UI/UX moderna e responsiva
- Gestão de estado e validações robustas
</details>

---

## 👨‍💻 Autor

**Abimael Pereira**

- GitHub: [@Abimael-Pereira](https://github.com/Abimael-Pereira)
- LinkedIn: [Abimael Pereira](https://linkedin.com/in/abimael-pereira)

---

## 🙏 Agradecimentos

- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [shadcn/ui](https://ui.shadcn.com/) - Componentes UI modernos
- [Clerk](https://clerk.com/) - Autenticação e gerenciamento de usuários
- [OpenAI](https://openai.com/) - IA para geração de relatórios
- [Stripe](https://stripe.com/) - Processamento de pagamentos
- [Prisma](https://prisma.io/) - ORM type-safe
- [Vercel](https://vercel.com/) - Plataforma de deploy

---

<div align="center">

**Desenvolvido com ❤️ e ☕ por [Abimael Pereira](https://github.com/Abimael-Pereira)**

⭐ Se este projeto foi útil, considere dar uma estrela!

[![GitHub stars](https://img.shields.io/github/stars/Abimael-Pereira/next-finance-ai?style=social)](https://github.com/Abimael-Pereira/next-finance-ai)

</div>
