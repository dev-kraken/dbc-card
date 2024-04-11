"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "@/action/AuthAction";
import { useRouter } from "next/navigation";

const AuthSignOut = () => {
  const router = useRouter();
  const signOut = () => {
    LogOut().finally(() => {
      router.push("/sign-in");
    });
  };
  return (
    <Button onClick={signOut} variant="default">
      Sign Out
    </Button>
  );
};

export default AuthSignOut;
