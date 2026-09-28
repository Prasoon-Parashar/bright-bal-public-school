import {
  Monitor,
  Trophy,
  ShieldCheck,
  Users,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

export default function Facilities() {
  const facilities = [
    {
      icon: Monitor,
      number: "01",
      title: "Computer Lab",
      description:
        "Practical computer education designed to develop essential digital knowledge and technology skills.",
      highlight: "Digital Learning",
    },
    {
      icon: Users,
      number: "02",
      title: "Experienced Teachers",
      description:
        "Qualified and dedicated educators who provide guidance, encouragement and personal attention.",
      highlight: "Expert Guidance",
    },
    {
      icon: Trophy,
      number: "03",
      title: "Sports & Activities",
      description:
        "Sports, cultural programs and extracurricular activities that promote confidence and teamwork.",
      highlight: "Play & Grow",
    },
    {
      icon: ShieldCheck,
      number: "04",
      title: "Safe Campus",
      description:
        "A disciplined, secure and student-friendly environment where children can learn with confidence.",
      highlight: "Safe & Secure",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-red-100/60 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-yellow-100/60 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADING */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-700">
            <Sparkles size={17} />
            Learning Beyond Classrooms
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Facilities Designed for
            <span className="text-red-700"> Better Learning</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Providing students with a safe, supportive and engaging
            environment where they can learn, explore, participate and grow.
          </p>

        </div>

        {/* FACILITY CARDS */}
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">

          {facilities.map((facility) => {
            const Icon = facility.icon;

            return (
              <div
                key={facility.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-red-200 hover:shadow-2xl"
              >

                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/0 to-red-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Number */}
                <span className="absolute right-6 top-5 text-6xl font-black text-slate-100 transition-colors duration-500 group-hover:text-red-100">
                  {facility.number}
                </span>

                <div className="relative">

                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700 transition-all duration-500 group-hover:rotate-3 group-hover:bg-gradient-to-br group-hover:from-red-700 group-hover:to-red-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-red-600/20">
                    <Icon size={30} />
                  </div>

                  {/* Highlight */}
                  <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-600 transition-colors group-hover:bg-red-100 group-hover:text-red-700">
                    <CheckCircle2 size={14} />
                    {facility.highlight}
                  </div>

                  {/* Title */}
                  <div className="mt-4 flex items-center justify-between gap-3">

                    <h3 className="text-2xl font-extrabold text-slate-900">
                      {facility.title}
                    </h3>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-300 group-hover:border-red-700 group-hover:bg-red-700 group-hover:text-white">
                      <ArrowUpRight size={17} />
                    </div>

                  </div>

                  {/* Description */}
                  <p className="mt-4 leading-7 text-slate-600">
                    {facility.description}
                  </p>

                </div>

                {/* Bottom line */}
                <div className="absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r from-red-800 via-red-600 to-red-400 transition-transform duration-500 group-hover:scale-x-100" />

              </div>
            );
          })}

        </div>

        {/* BOTTOM BANNER */}
        <div className="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-red-800 via-red-700 to-red-500 px-8 py-10 shadow-2xl md:px-12">

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-28 left-20 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">

            <div className="max-w-2xl">

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">
                A Complete Learning Environment
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-white">
                Everything Your Child Needs to Learn & Grow
              </h3>

              <p className="mt-3 leading-7 text-red-100">
                From academics and technology to sports and safety, our
                facilities support every part of a student&apos;s school
                journey.
              </p>

            </div>

            <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-white/20 bg-white/10 px-6 py-5 text-white backdrop-blur-sm">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <ShieldCheck size={27} />
              </div>

              <div>
                <p className="text-xl font-extrabold">
                  Safe & Caring
                </p>

                <p className="text-sm text-red-100">
                  Student-first environment
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}