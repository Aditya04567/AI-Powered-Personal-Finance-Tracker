"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

const MainLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans flex-col lg:flex-row overflow-hidden">
      {/* Mobile Navigation Header */}
      <MobileNav />
      
      {/* Desktop Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 transition-all duration-300 w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
