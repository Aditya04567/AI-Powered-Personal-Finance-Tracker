"use client";

import { LayoutGrid, List, MoreVertical, Plus, ArrowUpRight, ArrowDownRight, Landmark, Wallet, Banknote } from "lucide-react";
import Link from "next/link";

export function AccountsList({ accounts = [] }) {
  const displayAccounts = accounts.length > 0 ? accounts.map((acc, index) => {
    let icon = Landmark;
    let logoColor = "bg-blue-600";
    
    if (acc.type === "WALLET") {
      icon = Wallet;
      logoColor = "bg-purple-600";
    } else if (acc.type === "CASH") {
      icon = Banknote;
      logoColor = "bg-emerald-500";
    } else {
      // Alternate colors for bank accounts
      const colors = ["bg-blue-600", "bg-orange-500", "bg-rose-600"];
      logoColor = colors[index % colors.length];
    }

    return {
      id: acc.id,
      name: acc.name,
      type: acc.type === "SAVINGS" ? "Savings Account" : acc.type === "CURRENT" ? "Current Account" : acc.type === "WALLET" ? "Wallet" : "Physical Cash",
      number: acc.number || null,
      balance: Number(acc.balance),
      isDefault: acc.isDefault,
      growth: "",
      growthType: "neutral",
      logoColor,
      icon,
    };
  }) : [];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Your Accounts</h2>
        
        {/* View Toggles */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg">
          <button className="w-7 h-7 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button className="w-7 h-7 rounded-md bg-white shadow-sm flex items-center justify-center text-[#6b46c1]">
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-3 flex-1">
        {displayAccounts.map((acc) => (
          <div key={acc.id} className="group relative flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all cursor-pointer bg-white">
            
            {/* Institution Logo */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 shadow-inner ${acc.logoColor}`}>
              <acc.icon className="w-5 h-5" />
            </div>

            {/* Account Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-[13px] font-bold text-slate-900 truncate">{acc.name}</h3>
                {acc.isDefault && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-50 text-[#6b46c1]">
                    Primary
                  </span>
                )}
              </div>
              <div className="flex items-center text-[11px] font-semibold text-slate-500">
                <span>{acc.type}</span>
                {acc.number && (
                  <>
                    <span className="mx-2 text-slate-300">•</span>
                    <span>•••• {acc.number}</span>
                  </>
                )}
              </div>
            </div>

            {/* Balances */}
            <div className="text-right pr-2">
              <p className="text-[14px] font-black text-slate-900 mb-1">
                ${acc.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              
              {acc.growth !== "-" ? (
                <div className={`flex items-center justify-end text-[10px] font-bold ${
                  acc.growthType === "positive" ? "text-emerald-500" : "text-rose-500"
                }`}>
                  {acc.growthType === "positive" ? (
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  )}
                  {acc.growth}
                </div>
              ) : (
                <div className="text-[10px] font-bold text-slate-400">—</div>
              )}
            </div>

            {/* Actions Menu */}
            <button className="text-slate-400 hover:text-[#6b46c1] opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 p-2">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        ))}

        {/* Add New Account Button */}
        <Link href="/account/create">
          <div className="flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-purple-300 hover:bg-purple-50/30 transition-all cursor-pointer group mt-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-[#6b46c1] flex items-center justify-center shrink-0 group-hover:bg-purple-100 transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-slate-900 mb-0.5">Add New Account</h3>
              <p className="text-[11px] font-semibold text-slate-500">Connect a bank or add a manual account</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
