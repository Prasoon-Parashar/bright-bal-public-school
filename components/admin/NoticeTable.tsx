"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Pencil,
  Trash2,
  CalendarDays,
  Save,
  X,
  BellRing,
} from "lucide-react";

type Notice = {
  id: number;
  title: string;
  description: string;
  notice_date: string;
};

export default function NoticeTable() {
  const supabase = createClient();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  async function loadNotices() {
    setLoading(true);

    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("notice_date", { ascending: false });

    setNotices(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadNotices();
  }, []);

  async function saveNotice() {
    if (!title || !description || !date) {
      alert("Please fill all fields.");
      return;
    }

    if (editing) {
      await supabase
        .from("notices")
        .update({
          title,
          description,
          notice_date: date,
        })
        .eq("id", editing);
    } else {
      await supabase.from("notices").insert({
        title,
        description,
        notice_date: date,
      });
    }

    resetForm();
    loadNotices();
  }

  async function deleteNotice(id: number) {
    if (!confirm("Delete this notice?")) return;

    await supabase.from("notices").delete().eq("id", id);

    loadNotices();
  }

  function editNotice(notice: Notice) {
    setEditing(notice.id);
    setTitle(notice.title);
    setDescription(notice.description);
    setDate(notice.notice_date);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditing(null);
    setTitle("");
    setDescription("");
    setDate("");
  }

  return (
    <div className="space-y-8">

      {/* FORM CARD */}
      <div className="overflow-hidden rounded-[30px] border border-red-100 bg-white shadow-[0_24px_60px_-30px_rgba(127,29,29,0.35)]">

        <div className="relative overflow-hidden bg-gradient-to-br from-red-800 via-red-600 to-orange-500 px-6 py-7 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 h-48 w-48 rounded-full bg-red-950/20 blur-3xl" />
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-sm">
              <BellRing size={25} />
            </div>
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-100/80">
                Notice centre
              </p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                {editing ? "Edit Notice" : "Add New Notice"}
              </h2>
              <p className="mt-1 text-sm text-red-50/90">
                Publish holidays, exams, events and announcements.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">

          <div className="grid gap-5 md:grid-cols-2">

            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Notice title</span>
              <input
                type="text"
                placeholder="Enter notice title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
              />
            </label>

            <label className="space-y-2">
              <span className="text-sm font-bold text-slate-700">Publication date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
              />
            </label>

          </div>

          <textarea
            rows={5}
            placeholder="Write notice description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100"
          />

          <div className="flex flex-wrap gap-4">

            <button
  type="button"
  onClick={saveNotice}
  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:shadow-red-300"
>
  <Save size={18} />
  {editing ? "Update Notice" : "Publish Notice"}
</button>
            {editing && (
             <button
  type="button"
  onClick={resetForm}
  className="flex items-center gap-2 rounded-2xl border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
>
  <X size={18} />
  Cancel
</button>
            )}

          </div>

        </div>

      </div>

      {/* NOTICE LIST */}
      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-34px_rgba(15,23,42,0.35)] sm:p-8">

        <div className="mb-8 flex items-center justify-between">
          <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-600">Published feed</p>
          <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
            All Notices
          </h2>
          </div>

          <span className="rounded-full border border-red-100 bg-red-50 px-4 py-2 text-sm font-bold text-red-700">
            {notices.length} Notice{notices.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <p className="text-slate-600">Loading notices...</p>
        ) : notices.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-slate-300 py-12 text-center">
            <BellRing size={40} className="mx-auto text-red-400 mb-3" />
            <p className="text-lg font-medium text-slate-700">
              No notices added yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {notices.map((notice, index) => (
              <div
                key={notice.id}
                className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-gradient-to-br from-white to-red-50/30 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-[0_20px_42px_-24px_rgba(185,28,28,0.35)] sm:p-6"
              >
                <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-red-500 to-orange-400" />

                <div className="flex flex-col gap-5 md:flex-row md:justify-between">

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      {index === 0 && (
                        <span className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
                          LATEST
                        </span>
                      )}

                      <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
                        <CalendarDays size={16} />
                        {new Date(notice.notice_date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </div>

                    </div>

                    <h3 className="mt-3 text-xl font-black text-slate-900 sm:text-2xl">
                      {notice.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {notice.description}
                    </p>

                  </div>

                  <div className="flex h-fit flex-wrap gap-2 md:justify-end">
<button
  type="button"
  onClick={() => editNotice(notice)}
  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-700"
>
  <Pencil size={16} />
  Edit
</button>

                    <button
  type="button"
  onClick={() => deleteNotice(notice.id)}
  className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-red-700"
>
  <Trash2 size={16} />
  Delete
</button>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}