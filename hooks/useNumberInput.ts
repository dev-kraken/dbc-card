import React, {
  ClipboardEventHandler,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";

interface AllowedKeyCode {
  key: string;
  code: string | [string, string];
}

const allowedKeyCodes: AllowedKeyCode[] = [
  { key: "backspace", code: "Backspace" },
  { key: "tab", code: "Tab" },
  { key: "leftArrow", code: "ArrowLeft" },
  { key: "rightArrow", code: "ArrowRight" },
  { key: "delete", code: "Delete" },
  { key: "end", code: "End" },
  { key: "numbers0to9", code: ["0", "9"] },
  { key: "numpad0to9", code: ["NumPad0", "NumPad9"] },
];

const isAllowedNumberInputKey = (
  event: React.KeyboardEvent<HTMLInputElement>,
  allowedKeys: string[] = [],
): boolean => {
  const { key, ctrlKey } = event;

  // Check if Ctrl key is pressed and the key is either 'c' (for copy) , 'V' (for paste) or 'A' (for select all)
  if (ctrlKey && (key === "c" || key === "C")) return true; // For Copy
  if (ctrlKey && (key === "v" || key === "V")) return true; // For paste
  if (ctrlKey && (key === "a" || key === "A")) return true; // For select all

  // Allow only numeric keys and specified control keys
  return (
    (key >= "0" && key <= "9") || // Numeric keys
    (key >= "NumPad0" && key <= "NumPad9") || // Numpad keys
    allowedKeys.some((allowedKey) => allowedKey === key) ||
    allowedKeyCodes.some((allowedCode) =>
      Array.isArray(allowedCode.code)
        ? allowedCode.code.includes(key)
        : allowedCode.code === key,
    )
  );
};

export const useNumberInput = (): {
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
  onPaste: ClipboardEventHandler<HTMLInputElement>;
  errorMessage?: string | null; // Optional error message (assuming implemented in the hook)
} => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleNumberInput: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (!isAllowedNumberInputKey(event)) {
      event.preventDefault();
    }
  };

  const handleNumberPaste: ClipboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    try {
      const pastedText = event.clipboardData?.getData("text/plain");
      if (pastedText && !/^\d+$/.test(pastedText)) {
        event.preventDefault();
        setErrorMessage("Only numbers are allowed.");
      }
    } catch (error) {
      console.error("Error accessing clipboard data:", error);
      setErrorMessage("An error occurred while pasting. Please try again.");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      // Handle displaying the error message to the user (e.g., toast notification)
      setTimeout(() => setErrorMessage(null), 3000); // Clear error after 3 seconds
    }
  }, [errorMessage]);

  return {
    onKeyDown: handleNumberInput,
    onPaste: handleNumberPaste,
    errorMessage,
  };
};

export default useNumberInput;
