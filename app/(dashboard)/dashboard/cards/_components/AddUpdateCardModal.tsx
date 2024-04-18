"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CardModal from "@/components/modals/CardModal";

interface AddUpdateCardProps {
  variant?: "ghost" | "outline";
  size?: "sm" | "lg" | "icon";
  className?: string;
  mode: "add" | "update";
  cardData?: AllCardsListT;
  children?: React.ReactNode;
}

const AddUpdateCardModal = ({
  variant,
  className,
  size,
  mode,
  cardData,
  children,
}: AddUpdateCardProps) => {
  const [modalState, setModalState] = useState<"addNewCard" | undefined>(
    undefined,
  );
  return (
    <>
      <Button
        variant={variant}
        className={className}
        onClick={() => setModalState("addNewCard")}
        size={size ?? "default"}
      >
        {children}
      </Button>
      <CardModal
        isOpen={modalState === "addNewCard"}
        onClose={() => setModalState(undefined)}
        title={mode === "update" ? "Update Card" : "Add New Card"}
        buttonText={mode === "update" ? "Update Card" : "Add New Card"}
        cardData={cardData}
        mode={mode}
      />
    </>
  );
};

export default AddUpdateCardModal;
