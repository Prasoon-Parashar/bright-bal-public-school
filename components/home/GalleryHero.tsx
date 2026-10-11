"use client";

import { motion } from "framer-motion";
import { Camera, Heart, Images, Layers, Sparkles, Star, Tag } from "lucide-react";

type Cover = { src: string; title: string };

type Props = {
  covers: Cover[];
  stats: { collections: number; photos: number; categories: number };
};

const spots = [
  { pos: "left-[4%] top-44", rotate: -8, delay: 0.1 },
  { pos: "right-[5%] top-40", rotate: 7, delay: 0.3 },
  { pos: "left-[13%] bottom-24", rotate: 5, delay: 0.5 },
];

export default function GalleryHero({ covers, stats }: Props) {
  const items = [
    { icon: Layers, label: "Collections", value: stats.collections },
    { icon: Images, label: "Photos", value: stats.photos },
    { icon: Tag, label: "Categories", value: stats.categories },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#101B33] pb-32 pt-36 sm:pt-40">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-32 h-[450px] w-[450px] rounded-full bg-red-600/25 blur-[130px]" />
        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/30 blur-[140px]" />
        <div className="absolute bottom-[-180px] left-1/3 h-[400px] w-[400px] rounded-full bg-amber-400/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Floating doodles */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[22%] top-32 hidden text-white/15 md:block"
      >
        <Camera size={52} strokeWidth={1.3} />
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[24%] top-36 hidden text-amber-300/60 md:block"
      >
        <Star size={34} fill="currentColor" strokeWidth={1} />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-40 right-[18%] hidden text-red-400/50 md:block"
      >
        <Heart size={38} fill="currentColor" strokeWidth={1} />
      </motion.div>
      <motion.div
        animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-36 left-[30%] hidden text-blue-300/50 md:block"
      >
        <Sparkles size={34} />
      </motion.div>

      {/* Polaroid photos (large screens) */}
      {covers.slice(0, 3).map((c, i) => (
        <motion.div
          key={c.src}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: spots[i].delay },
            y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{ rotate: spots[i].rotate }}
          className={`absolute z-0 hidden xl:block ${spots[i].pos}`}
        >
          <div className="relative w-44 rounded-md bg-white p-2.5 pb-9 shadow-2xl shadow-black/40 2xl:w-52">
            <span className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-3 bg-amber-200/80" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.src} alt={c.title} className="aspect-[4/5] w-full object-cover" />
            <span className="absolute inset-x-2 bottom-2.5 truncate text-center text-xs font-bold text-slate-500">
              {c.title}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-100 shadow-lg backdrop-blur-md sm:text-sm">
            <Camera size={15} className="text-red-300" />
            Moments &amp; Memories
          </div>

          <h1 className="mt-7 text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            School
            <span className="block bg-gradient-to-r from-red-400 via-rose-300 to-blue-300 bg-clip-text pb-2 text-transparent">
              Gallery
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            Celebrations, classrooms and everything in between. Explore the
            moments that make Bright Bal Public School special.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            {items.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-3 backdrop-blur-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-red-300">
                  <Icon size={19} />
                </span>
                <div className="text-left">
                  <p className="text-xl font-black leading-none text-white">{value}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Wave into the page */}
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="absolute -bottom-px left-0 h-16 w-full sm:h-20"
        aria-hidden="true"
      >
        <path d="M0 90V45C200 5 420 0 720 35s520 40 720 5V90Z" fill="#f8fafc" />
      </svg>
    </section>
  );
}