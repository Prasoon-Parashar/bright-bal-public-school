import {
  Star,
  Quote,
  Heart,
  Users,
  Sparkles,
} from "lucide-react";

const testimonials = [
  {
    name: "Parent",
    student: "Parent of Class V Student",
    initials: "P",
    message:
      "Bright Bal Public School has provided an excellent learning environment. The teachers are supportive and my child enjoys coming to school every day.",
  },
  {
    name: "Parent",
    student: "Parent of Class III Student",
    initials: "P",
    message:
      "The school focuses not only on academics but also on discipline and personality development. We are very satisfied with our child's progress.",
  },
  {
    name: "Parent",
    student: "Parent of Nursery Student",
    initials: "P",
    message:
      "The caring teachers and safe environment give us confidence. Our child feels comfortable, happy and excited to learn every day.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-red-100/60 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-yellow-100/60 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADING */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-700">
            <Heart size={17} />
            Trusted by Parents
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            What Our
            <span className="text-red-700"> Parents Say</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            The confidence and trust of our parents inspire us to provide
            every child with a caring, disciplined and meaningful learning
            experience.
          </p>

        </div>

        {/* TESTIMONIAL CARDS */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-red-200 hover:shadow-2xl"
            >

              {/* Decorative Quote */}
              <Quote
                size={100}
                className="absolute -right-4 -top-5 text-slate-50 transition-colors duration-500 group-hover:text-red-50"
                fill="currentColor"
              />

              {/* Top */}
              <div className="relative flex items-center justify-between">

                {/* Stars */}
                <div className="flex gap-1 text-yellow-500">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={19}
                      fill="currentColor"
                    />
                  ))}

                </div>

                <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-700">
                  5.0
                </div>

              </div>

              {/* Message */}
              <div className="relative mt-7">

                <Quote
                  size={25}
                  className="mb-4 text-red-600"
                />

                <p className="min-h-[168px] text-[17px] italic leading-8 text-slate-600">
                  &ldquo;{item.message}&rdquo;
                </p>

              </div>

              {/* Parent */}
              <div className="relative mt-7 flex items-center gap-4 border-t border-slate-100 pt-6">

                {/* Avatar */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-800 to-red-500 text-xl font-extrabold text-white shadow-lg shadow-red-600/20">
                  {item.initials}
                </div>

                <div>

                  <h3 className="text-lg font-extrabold text-slate-900">
                    {item.name}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-red-700">
                    {item.student}
                  </p>

                </div>

              </div>

              {/* Bottom Hover Line */}
              <div className="absolute bottom-0 left-0 h-1.5 w-full origin-left scale-x-0 bg-gradient-to-r from-red-800 via-red-600 to-red-400 transition-transform duration-500 group-hover:scale-x-100" />

            </div>
          ))}

        </div>

        {/* TRUST BANNER */}
        <div className="relative mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-red-800 via-red-700 to-red-500 p-8 shadow-2xl md:p-10">

          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-28 left-20 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">

            <div className="flex items-center gap-5">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
                <Users size={31} />
              </div>

              <div>

                <p className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-300">
                  Parent-School Partnership
                </p>

                <h3 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
                  Together, We Help Every Child Grow
                </h3>

                <p className="mt-2 max-w-2xl leading-7 text-red-100">
                  Strong communication between parents and teachers helps us
                  understand, support and guide every student better.
                </p>

              </div>

            </div>

            <div className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur-sm">
              <Sparkles size={18} />
              Learn • Grow • Succeed
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}