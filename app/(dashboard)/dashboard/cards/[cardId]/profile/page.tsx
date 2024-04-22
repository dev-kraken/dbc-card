import React from "react";
import ProfileForm from "@/app/(dashboard)/dashboard/cards/[cardId]/profile/_components/ProfileForm";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Card Profile',
}
const ProfilePage = () => {
  return <ProfileForm />;
};

export default ProfilePage;
