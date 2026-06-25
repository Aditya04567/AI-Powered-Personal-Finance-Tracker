"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function IncomeExpenseChart({ transactions = [] }) {
  // Group by month
  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleDateString('en-US', { month: 'short' });
    if (!acc[month]) acc[month] = { date: month, income: 0, expense: 0 };
    if (t.type === 'INCOME') acc[month].income += Number(t.amount);
    if (t.type === 'EXPENSE') acc[month].expense += Number(t.amount);
    return acc;
  }, {});

  // Sort months properly or just use object values (will be order of occurrence)
  // For simplicity, we just take the values
  const data = Object.values(monthlyData).reverse(); // Reverse if they were desc

  const totalIncome = transactions.filter(t => t.type === 'INCOME').reduce((acc, t) => acc + Number(t.amount), 0);
  const totalExpenses = transactions.filter(t => t.type === 'EXPENSE').reduce((acc, t) => acc + Number(t.amount), 0);
  const netSavings = totalIncome - totalExpenses;

  const CustomLegend = () => (
    <div className="flex items-center justify-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></div>
        <span className="text-[11px] font-bold text-slate-600">Income</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-sm bg-rose-500"></div>
        <span className="text-[11px] font-bold text-slate-600">Expenses</span>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Income vs Expenses</h2>
      </div>

      {/* Top Metrics */}
      <div className="flex flex-wrap items-start gap-8 md:gap-12 mb-8">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-1">
            ${totalIncome.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <p className="text-[11px] font-bold text-slate-500">Income</p>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight mb-1">
            ${totalExpenses.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </h3>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <p className="text-[11px] font-bold text-slate-500">Expenses</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              ${netSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </h3>
            <div className={`w-6 h-6 rounded-md flex items-center justify-center ${netSavings >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              {netSavings >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
            <p className="text-[11px] font-bold text-slate-500">Net Savings</p>
          </div>
        </div>
      </div>

      <div className="h-[250px] w-full flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }}
              tickFormatter={(value) => `$${value >= 1000 ? value / 1000 + 'K' : value}`}
            />
            <Tooltip
              contentStyle={{ borderRadius: "16px", border: "1px solid #f1f5f9", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", fontSize: "13px", fontWeight: "bold", padding: "12px" }}
              cursor={{ fill: "#f8fafc" }}
              formatter={(value) => [`$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, ""]}
            />
            <Bar 
              dataKey="income" 
              fill="#10b981" 
              radius={[6, 6, 0, 0]}
              barSize={24}
              name="Income"
            />
            <Bar 
              dataKey="expense" 
              fill="#f43f5e" 
              radius={[6, 6, 0, 0]}
              barSize={24}
              name="Expenses"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
}
