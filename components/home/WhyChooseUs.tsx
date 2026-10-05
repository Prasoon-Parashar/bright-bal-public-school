"use client";

import { motion } from "framer-motion";

import {
  BookOpenCheck,
  Presentation,
  Trophy,
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Pencil,
  Lightbulb,
  Star,
  ArrowUpRight,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: BookOpenCheck,
      number: "01",
      title: "Quality Education",
      description:
        "Strong academic foundations supported by modern and student-focused teaching methods.",
      points: [
        "Concept-based learning",
        "Regular academic guidance",
      ],
    },
    {
      icon: Presentation,
      number: "02",
      title: "Modern Classrooms",
      description:
        "Comfortable and engaging classrooms designed to make everyday learning more effective.",
      points: [
        "Interactive learning",
        "Positive environment",
      ],
    },
    {
      icon: Trophy,
      number: "03",
      title: "Sports & Activities",
      description:
        "Students get opportunities to develop confidence, teamwork and physical fitness beyond academics.",
      points: [
        "Physical development",
        "Creative activities",
      ],
    },
    {
      icon: GraduationCap,
      number: "04",
      title: "Experienced Faculty",
      description:
        "Dedicated teachers who guide, encourage and support every child throughout their learning journey.",
      points: [
        "Personal attention",
        "Supportive teachers",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8faf9] py-20 text-slate-900 sm:py-24 lg:py-28">

      {/* =====================================================
          PLAYFUL EDUCATION BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Soft glows */}

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#0aa84f]/10 blur-3xl" />

        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-red-100/50 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-[38rem] rounded-full bg-[#0aa84f]/[0.06] blur-3xl" />

        {/* Book */}

        <div className="absolute left-[3%] top-[12%] hidden rotate-[-12deg] text-[#0aa84f]/10 sm:block">
          <BookOpen size={70} strokeWidth={1.3} />
        </div>

        {/* Pencil */}

        <div className="absolute left-[7%] top-[55%] hidden rotate-[25deg] text-red-500/10 sm:block">
          <Pencil size={55} strokeWidth={1.4} />
        </div>

        {/* Graduation cap */}

        <div className="absolute right-[5%] top-[10%] hidden rotate-[8deg] text-[#0aa84f]/10 sm:block">
          <GraduationCap size={72} strokeWidth={1.3} />
        </div>

        {/* Light bulb */}

        <div className="absolute right-[4%] top-[55%] hidden rotate-[-8deg] text-[#0aa84f]/10 sm:block">
          <Lightbulb size={60} strokeWidth={1.4} />
        </div>

        {/* Stars */}

        <div className="absolute left-[18%] top-[20%] text-yellow-500/15">
          <Star size={25} fill="currentColor" />
        </div>

        <div className="absolute right-[20%] top-[28%] text-red-500/10">
          <Star size={18} fill="currentColor" />
        </div>

        <div className="absolute bottom-[18%] left-[44%] text-[#0aa84f]/10">
          <Star size={28} fill="currentColor" />
        </div>

        {/* Decorative rings */}

        <div className="absolute right-[10%] bottom-[12%] h-24 w-24 rounded-full border-2 border-[#0aa84f]/10" />

        <div className="absolute left-[12%] bottom-[16%] h-16 w-16 rounded-full border border-red-500/10" />

        {/* Small dots */}

        <span className="absolute left-[25%] top-[15%] h-3 w-3 rounded-full bg-[#0aa84f]/15" />

        <span className="absolute right-[30%] top-[17%] h-2 w-2 rounded-full bg-red-500/15" />

        <span className="absolute right-[15%] bottom-[24%] h-3 w-3 rounded-full bg-[#0aa84f]/15" />

      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

        {/* =====================================================
            SECTION HEADING
        ====================================================== */}

        <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="mx-auto max-w-3xl text-center"
>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#0aa84f]/20
              bg-white
              px-4
              py-2
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-[#08783c]
              shadow-sm
              sm:px-5
              sm:py-2.5
              sm:text-xs
            "
          >
            <Sparkles size={15} />
            Why Parents Choose Us
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#18202b] sm:text-5xl lg:text-6xl">
            More Than Just a{" "}
            <span className="text-[#0aa84f]">
              School
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
            We create a balanced learning environment where academics,
            discipline, creativity, confidence and character development
            grow together.
          </p>

          {/* Decorative divider */}

          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-[#0aa84f]" />
            <span className="h-px w-12 bg-slate-200" />
          </div>

        </motion.div>


        {/* =====================================================
            FEATURE CARDS
        ====================================================== */}

        <motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }}
  className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
>

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
  key={feature.title}
  variants={{
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  }}
  whileHover={{
    y: -8,
  }}
  className="
                  group
                  relative
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  border-[#0aa84f]/15
                  bg-white
                  p-6
                  shadow-[0_10px_35px_rgba(15,23,42,0.06)]
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-red-400
                  hover:shadow-[0_20px_55px_rgba(220,38,38,0.12)]
                  sm:p-7
                "
              >

                {/* Top animated line */}

                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-1
                    w-full
                    origin-left
                    scale-x-0
                    bg-red-600
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

                {/* Number */}

                <span
                  className="
                    absolute
                    right-5
                    top-3
                    text-5xl
                    font-black
                    text-slate-100
                    transition-colors
                    duration-300
                    group-hover:text-red-50
                  "
                >
                  {feature.number}
                </span>


                {/* Icon */}

                <div
                  className="
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#0aa84f]/10
                    text-[#0aa84f]
                    transition-all
                    duration-500
                    group-hover:rotate-3
                    group-hover:bg-red-600
                    group-hover:text-white
                    group-hover:shadow-lg
                  "
                >
                  <Icon size={27} strokeWidth={2} />
                </div>


                {/* Title */}

                <h3 className="relative mt-6 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  {feature.title}
                </h3>


                {/* Description */}

                <p className="mt-3 min-h-[100px] text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>


                {/* Points */}

                <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">

                  {feature.points.map((point) => (
                    <div
                      key={point}
                      className="
                        flex
                        items-center
                        gap-2.5
                        text-xs
                        font-semibold
                        text-slate-700
                        sm:text-sm
                      "
                    >
                      <CheckCircle2
                        size={16}
                        className="
                          shrink-0
                          text-[#0aa84f]
                          transition-colors
                          duration-300
                          group-hover:text-red-600
                        "
                      />

                      {point}
                    </div>
                  ))}

                </div>


                {/* Bottom label */}

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-4
                  "
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#08783c] transition-colors group-hover:text-red-600">
                    Bright Future
                  </span>

                  <span
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-50
                      text-slate-400
                      transition-all
                      duration-300
                      group-hover:bg-red-50
                      group-hover:text-red-600
                    "
                  >
                    <ArrowUpRight size={15} />
                  </span>
                </div>

              </motion.div>
            );
          })}

        </motion.div>


        {/* =====================================================
            BOTTOM HIGHLIGHT PANEL
        ====================================================== */}
{/* ================= BOTTOM HIGHLIGHT ================= */}

<motion.div
  initial={{ opacity: 0, y: 35 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="relative mt-16 overflow-hidden rounded-[2rem] border border-slate-800 bg-[#111827] shadow-[0_25px_70px_rgba(15,23,42,0.18)]"
>
  {/* Decorative background */}
  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#0aa84f]/15 blur-3xl" />

  <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-red-600/10 blur-3xl" />

  <div className="relative grid md:grid-cols-3">

    {/* ================= SAFE ENVIRONMENT ================= */}

    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        group
        relative
        border-b
        border-white/10
        p-7
        sm:p-8
        md:border-b-0
        md:border-r
      "
    >
      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          origin-left
          scale-x-0
          bg-[#0aa84f]
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />

      <div className="flex items-start gap-4">

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-[#0aa84f]/25
            bg-[#0aa84f]/10
            text-[#38d982]
            transition-all
            duration-300
            group-hover:border-[#0aa84f]
            group-hover:bg-[#0aa84f]
            group-hover:text-white
            group-hover:shadow-[0_0_25px_rgba(10,168,79,0.3)]
          "
        >
          <ShieldCheck size={27} />
        </div>

        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#38d982]">
            01
          </p>

          <h3 className="text-lg font-extrabold text-white sm:text-xl">
            Safe Environment
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            A caring space where every child feels safe, supported and
            confident.
          </p>
        </div>

      </div>
    </motion.div>

    {/* ================= VALUES ================= */}

    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        group
        relative
        border-b
        border-white/10
        p-7
        sm:p-8
        md:border-b-0
        md:border-r
      "
    >
      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          origin-left
          scale-x-0
          bg-red-500
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />

      <div className="flex items-start gap-4">

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-red-400/25
            bg-red-500/10
            text-red-400
            transition-all
            duration-300
            group-hover:border-red-500
            group-hover:bg-red-600
            group-hover:text-white
            group-hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]
          "
        >
          <HeartHandshake size={27} />
        </div>

        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
            02
          </p>

          <h3 className="text-lg font-extrabold text-white sm:text-xl">
            Values & Discipline
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Helping children grow with respect, responsibility and strong
            character.
          </p>
        </div>

      </div>
    </motion.div>

    {/* ================= HOLISTIC DEVELOPMENT ================= */}

    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="
        group
        relative
        p-7
        sm:p-8
      "
    >
      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          origin-left
          scale-x-0
          bg-[#0aa84f]
          transition-transform
          duration-500
          group-hover:scale-x-100
        "
      />

      <div className="flex items-start gap-4">

        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-[#0aa84f]/25
            bg-[#0aa84f]/10
            text-[#38d982]
            transition-all
            duration-300
            group-hover:border-[#0aa84f]
            group-hover:bg-[#0aa84f]
            group-hover:text-white
            group-hover:shadow-[0_0_25px_rgba(10,168,79,0.3)]
          "
        >
          <GraduationCap size={27} />
        </div>

        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#38d982]">
            03
          </p>

          <h3 className="text-lg font-extrabold text-white sm:text-xl">
            Holistic Development
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            Preparing students for academics, activities, confidence and
            life beyond the classroom.
          </p>
        </div>

      </div>
    </motion.div>

  </div>

  {/* Bottom motto */}
  <div className="border-t border-white/10 bg-white/[0.03] px-6 py-4 text-center">
    <div className="flex items-center justify-center gap-3">
      <span className="h-px w-8 bg-[#0aa84f]/60" />

      <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
        Learn • Grow • Lead
      </span>

      <span className="h-px w-8 bg-[#0aa84f]/60" />
    </div>
  </div>

</motion.div>


        {/* =====================================================
            LITTLE CLOSING TAG
        ====================================================== */}

        <div className="mt-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-slate-200" />

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            <Sparkles size={12} className="text-[#0aa84f]" />
            Learn • Grow • Lead
          </div>

          <span className="h-px w-10 bg-slate-200" />
        </div>

      </div>
    </section>
  );
}