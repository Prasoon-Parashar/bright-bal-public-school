import { createClient } from "@/lib/supabase/server";
import {
  CalendarDays,
  BellRing,
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  Clock3,
  Megaphone,
  GraduationCap,
  BookOpen,
  PartyPopper,
  FileText,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const supabase = await createClient();

  const { data: notices, error } = await supabase
    .from("notices")
    .select("*")
    .eq("status", "Published")
    .order("created_at", { ascending: false });

  const publishedNotices = notices ?? [];
  const latestNotice = publishedNotices[0];

  const otherNotices = latestNotice
    ? publishedNotices.filter((notice) => notice.id !== latestNotice.id)
    : [];

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <main className="overflow-hidden bg-white dark:bg-[#080F1D]">

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative isolate overflow-hidden bg-[#101B33] text-white">

        {/* Animated background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_15%,rgba(198,40,40,0.34),transparent_42%),radial-gradient(ellipse_at_90%_85%,rgba(21,101,192,0.30),transparent_42%)]" />

        <div className="notice-orb notice-orb-red absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-red-600/20 blur-3xl" />

        <div className="notice-orb notice-orb-blue absolute -bottom-32 left-[20%] -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="pointer-events-none absolute right-[12%] top-20 -z-10 h-24 w-24 rotate-12 rounded-3xl border border-white/10" />

        <div className="pointer-events-none absolute bottom-20 left-[8%] -z-10 h-14 w-14 rounded-full border border-red-300/20" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-10 lg:py-28">

          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.72fr]">

            {/* Hero text */}
            <div className="notice-enter">

              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm font-semibold text-blue-100 shadow-lg shadow-black/10 backdrop-blur-xl">

                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
                </span>

                <BellRing size={16} className="text-red-300" />

                Official School Announcements
              </div>

              <h1 className="mt-8 max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

                Stay Informed.
                <span className="mt-3 block bg-gradient-to-r from-red-400 via-rose-300 to-blue-300 bg-clip-text pb-2 text-transparent">
                  Never Miss
                  <br className="hidden sm:block" />{" "}
                  What Matters.
                </span>

              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Your trusted source for school holidays, examinations,
                important dates, celebrations and announcements from
                Bright Bal Public School.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">

                <Link
                  href="#latest-notice"
                  className="group inline-flex items-center gap-3 rounded-xl bg-[#C62828] px-6 py-4 font-bold text-white shadow-xl shadow-red-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1565C0] hover:shadow-blue-950/30"
                >
                  <Megaphone size={19} />

                  View Latest Notice

                  <ArrowDown
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </Link>

                <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3.5 backdrop-blur-lg">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                    <ShieldCheck size={23} />
                  </div>

                  <div>
                    <p className="font-bold text-white">
                      Official Updates
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Published school notices
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400">

                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={16} className="text-red-300" />
                  School Calendar
                </span>

                <span className="inline-flex items-center gap-2">
                  <BookOpen size={16} className="text-blue-300" />
                  Academic Updates
                </span>

                <span className="inline-flex items-center gap-2">
                  <PartyPopper size={16} className="text-yellow-300" />
                  School Events
                </span>

              </div>

            </div>

            {/* Hero information panel */}
            <div className="notice-enter notice-enter-delay relative mx-auto w-full max-w-md lg:max-w-none">

              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-red-500/20 to-blue-500/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] p-5 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-7">

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">
                      Notice Board
                    </p>

                    <h2 className="mt-2 text-2xl font-black text-white">
                      School Updates
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-950/30">
                    <BellRing size={27} />
                  </div>

                </div>

                <div className="my-7 h-px bg-gradient-to-r from-red-400/60 via-white/10 to-blue-400/60" />

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-colors duration-300 hover:bg-white/10">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
                      <FileText size={21} />
                    </div>

                    <p className="mt-4 text-3xl font-black text-white">
                      {publishedNotices.length}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Published Notices
                    </p>

                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-colors duration-300 hover:bg-white/10">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                      <Clock3 size={21} />
                    </div>

                    <p className="mt-4 text-lg font-black text-white">
                      Up to date
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      Latest first
                    </p>

                  </div>

                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-gradient-to-r from-red-500/10 to-blue-500/10 p-5">

                  <div className="flex items-start gap-3">

                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-yellow-300">
                      <Sparkles size={20} />
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold text-white">
                        Stay Connected
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        Check this page regularly for important school
                        announcements and updates.
                      </p>
                    </div>

                  </div>

                </div>

                <div className="mt-5 flex items-center justify-between gap-3 text-xs text-slate-400">

                  <span>Bright Bal Public School</span>

                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Official Board
                  </span>

                </div>

              </div>

              {/* Floating accent */}
              <div className="absolute -right-3 top-24 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[#C62828] text-white shadow-xl shadow-red-950/30 sm:-right-5">
                <Sparkles size={22} />
              </div>

            </div>

          </div>

        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C62828] via-white/40 to-[#1565C0]" />

      </section>

            {/* ==========================================
          LATEST NOTICE SECTION
      ========================================== */}
      <section
        id="latest-notice"
        className="relative scroll-mt-24 bg-gradient-to-b from-white via-red-50/30 to-slate-50 py-20 dark:from-[#080F1D] dark:via-[#101B33] dark:to-[#080F1D] sm:py-24"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-red-100/60 blur-3xl dark:bg-red-950/20" />

        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-950/20" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

          {/* Section heading */}
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-[#C62828] dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                <Sparkles size={16} />
                Important Announcements
              </div>

              <h2 className="mt-5 text-3xl font-black tracking-tight text-[#101B33] dark:text-white sm:text-4xl md:text-5xl">
                What&apos;s Happening
                <span className="mt-1 block text-[#C62828] dark:text-red-400">
                  At Our School?
                </span>
              </h2>

              <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
                Find the latest announcements and important information
                for students and parents, all in one place.
              </p>

            </div>

            <div className="flex items-center gap-3 self-start rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:self-auto">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C62828] dark:bg-red-950/40 dark:text-red-300">
                <CalendarDays size={22} />
              </div>

              <div>
                <p className="text-2xl font-black text-[#101B33] dark:text-white">
                  {publishedNotices.length}
                </p>

                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Published updates
                </p>
              </div>

            </div>

          </div>

          {/* Database error state */}
          {error ? (

            <div className="rounded-[2rem] border border-red-200 bg-white p-10 text-center shadow-xl shadow-red-950/5 dark:border-red-900/40 dark:bg-slate-900 sm:p-16">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C62828] dark:bg-red-950/40 dark:text-red-300">
                <BellRing size={30} />
              </div>

              <h3 className="mt-5 text-2xl font-black text-[#101B33] dark:text-white">
                Notices Could Not Be Loaded
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
                We couldn&apos;t retrieve school announcements right now.
                Please revisit this page later.
              </p>

            </div>

          ) : !latestNotice ? (

            /* Empty state */
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 sm:py-24">

              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-100/60 blur-3xl dark:bg-red-950/20" />

              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-950/20" />

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-50 to-blue-50 text-[#C62828] ring-1 ring-slate-200 dark:from-red-950/40 dark:to-blue-950/40 dark:ring-slate-700">
                <BellRing size={36} strokeWidth={1.5} />
              </div>

              <p className="relative mt-7 text-xs font-extrabold uppercase tracking-[0.25em] text-[#1565C0] dark:text-blue-400">
                Notice Board
              </p>

              <h3 className="relative mt-3 text-2xl font-black text-[#101B33] dark:text-white sm:text-3xl">
                No Notices Available
              </h3>

              <p className="relative mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                There are no published announcements at the moment.
                New school updates will appear here when published.
              </p>

              <div className="relative mt-7 flex justify-center gap-2">
                <span className="h-1.5 w-8 rounded-full bg-[#C62828]" />
                <span className="h-1.5 w-5 rounded-full bg-[#1565C0]" />
                <span className="h-1.5 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>

            </div>

          ) : (

            <>
              {/* Featured latest notice */}
              <article className="notice-card group relative overflow-hidden rounded-[2rem] border border-red-100 bg-white shadow-[0_25px_70px_-30px_rgba(198,40,40,0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_35px_80px_-30px_rgba(198,40,40,0.32)] dark:border-slate-800 dark:bg-slate-900">

                {/* Top accent */}
                <div className="h-1.5 bg-gradient-to-r from-[#C62828] via-red-400 to-[#1565C0]" />

                <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-50/80 transition-transform duration-700 group-hover:scale-125 dark:bg-red-950/20" />

                <div className="relative p-6 sm:p-9 md:p-12">

                  {/* Card top row */}
                  <div className="flex flex-wrap items-center justify-between gap-4">

                    <span className="inline-flex items-center gap-2 rounded-full bg-[#C62828] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-white shadow-lg shadow-red-200/70 dark:shadow-red-950/30">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
                      Latest Notice
                    </span>

                    <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                      <CalendarDays size={17} />
                      {formatDate(latestNotice.created_at)}
                    </div>

                  </div>

                  {/* Notice title */}
                  <div className="mt-8 flex items-start gap-4">

                    <div className="mt-1 hidden h-14 w-1.5 shrink-0 rounded-full bg-gradient-to-b from-[#C62828] to-[#1565C0] sm:block" />

                    <div className="min-w-0">

                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                        Bright Bal Public School
                      </p>

                      <h3 className="text-2xl font-black leading-tight tracking-tight text-[#101B33] transition-colors duration-300 group-hover:text-[#C62828] dark:text-white dark:group-hover:text-red-400 sm:text-3xl md:text-4xl lg:text-5xl">
                        {latestNotice.title}
                      </h3>

                    </div>

                  </div>

                  {/* Notice description */}
                  <div className="mt-7 rounded-2xl border border-slate-100 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/60 sm:p-7">

                    <p className="whitespace-pre-line break-words text-base leading-8 text-slate-700 dark:text-slate-300 sm:text-lg">
                      {latestNotice.description}
                    </p>

                  </div>

                  {/* Footer */}
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-6 dark:border-slate-800">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0] dark:bg-blue-950/40 dark:text-blue-300">
                        <GraduationCap size={23} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-[#101B33] dark:text-white">
                          School Administration
                        </p>

                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          Official announcement
                        </p>
                      </div>

                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-bold text-[#C62828] dark:text-red-400">
                      <ShieldCheck size={17} />
                      Verified School Update
                    </div>

                  </div>

                </div>

              </article>

              {/* Previous notices */}
              {otherNotices.length > 0 && (
                <div className="mt-16">

                  <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                    <div>

                      <div className="inline-flex items-center gap-2 text-sm font-bold text-[#1565C0] dark:text-blue-400">
                        <Clock3 size={17} />
                        Notice Archive
                      </div>

                      <h3 className="mt-3 text-2xl font-black text-[#101B33] dark:text-white sm:text-3xl">
                        Previous Notices
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Catch up on earlier announcements from our school.
                      </p>

                    </div>

                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                      <FileText size={16} className="text-[#C62828]" />
                      {otherNotices.length} archived{" "}
                      {otherNotices.length === 1 ? "notice" : "notices"}
                    </div>

                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">

                    {otherNotices.map((notice, index) => (

                      <article
                        key={notice.id}
                        className="notice-card group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_45px_-30px_rgba(15,23,42,0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:border-red-200 hover:shadow-[0_28px_55px_-28px_rgba(198,40,40,0.25)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-red-900/60 sm:p-7"
                        style={{
                          animationDelay: `${Math.min(index, 8) * 80}ms`,
                        }}
                      >

                        {/* Hover accent */}
                        <div className="absolute left-0 top-0 h-full w-1 origin-bottom scale-y-0 bg-gradient-to-b from-[#C62828] to-[#1565C0] transition-transform duration-500 group-hover:scale-y-100" />

                        <div className="flex items-start justify-between gap-4">

                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C62828] transition-all duration-300 group-hover:rotate-[-6deg] group-hover:bg-[#C62828] group-hover:text-white dark:bg-red-950/30 dark:text-red-300 dark:group-hover:bg-[#C62828] dark:group-hover:text-white">
                            <BellRing size={22} />
                          </div>

                          <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            <CalendarDays size={14} />
                            {formatDate(notice.created_at)}
                          </div>

                        </div>

                        <div className="mt-6">

                          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#1565C0] dark:text-blue-400">
                            School Announcement
                          </p>

                          <h4 className="mt-3 text-xl font-extrabold leading-snug text-[#101B33] transition-colors duration-300 group-hover:text-[#C62828] dark:text-white dark:group-hover:text-red-400 sm:text-2xl">
                            {notice.title}
                          </h4>

                          <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                            {notice.description}
                          </p>

                        </div>

                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5 dark:border-slate-800">

                          <span className="text-xs font-semibold text-slate-400">
                            Bright Bal Public School
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover:border-[#C62828] group-hover:bg-[#C62828] group-hover:text-white dark:border-slate-700 dark:text-slate-400">
                            <ArrowUpRight size={17} />
                          </span>

                        </div>

                      </article>

                    ))}

                  </div>

                </div>
              )}

            </>
          )}

        </div>
      </section>

            {/* ==========================================
          FINAL SCHOOL ANNOUNCEMENT STRIP
      ========================================== */}
      <section className="relative overflow-hidden border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-[#080F1D] sm:py-16">

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(198,40,40,0.07),transparent_45%),radial-gradient(ellipse_at_right,rgba(21,101,192,0.07),transparent_45%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#101B33] p-7 text-white shadow-2xl shadow-slate-900/10 sm:p-10 lg:p-12">

            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
                  <Sparkles size={15} />
                  Stay Informed
                </div>

                <h2 className="mt-5 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
                  Every Update Matters.
                  <span className="mt-1 block text-red-400">
                    Every Student Counts.
                  </span>
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                  Bright Bal Public School is committed to keeping
                  students and parents informed about important
                  academic updates and school announcements.
                </p>

              </div>

              <div className="relative flex shrink-0 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C62828] to-red-700 shadow-lg shadow-red-950/30">
                  <GraduationCap size={29} />
                </div>

                <div>
                  <p className="font-extrabold text-white">
                    Bright Bal
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Public School, Agra
                  </p>

                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-blue-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    Learn. Grow. Shine.
                  </div>
                </div>

              </div>

            </div>

            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C62828] via-red-300/70 to-[#1565C0]" />

          </div>

        </div>
      </section>

    </main>
  );
}