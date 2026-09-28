import { ShieldCheck, CalendarDays, ArrowUpRight } from "lucide-react";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-[34px] bg-gradient-to-br from-[#08122E] via-[#560012] to-[#D5001F] p-8 text-white shadow-[0_25px_60px_rgba(220,38,38,0.28)] lg:p-10">

      {/* Background Glow Effects */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-red-500/20 blur-3xl"></div>
      <div className="absolute -bottom-24 left-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl"></div>

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Content */}
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-red-200">
            CONTROL CENTRE
          </p>

          <h1 className="text-4xl font-black leading-tight lg:text-6xl">
            Bright Bal Public School
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-8 text-red-100">
            A clear view of your school operations, admissions, notices,
            gallery, enquiries and daily activities from one dashboard.
          </p>
        </div>

        {/* Right Side Cards */}
        <div className="flex flex-col gap-4 lg:w-[320px]">

          {/* Today */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-red-200">
              <CalendarDays size={15} />
              Today
            </div>

            <p className="mt-3 text-lg font-bold leading-7 text-white">
              {today}
            </p>
          </div>

          {/* Live Status */}
          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.2em] text-red-200">
              <span>Live Status</span>
              <ArrowUpRight size={15} />
            </div>

            <div className="mt-3 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-400"></span>
              </span>

              <p className="text-lg font-bold text-green-300">
                Live Updates
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}