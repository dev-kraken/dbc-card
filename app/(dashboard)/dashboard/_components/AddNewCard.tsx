"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CardModal from "@/components/modals/CardModal";
import { CirclePlus } from "lucide-react";

const AddNewCard = () => {
  const [modalState, setModalState] = useState<"addNewCard" | undefined>(
    undefined,
  );
  const createCard = () => {};
  return (
    <>
      <Button variant="outline" className="border-purple-1 text-purple-1 gap-1 flex items-center justify-center hover:bg-purple-1 hover:text-white" onClick={() => setModalState("addNewCard")}>
        <CirclePlus className="size-4" />
        Add new card
      </Button>
      <CardModal
        isOpen={modalState === "addNewCard"}
        onClose={() => setModalState(undefined)}
        title="Add New Card"
        buttonText="Add New Card"
        handelClick={createCard}
      />
    </>
  );
};

export default AddNewCard;
