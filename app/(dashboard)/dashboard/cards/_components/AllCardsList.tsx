import React from "react";
import Image from "next/image";
import {createClient} from "@/utils/supabase/client";

interface AllCardsListProps {
  allCards: AllCardsListT[] | [];
}

const AllCardsList = (allCards: AllCardsListProps) => {
  const supabase = createClient();
  return (
    <div className="px-4">
      {allCards.allCards?.map((card) => {
        return (
          <div className="bg-white rounded-md gap-4 shadow-md p-4 mb-4 flex  items-center" key={card.id}>
            <Image
              src={`http://127.0.0.1:54321/storage/v1/object/public/AvatarCards/${card.avatarUrl}`}
              alt={card.cardName}
              width={50}
              height={50}
              className="rounded-full"
            />
            <p>{card.cardName}</p>
          </div>
        );
      })}
    </div>
  );
};
export default AllCardsList;
