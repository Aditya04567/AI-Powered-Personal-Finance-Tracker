"use client";

import { ChevronDown } from "lucide-react";

export function TransactionSummary({ transactions }) {
  // Using mock data matching the image for visual accuracy
  const income = 20000.00;
  const expense = 100.00;
  const net = 19900.00;
  const savingsRate = 99.5;

  return (
    <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[13px] font-bold text-slate-900 tracking-tight">Transaction Summary</h2>
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1 outline-none cursor-pointer">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="space-y-4">
          <div>
            <p className="text-[10px] font-semibold text-slate-500 mb-0.5">Income</p>
            <p className="text-sm font-bold text-emerald-600">${income.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500 mb-0.5">Expense</p>
            <p className="text-sm font-bold text-red-500">${expense.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500 mb-0.5">Net</p>
            <p className="text-sm font-bold text-emerald-600">${net.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        {/* Circular Progress */}
        <div className="relative w-[100px] h-[100px] shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray={`${(savingsRate / 100) * 251.2} 251.2`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-0.5">
            <span className="text-sm font-black text-slate-900">{savingsRate}%</span>
            <span className="text-[8px] font-bold text-slate-500 leading-tight">Savings<br/>Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
}
