"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from "recharts";
import { Star, ChevronDown } from "lucide-react";

export function CashFlowChart({ transactions = [] }) {
  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount), 0);
  const netCashFlow = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (netCashFlow / totalIncome) * 100 : 0;

  const data = [
    { name: 'Income', value: totalIncome, color: '#10b981' },
    { name: 'Expenses', value: -totalExpenses, color: '#f43f5e' },
    { name: 'Savings', value: netCashFlow > 0 ? netCashFlow : 0, color: '#10b981' },
    { name: 'Net Cash Flow', value: netCashFlow, color: '#6b46c1' },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Cash Flow Overview</h2>
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1.5 outline-none cursor-pointer appearance-none pr-6 relative">
          <option>This Month</option>
          <option>Last Month</option>
        </select>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">${netCashFlow.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h3>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${netCashFlow >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
            {netCashFlow >= 0 ? 'Positive' : 'Negative'}
          </span>
        </div>
        <p className="text-[11px] font-bold text-slate-500">Net Cash Flow</p>
      </div>

      <div className="h-[200px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 0, left: -25, bottom: 0 }}
            barSize={24}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 9, fontWeight: 700 }}
              dy={10}
              interval={0}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value) => `$${Math.abs(value) / 1000}K`}
            />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Success Banner */}
      <div className={`mt-auto rounded-xl p-3 flex items-center gap-3 ${netCashFlow >= 0 ? 'bg-emerald-50' : 'bg-rose-50'}`}>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${netCashFlow >= 0 ? 'bg-emerald-100' : 'bg-rose-100'}`}>
          <Star className={`w-3 h-3 ${netCashFlow >= 0 ? 'text-emerald-600 fill-emerald-600' : 'text-rose-600 fill-rose-600'}`} />
        </div>
        <p className={`text-[11px] font-bold ${netCashFlow >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
          {netCashFlow >= 0 
            ? `Great job! You saved ${savingsRate.toFixed(1)}% of your income this month.` 
            : `Careful! Your expenses exceeded your income by $${Math.abs(netCashFlow).toLocaleString("en-US", { minimumFractionDigits: 2 })}.`}
        </p>
      </div>
    </div>
  );
}
