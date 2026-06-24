"use client";

import { ArrowRightLeft, Plus, FileText, CreditCard, ArrowRight } from "lucide-react";
import Link from "next/link";

export function QuickActions() {
  const actions = [
    {
      title: "Transfer Money",
      description: "Move money between accounts",
      icon: ArrowRightLeft,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      href: "/transfer",
    },
    {
      title: "Add Money",
      description: "Add money to your account",
      icon: Plus,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      href: "/add-money",
    },
    {
      title: "View Statement",
      description: "Download account statement",
      icon: FileText,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      href: "/statements",
    },
    {
      title: "Manage Cards",
      description: "Manage your linked cards",
      icon: CreditCard,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      href: "/cards",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
      <h2 className="text-[15px] font-bold text-slate-900 tracking-tight mb-5">Quick Actions</h2>
      
      <div className="space-y-2">
        {actions.map((action, i) => (
          <Link key={i} href={action.href} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${action.iconBg} ${action.iconColor} shadow-inner`}>
                <action.icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[12px] font-bold text-slate-900 mb-0.5">{action.title}</h3>
                <p className="text-[10px] font-semibold text-slate-500">{action.description}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#6b46c1] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
