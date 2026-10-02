import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getSchoolSettings = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("school_settings")
    .select("*")
    .single();

  if (error) {
    console.error("Failed to fetch school settings:", error);
    return null;
  }

  return data;
});