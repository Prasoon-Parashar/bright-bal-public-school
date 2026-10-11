import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import GalleryBrowser from "@/components/home/GalleryBrowser";
import type { GalleryRow } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery | Bright Bal Public School",
  description: "Photo collections of events, activities and classroom moments at Bright Bal Public School.",
};

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("gallery")
    .select("id,title,image_url,category,description,created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pb-20 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-red-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-96 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1565C0] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C62828]" />
            Moments &amp; Memories
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#101B33] sm:text-5xl">
            School Gallery
          </h1>
          <p className="mt-3 text-slate-500">
            Browse photo collections of our events, celebrations and everyday learning.
          </p>
        </div>

        <GalleryBrowser rows={(data ?? []) as GalleryRow[]} />
      </div>
    </main>
  );
}