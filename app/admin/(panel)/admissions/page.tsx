import AdmissionTable from "./AdmissionTable";

export default function AdmissionsPage() {
  return (
    <section className="space-y-8 p-2 md:p-4">
      <header className="overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900 via-red-800 to-red-600 p-7 text-white shadow-[0_30px_60px_-24px_rgba(127,29,29,0.5)] md:p-9">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-red-100/80">
              Admissions
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Admission Applications
            </h1>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-red-100/80">
              Live
            </div>
            <div className="mt-1 text-2xl font-black">Portal</div>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-lg text-red-50/90">
          View, verify and manage student admission applications submitted through the Bright Bal Public School website.
        </p>
      </header>

      <AdmissionTable />
    </section>
  );
}