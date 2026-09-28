import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";
import { BellRing, CalendarDays, Clock3 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function NoticeList() {
  const supabase = await createClient();

  const { data: notices, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8">
        <p className="font-medium text-red-600">
          Failed to load notices.
        </p>
      </div>
    );
  }

  if (!notices?.length) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">

        <BellRing
          size={60}
          className="mx-auto text-red-500"
        />

        <h2 className="mt-5 text-2xl font-bold text-slate-800 dark:text-white">
          No Notices Available
        </h2>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Publish your first notice using the form above.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-6">

      {notices.map((notice) => (
        <div
          key={notice.id}
          className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        >

          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

            <div className="flex-1">

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-gradient-to-br from-red-700 to-red-500 p-3 shadow-lg">

                  <BellRing
                    size={22}
                    className="text-white"
                  />

                </div>

                <h2 className="text-2xl font-bold text-red-700 dark:text-red-400">
                  {notice.title}
                </h2>

              </div>

              <p className="mt-5 leading-8 text-slate-600 dark:text-slate-300">
                {notice.description}
              </p>
             
              {/* Dates */}

              <div className="mt-6 flex flex-wrap gap-3">

                <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">

                  <CalendarDays size={16} />

                  Event :
                  {notice.notice_date
                    ? new Date(
                        notice.notice_date
                      ).toLocaleDateString("en-GB")
                    : " Not Selected"}

                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">

                  <Clock3 size={16} />

                  Posted :
                  {new Date(
                    notice.created_at
                  ).toLocaleDateString("en-GB")}

                </div>

              </div>

            </div>

            <div className="flex justify-end">

              <DeleteButton id={notice.id} />

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}