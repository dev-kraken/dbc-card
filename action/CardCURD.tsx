"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { DBCardSchema } from "@/zod/CardSchema";

const AddCard = async (data: FormData) => {
  const supabase = createClient();
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

const UpdateCard = async (data: FormData) => {
  const supabase = createClient();
  try {
    return { success: "Card updated successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};
export const AddUpdateCard = async (data: FormData, mode: string) => {
  if (mode === "add") {
    return AddCard(data);
  }

  if (mode === "update") {
    return UpdateCard(data);
  }
};

export const DeleteCard = async (cardId: string) => {
  const supabase = createClient();
  try {
    const { data: cardData, error: cardError } = await supabase
      .from("cards")
      .update({ isDeleted: true })
      .eq("cardId", cardId);
    if (cardError) {
      return { error: cardError.message };
    }
    revalidatePath("/dashboard/cards/");
    return { success: "Card deleted successfully!" };
  } catch (error) {
    return { error: "Something went wrong!" };
  }
};

export const AllCards = async () => {
  const supabase = createClient();
  try {
    let { data: cards, error } = await supabase
      .from("cards")
      .select("*")
      .order("id", { ascending: false })
      .eq("isDeleted", false);
    if (error) {
      console.log(error);
    }
    return cards;
  } catch (error) {
    console.log(error);
  }
};
