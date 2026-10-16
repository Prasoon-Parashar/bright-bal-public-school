import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export const getSchoolSettings = cache(async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("school_settings")
    .select("*")
    .single();

  if (error) {
    console.error("Failed to fetch school settings:", {
  message: error?.message,
  code: error?.code,
  details: error?.details,
  hint: error?.hint,
});
    return null;
  }

  return data;
});