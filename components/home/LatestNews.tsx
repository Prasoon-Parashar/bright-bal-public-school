import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { BellRing, CalendarDays, ArrowRight } from "lucide-react";

export default async function LatestNews() {
  const supabase = await createClient();

  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false })
    .limit(1); // Sirf latest notice

  const latestNotice = notices?.[0];

  return (
    <section className="bg-gradient-to-b from-red-50 to-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 font-semibold text-red-700">
            <BellRing size={18} />
            School Updates
          </span>

          <h2 className="mt-5 text-5xl font-extrabold text-slate-900">
            Latest <span className="text-red-600">Notices</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Stay updated with holidays, examinations, events and important announcements.
          </p>
        </div>

        {/* Single Latest Notice */}
        {latestNotice ? (
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 to-red-500 p-8 text-white shadow-2xl">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold">
              LATEST NOTICE
            </span>

            <h3 className="mt-5 text-4xl font-extrabold">
              {latestNotice.title}
            </h3>

            <div className="mt-4 flex items-center gap-2 text-red-100">
              <CalendarDays size={18} />
              {new Date(latestNotice.created_at).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>

            <p className="mt-6 whitespace-pre-line text-lg leading-8 text-red-50">
              {latestNotice.description}
            </p>
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-red-200 bg-white py-16 text-center shadow-md">
            <BellRing size={55} className="mx-auto text-red-400" />

            <h3 className="mt-5 text-2xl font-bold text-slate-800">
              No Notices Available
            </h3>

            <p className="mt-2 text-slate-500">
              School announcements will appear here automatically.
            </p>
          </div>
        )}

        {/* Button */}
        <div className="mt-14 text-center">
          <Link
            href="/notices"
            className="inline-flex items-center gap-3 rounded-full bg-red-700 px-7 py-4 font-semibold text-white transition hover:bg-red-800"
          >
            View All Notices
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}