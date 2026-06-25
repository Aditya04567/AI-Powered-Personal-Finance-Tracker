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
  Settings,
  Sparkles,
  ChevronRight,
  Bot,
  PanelLeftClose
} from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
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
    <>
      {/* Sticky Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-slate-100 flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="Spendly Logo"
            width={100}
            height={32}
            className="h-7 w-auto object-contain"
          />
        </Link>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Dimmed Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sliding Side Drawer */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[320px] bg-white rounded-r-[2rem] flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header inside drawer */}
        <div className="p-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <Image
              src={"/logo.png"}
              alt="Spendly Logo"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-900 transition-colors focus:outline-none shrink-0"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-[#f4f2ff] text-[#6b46c1]"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 mt-auto border-t border-slate-50">
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
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 overflow-hidden">
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
      </div>
    </>
  );
}
