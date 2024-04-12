import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";
import AddNewCard from "@/app/(dashboard)/dashboard/_components/AddNewCard";

const Cards = () => {
  return (
    <PageLayout>
      <PageLayoutHeader title="Cards">
        <AddNewCard />
      </PageLayoutHeader>
      <PageLayoutContent>
        <p>Cards</p>
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Cards;
