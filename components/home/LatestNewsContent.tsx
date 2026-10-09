"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BellRing,
  CalendarDays,
  ArrowRight,
  Pin,
  FileText,
  Sparkles,
  School,
  Megaphone,
  Clock3,
  ShieldCheck,
} from "lucide-react";

type Notice = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  status?: string;
};

export default function LatestNewsContent({
  notice,
}: {
  notice: Notice | null;
}) {
  const formattedDate = notice?.created_at
    ? new Date(notice.created_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <section
      id="notices"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FEF2F2] via-white to-[#EFF6FF] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-red-200/40 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-blue-200/40 blur-[140px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100/40 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(#C62828 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* FLOATING DECORATIONS */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[5%] top-[18%] hidden text-[#C62828]/20 md:block"
      >
        <FileText size={55} strokeWidth={1.4} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, 12, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[6%] top-[15%] hidden text-yellow-400/70 md:block"
      >
        <Sparkles size={42} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[20%] left-[8%] hidden text-blue-500/20 md:block"
      >
        <Megaphone size={48} strokeWidth={1.4} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[16%] right-[6%] hidden text-[#C62828]/20 md:block"
      >
        <School size={52} strokeWidth={1.3} />
      </motion.div>

      {/* FLOATING DOTS */}
      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[18%] top-[10%] hidden h-4 w-4 rounded-full bg-red-300/60 md:block"
      />

      <motion.div
        animate={{ y: [0, 12, 0], scale: [1, 1.2, 1] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[20%] top-[35%] hidden h-5 w-5 rounded-full bg-blue-300/70 md:block"
      />

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/90 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#C62828] shadow-sm backdrop-blur-md sm:text-sm">
            <BellRing size={16} />
            School Updates
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#101B33] sm:text-5xl lg:text-6xl">
            Latest
            <span className="block bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] bg-clip-text text-transparent">
              Notices & Announcements
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Stay connected with important school announcements,
            holidays, examinations, events and the latest updates
            from Bright Bal Public School.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-red-200" />

            <motion.div
              animate={{ scale: [1, 1.12, 1], rotate: [0, 8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-lg shadow-red-500/20"
            >
              <Megaphone size={19} />
            </motion.div>

            <span className="h-px w-12 bg-blue-200" />
          </div>
        </motion.div>

        {/* NOTICE BOARD STARTS IN PART 2 */}

                {/* NOTICE BOARD */}
        {notice ? (
          <motion.div
            initial={{ opacity: 0, y: 45, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto mt-16 max-w-6xl sm:mt-20"
          >
            {/* Outer board frame */}
            <div className="relative rounded-[2.3rem] border border-white/10 bg-[#101B33] p-2.5 shadow-[0_35px_90px_rgba(15,23,42,0.22)] sm:p-4">
              <div className="relative overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#182844] via-[#13233C] to-[#0D47A1]/60">
                {/* Board texture */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />

                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

                {/* Board header */}
                <div className="relative flex flex-col gap-5 border-b border-white/10 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, -4, 4, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-lg shadow-red-950/30"
                    >
                      <BellRing size={27} />
                    </motion.div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-red-300">
                        Bright Bal Public School
                      </p>

                      <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                        School Notice Board
                      </h3>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-200">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-300" />
                    </span>
                    Latest Update
                  </div>
                </div>

                {/* Announcement paper */}
                <div className="relative p-4 sm:p-8 lg:p-10">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.3 }}
                    className="group relative mx-auto max-w-5xl"
                  >
                    {/* Floating pins */}
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -left-2 -top-3 z-30 hidden h-9 w-9 items-center justify-center rounded-full bg-[#C62828] shadow-lg sm:flex"
                    >
                      <Pin
                        size={16}
                        className="rotate-45 text-white"
                        fill="currentColor"
                      />
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -right-2 -top-3 z-30 hidden h-9 w-9 items-center justify-center rounded-full bg-[#1565C0] shadow-lg sm:flex"
                    >
                      <Pin
                        size={16}
                        className="rotate-45 text-white"
                        fill="currentColor"
                      />
                    </motion.div>

                    {/* Paper */}
                    <div className="relative overflow-hidden rounded-[1.7rem] border border-slate-200 bg-[#FFFDF8] shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                      <div className="h-2 bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0]" />

                      <div className="relative p-6 sm:p-9 lg:p-12">
                        {/* Paper decoration */}
                        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-red-50/80" />
                        <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-tr-full bg-blue-50/80" />

                        {/* Badges */}
                        <div className="relative flex flex-wrap items-center justify-between gap-3">
                          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#C62828] sm:text-xs">
                            <Sparkles size={14} />
                            School Announcement
                          </span>

                          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm">
                            <FileText
                              size={14}
                              className="text-[#1565C0]"
                            />
                            Official Notice
                          </span>
                        </div>

                        {/* Notice title */}
                        <h3 className="relative mt-7 max-w-4xl break-words text-3xl font-black leading-tight tracking-tight text-[#101B33] sm:text-4xl lg:text-5xl">
                          {notice.title}
                        </h3>

                        {/* Date and notice number */}
                        <div className="relative mt-5 flex flex-wrap items-center gap-3">
                          <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-[#1565C0]">
                            <CalendarDays size={17} />
                            {formattedDate}
                          </div>

                          <span className="h-1 w-1 rounded-full bg-slate-300" />

                          <span className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                            Notice No.{" "}
                            {String(notice.id).padStart(4, "0")}
                          </span>
                        </div>

                        {/* Separator */}
                        <div className="my-7 flex items-center gap-3">
                          <div className="h-px flex-1 bg-slate-200" />

                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#C62828]">
                            <BellRing size={16} />
                          </div>

                          <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        {/* Notice description */}
                        <p className="relative whitespace-pre-line break-words text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
                          {notice.description}
                        </p>

                        {/* Official footer */}
                        <div className="relative mt-9 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C62828]">
                              <School size={20} />
                            </div>

                            <div>
                              <p className="text-xs font-black text-[#101B33]">
                                Bright Bal Public School
                              </p>

                              <p className="mt-1 text-[11px] text-slate-500">
                                Agra, Uttar Pradesh
                              </p>
                            </div>
                          </div>

                          <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-right">
                            <ShieldCheck
                              size={15}
                              className="text-[#1565C0]"
                            />
                            Official School Communication
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Board footer */}
                <div className="border-t border-white/10 bg-black/10 px-5 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-red-300/50" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-300 sm:text-[10px]">
                      Stay Informed • Stay Connected
                    </span>

                    <span className="h-px w-8 bg-blue-300/50" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* EMPTY STATE */
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-[2rem] border border-dashed border-red-200 bg-white/90 p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:p-14"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-red-100/70 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-blue-100/70 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-xl shadow-red-500/20">
                <BellRing size={42} />
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#101B33] sm:text-3xl">
                No Notices Available
              </h3>

              <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-600">
                School announcements and important updates will appear
                here automatically as soon as they are published.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {["Announcements", "School Events", "Holidays", "Examinations"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-semibold text-[#1565C0]"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}

                {/* VIEW ALL NOTICES BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center sm:mt-14"
        >
          <Link
            href="/notices"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#C62828] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1565C0] hover:shadow-blue-700/20 sm:px-8 sm:py-4"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <span className="relative">View All Notices</span>

            <ArrowRight
              size={18}
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* BOTTOM TAGLINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-red-200" />

          <span className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 sm:text-xs">
            Inform • Connect • Participate
          </span>

          <span className="h-px w-8 bg-blue-200" />
        </motion.div>
      </div>
    </section>
  );
}