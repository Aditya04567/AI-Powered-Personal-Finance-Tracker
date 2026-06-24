import React from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans flex-col lg:flex-row overflow-hidden">
      {/* Mobile Navigation Header */}
      <MobileNav />
      
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full lg:ml-[280px] p-4 sm:p-6 lg:p-10">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
