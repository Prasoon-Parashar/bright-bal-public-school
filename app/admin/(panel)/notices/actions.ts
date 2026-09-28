"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteNotice(id: number) {
  const supabase = await createClient();

  await supabase.from("notices").delete().eq("id", id);

  revalidatePath("/admin/notices");
  revalidatePath("/notices");
}