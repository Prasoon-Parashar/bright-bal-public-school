import { createClient } from "@/lib/supabase/server";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default async function RecentEnquiries() {
  const supabase = await createClient();

  const { data: enquiries } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.35)] sm:p-7">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">Inbox</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900">Recent Enquiries</h2>
        </div>
        <div className="rounded-2xl border border-red-100 bg-red-50 p-3 text-red-600">
          <MessageSquare size={22} />
        </div>
      </div>

      {enquiries && enquiries.length > 0 ? (
        <div className="space-y-5">
          {enquiries.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-red-50/20 p-4 transition hover:-translate-y-0.5 hover:border-red-200 hover:shadow-lg"
            >
              <div className="absolute bottom-0 left-0 top-0 w-1 bg-red-500" />
              <h3 className="font-black text-slate-900">{item.name}</h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <Mail size={14} />
                {item.email}
              </div>

              <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <Phone size={14} />
                {item.phone}
              </div>

              <p className="mt-3 line-clamp-2 text-slate-600">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-10 text-center text-slate-500">
          <MessageSquare className="mx-auto mb-3 text-slate-300" size={28} />
          No enquiries found.
        </div>
      )}
    </div>
  );
}