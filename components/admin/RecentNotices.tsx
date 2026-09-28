import { BellRing, CalendarDays } from "lucide-react";

type Notice = {
  id: number;
  title: string;
  description: string;
  notice_date: string;
};

export default function RecentNotices({
  notices,
}: {
  notices: Notice[];
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.35)] sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">Updates</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900">
            Recent Notices
          </h2>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-red-600">
          <BellRing size={22} />
        </div>
      </div>

      {notices.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-red-100 bg-red-50/40 py-10 text-center text-slate-500">
          <BellRing className="mx-auto mb-3 text-red-300" size={28} />
          No notices available.
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-red-50/30 p-4 transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg"
            >
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-red-500 to-orange-400" />
              <div className="flex items-center gap-2 text-sm font-semibold text-red-600">
                <CalendarDays size={16} />
                {notice.notice_date
                  ? new Date(notice.notice_date).toLocaleDateString("en-IN")
                  : "No Date"}
              </div>

              <h3 className="mt-2 text-lg font-black text-slate-900">
                {notice.title}
              </h3>

              <p className="mt-1 line-clamp-2 text-slate-600">
                {notice.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}