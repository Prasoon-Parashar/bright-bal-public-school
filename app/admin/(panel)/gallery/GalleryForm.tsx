"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Loader2, ImagePlus } from "lucide-react";

export default function GalleryForm() {
  const supabase = createClient();

  const [category, setCategory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  async function uploadImages() {
    if (!category.trim()) {
      alert("Please enter an event/category.");
      return;
    }

    if (files.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    setLoading(true);

    try {
      for (const file of files) {
        const safeFileName = file.name.replace(/\s+/g, "-");
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2, 8)}-${safeFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(fileName, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        const { data } = supabase.storage
          .from("gallery")
          .getPublicUrl(fileName);

        const { error: insertError } = await supabase
          .from("gallery")
          .insert({
            title: category.trim(),
            category: category.trim(),
            image_url: data.publicUrl,
          });

        if (insertError) {
          throw new Error(insertError.message);
        }
      }

      alert(`${files.length} image(s) uploaded successfully!`);

      setCategory("");
      setFiles([]);

      window.location.reload();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while uploading."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-[30px] border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-orange-50/50 p-6 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.2)] md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-600 shadow-inner shadow-red-200">
          <ImagePlus size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
            Upload Gallery Photos
          </h2>

          <p className="mt-1 text-sm text-slate-500 md:text-base">
            Add multiple photos under one event or category.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Event / Category
          </label>

          <input
            type="text"
            placeholder="Example: Annual Function 2025"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-300 focus:ring-4 focus:ring-red-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Example: Annual Function 2025, Independence Day, Sports Day,
            Republic Day
          </p>
        </div>

        {/* Multiple Images */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Select Photos
          </label>

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                setFiles(Array.from(e.target.files || []));
              }}
              className="block w-full cursor-pointer rounded-xl text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-red-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-700"
            />
          </div>
        </div>

        {/* Selected Count */}
        {files.length > 0 && (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3">
            <p className="text-sm font-semibold text-red-700">
              {files.length} photo{files.length > 1 ? "s" : ""} selected
            </p>

            <div className="mt-2 max-h-32 space-y-1 overflow-y-auto">
              {files.map((file, index) => (
                <p
                  key={`${file.name}-${index}`}
                  className="truncate text-xs text-slate-600"
                >
                  {index + 1}. {file.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={uploadImages}
          disabled={loading}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-red-200 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Uploading {files.length} photo{files.length !== 1 ? "s" : ""}...
            </>
          ) : (
            <>
              <Upload size={20} />
              Upload All Photos
            </>
          )}
        </button>
      </div>
    </div>
  );
}