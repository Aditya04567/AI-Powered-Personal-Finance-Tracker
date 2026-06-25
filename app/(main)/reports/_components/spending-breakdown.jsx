"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChevronDown, ArrowRight, Home, Utensils, Car, ShoppingBag, Tv, Zap, LayoutGrid } from "lucide-react";
import Link from "next/link";

export function SpendingBreakdown({ transactions = [] }) {
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
      case "housing": return { color: "#6366f1", icon: Home, iconBg: "bg-indigo-100", iconColor: "text-indigo-600" }; // Indigo
      case "food & dining": return { color: "#f43f5e", icon: Utensils, iconBg: "bg-rose-100", iconColor: "text-rose-600" }; // Rose
      case "transport": return { color: "#f59e0b", icon: Car, iconBg: "bg-amber-100", iconColor: "text-amber-500" }; // Amber
      case "shopping": return { color: "#ec4899", icon: ShoppingBag, iconBg: "bg-pink-100", iconColor: "text-pink-500" }; // Pink
      case "entertainment": return { color: "#8b5cf6", icon: Tv, iconBg: "bg-violet-100", iconColor: "text-violet-600" }; // Violet
      case "utilities": return { color: "#14b8a6", icon: Zap, iconBg: "bg-teal-100", iconColor: "text-teal-500" }; // Teal
      default: return { color: "#0ea5e9", icon: LayoutGrid, iconBg: "bg-sky-100", iconColor: "text-sky-500" }; // Sky Blue
    }
  };

  const data = Object.entries(categoryTotals)
    .map(([name, value]) => ({
      name,
      value,
      percentage: totalExpenses > 0 ? `${((value / totalExpenses) * 100).toFixed(1)}%` : "0%",
      ...getCategoryStyles(name)
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full relative">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Spending Breakdown</h2>
      </div>

      <div className="flex flex-col 2xl:flex-row items-center justify-center gap-6 flex-1 mb-14">
        
        {/* Donut Chart */}
        <div className="relative w-[170px] h-[170px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `$${value.toLocaleString()}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-1">
            <span className="text-[16px] font-black text-slate-900 leading-none mb-1">
              ${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
            <span className="text-[9px] font-bold text-slate-400">Total Expenses</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full space-y-2.5">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between group cursor-pointer min-w-0 gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-6 h-6 rounded flex items-center justify-center ${item.iconBg} ${item.iconColor} group-hover:scale-110 transition-transform shrink-0`}>
                  <item.icon className="w-3 h-3" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 truncate">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-black text-slate-900">${item.value.toFixed(2)}</span>
                <span className="text-[9px] font-bold text-slate-400 w-7 text-right">{item.percentage}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <Link href="/spending" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-purple-50 text-[#6b46c1] text-[12px] font-bold hover:bg-purple-100 transition-colors">
          View Full Report <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
