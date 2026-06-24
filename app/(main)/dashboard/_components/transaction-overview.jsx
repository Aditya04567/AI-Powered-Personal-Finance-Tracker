"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ArrowUpRight, ArrowDownRight, ReceiptText, PieChart as PieChartIcon, ChevronRight } from "lucide-react";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9FA8DA",
];

export function DashboardOverview({ accounts, transactions }) {
  const [selectedAccountId, setSelectedAccountId] = useState(
    accounts.find((a) => a.isDefault)?.id || accounts[0]?.id
  );

  // Filter transactions for selected account
  const accountTransactions = transactions.filter(
    (t) => t.accountId === selectedAccountId
  );

  // Get recent transactions (last 5)
  const recentTransactions = accountTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Calculate expense breakdown for current month
  const currentDate = new Date();
  const currentMonthExpenses = accountTransactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      t.type === "EXPENSE" &&
      transactionDate.getMonth() === currentDate.getMonth() &&
      transactionDate.getFullYear() === currentDate.getFullYear()
    );
  });

  // Group expenses by category
  const expensesByCategory = currentMonthExpenses.reduce((acc, transaction) => {
    const category = transaction.category;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount;
    return acc;
  }, {});

  // Format data for pie chart
  const pieChartData = Object.entries(expensesByCategory).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 font-sans mb-8">
      {/* Recent Transactions Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <ReceiptText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
          </div>
          <Select
            value={selectedAccountId}
            onValueChange={setSelectedAccountId}
          >
            <SelectTrigger className="w-[140px] h-9 text-xs rounded-xl border-slate-200">
              <SelectValue placeholder="All Accounts" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id} className="text-xs">
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1 space-y-4">
          {recentTransactions.length === 0 ? (
            <div className="flex items-center justify-center h-full text-slate-400 text-sm font-medium">
              No recent transactions
            </div>
          ) : (
            recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${transaction.type === "EXPENSE" ? "bg-red-50 text-red-500" : "bg-emerald-50 text-emerald-500"}`}>
                    {transaction.type === "EXPENSE" ? (
                      <ArrowDownRight className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 mb-0.5">
                      {transaction.description || "Untitled Transaction"}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500">
                      {format(new Date(transaction.date), "MMM dd, yyyy")}
                    </p>
                  </div>
                </div>
                <div className={`text-sm font-bold ${transaction.type === "EXPENSE" ? "text-red-500" : "text-emerald-500"}`}>
                  {transaction.type === "EXPENSE" ? "-" : "+"}${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-center">
          <Link href="/transactions" className="text-xs font-bold text-[#6b46c1] hover:text-[#553c9a] flex items-center gap-1 transition-colors">
            View All Transactions <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Expense Breakdown Card */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-[#6b46c1]">
            <PieChartIcon className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900">Expense Breakdown</h3>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px]">
          {pieChartData.length === 0 ? (
            <p className="text-center text-slate-400 text-sm font-medium">
              No expenses this month
            </p>
          ) : (
            <>
              <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          className="hover:opacity-80 transition-opacity outline-none"
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => `$${value.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #f1f5f9",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "#0f172a"
                      }}
                      itemStyle={{ color: "#0f172a" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-bold text-slate-500 mb-0.5">Total</span>
                  <span className="text-lg font-black text-slate-900">
                    ${currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Custom Legend */}
              <div className="w-full mt-4 space-y-2">
                {pieChartData.map((entry, index) => {
                  const total = currentMonthExpenses.reduce((sum, t) => sum + t.amount, 0);
                  const percentage = ((entry.value / total) * 100).toFixed(0);
                  return (
                    <div key={entry.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="font-semibold text-slate-600">{entry.name}</span>
                      </div>
                      <span className="font-bold text-slate-500">
                        ${entry.value.toLocaleString("en-US", { minimumFractionDigits: 2 })} <span className="font-medium text-slate-400">({percentage}%)</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
