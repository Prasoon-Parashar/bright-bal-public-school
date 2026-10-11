import { createClient } from "@/lib/supabase/server";
import GalleryManager from "@/components/admin/GalleryManager";
import type { GalleryRow } from "@/lib/gallery";

export default async function AdminGalleryPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("gallery")
    .select("id,title,image_url,category,description,created_at")
    .order("created_at", { ascending: false });

  return <GalleryManager initialRows={(data ?? []) as GalleryRow[]} />;
}