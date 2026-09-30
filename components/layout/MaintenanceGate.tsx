"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Construction } from "lucide-react";

const supabase = createClient();

export default function MaintenanceGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [maintenance, setMaintenance] = useState(false);
  const [message, setMessage] = useState(
    "Website is currently under maintenance. We will be back shortly."
  );
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    async function checkMaintenance() {
      // Admin aur login pages ko maintenance se kabhi block mat karo
      if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/login")
      ) {
        setMaintenance(false);
        setChecked(true);
        return;
      }

      const { data, error } = await supabase
        .from("school_settings")
        .select("maintenance_mode, maintenance_message")
        .eq("id", 1)
        .single();

      if (!error && data) {
        setMaintenance(Boolean(data.maintenance_mode));

        setMessage(
          data.maintenance_message ||
            "Website is currently under maintenance. We will be back shortly."
        );
      } else {
        // Agar database read fail ho, website ko normal rakho
        setMaintenance(false);
      }

      setChecked(true);
    }

    checkMaintenance();
  }, [pathname]);

  // Database check hone tak normal content
  if (!checked) {
    return children;
  }

  // Maintenance OFF
  if (!maintenance) {
    return children;
  }

  // Maintenance ON
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff7f4] px-6 py-12">
      <div className="w-full max-w-2xl rounded-[28px] bg-white px-8 py-12 text-center shadow-[0_25px_70px_rgba(15,23,42,0.15)] sm:px-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-yellow-100">
          <Construction
            size={42}
            className="text-yellow-700"
          />
        </div>

        <h1 className="mt-7 text-4xl font-black text-red-700 sm:text-5xl">
          Website Under
          <br />
          Maintenance
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-700">
          {message}
        </p>

        <p className="mt-8 text-sm font-semibold text-slate-400">
          Bright Bal Public School
        </p>
      </div>
    </main>
  );
}