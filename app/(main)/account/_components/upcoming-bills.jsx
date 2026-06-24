"use client";

import Link from "next/link";
import { ArrowRight, Zap, Wifi, Smartphone, Tv } from "lucide-react";

export function UpcomingBills() {
  const bills = [
    {
      id: "1",
      name: "Netflix Subscription",
      category: "Entertainment",
      dueDate: "Due in 2 days",
      dueDateBadge: "bg-purple-100 text-[#6b46c1]",
      amount: 15.49,
      dateStr: "Jun 26, 2026",
      icon: Tv,
      iconColor: "text-red-500",
      iconBg: "bg-slate-900",
    },
    {
      id: "2",
      name: "Electricity Bill",
      category: "Bills & Utilities",
      dueDate: "Due in 5 days",
      dueDateBadge: "bg-orange-100 text-orange-600",
      amount: 40.00,
      dateStr: "Jun 29, 2026",
      icon: Zap,
      iconColor: "text-amber-500",
      iconBg: "bg-amber-50",
    },
    {
      id: "3",
      name: "Internet Bill",
      category: "Bills & Utilities",
      dueDate: "Due in 7 days",
      dueDateBadge: "bg-orange-100 text-orange-600",
      amount: 25.00,
      dateStr: "Jul 1, 2026",
      icon: Wifi,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
    },
    {
      id: "4",
      name: "PhonePe AutoPay",
      category: "Transfer",
      dueDate: "Due in 10 days",
      dueDateBadge: "bg-emerald-100 text-emerald-600",
      amount: 10.00,
      dateStr: "Jul 4, 2026",
      icon: Smartphone,
      iconColor: "text-white",
      iconBg: "bg-purple-600",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[15px] font-bold text-slate-900 tracking-tight">Upcoming Bills & Payments</h2>
        <Link href="/bills" className="text-[11px] font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors">
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {bills.map((bill) => (
          <div key={bill.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
            
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bill.iconBg} ${bill.iconColor} shadow-inner`}>
                <bill.icon className="w-5 h-5" />
              </div>
              
              <div>
                <h3 className="text-[13px] font-bold text-slate-900 mb-0.5">{bill.name}</h3>
                <p className="text-[11px] font-semibold text-slate-500">{bill.category}</p>
              </div>
            </div>

            <div className="hidden sm:block">
              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${bill.dueDateBadge}`}>
                {bill.dueDate}
              </span>
            </div>

            <div className="text-right">
              <p className="text-[13px] font-black text-slate-900 mb-0.5">
                ${bill.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <p className="text-[10px] font-semibold text-slate-400">
                {bill.dateStr}
              </p>
            </div>

          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/bills" className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#6b46c1] hover:text-[#553c9a] transition-colors py-2 px-4 rounded-xl hover:bg-purple-50">
          Manage All Bills <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
