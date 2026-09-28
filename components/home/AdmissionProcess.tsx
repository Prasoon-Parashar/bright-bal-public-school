import Link from "next/link";
import {
  FileText,
  FolderOpen,
  Users,
  BadgeCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Fill Admission Form",
    description:
      "Complete the online admission form with the student's basic information and class preference.",
  },
  {
    number: "02",
    icon: FolderOpen,
    title: "Submit Documents",
    description:
      "Provide the required documents to the school for verification and admission records.",
  },
  {
    number: "03",
    icon: Users,
    title: "School Interaction",
    description:
      "Meet our school team for a simple interaction and discuss your child's admission.",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Admission Confirmed",
    description:
      "Complete the remaining formalities and begin your child's learning journey with us.",
  },
];

export default function AdmissionProcess() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-amber-50 py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-red-200/40 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-yellow-100/70 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADING */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-white px-5 py-2.5 text-sm font-bold text-red-700 shadow-sm">
            <Sparkles size={17} />
            Admissions 2026-27
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Your Journey to Bright Bal
            <span className="block text-red-700">
              Starts Here
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Joining Bright Bal Public School is simple and transparent.
            Complete these four easy steps to begin your child&apos;s
            admission journey.
          </p>

        </div>

        {/* STEPS */}
        <div className="relative mt-16">

          {/* Desktop Connecting Line */}
          <div className="absolute left-[12%] right-[12%] top-10 hidden h-[2px] bg-gradient-to-r from-red-200 via-red-500 to-red-200 lg:block" />

          <div className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >

                  {/* Step Circle */}
                  <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-red-800 to-red-500 text-white shadow-xl shadow-red-600/20 transition-all duration-500 group-hover:scale-110">
                    <Icon size={31} />
                  </div>

                  {/* Card */}
                  <div className="relative -mt-10 overflow-hidden rounded-3xl border border-slate-200 bg-white px-7 pb-8 pt-16 text-center shadow-lg transition-all duration-500 group-hover:-translate-y-2 group-hover:border-red-200 group-hover:shadow-2xl">

                    {/* Large Number */}
                    <span className="absolute right-5 top-9 text-6xl font-black text-slate-100 transition-colors duration-300 group-hover:text-red-50">
                      {step.number}
                    </span>

                    {/* Step Label */}
                    <div className="relative inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-700">
                      <CheckCircle2 size={14} />
                      Step {index + 1}
                    </div>

                    {/* Title */}
                    <h3 className="relative mt-5 text-2xl font-extrabold text-slate-900">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="relative mt-4 leading-7 text-slate-600">
                      {step.description}
                    </p>

                    {/* Bottom Line */}
                    <div className="absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r from-red-800 via-red-600 to-red-400 transition-transform duration-500 group-hover:scale-x-100" />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* CTA */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-gradient-to-r from-red-800 via-red-700 to-red-500 p-8 shadow-2xl md:p-10">

          {/* Decorative circles */}
          <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

          <div className="absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-yellow-300/10 blur-2xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-300">
                Admissions Open
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
                Ready to Join Bright Bal?
              </h3>

              <p className="mt-3 max-w-2xl leading-7 text-red-100">
                Start your child&apos;s admission application online.
                It only takes a few minutes to submit the initial details.
              </p>

            </div>

            <Link
              href="/admissions"
              className="group inline-flex shrink-0 items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-red-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-red-50"
            >
              Apply for Admission

              <ArrowRight
                size={19}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}