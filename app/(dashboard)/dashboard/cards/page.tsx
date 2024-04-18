import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";
import AddUpdateCardModal from "@/app/(dashboard)/dashboard/cards/_components/AddUpdateCardModal";
import { AllCards } from "@/action/CardCURD";
import ListCardsCard from "@/app/(dashboard)/dashboard/cards/_components/ListCardsCard";
import { CirclePlus } from "lucide-react";

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
        {allCards?.map((card) => {
          return <ListCardsCard key={card.id} card={card} />;
        })}
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Cards;
