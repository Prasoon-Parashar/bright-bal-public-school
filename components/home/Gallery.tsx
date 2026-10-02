"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Images,
  Eye,
  ArrowRight,
  Sparkles,
  CalendarDays,
} from "lucide-react";

interface GalleryImage {
  id: number;
  title: string;
  image_url: string;
  category?: string;
}

export default function Gallery({
  images,
}: {
  images: GalleryImage[];
}) {
  const [index, setIndex] = useState(-1);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-yellow-50 py-24">
      {/* Background Blur */}
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-red-200/30 blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-yellow-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-5 py-2 font-semibold text-red-700 shadow-sm">
            <Sparkles size={16} />
            Life at Bright Bal
          </div>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900 md:text-6xl">
            Moments From Our
            <span className="text-red-700"> School</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            A glimpse into learning, celebrations, activities and memorable
            moments that make life at Bright Bal Public School special.
          </p>
        </div>

        {/* EMPTY STATE */}
        {images.length === 0 ? (
          <div className="mt-16 rounded-[36px] border border-red-200 bg-white p-14 text-center shadow-xl">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <Images size={44} className="text-red-600" />
            </div>

            <h3 className="text-3xl font-bold text-slate-900">
              Gallery is Empty
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              Photos uploaded from the Admin Panel will automatically appear
              here.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                "Sports Day",
                "Annual Day",
                "Janmashtami",
                "Classroom",
                "Celebration",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* GALLERY GRID */}
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {images.slice(0, 6).map((image, i) => (
                <div
                  key={image.id}
                  onClick={() => setIndex(i)}
                  className="group relative h-80 cursor-pointer overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                >
                 <Image
  src={image.image_url}
  alt={image.title}
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  className="object-cover transition duration-700 group-hover:scale-110"
/>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition group-hover:opacity-100" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="mb-3 inline-block rounded-full bg-red-600/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                      {image.category || "School Gallery"}
                    </span>

                    <h3 className="text-xl font-bold">{image.title}</h3>

                    <div className="mt-2 flex items-center gap-2 text-sm text-red-200">
                      <CalendarDays size={16} />
                      Gallery Photo
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm font-medium text-white/90">
                      <Eye size={16} />
                      Click to View
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTON ONLY IF MORE THAN 6 IMAGES */}
            {images.length > 6 && (
              <div className="mt-14 flex justify-center">
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-700 to-red-500 px-8 py-4 font-semibold text-white shadow-lg transition duration-300 hover:scale-105 hover:shadow-red-300"
                >
                  Explore Full Gallery
                  <ArrowRight size={20} />
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={images.map((img) => ({
          src: img.image_url,
        }))}
      />
    </section>
  );
}