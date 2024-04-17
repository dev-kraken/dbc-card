"use server";

import { createClient } from "@/utils/supabase/server";
import { DBCardSchema } from "@/zod/CardSchema";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const supabase = createClient();
export const AddCard = async (data: FormData) => {
  const values = {
    cardName: data.get("cardName"),
    cardAvatarImg: data.get("cardAvatarImg"),
  };
  const validatedFields = DBCardSchema.safeParse(
    values as z.infer<typeof DBCardSchema>,
  );
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { cardName, cardAvatarImg } = validatedFields.data;

  try {
    // Upload image
    const { data: ImgData, error: ImgError } = await supabase.storage
      .from("AvatarCards")
      .upload(cardAvatarImg.name, cardAvatarImg, {
        contentType: "image/png",
      });

    if (ImgError) {
      return { error: ImgError.message };
    }

    // Add card
    const { data: cardData, error: cardError } = await supabase
      .from("cards")
      .insert({
        cardName: cardName,
        avatarUrl: cardAvatarImg.name,
      });

    if (cardError) {
      return { error: cardError.message };
    }

    revalidatePath("/dashboard/cards/");
    return { success: "Card added successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const AllCards = async () => {
  try {
    let { data: cards, error } = await supabase
      .from("cards")
      .select("*")
      .order("id", { ascending: false });
    if (error) {
      console.log(error);
    }
    return cards;
  } catch (error) {
    console.log(error);
  }
};
