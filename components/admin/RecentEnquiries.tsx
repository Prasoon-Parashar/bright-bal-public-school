
import { createClient } from "@/lib/supabase/server";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default async function RecentEnquiries() {
  const supabase = await createClient();

  const { data: enquiries } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 md:p-7">
      {/* Header */}
      <div className="mb-5 flex min-w-0 items-start justify-between gap-3 sm:mb-6 sm:gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-red-600 sm:text-xs sm:tracking-[0.18em]">
            Inbox
          </p>

          <h2 className="mt-1 break-words text-xl font-black leading-tight text-slate-900 sm:text-2xl">
            Recent Enquiries
          </h2>
        </div>

        <div className="shrink-0 rounded-xl border border-red-100 bg-red-50 p-2.5 text-red-600 sm:rounded-2xl sm:p-3">
          <MessageSquare size={20} />
        </div>
      </div>

      {/* Enquiry List */}
      {enquiries && enquiries.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {enquiries.map((item) => (
            <article
              key={item.id}
              className="relative min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-white to-red-50/20 p-3 transition-colors hover:border-red-200 sm:rounded-2xl sm:p-4"
            >
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-red-500" />

              <div className="min-w-0 pl-1">
                <h3 className="break-words text-sm font-bold leading-5 text-slate-900 sm:text-base">
                  {item.name || "Unknown"}
                </h3>

                <div className="mt-2 flex min-w-0 items-start gap-2 text-sm text-slate-500">
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  <span className="min-w-0 break-all">
                    {item.email || "N/A"}
                  </span>
                </div>

                <div className="mt-1 flex min-w-0 items-start gap-2 text-sm text-slate-500">
                  <Phone size={14} className="mt-0.5 shrink-0" />
                  <span className="min-w-0 break-words">
                    {item.phone || "N/A"}
                  </span>
                </div>

                {item.message && (
                  <p className="mt-3 break-words text-sm leading-5 text-slate-600 sm:leading-6">
                    {item.message}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-3 py-8 text-center text-sm text-slate-500 sm:rounded-2xl sm:py-10">
          <MessageSquare
            className="mx-auto mb-3 text-slate-300"
            size={28}
          />
          No enquiries found.
        </div>
      )}
    </section>
  );
}
