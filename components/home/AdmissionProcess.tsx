
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  FolderOpen,
  Users,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Pencil,
  Star,
  GraduationCap,
  ClipboardCheck,
  School,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Fill Admission Form",
    description:
      "Complete the online admission form with the student's basic information and class preference.",
  },
  {
    number: "02",
    icon: FolderOpen,
    title: "Submit Documents",
    description:
      "Provide the required documents to the school for verification and admission records.",
  },
  {
    number: "03",
    icon: Users,
    title: "School Interaction",
    description:
      "Meet our school team for a simple interaction and discuss your child's admission.",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Admission Confirmed",
    description:
      "Complete the remaining formalities and begin your child's learning journey with us.",
  },
];

const floatingItems = [
  {
    icon: BookOpen,
    className: "left-[4%] top-[16%]",
    animation: { y: [0, -12, 0], rotate: [-5, 5, -5] },
    duration: 5,
    color: "text-[#C62828]/20",
    size: 54,
  },
  {
    icon: Star,
    className: "right-[7%] top-[12%]",
    animation: { y: [0, 10, 0], rotate: [0, 15, 0] },
    duration: 4.5,
    color: "text-yellow-400/50",
    size: 40,
  },
  {
    icon: Pencil,
    className: "left-[8%] bottom-[22%]",
    animation: { y: [0, 10, 0], rotate: [8, -8, 8] },
    duration: 4,
    color: "text-[#1565C0]/20",
    size: 45,
  },
  {
    icon: GraduationCap,
    className: "right-[5%] bottom-[20%]",
    animation: { y: [0, -10, 0], rotate: [4, -4, 4] },
    duration: 5.5,
    color: "text-[#1565C0]/20",
    size: 52,
  },
];

export default function AdmissionProcess() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#FEF2F2] via-white to-[#EFF6FF] py-20 sm:py-24 lg:py-28">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-red-200/35 blur-[140px]" />

        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-blue-200/40 blur-[150px]" />

        <div className="absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-yellow-100/50 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(#1565C0 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      {/* FLOATING EDUCATION ICONS */}
      {floatingItems.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            animate={item.animation}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`pointer-events-none absolute hidden md:block ${item.className} ${item.color}`}
          >
            <Icon size={item.size} strokeWidth={1.4} />
          </motion.div>
        );
      })}

      {/* DECORATIVE CIRCLES */}
      <motion.div
        animate={{ y: [0, -14, 0], x: [0, 8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[18%] top-[8%] hidden h-5 w-5 rounded-full bg-red-300/50 md:block"
      />

      <motion.div
        animate={{ y: [0, 12, 0], scale: [1, 1.15, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[20%] top-[28%] hidden h-4 w-4 rounded-full bg-blue-400/50 md:block"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute bottom-[15%] right-[14%] hidden h-20 w-20 rounded-full border-2 border-red-200/50 md:block"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#C62828] shadow-sm sm:text-sm"
          >
            <Sparkles size={16} />
            Admissions Open
          </motion.div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#101B33] sm:text-5xl lg:text-6xl">
            Your Journey to
            <span className="block bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] bg-clip-text text-transparent">
              Bright Bal Starts Here
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Joining Bright Bal Public School is simple and transparent.
            Complete these four easy steps to begin your child's
            admission journey.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-red-200" />
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-md shadow-red-500/20">
              <School size={17} />
            </span>
            <span className="h-px w-12 bg-blue-200" />
          </div>
        </motion.div>

        {/* ADMISSION STEPS */}
        <div className="relative mt-16 sm:mt-20">
          {/* Desktop connecting line */}
          <div className="absolute left-[12%] right-[12%] top-10 hidden lg:block">
            <div className="h-[3px] overflow-hidden rounded-full bg-blue-100">
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 1.5,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
                className="h-full rounded-full bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0]"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-between">
              {[1, 2, 3, 4].map((item) => (
                <motion.span
                  key={item}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: 0.5 + item * 0.15,
                  }}
                  className="h-3 w-3 rounded-full border-2 border-white bg-[#1565C0] shadow-md"
                />
              ))}
            </div>
          </div>

          {/* STEP CARDS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
            className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4"
          >

          
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isRed = index % 2 === 0;

              const accent = isRed
                ? {
                    gradient: "from-[#C62828] to-[#E53935]",
                    glow: "bg-red-100",
                    text: "text-[#C62828]",
                    badge: "bg-red-50 text-[#C62828]",
                    border: "group-hover:border-red-200",
                    number: "text-red-50 group-hover:text-red-100",
                    bottom:
                      "from-[#C62828] via-[#E53935] to-[#1565C0]",
                  }
                : {
                    gradient: "from-[#1565C0] to-[#0D47A1]",
                    glow: "bg-blue-100",
                    text: "text-[#1565C0]",
                    badge: "bg-blue-50 text-[#1565C0]",
                    border: "group-hover:border-blue-200",
                    number: "text-blue-50 group-hover:text-blue-100",
                    bottom:
                      "from-[#1565C0] via-[#0D47A1] to-[#C62828]",
                  };

              return (
                <motion.article
                  key={step.number}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 45,
                      scale: 0.95,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.65,
                        ease: "easeOut",
                      },
                    },
                  }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  {/* Step icon */}
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className={`relative z-20 mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] border-4 border-white bg-gradient-to-br ${accent.gradient} text-white shadow-xl shadow-slate-900/10`}
                  >
                    <Icon size={30} strokeWidth={2} />

                    <motion.span
                      animate={{
                        scale: [1, 1.35, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-yellow-300"
                    />
                  </motion.div>

                  {/* Card */}
                  <div
                    className={`relative -mt-9 min-h-[330px] overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white px-6 pb-8 pt-16 text-center shadow-[0_15px_45px_rgba(15,23,42,0.07)] transition-all duration-500 ${accent.border} hover:shadow-[0_25px_60px_rgba(21,101,192,0.12)]`}
                  >
                    {/* Decorative glow */}
                    <div
                      className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full ${accent.glow} opacity-70 blur-2xl transition-transform duration-700 group-hover:scale-150`}
                    />

                    <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-blue-50 opacity-70 blur-2xl" />

                    {/* Step number */}
                    <span
                      className={`absolute right-5 top-7 text-6xl font-black transition-colors duration-300 ${accent.number}`}
                    >
                      {step.number}
                    </span>

                    {/* Step badge */}
                    <div
                      className={`relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] ${accent.badge}`}
                    >
                      <CheckCircle2 size={13} />
                      Step {index + 1}
                    </div>

                    {/* Title */}
                    <h3
                      className={`relative mt-5 text-xl font-black text-[#101B33] transition-colors duration-300 sm:text-2xl group-hover:${accent.text}`}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="relative mt-4 text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>

                    {/* Bottom accent */}
                    <div
                      className={`absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r ${accent.bottom} transition-transform duration-500 group-hover:scale-x-100`}
                    />

                    {/* Next step indicator */}
                    <div
                      className={`absolute bottom-4 right-5 flex items-center gap-1 text-xs font-bold ${accent.text} opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100`}
                    >
                      {index === 3 ? "Let's Begin" : "Next Step"}
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>

        {/* ADMISSION CTA */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative mt-16 overflow-hidden rounded-[2.2rem] bg-[#101B33] shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:mt-20"
        >
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute right-20 top-10 hidden h-32 w-32 rounded-full border border-white/10 sm:block"
          />

          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute bottom-8 right-[20%] hidden text-white/10 sm:block"
          >
            <GraduationCap size={70} strokeWidth={1} />
          </motion.div>

          <div className="relative flex flex-col items-start justify-between gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:p-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-300/20 bg-red-400/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-200">
                <ClipboardCheck size={14} />
                Admissions Open
              </div>

              <h3 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Ready to Join
                <span className="block bg-gradient-to-r from-red-300 via-red-400 to-blue-300 bg-clip-text text-transparent sm:inline">
                  {" "}Bright Bal?
                </span>
              </h3>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
                Start your child's admission application online.
                Take the first step towards a bright future with
                Bright Bal Public School.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-blue-300" />
                  Simple Process
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-red-300" />
                  Easy Application
                </span>

                <span className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-yellow-300" />
                  School Support
                </span>
              </div>
            </div>

            {/* CTA button */}
            <Link
              href="/admissions"
              className="group relative inline-flex shrink-0 items-center gap-3 overflow-hidden rounded-2xl bg-[#C62828] px-7 py-4 font-bold text-white shadow-xl shadow-red-950/25 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1565C0] hover:shadow-blue-900/30 sm:px-8"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative">
                Apply for Admission
              </span>

              <ArrowRight
                size={19}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Bottom red-blue accent */}
          <div className="h-1.5 bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0]" />
        </motion.div>

        {/* BOTTOM TAGLINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-red-200" />

          <span className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 sm:text-xs">
            Learn • Grow • Shine
          </span>

          <span className="h-px w-8 bg-blue-200" />
        </motion.div>
      </div>
    </section>
  );
}