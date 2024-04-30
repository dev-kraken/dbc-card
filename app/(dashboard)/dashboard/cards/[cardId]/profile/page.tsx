import React from "react";
import ProfileForm from "@/app/(dashboard)/dashboard/cards/[cardId]/profile/_components/ProfileForm";
import { Metadata } from "next";
import { GetCardProfile } from "@/action/CardCURD";
import {
  CardPageLayoutContent,
  CardPageLayoutHeader,
  CardPageMain,
} from "@/components/ui/card-layout";

export const metadata: Metadata = {
  title: "Card Profile",
};

const ProfilePage = async ({ params }: { params: { cardId: string } }) => {
  const { cardId } = params;
  const profileData = await GetCardProfile(cardId);
  return (
    <CardPageMain>
      <CardPageLayoutHeader title="Card Profile" />
      <CardPageLayoutContent>
        <ProfileForm profileData={profileData} cardId={cardId} />
      </CardPageLayoutContent>
    </CardPageMain>
  );
};

export default ProfilePage;
