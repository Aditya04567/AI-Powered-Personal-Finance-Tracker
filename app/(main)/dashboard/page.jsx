import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { Goals } from "./_components/goals";
import { StatsCards } from "./_components/stats-cards";
import { SpendingOverview } from "./_components/spending-overview";
import { RecentTransactions } from "./_components/recent-transactions";
import { AIInsights } from "./_components/ai-insights";
import { CashFlow } from "./_components/cash-flow";
import { AccountCarousel } from "./_components/account-carousel";
import { Plus, Bell, Search, Command } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
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
          {/* Mock Search Bar */}
          <div className="relative flex-1 sm:flex-none sm:min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full h-9 pl-9 pr-12 rounded-xl border border-slate-200 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all shadow-sm placeholder:text-slate-400"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-slate-100 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-500">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm shrink-0">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
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

      {/* Row 2: Spending Overview & Cash Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SpendingOverview transactions={transactions || []} />
        </div>
        <div className="lg:col-span-1">
          <CashFlow transactions={transactions || []} />
        </div>
      </div>

      {/* Row 3: Recent Transactions, AI Insights, Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentTransactions transactions={transactions || []} />
        <AIInsights />
        <Goals />
      </div>

      {/* Row 4: Your Accounts */}
      <AccountCarousel accounts={accounts} />

    </div>
  );
}
