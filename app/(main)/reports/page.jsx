import { Suspense } from "react";
import { Download, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ReportsOverview } from "./_components/reports-overview";
import { IncomeExpenseChart } from "./_components/income-expense-chart";
import { SpendingBreakdown } from "./_components/spending-breakdown";
import { DownloadReportButton } from "./_components/download-report-button";
import { ReportInsights } from "./_components/report-insights";

import { getDashboardData } from "@/actions/dashboard";

export default async function ReportsPage() {
  const transactions = await getDashboardData();

  return (
    <div className="space-y-6 pb-12 font-sans max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-xl sm:text-[22px] font-bold text-slate-900 mb-0.5 tracking-tight">
            Reports
          </h1>
          <p className="text-[13px] font-medium text-slate-500">
            Analyze your finances and make smarter decisions.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DownloadReportButton transactions={transactions} />
        </div>
      </div>

      {/* Overview Row */}
      <ReportsOverview transactions={transactions} />

      {/* Row 2: Income vs Expense & Spending Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7">
          <IncomeExpenseChart transactions={transactions} />
        </div>
        <div className="xl:col-span-5">
          <SpendingBreakdown transactions={transactions} />
        </div>
      </div>
      {/* Row 3: AI Insights */}
      <ReportInsights transactions={transactions || []} />
    </div>
  );
}
