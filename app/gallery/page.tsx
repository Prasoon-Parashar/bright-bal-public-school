import { createClient } from "@/lib/supabase/server";
import Gallery from "@/components/home/Gallery";
import {
  Images,
  Camera,
  Sparkles,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: images, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  const galleryImages = images ?? [];

  return (
    <main className="bg-white dark:bg-slate-950">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-red-500 py-24 text-white">

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">

            <Camera size={18} />

            School Memories

          </div>

          <h1 className="mt-7 text-5xl font-extrabold md:text-6xl">
            Explore Our
            <span className="block text-yellow-300">
              School Gallery
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-red-100">
            Discover memorable moments from academics, celebrations,
            sports, activities and everyday life at Bright Bal Public School.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
              <Images size={22} />

              <div className="text-left">
                <p className="text-2xl font-bold">
                  {galleryImages.length}
                </p>

                <p className="text-sm text-red-100">
                  Gallery Photos
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur">
              <Sparkles size={22} />

              <div className="text-left">
                <p className="font-bold">
                  School Life
                </p>

                <p className="text-sm text-red-100">
                  Memories & Moments
                </p>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* GALLERY AREA */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 text-center">

            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400">

              <Images size={17} />

              Photo Gallery

            </div>

            <h2 className="mt-5 text-4xl font-extrabold text-slate-900 dark:text-white">
              Moments That Tell
              <span className="text-red-700 dark:text-red-400">
                {" "}Our Story
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
              A glimpse into learning, creativity, celebrations and
              activities happening across our school.
            </p>

          </div>

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-10 text-center">
              <p className="font-semibold text-red-700">
                Unable to load gallery images.
              </p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-14 text-center shadow-lg dark:border-slate-800 dark:bg-slate-950">

              <Images
                size={55}
                className="mx-auto text-red-600"
              />

              <h3 className="mt-5 text-2xl font-bold text-slate-900 dark:text-white">
                Gallery Coming Soon
              </h3>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                School photos will appear here once uploaded.
              </p>

            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-950">

              <Gallery images={galleryImages} />

            </div>
          )}

        </div>

      </section>

    </main>
  );
}