"use client";

import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";

export default function SectionDivider() {
  return (
    <div className="relative h-24 overflow-hidden bg-white sm:h-28">
      {/* Soft red-blue background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFF6FF]/70 blur-3xl" />

      {/* Tiny floating dots */}
      <motion.span
        animate={{
          y: [0, -7, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[25%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#E53935]/60"
      />

      <motion.span
        animate={{
          y: [0, 7, 0],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[25%] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-[#1565C0]/60"
      />

      {/* Main divider */}
      <div className="absolute left-1/2 top-1/2 flex w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 items-center px-6">
        {/* Left line: red */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-px flex-1 bg-gradient-to-r from-transparent via-[#FCA5A5] to-[#C62828]/60"
        />

        {/* Center badge: red */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.25,
            type: "spring",
            stiffness: 180,
          }}
          className="relative mx-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-[#C62828] text-white shadow-[0_10px_30px_rgba(198,40,40,0.25)] sm:mx-7"
        >
          {/* Rotating blue ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -inset-2 rounded-[1.2rem] border border-dashed border-[#1565C0]/40"
          />

          <GraduationCap size={23} />

          {/* Sparkle */}
          <motion.span
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-2 -top-2 text-yellow-400"
          >
            <Sparkles size={15} fill="currentColor" />
          </motion.span>
        </motion.div>

        {/* Right line: blue */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-px flex-1 bg-gradient-to-l from-transparent via-[#93C5FD] to-[#1565C0]/60"
        />
      </div>

      {/* Bottom micro text */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="absolute bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.28em] text-slate-400 sm:text-[9px]"
      >
        Learn • Grow • Shine
      </motion.div>
    </div>
  );
}