"use client";

import { Home, Sprout, Receipt, CreditCard, Sparkles } from "lucide-react";

export function ReportsInsights({ transactions = [] }) {
  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount), 0);
  const netCashFlow = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netCashFlow / totalIncome) * 100 : 0;

  const insights = [
    {
      title: "Spending Insight",
      description: `You spent $${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })} across all your accounts.`,
      badge: "Tracked",
      badgeColor: "bg-purple-50 text-[#6b46c1]",
      icon: Home,
      iconColor: "text-[#6b46c1]",
      iconBg: "bg-purple-50",
    },
    {
      title: "Savings Insight",
      description: `Your savings rate is ${savingsRate.toFixed(1)}%.`,
      badge: savingsRate >= 20 ? "Excellent" : "Needs Work",
      badgeColor: savingsRate >= 20 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600",
      icon: Sprout,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Cash Flow Insight",
      description: netCashFlow >= 0 ? "Your cash flow is positive." : "Your expenses exceed your income.",
      badge: netCashFlow >= 0 ? "Great" : "Warning",
      badgeColor: netCashFlow >= 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600",
      icon: CreditCard,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <h2 className="text-[15px] font-bold text-slate-900 tracking-tight mb-6">Reports & Insights</h2>
      
      <div className="space-y-4 flex-1">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${insight.iconBg} ${insight.iconColor} shadow-inner`}>
                <insight.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-slate-900 mb-0.5">{insight.title}</h3>
                <p className="text-[11px] font-semibold text-slate-500">{insight.description}</p>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${insight.badgeColor}`}>
                {insight.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Analysis Banner */}
      <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-100 flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[14px] font-black text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#6b46c1]" fill="#6b46c1" /> AI Analysis
            </h3>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-[#6b46c1]">
              Beta
            </span>
          </div>
          <p className="text-[11px] font-semibold text-slate-600">
            Your financial health score improved by <span className="font-black text-slate-900">18 points</span> this month!
          </p>
        </div>

        {/* Score Circle */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-200"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-[#6b46c1]"
                  strokeDasharray="82, 100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
             </svg>
             <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[13px] font-black text-slate-900 leading-none">82</span>
                <span className="text-[7px] font-bold text-slate-400">/100</span>
             </div>
          </div>
          
          {/* Mini line chart decorative */}
          <div className="hidden sm:block w-24 h-8 text-[#6b46c1] opacity-70">
             <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full stroke-current" fill="none" strokeWidth="2">
                <path d="M0,25 C20,20 30,28 40,15 C50,5 60,20 70,10 C80,0 90,15 100,5" strokeLinecap="round" strokeLinejoin="round" />
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
