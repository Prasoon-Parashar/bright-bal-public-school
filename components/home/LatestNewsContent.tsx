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
  return (
    <section className="relative overflow-hidden bg-[#f8faf9] py-24 sm:py-28 lg:py-32">
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-red-100/60 blur-[150px]" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-green-100/70 blur-[150px]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-yellow-100/40 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(#0aa84f 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      {/* Floating decorations */}

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[5%] top-[18%] hidden text-[#0aa84f]/20 md:block"
      >
        <FileText size={55} strokeWidth={1.4} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[6%] top-[15%] hidden text-yellow-500/25 md:block"
      >
        <Sparkles size={42} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[20%] left-[8%] hidden text-red-500/20 md:block"
      >
        <Megaphone size={48} strokeWidth={1.4} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[16%] right-[6%] hidden text-[#0aa84f]/20 md:block"
      >
        <School size={52} strokeWidth={1.3} />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-red-700 shadow-sm sm:text-sm">
            <BellRing size={16} />
            School Updates
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Latest{" "}
            <span className="text-[#0aa84f]">
              Notices
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Stay updated with important announcements, holidays,
            examinations, events and school information.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-red-200" />

            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-[#0aa84f]"
            >
              <Megaphone size={17} />
            </motion.div>

            <span className="h-px w-12 bg-red-200" />
          </div>
        </motion.div>

        {/* NOTICE */}

        {notice ? (
          <motion.div
            initial={{ opacity: 0, y: 55, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto mt-16 max-w-6xl sm:mt-20"
          >
            {/* Board */}

            <div className="relative rounded-[2.5rem] bg-[#17251e] p-3 shadow-[0_35px_90px_rgba(15,23,42,0.22)] sm:p-4">
              <div className="relative overflow-hidden rounded-[2rem] bg-[#244236]">
                {/* Board texture */}

                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.12]"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />

                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0aa84f]/20 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-red-500/10 blur-3xl" />

                {/* Board Header */}

                <div className="relative flex flex-col gap-5 border-b border-white/10 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-9">
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: [0, -4, 4, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#62e89a]"
                    >
                      <BellRing size={27} />
                    </motion.div>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#62e89a]">
                        Bright Bal Public School
                      </p>

                      <h3 className="mt-1 text-2xl font-black text-white sm:text-3xl">
                        School Notice Board
                      </h3>
                    </div>
                  </div>

                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-300">
                    <Clock3 size={14} />
                    Latest Update
                  </div>
                </div>

                {/* Paper */}

                <div className="relative p-5 sm:p-8 lg:p-10">
                  <motion.div
                    whileHover={{ y: -4, rotate: 0.15 }}
                    transition={{ duration: 0.35 }}
                    className="group relative mx-auto max-w-5xl"
                  >
                    {/* Pins */}

                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -left-2 -top-3 z-30 hidden h-8 w-8 items-center justify-center rounded-full bg-red-600 shadow-lg sm:flex"
                    >
                      <Pin
                        size={15}
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
                      className="absolute -right-2 -top-3 z-30 hidden h-8 w-8 items-center justify-center rounded-full bg-[#0aa84f] shadow-lg sm:flex"
                    >
                      <Pin
                        size={15}
                        className="rotate-45 text-white"
                        fill="currentColor"
                      />
                    </motion.div>

                    {/* Paper */}

                    <div className="relative overflow-hidden rounded-[1.7rem] border border-slate-200 bg-[#fffdf8] shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
                      <div className="h-2 bg-gradient-to-r from-[#078a43] via-[#0aa84f] to-red-500" />

                      <div className="relative p-7 sm:p-10 lg:p-12">
                        {/* Paper decoration */}

                        <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-bl-full bg-red-50/70" />

                        <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-tr-full bg-green-50/80" />

                        {/* Badges */}

                        <div className="relative flex flex-wrap items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-red-700 sm:text-xs">
                            <Sparkles size={14} />
                            Latest Notice
                          </span>

                          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-sm">
                            <FileText
                              size={14}
                              className="text-[#0aa84f]"
                            />
                            Official Announcement
                          </span>
                        </div>

                        {/* Title */}

                        <h3 className="relative mt-7 max-w-4xl text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                          {notice.title}
                        </h3>

                        {/* Date */}

                        <div className="relative mt-5 flex flex-wrap items-center gap-4">
                          <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2.5 text-sm font-bold text-[#078a43]">
                            <CalendarDays size={17} />

                            {new Date(
                              notice.created_at
                            ).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>

                          <span className="h-1 w-1 rounded-full bg-slate-300" />

                          <span className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                            Notice No.{" "}
                            {String(notice.id).padStart(4, "0")}
                          </span>
                        </div>

                        {/* Separator */}

                        <div className="my-7 flex items-center gap-3">
                          <div className="h-px flex-1 bg-slate-200" />

                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600">
                            <BellRing size={15} />
                          </div>

                          <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        {/* Description */}

                        <p className="relative whitespace-pre-line text-[16px] leading-8 text-slate-600 sm:text-lg sm:leading-9">
                          {notice.description}
                        </p>

                        {/* Official Footer */}

                        <div className="relative mt-9 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-[#0aa84f]">
                              <School size={19} />
                            </div>

                            <div>
                              <p className="text-xs font-black text-slate-800">
                                Bright Bal Public School
                              </p>

                              <p className="text-[11px] text-slate-500">
                                Agra, Uttar Pradesh
                              </p>
                            </div>
                          </div>

                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:text-right">
                            Official School Communication
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Board Footer */}

                <div className="border-t border-white/10 bg-black/10 px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-px w-8 bg-[#38d982]/40" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-[10px]">
                      Stay Informed • Stay Connected
                    </span>

                    <span className="h-px w-8 bg-[#38d982]/40" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Empty State */

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto mt-16 max-w-4xl rounded-[2rem] border border-dashed border-red-200 bg-white p-10 text-center shadow-[0_20px_60px_rgba(15,23,42,0.07)] sm:p-16"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500">
              <BellRing size={43} />
            </div>

            <h3 className="mt-6 text-3xl font-black text-slate-900">
              No Notices Available
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-500">
              School announcements and important updates will appear here
              automatically.
            </p>
          </motion.div>
        )}

        {/* View All */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex justify-center sm:mt-14"
        >
          <Link
            href="/notices"
            className="group inline-flex items-center gap-3 rounded-full bg-[#078a43] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-700/15 transition-all duration-300 hover:-translate-y-1 hover:bg-red-600 hover:shadow-red-500/20 sm:px-8 sm:py-4"
          >
            View All Notices

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        {/* Tagline */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-green-200" />

          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
            Inform • Connect • Participate
          </span>

          <span className="h-px w-8 bg-green-200" />
        </motion.div>
      </div>
    </section>
  );
}