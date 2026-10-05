"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  Trophy,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  BookOpen,
  Pencil,
  Star,
} from "lucide-react";

export default function Facilities() {
  const facilities = [
    {
      icon: Monitor,
      number: "01",
      title: "Computer Lab",
      description:
        "Practical computer education designed to develop essential digital knowledge and technology skills.",
      highlight: "Digital Learning",
    },
    {
      icon: Users,
      number: "02",
      title: "Experienced Teachers",
      description:
        "Qualified and dedicated educators who provide guidance, encouragement and personal attention.",
      highlight: "Expert Guidance",
    },
    {
      icon: Trophy,
      number: "03",
      title: "Sports & Activities",
      description:
        "Sports, cultural programs and extracurricular activities that promote confidence and teamwork.",
      highlight: "Play & Grow",
    },
    {
      icon: ShieldCheck,
      number: "04",
      title: "Safe Campus",
      description:
        "A disciplined, secure and student-friendly environment where children can learn with confidence.",
      highlight: "Safe & Secure",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8faf9] py-24 text-slate-900">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-red-100/70 blur-[110px]" />

        <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-green-100/80 blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-yellow-100/70 blur-[110px]" />

        {/* soft dotted pattern */}

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(#0aa84f 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

      </div>

      {/* =====================================================
          FLOATING SCHOOL DECORATIONS
      ====================================================== */}

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 6, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-[6%]
          top-28
          hidden
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          border
          border-white
          bg-white
          text-[#0aa84f]
          shadow-lg
          md:flex
        "
      >
        <BookOpen size={24} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          right-[7%]
          top-36
          hidden
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-yellow-50
          text-yellow-500
          shadow-md
          md:flex
        "
      >
        <Star size={21} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -8, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          bottom-36
          left-[10%]
          hidden
          text-red-300
          md:block
        "
      >
        <Pencil size={30} />
      </motion.div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-6">

        {/* ===================================================
            HEADING
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-green-200
              bg-white
              px-5
              py-2.5
              text-sm
              font-bold
              text-[#078a43]
              shadow-sm
            "
          >
            <Sparkles size={17} />
            Learning Beyond Classrooms
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Facilities Designed for
            <span className="text-[#078a43]"> Better Learning</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Providing students with a safe, supportive and engaging
            environment where they can learn, explore, participate and grow.
          </p>

          {/* decorative line */}

          <div className="mt-7 flex items-center justify-center gap-3">

            <span className="h-px w-14 bg-red-200" />

            <span className="h-2.5 w-2.5 rounded-full bg-[#0aa84f]" />

            <span className="h-px w-14 bg-red-200" />

          </div>

        </motion.div>

        {/* ===================================================
            FACILITY CARDS
        ==================================================== */}

        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

          {facilities.map((facility, index) => {
            const Icon = facility.icon;

            return (
              <motion.div
                key={facility.title}
                initial={{
                  opacity: 0,
                  y: 45,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -10,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-slate-200
                  bg-white
                  p-7
                  shadow-[0_15px_45px_rgba(15,23,42,0.07)]
                  transition-shadow
                  duration-500
                  hover:border-green-200
                  hover:shadow-[0_25px_65px_rgba(10,168,79,0.15)]
                "
              >

                {/* Hover wash */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    bg-gradient-to-br
                    from-green-50
                    via-transparent
                    to-red-50
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                  "
                />

                {/* Number */}

                <span
                  className="
                    absolute
                    right-5
                    top-4
                    text-6xl
                    font-black
                    text-slate-100
                    transition-colors
                    duration-500
                    group-hover:text-green-50
                  "
                >
                  {facility.number}
                </span>

                <div className="relative z-10">

                  {/* Icon */}

                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-2xl
                      bg-green-50
                      text-[#078a43]
                      shadow-sm
                      transition-all
                      duration-500
                      group-hover:rotate-3
                      group-hover:bg-[#078a43]
                      group-hover:text-white
                      group-hover:shadow-lg
                      group-hover:shadow-green-500/25
                    "
                  >
                    <Icon size={29} />
                  </div>

                  {/* Highlight */}

                  <div
                    className="
                      mt-7
                      inline-flex
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-green-100
                      bg-green-50
                      px-3
                      py-1.5
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-wide
                      text-[#078a43]
                      transition-all
                      duration-300
                      group-hover:border-green-200
                      group-hover:bg-white
                    "
                  >
                    <CheckCircle2 size={14} />
                    {facility.highlight}
                  </div>

                  {/* Title */}

                  <div className="mt-5 flex items-start justify-between gap-3">

                    <h3 className="text-2xl font-black leading-tight text-slate-900">
                      {facility.title}
                    </h3>

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-slate-200
                        text-slate-400
                        transition-all
                        duration-300
                        group-hover:border-red-600
                        group-hover:bg-red-600
                        group-hover:text-white
                      "
                    >
                      <ArrowUpRight size={17} />
                    </div>

                  </div>

                  {/* Description */}

                  <p className="mt-4 leading-7 text-slate-600">
                    {facility.description}
                  </p>

                  {/* Bottom mini label */}

                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.18em]
                      text-slate-400
                      transition-colors
                      group-hover:text-[#078a43]
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0aa84f]" />
                    Bright Future
                  </div>

                </div>

                {/* Animated bottom line */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-1.5
                    w-full
                    origin-left
                    scale-x-0
                    bg-gradient-to-r
                    from-[#078a43]
                    via-[#0aa84f]
                    to-red-500
                    transition-transform
                    duration-500
                    group-hover:scale-x-100
                  "
                />

              </motion.div>
            );
          })}

        </div>

        {/* ===================================================
            BOTTOM BANNER
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            relative
            mt-16
            overflow-hidden
            rounded-[2.2rem]
            bg-[#151b19]
            shadow-[0_30px_80px_rgba(15,23,42,0.18)]
          "
        >

          {/* Green glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-28
              h-80
              w-80
              rounded-full
              bg-[#0aa84f]/20
              blur-[70px]
            "
          />

          {/* Red glow */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-32
              left-20
              h-80
              w-80
              rounded-full
              bg-red-600/10
              blur-[80px]
            "
          />

          {/* Decorative circles */}

          <div className="pointer-events-none absolute right-10 top-8 h-20 w-20 rounded-full border border-green-400/20" />

          <div className="pointer-events-none absolute bottom-8 right-32 h-3 w-3 rounded-full bg-yellow-400/70" />

          <div className="relative flex flex-col gap-8 px-7 py-9 md:flex-row md:items-center md:justify-between md:px-12 md:py-11">

            {/* Text */}

            <div className="max-w-2xl">

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-green-300">
                <Sparkles size={15} />
                A Complete Learning Environment
              </div>

              <h3 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">
                Everything Your Child Needs to
                <span className="text-[#35d879]"> Learn & Grow</span>
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                From academics and technology to sports and safety, our
                facilities support every part of a student&apos;s school
                journey.
              </p>

            </div>

            {/* Safety badge */}

            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              className="
                flex
                shrink-0
                items-center
                gap-4
                rounded-2xl
                border
                border-green-400/20
                bg-white/[0.06]
                px-6
                py-5
                text-white
                backdrop-blur-md
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#0aa84f]/20
                  text-[#35d879]
                "
              >
                <ShieldCheck size={28} />
              </div>

              <div>

                <p className="text-xl font-black">
                  Safe & Caring
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Student-first environment
                </p>

              </div>

            </motion.div>

          </div>

        </motion.div>

        {/* Bottom tiny identity */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="
            mt-8
            flex
            items-center
            justify-center
            gap-3
            text-[10px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-slate-400
          "
        >
          <span className="h-px w-10 bg-slate-200" />

          <span className="text-[#078a43]">
            Learn • Explore • Grow
          </span>

          <span className="h-px w-10 bg-slate-200" />
        </motion.div>

      </div>
    </section>
  );
}