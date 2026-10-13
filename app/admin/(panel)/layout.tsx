
import AdminSidebar from "./AdminSidebar";
import LogoutButton from "../LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-gray-950">
      {/* Sidebar */}
      <div className="flex w-72 shrink-0 flex-col">
        <AdminSidebar />

        {/* Logout */}
        <div className="border-t border-slate-800 bg-slate-950 p-6">
          <div className="mb-6 rounded-2xl bg-slate-800 p-4">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold text-white">Administrator</p>
          </div>

          <LogoutButton />
        </div>
      </div>

      {/* Page Content */}
      <main className="min-w-0 flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
