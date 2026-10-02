"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Bell,
  CalendarDays,
  Eye,
  EyeOff,
  Megaphone,
  Plus,
  Sparkles,
  Trash2,
  Pencil,
  X,
} from "lucide-react";
const supabase = createClient();

export default function NoticesPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [notices, setNotices] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const publishedCount = notices.filter(
    (notice) => notice.status === "Published",
  ).length;
  const hiddenCount = notices.filter(
    (notice) => notice.status !== "Published",
  ).length;

  async function fetchNotices() {
    const { data } = await supabase
      .from("notices")
      .select("*")
      .order("created_at", { ascending: false });

    setNotices(data || []);
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  async function addNotice() {
  const cleanTitle = title.trim();
  const cleanDescription = description.trim();

  if (!cleanTitle || !cleanDescription) {
    alert("Please enter both notice title and message.");
    return;
  }

  if (cleanTitle.length > 100) {
    alert("Notice title cannot exceed 100 characters.");
    return;
  }

  if (cleanDescription.length > 500) {
    alert("Notice message cannot exceed 500 characters.");
    return;
  }

  setLoading(true);

  if (editingId !== null) {
    const { error } = await supabase
      .from("notices")
      .update({
        title: cleanTitle,
        description: cleanDescription,
      })
      .eq("id", editingId);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Notice Updated Successfully.");

    setTitle("");
    setDescription("");
    setEditingId(null);

    fetchNotices();
    return;
  }

  const { error } = await supabase.from("notices").insert({
    title: cleanTitle,
    description: cleanDescription,
    status: "Published",
  });

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Notice Published Successfully.");

  setTitle("");
  setDescription("");

  fetchNotices();
}

function startEdit(notice: any) {
  setEditingId(notice.id);
  setTitle(notice.title);
  setDescription(notice.description);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function cancelEdit() {
  setEditingId(null);
  setTitle("");
  setDescription("");
}


  async function deleteNotice(id: number) {
    if (!confirm("Delete this notice?")) return;

    await supabase.from("notices").delete().eq("id", id);

    fetchNotices();
  }

  async function toggleStatus(id: number, status: string) {
    const newStatus = status === "Published" ? "Hidden" : "Published";

    await supabase
      .from("notices")
      .update({ status: newStatus })
      .eq("id", id);

    fetchNotices();
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(239,68,68,0.16),_transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-900 via-red-900 to-red-600 p-6 text-white shadow-[0_24px_60px_-12px_rgba(127,29,29,0.55)] md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-red-50 backdrop-blur-sm">
                <Bell className="h-4 w-4" />
                School updates
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight md:text-5xl">
                  Notices & Announcements
                </h1>
                <p className="mt-2 max-w-xl text-sm text-red-50/90 md:text-base">
                  Keep students, parents, and staff informed with timely school updates and important notices.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
              <div className="rounded-xl bg-white/15 p-2 text-red-100">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-red-100/80">
                  Active
                </p>
                <p className="text-xl font-bold">{publishedCount}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
            <p className="text-sm font-medium text-slate-500">Total Notices</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-black text-slate-900">{notices.length}</span>
              <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700">
                Live
              </span>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-5 shadow-sm">
            <p className="text-sm font-medium text-emerald-700">Published</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-black text-emerald-900">{publishedCount}</span>
              <Eye className="h-6 w-6 text-emerald-600" />
            </div>
          </div>

          <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-5 shadow-sm">
            <p className="text-sm font-medium text-amber-700">Hidden</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-3xl font-black text-amber-900">{hiddenCount}</span>
              <EyeOff className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_1.9fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-[0_12px_30px_-12px_rgba(15,23,42,0.15)] backdrop-blur-sm md:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-red-100 p-2.5 text-red-700">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Publish New Notice</h2>
                <p className="text-sm text-slate-500">Create a school announcement</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Notice Title
                </label>
                <input
  placeholder="Enter notice title"
  value={title}
  maxLength={100}
  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
                />
                <p className="mt-1 text-right text-xs text-slate-500">
  {title.length}/100
</p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Message
                </label>
                <textarea
  rows={6}
  placeholder="Write the notice details here..."
  value={description}
  maxLength={500}
  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-red-300 focus:bg-white focus:ring-4 focus:ring-red-100"
                />
                <p className="mt-1 text-right text-xs text-slate-500">
  {description.length}/500
</p>
              </div>

              <div className="flex gap-2">
  <button
    onClick={addNotice}
    disabled={loading}
    className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-200 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
  >
    {editingId !== null ? (
      <Pencil className="h-4 w-4" />
    ) : (
      <Plus className="h-4 w-4" />
    )}

    {loading
      ? editingId !== null
        ? "Updating..."
        : "Publishing..."
      : editingId !== null
        ? "Update Notice"
        : "Publish Notice"}
  </button>

  {editingId !== null && (
    <button
      type="button"
      onClick={cancelEdit}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-200"
    >
      <X className="h-4 w-4" />
      Cancel
    </button>
  )}
</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Recent Notices</h2>
                <p className="text-sm text-slate-500">Manage all public announcements</p>
              </div>
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                {notices.length} items
              </span>
            </div>

            {notices.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 p-12 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <Bell className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">No notices yet</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Publish your first announcement to keep the school community informed.
                </p>
              </div>
            ) : (
              notices.map((notice) => (
                <article
                  key={notice.id}
                  className="group rounded-[26px] border border-slate-200 bg-gradient-to-br from-white via-red-50/40 to-orange-50/60 p-5 shadow-[0_12px_28px_-14px_rgba(15,23,42,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-16px_rgba(15,23,42,0.25)]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${
                            notice.status === "Published"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {notice.status}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Date(notice.created_at).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 md:text-2xl">
                        {notice.title}
                      </h3>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700 md:text-[15px]">
                        {notice.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-2 md:flex-col">
                      <button
  type="button"
  onClick={() => startEdit(notice)}
  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-100 px-3.5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-200"
>
  <Pencil className="h-4 w-4" />
  Edit
</button>
                      <button
                        onClick={() => toggleStatus(notice.id, notice.status)}
                        className={`inline-flex items-center justify-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm font-semibold transition ${
                          notice.status === "Published"
                            ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                            : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        }`}
                      >
                        {notice.status === "Published" ? (
                          <>
                            <EyeOff className="h-4 w-4" /> Hide
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4" /> Publish
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => deleteNotice(notice.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
                      >
                        <Trash2 className="h-4 w-4" /> Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}