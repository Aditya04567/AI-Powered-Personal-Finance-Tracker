<div align="center">
  <img src="public/logo.png" alt="Spendly Logo" width="100" />

  <h1>Spendly | Intelligent Personal Finance Platform</h1>

  <p>
    A production-ready, full-stack financial management platform leveraging <strong>Next.js 15</strong>, <strong>Google Gemini AI</strong>, and <strong>Supabase</strong> to automate expense tracking and deliver actionable financial intelligence.
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#system-architecture">Architecture</a> •
    <a href="#technical-highlights">Technical Highlights</a> •
    <a href="#getting-started">Getting Started</a>
  </p>
</div>


## 📸 Screenshots

<img width="1350" height="632" alt="image" src="https://github.com/user-attachments/assets/a63c2086-77ed-4b54-b458-d1c9ff12a0d8" />

---

## 💡 The Vision

Managing personal finances often involves manual data entry, disconnected spreadsheets, and reactive budgeting. **Spendly** solves this by automating the tedious parts of financial tracking—utilizing AI to parse receipts, automatically categorizing transactions, and utilizing background jobs to manage recurring expenses and real-time budget alerts. 

## ✨ Key Features

### 🤖 AI-Driven Automation
* **Computer Vision Receipt Parsing:** Integrated **Google Gemini 3.5 Flash** to analyze receipt images, automatically extracting metadata (merchant, amount, date) and intelligently categorizing the expense.
* **Algorithmic Insights:** Generates personalized monthly financial reports, analyzing spending velocity and category distributions.

### 💰 Core Financial Engine
* **Multi-Account Architecture:** Support for isolated tracking across multiple bank accounts (Checking, Savings, Credit).
* **Automated Recurring Transactions:** CRON-driven engine that processes scheduled daily, weekly, or monthly payments with built-in idempotency to prevent duplicate charges.
* **Proactive Budget Constraints:** Real-time budget monitoring with automated email thresholds triggered when spending exceeds 80%.

### 🎨 Premium User Experience (UX/UI)
* **Monarch-Inspired Aesthetics:** A modern, glassmorphic landing page and dashboard featuring smooth micro-interactions, responsive CSS grids, and accessible typography.
* **Interactive Data Visualization:** Custom SVG and Recharts-based visualizations for cash flow, net worth progression, and category breakdown.

### 🛡️ Enterprise-Grade Security
* **Multi-Layer Authentication:** Integrated **Clerk** for secure OAuth and JWT-based session management.
* **Edge Security:** Implemented **ArcJet** middleware for bot protection, rate limiting, and request shielding at the edge.

---

## 🛠️ Tech Stack & Decisions

I deliberately chose a modern, edge-compatible stack to ensure high performance, type safety, and scalability.

| Category | Technologies | Justification |
|---|---|---|
| **Frontend Framework** | Next.js 15, React 19 (App Router) | Leveraged Server Components (RSC) and Server Actions for zero-API data fetching and enhanced SEO. |
| **Styling & UI** | Tailwind CSS, Radix UI, shadcn/ui | Utility-first styling for rapid, highly-customizable, and accessible component design. |
| **Database & ORM** | PostgreSQL (Supabase), Prisma ORM | Relational integrity for financial data with Prisma providing strict type-safety across the application boundary. |
| **Background Jobs** | Inngest | Event-driven background processing for reliable execution of budget alerts and recurring transactions without serverless timeout limits. |
| **AI Integration** | Google Gemini SDK | Multimodal capabilities used for fast and accurate optical character recognition (OCR) on receipts. |
| **Authentication** | Clerk | Out-of-the-box identity management with robust session control and 2FA capabilities. |

---

## 🏗️ System Architecture

Spendly employs a decoupled, serverless-first architecture designed for resilience and performance.

```text
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                       │
│  [ React Server Components ]   [ Interactive Dashboards ]   │
└──────────────────────┬───────────────────────────────┬──────┘
                       │                               │
┌──────────────────────▼───────────────────────────────▼──────┐
│                    EDGE MIDDLEWARE                          │
│  [ Clerk Auth Validation ] ──► [ ArcJet Rate/Bot Shield ]   │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  NEXT.JS SERVER (Node.js)                   │
│  [ Server Actions ] ──► [ Zod Validation ] ──► [ Prisma ]   │
└────────┬─────────────┬─────────────┬─────────────┬──────────┘
         │             │             │             │
┌────────▼────┐ ┌──────▼─────┐ ┌─────▼─────┐ ┌─────▼──────────┐
│ Google      │ │ Inngest    │ │ Resend    │ │ Supabase       │
│ Gemini AI   │ │ Cron Jobs  │ │ React Mail│ │ PostgreSQL     │
│ (OCR/LLM)   │ │ (Events)   │ │ (Alerts)  │ │ (Storage/DB)   │
└─────────────┘ └────────────┘ └───────────┘ └────────────────┘
```

---

## 🧠 Technical Highlights & Problem Solving

During development, I tackled several complex engineering challenges:

1. **Idempotent Cron Jobs in a Serverless Environment:** 
   * *Challenge:* Standard serverless functions time out or execute multiple times, causing duplicate financial transactions.
   * *Solution:* Implemented **Inngest** to decouple background tasks into event-driven workflows. Recurring transactions are processed asynchronously, ensuring reliability and preventing double-billing.

2. **Multimodal AI Integration & Hallucination Mitigation:**
   * *Challenge:* OCR models often hallucinate monetary values or format dates incorrectly.
   * *Solution:* Engineered strict prompting constraints for Gemini AI and piped the output through **Zod schema validation** on the backend, ensuring the database only ingests correctly formatted `Float` and `DateTime` objects.

3. **Type-Safe Full-Stack Data Flow:**
   * *Challenge:* Ensuring frontend UI components perfectly align with database schema changes.
   * *Solution:* Used **Prisma** to generate strict TypeScript types. Passed data securely through Next.js Server Actions, eliminating the need for boilerplate REST API types and guaranteeing end-to-end type safety.

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone & Install
```bash
git clone https://github.com/Aditya04567/Ai--Finance-tracker.git
cd Ai--Finance-tracker
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory and populate it with your respective API keys:
```env
# Database (Supabase)
DATABASE_URL="your_supabase_pooler_url"
DIRECT_URL="your_supabase_direct_url"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_publishable_key"
CLERK_SECRET_KEY="your_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# AI & Services
GEMINI_API_KEY="your_gemini_api_key"
RESEND_API_KEY="your_resend_api_key"
ARCJET_KEY="your_arcjet_key"
```

### 3. Database Initialization
Synchronize the Prisma schema with your Supabase PostgreSQL instance:
```bash
npx prisma db push
```

### 4. Run Development Servers
Start the Next.js app and the local Inngest dev server concurrently:
```bash
# Terminal 1: Next.js
npm run dev

# Terminal 2: Inngest (for testing background jobs)
npx inngest-cli@latest dev
```

---



---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <b>Architected and developed by <a href="https://github.com/Aditya04567">Aditya</a></b>
</div>
