import React, { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/toaster";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col pb-6 pt-[58px] max-md:pb-14">
          {children}
        </section>
      </div>
        <Toaster />
    </main>
  );
};

export default DashboardLayout;
