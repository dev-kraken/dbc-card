"use server";

import { SocialMediaEntry } from "@/global";
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

export const GetCardSocialMedia = async (
  cardId: string,
): Promise<SocialMediaEntry[] | null> => {
  const supabase = createClient();
  try {
    const { data: cardSocialMedia, error } = await supabase
      .from("cardSocialMedia")
      .select(`id, value, priority, name:SocialMediaNetwork(name)`)
      .eq("cardId", cardId);

    if (error) {
      throw new Error("Failed to fetch card social media data");
    }

    // Modify the data structure
    return (
      cardSocialMedia?.map((entry) => ({
        ...entry,
        name: entry.name?.name || "",
      })) || null
    );
  } catch (error) {
    console.error("Error fetching card social media data:", error);
    return null;
  }
};
