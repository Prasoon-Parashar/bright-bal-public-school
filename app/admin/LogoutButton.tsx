"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-12 flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 py-3 text-white hover:bg-red-800 transition"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}