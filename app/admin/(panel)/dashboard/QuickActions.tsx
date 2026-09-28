import Link from "next/link";
import {
  Bell,
  ImageIcon,
  GraduationCap,
  MessageCircle,
  Settings,
  ArrowRight,
} from "lucide-react";

const actions = [
  {
    title: "Add Notice",
    desc: "Create school announcements instantly.",
    href: "/admin/notices",
    icon: Bell,
    color: "from-red-600 to-red-500",
  },
  {
    title: "Upload Gallery",
    desc: "Add new school event photos.",
    href: "/admin/gallery",
    icon: ImageIcon,
    color: "from-blue-600 to-blue-500",
  },
  {
    title: "Admissions",
    desc: "View and manage admission forms.",
    href: "/admin/admissions",
    icon: GraduationCap,
    color: "from-green-600 to-green-500",
  },
  {
    title: "Enquiries",
    desc: "Check contact messages from website.",
    href: "/admin/enquiries",
    icon: MessageCircle,
    color: "from-purple-600 to-purple-500",
  },
  {
    title: "School Settings",
    desc: "Edit school information & social links.",
    href: "/admin/settings",
    icon: Settings,
    color: "from-orange-500 to-orange-400",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-[30px] border border-red-100 bg-gradient-to-br from-white via-red-50/30 to-orange-50/50 p-6 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.28)] md:p-7">
      <div className="mb-7 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-500">
            Dashboard
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 md:text-3xl">
            Quick Actions
          </h2>
        </div>

        <div className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-red-700">
          shortcuts
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_45px_-25px_rgba(239,68,68,0.5)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300" />

            <div className="flex items-start justify-between gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${action.color} text-white shadow-lg shadow-red-200`}
              >
                <action.icon size={26} />
              </div>

              <div className="rounded-full bg-slate-100 p-2 text-slate-500 transition group-hover:bg-red-50 group-hover:text-red-600">
                <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </div>
            </div>

            <h3 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-red-700">
              {action.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {action.desc}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-red-600">
              Open Module
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}