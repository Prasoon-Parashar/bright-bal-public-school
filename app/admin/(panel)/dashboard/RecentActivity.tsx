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
    <div className="rounded-[30px] border border-red-100 bg-gradient-to-br from-white via-red-50/40 to-orange-50/60 p-6 shadow-[0_22px_50px_-22px_rgba(15,23,42,0.22)] md:p-7">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-500">
            Activity
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Recent Notices
          </h2>
        </div>

        <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
          {safeNotices.length} items
        </div>
      </div>

      <div className="space-y-4">
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
              <div
                key={notice.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-bold text-slate-900 md:text-lg">
                      {notice.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-sm font-medium text-red-600">
                      <CalendarDays size={15} />
                      {displayDate}
                    </div>
                  </div>

                  <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-red-700">
                    {notice.status === "Published" ? "Live" : "Draft"}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                  {notice.description}
                </p>
              </div>
            );
          })
        ) : (
          <div className="rounded-2xl border border-dashed border-red-200 bg-red-50 p-6 text-center">
            <p className="text-sm font-medium text-slate-600">
              No recent notices available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}