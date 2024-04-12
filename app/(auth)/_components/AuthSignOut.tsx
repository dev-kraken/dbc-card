"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOutUser } from "@/action/AuthAction";
import { useRouter } from "next/navigation";
import { LiaSignOutAltSolid } from "react-icons/lia";

const AuthSignOut = () => {
  const router = useRouter();
  const signOut = () => {
    LogOutUser().then(() => {
      router.push("/sign-in");
    });
  };
  return (
    <Button onClick={signOut} variant="default" className="gap-2 w-full p-3 bg-purple-1 hover:bg-purple-3">
      <LiaSignOutAltSolid className="size-5" />
      <p className="font-semibold max-lg:hidden">Sign Out</p>
    </Button>
  );
};

export default AuthSignOut;
