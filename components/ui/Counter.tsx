"use client";

import CountUp from "react-countup";

interface CounterProps {
  end: number;
  suffix?: string;
}

export default function Counter({
  end,
  suffix = "",
}: CounterProps) {
  return (
    <h2 className="text-4xl font-bold text-red-700 dark:text-red-400 transition-colors duration-300">
      <CountUp
        end={end}
        duration={2}
      />
      {suffix}
    </h2>
  );
}