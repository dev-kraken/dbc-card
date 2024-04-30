"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

interface AuthBackButtonProps {
  label: string;
  title: string;
  href: string;
}

const AuthCardFooter = ({ label, href, title }: AuthBackButtonProps) => {
  return (
    <div className="w-full flex flex-1 gap-0 items-center justify-center text-sm font-normal gap-x-1.5">
      <span>{label}</span>
      <Button
        variant="link"
        className="text-blue-600 hover:text-blue-500 hover:text-decoration-none hover:no-underline p-0"
        size="sm"
        asChild
      >
        <Link href={href}>{title}</Link>
      </Button>
    </div>
  );
};
export default AuthCardFooter;
