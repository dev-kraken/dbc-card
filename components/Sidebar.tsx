"use client";
import React from "react";
import { homeSidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AuthSignOut from "@/app/(auth)/_components/AuthSignOut";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-gray-200/35 border-r p-3 pt-20 text-white max-sm:hidden lg:w-[200px]">
      <div className="flex flex-1 flex-col gap-2">
        {homeSidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`dashboard/`);
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-4 items-center p-3 rounded-lg justify-start text-slate-800 hover:bg-green-1 hover:text-white",
                {
                  "bg-green-1 text-white": isActive,
                },
              )}
            >
              <item.icons className="size-5" />
              <p className="text-base font-medium max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <AuthSignOut />
    </section>
  );
};

export default Sidebar;
