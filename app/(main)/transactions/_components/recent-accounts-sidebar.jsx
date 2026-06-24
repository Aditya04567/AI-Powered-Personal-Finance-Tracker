"use client";

import Link from "next/link";
import { Landmark, Wallet, Banknote } from "lucide-react";

export function RecentAccountsSidebar({ accounts }) {
  // Using mock data matching the image for visual accuracy
  const recentAccounts = [
    {
      name: "HDFC Bank",
      type: "Savings Account",
      balance: 20900.00,
      icon: Landmark,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      name: "Wallet",
      type: "My Wallet",
      balance: 1250.00,
      icon: Wallet,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      name: "Cash",
      type: "Physical Cash",
      balance: 350.00,
      icon: Banknote,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[13px] font-bold text-slate-900 tracking-tight">Recent Accounts</h2>
        <Link href="/account" className="text-[10px] font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-5">
        {recentAccounts.map((acc, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${acc.bg} ${acc.color}`}>
              <acc.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900 truncate">{acc.name}</p>
                <p className="text-[10px] font-semibold text-slate-400 mt-0.5">{acc.type}</p>
              </div>
              <div className="text-sm font-black text-slate-900">
                ${acc.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
