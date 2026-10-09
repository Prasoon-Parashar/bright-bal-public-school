"use client";

import { Star } from "lucide-react";

const items = Array.from({ length: 8 }, (_, i) => i);

export default function SchoolMarquee() {
  return (
    <section className="relative w-full overflow-hidden border-y border-red-100 bg-white py-4">
      <div className="absolute inset-0 bg-gradient-to-r from-red-50 via-white to-blue-50" />

      <div className="relative flex overflow-hidden">
        <div className="school-marquee-track flex w-max items-center">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 items-center"
              aria-hidden={group === 1}
            >
              {items.map((item) => (
                <div
                  key={`${group}-${item}`}
                  className="flex shrink-0 items-center gap-5 px-6 sm:gap-8 sm:px-8"
                >
                  <span className="whitespace-nowrap text-sm font-black uppercase tracking-wider text-[#C62828] sm:text-lg">
                    Bright Bal Public School
                  </span>

                  <Star
                    size={15}
                    className="shrink-0 fill-[#1565C0] text-[#1565C0]"
                  />

                  <span className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-[#1565C0] sm:text-sm">
                    Excellence in Education
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-600 via-red-600 to-blue-600" />

      <style jsx>{`
        .school-marquee-track {
          animation: school-marquee 35s linear infinite;
        }

        @keyframes school-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .school-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}