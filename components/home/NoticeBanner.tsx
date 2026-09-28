import Link from "next/link";
import { BellRing, CalendarDays, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function NoticeBanner() {
  const supabase = await createClient();

  const { data: notice } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!notice) return null;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-[32px] bg-gradient-to-r from-red-800 via-red-600 to-red-500 p-8 shadow-2xl">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div className="flex gap-4">

              <div className="rounded-2xl bg-white/15 p-4">
                <BellRing className="text-white" size={32} />
              </div>

              <div>

                <p className="text-red-100 font-semibold">
                  Latest School Notice
                </p>

                <h2 className="text-3xl font-bold text-white mt-2">
                  {notice.title}
                </h2>

                <p className="text-red-100 mt-2 line-clamp-2">
                  {notice.description}
                </p>

                <div className="flex items-center gap-2 text-red-100 mt-4 text-sm">
                  <CalendarDays size={16} />
                  {notice.notice_date
                    ? new Date(notice.notice_date).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : "Latest Announcement"}
                </div>

              </div>

            </div>

            <Link
              href="/notices"
              className="bg-white text-red-700 font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition"
            >
              Read Full Notice
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}