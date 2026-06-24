"use client";

import { WalletCards, Landmark, Wallet, Banknote, ArrowUpRight } from "lucide-react";

export function AccountOverview({ accounts = [] }) {
  const totalBalance = accounts.reduce((acc, account) => acc + Number(account.balance), 0);
  
  const bankAccounts = accounts.filter(a => a.type === "SAVINGS" || a.type === "CURRENT");
  const bankBalance = bankAccounts.reduce((acc, account) => acc + Number(account.balance), 0);

  const wallets = accounts.filter(a => a.type === "WALLET");
  const walletBalance = wallets.reduce((acc, account) => acc + Number(account.balance), 0);

  const cashAccounts = accounts.filter(a => a.type === "CASH");
  const cashBalance = cashAccounts.reduce((acc, account) => acc + Number(account.balance), 0);

  const stats = [
    {
      title: "Total Balance",
      amount: totalBalance,
      subtext: "All accounts",
      growth: "", // Mocking growth as we don't track historical balance yet
      icon: WalletCards,
      iconColor: "text-[#6b46c1]",
      iconBg: "bg-purple-50",
    },
    {
      title: "Bank Accounts",
      amount: bankBalance,
      subtext: `${bankAccounts.length} Accounts`,
      icon: Landmark,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      title: "Wallets",
      amount: walletBalance,
      subtext: `${wallets.length} Wallets`,
      icon: Wallet,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
    {
      title: "Cash",
      amount: cashBalance,
      subtext: "Physical Cash",
      icon: Banknote,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 relative overflow-hidden">
      <div className="absolute top-0 left-6 w-16 h-1 bg-slate-100 rounded-b-full"></div>
      <h2 className="text-[15px] font-bold text-slate-900 tracking-tight mb-5">Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="flex flex-col p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${stat.iconBg} ${stat.iconColor}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            
            <p className="text-[11px] font-bold text-slate-500 mb-1">{stat.title}</p>
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">
              ${stat.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h3>
            
            <div className="flex items-center gap-1 mt-auto">
              {stat.growth && (
                <span className="flex items-center text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  {stat.growth}
                </span>
              )}
              <span className="text-[10px] font-semibold text-slate-400">
                {stat.subtext}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
