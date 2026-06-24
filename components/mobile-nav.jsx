"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { 
  Menu,
  X,
  LayoutDashboard, 
  ReceiptText, 
  WalletCards, 
  PieChart, 
  BarChart3, 
  Target, 
  Bell,
  Settings,
  ChevronRight,
  Bot
} from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: ReceiptText },
    { name: "Accounts", href: "/account", icon: WalletCards },
    { name: "Budgets", href: "/budgets", icon: PieChart },
    { name: "Goals", href: "/goals", icon: Target },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Reports", href: "/reports", icon: ReceiptText },
    { name: "Subscriptions", href: "/subscriptions", icon: WalletCards },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Sticky Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-100 flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-[#6b46c1]" />
          <span className="text-xl font-black text-slate-900 tracking-tight">Welth.</span>
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Sliding Drawer */}
          <div className="relative w-[85%] max-w-[320px] bg-white h-full flex flex-col rounded-r-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-left duration-300">
            
            {/* Logo Section */}
            <div className="pt-12 pb-6 px-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <BarChart3 className="w-7 h-7 text-[#6b46c1]" />
                <span className="text-2xl font-black text-slate-900 tracking-tight">Welth.</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (pathname?.startsWith(`${item.href}/`) ?? false);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-[#f4f2ff] text-[#6b46c1]"
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
            <div className="px-6 pb-10 pt-4 bg-white mt-auto">
              {/* Upgrade Card */}
              <div className="bg-[#fcfaff] rounded-[1.25rem] p-5 mb-6 border border-purple-50/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#6b46c1] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4h20"/><path d="m2 8 3 10h14l3-10-6 4-4-6-4 6z"/></svg>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Upgrade to Pro</h4>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-3 leading-relaxed">
                  Unlock advanced insights, unlimited accounts and AI features.
                </p>
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-[#f4f2ff] text-[#6b46c1] flex items-center justify-center cursor-pointer hover:bg-purple-100 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* User Profile */}
              {user && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#6b46c1] text-white flex items-center justify-center text-lg font-bold shrink-0">
                      {user.firstName?.charAt(0) || user.emailAddresses?.[0]?.emailAddress?.charAt(0)?.toUpperCase() || "C"}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.firstName || "Crish Agrawal"}</p>
                      <p className="text-xs text-slate-500 font-medium truncate">{user.emailAddresses?.[0]?.emailAddress || "crish@example.com"}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
