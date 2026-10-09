"use client";

import { motion } from "framer-motion";
import {
  Star,
  Quote,
  Heart,
  Users,
  Sparkles,
  BookOpen,
  Pencil,
  GraduationCap,
  MessageCircleHeart,
  ShieldCheck,
} from "lucide-react";

const testimonials = [
  {
    name: "Parent",
    student: "Parent of Class V Student",
    initials: "P",
    message:
      "Bright Bal Public School has provided an excellent learning environment. The teachers are supportive and my child enjoys coming to school every day.",
    accent: "red",
  },
  {
    name: "Parent",
    student: "Parent of Class III Student",
    initials: "P",
    message:
      "The school focuses not only on academics but also on discipline and personality development. We are very satisfied with our child's progress.",
    accent: "blue",
  },
  {
    name: "Parent",
    student: "Parent of Nursery Student",
    initials: "P",
    message:
      "The caring teachers and safe environment give us confidence. Our child feels comfortable, happy and excited to learn every day.",
    accent: "red",
  },
];

const floatingItems = [
  {
    icon: BookOpen,
    className: "left-[4%] top-[17%]",
    color: "text-[#C62828]/20",
    size: 52,
    animation: { y: [0, -14, 0], rotate: [-5, 5, -5] },
    duration: 5,
  },
  {
    icon: Star,
    className: "right-[7%] top-[13%]",
    color: "text-yellow-400/60",
    size: 39,
    animation: { y: [0, 12, 0], rotate: [0, 15, 0] },
    duration: 4.5,
  },
  {
    icon: Pencil,
    className: "left-[7%] bottom-[20%]",
    color: "text-[#1565C0]/20",
    size: 42,
    animation: { y: [0, 10, 0], rotate: [8, -8, 8] },
    duration: 4,
  },
  {
    icon: GraduationCap,
    className: "right-[5%] bottom-[17%]",
    color: "text-[#1565C0]/20",
    size: 50,
    animation: { y: [0, -10, 0], rotate: [4, -4, 4] },
    duration: 5.5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FFF7F7] via-white to-[#EFF6FF] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-red-200/40 blur-[140px]" />

        <div className="absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-blue-200/40 blur-[150px]" />

        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-100/40 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "radial-gradient(#C62828 1px, transparent 1px)",
            backgroundSize: "32px 32px",
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

      {/* FLOATING ORBS */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          x: [0, 8, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[18%] top-[10%] hidden h-5 w-5 rounded-full bg-red-300/60 md:block"
      />

      <motion.div
        animate={{
          y: [0, 12, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[18%] top-[30%] hidden h-4 w-4 rounded-full bg-blue-400/60 md:block"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute bottom-[14%] right-[12%] hidden h-24 w-24 rounded-full border border-blue-200/60 md:block"
      />

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/90 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-[#C62828] shadow-sm backdrop-blur-md sm:text-sm">
            <Heart size={16} />
            Words That Matter
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#101B33] sm:text-5xl lg:text-6xl">
            Parents&apos; Trust,
            <span className="block bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] bg-clip-text text-transparent">
              Our Greatest Reward
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Every child has a story. Every family has a journey.
            Here is what parents have shared about their experience
            at Bright Bal Public School.
          </p>

          {/* DECORATIVE DIVIDER */}
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-red-200" />

            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-lg shadow-red-500/20"
            >
              <MessageCircleHeart size={19} />
            </motion.div>

            <span className="h-px w-12 bg-blue-200" />
          </div>
        </motion.div>

        {/* TESTIMONIAL CARDS START IN PART 2 */}

        {/* FLOATING TESTIMONIAL CARDS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18 },
            },
          }}
          className="mt-16 grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((item, index) => {
            const isBlue = item.accent === "blue";

            const theme = isBlue
              ? {
                  color: "text-[#1565C0]",
                  gradient: "from-[#1565C0] to-[#0D47A1]",
                  soft: "bg-blue-50",
                  border: "border-blue-200",
                  glow: "bg-blue-200/40",
                  hoverBorder: "group-hover:border-blue-300",
                  line: "from-[#1565C0] via-blue-400 to-[#C62828]",
                  number: "text-blue-100",
                }
              : {
                  color: "text-[#C62828]",
                  gradient: "from-[#C62828] to-[#E53935]",
                  soft: "bg-red-50",
                  border: "border-red-200",
                  glow: "bg-red-200/40",
                  hoverBorder: "group-hover:border-red-300",
                  line: "from-[#C62828] via-red-400 to-[#1565C0]",
                  number: "text-red-100",
                };

            return (
              <motion.article
                key={`${item.student}-${index}`}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 45,
                    scale: 0.94,
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
                whileHover={{
                  y: index === 1 ? -12 : -8,
                  rotate: index === 0 ? -0.5 : index === 2 ? 0.5 : 0,
                }}
                className={`group relative ${index === 1 ? "lg:-translate-y-5" : ""}`}
              >
                {/* Floating glow */}
                <div
                  className={`pointer-events-none absolute -inset-2 rounded-[2.2rem] ${theme.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                />

                {/* Main card */}
                <div
                  className={`relative flex h-full min-h-[390px] flex-col overflow-hidden rounded-[2rem] border ${theme.border} bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-500 ${theme.hoverBorder} group-hover:shadow-[0_28px_65px_rgba(15,23,42,0.13)] sm:p-7`}
                >
                  {/* Decorative corner */}
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full ${theme.glow} blur-xl transition-transform duration-700 group-hover:scale-150`}
                  />

                  {/* Large background quote */}
                  <motion.div
                    animate={{ rotate: [0, 3, 0] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`pointer-events-none absolute right-4 top-14 ${theme.number}`}
                  >
                    <Quote size={100} fill="currentColor" strokeWidth={1} />
                  </motion.div>

                  {/* Card top row */}
                  <div className="relative flex items-center justify-between gap-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-full ${theme.soft} px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.14em] ${theme.color}`}
                    >
                      <Heart size={13} fill="currentColor" />
                      Parent&apos;s Voice
                    </span>

                    <span className="text-xs font-black tracking-widest text-slate-300">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Stars */}
                  <div
                    className="relative mt-7 flex items-center gap-1"
                    aria-label="Illustrative five-star design"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.span
                        key={star}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.12 * star,
                          duration: 0.3,
                        }}
                      >
                        <Star
                          size={17}
                          fill="currentColor"
                          className="text-yellow-400"
                        />
                      </motion.span>
                    ))}
                  </div>

                  {/* Quote icon */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -5 }}
                    className={`relative mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient} text-white shadow-lg`}
                  >
                    <Quote size={23} />
                  </motion.div>

                  {/* Testimonial */}
                  <p className="relative mt-5 flex-1 text-[15px] leading-8 text-slate-600 sm:text-base">
                    &ldquo;{item.message}&rdquo;
                  </p>

                  {/* Parent information */}
                  <div className="relative mt-7 flex items-center gap-4 border-t border-slate-100 pt-5">
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 4 }}
                      className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient} text-xl font-black text-white shadow-lg`}
                    >
                      {item.initials}

                      <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-yellow-400 text-[10px] text-[#101B33]">
                        <Heart size={10} fill="currentColor" />
                      </span>
                    </motion.div>

                    <div className="min-w-0">
                      <h3 className="font-black text-[#101B33]">
                        {item.name}
                      </h3>

                      <p className={`mt-1 text-xs font-semibold leading-5 ${theme.color}`}>
                        {item.student}
                      </p>
                    </div>
                  </div>

                  {/* Animated bottom accent */}
                  <div
                    className={`absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r ${theme.line} transition-transform duration-500 group-hover:scale-x-100`}
                  />

                  {/* Floating sparkle */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 12, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="pointer-events-none absolute bottom-6 right-6 text-yellow-400/70"
                  >
                    <Sparkles size={19} />
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* TRUST BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75 }}
          className="relative mt-20 overflow-hidden rounded-[2.2rem] bg-[#101B33] shadow-[0_30px_80px_rgba(15,23,42,0.18)]"
        >
          {/* Banner background effects */}
          <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-8 h-72 w-72 rounded-full bg-red-500/20 blur-3xl" />

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute right-12 top-8 hidden h-36 w-36 rounded-full border border-white/10 sm:block"
          />

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute bottom-5 right-[18%] hidden text-red-400/20 sm:block"
          >
            <Heart size={72} fill="currentColor" strokeWidth={1} />
          </motion.div>

          <div className="relative flex flex-col items-start justify-between gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:p-12">
            <div className="flex items-start gap-4 sm:gap-5">
              <motion.div
                whileHover={{ scale: 1.08, rotate: -5 }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-lg shadow-red-950/30 sm:h-16 sm:w-16"
              >
                <Users size={30} />
              </motion.div>

              <div className="max-w-2xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-red-300 sm:text-sm">
                  Parent-School Partnership
                </p>

                <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Together, We Help
                  <span className="block bg-gradient-to-r from-red-300 via-red-200 to-blue-300 bg-clip-text text-transparent">
                    Every Child Grow
                  </span>
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Strong communication between parents and teachers
                  helps us understand, support and guide every student
                  throughout their learning journey.
                </p>
              </div>
            </div>

            {/* Partnership badge */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 text-sm font-bold text-white backdrop-blur-sm"
            >
              <ShieldCheck size={22} className="text-blue-300" />
              Built on Trust
            </motion.div>
          </div>

          {/* Red-blue accent */}
          <div className="h-1.5 bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0]" />
        </motion.div>


        {/* BOTTOM TAGLINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-red-200" />

          <span className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 sm:text-xs">
            Trust • Care • Growth
          </span>

          <span className="h-px w-8 bg-blue-200" />
        </motion.div>
      </div>
    </section>
  );
}