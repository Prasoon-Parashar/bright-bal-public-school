import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

import {
  Camera,
  Images,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default async function GallerySection() {
  const supabase = await createClient();

  const { data: images, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  const galleryImages = images ?? [];

  return (
    <section
      id="gallery"
      className="relative isolate overflow-hidden bg-[#F8FAFC] py-20 sm:py-24 lg:py-28"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-red-100/70 blur-[100px]" />

        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-blue-100/70 blur-[110px]" />

        <div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage:
              "radial-gradient(#C62828 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#C62828] shadow-sm sm:text-sm">
            <Sparkles size={16} />
            Life at Bright Bal
          </div>

          <h2 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#101B33] sm:text-5xl lg:text-6xl">
            Moments From Our
            <span className="block bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] bg-clip-text text-transparent">
              School
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Every picture tells a story of learning, friendship,
            celebrations and unforgettable school memories.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-1 w-12 rounded-full bg-[#C62828]" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="h-1 w-12 rounded-full bg-[#1565C0]" />
          </div>
        </div>

        {/* Gallery status */}
        {error ? (
          <div className="mt-14 rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <p className="font-semibold text-[#C62828]">
              Gallery photos could not be loaded.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Please check the gallery database connection.
            </p>
          </div>
        ) : galleryImages.length === 0 ? (
          /* Empty state */
          <div className="relative mt-14 overflow-hidden rounded-[2rem] border border-red-100 bg-white px-6 py-14 text-center shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:px-12 sm:py-16">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-100/70 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-blue-100/70 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-lg shadow-red-500/20">
                <Images size={36} />
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#101B33] sm:text-3xl">
                Beautiful Memories Coming Soon
              </h3>

              <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
                Our gallery will showcase classroom activities, sports,
                celebrations and special moments from school life.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-2">
                {[
                  "Sports Day",
                  "Annual Function",
                  "Classroom Activities",
                  "School Celebrations",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-[#1565C0]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Gallery grid */}
            <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
              {galleryImages.map((img, index) => (
                <article
                  key={img.id}
                  className="group relative min-w-0 overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white p-2 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-[0_24px_55px_rgba(21,101,192,0.16)]"
                >
                  {/* Photo */}
                  <div className="relative h-64 overflow-hidden rounded-[1.3rem] bg-slate-100 sm:h-60 lg:h-64">
                    <Image
                      src={img.image_url}
                      alt={img.title || "Bright Bal Public School gallery"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101B33]/80 via-[#101B33]/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Image number */}
                    <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/90 text-xs font-black text-[#C62828] shadow-sm backdrop-blur-md">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Camera icon */}
                    <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-[#101B33]/30 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100">
                      <Camera size={19} />
                    </div>

                    {/* Title on image */}
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <div className="translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                        <span className="mb-2 inline-flex rounded-full bg-[#C62828] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                          School Memories
                        </span>

                        <h3 className="line-clamp-2 text-lg font-extrabold leading-snug text-white">
                          {img.title || "A Special School Moment"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="flex items-center justify-between gap-3 px-3 py-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#101B33] transition-colors duration-300 group-hover:text-[#1565C0]">
                        Bright Bal Public School
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Learning • Growing • Shining
                      </p>
                    </div>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#C62828] transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#1565C0] group-hover:text-white">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] transition-transform duration-500 group-hover:scale-x-100" />
                </article>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center text-sm text-slate-500">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#1565C0]">
                <Camera size={16} />
              </span>
              <p>
                Capturing little moments and creating lifelong memories.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
