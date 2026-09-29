"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  GraduationCap,

  CheckCircle2,
  Sparkles,
} from "lucide-react";

const supabase = createClient();

export default function Hero() {
  const [school, setSchool] = useState({
    school_name: "Bright Bal Public School",
    tagline: "English Medium School",
    logo_url: "",
    hero_title: "Where Young Minds Build Bright Futures",
    hero_subtitle:
      "Quality education, discipline and creativity from Nursery to Class VIII.",
    admission_open: true,
    admission_session: "2027-28",
    admission_banner: "🎓 Admissions Open for Session 2027-28",
  });

  useEffect(() => {
    fetchHeroSettings();
  }, []);

  async function fetchHeroSettings() {
    const { data } = await supabase
      .from("school_settings")
      .select("*")
      .single();

    if (data) {
      setSchool((prev) => ({
        ...prev,
        school_name: data.school_name || prev.school_name,
        tagline: data.tagline || prev.tagline,
        logo_url: data.logo_url || "",
        hero_title: data.hero_title || prev.hero_title,
        hero_subtitle: data.hero_subtitle || prev.hero_subtitle,
        admission_open: data.admission_open ?? true,
        admission_session: data.admission_session || prev.admission_session,
        admission_banner: data.admission_banner || prev.admission_banner,
      }));
    }
  }
  return (
    <section className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(254,226,226,0.95),_rgba(255,255,255,0.98)_28%,_rgba(255,255,255,1)_100%)] pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-[420px] w-[420px] rounded-full bg-red-300/25 blur-[120px]" />
        <div className="absolute right-0 top-20 h-[500px] w-[500px] rounded-full bg-yellow-200/35 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-[330px] w-[700px] -translate-x-1/2 rounded-full bg-red-100/70 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.2),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-bold shadow-sm backdrop-blur-sm ${
              school.admission_open
                ? "border-red-200 bg-white/80 text-red-700"
                : "border-slate-300 bg-slate-100 text-slate-600"
            }`}
          >
            <Sparkles size={16} />
            {school.admission_open ? school.admission_banner : "🚫 Admissions Closed"}
          </div>

          <h1 className="mt-7 max-w-xl text-5xl font-black tracking-[-0.06em] text-slate-900 sm:text-6xl lg:text-7xl">
            {school.hero_title || "Where Young Minds Build Bright Futures"}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
            Welcome to <span className="font-bold text-red-700">{school.school_name}</span>, {school.hero_subtitle}
          </p>

         <div className="mt-8 w-full space-y-3">
  {[
    "English Medium",
    "Nursery to Class VIII",
    "Holistic Development",
  ].map((item) => (
    <div
      key={item}
      className="box-border flex w-full max-w-full items-center gap-2 overflow-hidden rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold leading-5 text-slate-700 shadow-sm sm:w-fit sm:text-sm"
    >
      <CheckCircle2
        size={18}
        className="shrink-0 flex-none text-red-600"
      />

      <span className="min-w-0 flex-1 break-words whitespace-normal">
        {item}
      </span>
    </div>
  ))}
</div>

          <div className="mt-10 flex flex-wrap gap-4">
            {school.admission_open ? (
              <Link
                href="/admissions"
                className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-800 to-red-600 px-8 py-4 font-bold text-white shadow-xl shadow-red-600/20 transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                Apply for Admission
                <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </Link>
            ) : (
              <button
                disabled
                className="cursor-not-allowed rounded-2xl bg-slate-400 px-8 py-4 font-bold text-white"
              >
                Admissions Closed
              </button>
            )}

            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-8 py-4 font-bold text-slate-800 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-red-300 hover:text-red-700"
            >
              Explore School
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-4 rotate-2 rounded-[2.5rem] bg-gradient-to-br from-red-700 to-red-400 opacity-10" />

          <div className="relative overflow-hidden rounded-[2.2rem] border-4 border-white bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
            <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[570px]">
              <Image
                src="/images/school-building.jpg.jpeg"
                alt="School Building"
                fill
                priority
                className="object-cover transition duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                <div className="mb-3 flex items-center gap-3">
                  <div className="overflow-hidden rounded-full border border-white bg-white shadow-lg">
                    <Image
                      src={
                        school.logo_url
                          ? `${school.logo_url}?v=${Date.now()}`
                          : "/logo/logo.png.png"
                      }
                      alt="School Logo"
                      width={42}
                      height={42}
                      className="h-10 w-10 object-cover"
                      unoptimized
                    />
                  </div>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-red-100">
                      Welcome to
                    </p>
                    <p className="text-lg font-bold">{school.school_name}</p>
                  </div>
                </div>

                <p className="text-sm text-white/80">{school.tagline}</p>
              </div>
            </div>
          </div>

<motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.6 }}
  className="absolute right-5 top-5 z-20 rounded-2xl border border-slate-100 bg-white/95 p-4 shadow-2xl backdrop-blur-md sm:right-6 sm:top-6 sm:p-5"
>
  <div className="flex items-center gap-4">
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-700">
      <GraduationCap size={26} />
    </div>

    <div>
      <p className="text-sm text-slate-500">Session</p>
      <p className="font-bold text-slate-900">
        {school.admission_session}
      </p>
    </div>
  </div>
</motion.div>
        </motion.div>
      </div>
    </section>
  );
}