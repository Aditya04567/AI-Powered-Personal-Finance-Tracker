import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { TransactionList } from "./_components/transaction-list";
import { TransactionSummary } from "./_components/transaction-summary";
import { TopCategoriesSidebar } from "./_components/top-categories-sidebar";
import { RecentAccountsSidebar } from "./_components/recent-accounts-sidebar";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function TransactionsPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  return (
    <div className="space-y-6 pb-12 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-0.5 tracking-tight">
            Transactions
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Track and manage all your income and expenses.
          </p>
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Transaction List */}
        <div className="lg:col-span-2">
          <TransactionList transactions={transactions || []} accounts={accounts || []} />
        </div>

        {/* Right Column: Sidebars */}
        <div className="lg:col-span-1 space-y-6">
          <TransactionSummary transactions={transactions || []} />
          <TopCategoriesSidebar transactions={transactions || []} />
          <RecentAccountsSidebar accounts={accounts || []} />
        </div>
      </div>
    </div>
  );
}
