import React from "react";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from "@/components/ui/page-layout";
import { Button } from "@/components/ui/button";

const Cards = () => {
  return (
    <PageLayout>
      <PageLayoutHeader title="Cards">
        <Button variant="default">
          <p className="font-semibold max-lg:hidden">Cards</p>
        </Button>
      </PageLayoutHeader>
      <PageLayoutContent>
        <p>Cards</p>
      </PageLayoutContent>
    </PageLayout>
  );
};

export default Cards;
