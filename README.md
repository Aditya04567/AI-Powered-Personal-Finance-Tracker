<p align="center">
  <img src="public/logo.png" alt="Spendly Logo" width="80" />
</p>

<h1 align="center">Spendly — AI-Powered Finance Tracker</h1>

<p align="center">
  A full-stack intelligent personal finance platform built with <strong>Next.js 15</strong>, <strong>Gemini AI</strong>, and <strong>Supabase</strong>.<br/>
  Track expenses, scan receipts with AI, automate recurring payments, and receive personalized financial insights — all in one place.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#screenshots">Screenshots</a>
</p>

---

## ✨ Features

### 🤖 AI-Powered Intelligence
- **Smart Receipt Scanner** — Upload a receipt image and Gemini AI extracts amount, date, merchant, category, and description automatically
- **Monthly Financial Insights** — AI-generated actionable spending analysis delivered via email every month
- **Intelligent Categorization** — Automatic transaction categorization across 15+ expense categories

### 💰 Financial Management
- **Multi-Account Support** — Manage multiple bank accounts (Savings & Current) with real-time balance tracking
- **Transaction Tracking** — Full CRUD for income and expense transactions with filtering, sorting, and search
- **Recurring Transactions** — Set up daily, weekly, monthly, or yearly recurring payments with automated processing
- **Budget Management** — Set monthly budgets with automated alerts when spending exceeds 80% threshold

### 📊 Analytics & Reporting
- **Interactive Dashboard** — Visual spending breakdown with bar charts and category-wise pie charts (Recharts)
- **Monthly Email Reports** — Automated financial summaries with AI insights sent on the 1st of each month
- **Budget Alerts** — Email notifications triggered every 6 hours when budget thresholds are exceeded

### 🔒 Security & Infrastructure
- **Authentication** — Secure sign-up/sign-in with Clerk (OAuth, email, and social providers)
- **Bot Protection** — ArcJet shield + bot detection middleware for API route protection
- **Rate Limiting** — Throttled recurring transaction processing (10 per user/minute)

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Turbopack, Server Actions, RSC) |
| **Language** | JavaScript (ES2024) |
| **AI/ML** | Google Gemini 3.5 Flash (`@google/generative-ai`) |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma 6 |
| **Authentication** | Clerk |
| **Background Jobs** | Inngest (cron-based event-driven functions) |
| **Email** | Resend + React Email |
| **UI Components** | Radix UI + shadcn/ui |
| **Styling** | Tailwind CSS 3.4 |
| **Charts** | Recharts |
| **Security** | ArcJet (shield, bot detection) |
| **Deployment** | Vercel (recommended) |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLIENT (Next.js)                  │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │ Dashboard │  │ Accounts  │  │   Transactions   │  │
│  │ (Charts)  │  │ (CRUD)    │  │ (CRUD + Scanner) │  │
│  └──────────┘  └───────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────┤
│               SERVER ACTIONS (Next.js)               │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │ dashboard │  │  account  │  │   transaction    │  │
│  │  .js      │  │   .js     │  │     .js          │  │
│  └──────────┘  └───────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────┤
│                   MIDDLEWARE LAYER                    │
│         Clerk Auth  ←→  ArcJet Security              │
├─────────────────────────────────────────────────────┤
│               BACKGROUND JOBS (Inngest)              │
│  ┌────────────────┐ ┌────────────┐ ┌─────────────┐  │
│  │   Recurring     │ │  Monthly   │ │   Budget    │  │
│  │  Transactions   │ │  Reports   │ │   Alerts    │  │
│  │  (daily cron)   │ │ (monthly)  │ │ (6-hourly)  │  │
│  └────────────────┘ └────────────┘ └─────────────┘  │
├─────────────────────────────────────────────────────┤
│                   DATA LAYER                         │
│    Prisma ORM  ←→  Supabase PostgreSQL               │
├─────────────────────────────────────────────────────┤
│                 EXTERNAL SERVICES                    │
│   Gemini AI  •  Resend Email  •  Clerk  •  ArcJet   │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
ai-finance-platform/
├── actions/                  # Server Actions
│   ├── account.js            # Account CRUD operations
│   ├── budget.js             # Budget management
│   ├── dashboard.js          # Dashboard data aggregation
│   ├── transaction.js        # Transactions + AI receipt scanner
│   └── send-email.js         # Email sending utility
├── app/
│   ├── (auth)/               # Auth pages (sign-in, sign-up)
│   ├── (main)/
│   │   ├── account/          # Account detail pages
│   │   ├── dashboard/        # Main dashboard
│   │   └── transaction/      # Transaction create page
│   ├── api/                  # API routes (Inngest, webhooks)
│   └── page.js               # Landing page
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── header.jsx            # Navigation header
│   ├── hero.jsx              # Landing page hero
│   └── create-account-drawer.jsx
├── emails/
│   └── template.jsx          # React Email templates
├── lib/
│   ├── inngest/              # Background job definitions
│   │   ├── client.js         # Inngest client
│   │   └── function.js       # 3 cron functions
│   └── prisma.js             # Prisma client singleton
├── prisma/
│   └── schema.prisma         # Database schema (4 models)
└── middleware.js              # Clerk + ArcJet middleware chain
```

---

## 🗄 Database Schema

The app uses **4 core models** with full relational integrity:

| Model | Description |
|---|---|
| `User` | Linked to Clerk via `clerkUserId`, has accounts, transactions, budgets |
| `Account` | Savings/Current accounts with balance tracking |
| `Transaction` | Income/Expense entries with recurring support and receipt URLs |
| `Budget` | Monthly budget per user with alert tracking |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** or **yarn**
- Accounts on: [Supabase](https://supabase.com), [Clerk](https://clerk.com), [Google AI Studio](https://aistudio.google.com), [Resend](https://resend.com), [ArcJet](https://arcjet.com)

### 1. Clone the repository

```bash
git clone https://github.com/Aditya04567/Ai--Finance-tracker.git
cd Ai--Finance-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
# Supabase
DATABASE_URL=your_supabase_pooler_url
DIRECT_URL=your_supabase_direct_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Resend Email
RESEND_API_KEY=your_resend_api_key

# ArcJet Security
ARCJET_KEY=your_arcjet_key
```

### 4. Push database schema

```bash
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. (Optional) Run Inngest Dev Server

To test background jobs locally:

```bash
npx inngest-cli@latest dev
```

---

## 📸 Screenshots

<img width="1470" alt="Spendly Dashboard" src="https://github.com/user-attachments/assets/1bc50b85-b421-4122-8ba4-ae68b2b61432">

---

## 🔑 Key Technical Highlights

- **Server Actions** — All data mutations use Next.js Server Actions for type-safe, zero-API server-side logic
- **Prisma Transactions** — Atomic database operations ensure data consistency across account balance updates
- **Event-Driven Architecture** — Inngest handles 3 separate cron jobs with throttling and batched processing
- **Middleware Chaining** — ArcJet security runs before Clerk auth in a composable middleware pipeline
- **AI Vision API** — Gemini multimodal capabilities process receipt images directly from file uploads
- **React Email** — Type-safe, responsive email templates for budget alerts and monthly reports

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/Aditya04567"><strong>Aditya</strong></a>
</p>
