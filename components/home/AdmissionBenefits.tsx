"use client";

import {
  School,
  MonitorSmartphone,
  Trophy,
  Bus,
  BookOpen,
  ShieldCheck,
  ArrowUpRight,
  Phone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const benefits = [
  {
    icon: School,
    title: "Experienced Teachers",
    desc: "Qualified and caring teachers focused on every child's success.",
    color: "red",
  },
  {
    icon: MonitorSmartphone,
    title: "Smart Classrooms",
    desc: "Modern classrooms equipped with digital learning facilities.",
    color: "blue",
  },
  {
    icon: Trophy,
    title: "Sports & Activities",
    desc: "Indoor and outdoor activities for complete personality development.",
    color: "red",
  },
  {
    icon: BookOpen,
    title: "Quality Education",
    desc: "Balanced curriculum with academic excellence and practical learning.",
    color: "blue",
  },
  {
    icon: Bus,
    title: "Transport Facility",
    desc: "Safe and reliable transportation across nearby areas.",
    color: "red",
  },
  {
    icon: ShieldCheck,
    title: "Safe Campus",
    desc: "Secure campus with a disciplined and student-friendly environment.",
    color: "blue",
  },
];

export default function AdmissionBenefits() {
  const reduceMotion = useReducedMotion();

  return (
    <aside className="space-y-7 lg:sticky lg:top-28 lg:h-fit">

      {/* BENEFITS CARD */}
      <div className="group relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.06] transition-shadow duration-500 hover:shadow-2xl hover:shadow-blue-950/[0.08]">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 top-48 h-40 w-40 rounded-full bg-red-100/40 blur-3xl" />

        {/* HEADER */}
        <div className="relative overflow-hidden bg-[#101B33] px-6 py-8 text-white sm:px-7">

          <div className="absolute inset-0 bg-gradient-to-br from-[#1565C0]/30 via-transparent to-[#C62828]/30" />

          <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full border border-white/10" />
          <div className="absolute -right-2 -top-4 h-24 w-24 rounded-full border border-white/10" />

          <div className="relative">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold tracking-wide text-blue-100 backdrop-blur-sm">
              <Sparkles size={14} className="text-yellow-300" />
              THE BRIGHT BAL ADVANTAGE
            </div>

            <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-[2.1rem]">
              Why Choose{" "}
              <span className="bg-gradient-to-r from-red-300 via-white to-blue-300 bg-clip-text text-transparent">
                Us?
              </span>
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">
              Building strong foundations, nurturing curious minds and helping
              every child move towards a brighter future.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#101B33] bg-red-100 text-red-700">
                  <BookOpen size={16} />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#101B33] bg-blue-100 text-blue-700">
                  <Trophy size={16} />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#101B33] bg-white text-[#101B33]">
                  <HeartIcon />
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-300">
                Learning · Growth · Values
              </p>
            </div>

          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C62828] via-white/70 to-[#1565C0]" />
        </div>

        {/* BENEFITS LIST */}
        <div className="relative space-y-3 p-4 sm:p-5">

          {benefits.map((item, index) => {
            const Icon = item.icon;
            const isRed = item.color === "red";

            return (
              <motion.div
                key={item.title}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion ? 0 : index * 0.06,
                }}
                className="group/item relative flex gap-4 overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:bg-slate-50/80 hover:shadow-lg hover:shadow-slate-900/[0.04]"
              >

                {/* Side accent */}
                <div
                  className={`absolute bottom-3 left-0 top-3 w-1 rounded-r-full transition-all duration-300 group-hover/item:top-1 group-hover/item:bottom-1 ${
                    isRed ? "bg-[#C62828]" : "bg-[#1565C0]"
                  }`}
                />

                {/* Icon */}
                <div
                  className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover/item:scale-105 group-hover/item:rotate-3 ${
                    isRed
                      ? "bg-red-50 text-[#C62828] group-hover/item:bg-[#C62828] group-hover/item:text-white"
                      : "bg-blue-50 text-[#1565C0] group-hover/item:bg-[#1565C0] group-hover/item:text-white"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.9} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-0.5">

                  <div className="flex items-start justify-between gap-2">

                    <h3 className="text-sm font-extrabold leading-5 text-[#101B33] transition-colors duration-300 group-hover/item:text-[#1565C0]">
                      {item.title}
                    </h3>

                    <span className="shrink-0 text-[10px] font-black tracking-wider text-slate-300">
                      0{index + 1}
                    </span>

                  </div>

                  <p className="mt-1.5 text-xs leading-6 text-slate-500">
                    {item.desc}
                  </p>

                </div>

              </motion.div>
            );
          })}

          {/* Bottom reassurance */}
          <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-white p-4">

            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-[#1565C0]"
            />

            <p className="text-xs leading-6 text-slate-600">
              A learning environment designed to support children's academic
              progress and overall development.
            </p>

          </div>

        </div>
      </div>

      {/* ADMISSIONS CTA CARD */}
      <div className="group relative overflow-hidden rounded-[2rem] bg-[#101B33] p-6 text-white shadow-xl shadow-slate-900/10 sm:p-7">

        {/* Background effects */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#C62828]/35 blur-3xl transition-transform duration-700 group-hover:scale-125" />
        <div className="pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#1565C0]/40 blur-3xl" />

        <div className="relative">

          <div className="flex items-center justify-between gap-3">

            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-red-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
              ADMISSIONS OPEN
            </span>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-blue-200">
              <GraduationCapIcon />
            </div>

          </div>

          <h3 className="mt-6 text-2xl font-black leading-tight sm:text-3xl">
            Every Great Journey
            <br />
            <span className="bg-gradient-to-r from-red-300 to-blue-300 bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            Give your child the opportunity to learn, explore and build a
            strong foundation for the future.
          </p>

          {/* Session badge */}
          <div className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-red-200">
              <School size={20} />
            </div>

            <div>
              <p className="text-xs font-medium text-slate-400">
                Academic Session
              </p>
              <p className="mt-0.5 font-extrabold text-white">
                2026–2027
              </p>
            </div>

            <div className="ml-auto text-right">
              <p className="text-xs text-slate-400">Classes</p>
              <p className="mt-0.5 text-sm font-bold text-blue-200">
                Nursery–VIII
              </p>
            </div>

          </div>

          {/* Contact */}
          <a
            href="tel:+919997157985"
            className="mt-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-4 transition-all duration-300 hover:border-white/30 hover:bg-white/10"
          >

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <Phone size={21} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-slate-400">
                Contact School Office
              </p>

              <p className="mt-1 text-lg font-black tracking-wide text-white">
                +91 99971 57985
              </p>
            </div>

            <ArrowUpRight
              size={20}
              className="shrink-0 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />

          </a>

          <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
            Admission is subject to document verification and school approval.
          </p>

        </div>
      </div>

    </aside>
  );
}

/* Small decorative icons */
function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="23"
      height="23"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m2 10 10-5 10 5-10 5-10-5Z" />
      <path d="M6 12v5c3.5 3 8.5 3 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}