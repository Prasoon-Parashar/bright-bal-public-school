
"use client";

import { useState } from "react";
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
  Menu,
  X,
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
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600">
            <School size={22} className="text-white" />
          </div>
          <div>
            <h2 className="font-bold text-white">Bright Bal</h2>
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-slate-800"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col border-r border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 transition-transform duration-300 md:sticky md:top-0 md:h-screen md:w-72 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Branding */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-6 md:px-8 md:py-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/30 md:h-14 md:w-14">
              <School size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Bright Bal</h2>
              <p className="text-sm text-gray-400">Admin Panel</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6 md:py-8">
          {menu.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`relative flex min-h-12 items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200 md:px-5 md:py-4 ${
                  active
                    ? "bg-red-600 font-semibold text-white shadow-lg shadow-red-950/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white md:hover:translate-x-1"
                }`}
              >
                {active && (
                  <span className="absolute inset-y-2 left-0 w-1 rounded-r bg-white" />
                )}
                <Icon size={22} className="shrink-0" />
                <span className="min-w-0 flex-1">{item.name}</span>
                {active && <ChevronRight size={18} className="shrink-0" />}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
