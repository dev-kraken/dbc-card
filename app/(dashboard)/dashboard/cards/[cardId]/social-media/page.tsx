import React from "react";
import DragAndDrop from "@/app/(dashboard)/dashboard/cards/[cardId]/social-media/_components/DragAndDrop";
import { GetCardSocialMedia, GetSocialMedia } from "@/action/SocialMedia";

const SocialMediaPage = async ({ params }: { params: { cardId: string } }) => {
  const socialMediaNetworks = await GetSocialMedia();
  const cardSocialMedia = await GetCardSocialMedia(params.cardId);
  return <DragAndDrop socialMediaNetworks={socialMediaNetworks ?? []} cardSocialMedia={cardSocialMedia ?? []} />;
};

export default SocialMediaPage;
