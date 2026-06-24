"use client";

import Link from "next/link";
import { Coffee, Plane, ShoppingBag, Zap, MoreHorizontal } from "lucide-react";

export function BudgetProgress() {
  const mockBudgets = [
    {
      name: "Food & Dining",
      spent: 220,
      limit: 400,
      icon: Coffee,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      progressColor: "bg-[#10b981]",
    },
    {
      name: "Transport",
      spent: 80,
      limit: 150,
      icon: Plane,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      progressColor: "bg-[#f59e0b]",
    },
    {
      name: "Shopping",
      spent: 150,
      limit: 300,
      icon: ShoppingBag,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
      progressColor: "bg-[#ef4444]",
    },
    {
      name: "Entertainment",
      spent: 60,
      limit: 100,
      icon: Zap,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
      progressColor: "bg-[#10b981]",
    },
    {
      name: "Others",
      spent: 90,
      limit: 200,
      icon: MoreHorizontal,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      progressColor: "bg-[#8b5cf6]",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-4 sm:p-5 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Budget Status</h2>
        <select className="text-xs font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1 outline-none cursor-pointer">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="space-y-4 flex-1">
        {mockBudgets.map((budget, i) => {
          const percent = Math.min(Math.round((budget.spent / budget.limit) * 100), 100);
          return (
            <div key={i} className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${budget.iconBg} ${budget.iconColor}`}>
                <budget.icon className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold text-slate-900 truncate">{budget.name}</p>
                  <p className="text-[10px] font-bold text-[#10b981]">{percent}%</p>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${budget.progressColor}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <p className="text-[10px] font-semibold text-slate-400 mt-1.5 text-right">
                  ${budget.spent} / ${budget.limit}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <Link href="/budgets" className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors inline-flex items-center gap-1">
          Manage Budgets <span>→</span>
        </Link>
      </div>
    </div>
  );
}
