 import Link from "next/link";
import {
  BookOpen,
  Eye,
  Target,
  Heart,
  Users,
  GraduationCap,
  ShieldCheck,
  Trophy,
  ArrowRight,
  CheckCircle2,
  School,
  Sparkles,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white dark:bg-slate-950">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-700 to-red-500 py-24 text-white">
        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-yellow-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
            <School size={18} />
            Know Our School
          </div>

          <h1 className="mx-auto mt-7 max-w-5xl text-4xl font-extrabold leading-tight md:text-6xl">
            About Bright Bal
            <span className="block text-yellow-300">
              Public School
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-red-100">
            Building strong foundations through quality education,
            discipline, creativity and values that prepare every child
            for a brighter future.
          </p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">

          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400">
              <BookOpen size={17} />
              Our Story
            </div>

            <h2 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white">
              A Place Where Children
              <span className="text-red-700 dark:text-red-400">
                {" "}Learn, Grow & Succeed
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Bright Bal Public School is an English Medium School in
              Agra committed to providing a supportive and inspiring
              learning environment for students from Nursery to Class VIII.
            </p>

            <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
              Our focus goes beyond textbooks. We encourage students to
              develop confidence, discipline, curiosity, creativity and
              strong moral values while building a solid academic foundation.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Student-focused learning environment",
                "Strong academic foundation",
                "Focus on discipline and moral values",
                "Balanced academics, sports and activities",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-700 dark:text-slate-200"
                >
                  <CheckCircle2
                    size={20}
                    className="shrink-0 text-red-600"
                  />
                  <span className="font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* SCHOOL INFO CARD */}
          <div className="relative">
            <div className="rounded-3xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 p-1 shadow-2xl">
              <div className="rounded-[22px] bg-white p-8 dark:bg-slate-950 md:p-10">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 dark:bg-red-950/50">
                  <GraduationCap
                    size={34}
                    className="text-red-700 dark:text-red-400"
                  />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                  Bright Bal Public School
                </h3>

                <p className="mt-2 font-semibold text-red-700 dark:text-red-400">
                  English Medium School • Agra
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">

                  <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                    <p className="text-3xl font-bold text-red-700 dark:text-red-400">
                      N–VIII
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Classes
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                    <p className="text-3xl font-bold text-red-700 dark:text-red-400">
                      English
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Medium
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                    <p className="text-3xl font-bold text-red-700 dark:text-red-400">
                      Agra
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Location
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-900">
                    <p className="text-3xl font-bold text-red-700 dark:text-red-400">
                      360°
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Development
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 text-sm font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-400">
              <Sparkles size={17} />
              Our Purpose
            </span>

            <h2 className="mt-5 text-4xl font-extrabold text-slate-900 dark:text-white">
              Our Vision & Mission
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">
              Creating an environment where education builds knowledge,
              character, confidence and responsibility.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">

            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 transition group-hover:bg-red-700 dark:bg-red-950/50">
                <Eye className="text-red-700 transition group-hover:text-white dark:text-red-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                Our Vision
              </h3>

              <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                To nurture confident, responsible and compassionate
                individuals who possess the knowledge, skills and values
                needed to succeed in life and contribute positively to society.
              </p>
            </div>

            <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 transition group-hover:bg-red-700 dark:bg-red-950/50">
                <Target className="text-red-700 transition group-hover:text-white dark:text-red-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">
                Our Mission
              </h3>

              <p className="mt-4 leading-8 text-slate-600 dark:text-slate-300">
                To provide quality education through dedicated teaching,
                meaningful learning experiences and opportunities that
                support the academic, social, emotional and physical
                development of every student.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">

          <div className="text-center">
            <p className="font-semibold uppercase tracking-widest text-red-700 dark:text-red-400">
              What We Believe In
            </p>

            <h2 className="mt-3 text-4xl font-extrabold text-slate-900 dark:text-white">
              Our Core Values
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            <ValueCard
              icon={<BookOpen size={28} />}
              title="Excellence"
              text="Encouraging every student to give their best in academics and beyond."
            />

            <ValueCard
              icon={<ShieldCheck size={28} />}
              title="Discipline"
              text="Developing responsibility, punctuality and respect from an early age."
            />

            <ValueCard
              icon={<Heart size={28} />}
              title="Strong Values"
              text="Building kindness, honesty, empathy and respect for others."
            />

            <ValueCard
              icon={<Users size={28} />}
              title="Togetherness"
              text="Creating a supportive partnership between students, teachers and parents."
            />

          </div>
        </div>
      </section>

      {/* WHY BRIGHT BAL */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="grid gap-10 lg:grid-cols-2">

            <div>
              <p className="font-semibold uppercase tracking-widest text-red-700 dark:text-red-400">
                Why Bright Bal?
              </p>

              <h2 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 dark:text-white">
                Education That Goes
                <span className="block text-red-700 dark:text-red-400">
                  Beyond the Classroom
                </span>
              </h2>

              <p className="mt-6 leading-8 text-slate-600 dark:text-slate-300">
                We aim to create a positive school experience where every
                student feels encouraged to explore, participate, ask
                questions and discover their abilities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <HighlightCard
                icon={<GraduationCap />}
                title="Quality Education"
              />

              <HighlightCard
                icon={<Users />}
                title="Dedicated Teachers"
              />

              <HighlightCard
                icon={<Trophy />}
                title="Sports & Activities"
              />

              <HighlightCard
                icon={<ShieldCheck />}
                title="Safe Environment"
              />

            </div>

          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section className="px-6 pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-red-800 via-red-700 to-red-500 px-8 py-14 text-center text-white shadow-2xl md:px-14">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">
            <GraduationCap
              size={45}
              className="mx-auto text-yellow-300"
            />

            <h2 className="mt-5 text-3xl font-extrabold md:text-4xl">
              Give Your Child a Bright Beginning
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-red-100">
              Admissions are open for the 2026-27 academic session.
              Start your child's journey with Bright Bal Public School.
            </p>

            <Link
              href="/admissions"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-bold text-red-700 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-yellow-50"
            >
              Apply for Admission
              <ArrowRight size={19} />
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}

function ValueCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-red-700 transition-all group-hover:bg-red-700 group-hover:text-white dark:bg-red-950/50 dark:text-red-400">
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
        {text}
      </p>
    </div>
  );
}

function HighlightCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-red-200 hover:bg-red-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-red-950/20">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400">
        {icon}
      </div>

      <p className="font-bold text-slate-800 dark:text-white">
        {title}
      </p>
    </div>
  );
}