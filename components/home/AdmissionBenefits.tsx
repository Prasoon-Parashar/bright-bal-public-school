import {
  School,
  MonitorSmartphone,
  Trophy,
  Bus,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: School,
    title: "Experienced Teachers",
    desc: "Qualified and caring teachers focused on every child's success.",
  },
  {
    icon: MonitorSmartphone,
    title: "Smart Classrooms",
    desc: "Modern classrooms equipped with digital learning facilities.",
  },
  {
    icon: Trophy,
    title: "Sports & Activities",
    desc: "Indoor and outdoor activities for complete personality development.",
  },
  {
    icon: BookOpen,
    title: "Quality Education",
    desc: "Balanced curriculum with academic excellence and practical learning.",
  },
  {
    icon: Bus,
    title: "Transport Facility",
    desc: "Safe and reliable transportation across nearby areas.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Campus",
    desc: "Secure campus with disciplined and student-friendly environment.",
  },
];

export default function AdmissionBenefits() {
  return (
    <aside className="sticky top-28 h-fit">

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 p-6 text-white">

          <h2 className="text-3xl font-bold">
            Why Choose Us?
          </h2>

          <p className="mt-2 text-red-100">
            Everything your child needs to grow academically and personally.
          </p>

        </div>

        <div className="space-y-5 p-6">

          {benefits.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="flex gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-red-300 hover:bg-red-50"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">

                  <Icon
                    size={22}
                    className="text-red-700"
                  />

                </div>

                <div>

                  <h3 className="font-bold text-slate-800">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.desc}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      <div className="mt-8 rounded-3xl bg-gradient-to-r from-red-700 to-red-500 p-6 text-white shadow-xl">

        <h3 className="text-2xl font-bold">
          Admissions Open
        </h3>

        <p className="mt-3 text-red-100">
          Secure your child's future with Bright Bal Public School.
        </p>

        <div className="mt-6 rounded-2xl bg-white/10 p-4">

          <p className="text-sm">
            📞 Contact Office
          </p>

          <p className="mt-2 text-xl font-bold">
            +91 9997157985
          </p>

        </div>

      </div>

    </aside>
  );
}