import React from "react";
import DragAndDrop from "@/app/(dashboard)/dashboard/cards/[cardId]/social-media/_components/DragAndDrop";
import { GetCardSocialMedia, GetSocialMedia } from "@/action/SocialMedia";
import {
  CardPageLayoutContent,
  CardPageLayoutHeader,
  CardPageMain,
} from "@/components/ui/card-layout";

const SocialMediaPage = async ({ params }: { params: { cardId: string } }) => {
  const { cardId } = params;
  const socialMediaNetworks = await GetSocialMedia();
  const cardSocialMedia = await GetCardSocialMedia(cardId);
  return (
    <CardPageMain>
      <CardPageLayoutHeader title="Social Media" />
      <CardPageLayoutContent>
        <DragAndDrop
          socialMediaNetworks={socialMediaNetworks ?? []}
          cardSocialMedia={cardSocialMedia ?? []}
          cardId={cardId}
        />
      </CardPageLayoutContent>
    </CardPageMain>
  );
};

export default SocialMediaPage;
