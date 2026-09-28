"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DeleteButton({
  id,
  imageUrl,
}: {
  id: string;
  imageUrl: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this image?");

    if (!confirmDelete) return;

    const supabase = createClient();

    const filePath = imageUrl.split("/gallery/")[1];

    if (filePath) {
      await supabase.storage.from("gallery").remove([filePath]);
    }

    await supabase.from("gallery").delete().eq("id", id);

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="mt-4 w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-2.5 font-semibold text-white shadow-lg shadow-red-200 transition hover:brightness-110"
    >
      Delete
    </button>
  );
}