# Spendly

Spendly is a personal finance tracker built with Next.js. It helps you manage your accounts, track expenses, set budgets, and uses AI to automatically scan receipts and generate financial insights.

## Screenshots

<img width="1350" height="632" alt="Dashboard Screenshot" src="https://github.com/user-attachments/assets/a63c2086-77ed-4b54-b458-d1c9ff12a0d8" />

## Features

- **Multi-Account Tracking:** Manage checking, savings, and credit cards in one place.
- **AI Receipt Scanner:** Upload a receipt and let Gemini AI automatically extract the amount, merchant, and category.
- **Budget Alerts:** Get notified when you exceed 80% of your monthly budget.
- **Recurring Transactions:** Automatically track subscriptions and recurring bills using Inngest cron jobs.
- **Financial Reports:** Visual breakdowns of your income vs. expenses, net savings, and category spending.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Prisma
- **Authentication:** Clerk
- **AI:** Google Gemini SDK
- **Styling:** Tailwind CSS + shadcn/ui
- **Background Jobs:** Inngest

## Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Aditya04567/Ai--Finance-tracker.git
cd Ai--Finance-tracker
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and add your API keys:

```env
# Supabase
DATABASE_URL="your_supabase_pooler_url"
DIRECT_URL="your_supabase_direct_url"

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_publishable_key"
CLERK_SECRET_KEY="your_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# External APIs
GEMINI_API_KEY="your_gemini_api_key"
RESEND_API_KEY="your_resend_api_key"
ARCJET_KEY="your_arcjet_key"
```

### 3. Setup Database
Push the Prisma schema to your database:
```bash
npx prisma db push
```

### 4. Run Locally
You'll need to run both the Next.js app and the Inngest dev server to test background jobs.

```bash
# Start the web app
npm run dev

# In a new terminal, start Inngest
npx inngest-cli@latest dev
```

## License
MIT License
