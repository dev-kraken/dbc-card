"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import ListingCardModal from "@/components/modals/ListingCardModal";

interface AddUpdateCardProps {
    variant?: "ghost" | "outline";
    size?: "sm" | "lg" | "icon";
    className?: string;
    mode: "add" | "update";
    cardData?: AllCardsListT;
    children?: React.ReactNode;
    cardId: string
}

const AddUpdateListing = ({
                              variant,
                              className,
                              size,
                              mode,
                              cardData,
                              children,
                              cardId
                          }: AddUpdateCardProps) => {
    const [modalState, setModalState] = useState<"addNewCardListing" | undefined>(
        undefined,
    );
    return (
        <>
            <Button
                variant={variant}
                className={className}
                onClick={() => setModalState("addNewCardListing")}
                size={size ?? "default"}
            >
                {children}
            </Button>
            <ListingCardModal
                isOpen={modalState === "addNewCardListing"}
                onClose={() => setModalState(undefined)}
                title={mode === "update" ? "Update Listing" : "Add New Listing"}
                buttonText={mode === "update" ? "Update Listing" : "Add New Listing"}
                cardData={cardData}
                mode={mode}
                cardId={cardId}
            />
        </>
    );
};

export default AddUpdateListing;
