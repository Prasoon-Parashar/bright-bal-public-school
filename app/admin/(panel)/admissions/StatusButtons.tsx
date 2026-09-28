"use client";

import { createClient } from "@/lib/supabase/client";
import { useTransition } from "react";
import { CheckCircle, XCircle, Clock3, Loader2 } from "lucide-react";

export default function StatusButtons({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  const supabase = createClient();
  const [loading, startTransition] = useTransition();

  async function updateStatus(newStatus: string) {
    await supabase
      .from("admissions")
      .update({ status: newStatus })
      .eq("id", id);

    window.location.reload();
  }

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
            Application status
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Update the admission decision
          </p>
        </div>
        {loading && <Loader2 className="animate-spin text-red-600" size={18} />}
      </div>

      <div className="grid gap-2 sm:grid-cols-3">
      <button
        disabled={loading}
        onClick={() =>
          startTransition(() => updateStatus("Approved"))
        }
        className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60
        ${
          status === "Approved"
            ? "border-green-600 bg-green-600 text-white shadow-md shadow-green-200"
            : "border-green-200 bg-white text-green-700 hover:-translate-y-0.5 hover:border-green-400 hover:bg-green-50"
        }`}
      >
        <CheckCircle size={16} />
        Approve
      </button>

      <button
        disabled={loading}
        onClick={() =>
          startTransition(() => updateStatus("Rejected"))
        }
        className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60
        ${
          status === "Rejected"
            ? "border-red-600 bg-red-600 text-white shadow-md shadow-red-200"
            : "border-red-200 bg-white text-red-700 hover:-translate-y-0.5 hover:border-red-400 hover:bg-red-50"
        }`}
      >
        <XCircle size={16} />
        Reject
      </button>

      <button
        disabled={loading}
        onClick={() =>
          startTransition(() => updateStatus("Pending"))
        }
        className={`flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60
        ${
          status === "Pending"
            ? "border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-200"
            : "border-amber-200 bg-white text-amber-700 hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50"
        }`}
      >
        <Clock3 size={16} />
        Pending
      </button>
      </div>
    </div>
  );
}