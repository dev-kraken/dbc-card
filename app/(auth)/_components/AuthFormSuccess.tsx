import { BadgeCheck } from "lucide-react";

interface AuthFormSuccessProps {
  message?: string;
}

const AuthFormSuccess = ({ message }: AuthFormSuccessProps) => {
  if (!message) return null;
  return (
    <div
      className="flex items-center gap-x-2 rounded-md
      bg-emerald-500/15 p-3 text-sm text-emerald-500"
    >
      <BadgeCheck className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default AuthFormSuccess;
