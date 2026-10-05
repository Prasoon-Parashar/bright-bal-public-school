"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
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
    <AnimatedSection>
      <section className="relative overflow-hidden bg-white py-20 text-slate-900 sm:py-24 lg:py-28">
        {/* =====================================================
            BACKGROUND DECORATION
        ====================================================== */}

       {/* =====================================================
    PLAYFUL EDUCATION BACKGROUND
====================================================== */}

<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* Soft green glow */}
  <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#0aa84f]/10 blur-3xl" />

  {/* Soft red glow */}
  <div className="absolute -right-32 top-40 h-80 w-80 rounded-full bg-red-100/50 blur-3xl" />

  {/* Bottom glow */}
  <div className="absolute bottom-0 left-1/3 h-72 w-[36rem] rounded-full bg-[#0aa84f]/[0.06] blur-3xl" />

  {/* =================================================
      EDUCATION DOODLES
  ================================================== */}

  {/* Book - top left */}
  <div className="absolute left-[4%] top-[14%] rotate-[-12deg] text-[#0aa84f]/20">
    <BookOpen size={58} strokeWidth={1.5} />
  </div>

  {/* Pencil - left middle */}
  {/* =====================================================
    PLAYFUL EDUCATION BACKGROUND
====================================================== */}

<div className="pointer-events-none absolute inset-0 overflow-hidden">

  {/* ================= SOFT BACKGROUND GLOWS ================= */}

  <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#0aa84f]/10 blur-3xl" />

  <div className="absolute -right-32 top-32 h-80 w-80 rounded-full bg-red-100/50 blur-3xl" />

  <div className="absolute bottom-0 left-1/3 h-80 w-[40rem] rounded-full bg-[#0aa84f]/[0.055] blur-3xl" />


  {/* ================= BOOK ================= */}

  <div
    className="
      absolute
      left-[3%]
      top-[13%]
      rotate-[-12deg]
      text-[#0aa84f]/20
    "
  >
    <BookOpen size={62} strokeWidth={1.4} />
  </div>


  {/* ================= PENCIL ================= */}

  <div
    className="
      absolute
      left-[7%]
      top-[43%]
      rotate-[28deg]
      text-red-500/15
    "
  >
    <Pencil size={48} strokeWidth={1.5} />
  </div>


  {/* ================= GRADUATION CAP ================= */}

  <div
    className="
      absolute
      right-[7%]
      top-[10%]
      rotate-[8deg]
      text-[#0aa84f]/20
    "
  >
    <GraduationCap size={66} strokeWidth={1.4} />
  </div>


  {/* ================= LIGHT BULB ================= */}

  <div
    className="
      absolute
      right-[4%]
      top-[51%]
      rotate-[-8deg]
      text-[#0aa84f]/15
    "
  >
    <Lightbulb size={58} strokeWidth={1.5} />
  </div>


  {/* ================= STARS ================= */}

  <div className="absolute left-[18%] top-[20%] text-yellow-500/20">
    <Star size={28} fill="currentColor" />
  </div>

  <div className="absolute right-[21%] top-[26%] text-red-500/15">
    <Star size={19} fill="currentColor" />
  </div>

  <div className="absolute left-[42%] bottom-[10%] text-[#0aa84f]/15">
    <Star size={32} fill="currentColor" />
  </div>


  {/* ================= FLOATING DOTS ================= */}

  <span className="absolute left-[26%] top-[15%] h-3 w-3 rounded-full bg-[#0aa84f]/20" />

  <span className="absolute left-[13%] bottom-[22%] h-2 w-2 rounded-full bg-red-500/20" />

  <span className="absolute right-[27%] top-[17%] h-2.5 w-2.5 rounded-full bg-[#0aa84f]/20" />

  <span className="absolute right-[11%] bottom-[20%] h-3 w-3 rounded-full bg-[#0aa84f]/20" />


  {/* ================= CLOUD 1 ================= */}

  <div
    className="
      absolute
      left-[17%]
      top-[38%]
      opacity-[0.12]
    "
  >
    <div className="relative h-10 w-24 rounded-full bg-[#0aa84f]">
      <span className="absolute -left-1 bottom-0 h-10 w-10 rounded-full bg-[#0aa84f]" />
      <span className="absolute left-8 -top-4 h-14 w-14 rounded-full bg-[#0aa84f]" />
      <span className="absolute right-1 bottom-0 h-9 w-9 rounded-full bg-[#0aa84f]" />
    </div>
  </div>


  {/* ================= CLOUD 2 ================= */}

  <div
    className="
      absolute
      right-[17%]
      bottom-[20%]
      scale-75
      opacity-[0.08]
    "
  >
    <div className="relative h-10 w-24 rounded-full bg-red-500">
      <span className="absolute -left-1 bottom-0 h-10 w-10 rounded-full bg-red-500" />
      <span className="absolute left-8 -top-4 h-14 w-14 rounded-full bg-red-500" />
      <span className="absolute right-1 bottom-0 h-9 w-9 rounded-full bg-red-500" />
    </div>
  </div>


  {/* ================= PLAYFUL CIRCLES ================= */}

  <div className="absolute right-[25%] top-[42%] h-20 w-20 rounded-full border-2 border-[#0aa84f]/10" />

  <div className="absolute right-[27%] top-[44%] h-9 w-9 rounded-full bg-[#0aa84f]/[0.06]" />

  <div className="absolute left-[5%] bottom-[12%] h-20 w-20 rounded-full border-2 border-red-500/10" />


  {/* ================= GEOMETRY / RULER STYLE LINES ================= */}

  <div
    className="
      absolute
      right-[31%]
      top-[17%]
      h-12
      w-20
      rotate-[-18deg]
      border-t-2
      border-dashed
      border-[#0aa84f]/15
    "
  />

  <div
    className="
      absolute
      left-[30%]
      bottom-[17%]
      h-10
      w-16
      rotate-[15deg]
      border-b-2
      border-dashed
      border-red-500/10
    "
  />


  {/* ================= SMALL SPARKLES ================= */}

  <span className="absolute left-[34%] top-[11%] text-[#0aa84f]/20">
    ✦
  </span>

  <span className="absolute right-[34%] bottom-[16%] text-red-500/15">
    ✦
  </span>

  <span className="absolute left-[47%] top-[35%] text-yellow-500/15">
    ✧
  </span>


  {/* ================= DECORATIVE RINGS ================= */}

  <div className="absolute right-[9%] bottom-[10%] h-24 w-24 rounded-full border-2 border-[#0aa84f]/10" />

  <div className="absolute right-[11%] bottom-[12%] h-12 w-12 rounded-full border border-red-500/10" />

</div>

  {/* Stars */}
  <div className="absolute left-[18%] top-[23%] text-yellow-500/20">
    <Star size={25} fill="currentColor" />
  </div>

  <div className="absolute right-[20%] top-[30%] text-red-500/15">
    <Star size={18} fill="currentColor" />
  </div>

  <div className="absolute left-[44%] bottom-[12%] text-[#0aa84f]/15">
    <Star size={30} fill="currentColor" />
  </div>

  {/* Small playful dots */}
  <span className="absolute left-[25%] top-[16%] h-3 w-3 rounded-full bg-[#0aa84f]/20" />
  <span className="absolute right-[26%] top-[18%] h-2 w-2 rounded-full bg-red-500/20" />
  <span className="absolute right-[12%] bottom-[18%] h-3 w-3 rounded-full bg-[#0aa84f]/20" />

  {/* Decorative rings */}
  <div className="absolute right-[12%] bottom-[12%] h-24 w-24 rounded-full border-2 border-[#0aa84f]/10" />
  <div className="absolute right-[14%] bottom-[14%] h-12 w-12 rounded-full border border-red-500/10" />

</div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* =====================================================
              SECTION HEADING
          ====================================================== */}

          <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-16">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#0aa84f]/20
                bg-[#0aa84f]/[0.06]
                px-4
                py-2
                text-[10px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-[#08783c]
                sm:px-5
                sm:text-xs
              "
            >
              <Sparkles size={14} />
              Discover {school.school_name}
            </div>

            <h2 className="mt-5 text-4xl font-black tracking-tight text-[#18202b] sm:text-5xl lg:text-6xl">
              About Our{" "}
              <span className="text-[#0aa84f]">
                School
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
              {school.about_subtitle}
            </p>

            {/* Small divider */}
            <div className="mx-auto mt-6 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-[#0aa84f]/30" />
              <span className="h-2 w-2 rounded-full bg-[#0aa84f]" />
              <span className="h-px w-10 bg-[#0aa84f]/30" />
            </div>
          </div>

          {/* =====================================================
              MAIN ABOUT CONTENT
          ====================================================== */}

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* ===================================================
                SCHOOL IMAGE
            ==================================================== */}

            <div className="relative">
              {/* Decorative green frame */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -inset-3
                  rotate-2
                  rounded-[2rem]
                  border
                  border-[#0aa84f]/15
                  bg-[#0aa84f]/[0.04]
                "
              />

              {/* Decorative red corner */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-4
                  -left-4
                  h-20
                  w-20
                  rounded-2xl
                  border-2
                  border-red-500/10
                "
              />

              {/* Main image container */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-[#0aa84f]/20
                  bg-white
                  p-2
                  shadow-[0_25px_70px_rgba(15,23,42,0.12)]
                  sm:p-3
                "
              >
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
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      hover:scale-105
                    "
                  />

                  {/* Image overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                  {/* Green tint */}

                  <div className="absolute inset-0 bg-[#0aa84f]/[0.06]" />

                  {/* Bottom image information */}

                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                    <div
                      className="
                        mb-3
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/20
                        bg-black/25
                        px-3
                        py-1.5
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        backdrop-blur-md
                        sm:text-xs
                      "
                    >
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

              {/* =================================================
                  FLOATING CLASS CARD
              ================================================== */}

              <div
                className="
                  absolute
                  right-4
                  top-4
                  z-20
                  rounded-2xl
                  border
                  border-[#0aa84f]/20
                  bg-white/95
                  p-3
                  shadow-[0_15px_40px_rgba(15,23,42,0.14)]
                  backdrop-blur-xl
                  sm:right-6
                  sm:top-6
                  sm:p-4
                "
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#0aa84f]/10
                      text-[#0aa84f]
                      sm:h-12
                      sm:w-12
                      sm:rounded-2xl
                    "
                  >
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
              </div>

              {/* Small green floating dot */}

              <div className="absolute -right-2 bottom-16 hidden h-5 w-5 rounded-full bg-[#0aa84f] shadow-lg shadow-[#0aa84f]/30 sm:block" />
            </div>

            {/* ===================================================
                RIGHT CONTENT
            ==================================================== */}

            <div className="relative">
              {/* Welcome badge */}

              <div
                className="
                  mb-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#0aa84f]/15
                  bg-[#0aa84f]/[0.06]
                  px-4
                  py-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#08783c]
                  sm:text-xs
                "
              >
                <span className="h-2 w-2 rounded-full bg-[#0aa84f]" />
                Welcome to {school.school_name}
              </div>

              {/* Heading */}

              <h3 className="max-w-2xl text-3xl font-black leading-[1.08] tracking-tight text-[#18202b] sm:text-4xl lg:text-5xl">
                {school.about_title}
              </h3>

              {/* Green accent line */}

              <div className="mt-5 flex items-center gap-2">
                <span className="h-1 w-12 rounded-full bg-[#0aa84f]" />
                <span className="h-1 w-3 rounded-full bg-red-500" />
              </div>

              {/* Description */}

              <p className="mt-6 max-w-2xl whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
                {school.about_description}
              </p>

              {/* =================================================
                  HIGHLIGHT CARDS
              ================================================== */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="
                      group
                      flex
                      min-h-[62px]
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-[#0aa84f]/20
                      bg-white
                      px-4
                      py-3
                      shadow-[0_6px_20px_rgba(15,23,42,0.05)]
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:border-red-400
                      hover:shadow-[0_12px_28px_rgba(220,38,38,0.10)]
                    "
                  >
                    <span
                      className="
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#0aa84f]/10
                        text-[#0aa84f]
                        transition-all
                        duration-300
                        group-hover:bg-red-50
                        group-hover:text-red-600
                      "
                    >
                      <CheckCircle2 size={17} />
                    </span>

                    <span className="text-sm font-semibold text-slate-700 sm:text-[15px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* =================================================
                  BUTTONS
              ================================================== */}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/about"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#0aa84f]
                    px-6
                    py-3.5
                    text-sm
                    font-extrabold
                    text-white
                    shadow-[0_10px_25px_rgba(10,168,79,0.20)]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-red-600
                    hover:shadow-[0_12px_28px_rgba(220,38,38,0.22)]
                    sm:px-7
                  "
                >
                  Learn More
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#0aa84f]/25
                    bg-white
                    px-6
                    py-3.5
                    text-sm
                    font-extrabold
                    text-[#08783c]
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-red-500
                    hover:bg-red-600
                    hover:text-white
                    sm:px-7
                  "
                >
                  Contact Us
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* =====================================================
              THREE CORE VALUES
          ====================================================== */}

          <div className="relative mt-20 sm:mt-24">
            {/* Section divider */}

            <div className="mb-10 flex items-center justify-center gap-3">
              <span className="h-px w-16 bg-slate-200" />
              <span className="h-2 w-2 rounded-full bg-[#0aa84f]" />
              <span className="h-px w-16 bg-slate-200" />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[1.5rem]
                      border
                      border-[#0aa84f]/15
                      bg-white
                      p-6
                      shadow-[0_10px_35px_rgba(15,23,42,0.06)]
                      transition-all
                      duration-300
                      hover:-translate-y-2
                      hover:border-red-400
                      hover:shadow-[0_20px_50px_rgba(220,38,38,0.10)]
                      sm:p-7
                    "
                  >
                    {/* Hover accent */}

                    <div
                      className="
                        absolute
                        right-0
                        top-0
                        h-1
                        w-0
                        bg-red-500
                        transition-all
                        duration-300
                        group-hover:w-full
                      "
                    />

                    {/* Icon */}

                    <div
                      className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#0aa84f]/10
                        text-[#0aa84f]
                        transition-all
                        duration-300
                        group-hover:bg-red-50
                        group-hover:text-red-600
                      "
                    >
                      <Icon size={26} />
                    </div>

                    <h3 className="mt-5 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                      {feature.text}
                    </p>

                    {/* Bottom arrow */}

                    <div className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#08783c] transition-colors group-hover:text-red-600">
                      <span>Bright Future</span>

                      <ArrowRight
                        size={14}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}