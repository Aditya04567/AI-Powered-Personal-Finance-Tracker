import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Bell } from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import { StatsCards } from "./_components/stats-cards";
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

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  // Determine greeting based on time (optional simple logic, defaults to Evening for demo)
  const greeting = "Good evening";

  return (
    <div className="space-y-8 pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1 tracking-tight">
            {greeting}, {user?.firstName || "User"} <span className="inline-block hover:animate-wave">👋</span>
          </h1>
          <p className="text-xs sm:text-sm font-medium text-slate-500">
            Here&apos;s what&apos;s happening with your finances today.
          </p>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4 self-start sm:self-auto">
          <button className="w-9 h-9 sm:w-10 sm:h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm shrink-0">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <Link href="/transaction/create">
            <Button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white rounded-xl px-4 sm:px-5 h-9 sm:h-10 text-xs sm:text-sm font-semibold shadow-sm w-full sm:w-auto">
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Add Transaction
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <StatsCards accounts={accounts || []} transactions={transactions || []} />

      {/* Budget Progress */}
      <div className="mb-8">
        <BudgetProgress
          initialBudget={budgetData?.budget}
          currentExpenses={budgetData?.currentExpenses || 0}
        />
      </div>

      {/* Transactions & Breakdown */}
      <DashboardOverview
        accounts={accounts || []}
        transactions={transactions || []}
      />

      {/* Accounts Grid */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-5 bg-[#6b46c1] rounded-full"></div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Your Accounts</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CreateAccountDrawer>
            <div className="h-full bg-[#f9fafb] rounded-[1.5rem] p-6 border-2 border-dashed border-slate-200 hover:border-[#6b46c1] hover:bg-purple-50/30 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[180px]">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#6b46c1] mb-4 shadow-sm">
                <Plus className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-600">Add New Account</p>
            </div>
          </CreateAccountDrawer>
          {accounts?.length > 0 &&
            accounts?.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
        </div>
      </div>
    </div>
  );
}
