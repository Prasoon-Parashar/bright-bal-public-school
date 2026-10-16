
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
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-br from-white via-red-50/30 to-orange-50/50 p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-7">
      {/* Heading */}
      <div className="mb-5 flex min-w-0 items-center justify-between gap-3 sm:mb-7">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-red-500 sm:text-xs sm:tracking-[0.18em]">
            Dashboard
          </p>

          <h2 className="mt-1.5 text-xl font-black leading-tight text-slate-900 sm:mt-2 sm:text-2xl md:text-3xl">
            Quick Actions
          </h2>
        </div>

        <span className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-red-700 sm:px-3 sm:text-xs sm:tracking-wider">
          Shortcuts
        </span>
      </div>

      {/* Action Cards */}
      <div className="grid min-w-0 grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors hover:border-red-200 hover:shadow-md sm:rounded-2xl sm:p-5"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-yellow-300" />

              <div className="flex items-center justify-between gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${action.color} text-white shadow-md sm:h-14 sm:w-14 sm:rounded-2xl`}
                >
                  <Icon size={23} />
                </div>

                <div className="rounded-full bg-slate-100 p-2 text-slate-500 transition group-hover:bg-red-50 group-hover:text-red-600">
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>

              <h3 className="mt-4 break-words text-base font-bold leading-snug text-slate-900 group-hover:text-red-700 sm:mt-5 sm:text-lg">
                {action.title}
              </h3>

              <p className="mt-2 flex-1 break-words text-sm leading-5 text-slate-600 sm:leading-6">
                {action.desc}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-red-600 sm:mt-5 sm:text-sm">
                Open Module
                <ArrowRight size={14} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
