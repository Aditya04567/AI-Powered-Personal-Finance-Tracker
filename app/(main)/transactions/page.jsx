import { Suspense } from "react";
import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { TransactionList } from "./_components/transaction-list";
import Link from "next/link";

export default async function TransactionsPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  return (
    <div className="space-y-6 pb-12 font-sans max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-0.5 tracking-tight">
            Transactions
          </h1>
          <p className="text-xs font-medium text-slate-500">
            Track and manage all your income and expenses.
          </p>
        </div>
      </div>

      <div>
        <TransactionList transactions={transactions || []} accounts={accounts || []} />
      </div>
    </div>
  );
}
