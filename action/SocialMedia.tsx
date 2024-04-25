"use server";

import { SocialMediaEntry } from "@/global";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

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
      .select(
        `id, value, priority,socialNetworkId,SocialMediaNetwork(name, id)`,
      )
      .eq("cardId", cardId).order("priority", { ascending: true });

    if (error) {
      throw new Error("Failed to fetch card social media data");
    }

    // Modify the data structure
    return (
      cardSocialMedia?.map((entry) => ({
        ...entry,
        name: entry?.SocialMediaNetwork?.name || "",
        socialId: entry?.SocialMediaNetwork?.id || 0,
      })) || null
    );
  } catch (error) {
    console.error("Error fetching card social media data:", error);
    return null;
  }
};

export const AddUpdateCardSocialMedia = async (value: any) => {
  try {
    const supabase = createClient();

    // Separate the data into two arrays: one with IDs and one without IDs
    const dataWithIds = value.filter((item: any) => item.id !== undefined);
    const dataWithoutIds = value.filter((item: any) => item.id === undefined);

    // Upsert the data with IDs
    let { data: cardSocialMediaWithIds, error: errorWithIds } = await supabase
      .from("cardSocialMedia")
      .upsert(dataWithIds)
      .select('id, priority');

    if (errorWithIds) {
      return {
        error: errorWithIds.message,
      };
    }

    // Upsert the data without IDs, if any
    if (dataWithoutIds.length > 0) {
      let { data: cardSocialMediaWithoutIds, error: errorWithoutIds } =
        await supabase.from("cardSocialMedia").upsert(dataWithoutIds).select();

      if (errorWithoutIds) {
        return {
          error: errorWithoutIds.message,
        };
      }
    }

    revalidatePath(`/dashboard/cards/${value[0].cardId}/social-media`);
    // Return the combined result
    return {
      success: true,
    };
  } catch (error) {
    console.log("Error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
