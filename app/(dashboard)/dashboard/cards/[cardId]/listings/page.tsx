import React from "react";
import {
  CardPageLayoutContent,
  CardPageLayoutHeader,
  CardPageMain,
} from "@/components/ui/card-layout";
import AddUpdateListing from "@/app/(dashboard)/dashboard/cards/[cardId]/listings/_components/AddUpdateListing";
import { CirclePlus } from "lucide-react";

const ListingsPage = async ({ params }: { params: { cardId: string } }) => {
  return (
    <CardPageMain>
      <CardPageLayoutHeader title="All Listings">
        <AddUpdateListing
          mode="add"
          variant="outline"
          className="border-purple-1 text-purple-1 gap-1 flex items-center justify-center hover:bg-purple-1 hover:text-white"
          cardId={params.cardId}
        >
          <CirclePlus className="size-4" />
          Add new listing
        </AddUpdateListing>
      </CardPageLayoutHeader>
      <CardPageLayoutContent>Listings</CardPageLayoutContent>
    </CardPageMain>
  );
};

export default ListingsPage;
