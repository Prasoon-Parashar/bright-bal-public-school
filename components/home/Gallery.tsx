"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import {
  Images,
  Eye,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Camera,
  Star,
  BookOpen,
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
    <section className="relative overflow-hidden bg-[#f8faf9] py-20 sm:py-24 lg:py-28">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-green-100/70 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-red-100/60 blur-[120px]" />

        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-yellow-100/50 blur-[120px]" />

        {/* Dotted pattern */}

        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(#0aa84f 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

      </div>

      {/* =====================================================
          FLOATING DECORATIONS
      ====================================================== */}

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[5%] top-28 hidden text-[#0aa84f]/20 md:block"
      >
        <BookOpen size={55} strokeWidth={1.4} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[6%] top-32 hidden text-yellow-500/30 md:block"
      >
        <Star size={38} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-32 left-[8%] hidden text-red-400/20 md:block"
      >
        <Camera size={42} strokeWidth={1.5} />
      </motion.div>

      {/* =====================================================
          CONTAINER
      ====================================================== */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">

        {/* ===================================================
            HEADING
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-green-200
              bg-white
              px-5
              py-2.5
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#078a43]
              shadow-sm
              sm:text-sm
            "
          >
            <Sparkles size={16} />
            Life at Bright Bal
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Moments From Our
            <span className="text-[#078a43]"> School</span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            A glimpse into learning, celebrations, activities and memorable
            moments that make life at Bright Bal Public School special.
          </p>

          {/* Decorative divider */}

          <div className="mt-7 flex items-center justify-center gap-3">

            <span className="h-px w-12 bg-red-200" />

            <span className="h-2.5 w-2.5 rounded-full bg-[#0aa84f]" />

            <span className="h-px w-12 bg-red-200" />

          </div>

        </motion.div>

        {/* ===================================================
            EMPTY STATE
        ==================================================== */}

        {images.length === 0 ? (

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="
              relative
              mt-16
              overflow-hidden
              rounded-[2rem]
              border
              border-green-100
              bg-white
              p-10
              text-center
              shadow-[0_20px_60px_rgba(15,23,42,0.07)]
              sm:p-14
            "
          >

            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-100/60 blur-2xl" />

            <div className="relative">

              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-[#0aa84f]">
                <Images size={44} />
              </div>

              <h3 className="text-3xl font-black text-slate-900">
                Gallery is Empty
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
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
                    className="
                      rounded-full
                      border
                      border-green-100
                      bg-green-50
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-[#078a43]
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>

            </div>

          </motion.div>

        ) : (

          <>
            {/* =================================================
                GALLERY GRID
            ================================================== */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.12,
              }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className="mt-14 grid gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
            >

              {images.slice(0, 6).map((image, i) => (

                <motion.div
                  key={image.id}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 45,
                      scale: 0.96,
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut",
                      },
                    },
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  onClick={() => setIndex(i)}
                  className="
                    group
                    relative
                    h-[310px]
                    cursor-pointer
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-white
                    bg-white
                    p-1.5
                    shadow-[0_15px_45px_rgba(15,23,42,0.09)]
                    transition-shadow
                    duration-500
                    hover:shadow-[0_25px_65px_rgba(10,168,79,0.18)]
                    sm:h-80
                  "
                >

                  {/* Inner image wrapper */}

                  <div className="relative h-full overflow-hidden rounded-[1.65rem]">

                    <Image
                      src={image.image_url}
                      alt={image.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="
                        object-cover
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-110
                      "
                    />

                    {/* Dark overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-slate-950/90
                        via-slate-950/20
                        to-transparent
                        opacity-80
                        transition-opacity
                        duration-500
                        group-hover:opacity-95
                      "
                    />

                    {/* Green hover wash */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[#0aa84f]/10
                        opacity-0
                        transition-opacity
                        duration-500
                        group-hover:opacity-100
                      "
                    />

                    {/* Number */}

                    <div
                      className="
                        absolute
                        right-4
                        top-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/30
                        bg-black/20
                        text-xs
                        font-black
                        text-white
                        backdrop-blur-md
                      "
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Category */}

                    <div className="absolute left-5 top-5">

                      <span
                        className="
                          inline-flex
                          items-center
                          rounded-full
                          border
                          border-white/20
                          bg-black/25
                          px-3
                          py-1.5
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          text-white
                          backdrop-blur-md
                        "
                      >
                        {image.category || "School Gallery"}
                      </span>

                    </div>

                    {/* Bottom content */}

                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">

                      <h3 className="text-xl font-black text-white sm:text-2xl">
                        {image.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-xs font-medium text-green-200">
                        <CalendarDays size={15} />
                        Gallery Photo
                      </div>

                      {/* View button */}

                      <div
                        className="
                          mt-4
                          flex
                          items-center
                          justify-between
                        "
                      >

                        <span
                          className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-bold
                            uppercase
                            tracking-[0.12em]
                            text-white/80
                          "
                        >
                          <Eye size={15} />
                          View Photo
                        </span>

                        <span
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-slate-900
                            transition-all
                            duration-300
                            group-hover:bg-[#0aa84f]
                            group-hover:text-white
                            group-hover:rotate-[-10deg]
                          "
                        >
                          <ArrowRight size={16} />
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Bottom accent */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-1
                      w-full
                      origin-left
                      scale-x-0
                      bg-gradient-to-r
                      from-[#078a43]
                      via-[#0aa84f]
                      to-red-500
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    "
                  />

                </motion.div>

              ))}

            </motion.div>

            {/* =================================================
                FULL GALLERY BUTTON
            ================================================== */}

            {images.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-14 flex justify-center"
              >

                <Link
                  href="/gallery"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-[#078a43]
                    bg-[#078a43]
                    px-7
                    py-3.5
                    text-sm
                    font-bold
                    text-white
                    shadow-lg
                    shadow-green-700/15
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-red-600
                    hover:border-red-600
                    hover:shadow-red-500/20
                    sm:px-8
                    sm:py-4
                  "
                >
                  Explore Full Gallery

                  <ArrowRight
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </Link>

              </motion.div>
            )}

          </>
        )}

      </div>

      {/* =====================================================
          LIGHTBOX
      ====================================================== */}

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