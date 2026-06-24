import { Suspense } from "react";
import { Bell, Download, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ReportsOverview } from "./_components/reports-overview";
import { IncomeExpenseChart } from "./_components/income-expense-chart";
import { SpendingBreakdown } from "./_components/spending-breakdown";
import { CashFlowChart } from "./_components/cash-flow-chart";
import { TopSpending } from "./_components/top-spending";
import { MonthlyComparisonChart } from "./_components/monthly-comparison-chart";
import { ReportsInsights } from "./_components/reports-insights";
import { ExportReports } from "./_components/export-reports";

import { getDashboardData } from "@/actions/dashboard";

export default async function ReportsPage() {
  const transactions = await getDashboardData();
  const tabs = ["Overview", "Spending", "Income", "Cash Flow", "Net Worth", "Taxes", "Custom"];

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
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Picker Button */}
          <button className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 h-10 text-[12px] font-bold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4 text-slate-400" />
            Jun 1 - Jun 30, 2026
            <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
          </button>

          {/* Download Button */}
          <button className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 h-10 text-[12px] font-bold shadow-sm flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4 text-slate-400" />
            Download
          </button>

          <button className="relative w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm shrink-0">
            <Bell className="w-[18px] h-[18px]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-100 mb-6 overflow-x-auto hide-scrollbar">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`pb-3 text-[12px] font-bold transition-colors relative whitespace-nowrap ${
              i === 0 ? "text-[#6b46c1]" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {tab}
            {i === 0 && (
              <div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-[#6b46c1] rounded-t-full" />
            )}
          </button>
        ))}
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

      {/* Row 3: Cash Flow, Top Spending, Monthly Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <CashFlowChart transactions={transactions} />
        <TopSpending transactions={transactions} />
        <MonthlyComparisonChart transactions={transactions} />
      </div>

      {/* Row 4: Insights & Export */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7">
          <ReportsInsights transactions={transactions} />
        </div>
        <div className="xl:col-span-5">
          <ExportReports />
        </div>
      </div>
    </div>
  );
}
