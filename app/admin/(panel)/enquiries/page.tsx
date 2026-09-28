import { createClient } from "@/lib/supabase/server";
import DeleteButton from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const supabase = await createClient();

  const { data: enquiries, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <p className="text-red-500">
        {error.message}
      </p>
    );
  }

  return (
    <div className="space-y-6 p-2 md:p-4">
      <header className="overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-900 via-red-800 to-red-600 p-7 text-white shadow-[0_30px_60px_-24px_rgba(127,29,29,0.5)] md:p-9">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-red-100/80">
              Inbox
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-5xl">
              Contact Enquiries
            </h1>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
            <div className="text-xs uppercase tracking-[0.2em] text-red-100/80">
              Total
            </div>
            <div className="mt-1 text-2xl font-black">
              {enquiries?.length ?? 0}
            </div>
          </div>
        </div>

        <p className="mt-5 max-w-2xl text-lg text-red-50/90">
          View and manage all enquiries submitted through the school website.
        </p>
      </header>

      {!enquiries?.length ? (
        <div className="rounded-[30px] border border-dashed border-red-200 bg-white p-12 text-center shadow-[0_18px_40px_-24px_rgba(15,23,42,0.18)]">
          <p className="text-xl font-semibold text-slate-600">
            No enquiries received yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {enquiries.map((item) => (
            <div
              key={item.id}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_46px_-26px_rgba(15,23,42,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_-22px_rgba(239,68,68,0.25)] md:p-7"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-black text-red-700 md:text-3xl">
                      {item.name}
                    </h2>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-red-700">
                      enquiry
                    </span>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        Phone
                      </span>
                      <span className="mt-1 block text-base font-medium text-slate-800">
                        {item.phone}
                      </span>
                    </p>

                    <p className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <span className="block text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                        Email
                      </span>
                      <span className="mt-1 block text-base font-medium text-slate-800">
                        {item.email || "N/A"}
                      </span>
                    </p>
                  </div>

                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                      Message
                    </p>
                    <p className="mt-3 whitespace-pre-line text-base leading-7 text-slate-700">
                      {item.message}
                    </p>
                  </div>

                  <div className="mt-5">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                      {new Date(item.created_at).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="flex justify-end lg:pt-2">
                  <DeleteButton id={item.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}