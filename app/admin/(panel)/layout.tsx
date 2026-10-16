
import AdminSidebar from "./AdminSidebar";
import LogoutButton from "../LogoutButton";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (
    error ||
    !user?.email ||
    !adminEmails.includes(user.email.toLowerCase())
  ) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gray-950 md:flex">
      <AdminSidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col pt-16 md:pt-0">
        <main className="min-w-0 flex-1 overflow-x-auto p-4 sm:p-6 lg:p-10">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-slate-950 p-4 sm:p-6">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-xl bg-slate-800 p-3 sm:p-4">
              <p className="text-xs text-gray-400">Logged in as</p>
              <p className="font-semibold text-white">Administrator</p>
            </div>

            <LogoutButton />
          </div>
        </footer>
      </div>
    </div>
  );
}
