import { getUserAccounts } from "@/actions/dashboard";
import { defaultCategories } from "@/data/categories";
import { AddTransactionForm } from "../_components/transaction-form";
import { getTransaction } from "@/actions/transaction";
import { PenBox, FileEdit } from "lucide-react";

export default async function AddTransactionPage({ searchParams }) {
  const accounts = await getUserAccounts();
  const editId = searchParams?.edit;

  let initialData = null;
  if (editId) {
    const transaction = await getTransaction(editId);
    initialData = transaction;
  }

  const isEdit = !!editId;

  return (
    <div className="dashboard-bg min-h-screen pb-8">
      {/* Page Header Banner */}
      <div className="dashboard-hero px-6 py-8 md:py-10 mb-8">
        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
              {isEdit ? (
                <FileEdit className="w-6 h-6 text-blue-200" />
              ) : (
                <PenBox className="w-6 h-6 text-blue-200" />
              )}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {isEdit ? "Edit Transaction" : "Add Transaction"}
              </h1>
              <p className="text-blue-200/70 text-sm mt-0.5">
                {isEdit
                  ? "Update your transaction details"
                  : "Record a new income or expense"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5">
        <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in-up">
          <AddTransactionForm
            accounts={accounts}
            categories={defaultCategories}
            editMode={isEdit}
            initialData={initialData}
          />
        </div>
      </div>
    </div>
  );
}
