<div align="center">
  <h3><strong>Final Year Major Project Report</strong></h3>
  <h1>Spendly: An Intelligent Personal Finance Platform</h1>
  
  <p><strong>Submitted in partial fulfillment of the requirements for the degree of</strong></p>
  <p><strong>Bachelor of Technology (B.Tech)</strong></p>

  <br />

  <p><strong>Submitted By:</strong></p>
  <p><a href="https://github.com/Aditya04567"><strong>Aditya</strong></a></p>

  <br />

  <p><strong>Under the Guidance of:</strong></p>
  <p><strong>[Supervisor / Professor Name]</strong></p>
  <p>[Department Name]</p>
  <p>[University / College Name]</p>

  <br />
  
  <img src="public/logo.png" alt="Spendly Logo" width="100" />
</div>

---

## 1. Abstract

Managing personal finances effectively is a common challenge for many individuals due to the fragmented nature of modern banking and the tediousness of manual budgeting. **Spendly** is a comprehensive, AI-driven personal finance management platform designed to automate and simplify this process. By leveraging computer vision and natural language processing (via Google Gemini AI), Spendly automatically parses receipts, categorizes transactions, and provides intelligent financial insights. Built on a modern tech stack (Next.js 15, PostgreSQL, and Supabase), the system ensures high scalability, real-time tracking, and proactive budget enforcement, ultimately enabling users to make informed financial decisions.

---

## 2. Introduction

In the digital era, while digital transactions have become the norm, financial tracking remains largely reactive. Users often rely on generic banking applications that lack holistic analysis, or cumbersome spreadsheets requiring manual entry. The objective of this project is to develop an automated, centralized financial tracker that acts as a personal financial advisor. Spendly allows users to link multiple accounts, schedule recurring payments, establish dynamic budgets, and utilize artificial intelligence to derive meaning from their spending habits.

---

## 3. Problem Statement

* **Manual Data Entry:** Users spend excessive time manually entering receipt data into budgeting tools.
* **Lack of Proactive Alerts:** Traditional apps notify users of their balance rather than warning them when approaching a budget limit.
* **Fragmented Financial View:** Users with multiple bank accounts struggle to see a unified view of their cash flow and net worth.
* **Categorization Errors:** Manual categorization is prone to human error, leading to inaccurate financial reporting.

---

## 4. Proposed Solution

Spendly addresses these issues by offering:
1. **AI Receipt Scanning:** Upload a receipt, and the system automatically extracts the merchant, date, amount, and category.
2. **Event-Driven Automation:** Recurring transactions are managed by background cron jobs to prevent manual tracking and missed payments.
3. **Automated Budget Alerts:** Real-time monitoring combined with email notifications when spending exceeds 80% of the allocated budget.
4. **Comprehensive Dashboards:** Interactive, visual reporting of income vs. expenses, net savings, and category breakdowns.

---

## 5. Technology Stack

This project utilizes a modern, serverless-first architecture to ensure performance, type safety, and scalability.

### Frontend
* **Framework:** Next.js 15 (App Router), React 19
* **UI & Styling:** Tailwind CSS, Radix UI, shadcn/ui
* **Data Visualization:** Recharts

### Backend & Database
* **Database:** PostgreSQL hosted on Supabase
* **ORM:** Prisma (for strict end-to-end type safety)
* **Background Processing:** Inngest (for reliable execution of cron jobs and budget alerts)

### AI & Security
* **Artificial Intelligence:** Google Gemini SDK (gemini-1.5-pro for NLP and gemini-1.5-flash for OCR)
* **Authentication:** Clerk (OAuth and JWT-based session management)
* **Edge Security:** ArcJet (Bot protection and rate limiting)

---

## 6. System Architecture

The system operates on a decoupled architecture, ensuring that heavy background tasks (like AI processing and cron jobs) do not block the main user interface thread.

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

## 7. Key Modules

### Module 1: Account & Transaction Management
Allows users to create distinct accounts (Checking, Savings, Credit). Transactions can be manually entered or uploaded via receipts. Supports bulk actions and dynamic sorting/filtering.

### Module 2: AI Integration (Receipt Scanner & Insights)
Utilizes the Google Gemini API to perform Optical Character Recognition (OCR) on uploaded receipts. Additionally, an "AI Report Analysis" feature aggregates the user's financial standing and generates a professional summary.

### Module 3: Budgeting & Goals
Users can define monthly budgets and long-term financial goals (e.g., buying a car). The system visually tracks progress and utilizes event-driven background jobs to dispatch email alerts when thresholds are reached.

---

## 8. Setup & Installation

To run this project locally for evaluation or development:

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn
* Accounts on Supabase, Clerk, Inngest, Resend, ArcJet, and Google AI Studio.

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Aditya04567/Ai--Finance-tracker.git
   cd Ai--Finance-tracker
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory:
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

3. **Database Migration**
   ```bash
   npx prisma db push
   ```

4. **Run Development Servers**
   To test background jobs, run both Next.js and Inngest concurrently:
   ```bash
   # Terminal 1: Next.js Server
   npm run dev

   # Terminal 2: Inngest Background Worker
   npx inngest-cli@latest dev
   ```

---

## 9. Results & Screenshots

*(Insert screenshots of the Dashboard, AI Receipt Scanner, Reports page, and Budget Alerts here).*

<img width="1350" height="632" alt="image" src="https://github.com/user-attachments/assets/a63c2086-77ed-4b54-b458-d1c9ff12a0d8" />

---

## 10. Future Scope

While Spendly covers core personal finance needs, future iterations could include:
* **Plaid Integration:** Direct bank linking to automatically fetch transactions without manual entry or receipt scanning.
* **Investment Tracking:** Integration with stock market APIs to track portfolio performance alongside liquid cash.
* **Multi-Currency Support:** Allowing users to log transactions in various currencies with real-time exchange rate conversions.

---

## 11. Conclusion

The Spendly project successfully demonstrates the integration of modern web technologies, serverless architecture, and artificial intelligence. By automating tedious financial data entry and providing proactive alerts, the platform serves as an effective, highly scalable tool for personal financial management. 

---
<div align="center">
  <b>Developed by <a href="https://github.com/Aditya04567">Aditya</a></b>
</div>
