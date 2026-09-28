"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ id }: { id: number }) {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admission application?"
    );

    if (!confirmed) return;

    setLoading(true);

    const { error } = await supabase
      .from("admissions")
      .delete()
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Application deleted successfully!");

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105 hover:shadow-red-600/50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={18} />

      {loading ? "Deleting..." : "Delete Application"}
    </button>
  );
}