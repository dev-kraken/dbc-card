import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";
import AddUpdateCardModal from "@/app/(dashboard)/dashboard/cards/_components/AddUpdateCardModal";
import { AllCards } from "@/action/CardCURD";
import ListCardsCard from "@/app/(dashboard)/dashboard/cards/_components/ListCardsCard";
import { CirclePlus, WalletCards } from "lucide-react";

const Cards = async () => {
  const allCards = await AllCards();
  return (
    <PageLayout>
      <PageLayoutHeader title="All Cards">
        <AddUpdateCardModal
          mode="add"
          variant="outline"
          className="border-purple-1 text-purple-1 gap-1 flex items-center justify-center hover:bg-purple-1 hover:text-white"
        >
          <CirclePlus className="size-4" />
          Add new card
        </AddUpdateCardModal>
      </PageLayoutHeader>
      <PageLayoutContent className="flex flex-wrap gap-4">
        {allCards && allCards.length > 0 ? (
          <>
            {allCards.map((card) => (
              <ListCardsCard key={card.id} card={card} />
            ))}
          </>
        ) : (
          <div className="w-full border border-dashed border-purple-4/50 rounded-lg flex flex-col items-center justify-center p-6 gap-2">
            <WalletCards className="size-10 text-purple-3 animate-bounce" />
            <p className="text-center text-xs font-medium text-purple-2">
              No cards found
            </p>
            <p className="text-sm text-muted-foreground">
              Get started by creating a new card.
            </p>
            <AddUpdateCardModal
              mode="add"
              variant="outline"
              className="border-purple-1 text-purple-1 gap-1 flex items-center justify-center hover:bg-purple-1 hover:text-white mt-3"
            >
              <CirclePlus className="size-4" />
              Add new card
            </AddUpdateCardModal>
          </div>
        )}
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Cards;
