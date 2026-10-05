"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Pencil } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        height > 0 ? (scrollTop / height) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, percentage)));
      setShow(scrollTop > 400);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  const radius = 27;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (progress / 100) * circumference;

  return (
    <button
      type="button"
      aria-label="Back to top"
      title="Back to top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="group fixed bottom-24 right-5 z-[999] flex h-[62px] w-[62px] items-center justify-center sm:right-7 sm:h-[68px] sm:w-[68px]"
    >
      {/* =====================================================
          OUTER GLOW
      ====================================================== */}

      <span className="absolute inset-0 rounded-full bg-[#0aa84f]/10 blur-xl transition-all duration-500 group-hover:bg-[#0aa84f]/20" />

      {/* =====================================================
          PROGRESS RING
      ====================================================== */}

      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 64 64"
      >
        {/* Background ring */}

        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="white"
          stroke="currentColor"
          strokeWidth="3"
          className="text-slate-200"
        />

        {/* Progress */}

        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-150"
        />

        {/* Gradient */}

        <defs>
          <linearGradient
            id="progressGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#0aa84f" />
            <stop offset="45%" stopColor="#facc15" />
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
      </svg>

      {/* =====================================================
          INNER BUTTON
      ====================================================== */}

      <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#10251a] text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0aa84f] sm:h-12 sm:w-12">
        {/* Green shine */}

        <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />

        {/* Pencil */}

        <Pencil
          size={20}
          strokeWidth={2.2}
          className="relative z-10 -rotate-45 text-[#facc15] transition-all duration-500 group-hover:rotate-0 group-hover:scale-110"
        />

        {/* Arrow */}

        <ArrowUp
          size={13}
          strokeWidth={3}
          className="absolute bottom-2 right-2 z-20 text-white transition-all duration-300 group-hover:-translate-y-0.5"
        />
      </span>

      {/* =====================================================
          TOOLTIP
      ====================================================== */}

      <span className="pointer-events-none absolute right-[72px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 opacity-0 shadow-lg transition-all duration-300 group-hover:right-[76px] group-hover:opacity-100 sm:block">
        Back to top
      </span>

      {/* =====================================================
          FLOATING SPARK
      ====================================================== */}

      <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 shadow-sm transition-transform duration-300 group-hover:scale-125" />

      <span className="absolute -bottom-1 -left-1 h-2.5 w-2.5 rounded-full bg-[#0aa84f] transition-transform duration-300 group-hover:scale-125" />
    </button>
  );
}