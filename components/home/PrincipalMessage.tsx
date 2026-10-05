"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Quote,
  Heart,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  MapPin,
  BookOpen,
  Pencil,
  Star,
  Lightbulb,
  Shapes,
} from "lucide-react";

const values = [
  {
    title: "Student-Centered Learning",
    icon: BookOpen,
    color: "green",
  },
  {
    title: "Strong Moral Values",
    icon: Heart,
    color: "red",
  },
  {
    title: "Parent Partnership",
    icon: Star,
    color: "yellow",
  },
  {
    title: "Holistic Development",
    icon: GraduationCap,
    color: "green",
  },
];

export default function PrincipalMessage() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fffdfb] py-20 sm:py-24 lg:py-28">

      {/* =====================================================
          SOFT BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-red-100/70 blur-[120px]" />

        <div className="absolute -right-40 top-40 h-[420px] w-[420px] rounded-full bg-green-100/70 blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-yellow-100/50 blur-[120px]" />

      </div>

      {/* =====================================================
          PLAYFUL BACKGROUND PATTERN
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 opacity-40">

        {/* Dotted pattern */}
        <div
          className="absolute left-[3%] top-[22%] h-28 w-28"
          style={{
            backgroundImage:
              "radial-gradient(#0aa84f 1.3px, transparent 1.3px)",
            backgroundSize: "12px 12px",
          }}
        />

        <div
          className="absolute bottom-[18%] right-[4%] h-28 w-28"
          style={{
            backgroundImage:
              "radial-gradient(#dc2626 1.3px, transparent 1.3px)",
            backgroundSize: "12px 12px",
          }}
        />

      </div>

      {/* =====================================================
          FLOATING DECORATIONS
      ====================================================== */}

      {/* Book */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [-5, 3, -5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[5%] top-[13%] hidden text-[#0aa84f]/20 lg:block"
      >
        <BookOpen size={54} strokeWidth={1.5} />
      </motion.div>

      {/* Pencil */}
      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [15, 7, 15],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[7%] top-[17%] hidden text-yellow-500/40 lg:block"
      >
        <Pencil size={48} strokeWidth={1.5} />
      </motion.div>

      {/* Star */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 15, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[15%] top-[48%] hidden text-yellow-500/40 lg:block"
      >
        <Star size={35} fill="currentColor" strokeWidth={1.5} />
      </motion.div>

      {/* Light bulb */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[7%] bottom-[18%] hidden text-red-500/20 lg:block"
      >
        <Lightbulb size={50} strokeWidth={1.5} />
      </motion.div>

      {/* Small green dot */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          x: [0, 8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[30%] top-[12%] h-3 w-3 rounded-full bg-[#0aa84f]/40"
      />

      {/* Small red dot */}
      <motion.div
        animate={{
          y: [0, 15, 0],
          x: [0, -8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[24%] bottom-[12%] h-4 w-4 rounded-full bg-red-400/30"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        {/* =====================================================
            HEADING
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >

          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-red-700 shadow-sm">
            <Sparkles size={15} />
            From Our Leadership
          </div>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Principal's{" "}
            <span className="text-red-700">Message</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Guiding every student with knowledge, discipline, confidence and
            values for a successful future.
          </p>

        </motion.div>

        {/* =====================================================
            MAIN AREA
        ====================================================== */}

        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* =================================================
              PRINCIPAL PHOTO
          ================================================== */}

         {/* =================================================
    PRINCIPAL PHOTO
================================================== */}

<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative mx-auto w-full max-w-md"
>

  {/* ================================================
      FLOATING BACKGROUND SHAPES
  ================================================= */}

  {/* Large green blob */}

  <motion.div
    animate={{
      y: [0, -12, 0],
      rotate: [0, 4, 0],
    }}
    transition={{
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      absolute
      -left-8
      top-10
      h-36
      w-36
      rounded-[40%]
      bg-[#0aa84f]/10
      blur-[1px]
      sm:-left-12
    "
  />

  {/* Red blob */}

  <motion.div
    animate={{
      y: [0, 14, 0],
      x: [0, 7, 0],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      absolute
      -right-8
      bottom-24
      h-32
      w-32
      rounded-full
      bg-red-100/80
      sm:-right-12
    "
  />

  {/* Yellow floating circle */}

  <motion.div
    animate={{
      scale: [1, 1.08, 1],
      rotate: [0, 12, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      absolute
      right-8
      top-[-28px]
      h-16
      w-16
      rounded-full
      border-[8px]
      border-yellow-200/70
      bg-yellow-50
      shadow-sm
    "
  />

  {/* Green ring */}

  <motion.div
    animate={{
      rotate: [0, 360],
    }}
    transition={{
      duration: 18,
      repeat: Infinity,
      ease: "linear",
    }}
    className="
      pointer-events-none
      absolute
      -bottom-8
      left-8
      h-20
      w-20
      rounded-full
      border-[7px]
      border-[#0aa84f]/15
    "
  />

  {/* ================================================
      FLOATING SCHOOL ICONS
  ================================================= */}

  <motion.div
    animate={{
      y: [0, -9, 0],
      rotate: [-5, 5, -5],
    }}
    transition={{
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      absolute
      -left-5
      top-24
      z-30
      flex
      h-12
      w-12
      items-center
      justify-center
      rounded-2xl
      border
      border-white
      bg-white
      text-[#0aa84f]
      shadow-lg
    "
  >
    <BookOpen size={21} />
  </motion.div>

  <motion.div
    animate={{
      y: [0, 8, 0],
      rotate: [5, -5, 5],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      absolute
      -right-4
      top-32
      z-30
      flex
      h-11
      w-11
      items-center
      justify-center
      rounded-full
      border
      border-white
      bg-yellow-50
      text-yellow-600
      shadow-lg
    "
  >
    <Star
      size={19}
      fill="currentColor"
    />
  </motion.div>

  {/* ================================================
      DECORATIVE FRAME
  ================================================= */}

  <div
    className="
      absolute
      -inset-3
      rotate-2
      rounded-[2.8rem]
      border-2
      border-[#0aa84f]/15
    "
  />

  <div
    className="
      absolute
      -inset-5
      -rotate-2
      rounded-[3rem]
      border
      border-red-200/60
    "
  />

  {/* ================================================
      MAIN PHOTO CARD
  ================================================= */}

  <div
    className="
      relative
      z-10
      rounded-[2.5rem]
      border
      border-white
      bg-gradient-to-br
      from-white
      via-white
      to-green-50
      p-3
      shadow-[0_35px_90px_rgba(15,23,42,0.16)]
      sm:p-4
    "
  >

    {/* Inner green glow */}

    <div className="pointer-events-none absolute inset-2 rounded-[2.2rem] bg-[#0aa84f]/5" />

    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-50 via-white to-red-50">

      <Image
        src="/images/principal-swati.jpeg"
        alt="Swati Shukla, Principal"
        width={836}
        height={1536}
        className="
          relative
          z-10
          block
          h-auto
          w-full
          object-cover
        "
      />

      {/* Soft photo overlay */}

      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

      {/* School leadership badge */}

      <motion.div
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-5
          left-5
          z-30
          rounded-full
          border
          border-white/20
          bg-black/30
          px-4
          py-2
          text-[10px]
          font-bold
          uppercase
          tracking-[0.18em]
          text-white
          backdrop-blur-md
        "
      >
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#38d982]" />
        School Leadership
      </motion.div>

    </div>

    {/* =============================================
        PRINCIPAL INFO
    ============================================== */}

    <div className="relative z-20 px-3 pb-2 pt-6 text-center">

      <h3 className="text-3xl font-black tracking-tight text-slate-900">
        Swati Shukla
      </h3>

      <div className="mt-2 flex items-center justify-center gap-2">

        <span className="h-px w-8 bg-red-200" />

        <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-700">
          Principal
        </p>

        <span className="h-px w-8 bg-red-200" />

      </div>

      <p className="mt-2 text-sm font-medium text-slate-500">
        Bright Bal Public School
      </p>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
        <MapPin
          size={15}
          className="text-red-600"
        />
        Agra, Uttar Pradesh
      </div>

    </div>

  </div>

  {/* ================================================
      FLOATING GRADUATION BADGE
  ================================================= */}

  <motion.div
    animate={{
      y: [0, -8, 0],
      rotate: [0, 3, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="
      absolute
      -right-3
      top-16
      z-40
      hidden
      rounded-2xl
      border
      border-white
      bg-white
      p-3
      shadow-xl
      sm:block
    "
  >
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-[#0aa84f]">
      <GraduationCap size={21} />
    </div>
  </motion.div>

</motion.div>

          {/* =================================================
              RIGHT CONTENT
          ================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >

            {/* Quote bubble */}

            <div className="relative">

              <div className="absolute -left-3 -top-3 h-20 w-20 rounded-full bg-red-50" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 to-red-500 text-white shadow-lg shadow-red-700/20">
                <Quote size={29} />
              </div>

            </div>

            {/* Quote */}

            <blockquote className="mt-7 text-2xl font-semibold leading-10 text-slate-800 sm:text-3xl lg:text-[2rem]">

              “Education is not only about academic excellence. It is about
              developing{" "}

              <span className="text-red-700">
                confidence, discipline, compassion and leadership.
              </span>

              ”

            </blockquote>

            {/* Accent */}

            <div className="mt-7 flex items-center gap-2">
              <div className="h-1.5 w-14 rounded-full bg-red-700" />
              <div className="h-1.5 w-7 rounded-full bg-[#0aa84f]" />
              <div className="h-1.5 w-2 rounded-full bg-yellow-400" />
            </div>

            {/* Description */}

            <div className="mt-8 space-y-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">

              <p>
                At Bright Bal Public School, we strive to create a nurturing
                and inspiring environment where every child feels valued,
                supported and encouraged to discover their unique potential.
              </p>

              <p>
                Our responsibility extends beyond classroom learning. We aim
                to develop responsible, confident and compassionate individuals
                who are prepared to face the opportunities and challenges of
                the future.
              </p>

            </div>

            {/* =================================================
                VALUES
            ================================================== */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >

              {values.map((item) => {
                const Icon = item.icon;

                const iconStyle =
                  item.color === "green"
                    ? "bg-green-50 text-[#0aa84f] group-hover:bg-[#0aa84f]"
                    : item.color === "red"
                      ? "bg-red-50 text-red-600 group-hover:bg-red-600"
                      : "bg-yellow-50 text-yellow-600 group-hover:bg-yellow-500";

                return (
                  <motion.div
                    key={item.title}
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 25,
                        scale: 0.96,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.45,
                        },
                      },
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="
                      group
                      relative
                      flex
                      items-center
                      gap-3
                      overflow-hidden
                      rounded-2xl
                      border
                      border-slate-200
                      bg-white
                      p-4
                      shadow-sm
                      transition-all
                      duration-300
                      hover:border-slate-300
                      hover:shadow-lg
                    "
                  >

                    {/* Hover accent */}

                    <div className="absolute left-0 top-0 h-full w-1 scale-y-0 bg-[#0aa84f] transition-transform duration-300 group-hover:scale-y-100" />

                    <div
                      className={`
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        transition-all
                        duration-300
                        group-hover:text-white
                        ${iconStyle}
                      `}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="text-sm font-bold text-slate-700">
                      {item.title}
                    </span>

                  </motion.div>
                );
              })}

            </motion.div>

            {/* =================================================
                FINAL MOTTO
            ================================================== */}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-9 flex items-center gap-3"
            >

              <span className="h-px w-10 bg-slate-200" />

              <Shapes
                size={14}
                className="text-[#0aa84f]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-400">
                Learn • Grow • Lead
              </span>

              <span className="h-px w-10 bg-slate-200" />

            </motion.div>

          </motion.div>

        </div>

        {/* =====================================================
            BOTTOM PLAYFUL STRIP
        ====================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="
            relative
            mt-20
            overflow-hidden
            rounded-[2rem]
            border
            border-green-100
            bg-gradient-to-r
            from-green-50
            via-white
            to-red-50
            px-6
            py-6
            shadow-sm
            sm:px-8
          "
        >

          {/* Decorative blobs */}

          <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-green-200/30 blur-xl" />

          <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-red-200/30 blur-xl" />

          <div className="relative flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0aa84f]">
                Growing Together
              </p>

              <h3 className="mt-1 text-xl font-black text-slate-900">
                Every child has the potential to shine.
              </h3>
            </div>

            <div className="flex items-center gap-2">

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow-100 text-yellow-600"
              >
                <Star size={19} fill="currentColor" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-[#0aa84f]"
              >
                <BookOpen size={19} />
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600"
              >
                <Heart size={19} fill="currentColor" />
              </motion.div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}