"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      const percentage =
        height > 0 ? (scrollTop / height) * 100 : 0;

      setProgress(Math.min(100, Math.max(0, percentage)));
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, { passive: true });

    return () =>
      window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      className="fixed left-0 top-0 z-[9999] h-1"
      style={{
        width: `${progress}%`,
        background:
          "linear-gradient(90deg, #0aa84f 0%, #22c55e 20%, #facc15 45%, #f97316 70%, #ef4444 85%, #a855f7 100%)",
        transition: "width 120ms ease-out",
      }}
    >
      {/* Moving glow */}
      <div
        className="absolute right-0 top-1/2 h-3 w-8 -translate-y-1/2 rounded-full blur-md"
        style={{
          background:
            progress < 35
              ? "#22c55e"
              : progress < 65
              ? "#facc15"
              : progress < 85
              ? "#f97316"
              : "#ef4444",
        }}
      />
    </div>
  );
}