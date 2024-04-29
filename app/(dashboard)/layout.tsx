import React, { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { SignedInUser } from "@/action/AuthAction";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const signedInUser = await SignedInUser();
  return (
    <main className="relative">
      <Navbar signedInUser={signedInUser} />
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
