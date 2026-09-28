"use client";
import { GraduationCap, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function AdmissionHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-500 py-24">

      {/* Background */}

      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 text-center text-white">

        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-2 backdrop-blur">

          <GraduationCap size={18} />

          <span className="font-semibold">
            Admissions Open • Session 2026-27
          </span>

        </div>

        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight md:text-6xl">

          Build Your Child's
          <span className="block text-yellow-300">
            Bright Future
          </span>

        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-red-100">

          Join Bright Bal Public School and provide your child with quality
          education, experienced teachers, modern classrooms and an inspiring
          environment for academic excellence.

        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">

        <button
  type="button"
  onClick={() => {
    const element = document.getElementById("admission-form");

    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        80; // Header ki height ke hisaab se adjust kar lena

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }}
  className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-red-700 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
>
  Apply Now
  <ArrowRight size={18} />
</button>

         

          <Link
            href="/contact"
            className="rounded-2xl border border-white/40 px-8 py-4 font-semibold transition hover:bg-white/10"
          >
            Contact School
          </Link>

        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

            <CheckCircle className="mx-auto text-green-300" />

            <h3 className="mt-3 text-xl font-bold">
              Experienced Faculty
            </h3>

            <p className="mt-2 text-red-100">
              Dedicated teachers focused on every student's growth.
            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

            <CheckCircle className="mx-auto text-green-300" />

            <h3 className="mt-3 text-xl font-bold">
              Smart Classrooms
            </h3>

            <p className="mt-2 text-red-100">
              Interactive learning with modern teaching methods.
            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

            <CheckCircle className="mx-auto text-green-300" />

            <h3 className="mt-3 text-xl font-bold">
              Sports & Activities
            </h3>

            <p className="mt-2 text-red-100">
              Overall development through sports and extracurricular activities.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}