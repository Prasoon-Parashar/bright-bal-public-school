"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DeleteButton({
  id,
}: {
  id: number;
}) {
  const supabase = createClient();
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this enquiry?")) return;

    const { error } = await supabase
      .from("enquiries")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:brightness-110"
    >
      Delete
    </button>
  );
}