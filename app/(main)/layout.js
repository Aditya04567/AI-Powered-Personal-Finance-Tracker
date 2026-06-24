import React from "react";
import { Sidebar } from "@/components/sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans">
      <Sidebar />
      <main className="flex-1 overflow-y-auto w-full lg:ml-[280px]">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
