import Link from "next/link";
import {
  LayoutDashboard,
  Image,
  Newspaper,
  GraduationCap,
  Settings,
  MessageSquare,
  School,
} from "lucide-react";

import LogoutButton from "../LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Admissions",
      href: "/admin/admissions",
      icon: GraduationCap,
    },
    {
      name: "Gallery",
      href: "/admin/gallery",
      icon: Image,
    },
    {
      name: "Notices",
      href: "/admin/notices",
      icon: Newspaper,
    },
    {
      name: "Enquiries",
      href: "/admin/enquiries",
      icon: MessageSquare,
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-gray-950">

      {/* Sidebar */}

      <aside className="w-72 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 flex flex-col">

        {/* Logo */}

        <div className="border-b border-slate-800 px-8 py-8">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-600 shadow-lg shadow-red-600/30">
              <School size={28} className="text-white" />
            </div>

            <div>

              <h2 className="text-xl font-bold text-white">
                Bright Bal
              </h2>

              <p className="text-sm text-gray-400">
                Admin Panel
              </p>

            </div>

          </div>

        </div>

        {/* Menu */}

        <nav className="flex-1 px-5 py-8 space-y-3">

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl px-5 py-4 text-gray-300 transition-all duration-300 hover:bg-red-600 hover:text-white hover:translate-x-1"
              >
                <Icon
                  size={22}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span className="font-medium">
                  {item.name}
                </span>
              </Link>
            );
          })}

        </nav>

        {/* Footer */}

        <div className="border-t border-slate-800 p-6">

          <div className="mb-6 rounded-2xl bg-slate-800 p-4">

            <p className="text-sm text-gray-400">
              Logged in as
            </p>

            <p className="font-semibold text-white">
              Administrator
            </p>

          </div>

          <LogoutButton />

        </div>

      </aside>

      {/* Main */}

      <main className="flex-1 overflow-y-auto p-10">

        {children}

      </main>

    </div>
  );
}