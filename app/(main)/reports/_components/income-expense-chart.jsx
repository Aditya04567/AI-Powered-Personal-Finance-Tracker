"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ArrowUpRight, ChevronDown } from "lucide-react";

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
        <select className="text-[10px] font-semibold bg-slate-50 border border-slate-100 text-slate-600 rounded-lg px-2 py-1.5 outline-none cursor-pointer appearance-none pr-6 relative">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
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
              <ArrowUpRight className="w-4 h-4" />
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
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 600 }}
              tickFormatter={(value) => `$${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", fontSize: "12px", fontWeight: "bold" }}
              formatter={(value) => [`$${value}`, ""]}
            />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="#f43f5e" 
              strokeWidth={3}
              dot={{ r: 4, fill: "#f43f5e", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#f43f5e", strokeWidth: 2, stroke: "#fff" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <CustomLegend />
    </div>
  );
}
