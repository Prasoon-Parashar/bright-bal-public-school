"use client";

import Image from "next/image";
import {
  Quote,
  Heart,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function PrincipalMessage() {
  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background */}
      <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-red-100/60 blur-[150px]" />
      <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-yellow-100/60 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-700">
            <Sparkles size={17} />
            From Our Leadership
          </div>

          <h2 className="mt-6 text-4xl font-extrabold text-slate-900 md:text-5xl">
            Principal's <span className="text-red-700">Message</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Guiding every student with knowledge, discipline, confidence and
            values for a successful future.
          </p>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">

          {/* ================= LEFT SIDE ================= */}
          <div className="relative mx-auto w-full max-w-md">

            <div className="absolute -inset-4 -rotate-3 rounded-[2.5rem] bg-gradient-to-br from-red-700 to-red-400 opacity-10" />

            <div className="overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-2xl">

              {/* Image */}
              <div className="h-full w-full object-cover object-top">
               <Image
  src="/images/principal-swati.jpeg"
  alt="Principal"
  fill
  className="object-cover"
/>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badge */}
                <div className="absolute bottom-5 left-5 z-20 rounded-full border border-white/70 bg-white/95 px-4 py-2 shadow-lg backdrop-blur-md sm:bottom-6 sm:left-6">
                  <div className="flex items-center gap-2"></div>
                  <GraduationCap size={14}
                   className="text-red-600" />
                   <span className="text-sm font-bold text-red-700">
      School Leadership
    </span>
  </div>
</div>

              {/* Principal Info BELOW IMAGE */}
              <div className="bg-white px-6 py-6 text-center">
                <h3 className="text-3xl font-extrabold text-slate-900">
                  Swati Shukla
                </h3>

                <p className="mt-2 text-lg font-semibold text-red-700">
                  Principal
                </p>

                <p className="mt-1 text-slate-600">
                  Bright Bal Public School
                </p>

                <div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
                  <MapPin size={16} className="text-red-600" />
                  Agra, Uttar Pradesh
                </div>
              </div>
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-6 left-1/2 w-[260px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-700">
                  <Heart size={22} />
                </div>

                <div>
                  <p className="font-bold text-slate-900">
                    Every Child Matters
                  </p>

                  <p className="text-xs text-slate-500">
                    Learn • Grow • Succeed
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 to-red-500 text-white shadow-lg">
              <Quote size={30} />
            </div>

            <blockquote className="mt-7 text-2xl font-semibold italic leading-10 text-slate-800 md:text-3xl md:leading-[1.5]">
              “Education is not only about academic excellence. It is about
              developing
              <span className="text-red-700">
                {" "}confidence, discipline, compassion and leadership.
              </span>”
            </blockquote>

            <div className="mt-8 h-1 w-20 rounded-full bg-gradient-to-r from-red-700 to-red-400" />

            <p className="mt-8 text-lg leading-8 text-slate-600">
              At Bright Bal Public School, we strive to create a nurturing and
              inspiring environment where every child feels valued, supported and
              encouraged to discover their unique potential.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our responsibility extends beyond classroom learning. We aim to
              develop responsible, confident and compassionate individuals who
              are prepared to face the opportunities and challenges of the future.
            </p>

            {/* Values */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              {[
                "Student-Centered Learning",
                "Strong Moral Values",
                "Parent Partnership",
                "Holistic Development",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-red-200 hover:bg-red-50"
                >
                  <CheckCircle2 size={21} className="text-red-600" />

                  <span className="font-semibold text-slate-700">
                    {item}
                  </span>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}