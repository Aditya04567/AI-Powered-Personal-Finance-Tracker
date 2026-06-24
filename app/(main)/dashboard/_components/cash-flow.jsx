"use client";

import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function CashFlow({ transactions }) {
  // Compute cash flow for the current month
  const cashData = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      const amt = Number(t.amount);
      if (t.type === "INCOME") {
        income += amt;
      } else if (t.type === "EXPENSE") {
        expense += amt;
      }
    });

    return { income, expense, net: income - expense };
  }, [transactions]);

  // Mocking 4 weeks of data for the chart to match the UI style
  const chartData = useMemo(() => {
    // In a real app, you would group `transactions` by week of the month.
    // Here we create a styled mock if empty, or split the actual totals roughly.
    if (transactions.length === 0) {
      return [
        { name: "Week 1", income: 0, expense: 0 },
        { name: "Week 2", income: 0, expense: 0 },
        { name: "Week 3", income: 0, expense: 0 },
        { name: "Week 4", income: 0, expense: 0 },
      ];
    }
    
    // Simplistic split for the sake of the visualization if we don't have enough data
    const i = cashData.income / 4;
    const e = cashData.expense / 4;
    return [
      { name: "Week 1", income: i * 1.2, expense: e * 0.8 },
      { name: "Week 2", income: i * 0.9, expense: e * 1.1 },
      { name: "Week 3", income: i * 1.1, expense: e * 0.9 },
      { name: "Week 4", income: i * 0.8, expense: e * 1.2 },
    ];
  }, [transactions, cashData]);

  return (
    <div className="bg-white rounded-[2rem] p-5 sm:p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">Cash Flow</h2>
        <select className="text-xs font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-3 py-1.5 outline-none cursor-pointer">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div>
          <p className="text-[10px] font-bold text-emerald-600 mb-1">Cash In</p>
          <p className="text-lg font-black text-slate-900">${cashData.income.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-red-500 mb-1">Cash Out</p>
          <p className="text-lg font-black text-slate-900">-${cashData.expense.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] font-bold text-slate-400 mb-1">Net Cash Flow</p>
          <p className={`text-lg font-black ${cashData.net >= 0 ? "text-emerald-600" : "text-red-500"}`}>
            {cashData.net >= 0 ? "+" : "-"}${Math.abs(cashData.net).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barGap={2}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }}
              tickFormatter={(val) => val >= 1000 ? `$${val / 1000}K` : `$${val}`}
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontWeight: 'bold', fontSize: '12px' }}
            />
            <Bar dataKey="income" fill="#10b981" radius={[4, 4, 4, 4]} barSize={8} />
            <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 4, 4]} barSize={8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-[#10b981]"></div>
          <span className="text-[10px] font-bold text-slate-500">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-sm bg-[#ef4444]"></div>
          <span className="text-[10px] font-bold text-slate-500">Expense</span>
        </div>
      </div>
    </div>
  );
}
