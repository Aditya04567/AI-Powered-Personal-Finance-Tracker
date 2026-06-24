"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  ReceiptText, 
  WalletCards, 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Target, 
  Settings,
  Sparkles,
  ChevronRight
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: ReceiptText },
    { name: "Accounts", href: "/account", icon: WalletCards }, // Currently routes to dynamic /account/[id] but maybe just /account is fine for dummy
    { name: "Budgets", href: "/budgets", icon: PieChart },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Investments", href: "/investments", icon: TrendingUp },
    { name: "Goals", href: "/goals", icon: Target },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-[280px] bg-white border-r border-slate-100 flex flex-col h-screen fixed left-0 top-0 hidden lg:flex font-sans">
      {/* Logo */}
      <div className="p-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="Spendly Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-[#f4f2ff] text-[#6b46c1]" // Purple highlight matching image
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 mt-auto">
        {/* Upgrade Card */}
        <div className="bg-[#f9fafb] rounded-2xl p-5 mb-4">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-3">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Upgrade to Pro</h4>
          <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">
            Unlock advanced insights and smart features.
          </p>
          <button className="bg-white border border-slate-200 text-slate-900 text-xs font-bold py-2.5 px-4 rounded-xl w-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors shadow-sm">
            Upgrade Now <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* User Profile */}
        {user && (
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-900 truncate">{user.firstName || "User"}</p>
                <p className="text-[10px] text-slate-500 font-medium truncate">{user.emailAddresses[0]?.emailAddress}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          </div>
        )}
      </div>
    </aside>
  );
}
