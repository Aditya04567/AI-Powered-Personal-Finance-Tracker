"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, startOfDay, endOfDay } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-100 rounded-xl px-4 py-3 shadow-lg">
        <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-500">{entry.name}:</span>
            <span className="font-semibold text-slate-800">
              ${entry.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function AccountChart({ transactions }) {
  const [dateRange, setDateRange] = useState("1M");

  const filteredData = useMemo(() => {
    const range = DATE_RANGES[dateRange];
    const now = new Date();
    const startDate = range.days
      ? startOfDay(subDays(now, range.days))
      : startOfDay(new Date(0));

    const filtered = transactions.filter(
      (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)
    );

    const grouped = filtered.reduce((acc, transaction) => {
      const date = format(new Date(transaction.date), "MMM dd");
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }
      if (transaction.type === "INCOME") {
        acc[date].income += transaction.amount;
      } else {
        acc[date].expense += transaction.amount;
      }
      return acc;
    }, {});

    return Object.values(grouped).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  }, [transactions, dateRange]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);

  const net = totals.income - totals.expense;

  return (
    <div className="glass-card rounded-2xl p-5 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-50 flex items-center justify-center">
            <Activity className="w-4.5 h-4.5 text-violet-600" />
          </div>
          <h3 className="font-semibold text-slate-800">Transaction Overview</h3>
        </div>
        <Select defaultValue={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[140px] h-8 text-xs rounded-lg border-slate-200">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(DATE_RANGES).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="stat-card stat-card-income p-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <p className="text-xs text-slate-500">Income</p>
          </div>
          <p className="text-lg font-bold text-emerald-700">
            ${totals.income.toFixed(2)}
          </p>
        </div>
        <div className="stat-card stat-card-expense p-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-3.5 h-3.5 text-red-500" />
            <p className="text-xs text-slate-500">Expenses</p>
          </div>
          <p className="text-lg font-bold text-red-600">
            ${totals.expense.toFixed(2)}
          </p>
        </div>
        <div className="stat-card stat-card-balance p-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3.5 h-3.5 text-sky-500" />
            <p className="text-xs text-slate-500">Net</p>
          </div>
          <p
            className={`text-lg font-bold ${
              net >= 0 ? "text-emerald-700" : "text-red-600"
            }`}
          >
            ${net.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={filteredData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="date"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              stroke="#94a3b8"
            />
            <YAxis
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              stroke="#94a3b8"
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
