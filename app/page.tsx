import AuthSignOut from "@/components/auth/AuthSignOut";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {JSON.stringify(data)}
      <AuthSignOut />
    </main>
  );
}
