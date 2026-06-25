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
  Target, 
  Settings,
  Sparkles,
  ChevronRight,
  Bot,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";

export function Sidebar({ isCollapsed, setIsCollapsed }) {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: ReceiptText },
    { name: "Accounts", href: "/account", icon: WalletCards }, 
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Goals", href: "/goals", icon: Target },
  ];

  return (
    <aside 
      className={`bg-white border-r border-slate-100 flex flex-col h-screen fixed left-0 top-0 hidden lg:flex font-sans transition-all duration-300 ${
        isCollapsed ? "w-[80px]" : "w-[250px]"
      }`}
    >
      {/* Top Header / Logo */}
      <div className={`p-6 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}>
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2 overflow-hidden">
            <Image
              src={"/logo.png"}
              alt="Spendly Logo"
              width={120}
              height={40}
              className="h-8 w-auto object-contain shrink-0"
            />
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400 hover:text-slate-900 transition-colors focus:outline-none shrink-0"
        >
          {isCollapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto custom-scrollbar overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              title={isCollapsed ? item.name : undefined}
              className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                isCollapsed ? "justify-center" : "gap-2.5"
              } ${
                isActive
                  ? "bg-[#f4f2ff] text-[#6b46c1]" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span className="truncate">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className={`p-4 mt-auto border-t border-slate-50 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
        {/* User Profile */}
        {user && (
          <div 
            className={`flex items-center rounded-xl hover:bg-slate-50 cursor-pointer transition-colors ${
              isCollapsed ? "justify-center p-2" : "justify-between p-2"
            }`}
            title={isCollapsed ? user.firstName || "User" : undefined}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                {user.firstName?.charAt(0) || user.emailAddresses[0]?.emailAddress?.charAt(0)?.toUpperCase()}
              </div>
              {!isCollapsed && (
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-slate-900 truncate">{user.firstName || "User"}</p>
                  <p className="text-[10px] text-slate-500 font-medium truncate">{user.emailAddresses[0]?.emailAddress}</p>
                </div>
              )}
            </div>
            {!isCollapsed && <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
          </div>
        )}
      </div>
    </aside>
  );
}
