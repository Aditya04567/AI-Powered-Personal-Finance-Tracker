import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { Bell, Plus, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { AccountOverview } from "./_components/account-overview";
import { AccountsList } from "./_components/accounts-list";
import { BalanceTrend } from "./_components/balance-trend";
import { AccountDistribution } from "./_components/account-distribution";
import { QuickActions } from "./_components/quick-actions";
import { UpcomingBills } from "./_components/upcoming-bills";
import { RecentActivity } from "./_components/recent-activity";

export default async function AccountsPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  return (
    <div className="space-y-6 pb-12 font-sans max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-[22px] font-bold text-slate-900 mb-0.5 tracking-tight">
            Accounts
          </h1>
          <p className="text-[13px] font-medium text-slate-500">
            Manage all your bank accounts, wallets and cash.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm shrink-0">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          
          <Link href="/account/create">
            <Button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white rounded-xl px-4 h-10 text-[13px] font-bold shadow-sm w-full sm:w-auto flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Account
              <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (Wider) */}
        <div className="xl:col-span-8 space-y-6">
          <AccountOverview accounts={accounts || []} />
          
          <div className="grid grid-cols-1 gap-6">
            <AccountsList accounts={accounts || []} />
            <UpcomingBills />
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="xl:col-span-4 space-y-6">
          <BalanceTrend />
          <AccountDistribution accounts={accounts || []} />
          <QuickActions />
          <RecentActivity transactions={transactions || []} accounts={accounts || []} />
        </div>
      </div>
    </div>
  );
}
