import { Suspense } from "react";
import { getAccountWithTransactions } from "@/actions/account";
import { BarLoader } from "react-spinners";
import { TransactionTable } from "../_components/transaction-table";
import { notFound } from "next/navigation";
import { AccountChart } from "../_components/account-chart";
import { ArrowUpRight, ArrowDownRight, Landmark, CreditCard } from "lucide-react";

export default async function AccountPage({ params }) {
  const accountData = await getAccountWithTransactions(params.id);

  if (!accountData) {
    notFound();
  }

  const { transactions, ...account } = accountData;
  const isSavings = account.type === "SAVINGS";
  const AccountIcon = isSavings ? Landmark : CreditCard;

  return (
    <div className="dashboard-bg min-h-screen pb-8">
      {/* Account Header Banner */}
      <div className="dashboard-hero px-6 py-8 md:py-10 mb-8">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  isSavings
                    ? "bg-emerald-500/20 text-emerald-300"
                    : "bg-blue-500/20 text-blue-300"
                }`}
              >
                <AccountIcon className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight capitalize">
                  {account.name}
                </h1>
                <p className="text-blue-200/70 text-sm mt-0.5">
                  {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
                  Account
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-right">
              <div>
                <p className="text-blue-200/60 text-xs mb-0.5">Balance</p>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  ${parseFloat(account.balance).toFixed(2)}
                </p>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/10" />
              <div className="hidden md:block">
                <p className="text-blue-200/60 text-xs mb-0.5">Transactions</p>
                <p className="text-lg font-semibold text-white">
                  {account._count.transactions}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-5 space-y-8">
        {/* Chart Section */}
        <div className="animate-fade-in-up stagger-1">
          <Suspense
            fallback={
              <BarLoader className="mt-4" width={"100%"} color="#7c3aed" />
            }
          >
            <AccountChart transactions={transactions} />
          </Suspense>
        </div>

        {/* Transactions Table */}
        <div className="animate-fade-in-up stagger-2">
          <Suspense
            fallback={
              <BarLoader className="mt-4" width={"100%"} color="#7c3aed" />
            }
          >
            <TransactionTable transactions={transactions} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
