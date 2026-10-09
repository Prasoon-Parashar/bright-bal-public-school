"use client";

import {
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Heart,
  ShieldCheck,
  Star,
  MoveDown,
  School,
  Users,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: BookOpen,
    title: "Strong Academic Foundation",
    description:
      "Build essential knowledge, confidence and a love for learning.",
    color: "text-red-200",
    bg: "bg-red-400/15",
  },
  {
    icon: Users,
    title: "Dedicated Teachers",
    description:
      "Supportive guidance to help every child learn and grow.",
    color: "text-blue-200",
    bg: "bg-blue-400/15",
  },
  {
    icon: Heart,
    title: "Learning Beyond Books",
    description:
      "Encourage creativity, participation and all-round development.",
    color: "text-rose-200",
    bg: "bg-rose-400/15",
  },
];

export default function AdmissionHero() {
  const scrollToForm = () => {
    const element = document.getElementById("admission-form");

    if (!element) return;

    const y =
      element.getBoundingClientRect().top +
      window.scrollY -
      100;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#101B33] text-white">

      {/* BACKGROUND LIGHTING */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_10%,rgba(198,40,40,0.42),transparent_42%),radial-gradient(ellipse_at_90%_70%,rgba(21,101,192,0.32),transparent_42%)]" />

      <div className="admission-orb admission-orb-red absolute -right-24 -top-28 -z-10 h-96 w-96 rounded-full bg-red-600/25 blur-3xl" />

      <div className="admission-orb admission-orb-blue absolute -bottom-40 left-[10%] -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-600/20 blur-3xl" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative elements */}
      <div className="pointer-events-none absolute right-[10%] top-28 -z-10 h-24 w-24 rotate-12 rounded-3xl border border-white/10" />

      <div className="pointer-events-none absolute bottom-32 left-[6%] -z-10 h-16 w-16 rounded-full border border-red-300/20" />

      {/* MAIN CONTENT */}
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:px-10 lg:pb-24 lg:pt-24">

        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

          {/* LEFT CONTENT */}
          <div className="admission-enter text-center lg:text-left">

            {/* Admission badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-sm font-bold text-blue-100 shadow-lg shadow-black/10 backdrop-blur-xl">

              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
              </span>

              <GraduationCap size={19} className="text-red-300" />

              Admissions Open
              <span className="text-white/35">|</span>
              Session 2026–27

            </div>

            {/* Heading */}
            <h1 className="mt-8 text-4xl font-black leading-[1.1] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">

              Give Your Child
              <span className="mt-2 block text-white">
                a Head Start
              </span>

              <span className="mt-2 block bg-gradient-to-r from-red-400 via-rose-300 to-blue-300 bg-clip-text pb-2 text-transparent">
                Toward a Bright Future.
              </span>

            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
              Every child has the potential to shine. At Bright Bal Public
              School, we aim to build strong foundations through learning,
              curiosity, discipline and personal growth.
            </p>

            {/* Class information */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start">

              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur">
                <School size={17} className="text-red-300" />
                Nursery to Class VIII
              </span>

              <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur">
                <BookOpen size={17} className="text-blue-300" />
                English Medium
              </span>

            </div>

            {/* CTA buttons */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 lg:justify-start">

              <button
                type="button"
                onClick={scrollToForm}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#C62828] px-7 py-4 font-bold text-white shadow-xl shadow-red-950/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1565C0] hover:shadow-blue-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#101B33]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                <span className="relative">Apply for Admission</span>

                <ArrowRight
                  size={19}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.04] px-7 py-4 font-bold text-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/50 hover:bg-white/10"
              >
                Contact School

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400 lg:justify-start">

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-300" />
                Student-focused learning
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-300" />
                Holistic development
              </span>

            </div>

          </div>

          {/* RIGHT VISUAL PANEL */}
          <div className="admission-enter admission-enter-delay relative mx-auto w-full max-w-lg lg:max-w-none">

            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-red-500/20 to-blue-500/20 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-6">

              {/* Panel header */}
              <div className="flex items-center justify-between gap-4">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.23em] text-blue-200">
                    Begin the Journey
                  </p>

                  <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    A Brighter Tomorrow
                  </h2>
                </div>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-700 shadow-lg shadow-red-950/30">
                  <GraduationCap size={29} />
                </div>

              </div>

              <div className="my-6 h-px bg-gradient-to-r from-red-400/60 via-white/10 to-blue-400/60" />

              {/* Main visual */}
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-gradient-to-br from-[#1C2D4D] via-[#172641] to-[#10203D] px-5 py-8 sm:px-7 sm:py-10">

                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/15 blur-2xl" />

                <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />

                <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/15 bg-white/[0.08] shadow-xl shadow-black/10">

                  <GraduationCap
                    size={48}
                    strokeWidth={1.4}
                    className="text-blue-200"
                  />

                  <span className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#C62828] text-white shadow-lg">
                    <Sparkles size={19} />
                  </span>

                </div>

                <p className="relative mt-7 text-center text-xs font-bold uppercase tracking-[0.25em] text-red-300">
                  Every Child Can Shine
                </p>

                <h3 className="relative mx-auto mt-3 max-w-sm text-center text-2xl font-black leading-tight text-white sm:text-3xl">
                  Discover.
                  <span className="text-blue-200"> Learn.</span>
                  <span className="text-red-300"> Grow.</span>
                </h3>

                <p className="relative mx-auto mt-4 max-w-sm text-center text-sm leading-7 text-slate-300">
                  A supportive learning environment where young minds
                  are encouraged to explore their potential.
                </p>

                {/* Learning stages */}
                <div className="relative mt-8 grid grid-cols-3 gap-2">

                  {[
                    { number: "01", label: "Explore" },
                    { number: "02", label: "Learn" },
                    { number: "03", label: "Achieve" },
                  ].map((item, index) => (
                    <div
                      key={item.number}
                      className="rounded-xl border border-white/10 bg-white/[0.05] px-2 py-3 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
                    >
                      <p
                        className={`text-xs font-black ${
                          index === 1 ? "text-blue-300" : "text-red-300"
                        }`}
                      >
                        {item.number}
                      </p>

                      <p className="mt-1.5 text-xs font-semibold text-slate-200 sm:text-sm">
                        {item.label}
                      </p>
                    </div>
                  ))}

                </div>

              </div>

              {/* Quick information */}
              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-colors duration-300 hover:bg-white/10">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
                    <BookOpen size={21} />
                  </div>

                  <p className="mt-3 font-bold text-white">
                    Quality Education
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Building knowledge and confidence.
                  </p>

                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-colors duration-300 hover:bg-white/10">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
                    <Heart size={21} />
                  </div>

                  <p className="mt-3 font-bold text-white">
                    Care & Guidance
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Encouraging every child's growth.
                  </p>

                </div>

              </div>

              {/* Panel footer */}
              <div className="mt-5 flex items-center justify-between gap-3 text-xs text-slate-400">

                <span>Bright Bal Public School</span>

                <span className="inline-flex items-center gap-1.5">
                  <Star size={13} className="text-yellow-300" />
                  Learn. Grow. Shine.
                </span>

              </div>

            </div>

            {/* Floating admission badge */}
            <div className="absolute -left-2 top-24 hidden items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 shadow-xl sm:flex lg:-left-6">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#C62828]">
                <School size={21} />
              </div>

              <div>
                <p className="text-sm font-extrabold">
                  Admissions Open
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Session 2026–27
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* FEATURE CARDS */}
        <div className="mt-20 grid gap-5 md:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="admission-feature group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:bg-white/[0.10] sm:p-7"
                style={{
                  animationDelay: `${index * 120}ms`,
                }}
              >

                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#C62828] to-[#1565C0] transition-transform duration-500 group-hover:scale-x-100" />

                <div
                  className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.color} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon size={27} />
                </div>

                <h3 className="mt-5 text-lg font-extrabold text-white sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-300">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* Scroll cue */}
        <div className="mt-12 flex justify-center">

          <button
            type="button"
            onClick={scrollToForm}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-slate-300 transition-all duration-300 hover:border-red-400/40 hover:bg-white/10 hover:text-white"
          >
            Explore Admission Details

            <MoveDown
              size={16}
              className="text-red-300 transition-transform duration-300 group-hover:translate-y-1"
            />
          </button>

        </div>

      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C62828] via-red-300/70 to-[#1565C0]" />

    </section>
  );
}