
import RegisteredStudentTable from "./RegisteredStudentTable";

export default function RegisteredStudentsPage() {
  return (
    <section className="space-y-8 p-2 md:p-4">
      <header className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-red-800 to-red-600 p-7 text-white shadow-[0_30px_60px_-24px_rgba(127,29,29,0.5)] md:p-9">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-100/80">
              Student Records
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Registered Students
            </h1>

            <p className="mt-5 max-w-3xl text-lg text-red-50/90">
              Review submitted student records, verify documents, manage
              corrections and track verification status for existing students.
            </p>
          </div>

          <div className="shrink-0 rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-red-100/80">
              Management
            </div>
            <div className="mt-1 text-2xl font-black">
              Student Portal
            </div>
          </div>
        </div>
      </header>

      <RegisteredStudentTable />
    </section>
  );
}