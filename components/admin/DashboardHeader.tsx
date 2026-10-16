
import { CalendarDays, ArrowUpRight } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="relative w-full min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#08122E] via-[#560012] to-[#D5001F] p-5 text-white shadow-lg sm:rounded-3xl sm:p-7 lg:rounded-[34px] lg:p-10">
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-500/20 blur-3xl sm:h-72 sm:w-72" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl sm:left-24 sm:h-64 sm:w-64" />

      <div className="relative grid min-w-0 grid-cols-1 items-start gap-5 sm:gap-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-center lg:gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* Left Content */}
        <div className="min-w-0">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-red-200 sm:text-xs sm:tracking-[0.3em] lg:text-sm">
            CONTROL CENTRE
          </p>

          <h1 className="break-words text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
            Bright Bal Public School
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-red-100 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
            A clear view of your school operations, admissions, notices,
            gallery, enquiries and daily activities from one dashboard.
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-1 lg:gap-4">
          {/* Today */}
          <div className="min-w-0 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:rounded-2xl sm:p-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-red-200 sm:text-xs sm:tracking-[0.15em]">
              <CalendarDays size={15} className="shrink-0" />
              Today
            </div>

            <p className="mt-2 break-words text-sm font-bold leading-6 text-white sm:mt-3 sm:text-base sm:leading-7">
              {today}
            </p>
          </div>

          {/* Live Status */}
          <div className="min-w-0 rounded-xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:rounded-2xl sm:p-5">
            <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-red-200 sm:text-xs sm:tracking-[0.15em]">
              <span>Live Status</span>
              <ArrowUpRight size={15} className="shrink-0" />
            </div>

            <div className="mt-3 flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400" />
              </span>

              <p className="break-words text-sm font-bold text-green-300 sm:text-base lg:text-lg">
                Live Updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
