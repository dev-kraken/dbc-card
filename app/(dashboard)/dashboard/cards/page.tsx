import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";
import AddNewCard from "@/app/(dashboard)/dashboard/_components/AddNewCard";
import { AllCards } from "@/action/CardCURD";
import ListCardsCard from "@/app/(dashboard)/dashboard/cards/_components/ListCardsCard";

const Cards = async () => {
  const allCards = await AllCards();
  return (
    <PageLayout>
      <PageLayoutHeader title="All Cards">
        <AddNewCard />
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
