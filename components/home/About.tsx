"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Trophy,
  Heart,
  Sparkles,
  BookOpen,
  Pencil,
  Lightbulb,
  Star,
} from "lucide-react";

type AboutProps = {
  schoolSettings?: {
    school_name?: string;
    tagline?: string;
    about_title?: string;
    about_subtitle?: string;
    about_description?: string;
    about_image?: string;
  } | null;
};

const defaultSchool = {
  school_name: "Bright Bal Public School",
  tagline: "English Medium School",
  about_title: "Building Strong Foundations for a Brighter Future",
  about_subtitle:
    "A nurturing learning environment where education and values grow together.",
  about_description:
    "Bright Bal Public School provides quality education, discipline and creativity from Nursery to Class VIII.",
  about_image: "",
};

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

export default function About({ schoolSettings }: AboutProps) {
  const school = {
    ...defaultSchool,
    ...schoolSettings,
  };

  const features = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      text: "Strong academic foundations with student-focused learning.",
    },
    {
      icon: Heart,
      title: "Values & Discipline",
      text: "Building respectful, responsible and confident individuals.",
    },
    {
      icon: Trophy,
      title: "Overall Development",
      text: "Equal focus on academics, sports, creativity and activities.",
    },
  ];

  const highlights = [
    "Experienced Teachers",
    "Student-Focused Learning",
    "Safe Environment",
    "Sports & Activities",
  ];

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={stagger}
      className="relative overflow-hidden bg-white py-20 text-slate-900 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#1565C0]/[0.09] blur-3xl" />
        <div className="absolute -right-32 top-32 h-80 w-80 rounded-full bg-[#C62828]/[0.07] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-[40rem] rounded-full bg-[#1565C0]/[0.045] blur-3xl" />

        {/* EDUCATION DOODLES */}
        <BookOpen
          className="absolute left-[3%] top-[13%] rotate-[-12deg] text-[#1565C0]/20"
          size={62}
          strokeWidth={1.4}
        />
        <Pencil
          className="absolute left-[7%] top-[43%] rotate-[28deg] text-[#C62828]/20"
          size={48}
          strokeWidth={1.5}
        />
        <GraduationCap
          className="absolute right-[7%] top-[10%] rotate-[8deg] text-[#1565C0]/20"
          size={66}
          strokeWidth={1.4}
        />
        <Lightbulb
          className="absolute right-[4%] top-[51%] rotate-[-8deg] text-[#C62828]/20"
          size={58}
          strokeWidth={1.5}
        />

        <Star
          className="absolute left-[18%] top-[20%] text-[#1565C0]/20"
          size={28}
          fill="currentColor"
        />
        <Star
          className="absolute right-[21%] top-[26%] text-[#C62828]/20"
          size={19}
          fill="currentColor"
        />
        <Star
          className="absolute left-[42%] bottom-[10%] text-[#1565C0]/15"
          size={32}
          fill="currentColor"
        />

        <span className="absolute left-[26%] top-[15%] h-3 w-3 rounded-full bg-[#1565C0]/20" />
        <span className="absolute left-[13%] bottom-[22%] h-2 w-2 rounded-full bg-[#C62828]/20" />
        <span className="absolute right-[27%] top-[17%] h-2.5 w-2.5 rounded-full bg-[#1565C0]/20" />
        <span className="absolute right-[11%] bottom-[20%] h-3 w-3 rounded-full bg-[#C62828]/20" />

        <div className="absolute left-[17%] top-[38%] opacity-[0.08]">
          <div className="relative h-10 w-24 rounded-full bg-[#1565C0]">
            <span className="absolute -left-1 bottom-0 h-10 w-10 rounded-full bg-[#1565C0]" />
            <span className="absolute left-8 -top-4 h-14 w-14 rounded-full bg-[#1565C0]" />
            <span className="absolute right-1 bottom-0 h-9 w-9 rounded-full bg-[#1565C0]" />
          </div>
        </div>

        <div className="absolute right-[17%] bottom-[20%] scale-75 opacity-[0.07]">
          <div className="relative h-10 w-24 rounded-full bg-[#C62828]">
            <span className="absolute -left-1 bottom-0 h-10 w-10 rounded-full bg-[#C62828]" />
            <span className="absolute left-8 -top-4 h-14 w-14 rounded-full bg-[#C62828]" />
            <span className="absolute right-1 bottom-0 h-9 w-9 rounded-full bg-[#C62828]" />
          </div>
        </div>

        <div className="absolute right-[25%] top-[42%] h-20 w-20 rounded-full border-2 border-[#1565C0]/10" />
        <div className="absolute right-[27%] top-[44%] h-9 w-9 rounded-full bg-[#C62828]/[0.05]" />
        <div className="absolute left-[5%] bottom-[12%] h-20 w-20 rounded-full border-2 border-[#C62828]/10" />

        <div className="absolute right-[31%] top-[17%] h-12 w-20 rotate-[-18deg] border-t-2 border-dashed border-[#1565C0]/20" />
        <div className="absolute left-[30%] bottom-[17%] h-10 w-16 rotate-[15deg] border-b-2 border-dashed border-[#C62828]/15" />

        <span className="absolute left-[34%] top-[11%] text-[#1565C0]/25">✦</span>
        <span className="absolute right-[34%] bottom-[16%] text-[#C62828]/20">✦</span>
        <span className="absolute left-[47%] top-[35%] text-[#1565C0]/20">✧</span>

        <div className="absolute right-[9%] bottom-[10%] h-24 w-24 rounded-full border-2 border-[#1565C0]/10" />
        <div className="absolute right-[11%] bottom-[12%] h-12 w-12 rounded-full border border-[#C62828]/10" />
      </div>

            <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* SECTION HEADING */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-14 max-w-3xl text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1565C0]/20 bg-[#1565C0]/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1565C0] sm:px-5 sm:text-xs">
            <Sparkles size={14} />
            Discover {school.school_name}
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-[#18202B] sm:text-5xl lg:text-6xl">
            About Our{" "}
            <span className="text-[#C62828]">School</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
            {school.about_subtitle}
          </p>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-10 bg-[#1565C0]/40" />
            <span className="h-2 w-2 rounded-full bg-[#C62828]" />
            <span className="h-px w-10 bg-[#1565C0]/40" />
          </div>
        </motion.div>

        {/* MAIN ABOUT CONTENT */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* SCHOOL IMAGE */}
          <motion.div variants={fadeUp} className="relative">
            <div className="pointer-events-none absolute -inset-3 rotate-2 rounded-[2rem] border border-[#1565C0]/20 bg-[#1565C0]/[0.035]" />

            <div className="pointer-events-none absolute -bottom-4 -left-4 h-20 w-20 rounded-2xl border-2 border-[#C62828]/15" />

            <div className="relative rounded-[2rem] border border-[#1565C0]/20 bg-white p-2 shadow-[0_25px_70px_rgba(15,23,42,0.12)] sm:p-3">
              <div className="relative h-[390px] overflow-hidden rounded-[1.5rem] sm:h-[500px] lg:h-[530px]">
                <Image
                  src={
                    school.about_image?.trim()
                      ? school.about_image
                      : "/images/school-building.jpg.jpeg"
                  }
                  alt={`${school.school_name} building`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-0 bg-[#1565C0]/[0.045]" />

                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-md sm:text-xs">
                    <GraduationCap size={13} />
                    Since 2004
                  </div>

                  <h3 className="text-2xl font-black tracking-tight sm:text-3xl">
                    {school.school_name}
                  </h3>

                  <p className="mt-1.5 text-sm text-white/75 sm:text-base">
                    {school.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* FLOATING CLASS CARD */}
            <motion.div
              initial={{ opacity: 0, x: 22, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="absolute right-4 top-4 z-20 rounded-2xl border border-[#1565C0]/20 bg-white/95 p-3 shadow-[0_15px_40px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:right-6 sm:top-6 sm:p-4"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1565C0]/10 text-[#1565C0] sm:h-12 sm:w-12 sm:rounded-2xl">
                  <GraduationCap size={21} />
                </div>

                <div>
                  <p className="text-sm font-black leading-tight text-slate-900 sm:text-base">
                    Nursery to VIII
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                    English Medium School
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="absolute -right-2 bottom-16 hidden h-5 w-5 rounded-full bg-[#C62828] shadow-lg shadow-[#C62828]/30 sm:block" />
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div variants={fadeUp} className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C62828]/15 bg-[#C62828]/[0.055] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#C62828] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#C62828]" />
              Welcome to {school.school_name}
            </div>

            <h3 className="max-w-2xl text-3xl font-black leading-[1.08] tracking-tight text-[#18202B] sm:text-4xl lg:text-5xl">
              {school.about_title}
            </h3>

            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 rounded-full bg-[#C62828]" />
              <span className="h-1 w-3 rounded-full bg-[#1565C0]" />
            </div>

            <p className="mt-6 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
              {school.about_description}
            </p>

            {/* HIGHLIGHT CARDS */}
            <motion.div
              variants={stagger}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {highlights.map((item) => (
                <motion.div
                  variants={fadeUp}
                  key={item}
                  className="group flex min-h-[62px] items-center gap-3 rounded-2xl border border-[#1565C0]/20 bg-white px-4 py-3 shadow-[0_6px_20px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C62828]/50 hover:shadow-[0_12px_28px_rgba(198,40,40,0.10)]"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1565C0]/10 text-[#1565C0] transition-all duration-300 group-hover:bg-[#C62828]/10 group-hover:text-[#C62828]">
                    <CheckCircle2 size={17} />
                  </span>

                  <span className="text-sm font-semibold text-slate-700 sm:text-[15px]">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

                        {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#C62828] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgba(198,40,40,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1565C0] hover:shadow-[0_12px_28px_rgba(21,101,192,0.22)] sm:px-7"
              >
                Learn More
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-[#1565C0]/25 bg-white px-6 py-3.5 text-sm font-extrabold text-[#1565C0] transition-all duration-300 hover:-translate-y-1 hover:border-[#C62828] hover:bg-[#1565C0] hover:text-white sm:px-7"
              >
                Contact Us
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* THREE CORE VALUES */}
        <motion.div variants={fadeUp} className="relative mt-20 sm:mt-24">
          <div className="mb-10 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-[#C62828]" />
            <span className="h-px w-16 bg-slate-200" />
          </div>

          <motion.div
            variants={stagger}
            className="grid gap-4 md:grid-cols-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  variants={fadeUp}
                  key={feature.title}
                  className="group relative overflow-hidden rounded-[1.5rem] border border-[#1565C0]/15 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#C62828]/40 hover:shadow-[0_20px_50px_rgba(198,40,40,0.10)] sm:p-7"
                >
                  {/* HOVER ACCENT */}
                  <div className="absolute right-0 top-0 h-1 w-0 bg-gradient-to-r from-[#1565C0] to-[#C62828] transition-all duration-500 group-hover:w-full" />

                  {/* ICON */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1565C0]/10 text-[#1565C0] transition-all duration-300 group-hover:bg-[#C62828]/10 group-hover:text-[#C62828]">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                    {feature.text}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1565C0] transition-colors group-hover:text-[#C62828]">
                    <span>Bright Future</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}