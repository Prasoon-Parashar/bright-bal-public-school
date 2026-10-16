
import { createClient } from "@/lib/supabase/server";
import { CalendarDays } from "lucide-react";

export default async function RecentActivity() {
  const supabase = await createClient();

  const { data: notices } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const safeNotices = notices ?? [];

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-orange-50/60 p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-7">
      {/* Header */}
      <div className="mb-5 flex min-w-0 items-center justify-between gap-3 sm:mb-6">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-500 sm:text-xs sm:tracking-[0.18em]">
            Activity
          </p>

          <h2 className="mt-1.5 break-words text-xl font-black leading-tight text-slate-900 sm:mt-2 sm:text-2xl">
            Recent Notices
          </h2>
        </div>

        <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700 sm:px-3">
          {safeNotices.length} items
        </span>
      </div>

      {/* Notice List */}
      <div className="space-y-3 sm:space-y-4">
        {safeNotices.length > 0 ? (
          safeNotices.map((notice) => {
            const displayDate = notice.created_at
              ? new Date(notice.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Recently";

            return (
              <article
                key={notice.id}
                className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-colors hover:border-red-200 sm:rounded-2xl sm:p-4"
              >
                <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="break-words text-sm font-bold leading-5 text-slate-900 sm:text-base sm:leading-6 md:text-lg">
                      {notice.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs font-medium text-red-600 sm:gap-2 sm:text-sm">
                      <CalendarDays size={14} className="shrink-0" />
                      <span>{displayDate}</span>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-red-100 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-red-700 sm:text-[10px] sm:tracking-wider">
                    {notice.status === "Published" ? "Live" : "Draft"}
                  </span>
                </div>

                {notice.description && (
                  <p className="mt-2 break-words text-sm leading-5 text-slate-600 sm:mt-3 sm:leading-6">
                    {notice.description}
                  </p>
                )}
              </article>
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed border-red-200 bg-red-50 p-5 text-center sm:rounded-2xl sm:p-6">
            <p className="text-sm font-medium text-slate-600">
              No recent notices available.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
