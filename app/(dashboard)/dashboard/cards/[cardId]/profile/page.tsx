import React from "react";
import ProfileForm from "@/app/(dashboard)/dashboard/cards/[cardId]/profile/_components/ProfileForm";
import { Metadata } from "next";
import { GetCardProfile } from "@/action/CardCURD";

export const metadata: Metadata = {
  title: "Card Profile",
};

const ProfilePage = async ({ params }: { params: { cardId: string } }) => {
  const { cardId } = params;
  const profileData = await GetCardProfile(cardId);
  return <ProfileForm profileData={profileData} cardId={cardId} />;
};

export default ProfilePage;
