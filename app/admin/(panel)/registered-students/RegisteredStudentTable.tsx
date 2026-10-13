

"use client";

import { createClient } from "@/lib/supabase/client";

import { useCallback, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet } from "lucide-react";

import {

  Search,

  RefreshCw,

  Users,

  Clock3,

  CheckCircle2,

  AlertCircle,


  Eye,

  X,

  FileText,

  UserRound,

  Phone,

  MapPin,

  CalendarDays,

  ShieldCheck,

  Save,

  Filter,

} from "lucide-react";



type StudentStatus =

  | "Pending Review"

  | "Under Review"

  | "Needs Correction"

  | "Verified"

  | "Rejected";



type StudentDocument = {

  id: string;

  document_type: string;

  original_filename: string;

  mime_type: string;

  file_size_bytes: number;

  url?: string;

};



type RegisteredStudent = {

  id: string;

  reference_number: string;

  admission_number: string;

  academic_session: string;

  student_name: string;

  date_of_birth: string;

  gender: string;

  religion?: string | null;

  category: string;

  aadhaar_number?: string | null;

  apaar_id?: string | null;

  blood_group?: string | null;

  current_class: string;

  section?: string | null;

  guardian_name: string;

  guardian_relation: string;

  guardian_mobile: string;

  alternate_mobile?: string | null;

  guardian_email?: string | null;

  address_line: string;

  city: string;

  state: string;

  postal_code: string;

  emergency_contact?: string | null;

  declaration_accepted: boolean;

  status: StudentStatus;

  admin_notes?: string | null;

  created_at: string;

  updated_at: string;

  documents?: StudentDocument[];

};



const STATUSES: StudentStatus[] = [

  "Pending Review",

  "Under Review",

  "Needs Correction",

  "Verified",

  "Rejected",

];



const CLASS_OPTIONS = [

  "Nursery",

  "LKG",

  "UKG",

  "Class 1",

  "Class 2",

  "Class 3",

  "Class 4",

  "Class 5",

  "Class 6",

  "Class 7",

  "Class 8",

];



const STATUS_STYLES: Record<StudentStatus, string> = {

  "Pending Review":

    "bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",

  "Under Review":

    "bg-blue-100 text-blue-800 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-500/20",

  "Needs Correction":

    "bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-500/20",

  Verified:

    "bg-emerald-100 text-emerald-800 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",

  Rejected:

    "bg-red-100 text-red-800 ring-red-200 dark:bg-red-500/10 dark:text-red-300 dark:ring-red-500/20",

};



const DOCUMENT_LABELS: Record<string, string> = {

  student_photo: "Student Photograph",

  aadhaar_card: "Aadhaar Card",

  birth_certificate: "Birth Certificate",

  address_proof: "Address Proof",

  affidavit: "Affidavit",

  caste_certificate: "Caste Certificate",

  ews_certificate: "EWS Certificate",

  other_certificate: "Other Certificate",

};



function formatDate(value?: string | null) {

  if (!value) return "Not provided";



  const date = new Date(value);



  if (Number.isNaN(date.getTime())) return value;



  return date.toLocaleDateString("en-IN", {

    day: "2-digit",

    month: "short",

    year: "numeric",

  });

}



function StatusBadge({ status }: { status: StudentStatus }) {

  return (

    <span

      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${

        STATUS_STYLES[status] ?? STATUS_STYLES["Pending Review"]

      }`}

    >

      {status}

    </span>

  );

}



function InfoItem({

  label,

  value,

}: {

  label: string;

  value?: string | number | boolean | null;

}) {

  const displayValue =

    value === null || value === undefined || value === ""

      ? "Not provided"

      : typeof value === "boolean"

        ? value

          ? "Yes"

          : "No"

        : String(value);



  return (

    <div className="min-w-0 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">

      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">

        {label}

      </p>

      <p className="mt-1 break-words text-sm font-semibold text-slate-800 dark:text-slate-100">

        {displayValue}

      </p>

    </div>

  );

}



export default function RegisteredStudentTable() {

    const supabase = createClient();

  const [students, setStudents] = useState<RegisteredStudent[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");



  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [classFilter, setClassFilter] = useState("All");

  const [sessionFilter, setSessionFilter] = useState("All");



  const [selectedStudent, setSelectedStudent] =

    useState<RegisteredStudent | null>(null);

  const [detailsLoading, setDetailsLoading] = useState(false);



  const [newStatus, setNewStatus] =

    useState<StudentStatus>("Pending Review");

  const [adminNotes, setAdminNotes] = useState("");

  const [saving, setSaving] = useState(false);







  const fetchStudents = useCallback(async (showRefresh = false) => {

    if (showRefresh) {

      setRefreshing(true);

    } else {

      setLoading(true);

    }



    setError("");



    try {

        const {

  data: { session },

} = await supabase.auth.getSession();



if (!session?.access_token) {

  throw new Error("Please log in again as an administrator.");

}

      const response = await fetch("/api/admin/registered-students", {

        method: "GET",

        credentials: "same-origin",

        cache: "no-store",

        headers: {

  Accept: "application/json",

  Authorization: `Bearer ${session.access_token}`,

},

      });



      const result = await response.json().catch(() => ({}));



      if (!response.ok) {

        throw new Error(

          result.error ||

            (response.status === 401 || response.status === 403

              ? "Admin access is required to view student records."

              : "Unable to load registered student records.")

        );

      }



      const records = Array.isArray(result)

        ? result

        : Array.isArray(result.records)

          ? result.records

          : Array.isArray(result.students)

            ? result.students

            : null;



      if (!records) {

        throw new Error(

          "The admin API returned an unexpected response. Expected a records array."

        );

      }



      setStudents(records as RegisteredStudent[]);

    } catch (err) {

      setError(

        err instanceof Error

          ? err.message

          : "An unexpected error occurred."

      );

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  }, []);



  useEffect(() => {

    void fetchStudents();

  }, [fetchStudents]);



  const classes = useMemo(

    () =>

      Array.from(

        new Set(

          students

            .map((student) => student.current_class)

            .filter(Boolean)

        )

      ).sort((a, b) => a.localeCompare(b)),

    [students]

  );



  const sessions = useMemo(

    () =>

      Array.from(

        new Set(

          students

            .map((student) => student.academic_session)

            .filter(Boolean)

        )

      ).sort((a, b) => b.localeCompare(a)),

    [students]

  );



  const counts = useMemo(

    () => ({

      total: students.length,

      pending: students.filter(

        (student) => student.status === "Pending Review"

      ).length,

      reviewing: students.filter(

        (student) => student.status === "Under Review"

      ).length,

      verified: students.filter(

        (student) => student.status === "Verified"

      ).length,

      correction: students.filter(

        (student) => student.status === "Needs Correction"

      ).length,

      rejected: students.filter(

        (student) => student.status === "Rejected"

      ).length,

    }),

    [students]

  );



  const filteredStudents = useMemo(() => {

    const query = search.trim().toLowerCase();


    



    return students.filter((student) => {

      const matchesSearch =

        !query ||

        [

          student.student_name,

          student.admission_number,

          student.reference_number,

          student.guardian_name,

          student.guardian_mobile,

          student.current_class,

        ].some((value) => value?.toLowerCase().includes(query));



      const matchesStatus =

        statusFilter === "All" || student.status === statusFilter;



      const matchesClass =

        classFilter === "All" || student.current_class === classFilter;



      const matchesSession =

        sessionFilter === "All" ||

        student.academic_session === sessionFilter;

      return (
        matchesSearch &&

        matchesStatus &&

        matchesClass &&

        matchesSession

      );

    });

  }, [students, search, statusFilter, classFilter, sessionFilter]);

  const exportToExcel = async () => {
    if (!filteredStudents || filteredStudents.length === 0) {
      alert("Export karne ke liye koi student record available nahi hai.");
      return;
    }

    const XLSX = await import("xlsx");

    const rows = filteredStudents.map((student) => ({
      "Student Name": student.student_name,
      "Admission Number": student.admission_number,
      "Reference Number": student.reference_number,
      "Academic Session": student.academic_session,
      "Current Class": student.current_class,
      Section: student.section || "",
      "Guardian Name": student.guardian_name,
      "Guardian Mobile": student.guardian_mobile,
      "Alternate Mobile": student.alternate_mobile || "",
      Email: student.guardian_email || "",
      "Date of Birth": student.date_of_birth,
      Gender: student.gender,
      Category: student.category,
      Religion: student.religion || "",
      "Blood Group": student.blood_group || "",
      Status: student.status,
      "Submitted On": student.created_at
        ? new Date(student.created_at).toLocaleDateString("en-IN")
        : "",
      "Admin Notes": student.admin_notes || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Registered Students");

    XLSX.writeFile(
      workbook,
      `Registered-Students-${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  function openStudent(student: RegisteredStudent) {
    setSelectedStudent(student);

    setNewStatus(student.status);

    setAdminNotes(student.admin_notes ?? "");

    setSuccess("");

    setError("");

    setDetailsLoading(true);



    void (async () => {

      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
          throw new Error("Please log in again as an administrator.");
        }

        const response = await fetch(
          `/api/admin/registered-students/${encodeURIComponent(student.id)}`,
          {
            method: "GET",
            credentials: "same-origin",
            cache: "no-store",
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {

          throw new Error(

            result.error || "Could not load the student's full details."

          );

        }



        const record = result.record ?? result.student ?? result;



        if (record && record.id === student.id) {

          setSelectedStudent(record as RegisteredStudent);

          setNewStatus(record.status ?? student.status);

          setAdminNotes(record.admin_notes ?? "");

        }

      } catch (err) {

        setError(

          err instanceof Error

            ? err.message

            : "Could not load student details."

        );

      } finally {

        setDetailsLoading(false);

      }

    })();

  }



  async function saveStudentReview() {

    if (!selectedStudent) return;



    if (newStatus === "Needs Correction" && !adminNotes.trim()) {

      setError(

        "Add an admin note explaining which information needs correction."

      );

      return;

    }



    setSaving(true);

    setError("");

    setSuccess("");



    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Please log in again as an administrator.");
      }

      const response = await fetch(

        `/api/admin/registered-students/${encodeURIComponent(selectedStudent.id)}`,

        {

          method: "PATCH",

          credentials: "same-origin",

          headers: {

            "Content-Type": "application/json",

            Accept: "application/json",

          },

          body: JSON.stringify({

            status: newStatus,

            admin_notes: adminNotes.trim() || null,

          }),

        }

      );



      const result = await response.json().catch(() => ({}));



      if (!response.ok) {

        throw new Error(

          result.error || "Unable to save the review. Please try again."

        );

      }



      const updated =

        result.record ?? result.student ?? result;



      const updatedStudent: RegisteredStudent = {

        ...selectedStudent,

        ...(updated && updated.id === selectedStudent.id ? updated : {}),

        status: newStatus,

        admin_notes: adminNotes.trim() || null,

      };



      setSelectedStudent(updatedStudent);



      setStudents((current) =>

        current.map((student) =>

          student.id === selectedStudent.id

            ? { ...student, ...updatedStudent }

            : student

        )

      );



      setSuccess("Student review updated successfully.");

    } catch (err) {

      setError(

        err instanceof Error

          ? err.message

          : "An unexpected error occurred."

      );

    } finally {

      setSaving(false);

    }

  }



  function closeDetails() {

    setSelectedStudent(null);

    setDetailsLoading(false);

    setError("");

    setSuccess("");

  }



  const statCards = [

    {

      label: "Total Records",

      value: counts.total,

      icon: Users,

      style:

        "border-slate-200 bg-white text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-white",

      iconStyle: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",

    },

    {

      label: "Pending Review",

      value: counts.pending,

      icon: Clock3,

      style:

        "border-amber-200 bg-amber-50/70 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100",

      iconStyle: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",

    },

    {

      label: "Under Review",

      value: counts.reviewing,

      icon: AlertCircle,

      style:

        "border-blue-200 bg-blue-50/70 text-blue-950 dark:border-blue-900 dark:bg-blue-950/30 dark:text-blue-100",

      iconStyle: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",

    },

    {

      label: "Verified",

      value: counts.verified,

      icon: CheckCircle2,

      style:

        "border-emerald-200 bg-emerald-50/70 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100",

      iconStyle: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",

    },

  ];



  return (

    <div className="space-y-6">

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {statCards.map((item) => {

          const Icon = item.icon;



          return (

            <div

              key={item.label}

              className={`rounded-2xl border p-5 shadow-sm ${item.style}`}

            >

              <div className="flex items-center justify-between gap-3">

                <div>

                  <p className="text-sm font-semibold opacity-75">

                    {item.label}

                  </p>

                  <p className="mt-2 text-3xl font-black tabular-nums">

                    {item.value}

                  </p>

                </div>



                <div className={`rounded-xl p-3 ${item.iconStyle}`}>

                  <Icon size={23} />

                </div>

              </div>

            </div>

          );

        })}

      </div>



      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">

        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

          <div>

            <h2 className="text-xl font-black text-slate-900 dark:text-white">

              Student Records

            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

              Search records and open a student to review the submission.

            </p>

          </div>

          <button
  type="button"
  onClick={exportToExcel}
  disabled={filteredStudents.length === 0}
  className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300"
>
  <FileSpreadsheet size={18} />
  Export Excel
</button>



          <button

            type="button"

            onClick={() => void fetchStudents(true)}

            disabled={loading || refreshing}

            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"

          >

            <RefreshCw

              size={16}

              className={refreshing ? "animate-spin" : ""}

            />

            Refresh

          </button>

        </div>



        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">

          <label className="relative block">

            <span className="sr-only">Search students</span>

            <Search

              size={18}

              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"

            />

            <input

              value={search}

              onChange={(event) => setSearch(event.target.value)}

              placeholder="Name, admission no., reference..."

              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"

            />

          </label>



          <label className="relative">

            <span className="sr-only">Filter by status</span>

            <Filter

              size={16}

              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"

            />

            <select

              value={statusFilter}

              onChange={(event) => setStatusFilter(event.target.value)}

              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-3 text-sm text-slate-800 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"

            >

              <option value="All">All statuses</option>

              {STATUSES.map((status) => (

                <option key={status} value={status}>

                  {status}

                </option>

              ))}

            </select>

          </label>



          <label>

            <span className="sr-only">Filter by class</span>

            <select

              value={classFilter}

              onChange={(event) => setClassFilter(event.target.value)}

              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"

            >

              <option value="All">All classes</option>

              {classes.map((value) => (

                <option key={value} value={value}>

                  {value}

                </option>

              ))}

            </select>

          </label>



          <label>

            <span className="sr-only">Filter by academic session</span>

            <select

              value={sessionFilter}

              onChange={(event) => setSessionFilter(event.target.value)}

              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-red-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"

            >

              <option value="All">All sessions</option>

              {sessions.map((value) => (

                <option key={value} value={value}>

                  {value}

                </option>

              ))}

            </select>

          </label>

        </div>



        {error && !selectedStudent && (

          <div

            role="alert"

            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200"

          >

            {error}

          </div>

        )}



        <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">

          <table className="w-full min-w-[950px] border-collapse text-left">

            <thead className="bg-slate-50 dark:bg-slate-950">

              <tr className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">

                <th className="px-4 py-4 font-bold">Student</th>

                <th className="px-4 py-4 font-bold">Admission No.</th>

                <th className="px-4 py-4 font-bold">Class</th>

                <th className="px-4 py-4 font-bold">Guardian</th>

                <th className="px-4 py-4 font-bold">Submitted</th>

                <th className="px-4 py-4 font-bold">Status</th>

                <th className="px-4 py-4 text-right font-bold">Action</th>

              </tr>

            </thead>



            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

              {loading ? (

                <tr>

                  <td colSpan={7} className="px-4 py-16 text-center">

                    <RefreshCw

                      size={25}

                      className="mx-auto animate-spin text-red-600"

                    />

                    <p className="mt-3 text-sm text-slate-500">

                      Loading student records...

                    </p>

                  </td>

                </tr>

              ) : filteredStudents.length === 0 ? (

                <tr>

                  <td colSpan={7} className="px-4 py-16 text-center">

                    <Users

                      size={30}

                      className="mx-auto text-slate-300"

                    />

                    <p className="mt-3 font-bold text-slate-700 dark:text-slate-200">

                      No student records found

                    </p>

                    <p className="mt-1 text-sm text-slate-500">

                      Try changing the search text or filters.

                    </p>

                  </td>

                </tr>

              ) : (

                filteredStudents.map((student) => (

                  <tr

                    key={student.id}

                    className="transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"

                  >

                    <td className="px-4 py-4">

                      <div className="font-bold text-slate-900 dark:text-white">

                        {student.student_name}

                      </div>

                      <div className="mt-1 text-xs text-slate-500">

                        {student.reference_number}

                      </div>

                    </td>



                    <td className="px-4 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">

                      {student.admission_number}

                    </td>



                    <td className="px-4 py-4">

                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">

                        {student.current_class}

                      </div>

                      {student.section && (

                        <div className="mt-1 text-xs text-slate-500">

                          Section {student.section}

                        </div>

                      )}

                    </td>



                    <td className="px-4 py-4">

                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">

                        {student.guardian_name}

                      </div>

                      <div className="mt-1 text-xs text-slate-500">

                        {student.guardian_mobile}

                      </div>

                    </td>



                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-400">

                      {formatDate(student.created_at)}

                    </td>



                    <td className="px-4 py-4">

                      <StatusBadge status={student.status} />

                    </td>



                    <td className="px-4 py-4 text-right">

                      <button

                        type="button"

                        onClick={() => openStudent(student)}

                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-3.5 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"

                      >

                        <Eye size={16} />

                        Review

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>



        <div className="mt-4 flex flex-col gap-1 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between dark:text-slate-400">

          <span>

            Showing {filteredStudents.length} of {students.length} records

          </span>

          <span>

            Needs correction: {counts.correction} · Rejected: {counts.rejected}

          </span>

        </div>

      </div>



      {selectedStudent && (

        <div

          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6"

          onMouseDown={(event) => {

            if (event.target === event.currentTarget) closeDetails();

          }}

        >

          <section

            role="dialog"

            aria-modal="true"

            aria-labelledby="student-review-title"

            className="my-4 w-full max-w-5xl overflow-hidden rounded-3xl bg-slate-50 shadow-2xl dark:bg-slate-950"

          >

            <header className="flex items-start justify-between gap-4 bg-gradient-to-r from-slate-950 via-red-900 to-red-700 p-5 text-white sm:p-7">

              <div className="min-w-0">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-100/80">

                  Registered Student Review

                </p>

                <h2

                  id="student-review-title"

                  className="mt-2 break-words text-2xl font-black sm:text-3xl"

                >

                  {selectedStudent.student_name}

                </h2>

                <p className="mt-2 break-all text-sm text-red-100">

                  Reference: {selectedStudent.reference_number}

                </p>

              </div>



              <button

                type="button"

                onClick={closeDetails}

                aria-label="Close student details"

                className="shrink-0 rounded-xl border border-white/20 bg-white/10 p-2.5 transition hover:bg-white/20"

              >

                <X size={21} />

              </button>

            </header>



            <div className="max-h-[calc(100vh-180px)] space-y-6 overflow-y-auto p-4 sm:p-7">

              {detailsLoading && (

                <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-950/30 dark:text-blue-200">

                  <RefreshCw size={18} className="animate-spin" />

                  Loading complete student details...

                </div>

              )}



              {error && (

                <div

                  role="alert"

                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/30 dark:text-red-200"

                >

                  {error}

                </div>

              )}



              {success && (

                <div

                  role="status"

                  className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"

                >

                  {success}

                </div>

              )}



              <section>

                <h3 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">

                  <UserRound size={19} className="text-red-600" />

                  Student Information

                </h3>



                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                  <InfoItem label="Student Name" value={selectedStudent.student_name} />

                  <InfoItem label="Admission Number" value={selectedStudent.admission_number} />

                  <InfoItem label="Academic Session" value={selectedStudent.academic_session} />

                  <InfoItem label="Date of Birth" value={formatDate(selectedStudent.date_of_birth)} />

                  <InfoItem label="Gender" value={selectedStudent.gender} />

                  <InfoItem label="Current Class" value={selectedStudent.current_class} />

                  <InfoItem label="Section" value={selectedStudent.section} />

                  <InfoItem label="Religion" value={selectedStudent.religion} />

                  <InfoItem label="Category" value={selectedStudent.category} />

                  <InfoItem label="Blood Group" value={selectedStudent.blood_group} />

                  <InfoItem label="APAAR ID" value={selectedStudent.apaar_id} />

                  <InfoItem label="Declaration Accepted" value={selectedStudent.declaration_accepted} />

                  <InfoItem label="Submitted On" value={formatDate(selectedStudent.created_at)} />

                  <InfoItem label="Last Updated" value={formatDate(selectedStudent.updated_at)} />

                </div>



                <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">

                  <ShieldCheck size={16} className="mr-2 inline" />

                  Aadhaar number is not displayed in this table. Review identity documents only through the authorized secure document viewer.

                </div>

              </section>



              <section>

                <h3 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">

                  <Phone size={19} className="text-red-600" />

                  Parent / Guardian

                </h3>



                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                  <InfoItem label="Guardian Name" value={selectedStudent.guardian_name} />

                  <InfoItem label="Relationship" value={selectedStudent.guardian_relation} />

                  <InfoItem label="Mobile Number" value={selectedStudent.guardian_mobile} />

                  <InfoItem label="Alternate Mobile" value={selectedStudent.alternate_mobile} />

                  <InfoItem label="Email" value={selectedStudent.guardian_email} />

                  <InfoItem label="Emergency Contact" value={selectedStudent.emergency_contact} />

                </div>

              </section>



              <section>

                <h3 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">

                  <MapPin size={19} className="text-red-600" />

                  Address

                </h3>



                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                  <InfoItem label="Address" value={selectedStudent.address_line} />

                  <InfoItem label="City" value={selectedStudent.city} />

                  <InfoItem label="State" value={selectedStudent.state} />

                  <InfoItem label="PIN Code" value={selectedStudent.postal_code} />

                </div>

              </section>



              <section>

                <h3 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-900 dark:text-white">

                  <CalendarDays size={19} className="text-red-600" />

                  Submitted Documents

                </h3>



                {!selectedStudent.documents?.length ? (

                  <div className="rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">

                    No document metadata was returned by the admin API.

                  </div>

                ) : (

                  <div className="grid gap-3 sm:grid-cols-2">

                    {selectedStudent.documents.map((document) => (

                      <div

                        key={document.id}

                        className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"

                      >

                        <div className="rounded-xl bg-red-50 p-3 text-red-700 dark:bg-red-950/40 dark:text-red-300">

                          <FileText size={21} />

                        </div>



                        <div className="min-w-0 flex-1">

                          <p className="break-words text-sm font-bold text-slate-800 dark:text-slate-100">

                            {DOCUMENT_LABELS[document.document_type] ??

                              document.document_type}

                          </p>

                          <p className="mt-1 break-all text-xs text-slate-500">

                            {document.original_filename}

                          </p>

                          {typeof document.file_size_bytes === "number" && (

                            <p className="mt-1 text-xs text-slate-400">

                              {(document.file_size_bytes / 1024).toFixed(0)} KB

                            </p>

                          )}

                        </div>



                        {document.url && (

                          <a

                            href={document.url}

                            target="_blank"

                            rel="noopener noreferrer"

                            className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"

                          >

                            View

                          </a>

                        )}

                      </div>

                    ))}

                  </div>

                )}



                <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-400">

                  Document links must be short-lived signed URLs created by the protected server API. Do not make the storage bucket public.

                </p>

              </section>



              <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900">

                <h3 className="text-lg font-black text-slate-900 dark:text-white">

                  Review Decision

                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                  Update the review status and save an internal note.

                </p>



                <div className="mt-4 grid gap-4 md:grid-cols-2">

                  <label className="block">

                    <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">

                      Application Status

                    </span>

                    <select

                      value={newStatus}

                      onChange={(event) =>

                        setNewStatus(event.target.value as StudentStatus)

                      }

                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"

                    >

                      {STATUSES.map((status) => (

                        <option key={status} value={status}>

                          {status}

                        </option>

                      ))}

                    </select>

                  </label>



                  <label className="block">

                    <span className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-200">

                      Admin Notes

                    </span>

                    <textarea

                      rows={3}

                      value={adminNotes}

                      onChange={(event) => setAdminNotes(event.target.value)}

                      maxLength={2000}

                      placeholder="Record missing details or explain the correction required..."

                      className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"

                    />

                    <span className="mt-1 block text-right text-xs text-slate-400">

                      {adminNotes.length}/2000

                    </span>

                  </label>

                </div>



                <div className="mt-4 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                  <button

                    type="button"

                    onClick={closeDetails}

                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"

                  >

                    Close

                  </button>



                  <button

                    type="button"

                    onClick={() => void saveStudentReview()}

                    disabled={saving || detailsLoading}

                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"

                  >

                    {saving ? (

                      <RefreshCw size={17} className="animate-spin" />

                    ) : (

                      <Save size={17} />

                    )}

                    {saving ? "Saving..." : "Save Review"}

                  </button>

                </div>

              </section>

            </div>

          </section>

        </div>

      )}

    </div>

  );

}
