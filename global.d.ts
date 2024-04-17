import type { Database } from "@/types/supabase";

declare global {
  type AllCardsListT = Database["public"]["Tables"]["cards"]["Row"];
}
