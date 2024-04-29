import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileNav from "@/components/MobileNav";
import SignedIn from "@/components/SignedIn";

const Navbar = ({ signedInUser }: any) => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-white border-b px-4 py-3 lg:px-6">
      <Link href="/" className="flex items-center gap-1 max-lg:justify-center">
        <Image
          src="/logo.svg"
          width={0}
          height={0}
          priority
          alt="DBC logo"
          className="max-sm:size-10"
          style={{ width: "34px", height: "auto" }}
        />
        <p className="text-[26px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-1 to-purple-3 max-lg:hidden">
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
