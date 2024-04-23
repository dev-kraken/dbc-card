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
