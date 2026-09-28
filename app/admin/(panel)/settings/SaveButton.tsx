"use client";

import { Save, Loader2 } from "lucide-react";

type Props = {
  loading: boolean;
  onClick: () => void;
};

export default function SaveButton({ loading, onClick }: Props) {
  return (
    <div className="sticky bottom-5 z-50 flex justify-end">
      <button
        onClick={onClick}
        disabled={loading}
        className="
          flex items-center gap-3 rounded-2xl
          bg-gradient-to-r from-red-700 to-red-600
          px-8 py-4 font-bold text-white
          shadow-xl transition-all duration-300
          hover:scale-[1.03]
          hover:shadow-red-300
          disabled:opacity-70
        "
      >
        {loading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Save size={20} />
        )}

        {loading ? "Saving..." : "Save Settings"}
      </button>
    </div>
  );
}