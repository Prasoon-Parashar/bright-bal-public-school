import {
  BookOpenCheck,
  Presentation,
  Trophy,
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: BookOpenCheck,
      number: "01",
      title: "Quality Education",
      description:
        "Strong academic foundations supported by modern and student-focused teaching methods.",
      points: [
        "Concept-based learning",
        "Regular academic guidance",
      ],
    },
    {
      icon: Presentation,
      number: "02",
      title: "Modern Classrooms",
      description:
        "Comfortable and engaging classrooms designed to make everyday learning more effective.",
      points: [
        "Interactive learning",
        "Positive environment",
      ],
    },
    {
      icon: Trophy,
      number: "03",
      title: "Sports & Activities",
      description:
        "Students get opportunities to develop confidence, teamwork and physical fitness beyond academics.",
      points: [
        "Physical development",
        "Creative activities",
      ],
    },
    {
      icon: GraduationCap,
      number: "04",
      title: "Experienced Faculty",
      description:
        "Dedicated teachers who guide, encourage and support every child throughout their learning journey.",
      points: [
        "Personal attention",
        "Supportive teachers",
      ],
    },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-red-200/30 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-yellow-100/60 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-5 py-2.5 text-sm font-bold text-red-700 shadow-sm">
            <Sparkles size={17} />
            Why Parents Choose Us
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            More Than Just a
            <span className="text-red-700"> School</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            We create a balanced learning environment where academics,
            discipline, creativity, confidence and character development
            grow together.
          </p>

        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-red-200 hover:shadow-2xl"
              >

                {/* Top Red Line */}
                <div className="absolute left-0 top-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r from-red-800 to-red-500 transition-transform duration-500 group-hover:scale-x-100" />

                {/* Number */}
                <span className="absolute right-5 top-4 text-5xl font-black text-slate-100 transition-colors duration-300 group-hover:text-red-50">
                  {feature.number}
                </span>

                {/* Icon */}
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-700 transition-all duration-500 group-hover:rotate-3 group-hover:bg-gradient-to-br group-hover:from-red-700 group-hover:to-red-500 group-hover:text-white group-hover:shadow-lg">
                  <Icon size={30} />
                </div>

                {/* Title */}
                <h3 className="mt-7 text-2xl font-extrabold text-slate-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-4 min-h-[112px] leading-7 text-slate-600">
                  {feature.description}
                </p>

                {/* Points */}
                <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">

                  {feature.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
                    >
                      <CheckCircle2
                        size={17}
                        className="shrink-0 text-red-600"
                      />

                      {point}
                    </div>
                  ))}

                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom Highlight */}
        <div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-red-800 via-red-700 to-red-600 shadow-2xl">

          <div className="grid gap-0 md:grid-cols-3">

            {/* Safe Environment */}
            <div className="flex items-center gap-4 border-white/10 p-7 md:border-r">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <ShieldCheck size={28} />
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Safe Environment
                </h3>

                <p className="mt-1 text-sm text-red-100">
                  A caring space for every child.
                </p>
              </div>

            </div>

            {/* Values */}
            <div className="flex items-center gap-4 border-white/10 p-7 md:border-r">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <HeartHandshake size={28} />
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Values & Discipline
                </h3>

                <p className="mt-1 text-sm text-red-100">
                  Character matters as much as marks.
                </p>
              </div>

            </div>

            {/* Development */}
            <div className="flex items-center gap-4 p-7">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                <GraduationCap size={28} />
              </div>

              <div>
                <h3 className="font-bold text-white">
                  Holistic Development
                </h3>

                <p className="mt-1 text-sm text-red-100">
                  Preparing students for life, not just exams.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}