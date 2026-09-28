"use client";

import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";

export default function GalleryList({ images }: { images: any[] }) {
  const supabase = createClient();

  async function deleteImage(id: number, url: string) {
    if (!confirm("Delete image?")) return;

    const fileName = url.split("/gallery/")[1];

    await supabase.storage.from("gallery").remove([fileName]);

    await supabase.from("gallery").delete().eq("id", id);

    window.location.reload();
  }

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {images.map((img) => (
        <div
          key={img.id}
          className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_40px_-22px_rgba(15,23,42,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_48px_-24px_rgba(239,68,68,0.35)]"
        >
          <div className="relative overflow-hidden">
            <img
              src={img.image_url}
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
              alt={img.title || "Gallery image"}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </div>

          <div className="space-y-4 p-5">
            <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
              {img.title}
            </h3>

            <button
              onClick={() => deleteImage(img.id, img.image_url)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 font-semibold text-white transition hover:bg-red-700"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}