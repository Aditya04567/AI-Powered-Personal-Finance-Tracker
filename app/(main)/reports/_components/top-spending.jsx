"use client";

import { Home, Utensils, Car, ShoppingBag, Tv, ChevronDown, ArrowRight, LayoutGrid, Zap } from "lucide-react";
import Link from "next/link";

export function TopSpending({ transactions = [] }) {
  const expenses = transactions.filter(t => t.type === 'EXPENSE');
  const totalExpenses = expenses.reduce((acc, t) => acc + Number(t.amount), 0);

  // Group by category
  const categoryTotals = expenses.reduce((acc, t) => {
    const cat = t.category || "Others";
    if (!acc[cat]) acc[cat] = 0;
    acc[cat] += Number(t.amount);
    return acc;
  }, {});

  // Assign styles based on category
  const getCategoryStyles = (category) => {
    switch(category?.toLowerCase()) {
      case "housing": return { icon: Home, iconBg: "bg-purple-100", iconColor: "text-[#6b46c1]", barColor: "bg-[#6b46c1]" };
      case "food & dining": return { icon: Utensils, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", barColor: "bg-emerald-500" };
      case "transport": return { icon: Car, iconBg: "bg-blue-100", iconColor: "text-blue-600", barColor: "bg-blue-500" };
      case "shopping": return { icon: ShoppingBag, iconBg: "bg-amber-100", iconColor: "text-amber-500", barColor: "bg-amber-500" };
      case "entertainment": return { icon: Tv, iconBg: "bg-purple-100", iconColor: "text-[#6b46c1]", barColor: "bg-[#6b46c1]" };
      case "utilities": return { icon: Zap, iconBg: "bg-fuchsia-100", iconColor: "text-fuchsia-500", barColor: "bg-fuchsia-500" };
      default: return { icon: LayoutGrid, iconBg: "bg-slate-100", iconColor: "text-slate-500", barColor: "bg-slate-400" };
    }
  };

  const categories = Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalExpenses > 0 ? ((value / totalExpenses) * 100).toFixed(1) : "0",
      ...getCategoryStyles(name)
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Top Spending Categories</h2>
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1.5 outline-none cursor-pointer appearance-none pr-6 relative">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="space-y-5 flex-1 mb-16">
        {categories.map((cat, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${cat.iconBg} ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-4 h-4" />
                </div>
                <span className="text-[12px] font-bold text-slate-900">{cat.name}</span>
              </div>
              <div className="text-right">
                <span className="block text-[12px] font-black text-slate-900">
                  ${cat.value.toFixed(2)}
                </span>
                <span className="block text-[9px] font-bold text-slate-400">
                  {cat.percentage}%
                </span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden ml-11" style={{ width: 'calc(100% - 44px)' }}>
              <div 
                className={`h-full rounded-full ${cat.barColor}`} 
                style={{ width: `${cat.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <Link href="/spending/categories" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-50 text-[#6b46c1] text-[12px] font-bold hover:bg-purple-100 transition-colors">
          View Full Categories <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
