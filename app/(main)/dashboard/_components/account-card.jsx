"use client";

import { CreditCard, Landmark, Wallet, Layers } from "lucide-react";
import Link from "next/link";

export function AccountCard({ account, index = 0 }) {
  const { name, type, balance, id, isDefault } = account;

  const colorSchemes = [
    {
      bg: "bg-[#faf8ff]",
      iconBg: "bg-white",
      iconColor: "text-blue-600",
      icon: Landmark
    },
    {
      bg: "bg-[#f0fdf4]",
      iconBg: "bg-white",
      iconColor: "text-red-600",
      icon: Layers
    },
    {
      bg: "bg-[#fffdf5]",
      iconBg: "bg-white",
      iconColor: "text-amber-500",
      icon: Wallet
    },
    {
      bg: "bg-[#f0f9ff]",
      iconBg: "bg-white",
      iconColor: "text-sky-600",
      icon: CreditCard
    }
  ];

  // Use a stable hash of the account ID so the color doesn't change when order changes
  const hash = (id || "").split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const scheme = colorSchemes[hash % colorSchemes.length];
  const Icon = scheme.icon;

  return (
    <Link href={`/account/${id}`} className="shrink-0 block">
      <div className={`w-[260px] h-[100px] ${scheme.bg} rounded-2xl p-4 flex items-center gap-4 transition-transform hover:scale-[1.02] border border-slate-50/50`}>
        <div className={`w-12 h-12 rounded-2xl ${scheme.iconBg} ${scheme.iconColor} shadow-sm flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-slate-900 truncate pr-2">{name}</h3>
            {isDefault && (
              <span className="text-[8px] font-bold bg-purple-100 text-[#6b46c1] px-1.5 py-0.5 rounded uppercase tracking-wide">
                Default
              </span>
            )}
          </div>
          <p className="text-[10px] font-semibold text-slate-400 capitalize mb-1 truncate">{type} Account</p>
          <div className="text-sm font-black text-slate-900">
            ${parseFloat(balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </Link>
  );
}
