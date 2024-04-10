import {AiFillExclamationCircle} from "react-icons/ai";

interface AuthFormErrorProps {
  message?: string;
}

const AuthFormError = ({ message }: AuthFormErrorProps) => {
  if (!message) return null;
  return (
    <div
      className="flex items-center gap-x-2 rounded-md
      bg-destructive/15 p-3 text-sm text-destructive"
    >
      <AiFillExclamationCircle className="size-4" />
      <p>{message}</p>
    </div>
  );
};

export default AuthFormError;
