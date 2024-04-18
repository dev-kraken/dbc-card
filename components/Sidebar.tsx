"use client";
import React from "react";
import { homeSidebarLinks } from "@/constants";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AuthSignOut from "@/app/(auth)/_components/AuthSignOut";

const Sidebar = () => {
  const pathname = usePathname();
  const params = useParams();
  let cardIdSlug = params?.cardId as string;
    console.log(cardIdSlug)
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-5 shadow-inner border-r pt-20 text-white max-sm:hidden lg:w-[200px]">
      <div className="flex flex-1 flex-col gap-3 pl-3">
        {homeSidebarLinks.map((item, index) => {
          const href = item.route.includes("[cardId]")
            ? item.route.replace("[cardId]", cardIdSlug)
            : item.route;
          const isActive =
            pathname === item.route ||
            pathname === href ||
            pathname.startsWith(`dashboard/`);
          return (
            <Link
              href={href}
              key={index}
              className={cn(
                "flex gap-3 items-center p-2 justify-start text-dark-1 hover:text-purple-1 hover:border-r-4 hover:border-purple-1",
                {
                  "text-purple-1 border-r-4 border-purple-1": isActive,
                  hidden:
                    (cardIdSlug && item.menu === "home") ||
                    (!cardIdSlug && item.menu === "card"),
                },
              )}
            >
              <item.icon className="size-5" />
              <p className="text-base font-medium max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="p-3">
        <AuthSignOut />
      </div>
    </section>
  );
};

export default Sidebar;
