
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  Newspaper,
  GraduationCap,
  Settings,
  MessageSquare,
  ClipboardList,
  School,
  ChevronRight,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Admissions", href: "/admin/admissions", icon: GraduationCap },
  {
    name: "Registered Students",
    href: "/admin/registered-students",
    icon: ClipboardList,
  },
  { name: "Gallery", href: "/admin/gallery", icon: Image },
  { name: "Notices", href: "/admin/notices", icon: Newspaper },
  { name: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-72 shrink-0 flex-col border-r border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="border-b border-slate-800 px-8 py-8">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/30">
            <School size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Bright Bal</h2>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-8">
        {menu.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`relative flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 ${
                active
                  ? "bg-red-600 font-semibold text-white shadow-lg shadow-red-950/30"
                  : "text-slate-300 hover:translate-x-1 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {active && (
                <span className="absolute inset-y-2 left-0 w-1 rounded-r bg-white" />
              )}
              <Icon size={22} />
              <span className="flex-1">{item.name}</span>
              {active && <ChevronRight size={18} />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
