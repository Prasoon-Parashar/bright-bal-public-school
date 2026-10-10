"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, MapPin, Pencil, Sparkles, Star } from "lucide-react";

const RING_TEXT = [
  "BRIGHT BAL PUBLIC SCHOOL",
  "LEARN",
  "GROW",
  "SHINE",
];

/* Three tiles that orbit around the emblem (angles: 0°, 120°, 240°) */
const orbitTiles = [
  {
    pos: "left-1/2 top-0",
    box: "border-red-100 text-[#C62828] shadow-red-900/10",
    icon: <BookOpen size={24} strokeWidth={1.7} />,
  },
  {
    pos: "left-[93.3%] top-[75%]",
    box: "border-blue-100 text-[#1565C0] shadow-blue-900/10",
    icon: <Pencil size={22} strokeWidth={1.8} />,
  },
  {
    pos: "left-[6.7%] top-[75%]",
    box: "border-yellow-100 text-amber-500 shadow-amber-900/10",
    icon: <Star size={22} fill="currentColor" />,
  },
];

export default function EducationIllustration() {
  return (
    <div className="relative isolate min-h-[360px] overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-br from-white via-red-50/70 to-blue-50/80 p-5 shadow-xl shadow-slate-900/[0.04] sm:min-h-[420px] sm:p-8">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-red-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-blue-200/60 blur-3xl" />

      {/* Dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Decorative shapes */}
      <div className="absolute right-[12%] top-[12%] h-5 w-5 rounded-full bg-[#C62828] shadow-lg shadow-red-500/30" />
      <div className="absolute left-[12%] top-[22%] h-3 w-3 rounded-full bg-[#1565C0]" />
      <div className="absolute bottom-[20%] right-[14%] h-12 w-12 rotate-12 rounded-2xl border border-blue-200 bg-white/60" />

      {/* ================= ILLUSTRATION AREA ================= */}
      <div className="relative flex min-h-[270px] items-center justify-center sm:min-h-[320px]">
        {/* Orbit: dashed path + 3 icon tiles revolving around the emblem */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className="absolute h-60 w-60 rounded-full border border-dashed border-blue-300/70 sm:h-[300px] sm:w-[300px]"
        >
          {orbitTiles.map((t, i) => (
            <div
              key={i}
              className={`absolute ${t.pos} -translate-x-1/2 -translate-y-1/2`}
            >
              {/* counter-rotate so icons always stay upright */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-white shadow-xl sm:h-14 sm:w-14 ${t.box}`}
              >
                {t.icon}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Inner thin ring */}
        <div className="absolute h-44 w-44 rounded-full border border-red-200/70 sm:h-56 sm:w-56" />

        {/* ===== Central emblem: logo seal with rotating text ring ===== */}
        <div className="relative z-10 h-44 w-44 sm:h-52 sm:w-52">
          {/* glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/40 to-blue-500/40 blur-2xl" />
          {/* soft pulse */}
          <span className="absolute inset-0 animate-ping rounded-full border border-red-300/40 [animation-duration:3.5s]" />

          {/* white seal */}
          <div className="absolute inset-0 rounded-full border border-white bg-white shadow-[0_25px_70px_rgba(21,101,192,0.28)]" />

          {/* rotating text ring */}
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute inset-0 h-full w-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          >
            <defs>
              <path
                id="edu-ring-path"
                d="M100 100 m-82 0 a82 82 0 1 1 164 0 a82 82 0 1 1 -164 0"
              />
            </defs>
            <text
              fontSize="11"
              fontWeight="800"
              fill="#C62828"
            >
              <textPath href="#edu-ring-path" textLength="505" lengthAdjust="spacing">
                {RING_TEXT.map((w) => (
                  <tspan key={w}>
                    {w}
                    <tspan fill="#1565C0">{" • "}</tspan>
                  </tspan>
                ))}
              </textPath>
            </text>
          </motion.svg>

          {/* gradient ring + logo */}
          <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-[#C62828] via-[#D93636] to-[#1565C0] p-[3px] shadow-lg">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-white p-2">
              <Image
                src="/logo/logo.png.png"
                alt="Bright Bal Public School logo"
                width={90}
                height={90}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* sparkle accent */}
          <Sparkles
            size={22}
            className="absolute -right-1 top-3 text-amber-400 drop-shadow"
          />
        </div>

        {/* Decorative dots */}
        <div className="absolute bottom-[7%] right-[10%] flex gap-2">
          <span className="h-2 w-2 rounded-full bg-[#C62828]" />
          <span className="h-2 w-2 rounded-full bg-[#1565C0]" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
        </div>
      </div>

      {/* Caption */}
      <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-md sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C62828]">
            <MapPin size={22} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-extrabold text-[#101B33]">
              Bright Bal Public School
            </p>
            <p className="mt-0.5 text-xs text-slate-500">Agra, Uttar Pradesh</p>
          </div>
        </div>

        <Sparkles size={20} className="shrink-0 text-[#1565C0]" />
      </div>
    </div>
  );
}