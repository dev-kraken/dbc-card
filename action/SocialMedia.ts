"use server";

import { SocialMediaEntry } from "@/global";
import { createClient } from "@/utils/supabase/server";
import { SocialMediaBackend } from "@/zod/CardSchema";
import { z } from "zod";
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
      .eq("cardId", cardId)
      .order("priority", { ascending: true });

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

export const AddUpdateCardSocialMedia = async (
  value: z.infer<typeof SocialMediaBackend>,
) => {
  try {
    let validateFields = SocialMediaBackend.safeParse(value);

    if (!validateFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const supabase = createClient();

    // Upsert the data with IDs
    let { data: cardSocialMediaWithIds, error: errorWithIds } = await supabase
      .from("cardSocialMedia")
      .upsert(value)
      .select("id, priority");

    if (errorWithIds) {
      return {
        error: errorWithIds.message,
      };
    }
    if (cardSocialMediaWithIds) {
      revalidatePath(
        `/(dashboard)/dashboard/cards/[cardId]/social-media`,
        "page",
      );
      // Return the combined result
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log("Error:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
