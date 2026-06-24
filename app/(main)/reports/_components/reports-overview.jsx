"use client";

import { WalletCards, TrendingDown, TrendingUp, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function ReportsOverview({ transactions = [] }) {
  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount), 0);
  const netSavings = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netSavings / totalIncome) * 100 : 0;

  const stats = [
    {
      title: "Total Income",
      value: `$${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "All time",
      growth: "",
      growthType: "positive",
      icon: WalletCards,
      iconColor: "text-[#6b46c1]",
      iconBg: "bg-purple-50",
    },
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "All time",
      growth: "",
      growthType: "positive",
      growthDir: "down",
      icon: TrendingDown,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
    },
    {
      title: "Net Savings",
      value: `$${netSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
      subtext: "All time",
      growth: "",
      growthType: netSavings >= 0 ? "positive" : "negative",
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
    {
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}%`,
      subtext: "All time",
      growth: "",
      growthType: savingsRate >= 20 ? "positive" : "negative",
      icon: PieChart,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex items-center gap-5 hover:border-purple-100 transition-colors group cursor-pointer"
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${stat.iconBg} ${stat.iconColor} shadow-inner`}>
            <stat.icon className="w-6 h-6" />
          </div>
          
          <div>
            <p className="text-[11px] font-bold text-slate-500 mb-0.5">{stat.title}</p>
            <h3 className="text-[22px] font-black text-slate-900 tracking-tight mb-0.5">
              {stat.value}
            </h3>
            
            <div className="flex items-center gap-1.5 mt-1">
              {stat.growth && (
                <span className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  stat.growthType === "positive" ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
                }`}>
                  {stat.growthDir === "down" ? (
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  ) : (
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  )}
                  {stat.growth}
                </span>
              )}
              <span className="text-[10px] font-semibold text-slate-400">
                {stat.subtext}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
