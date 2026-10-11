"use client";

import { Children, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

type Props = {
  children: ReactNode;
  /** Height of the scrolling window, e.g. "h-[360px]" */
  heightClass?: string;
  /** Seconds each item takes to pass - higher = slower */
  secondsPerItem?: number;
  emptyText?: string;
  /** Lists shorter than this stay still (no scrolling, no repeating) */
  minToScroll?: number;
};

/**
 * Vertical auto-scrolling list.
 * - Keeps moving (seamless loop)
 * - Pauses while the mouse is over it (or a link inside has focus)
 * - Resumes when the mouse leaves
 */
export default function AutoScrollList({
  children,
  heightClass = "h-[360px]",
  secondsPerItem = 4,
  emptyText = "Nothing to show right now.",
  minToScroll = 4,
}: Props) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  if (items.length === 0) {
    return (
      <div className={`flex ${heightClass} items-center justify-center px-6 text-center text-sm text-slate-400`}>
        {emptyText}
      </div>
    );
  }

  /* Reduced-motion users get a normal scrollable list */
  if (reduce) {
    return <div className={`${heightClass} overflow-y-auto px-4`}>{items}</div>;
  }

  /* Short lists fit in the box already - show them as they are */
  if (items.length < minToScroll) {
    return <div className={`${heightClass} overflow-y-auto px-4`}>{items}</div>;
  }

  /* Two identical copies give a seamless loop (-50% = one copy) */
  const repeat = 1;
  const copies = Array.from({ length: 2 });
  const duration = items.length * secondsPerItem;

  return (
    <div
      className={`group relative ${heightClass} overflow-hidden px-4`}
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0, #000 7%, #000 93%, transparent 100%)",
      }}
    >
      <style>{`@keyframes nbScroll{from{transform:translateY(0)}to{transform:translateY(-50%)}}`}</style>

      <div
        className="will-change-transform group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{
          animationName: "nbScroll",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {copies.map((_, i) => (
          <div key={i} aria-hidden={i >= repeat ? true : undefined}>
            {items}
          </div>
        ))}
      </div>
    </div>
  );
}