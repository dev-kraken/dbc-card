import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";
import AddNewCard from "@/app/(dashboard)/dashboard/_components/AddNewCard";
import { AllCards } from "@/action/CardCURD";
import AllCardsList from "@/app/(dashboard)/dashboard/cards/_components/AllCardsList";

const Cards = async () => {
  const allCards = await AllCards();
  return (
    <PageLayout>
      <PageLayoutHeader title="Cards">
        <AddNewCard />
      </PageLayoutHeader>
      <PageLayoutContent>
        <p>Cards</p>
      </PageLayoutContent>
      <AllCardsList allCards={allCards ?? []} />
    </PageLayout>
  );
};

export default Cards;
