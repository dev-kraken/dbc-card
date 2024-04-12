"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { homeSidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[200px] sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Menu className="cursor-pointer size-8 text-slate-800 sm:hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-dark-1 w-80">
          <Link href="/" className="flex items-center gap-1">
            <Image src="/logo.svg" width={32} height={32} alt="DBC logo" />
            <p className="text-[26px] font-extrabold text-white">DBC</p>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className=" flex h-full flex-col gap-3 pt-10 text-white">
                {homeSidebarLinks.map((item) => {
                  const isActive = pathname === item.route;
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                          "flex gap-4 items-center p-3 rounded-lg w-full max-w-60",
                          {
                            "bg-purple-1": isActive,
                          },
                        )}
                      >
                        <p className="font-semibold">{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
