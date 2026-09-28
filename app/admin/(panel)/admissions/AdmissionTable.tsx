"use client";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AdmissionDrawer from "./AdmissionDrawer";
import { Eye, Trash2 } from "lucide-react";
import { exportAdmissionsToExcel } from "./exportToExcel";
import { FileSpreadsheet } from "lucide-react";
import {
  Search,
  Users,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const supabase = createClient();

type Admission = {
  id: string;
  registration_number: string;
  student_name: string;
  class: string;
  gender: string;
  dob: string;
  father_name: string;
  father_phone: string;
  student_photo_url: string;
  birth_certificate_url: string;
  address_proof_url: string;
  tc_url: string;
  status: string;
  submitted_at: string;
  
};

export default function AdmissionTable() {
    const [selectedAdmission, setSelectedAdmission] = useState<any>(null);
const [drawerOpen, setDrawerOpen] = useState(false);
  const [applications, setApplications] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

async function fetchApplications() {
  setLoading(true);

  const { data, error } = await supabase
    .from("admissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (error) {
    console.error(error);
  } else {
    setApplications(data || []);
  }

  setLoading(false);
}
async function deleteAdmission(admission: Admission) {
  const confirmDelete = confirm(
    `Delete admission of ${admission.student_name}?\n\nThis action cannot be undone.`
  );

  if (!confirmDelete) return;

  const files = [
    admission.student_photo_url,
    admission.birth_certificate_url,
    admission.address_proof_url,
    admission.tc_url,
  ]
    .filter(Boolean)
    .map((url: string) => url.split("/admission-documents/")[1]);

  if (files.length) {
    await supabase.storage
      .from("admission-documents")
      .remove(files);
  }

  const { error } = await supabase
    .from("admissions")
    .delete()
    .eq("id", admission.id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Admission deleted successfully.");
  fetchApplications();
}

  // ---------- Stats ----------
  const total = applications.length;
  const pending = applications.filter((a) => a.status === "Pending").length;
  const approved = applications.filter((a) => a.status === "Approved").length;
  const rejected = applications.filter((a) => a.status === "Rejected").length;

  // ---------- Filters ----------
  const filtered = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.student_name.toLowerCase().includes(search.toLowerCase()) ||
        app.registration_number.toLowerCase().includes(search.toLowerCase()) ||
        app.father_phone.includes(search);

      const matchesClass =
        classFilter === "All" || app.class === classFilter;

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [applications, search, classFilter, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Applications" value={total} color="blue" icon={<Users size={28} />} />
        <StatCard title="Pending" value={pending} color="yellow" icon={<Clock3 size={28} />} />
        <StatCard title="Approved" value={approved} color="green" icon={<CheckCircle2 size={28} />} />
        <StatCard title="Rejected" value={rejected} color="red" icon={<XCircle size={28} />} />
      </div>

      <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)] md:p-6">
        <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Application Queue</h2>
            <p className="text-sm text-slate-500">Track applications and manage admissions efficiently.</p>
          </div>

          <button
            onClick={() => exportAdmissionsToExcel(filtered)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-green-500 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:brightness-110"
          >
            <FileSpreadsheet size={18} />
            Export Excel
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative">
            <Search className="absolute left-3 top-3.5 text-slate-400" size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name / reg no / mobile..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
            />
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900 outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
          >
            <option value="All">All Classes</option>
            {[
              "Nursery",
              "LKG",
              "UKG",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
            ].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-900 outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_22px_50px_-28px_rgba(15,23,42,0.25)]">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Loading admissions...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="mx-auto text-red-500" size={45} />
            <h2 className="mt-4 text-2xl font-black text-slate-900">No Admission Applications</h2>
            <p className="mt-2 text-base font-medium text-slate-700">Applications submitted from the website will appear here.</p>
            <button
              onClick={fetchApplications}
              className="mt-6 rounded-2xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Refresh Applications
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-slate-900">
              <thead className="bg-gradient-to-r from-red-700 to-red-600 text-white">
                <tr>
                  <th className="p-4 font-bold">Student</th>
                  <th className="p-4 font-bold">Registration</th>
                  <th className="p-4 font-bold">Class</th>
                  <th className="p-4 font-bold">Father</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold">Submitted</th>
                  <th className="p-4 text-center font-bold">Action</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b border-slate-200 transition hover:bg-red-50/70">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={app.student_photo_url} className="h-12 w-12 rounded-full border border-slate-200 object-cover" alt={app.student_name} />
                        <div>
                          <div className="font-bold text-slate-900">{app.student_name}</div>
                          <div className="text-xs text-slate-500">{app.gender} • {new Date(app.dob).toLocaleDateString("en-IN")}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-semibold text-red-700">{app.registration_number}</td>
                    <td className="p-4"><span className="rounded-lg bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">{app.class}</span></td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">{app.father_name}</div>
                      <div className="text-sm text-slate-700">{app.father_phone}</div>
                    </td>
                    <td className="p-4"><StatusBadge status={app.status} /></td>
                    <td className="p-4 text-sm font-medium text-slate-800">
                      {new Date(app.submitted_at).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                      <br />
                      {new Date(app.submitted_at).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedAdmission(app);
                            setDrawerOpen(true);
                          }}
                          className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-700"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => deleteAdmission(app)}
                          className="rounded-xl bg-slate-700 p-3 text-white transition hover:bg-red-700"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AdmissionDrawer
        admission={selectedAdmission}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onStatusUpdate={fetchApplications}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Approved") {
    return <span className="inline-flex rounded-full border border-green-300 bg-green-100 px-3 py-1 text-xs font-bold text-green-800">Approved</span>;
  }

  if (status === "Rejected") {
    return <span className="inline-flex rounded-full border border-red-300 bg-red-100 px-3 py-1 text-xs font-bold text-red-800">Rejected</span>;
  }

  return <span className="inline-flex rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-800">Pending</span>;
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: "blue" | "green" | "yellow" | "red";
}) {
  const styles = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
  };

  return (
    <div className={`rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] ${styles[color]}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{title}</p>
          <h2 className="mt-3 text-3xl font-black text-slate-900">{value}</h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
}