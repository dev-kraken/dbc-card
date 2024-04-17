import { BadgeAlert } from "lucide-react";

interface ModalErrorProps {
  message?: string;
}

const ModalFormError = ({ message }: ModalErrorProps) => {
  if (!message) return null;
  return (
    <div
      className="flex items-center gap-x-2 rounded-md
      bg-destructive/15 p-3 text-sm text-destructive"
    >
      <BadgeAlert className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default ModalFormError;
