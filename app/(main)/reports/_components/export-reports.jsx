"use client";

import { FileText, FileSpreadsheet, Link as LinkIcon, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ExportReports() {
  const exports = [
    {
      title: "Download PDF Report",
      description: "Comprehensive financial summary",
      icon: FileText,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      href: "#",
    },
    {
      title: "Export CSV Data",
      description: "Raw transaction and summary data",
      icon: FileSpreadsheet,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      href: "#",
    },
    {
      title: "Share Report Link",
      description: "Secure link to share your report",
      icon: LinkIcon,
      iconColor: "text-[#6b46c1]",
      iconBg: "bg-purple-50",
      href: "#",
    },
    {
      title: "Schedule Auto Reports",
      description: "Get reports delivered to your email",
      icon: Mail,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-50",
      href: "#",
    },
  ];

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      <h2 className="text-[15px] font-bold text-slate-900 tracking-tight mb-6">Export & Share Reports</h2>
      
      <div className="space-y-3 flex-1">
        {exports.map((item, i) => (
          <Link key={i} href={item.href} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor} group-hover:scale-110 transition-transform shadow-inner`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[13px] font-bold text-slate-900 mb-0.5">{item.title}</h3>
                <p className="text-[11px] font-semibold text-slate-500">{item.description}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#6b46c1] transition-colors shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
