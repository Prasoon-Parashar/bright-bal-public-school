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
} from "lucide-react";

const testimonials = [
  {
    name: "Parent",
    student: "Parent of Class V Student",
    initials: "P",
    message:
      "Bright Bal Public School has provided an excellent learning environment. The teachers are supportive and my child enjoys coming to school every day.",
  },
  {
    name: "Parent",
    student: "Parent of Class III Student",
    initials: "P",
    message:
      "The school focuses not only on academics but also on discipline and personality development. We are very satisfied with our child's progress.",
  },
  {
    name: "Parent",
    student: "Parent of Nursery Student",
    initials: "P",
    message:
      "The caring teachers and safe environment give us confidence. Our child feels comfortable, happy and excited to learn every day.",
  },
];

const floatingItems = [
  {
    icon: BookOpen,
    className: "left-[4%] top-[18%]",
    color: "text-[#0aa84f]/20",
    size: 55,
    animation: {
      y: [0, -12, 0],
      rotate: [-5, 5, -5],
    },
    duration: 5,
  },
  {
    icon: Star,
    className: "right-[6%] top-[14%]",
    color: "text-yellow-500/25",
    size: 40,
    animation: {
      y: [0, 10, 0],
      rotate: [0, 15, 0],
      scale: [1, 1.08, 1],
    },
    duration: 4.5,
  },
  {
    icon: Pencil,
    className: "left-[7%] bottom-[23%]",
    color: "text-red-500/20",
    size: 45,
    animation: {
      y: [0, 10, 0],
      rotate: [8, -8, 8],
    },
    duration: 4,
  },
  {
    icon: GraduationCap,
    className: "right-[5%] bottom-[18%]",
    color: "text-[#0aa84f]/20",
    size: 52,
    animation: {
      y: [0, -10, 0],
      rotate: [4, -4, 4],
    },
    duration: 5.5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#f9fbfa] py-24 sm:py-28 lg:py-32">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-red-100/60 blur-[150px]" />

        <div className="absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-green-100/70 blur-[150px]" />

        <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-yellow-100/40 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(#0aa84f 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      {/* =========================================================
          FLOATING EDUCATION ICONS
      ========================================================== */}

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

      {/* Floating dots */}

      <motion.div
        animate={{
          y: [0, -12, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[18%] top-[10%] hidden h-5 w-5 rounded-full bg-red-300/50 md:block"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[18%] top-[30%] hidden h-4 w-4 rounded-full bg-[#0aa84f]/40 md:block"
      />

      {/* Rotating ring */}

      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute bottom-[15%] right-[12%] hidden h-24 w-24 rounded-full border-2 border-red-200/50 md:block"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* =========================================================
            HEADING
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
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
            className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-red-700 shadow-sm sm:text-sm"
          >
            <Heart size={16} />
            Trusted by Parents
          </motion.div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            What Our
            <span className="block text-[#0aa84f]">Parents Say</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            The confidence and trust of our parents inspire us to provide
            every child with a caring, disciplined and meaningful learning
            experience.
          </p>

          {/* Decorative divider */}

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-red-200" />

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-[#0aa84f]"
            >
              <MessageCircleHeart size={18} />
            </motion.div>

            <span className="h-px w-12 bg-red-200" />
          </div>
        </motion.div>

        {/* =========================================================
            TESTIMONIAL CARDS
        ========================================================== */}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.16,
              },
            },
          }}
          className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 55,
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
              whileHover={{
                y: -10,
              }}
              className="group relative"
            >
              {/* Outer glow */}

              <div
                className={`pointer-events-none absolute -inset-1 rounded-[2rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 ${
                  index === 1
                    ? "bg-green-200/30"
                    : "bg-red-200/30"
                }`}
              />

              {/* Card */}

              <div className="relative h-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_15px_45px_rgba(15,23,42,0.07)] transition-all duration-500 group-hover:border-red-200 group-hover:shadow-[0_25px_65px_rgba(15,23,42,0.14)] sm:p-8">
                {/* Decorative quote */}

                <motion.div
                  animate={{
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-4 -top-5 text-slate-50 transition-colors duration-500 group-hover:text-red-50"
                >
                  <Quote
                    size={105}
                    fill="currentColor"
                    strokeWidth={1}
                  />
                </motion.div>

                {/* Top */}

                <div className="relative flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.15 * star,
                          duration: 0.35,
                        }}
                      >
                        <Star
                          size={18}
                          className="text-yellow-500"
                          fill="currentColor"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-black text-yellow-700"
                  >
                    5.0
                  </motion.div>
                </div>

                {/* Quote content */}

                <div className="relative mt-7">
                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: -5,
                    }}
                    className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white"
                  >
                    <Quote size={23} />
                  </motion.div>

                  <p className="min-h-[168px] text-[16px] italic leading-8 text-slate-600 sm:text-[17px]">
                    &ldquo;{item.message}&rdquo;
                  </p>
                </div>

                {/* Parent */}

                <div className="relative mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">
                  <motion.div
                    whileHover={{
                      scale: 1.12,
                      rotate: 5,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#078a43] to-[#0aa84f] text-xl font-black text-white shadow-lg shadow-green-600/20"
                  >
                    {item.initials}

                    <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-red-500" />
                  </motion.div>

                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-[#078a43]">
                      {item.student}
                    </p>
                  </div>
                </div>

                {/* Bottom animated line */}

                <div className="absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r from-[#078a43] via-[#0aa84f] to-red-500 transition-transform duration-500 group-hover:scale-x-100" />

                {/* Corner sparkle */}

                <motion.div
                  animate={{
                    rotate: [0, 12, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-6 right-6 text-yellow-400/30"
                >
                  <Sparkles size={22} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* =========================================================
            TRUST BANNER
        ========================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative mt-16 overflow-hidden rounded-[2.2rem] bg-[#111827] shadow-[0_30px_80px_rgba(15,23,42,0.18)] sm:mt-20"
        >
          {/* Background glows */}

          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#0aa84f]/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-red-500/15 blur-3xl" />

          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute right-20 top-10 hidden h-36 w-36 rounded-full border border-white/10 sm:block"
          />

          {/* Floating heart */}

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 7, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute right-[19%] bottom-8 hidden text-red-400/10 sm:block"
          >
            <Heart size={75} fill="currentColor" strokeWidth={1} />
          </motion.div>

          <div className="relative flex flex-col items-start justify-between gap-8 p-8 sm:p-10 lg:flex-row lg:items-center lg:p-12">
            <div className="flex items-start gap-5">
              {/* Icon */}

              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: -5,
                }}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#0aa84f]/15 text-[#38d982] shadow-lg shadow-green-900/10"
              >
                <Users size={31} />
              </motion.div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#38d982] sm:text-sm">
                  Parent-School Partnership
                </p>

                <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Together, We Help
                  <span className="text-[#38d982]"> Every Child Grow</span>
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Strong communication between parents and teachers helps us
                  understand, support and guide every student better.
                </p>
              </div>
            </div>

            {/* Tag */}

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white backdrop-blur-sm"
            >
              <Sparkles size={18} className="text-yellow-400" />
              Learn • Grow • Succeed
            </motion.div>
          </div>

          {/* Bottom accent */}

          <div className="h-1.5 bg-gradient-to-r from-[#0aa84f] via-red-500 to-yellow-400" />
        </motion.div>

        {/* Bottom tagline */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-green-200" />

          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
            Trust • Care • Growth
          </span>

          <span className="h-px w-8 bg-green-200" />
        </motion.div>
      </div>
    </section>
  );
}