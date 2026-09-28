"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Loader2, ImagePlus } from "lucide-react";

export default function GalleryForm() {
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function uploadImage() {
    if (!file) {
      alert("Select an image first.");
      return;
    }

    setLoading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      alert(uploadError.message);
      setLoading(false);
      return;
    }

    const { data } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    await supabase.from("gallery").insert({
      title,
      image_url: data.publicUrl,
    });

    alert("Image Uploaded!");

    setTitle("");
    setFile(null);
    setLoading(false);
    window.location.reload();
  }

  return (
    <div className="rounded-[30px] border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-orange-50/50 p-6 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.2)] md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-inner shadow-red-200">
          <ImagePlus size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Upload Gallery Image
          </h2>
          <p className="mt-1 text-sm text-slate-500 md:text-base">
            Share school events, classroom moments, sports, and celebrations.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Image Title
          </label>
          <input
            placeholder="Enter image title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-red-300 focus:ring-4 focus:ring-red-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Select Image
          </label>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full cursor-pointer rounded-xl text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
            />
          </div>
        </div>

        <button
          onClick={uploadImage}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-red-200 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Upload size={20} />
          )}

          {loading ? "Uploading..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
}