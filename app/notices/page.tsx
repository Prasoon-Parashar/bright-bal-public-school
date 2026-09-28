import { createClient } from "@/lib/supabase/server";
import { CalendarDays, BellRing } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const supabase = await createClient();

  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false });

  const latestNotice = notices?.[0];
  const otherNotices =
    notices?.filter((notice) => notice.id !== latestNotice?.id) ?? [];

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.12),_transparent_30%),linear-gradient(180deg,#fff7f7_0%,#ffffff_28%,#fff7f7_100%)] py-16 md:py-20">
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-red-100/60 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="overflow-hidden rounded-[32px] border border-red-100 bg-gradient-to-br from-red-700 via-red-600 to-red-500 shadow-[0_30px_60px_-15px_rgba(127,29,29,0.45)]">
          <div className="p-8 md:p-12">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-red-50 backdrop-blur-sm">
                  <BellRing size={16} />
                  School Announcements
                </div>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
                  Latest Notices
                </h1>
              </div>

              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-red-50 backdrop-blur-sm">
                <div className="font-semibold uppercase tracking-[0.2em] text-red-100/80">
                  Updated
                </div>
                <div className="mt-1 text-xl font-bold text-white">
                  {notices?.length ?? 0} notices
                </div>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-lg text-red-50/95">
              Stay updated with holidays, examinations, school events and important announcements from Bright Bal Public School.
            </p>
          </div>
        </div>

        {latestNotice && (
          <div className="mt-10 rounded-[30px] border border-red-100 bg-white p-7 shadow-[0_24px_50px_-18px_rgba(15,23,42,0.15)] md:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="inline-flex items-center rounded-full bg-red-600 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-white shadow-lg shadow-red-200">
                Latest Notice
              </span>

              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                <CalendarDays size={17} />
                {new Date(latestNotice.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>

            <h2 className="mt-6 border-l-4 border-red-600 pl-4 text-2xl font-black text-slate-900 md:text-4xl">
              {latestNotice.title}
            </h2>

            <p className="mt-6 whitespace-pre-line text-lg leading-8 text-slate-700">
              {latestNotice.description}
            </p>
          </div>
        )}

        {otherNotices.length > 0 && (
          <>
            <div className="mt-14 mb-6 flex items-center gap-3">
              <div className="h-8 w-2 rounded-full bg-gradient-to-b from-red-600 to-red-400" />
              <h2 className="text-2xl font-black text-slate-900 md:text-3xl">
                Previous Notices
              </h2>
            </div>

            <div className="space-y-5">
              {otherNotices.map((notice) => (
                <div
                  key={notice.id}
                  className="rounded-[24px] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_40px_-25px_rgba(15,23,42,0.3)] transition duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_24px_52px_-22px_rgba(239,68,68,0.28)]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-red-700">
                      Notice
                    </span>

                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      <CalendarDays size={16} />
                      {new Date(notice.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900 md:text-2xl">
                    {notice.title}
                  </h3>

                  <p className="mt-3 whitespace-pre-line text-base leading-7 text-slate-600">
                    {notice.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {!latestNotice && (
          <div className="mt-10 rounded-[30px] border border-dashed border-red-200 bg-white py-16 text-center shadow-[0_18px_40px_-24px_rgba(15,23,42,0.2)]">
            <BellRing size={55} className="mx-auto text-red-500" />

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              No Notices Available
            </h3>

            <p className="mt-2 text-slate-500">
              School announcements will appear here once published.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}