"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * A tiny school bus that keeps driving along the bottom edge of the navbar.
 * Place it inside the (relative) main navbar container.
 */
export default function NavbarBus({ transparent = false }: { transparent?: boolean }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[2px] z-0 h-[14px] overflow-hidden"
    >
      {/* Dashed road (only needed when the navbar is transparent) */}
      {transparent && (
        <div
          className="absolute inset-x-0 bottom-[-2px] h-px"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.45) 0 10px, transparent 10px 20px)",
          }}
        />
      )}

      {/* Driving bus */}
      <motion.div
        className="absolute bottom-0"
        initial={{ left: "-6%" }}
        animate={{ left: "106%" }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {/* exhaust puffs */}
        {[0, 1].map((i) => (
          <motion.span
            key={i}
            className={`absolute bottom-[3px] left-0 h-1.5 w-1.5 rounded-full ${
              transparent ? "bg-white/60" : "bg-slate-300"
            }`}
            animate={{ x: [0, -16], opacity: [0.7, 0], scale: [0.5, 1.7] }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              delay: i * 0.55,
              ease: "easeOut",
            }}
          />
        ))}

        {/* bus body bobbing slightly */}
        <motion.svg
          viewBox="0 0 44 22"
          className="relative h-[14px] w-auto"
          animate={{ y: [0, -0.7, 0] }}
          transition={{ duration: 0.45, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="0" y="2" width="41" height="14" rx="3.5" fill="#FFC93C" />
          <rect x="0" y="11.5" width="41" height="2.2" fill="#C62828" />
          {[3, 11, 19, 27].map((x) => (
            <rect key={x} x={x} y="4.2" width="6" height="5.2" rx="1" fill="#BBDEFB" />
          ))}
          <rect x="34.5" y="4.2" width="5" height="7" rx="1.2" fill="#E3F2FD" />
          <circle cx="40" cy="13.5" r="1.1" fill="#fff" />

          {[9, 31].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="17" r="3.6" fill="#111827" />
              <motion.g
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              >
                <circle cx={cx} cy="17" r="1.8" fill="#9CA3AF" />
                <path d={`M${cx - 1.8} 17H${cx + 1.8}`} stroke="#111827" strokeWidth="0.7" />
              </motion.g>
            </g>
          ))}
        </motion.svg>
      </motion.div>
    </div>
  );
}