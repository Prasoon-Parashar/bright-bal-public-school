import { createClient } from "@/lib/supabase/server";

export async function getSettings() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    data || {
      school_name: "Bright Bal Public School",
      principal_name: "Nidhi Parashar",
      phone: "+91 9997157985",
      email: "info@brightbalpublicschool.in",
      address: "Baldev Nagar, Gober Chowki, Agra, Uttar Pradesh",
    }
  );
}