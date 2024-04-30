import { Bird } from "lucide-react";
import React from "react";

interface AuthHeaderProps {
  label: string;
  title: string;
}

const AuthCardHeader = ({ title, label }: AuthHeaderProps) => {
  return (
    <div className="space-y-2 text-center">
      <Bird className="mx-auto size-16 text-slate-900/80" />
      <h1 className="text-3xl font-semibold text-slate-900/80">{title}</h1>
      <p className="text-sm font-normal text-foreground/80">{label}</p>
    </div>
  );
};

export default AuthCardHeader;
