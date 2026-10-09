import { createClient } from "@/lib/supabase/server";
import Gallery from "@/components/home/Gallery";
import {
  Images,
  Camera,
  Sparkles,
  ArrowDown,
  Image as ImageIcon,
  Heart,
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
    <main className="overflow-hidden bg-white dark:bg-slate-950">

      {/* PREMIUM GALLERY HERO */}
      <section className="relative isolate overflow-hidden bg-[#101B33] text-white">

        {/* Background gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(198,40,40,0.35),transparent_48%),radial-gradient(ellipse_at_bottom_right,rgba(21,101,192,0.32),transparent_45%)]" />

        <div className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        {/* Decorative circles */}
        <div className="absolute right-[12%] top-24 -z-10 h-28 w-28 rounded-full border border-white/10" />

        <div className="absolute right-[15%] top-28 -z-10 h-20 w-20 rounded-full border border-red-400/20" />

        <div className="absolute bottom-16 left-[8%] -z-10 h-16 w-16 rounded-2xl border border-blue-300/20 rotate-12" />

        <div className="mx-auto grid min-h-[540px] max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.15fr_0.85fr] md:px-10 lg:py-24">

          {/* Hero content */}
          <div className="relative z-10 text-center md:text-left">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2 text-sm font-semibold text-blue-100 shadow-lg shadow-black/10 backdrop-blur-xl">
              <Sparkles size={16} className="text-yellow-300" />
              Life at Bright Bal
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
            </div>

            <h1 className="mt-7 text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-7xl">
              Every Picture
              <br />
              Tells a
              <span className="mt-2 block bg-gradient-to-r from-red-400 via-red-300 to-blue-300 bg-clip-text text-transparent">
                Beautiful Story.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg md:mx-0">
              From curious classroom moments to joyful celebrations,
              explore the memories, achievements and everyday magic
              that make Bright Bal Public School special.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">

              <a
                href="#school-gallery"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#C62828] px-6 py-4 font-bold text-white shadow-lg shadow-red-950/25 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1565C0] hover:shadow-blue-950/30"
              >
                <Camera size={19} />
                Explore Gallery
                <ArrowDown
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-y-1"
                />
              </a>

              <div className="inline-flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-5 py-3.5 backdrop-blur-md">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
                  <Images size={21} />
                </div>

                <div>
                  <p className="text-xl font-extrabold">
                    {galleryImages.length}
                  </p>
                  <p className="text-xs font-medium text-slate-400">
                    Gallery Photos
                  </p>
                </div>

              </div>

            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400 md:justify-start">

              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Learning
              </span>

              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Creativity
              </span>

              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-300" />
                Celebrations
              </span>

            </div>

          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">

            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-red-500/20 to-blue-500/20 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/15 bg-white/[0.07] p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">

              <div className="relative flex min-h-[330px] flex-col items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#1C2D4D] via-[#172641] to-[#10203D] px-6 py-12 text-center sm:min-h-[390px]">

                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-500/15 blur-2xl" />

                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/15 bg-white/10 shadow-xl shadow-black/10">
                  <ImageIcon
                    size={43}
                    strokeWidth={1.5}
                    className="text-blue-200"
                  />

                  <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-xl bg-[#C62828] text-white shadow-lg">
                    <Heart size={17} fill="currentColor" />
                  </span>
                </div>

                <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.3em] text-red-300">
                  Moments to Remember
                </p>

                <h2 className="relative mt-3 max-w-sm text-3xl font-extrabold leading-tight sm:text-4xl">
                  Small Moments.
                  <span className="mt-1 block text-blue-200">
                    Big Memories.
                  </span>
                </h2>

                <p className="relative mt-4 max-w-xs text-sm leading-6 text-slate-400">
                  Every day brings something worth remembering.
                </p>

                <div className="relative mt-8 flex items-center gap-2">
                  <span className="h-1.5 w-8 rounded-full bg-red-500" />
                  <span className="h-1.5 w-4 rounded-full bg-blue-400" />
                  <span className="h-1.5 w-4 rounded-full bg-white/30" />
                </div>

              </div>

            </div>

            {/* Floating label */}
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-slate-900 shadow-xl sm:left-8">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C62828]">
                <Sparkles size={22} />
              </div>

              <div>
                <p className="text-sm font-extrabold">
                  Memories That Matter
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Bright Bal Public School
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom transition */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C62828] via-white/30 to-[#1565C0]" />

      </section>

            {/* GALLERY COLLECTION */}
      <section
        id="school-gallery"
        className="relative bg-slate-50 py-20 dark:bg-slate-950 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10">

          {/* Section heading */}
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-[#C62828] dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400">
                <Images size={17} />
                Our Photo Collection
              </div>

              <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight text-[#101B33] dark:text-white sm:text-4xl md:text-5xl">
                Moments That Tell
                <span className="mt-1 block text-[#C62828] dark:text-red-400">
                  Our Story
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-400">
                Every photograph captures a little piece of our school
                journey, from classroom discoveries to celebrations,
                friendships and achievements.
              </p>

            </div>

            <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0] dark:bg-blue-950/50 dark:text-blue-400">
                <Camera size={23} />
              </div>

              <div>
                <p className="text-2xl font-black text-[#101B33] dark:text-white">
                  {galleryImages.length}
                </p>

                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Memories captured
                </p>
              </div>

            </div>

          </div>

          {/* Gallery content */}
          {error ? (

            <div className="rounded-3xl border border-red-200 bg-white px-6 py-16 text-center shadow-sm dark:border-red-900/40 dark:bg-slate-900">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#C62828] dark:bg-red-950/40 dark:text-red-400">
                <Images size={30} />
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-900 dark:text-white">
                Unable to Load Gallery
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">
                We could not load the school photographs right now.
                Please try again later.
              </p>

            </div>

          ) : galleryImages.length === 0 ? (

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white px-6 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:py-24">

              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-red-100/70 blur-3xl dark:bg-red-950/20" />

              <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-blue-100/70 blur-3xl dark:bg-blue-950/20" />

              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-50 to-blue-50 text-[#C62828] ring-1 ring-slate-200 dark:from-red-950/40 dark:to-blue-950/40 dark:ring-slate-700">
                <Images size={37} strokeWidth={1.5} />
              </div>

              <p className="relative mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#1565C0] dark:text-blue-400">
                Coming Soon
              </p>

              <h3 className="relative mt-3 text-2xl font-black text-[#101B33] dark:text-white sm:text-3xl">
                Beautiful Memories Are on Their Way
              </h3>

              <p className="relative mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
                Our gallery is waiting for its first collection of
                school memories. Photographs will appear here once
                they have been uploaded.
              </p>

              <div className="relative mx-auto mt-7 flex items-center justify-center gap-2">
                <span className="h-1.5 w-8 rounded-full bg-[#C62828]" />
                <span className="h-1.5 w-5 rounded-full bg-[#1565C0]" />
                <span className="h-1.5 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
              </div>

            </div>

          ) : (

            <div className="rounded-[2rem] border border-slate-200/80 bg-white p-3 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/10 sm:p-5">

              <Gallery images={galleryImages} />

            </div>

          )}

          {/* Bottom note */}
          {galleryImages.length > 0 && !error && (
            <div className="mt-8 flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3">

              <Heart
                size={16}
                className="text-[#C62828]"
                fill="currentColor"
              />

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Every memory is a part of the Bright Bal story.
              </p>

            </div>
          )}

        </div>
      </section>

      {/* BOTTOM ACCENT */}
      <div className="h-1 w-full bg-gradient-to-r from-[#C62828] via-slate-200 to-[#1565C0] dark:via-slate-800" />

    </main>
  );
}

