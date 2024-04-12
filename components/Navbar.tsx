import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import SignedIn from "@/components/ui/SignedIn";
import { SignedInUser } from "@/action/AuthAction";

const Navbar = async () => {
  const signedInUser = await SignedInUser();
  return (
    <nav className="flex-between fixed z-50 w-full bg-gray-200/35 border-b px-6 py-3 lg:px-6">
      <Link href="/" className="flex items-center gap-1 max-lg:justify-center">
        <Image
          src="/logo.svg"
          width={32}
          height={32}
          alt="DBC logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-green-1 max-lg:hidden">
          DBC
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn signedInUser={signedInUser} />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
