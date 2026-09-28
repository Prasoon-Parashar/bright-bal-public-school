import { createClient } from "@/lib/supabase/server";

export async function getSchoolSettings() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("school_settings")
    .select("*")
    .single();

  return data;
}