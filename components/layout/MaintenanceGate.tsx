"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Construction, ShieldCheck } from "lucide-react";

const supabase = createClient();

export default function MaintenanceGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [maintenance, setMaintenance] = useState(false);
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState(
    "Website is under maintenance. We'll be back shortly."
  );

  useEffect(() => {
    async function checkMaintenance() {
      // Admin/login should always remain accessible.
      if (pathname.startsWith("/admin") || pathname.startsWith("/login")) {
        setChecked(true);
        return;
      }

      const { data, error } = await supabase
        .from("school_settings")
        .select("maintenance_mode, maintenance_message")
        .order("id", { ascending: true })
        .limit(1);

      if (!error && data?.[0]) {
        setMaintenance(Boolean(data[0].maintenance_mode));

        if (data[0].maintenance_message) {
          setMessage(data[0].maintenance_message);
        }
      }

      setChecked(true);
    }

    checkMaintenance();
  }, [pathname]);

  if (!checked) {
    return children;
  }

  if (!maintenance) {
    return children;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-red-950 to-red-700 px-6 py-16">
      <div className="w-full max-w-2xl text-center text-white">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 shadow-2xl ring-1 ring-white/20 backdrop-blur">
          <Construction size={38} />
        </div>

        <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-red-200">
          Bright Bal Public School
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          We'll be back soon!
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-red-100 sm:text-lg">
          {message}
        </p>

        <div className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur">
          <ShieldCheck size={18} />
          Bright Bal Public School
        </div>
      </div>
    </main>
  );
}