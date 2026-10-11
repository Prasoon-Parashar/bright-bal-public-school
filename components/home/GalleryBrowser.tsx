"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { categoriesOf, groupCollections, type GalleryRow } from "@/lib/gallery";

export default function GalleryBrowser({ rows }: { rows: GalleryRow[] }) {
  const collections = useMemo(() => groupCollections(rows), [rows]);
  const categories = useMemo(() => categoriesOf(collections), [collections]);

  const [filter, setFilter] = useState("all");
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [viewer, setViewer] = useState<number | null>(null);

  const visible =
    filter === "all"
      ? collections
      : collections.filter((c) => c.category.toLowerCase() === filter);

  const active = collections.find((c) => c.key === openKey) ?? null;
  const total = active?.photos.length ?? 0;

  /* Keyboard + page scroll lock while a collection is open */
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
      <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-14 text-center text-slate-500">
        Photos will appear here soon.
      </div>
    );
  }

  return (
    <>
      {/* ================= FILTER ================= */}
      <div className="mt-10 flex flex-wrap justify-center gap-2.5">
        {[{ key: "all", name: "All", count: collections.length }, ...categories].map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
              filter === c.key
                ? "bg-[#C62828] text-white shadow-lg shadow-red-500/25"
                : "border border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-[#C62828]"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* ================= COLLECTIONS ================= */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setOpenKey(c.key)}
            className="group relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-slate-200 text-left shadow-[0_20px_50px_-25px_rgba(16,27,51,0.5)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.cover}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#101B33]/90 via-[#101B33]/20 to-transparent" />

            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#C62828] shadow">
              {c.category}
            </span>
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-white backdrop-blur">
              <Images size={13} /> {c.photos.length}
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="text-xl font-black leading-tight text-white">{c.title}</h3>
              {c.description && (
                <p className="mt-1 line-clamp-2 text-sm leading-snug text-white/80">{c.description}</p>
              )}
              <p className="mt-1 text-sm font-semibold text-white/75 transition group-hover:text-white">
                View photos →
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ================= COLLECTION POPUP ================= */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setOpenKey(null)}
        >
          <div
            className="relative my-auto w-full max-w-6xl rounded-[2rem] bg-white p-5 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#C62828]">
                  {active.category}
                </span>
                <h2 className="mt-3 text-2xl font-black text-[#101B33] sm:text-3xl">{active.title}</h2>
                {active.description && (
                  <p className="mt-2 max-w-3xl leading-relaxed text-slate-600">{active.description}</p>
                )}
                <p className="mt-2 text-sm text-slate-400">{total} photo(s)</p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpenKey(null)}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-[#C62828] hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {active.photos.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setViewer(i)}
                  className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image_url}
                    alt={`${active.title} ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= LIGHTBOX ================= */}
      {active && viewer !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setViewer(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.photos[viewer].image_url}
            alt={`${active.title} ${viewer + 1}`}
            className="max-h-[88vh] max-w-full rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            type="button"
            aria-label="Close"
            onClick={() => setViewer(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
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
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
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
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25"
              >
                <ChevronRight size={26} />
              </button>
            </>
          )}

          <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
            {viewer + 1} / {total}
          </span>
        </div>
      )}
    </>
  );
}