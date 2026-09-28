import { createClient } from "@/lib/supabase/server";
import GalleryForm from "./GalleryForm";
import GalleryList from "./GalleryList";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: images } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section className="space-y-10">

      <GalleryForm />

      <GalleryList images={images || []} />

    </section>
  );
}