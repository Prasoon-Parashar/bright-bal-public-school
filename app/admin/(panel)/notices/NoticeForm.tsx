"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  Bell,
  FileText,
  PlusCircle,
  CalendarDays,
} from "lucide-react";

export default function NoticeForm() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [noticeDate, setNoticeDate] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !noticeDate
    ) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    console.log({
  title,
  description,
  noticeDate,
});

    const { data, error } = await supabase
  .from("notices")
  .insert({
    title,
    description,
    notice_date: noticeDate,
  })
  .select();

console.log(data, error);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setDescription("");
    setNoticeDate("");

    alert("Notice Added Successfully!");

    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900"
    >

      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-8 py-6 text-white">

        <div className="flex items-center gap-3">

          <Bell size={30} />

          <div>

            <h2 className="text-3xl font-bold">
              Add New Notice
            </h2>

            <p className="mt-1 text-red-100">
              Publish a notice for students and parents.
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-7 p-8">

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-white">

            <FileText size={18} />

            Notice Title

          </label>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-slate-800 transition focus:border-red-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-white">

            <CalendarDays size={18} />

            Notice Date

          </label>

          <input
            type="date"
            value={noticeDate}
            onChange={(e) => setNoticeDate(e.target.value)}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-slate-800 transition focus:border-red-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold text-slate-700 dark:text-white">
            Notice Description
          </label>

          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write complete notice here..."
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-slate-800 transition focus:border-red-600 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />

        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 px-8 py-4 font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105 disabled:opacity-50"
        >

          <PlusCircle size={20} />

          {loading ? "Publishing..." : "Publish Notice"}

        </button>

      </div>

    </form>
  );
}