"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import { DBCardSchema } from "@/zod/CardSchema";

export const AddUpdateCard = async (
  data: FormData,
  mode: string,
  id: number,
) => {
  const supabase = createClient();
  const authId = await supabase.auth.getUser().then((res) => res.data.user?.id);
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
      .upload(`${authId as string}/${cardAvatarImg.name}`, cardAvatarImg, {
        contentType: "image/png",
        upsert: true,
      });

    if (ImgError) {
      return { error: ImgError.message };
    }

    // Add card
    const { data: cardData, error: cardError } = await supabase
      .from("cards")
      .upsert({
        id: id,
        cardName: cardName,
        avatarUrl: cardAvatarImg.name,
      })
      .select();

    if (cardError) {
      return { error: cardError.message };
    }

    revalidatePath("/dashboard/cards/");
    return {
      success:
        mode === "update"
          ? "Card updated successfully!"
          : "Card added successfully!",
    };
  } catch (error) {
    return { error: "Something went wrong!" };
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

export const getAvatarUrl = async (pathUrl: string) => {
  const supabase = createClient();
  const { data: cardAvatar } = supabase.storage
    .from("AvatarCards")
    .getPublicUrl(pathUrl);
  return (cardAvatar?.publicUrl as string) ?? "";
};
