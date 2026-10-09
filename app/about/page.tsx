"use client";

import SectionDivider from "@/components/home/SectionDivider";
import Link from "next/link";
import {
  BookOpen,
  Eye,
  Target,
  Heart,
  Users,
  GraduationCap,
  ShieldCheck,
  Trophy,
  ArrowRight,
  CheckCircle2,
  School,
  Sparkles,
  Compass,
  Star,
  MoveDown,
  Lightbulb,
  Globe2,
  BookMarked,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </motion.div>
  );
}

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={
        reduceMotion
          ? undefined
          : {
              x: [0, 16, -10, 0],
              y: [0, -18, 12, 0],
              scale: [1, 1.1, 0.96, 1],
            }
      }
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <main className="overflow-hidden bg-white text-[#18202B] dark:bg-[#080F1D] dark:text-white">

      {/* HERO SECTION */}
      <section className="relative isolate flex min-h-[590px] items-center overflow-hidden bg-[#101B33] py-20 text-white sm:min-h-[640px] sm:py-24 lg:min-h-[680px]">

        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_20%,rgba(198,40,40,0.45),transparent_42%),radial-gradient(ellipse_at_90%_75%,rgba(21,101,192,0.42),transparent_45%),linear-gradient(135deg,#101B33_0%,#172746_52%,#0B1428_100%)]" />

        {/* Animated glow */}
        <FloatingOrb
          className="-left-32 top-10 h-80 w-80 bg-red-600/20"
          delay={0}
        />

        <FloatingOrb
          className="-right-24 top-24 h-96 w-96 bg-blue-500/20"
          delay={2}
        />

        <FloatingOrb
          className="bottom-0 left-[42%] h-64 w-64 bg-red-500/10"
          delay={4}
        />

        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:54px_54px]"
        />

        {/* Orbit animation */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-1/2 hidden h-[510px] w-[510px] -translate-y-1/2 rounded-full border border-white/10 lg:block"
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={{
            duration: 65,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute left-[16%] top-[15%] h-5 w-5 rounded-full bg-red-500 shadow-[0_0_35px_rgba(229,57,53,0.8)]" />
          <div className="absolute bottom-[17%] right-[12%] h-4 w-4 rounded-full bg-blue-400 shadow-[0_0_30px_rgba(66,165,245,0.8)]" />
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 top-1/2 hidden h-[390px] w-[390px] -translate-y-1/2 rounded-full border border-white/[0.08] lg:block"
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={{
            duration: 48,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Hero content */}
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <motion.div
            className="relative z-10 max-w-4xl"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
          >
            {/* Label */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 shadow-lg shadow-black/10 backdrop-blur-xl sm:px-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
                </span>

                <School size={17} className="text-blue-300" />

                <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/90 sm:text-sm">
                  Get to Know Our School
                </span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-8 text-4xl font-black leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl xl:text-[82px]"
            >
              Where Young Minds

              <span className="mt-2 block">
                <span className="bg-gradient-to-r from-red-400 via-red-300 to-orange-200 bg-clip-text text-transparent">
                  Learn, Grow
                </span>

                <span className="text-white"> &amp; Shine.</span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9"
            >
              Discover Bright Bal Public School, Agra, where quality English
              medium education, strong values and a supportive environment help
              children build a brighter future.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/admissions"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#C62828] px-7 py-4 font-bold text-white shadow-xl shadow-red-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E53935] hover:shadow-2xl hover:shadow-red-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101B33]"
              >
                Explore Admissions

                <ArrowRight
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>

              <a
                href="#our-story"
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/[0.06] px-7 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/60 hover:bg-white/10"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-blue-300 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  <MoveDown size={16} />
                </span>

                Discover Our Story
              </a>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              variants={fadeUp}
              className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-white/10 pt-6 text-sm text-slate-300 sm:gap-x-9"
            >
              <span className="flex items-center gap-2">
                <BookOpen size={17} className="text-red-300" />
                Nursery to Class VIII
              </span>

              <span className="flex items-center gap-2">
                <Globe2 size={17} className="text-blue-300" />
                English Medium
              </span>

              <span className="flex items-center gap-2">
                <Compass size={17} className="text-red-300" />
                Agra, Uttar Pradesh
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent dark:from-[#080F1D]/30" />

        {/* Scroll hint */}
        <motion.a
          href="#our-story"
          aria-label="Scroll to our story"
          className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 p-3 text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 sm:flex"
          animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <MoveDown size={19} />
        </motion.a>
      </section>

            {/* OUR STORY SECTION */}
      <section
        id="our-story"
        className="relative overflow-hidden bg-white py-20 dark:bg-[#080F1D] sm:py-28"
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-100/60 blur-3xl dark:bg-red-950/20"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-950/20"
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* Left content */}
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-[#C62828] dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                <BookOpen size={17} />
                Our Story
              </div>

              <h2 className="mt-6 text-4xl font-black leading-[1.15] tracking-tight text-[#18202B] dark:text-white sm:text-5xl lg:text-[54px]">
                A Place Where Children

                <span className="mt-2 block bg-gradient-to-r from-[#C62828] via-red-500 to-[#1565C0] bg-clip-text pb-2 text-transparent">
                  Learn, Grow &amp; Succeed
                </span>
              </h2>

              <p className="mt-7 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                Bright Bal Public School is an English Medium School in Agra
                committed to providing a supportive and inspiring learning
                environment for students from Nursery to Class VIII.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                Our focus goes beyond textbooks. We encourage students to
                develop confidence, discipline, curiosity, creativity and
                strong moral values while building a solid academic foundation.
              </p>

              {/* Learning highlights */}
              <div className="mt-9 space-y-3">
                {[
                  {
                    icon: Users,
                    title: "Student-focused learning",
                    description:
                      "A supportive environment that encourages every child to participate.",
                    color: "red",
                  },
                  {
                    icon: GraduationCap,
                    title: "Strong academic foundation",
                    description:
                      "Building essential knowledge and learning habits from an early age.",
                    color: "blue",
                  },
                  {
                    icon: Lightbulb,
                    title: "Learning beyond textbooks",
                    description:
                      "Making room for curiosity, creativity and personal development.",
                    color: "red",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  const isBlue = item.color === "blue";

                  return (
                    <motion.div
                      key={item.title}
                      initial={
                        reduceMotion
                          ? false
                          : { opacity: 0, x: -18 }
                      }
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.55,
                        delay: index * 0.12,
                        ease: easeOut,
                      }}
                      className="group flex gap-4 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:border-slate-100 hover:bg-slate-50 hover:shadow-sm dark:hover:border-slate-800 dark:hover:bg-slate-900/70 sm:p-4"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 ${
                          isBlue
                            ? "bg-blue-50 text-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white dark:bg-blue-950/50"
                            : "bg-red-50 text-[#C62828] group-hover:bg-[#C62828] group-hover:text-white dark:bg-red-950/40"
                        }`}
                      >
                        <Icon size={22} strokeWidth={1.8} />
                      </div>

                      <div className="pt-0.5">
                        <h3 className="font-bold text-[#18202B] dark:text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Location badge */}
              <div className="mt-7 inline-flex flex-wrap items-center gap-2 rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-sm font-semibold text-[#1565C0] dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">
                <Compass size={18} />
                Agra, Uttar Pradesh
                <span className="text-blue-300">•</span>
                <span className="font-medium">English Medium School</span>
              </div>
            </Reveal>

            {/* Right information card */}
            <Reveal className="relative">
              <motion.div
                className="relative"
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.35, ease: easeOut }}
              >
                {/* Decorative rings */}
                <div
                  aria-hidden="true"
                  className="absolute -right-5 -top-5 h-32 w-32 rounded-full border border-blue-200/80 dark:border-blue-900/60"
                />

                <div
                  aria-hidden="true"
                  className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full border border-red-200/80 dark:border-red-900/60"
                />

                <div className="relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_25px_80px_rgba(15,23,42,0.10)] dark:border-slate-800 dark:bg-[#0D1729] sm:p-9">
                  {/* Top accent */}
                  <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-[#C62828] via-red-400 to-[#1565C0]" />

                  {/* Card heading */}
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C62828] dark:bg-red-950/40 dark:text-red-300"
                      animate={
                        reduceMotion
                          ? undefined
                          : { rotate: [0, -4, 4, 0] }
                      }
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <GraduationCap size={34} strokeWidth={1.7} />
                    </motion.div>

                    <div className="pt-1">
                      <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1565C0]">
                        Welcome to
                      </p>

                      <h3 className="mt-2 text-2xl font-black leading-tight text-[#18202B] dark:text-white sm:text-3xl">
                        Bright Bal
                        <span className="block text-[#C62828] dark:text-red-400">
                          Public School
                        </span>
                      </h3>
                    </div>
                  </div>

                  <p className="mt-7 text-base leading-7 text-slate-600 dark:text-slate-300">
                    A school environment focused on learning, personal growth,
                    discipline and values.
                  </p>

                  {/* Feature grid */}
                  <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      {
                        icon: BookMarked,
                        title: "Nursery to VIII",
                        subtitle: "School levels",
                        blue: false,
                      },
                      {
                        icon: Globe2,
                        title: "English",
                        subtitle: "Medium",
                        blue: true,
                      },
                      {
                        icon: Compass,
                        title: "Agra",
                        subtitle: "Location",
                        blue: true,
                      },
                      {
                        icon: Sparkles,
                        title: "Holistic",
                        subtitle: "Development",
                        blue: false,
                      },
                    ].map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={item.title}
                          initial={
                            reduceMotion
                              ? false
                              : { opacity: 0, y: 15 }
                          }
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.25 }}
                          transition={{
                            duration: 0.45,
                            delay: index * 0.1,
                          }}
                          whileHover={
                            reduceMotion
                              ? undefined
                              : { y: -4, scale: 1.015 }
                          }
                          className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition-colors duration-300 hover:border-blue-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-blue-800 sm:p-5"
                        >
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              item.blue
                                ? "bg-blue-50 text-[#1565C0] dark:bg-blue-950/50 dark:text-blue-300"
                                : "bg-red-50 text-[#C62828] dark:bg-red-950/40 dark:text-red-300"
                            }`}
                          >
                            <Icon size={21} />
                          </div>

                          <h4 className="mt-4 font-extrabold text-[#18202B] dark:text-white">
                            {item.title}
                          </h4>

                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {item.subtitle}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Bottom message */}
                  <div className="mt-5 flex items-center gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-red-50/70 p-4 dark:border-slate-700 dark:from-blue-950/30 dark:to-red-950/20 sm:p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#1565C0] shadow-sm dark:bg-slate-800 dark:text-blue-300">
                      <Heart size={21} />
                    </div>

                    <div>
                      <p className="font-bold text-[#18202B] dark:text-white">
                        Learning with purpose
                      </p>

                      <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">
                        Knowledge, confidence and character.
                      </p>
                    </div>

                    <motion.div
                      className="ml-auto shrink-0 text-yellow-500"
                      animate={
                        reduceMotion
                          ? undefined
                          : { scale: [1, 1.18, 1], rotate: [0, 8, 0] }
                      }
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                    >
                      <Star size={25} fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      <SectionDivider />

            {/* VISION & MISSION */}
      <section className="relative overflow-hidden bg-[#F8FAFC] py-20 dark:bg-[#0B1424] sm:py-28">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-950/20" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-red-100/60 blur-3xl dark:bg-red-950/20" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-[#1565C0] shadow-sm dark:border-blue-900/40 dark:bg-slate-900 dark:text-blue-300">
              <Sparkles size={16} />
              Our Purpose
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#18202B] dark:text-white sm:text-5xl lg:text-6xl">
              Guided by a
              <span className="mt-2 block bg-gradient-to-r from-[#C62828] via-red-500 to-[#1565C0] bg-clip-text pb-2 text-transparent">
                Bigger Purpose
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              Our vision and mission shape how we teach, support and inspire
              every child who walks through our doors.
            </p>
          </Reveal>

          <motion.div
            className="mt-14 grid gap-7 md:grid-cols-2 md:gap-8"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {/* Vision card */}
            <motion.article
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -7 }}
              className="group relative overflow-hidden rounded-[30px] border border-blue-100 bg-white p-7 shadow-[0_18px_55px_rgba(21,101,192,0.08)] transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(21,101,192,0.15)] dark:border-blue-900/40 dark:bg-[#101B2E] sm:p-10"
            >
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-blue-50 transition-transform duration-500 group-hover:scale-125 dark:bg-blue-950/30" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-blue-50 text-[#1565C0] transition-all duration-300 group-hover:rotate-3 group-hover:bg-[#1565C0] group-hover:text-white dark:bg-blue-950/50 dark:text-blue-300">
                    <Eye size={32} strokeWidth={1.7} />
                  </div>

                  <span className="text-5xl font-black text-blue-100 dark:text-blue-950/80">
                    01
                  </span>
                </div>

                <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-[#1565C0] dark:text-blue-300">
                  Our Vision
                </p>

                <h3 className="mt-3 text-3xl font-black leading-tight text-[#18202B] dark:text-white sm:text-4xl">
                  Inspiring a brighter tomorrow
                </h3>

                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                  To nurture curious, confident and responsible learners who
                  are prepared to face future challenges with knowledge,
                  creativity and strong values.
                </p>

                <div className="mt-7 flex items-center gap-3 border-t border-blue-100 pt-6 dark:border-blue-900/40">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0] dark:bg-blue-950/50 dark:text-blue-300">
                    <Lightbulb size={18} />
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Imagine. Discover. Achieve.
                  </span>
                </div>
              </div>
            </motion.article>

            {/* Mission card */}
            <motion.article
              variants={fadeUp}
              whileHover={reduceMotion ? undefined : { y: -7 }}
              className="group relative overflow-hidden rounded-[30px] border border-red-100 bg-white p-7 shadow-[0_18px_55px_rgba(198,40,40,0.07)] transition-shadow duration-300 hover:shadow-[0_25px_70px_rgba(198,40,40,0.14)] dark:border-red-900/40 dark:bg-[#101B2E] sm:p-10"
            >
              <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-red-50 transition-transform duration-500 group-hover:scale-125 dark:bg-red-950/30" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-[68px] w-[68px] items-center justify-center rounded-2xl bg-red-50 text-[#C62828] transition-all duration-300 group-hover:-rotate-3 group-hover:bg-[#C62828] group-hover:text-white dark:bg-red-950/40 dark:text-red-300">
                    <Target size={32} strokeWidth={1.7} />
                  </div>

                  <span className="text-5xl font-black text-red-100 dark:text-red-950/80">
                    02
                  </span>
                </div>

                <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.22em] text-[#C62828] dark:text-red-300">
                  Our Mission
                </p>

                <h3 className="mt-3 text-3xl font-black leading-tight text-[#18202B] dark:text-white sm:text-4xl">
                  Helping every child thrive
                </h3>

                <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                  To provide meaningful learning experiences, encourage
                  individual potential and build a foundation of discipline,
                  respect and lifelong learning.
                </p>

                <div className="mt-7 flex items-center gap-3 border-t border-red-100 pt-6 dark:border-red-900/40">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-[#C62828] dark:bg-red-950/40 dark:text-red-300">
                    <Heart size={18} />
                  </span>
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Care. Learn. Grow Together.
                  </span>
                </div>
              </div>
            </motion.article>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* OUR CORE VALUES */}
      <section className="relative overflow-hidden bg-white py-20 dark:bg-[#080F1D] sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-[#C62828] dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
              <ShieldCheck size={17} />
              What We Believe In
            </span>

            <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#18202B] dark:text-white sm:text-5xl lg:text-6xl">
              Values That Shape
              <span className="mt-2 block bg-gradient-to-r from-[#C62828] to-[#1565C0] bg-clip-text pb-2 text-transparent">
                Every Learner
              </span>
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
              Education is more than academic achievement. The values children
              learn today help shape the people they become tomorrow.
            </p>
          </Reveal>

          <motion.div
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {[
              {
                icon: Heart,
                title: "Care & Kindness",
                description:
                  "Encouraging empathy, respect and consideration for others.",
                color: "red",
              },
              {
                icon: ShieldCheck,
                title: "Integrity",
                description:
                  "Building honesty, responsibility and good character.",
                color: "blue",
              },
              {
                icon: Trophy,
                title: "Excellence",
                description:
                  "Helping students work towards their personal best.",
                color: "red",
              },
              {
                icon: Users,
                title: "Togetherness",
                description:
                  "Creating a spirit of cooperation, inclusion and belonging.",
                color: "blue",
              },
            ].map((value, index) => {
              const Icon = value.icon;
              const isBlue = value.color === "blue";

              return (
                <motion.article
                  key={value.title}
                  variants={fadeUp}
                  whileHover={reduceMotion ? undefined : { y: -8 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-red-200 hover:shadow-xl dark:border-slate-800 dark:bg-[#101B2E] dark:hover:border-red-900/60 sm:p-7"
                >
                  <div
                    className={`absolute -right-8 -top-8 h-24 w-24 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                      isBlue
                        ? "bg-blue-50 dark:bg-blue-950/30"
                        : "bg-red-50 dark:bg-red-950/30"
                    }`}
                  />

                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110 ${
                      isBlue
                        ? "bg-blue-50 text-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white dark:bg-blue-950/50 dark:text-blue-300"
                        : "bg-red-50 text-[#C62828] group-hover:bg-[#C62828] group-hover:text-white dark:bg-red-950/40 dark:text-red-300"
                    }`}
                  >
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <h3 className="relative mt-6 text-xl font-extrabold text-[#18202B] dark:text-white">
                    {value.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                    {value.description}
                  </p>

                  <div className="relative mt-6 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-400 transition-colors group-hover:text-[#C62828]">
                    <CheckCircle2 size={15} />
                    Our Commitment
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* FINAL ADMISSIONS CTA */}
      <section className="relative overflow-hidden bg-[#101B33] py-20 text-white sm:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(198,40,40,0.35),transparent_40%),radial-gradient(ellipse_at_90%_80%,rgba(21,101,192,0.4),transparent_45%)]" />

        <FloatingOrb
          className="-left-24 top-0 h-64 w-64 bg-red-600/15"
          delay={1}
        />

        <FloatingOrb
          className="-right-24 bottom-0 h-72 w-72 bg-blue-500/20"
          delay={3}
        />

        <Reveal className="relative mx-auto max-w-5xl px-5 text-center sm:px-8">
          <motion.div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-red-300 shadow-xl backdrop-blur-md"
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -6, 0], rotate: [0, 3, 0, -3, 0] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <GraduationCap size={34} />
          </motion.div>

          <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.24em] text-blue-300 sm:text-sm">
            Your Child's Journey Starts Here
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Every Great Journey
            <span className="mt-2 block bg-gradient-to-r from-red-300 via-red-400 to-blue-300 bg-clip-text pb-2 text-transparent">
              Begins with a First Step
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Explore Bright Bal Public School and take the next step towards a
            meaningful learning journey for your child.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/admissions"
              className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-[#C62828] px-8 py-4 font-extrabold text-white shadow-xl shadow-red-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#E53935] hover:shadow-2xl hover:shadow-red-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            >
              Explore Admissions
              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.06] px-8 py-4 font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:bg-white/10"
            >
              Contact Our School
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-300" />
              English Medium
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-red-300" />
              Nursery to Class VIII
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-300" />
              Agra, Uttar Pradesh
            </span>
          </div>
        </Reveal>
      </section>
    </main>
  );
}