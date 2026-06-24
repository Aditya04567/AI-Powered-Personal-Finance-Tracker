"use client";

import Link from "next/link";
import { Landmark, ShoppingBag, ArrowRightLeft } from "lucide-react";

export function RecentActivity({ transactions = [], accounts = [] }) {
  // Sort by date descending and take top 5
  const recentTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const activities = recentTransactions.map(t => {
    const account = accounts.find(a => a.id === t.accountId);
    const isIncome = t.type === "INCOME";
    
    let icon = isIncome ? Landmark : ShoppingBag;
    let iconColor = isIncome ? "text-emerald-500" : "text-amber-500";
    let iconBg = isIncome ? "bg-emerald-50" : "bg-amber-50";

    return {
      id: t.id,
      title: t.description || t.category,
      account: account ? account.name : "Unknown Account",
      amount: isIncome ? Number(t.amount) : -Number(t.amount),
      type: isIncome ? "income" : "expense",
      dateStr: new Date(t.date).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "numeric" }),
      icon,
      iconColor,
      iconBg,
    };
  });

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Recent Activity</h2>
        <Link href="/transactions" className="text-[11px] font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors">
            
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${activity.iconBg} ${activity.iconColor} shadow-inner`}>
                <activity.icon className="w-4 h-4" />
              </div>
              
              <div>
                <h3 className="text-[12px] font-bold text-slate-900 mb-0.5">{activity.title}</h3>
                <p className="text-[10px] font-semibold text-slate-500">{activity.account}</p>
              </div>
            </div>

            <div className="text-right">
              <p className={`text-[12px] font-black mb-0.5 ${activity.type === 'income' ? 'text-emerald-600' : 'text-red-500'}`}>
                {activity.type === 'income' ? '+' : '-'} ${Math.abs(activity.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[9px] font-semibold text-slate-400">
                {activity.dateStr}
              </p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
