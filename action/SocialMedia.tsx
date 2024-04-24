"use server";

import { createClient } from "@/utils/supabase/server";

export const GetSocialMedia = async () => {
  const supabase = createClient();
  try {
    let { data: SocialMediaNetwork, error } = await supabase
      .from("SocialMediaNetwork")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.log(error);
    }
    return SocialMediaNetwork;
  } catch (error) {
    console.log(error);
  }
};


export const GetCardSocialMedia = async (cardId: string) => {
  const supabase = createClient();
  try {
    let { data: cardSocialMedia, error } = await supabase
      .from("cardSocialMedia")
      .select("*")
      .eq("cardId", cardId)
      .order("id", { ascending: false });
    if (error) {
      console.log(error);
    }
    return cardSocialMedia;
  } catch (error) {
    console.log(error);
  }
}