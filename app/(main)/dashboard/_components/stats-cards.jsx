"use client";

import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatsCards({ accounts, transactions }) {
  // 1. Calculate Total Balance
  const totalBalance = accounts.reduce((sum, account) => sum + (account.balance || 0), 0);

  // 2. Calculate Monthly Income and Expenses
  const currentDate = new Date();
  const currentMonthTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
  });

  const monthlyIncome = currentMonthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0);

  const monthlyExpenses = currentMonthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
      {/* Total Balance Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-start mb-2 z-10">
          <p className="text-sm font-semibold text-slate-500">Total Balance</p>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6 z-10">
          ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
        <div className="flex items-end justify-between mt-auto z-10">
          <p className="text-xs font-bold text-emerald-500">+6.5% from last month</p>
          
          {/* Decorative Mini Chart */}
          <div className="w-20 h-10 opacity-70">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path d="M0,35 Q10,25 20,30 T40,20 T60,25 T80,10 T100,5" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Monthly Income Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-start mb-2 z-10">
          <p className="text-sm font-semibold text-slate-500">Monthly Income</p>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-6 z-10">
          ${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
        <div className="flex items-end justify-between mt-auto z-10">
          <p className="text-xs font-bold text-emerald-500">+12% from last month</p>
          
          {/* Decorative Mini Chart */}
          <div className="w-20 h-10 opacity-70">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path d="M0,30 Q10,35 20,20 T40,25 T60,15 T80,20 T100,5" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Monthly Expenses Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-start mb-2 z-10">
          <p className="text-sm font-semibold text-slate-500">Monthly Expenses</p>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-red-600 mb-6 z-10">
          -${monthlyExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
        <div className="flex items-end justify-between mt-auto z-10">
          <p className="text-xs font-bold text-red-500">-5% from last month</p>
          
          {/* Decorative Mini Chart */}
          <div className="w-20 h-10 opacity-70">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path d="M0,10 Q10,5 20,15 T40,10 T60,25 T80,20 T100,35" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
