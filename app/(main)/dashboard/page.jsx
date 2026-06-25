import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getUserGoals } from "@/actions/goals";
import { Goals } from "./_components/goals";
import { StatsCards } from "./_components/stats-cards";
import { RecentTransactions } from "./_components/recent-transactions";
import { AIInsights } from "./_components/ai-insights";
import { AccountCarousel } from "./_components/account-carousel";
import { Plus } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const [accounts, transactions, goals] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
    getUserGoals(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault) || accounts?.[0];
  const user = await currentUser();

  const greeting = "Good evening";

  return (
    <div className="space-y-4 pb-12 font-sans max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-0.5 tracking-tight">
            {greeting}, {user?.firstName || "User"} <span className="inline-block hover:animate-wave">👋</span>
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Here&apos;s what&apos;s happening with your finances today.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Link href="/transaction/create">
              <Button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white rounded-xl px-4 h-9 text-xs font-semibold shadow-sm w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-1.5" />
                Add Transaction
              </Button>
            </Link>
            <div className="w-9 h-9 rounded-full bg-purple-100 text-[#6b46c1] flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ml-1 hidden sm:flex border border-purple-200">
              {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Stats Cards */}
      <StatsCards accounts={accounts || []} transactions={transactions || []} />

      {/* Row 2: Recent Transactions, AI Insights, Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentTransactions transactions={transactions || []} />
        <AIInsights transactions={transactions || []} />
        <Goals goals={goals || []} />
      </div>

      {/* Row 4: Your Accounts */}
      <AccountCarousel accounts={accounts} />

    </div>
  );
}
