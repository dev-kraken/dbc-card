import React from "react";
import DragAndDrop from "@/app/(dashboard)/dashboard/cards/[cardId]/social-media/_components/DragAndDrop";
import {GetSocialMedia} from "@/action/SocialMedia";

const SocialMediaPage = async () => {
  const socialMediaNetworks = await GetSocialMedia();
  return (
   <DragAndDrop socialMediaNetworks={socialMediaNetworks ?? []} />
  );
};

export default SocialMediaPage;
