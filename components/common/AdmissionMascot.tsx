"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AdmissionMascotProps = {
  children: ReactNode;
  message?: string;
};

export default function AdmissionMascot({
  children,
  message = "Apply Here!",
}: AdmissionMascotProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative inline-flex pt-2">
      {children}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-5 -top-[100px] z-30 flex items-end gap-1 sm:-right-8 sm:-top-[125px]"
        animate={
          reduceMotion ? undefined : { y: [0, -7, 0], rotate: [0, 2, 0] }
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Animated speech bubble */}
        <motion.span
          className="relative z-10 whitespace-nowrap rounded-full border-2 border-red-200 bg-white px-3 py-2 text-xs font-black text-[#C62828] shadow-lg sm:text-sm"
          animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {message}
          <span className="absolute -bottom-1 right-5 h-2 w-2 rotate-45 border-b-2 border-r-2 border-red-200 bg-white" />
        </motion.span>

        {/* Actual school mascot image */}
        <motion.div
          className="relative h-[105px] w-[90px] shrink-0 sm:h-[130px] sm:w-[112px]"
          animate={
            reduceMotion ? undefined : { y: [0, -3, 0] }
          }
          transition={{
            duration: 1.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
        </motion.div>
      </motion.div>
    </div>
  );
}