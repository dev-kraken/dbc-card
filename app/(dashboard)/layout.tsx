import React, { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col pb-6 pt-[56px] max-md:pb-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
};

export default DashboardLayout;
