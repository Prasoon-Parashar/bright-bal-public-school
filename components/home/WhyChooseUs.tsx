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
      points: ["Concept-based learning", "Regular academic guidance"],
    },
    {
      icon: Presentation,
      number: "02",
      title: "Modern Classrooms",
      description:
        "Comfortable and engaging classrooms designed to make everyday learning more effective.",
      points: ["Interactive learning", "Positive environment"],
    },
    {
      icon: Trophy,
      number: "03",
      title: "Sports & Activities",
      description:
        "Students get opportunities to develop confidence, teamwork and physical fitness beyond academics.",
      points: ["Physical development", "Creative activities"],
    },
    {
      icon: GraduationCap,
      number: "04",
      title: "Experienced Faculty",
      description:
        "Dedicated teachers who guide, encourage and support every child throughout their learning journey.",
      points: ["Personal attention", "Supportive teachers"],
    },
  ];

  const reveal = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-20 text-slate-900 sm:py-24 lg:py-28">
      {/* PLAYFUL EDUCATION BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#1565C0]/[0.09] blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-[#C62828]/[0.07] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-[38rem] rounded-full bg-[#1565C0]/[0.045] blur-3xl" />

        <BookOpen
          className="absolute left-[3%] top-[12%] hidden rotate-[-12deg] text-[#1565C0]/15 sm:block"
          size={70}
          strokeWidth={1.3}
        />
        <Pencil
          className="absolute left-[7%] top-[55%] hidden rotate-[25deg] text-[#C62828]/15 sm:block"
          size={55}
          strokeWidth={1.4}
        />
        <GraduationCap
          className="absolute right-[5%] top-[10%] hidden rotate-[8deg] text-[#1565C0]/15 sm:block"
          size={72}
          strokeWidth={1.3}
        />
        <Lightbulb
          className="absolute right-[4%] top-[55%] hidden rotate-[-8deg] text-[#C62828]/15 sm:block"
          size={60}
          strokeWidth={1.4}
        />

        <Star
          className="absolute left-[18%] top-[20%] text-[#1565C0]/15"
          size={25}
          fill="currentColor"
        />
        <Star
          className="absolute right-[20%] top-[28%] text-[#C62828]/15"
          size={18}
          fill="currentColor"
        />
        <Star
          className="absolute bottom-[18%] left-[44%] text-[#1565C0]/15"
          size={28}
          fill="currentColor"
        />

        <div className="absolute right-[10%] bottom-[12%] h-24 w-24 rounded-full border-2 border-[#1565C0]/10" />
        <div className="absolute left-[12%] bottom-[16%] h-16 w-16 rounded-full border border-[#C62828]/10" />

        <span className="absolute left-[25%] top-[15%] h-3 w-3 rounded-full bg-[#1565C0]/15" />
        <span className="absolute right-[30%] top-[17%] h-2 w-2 rounded-full bg-[#C62828]/15" />
        <span className="absolute right-[15%] bottom-[24%] h-3 w-3 rounded-full bg-[#1565C0]/15" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* SECTION HEADING */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1565C0]/20 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1565C0] shadow-sm sm:px-5 sm:py-2.5 sm:text-xs">
            <Sparkles size={15} />
            Why Parents Choose Us
          </div>

          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-[#18202B] sm:text-5xl lg:text-6xl">
            More Than Just a{" "}
            <span className="text-[#C62828]">School</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 lg:text-lg">
            We create a balanced learning environment where academics,
            discipline, creativity, confidence and character development
            grow together.
          </p>

          <div className="mt-7 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-slate-200" />
            <span className="h-2 w-2 rounded-full bg-[#C62828]" />
            <span className="h-px w-12 bg-slate-200" />
          </div>
        </motion.div>

                {/* FEATURE CARDS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.13 },
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
                  hidden: { opacity: 0, y: 40, scale: 0.97 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[1.75rem] border border-[#1565C0]/15 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-[#C62828]/40 hover:shadow-[0_20px_55px_rgba(198,40,40,0.12)] sm:p-7"
              >
                {/* ANIMATED TOP LINE */}
                <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#1565C0] to-[#C62828] transition-transform duration-500 group-hover:scale-x-100" />

                {/* NUMBER */}
                <span className="absolute right-5 top-3 text-5xl font-black text-slate-100 transition-colors duration-300 group-hover:text-red-50">
                  {feature.number}
                </span>

                {/* ICON */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1565C0]/10 text-[#1565C0] transition-all duration-500 group-hover:rotate-3 group-hover:bg-[#C62828] group-hover:text-white group-hover:shadow-lg">
                  <Icon size={27} strokeWidth={2} />
                </div>

                {/* TITLE */}
                <h3 className="relative mt-6 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="mt-3 min-h-[100px] text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>

                {/* POINTS */}
                <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                  {feature.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 sm:text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="shrink-0 text-[#1565C0] transition-colors duration-300 group-hover:text-[#C62828]"
                      />
                      {point}
                    </div>
                  ))}
                </div>

                {/* BOTTOM LABEL */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1565C0] transition-colors group-hover:text-[#C62828]">
                    Bright Future
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-[#C62828]/10 group-hover:text-[#C62828]">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* BOTTOM HIGHLIGHT PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-slate-700 bg-[#101B33] shadow-[0_25px_70px_rgba(15,23,42,0.18)]"
        >
          {/* DECORATIVE BACKGROUND */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#1565C0]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#C62828]/15 blur-3xl" />

          <div className="relative grid md:grid-cols-3">
            {/* SAFE ENVIRONMENT */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group relative border-b border-white/10 p-7 md:border-b-0 md:border-r sm:p-8"
            >
              <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#1565C0] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#1565C0]/30 bg-[#1565C0]/10 text-[#60A5FA] transition-all duration-300 group-hover:border-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white group-hover:shadow-[0_0_25px_rgba(21,101,192,0.3)]">
                  <ShieldCheck size={27} />
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#60A5FA]">
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

            {/* VALUES & DISCIPLINE */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group relative border-b border-white/10 p-7 md:border-b-0 md:border-r sm:p-8"
            >
              <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-[#C62828] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#C62828]/30 bg-[#C62828]/10 text-[#F87171] transition-all duration-300 group-hover:border-[#C62828] group-hover:bg-[#C62828] group-hover:text-white group-hover:shadow-[0_0_25px_rgba(198,40,40,0.3)]">
                  <HeartHandshake size={27} />
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F87171]">
                    02
                  </p>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Values &amp; Discipline
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Helping children grow with respect, responsibility and
                    strong character.
                  </p>
                </div>
              </div>
            </motion.div>

                        {/* HOLISTIC DEVELOPMENT */}
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group relative p-7 sm:p-8"
            >
              <div className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#1565C0] to-[#C62828] transition-transform duration-500 group-hover:scale-x-100" />

              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#1565C0]/30 bg-[#1565C0]/10 text-[#60A5FA] transition-all duration-300 group-hover:border-[#C62828] group-hover:bg-[#C62828] group-hover:text-white group-hover:shadow-[0_0_25px_rgba(198,40,40,0.3)]">
                  <GraduationCap size={27} />
                </div>

                <div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#60A5FA]">
                    03
                  </p>
                  <h3 className="text-lg font-extrabold text-white sm:text-xl">
                    Holistic Development
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Preparing students for academics, activities, confidence
                    and life beyond the classroom.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* BOTTOM MOTTO */}
          <div className="border-t border-white/10 bg-white/[0.03] px-6 py-4 text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#1565C0]/70" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-300 sm:text-xs">
                Learn • Grow • Lead
              </span>
              <span className="h-px w-8 bg-[#C62828]/80" />
            </div>
          </div>
        </motion.div>

        {/* CLOSING TAG */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-slate-200" />

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            <Sparkles size={12} className="text-[#C62828]" />
            Learn • Grow • Lead
          </div>

          <span className="h-px w-10 bg-slate-200" />
        </motion.div>
      </div>
    </section>
  );
}