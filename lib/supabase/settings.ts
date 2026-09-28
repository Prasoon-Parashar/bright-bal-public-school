import { createClient } from "@/lib/supabase/server";

export async function getSchoolSettings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("school_settings")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Error loading school settings:", error);
    return null;
  }

  return data;
}