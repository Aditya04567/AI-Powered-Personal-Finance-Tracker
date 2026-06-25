import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { Plus, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateAccountDrawer } from "@/components/create-account-drawer";

import { AccountOverview } from "./_components/account-overview";
import { AccountsList } from "./_components/accounts-list";
import { QuickActions } from "./_components/quick-actions";
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
          <CreateAccountDrawer>
            <Button className="bg-[#6b46c1] hover:bg-[#553c9a] text-white rounded-xl px-4 h-10 text-[13px] font-bold shadow-sm w-full sm:w-auto flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Account
              <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
            </Button>
          </CreateAccountDrawer>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column (Wider) */}
        <div className="xl:col-span-8 space-y-6">
          <AccountOverview accounts={accounts || []} />
          
          <div className="grid grid-cols-1 gap-6">
            <AccountsList accounts={accounts || []} />
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <div className="xl:col-span-4 space-y-6">
          <QuickActions />
          <RecentActivity transactions={transactions || []} accounts={accounts || []} />
        </div>
      </div>
    </div>
  );
}
