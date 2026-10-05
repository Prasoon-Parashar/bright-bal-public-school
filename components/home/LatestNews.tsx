import { createClient } from "@/lib/supabase/server";
import LatestNewsContent from "./LatestNewsContent";

export default async function LatestNews() {
  const supabase = await createClient();

  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false })
    .limit(1);

  const latestNotice = notices?.[0] ?? null;

  return <LatestNewsContent notice={latestNotice} />;
}