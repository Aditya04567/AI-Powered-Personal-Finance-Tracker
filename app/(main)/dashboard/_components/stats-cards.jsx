"use client";

import { Wallet, ArrowUpRight, ArrowDownRight, PiggyBank } from "lucide-react";

export function StatsCards({ accounts, transactions }) {
  // 1. Calculate Total Balance
  const totalBalance = accounts.reduce((sum, account) => sum + (account.balance || 0), 0);

  // 2. Calculate Monthly Income, Expenses, Savings
  const currentDate = new Date();
  const currentMonthTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
  });

  const lastMonthTransactions = transactions.filter((t) => {
    const d = new Date(t.date);
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    return d.getMonth() === lastMonth.getMonth() && d.getFullYear() === lastMonth.getFullYear();
  });

  const monthlyIncome = currentMonthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthlyExpenses = currentMonthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthlySavings = monthlyIncome - monthlyExpenses;

  const lastMonthIncome = lastMonthTransactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const lastMonthExpenses = lastMonthTransactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const lastMonthSavings = lastMonthIncome - lastMonthExpenses;

  // Helper to format percentage change
  const formatChange = (current, previous) => {
    if (previous === 0) return current > 0 ? "+100%" : "0%";
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
  };

  const incomeChange = formatChange(monthlyIncome, lastMonthIncome);
  const expenseChange = formatChange(monthlyExpenses, lastMonthExpenses);
  const savingsChange = formatChange(monthlySavings, lastMonthSavings);
  
  // Total balance doesn't have "last month" easily unless we track history, so let's mock it lightly or derive it.
  const balanceChange = formatChange(totalBalance, totalBalance - monthlySavings);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
      {/* Total Balance Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden h-[140px]">
        <div className="flex justify-between items-start mb-2 z-10">
          <p className="text-xs font-semibold text-slate-500">Total Balance</p>
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-[#8b5cf6] flex items-center justify-center">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-4 z-10 tracking-tight">
          ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
        <div className="flex items-end justify-between mt-auto z-10">
          <p className={`text-[10px] font-bold ${balanceChange.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>{balanceChange} <span className="text-slate-400 font-semibold">from last month</span></p>
          
          <div className="w-20 h-8 opacity-90">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path d="M0,35 Q10,25 20,30 T40,20 T60,25 T80,10 T100,5" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Monthly Income Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden h-[140px]">
        <div className="flex justify-between items-start mb-2 z-10">
          <p className="text-xs font-semibold text-slate-500">Monthly Income</p>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#10b981] flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-4 z-10 tracking-tight">
          ${monthlyIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
        <div className="flex items-end justify-between mt-auto z-10">
          <p className={`text-[10px] font-bold ${incomeChange.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>{incomeChange} <span className="text-slate-400 font-semibold">from last month</span></p>
          
          <div className="w-20 h-8 opacity-90">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path d="M0,30 Q10,35 20,20 T40,25 T60,15 T80,20 T100,5" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Monthly Expenses Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden h-[140px]">
        <div className="flex justify-between items-start mb-2 z-10">
          <p className="text-xs font-semibold text-slate-500">Monthly Expenses</p>
          <div className="w-8 h-8 rounded-lg bg-red-50 text-[#ef4444] flex items-center justify-center">
            <ArrowDownRight className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-xl font-black text-[#ef4444] mb-4 z-10 tracking-tight">
          ${monthlyExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
        <div className="flex items-end justify-between mt-auto z-10">
          <p className={`text-[10px] font-bold ${expenseChange.startsWith("+") ? "text-red-500" : "text-emerald-500"}`}>{expenseChange} <span className="text-slate-400 font-semibold">from last month</span></p>
          
          <div className="w-20 h-8 opacity-90">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path d="M0,10 Q10,5 20,15 T40,10 T60,25 T80,20 T100,35" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Monthly Savings Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden h-[140px]">
        <div className="flex justify-between items-start mb-2 z-10">
          <p className="text-xs font-semibold text-slate-500">Monthly Savings</p>
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#3b82f6] flex items-center justify-center">
            <PiggyBank className="w-4 h-4" />
          </div>
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-4 z-10 tracking-tight">
          ${Math.max(monthlySavings, 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </h2>
        <div className="flex items-end justify-between mt-auto z-10">
          <p className={`text-[10px] font-bold ${savingsChange.startsWith("+") ? "text-emerald-500" : "text-red-500"}`}>{savingsChange} <span className="text-slate-400 font-semibold">from last month</span></p>
          
          <div className="w-20 h-8 opacity-90">
            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
              <path d="M0,35 Q10,25 20,30 T40,20 T60,25 T80,10 T100,5" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}
