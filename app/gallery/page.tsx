import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import GalleryHero from "@/components/home/GalleryHero";
import GalleryBrowser from "@/components/home/GalleryBrowser";
import { categoriesOf, groupCollections, type GalleryRow } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Gallery | Bright Bal Public School",
  description: "Photo collections of events, activities and classroom moments at Bright Bal Public School.",
};

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("gallery")
    .select("id,title,image_url,category,description,created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as GalleryRow[];
  const collections = groupCollections(rows);

  const covers = collections.slice(0, 3).map((c) => ({ src: c.cover, title: c.title }));
  const stats = {
    collections: collections.length,
    photos: rows.length,
    categories: categoriesOf(collections).length,
  };

  return (
    <main className="bg-slate-50">
      <GalleryHero covers={covers} stats={stats} />

      {/* overflow-x-clip (not hidden) so the sticky filter bar keeps working */}
      <section className="relative overflow-x-clip pb-24 pt-2">
        <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-[55%] h-72 w-72 rounded-full bg-blue-100/70 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <GalleryBrowser rows={rows} />

          {/* Closing call-to-action */}
          <div className="relative mt-24 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#101B33] via-[#182844] to-[#0D47A1] p-8 text-center shadow-2xl sm:p-14">
            <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-red-500/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-blue-400/25 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-300">Come, say hello</p>
              <h2 className="mx-auto mt-3 max-w-2xl text-3xl font-black text-white sm:text-4xl">
                Want to see our school <span className="text-[#ff8a80]">in person?</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-300">
                Visit our campus, meet our teachers and see why children love learning here.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#C62828] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/30 transition hover:-translate-y-0.5 hover:bg-[#E53935]"
                >
                  <CalendarCheck size={17} />
                  Plan a Campus Visit
                </Link>
                <Link
                  href="/admissions"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-[#101B33]"
                >
                  Apply for Admission
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}