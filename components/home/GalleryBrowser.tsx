"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Camera, ChevronLeft, ChevronRight, Images, Maximize2, X } from "lucide-react";
import { categoriesOf, groupCollections, type GalleryRow } from "@/lib/gallery";

/* One colour per category (full class names so Tailwind keeps them) */
const palette = [
  { text: "text-[#C62828]", dot: "bg-[#C62828]", chip: "bg-red-50 text-[#C62828]" },
  { text: "text-[#1565C0]", dot: "bg-[#1565C0]", chip: "bg-blue-50 text-[#1565C0]" },
  { text: "text-amber-600", dot: "bg-amber-500", chip: "bg-amber-50 text-amber-700" },
  { text: "text-emerald-600", dot: "bg-emerald-500", chip: "bg-emerald-50 text-emerald-700" },
  { text: "text-purple-600", dot: "bg-purple-500", chip: "bg-purple-50 text-purple-700" },
];

export default function GalleryBrowser({ rows }: { rows: GalleryRow[] }) {
  const collections = useMemo(() => groupCollections(rows), [rows]);
  const categories = useMemo(() => categoriesOf(collections), [collections]);

  const [filter, setFilter] = useState("all");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [viewer, setViewer] = useState<number | null>(null);

  const toneOf = (category: string) => {
    const i = categories.findIndex((c) => c.key === category.toLowerCase());
    return palette[(i < 0 ? 0 : i) % palette.length];
  };

  const visible =
    filter === "all" ? collections : collections.filter((c) => c.category.toLowerCase() === filter);

  const active = collections.find((c) => c.key === openKey) ?? null;
  const total = active?.photos.length ?? 0;

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (viewer !== null) setViewer(null);
        else setOpenKey(null);
      }
      if (viewer !== null && e.key === "ArrowRight") setViewer((v) => (v === null ? v : (v + 1) % total));
      if (viewer !== null && e.key === "ArrowLeft") setViewer((v) => (v === null ? v : (v - 1 + total) % total));
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, viewer, total]);

  if (collections.length === 0) {
    return (
      <div className="mx-auto mt-6 max-w-xl rounded-[2rem] border border-dashed border-slate-300 bg-white p-14 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C62828]">
          <Camera size={30} />
        </span>
        <p className="mt-5 text-lg font-bold text-[#101B33]">Photos coming soon</p>
        <p className="mt-1 text-slate-500">Our gallery will be filled with school moments very soon.</p>
      </div>
    );
  }

  const tabs = [{ key: "all", name: "All", count: collections.length }, ...categories];

  return (
    <>
      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-24 z-30 flex justify-center">
        <div className="flex max-w-full gap-1.5 overflow-x-auto rounded-full border border-slate-200 bg-white/85 p-1.5 shadow-lg shadow-slate-900/5 backdrop-blur-xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const on = filter === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setFilter(t.key)}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  on ? "text-white" : "text-slate-600 hover:text-[#C62828]"
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="gallery-pill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#C62828] to-[#E53935] shadow-md shadow-red-500/30"
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {t.name}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] leading-none ${
                      on ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {t.count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= COLLECTIONS ================= */}
      <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((c, i) => {
            const tone = toneOf(c.category);
            return (
              <motion.div
                layout
                key={c.key}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.45, delay: Math.min(i, 8) * 0.05 }}
                className="group relative"
              >
                {/* stacked-photos effect */}
                {c.photos.length > 1 && (
                  <>
                    <div className="absolute inset-0 translate-y-2 rotate-[3deg] rounded-[1.75rem] border border-slate-200 bg-white shadow-md transition-transform duration-500 group-hover:rotate-[5deg]" />
                    <div className="absolute inset-0 translate-y-1 -rotate-[2.5deg] rounded-[1.75rem] border border-slate-200 bg-slate-100 shadow-md transition-transform duration-500 group-hover:-rotate-[4deg]" />
                  </>
                )}

                <button
                  type="button"
                  onClick={() => setOpenKey(c.key)}
                  className="relative block aspect-[4/3] w-full overflow-hidden rounded-[1.75rem] bg-slate-200 text-left shadow-[0_25px_60px_-25px_rgba(16,27,51,0.6)] transition-transform duration-500 group-hover:-translate-y-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.cover}
                    alt={c.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101B33]/95 via-[#101B33]/25 to-transparent" />
                  {/* shine */}
                  <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

                  <span
                    className={`absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider shadow ${tone.text}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${tone.dot}`} />
                    {c.category}
                  </span>
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                    <Images size={13} /> {c.photos.length}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="text-xl font-black leading-tight text-white">{c.title}</h3>
                    {c.description && (
                      <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-white/80">{c.description}</p>
                    )}
                    <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-white backdrop-blur transition group-hover:bg-white group-hover:text-[#C62828]">
                      View photos <ArrowUpRight size={14} />
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ================= COLLECTION POPUP ================= */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[#0b1226]/80 p-3 backdrop-blur-md sm:p-8"
            onClick={() => setOpenKey(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative my-auto w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0]" />

              <div className="p-5 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider ${toneOf(active.category).chip}`}
                    >
                      <span className={`h-2 w-2 rounded-full ${toneOf(active.category).dot}`} />
                      {active.category}
                    </span>
                    <h2 className="mt-3 text-2xl font-black text-[#101B33] sm:text-4xl">{active.title}</h2>
                    {active.description && (
                      <p className="mt-2 max-w-3xl leading-relaxed text-slate-600">{active.description}</p>
                    )}
                    <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400">
                      <Images size={15} /> {total} photo{total === 1 ? "" : "s"}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setOpenKey(null)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:rotate-90 hover:bg-[#C62828] hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* masonry */}
                <div className="mt-7 columns-2 gap-3 sm:columns-3 lg:columns-4">
                  {active.photos.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setViewer(i)}
                      className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-slate-100"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image_url}
                        alt={`${active.title} ${i + 1}`}
                        loading="lazy"
                        className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-[#101B33]/0 opacity-0 transition group-hover:bg-[#101B33]/40 group-hover:opacity-100">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#C62828] shadow-lg">
                          <Maximize2 size={18} />
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= LIGHTBOX ================= */}
      <AnimatePresence>
        {active && viewer !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/95 p-4"
            onClick={() => setViewer(null)}
          >
            <motion.img
              key={viewer}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={active.photos[viewer].image_url}
              alt={`${active.title} ${viewer + 1}`}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="mt-5 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-lg font-extrabold text-white">{active.title}</p>
              <p className="mt-1 text-sm font-semibold text-white/60">
                {viewer + 1} / {total} • {active.category}
              </p>
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={() => setViewer(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
            >
              <X size={22} />
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewer((viewer - 1 + total) % total);
                  }}
                  className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  <ChevronLeft size={26} />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={(e) => {
                    e.stopPropagation();
                    setViewer((viewer + 1) % total);
                  }}
                  className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25"
                >
                  <ChevronRight size={26} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}