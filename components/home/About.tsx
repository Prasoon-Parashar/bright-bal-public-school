"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Trophy,
  Heart,
  Sparkles,
} from "lucide-react";

const supabase = createClient();

export default function About() {
  const [school, setSchool] = useState({
    school_name: "Bright Bal Public School",
    tagline: "English Medium School",
    about_title: "Building Strong Foundations for a Brighter Future",
    about_subtitle:
      "A nurturing learning environment where education and values grow together.",
    about_description:
      "Bright Bal Public School provides quality education, discipline and creativity from Nursery to Class VIII.",
    about_image: "",
  });

  useEffect(() => {
    fetchAbout();
  }, []);

  async function fetchAbout() {
    const { data } = await supabase.from("school_settings").select("*").single();

    if (data) {
      setSchool((prev) => ({ ...prev, ...data }));
    }
  }

  const features = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      text: "Strong academic foundations with student-focused learning.",
    },
    {
      icon: Heart,
      title: "Values & Discipline",
      text: "Building respectful, responsible and confident individuals.",
    },
    {
      icon: Trophy,
      title: "Overall Development",
      text: "Equal focus on academics, sports, creativity and activities.",
    },
  ];

  return (
    <AnimatedSection>
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(254,226,226,0.92),_rgba(255,255,255,0.96)_35%,_rgba(255,255,255,1)_100%)] py-24 text-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-red-200/60 blur-3xl" />
          <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-amber-200/60 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-red-100/80 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/80 px-5 py-2.5 text-sm font-bold text-red-700 shadow-sm backdrop-blur-sm">
              <Sparkles size={16} />
              Discover {school.school_name}
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
              About Our <span className="text-red-700">School</span>
            </h2>

           <p className="mt-5 text-lg leading-8 text-slate-600 md:text-xl">
              {school.about_subtitle}
            </p>
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative">
              <div className="absolute -inset-5 -rotate-3 rounded-[2.5rem] bg-gradient-to-br from-red-700 via-red-500 to-yellow-300 opacity-15 blur-sm" />

              <div className="relative overflow-hidden rounded-[2.1rem] border border-white/70 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
                <div className="relative h-[490px] overflow-hidden rounded-[1.7rem]">
                  <Image
                    src={
                      school.about_image
                        ? school.about_image
                        : "/images/school-building.jpg.jpeg"
                    }
                    alt="School"
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                    unoptimized
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-100 backdrop-blur-sm">
                      <GraduationCap size={14} />
                      Since 2000
                    </div>

                    <h3 className="text-3xl font-extrabold tracking-tight">
                      {school.school_name}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 md:text-base">
                      {school.tagline}
                    </p>
                  </div>
                </div>
              </div>

             <div className="absolute right-5 top-5 z-20 rounded-2xl border border-slate-100 bg-white/95 p-3 shadow-2xl backdrop-blur-md sm:right-6 sm:top-6 sm:p-4">
  <div className="flex items-center gap-3 sm:gap-4">
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700 sm:h-12 sm:w-12 sm:rounded-2xl">
      <GraduationCap size={22} />
    </div>

    <div>
      <p className="text-base font-black leading-tight text-slate-900 sm:text-lg">
        Nursery to VIII
      </p>

      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
        English Medium School
      </p>
    </div>
  </div>
</div>
            </div>

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-700">
                <span className="h-2 w-2 rounded-full bg-red-600" />
                Welcome to {school.school_name}
              </div>

              <h3 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl xl:text-5xl">
                {school.about_title}
              </h3>

              <p className="mt-6 whitespace-pre-line text-base leading-8 text-slate-600 md:text-lg">
                {school.about_description}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Experienced Teachers",
                  "Student-Focused Learning",
                  "Safe Environment",
                  "Sports & Activities",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 font-semibold text-slate-700 shadow-sm"
                  >
                    <CheckCircle2 size={18} className="text-red-600" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/about"
                  className="rounded-2xl bg-gradient-to-r from-red-700 to-red-600 px-7 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  Learn More
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-2 rounded-2xl border-2 border-red-200 bg-white px-7 py-4 font-bold text-red-700 transition hover:-translate-y-0.5 hover:border-red-700 hover:bg-red-700 hover:text-white"
                >
                  Contact Us
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-24 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-[1.75rem] border border-slate-200 bg-white/80 p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm transition duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-[0_20px_60px_rgba(185,28,28,0.14)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-red-100 to-amber-50 text-red-700 shadow-inner">
                    <Icon size={26} />
                  </div>

                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-slate-600">
                    {feature.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}