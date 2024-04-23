import type { Database } from "@/types/supabase";

declare global {
  type AllCardsListT = Database["public"]["Tables"]["cards"]["Row"];
  type CardProfileT = Database["public"]["Tables"]["cardProfile"]["Row"];
  type SocialMediaNetworkT = Database["public"]["Tables"]["SocialMediaNetwork"]["Row"];
}
