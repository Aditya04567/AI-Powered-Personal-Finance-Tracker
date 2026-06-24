"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ShoppingBag, Coffee, Laptop, Home, Plane, Zap, ArrowUp, ArrowDown } from "lucide-react";

export function RecentTransactions({ transactions }) {
  // Sort by date desc and take top 4
  const recent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
        <Link href="/transactions" className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-5 flex-1">
        {recent.length > 0 ? (
          recent.map((t) => (
            <div key={t.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm ${getCategoryColor(t.category)}`}>
                  {getCategoryIcon(t.category)}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.description || "Transaction"}</p>
                  <p className="text-[10px] font-semibold text-slate-500">{t.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${t.type === "INCOME" ? "text-emerald-600" : "text-slate-900"}`}>
                  {t.type === "INCOME" ? "+" : "-"}${Number(t.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] font-semibold text-slate-400">
                  {format(new Date(t.date), "MMM d, yyyy")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-400 font-medium">No recent transactions.</p>
        )}
      </div>

      <div className="mt-5">
        <Link href="/transactions" className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors inline-flex items-center gap-1">
          View All Transactions <span>→</span>
        </Link>
      </div>
    </div>
  );
}

function getCategoryColor(category) {
  const c = category?.toLowerCase();
  if (c?.includes("shopping")) return "bg-[#f59e0b]";
  if (c?.includes("entertainment")) return "bg-[#10b981]";
  if (c?.includes("salary") || c?.includes("income")) return "bg-[#8b5cf6]";
  if (c?.includes("food") || c?.includes("dining")) return "bg-[#ef4444]";
  if (c?.includes("transport")) return "bg-[#3b82f6]";
  return "bg-slate-800";
}

function getCategoryIcon(category) {
  const c = category?.toLowerCase();
  if (c?.includes("shopping")) return <ShoppingBag className="w-4 h-4" />;
  if (c?.includes("entertainment")) return <Zap className="w-4 h-4" />;
  if (c?.includes("salary") || c?.includes("income")) return <ArrowUp className="w-4 h-4" />;
  if (c?.includes("food") || c?.includes("dining")) return <Coffee className="w-4 h-4" />;
  if (c?.includes("transport")) return <Plane className="w-4 h-4" />;
  return <ArrowDown className="w-4 h-4" />;
}
