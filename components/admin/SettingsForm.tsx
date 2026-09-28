"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Save,
  School,
  Phone,
  Mail,
  MapPin,
  Clock,
  GraduationCap,
  User,
  Loader2,
  CheckCircle2,
} from "lucide-react";

interface Settings {
  id: number;
  school_name: string | null;
  tagline: string | null;
  phone: string | null;
  email: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  city: string | null;
  state: string | null;
  school_timing: string | null;
  working_days: string | null;
  admission_session: string | null;
  admissions_open: boolean;
  principal_name: string | null;
  principal_message: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
}

export default function SettingsForm({
  settings,
}: {
  settings: Settings;
}) {
  const supabase = createClient();

  const [form, setForm] = useState({
    school_name: settings.school_name ?? "",
    tagline: settings.tagline ?? "",
    phone: settings.phone ?? "",
    email: settings.email ?? "",
    address_line_1: settings.address_line_1 ?? "",
    address_line_2: settings.address_line_2 ?? "",
    city: settings.city ?? "",
    state: settings.state ?? "",
    school_timing: settings.school_timing ?? "",
    working_days: settings.working_days ?? "",
    admission_session: settings.admission_session ?? "",
    admissions_open: settings.admissions_open ?? false,
    principal_name: settings.principal_name ?? "",
    principal_message: settings.principal_message ?? "",
    facebook_url: settings.facebook_url ?? "",
    instagram_url: settings.instagram_url ?? "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSuccess(false);
    setErrorMessage("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setErrorMessage("");

    try {
      const { error } = await supabase
        .from("school_settings")
        .update({
          ...form,
          updated_at: new Date().toISOString(),
        })
        .eq("id", settings.id);

      if (error) {
        console.error(error);
        setErrorMessage(error.message);
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Something went wrong while saving settings."
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-red-400 focus:bg-white focus:ring-4 focus:ring-red-100";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-7"
    >
      {/* SCHOOL INFORMATION */}

      <section className="rounded-[28px] border border-red-100 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(127,29,29,0.25)] sm:p-7">
        <div className="mb-7 flex items-center gap-3">

          <div className="rounded-2xl bg-gradient-to-br from-red-700 to-orange-500 p-3 text-white shadow-lg shadow-red-100">
            <School size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              School Information
            </h2>

            <p className="text-sm text-slate-500">
              Basic information displayed across the website.
            </p>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* SCHOOL NAME */}

          <label className="font-semibold text-slate-700">
            School Name

            <input
              type="text"
              name="school_name"
              value={form.school_name}
              onChange={handleChange}
              placeholder="Enter school name"
              className={inputClass}
              required
            />
          </label>

          {/* TAGLINE */}

          <label className="font-semibold text-slate-700">
            Tagline

            <input
              type="text"
              name="tagline"
              value={form.tagline}
              onChange={handleChange}
              placeholder="Enter school tagline"
              className={inputClass}
            />
          </label>

        </div>
      </section>

      {/* CONTACT INFORMATION */}

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.25)] sm:p-7">

        <div className="mb-7 flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-red-700 to-orange-500 p-3 text-white shadow-lg shadow-red-100">
            <MapPin size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Contact Information</h2>
            <p className="text-sm text-slate-500">How families and visitors can reach the school.</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {/* PHONE */}

          <label className="font-semibold text-slate-700">

            <span className="flex items-center gap-2">
              <Phone size={17} />
              Phone
            </span>

            <input
              type="tel"
              name="phone"
              value={form.phone}
              maxLength={10}
              inputMode="numeric"
              placeholder="Enter 10 digit mobile number"
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);

                setForm((prev) => ({
                  ...prev,
                  phone: value,
                }));

                setSuccess(false);
                setErrorMessage("");
              }}
              className={inputClass}
              required
            />

          </label>

          {/* EMAIL */}

          <label className="font-semibold text-slate-700">

            <span className="flex items-center gap-2">
              <Mail size={17} />
              Email
            </span>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter school email"
              className={inputClass}
              required
            />

          </label>

          {/* ADDRESS LINE 1 */}

          <label className="font-semibold text-slate-700">

            <span className="flex items-center gap-2">
              <MapPin size={17} />
              Address Line 1
            </span>

            <input
              type="text"
              name="address_line_1"
              value={form.address_line_1}
              onChange={handleChange}
              placeholder="Enter address"
              className={inputClass}
            />

          </label>

          {/* ADDRESS LINE 2 */}

          <label className="font-semibold text-slate-700">

            Address Line 2

            <input
              type="text"
              name="address_line_2"
              value={form.address_line_2}
              onChange={handleChange}
              placeholder="Enter additional address"
              className={inputClass}
            />

          </label>

          {/* CITY */}

          <label className="font-semibold text-slate-700">

            City

            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Enter city"
              className={inputClass}
            />

          </label>

          {/* STATE */}

          <label className="font-semibold text-slate-700">

            State

            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="Enter state"
              className={inputClass}
            />

          </label>

        </div>
      </section>

      {/* SCHOOL TIMINGS */}

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.25)] sm:p-7">

        <div className="mb-7 flex items-center gap-3">

          <div className="rounded-2xl bg-gradient-to-br from-red-700 to-orange-500 p-3 text-white shadow-lg shadow-red-100">
            <Clock size={22} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              School Timings
            </h2>

            <p className="text-sm text-slate-500">
              Manage school working days and timings.
            </p>
          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          <label className="font-semibold text-slate-700">

            Working Days

            <input
              type="text"
              name="working_days"
              value={form.working_days}
              onChange={handleChange}
              placeholder="Example: Monday - Saturday"
              className={inputClass}
            />

          </label>

          <label className="font-semibold text-slate-700">

            School Timing

            <input
              type="text"
              name="school_timing"
              value={form.school_timing}
              onChange={handleChange}
              placeholder="Example: 8:00 AM - 2:00 PM"
              className={inputClass}
            />

          </label>

        </div>
      </section>

      {/* ADMISSION SETTINGS */}

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.25)] sm:p-7">

        <div className="mb-7 flex items-center gap-3">

          <div className="rounded-2xl bg-gradient-to-br from-red-700 to-orange-500 p-3 text-white shadow-lg shadow-red-100">
            <GraduationCap size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Admission Settings
            </h2>

            <p className="text-sm text-slate-500">
              Manage admission session and availability.
            </p>
          </div>

        </div>

        {/* SESSION */}

        <label className="block font-semibold text-slate-700">

          Admission Session

          <input
            type="text"
            name="admission_session"
            value={form.admission_session}
            onChange={handleChange}
            placeholder="Example: 2026-27"
            className={inputClass}
          />

        </label>

        {/* ADMISSION TOGGLE */}

        <div className="mt-6 flex items-center justify-between rounded-2xl border border-red-100 bg-red-50/50 p-5">

          <div>

            <p className="font-bold text-slate-900">
              Admissions Open
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Controls admission availability on the website.
            </p>

          </div>

          <button
            type="button"
            onClick={() => {
              setForm((prev) => ({
                ...prev,
                admissions_open: !prev.admissions_open,
              }));

              setSuccess(false);
              setErrorMessage("");
            }}
            className={`relative h-7 w-14 rounded-full transition ${
              form.admissions_open
                ? "bg-green-600"
                : "bg-slate-300"
            }`}
          >

            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${
                form.admissions_open
                  ? "left-8"
                  : "left-1"
              }`}
            />

          </button>

        </div>

      </section>

      {/* PRINCIPAL INFORMATION */}

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.25)] sm:p-7">

        <div className="mb-7 flex items-center gap-3">

          <div className="rounded-2xl bg-gradient-to-br from-red-700 to-orange-500 p-3 text-white shadow-lg shadow-red-100">
            <User size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Principal Information
            </h2>

            <p className="text-sm text-slate-500">
              Information shown in the Principal's Message section.
            </p>
          </div>

        </div>

        {/* PRINCIPAL NAME */}

        <label className="block font-semibold text-slate-700">

          Principal Name

          <input
            type="text"
            name="principal_name"
            value={form.principal_name}
            onChange={handleChange}
            placeholder="Enter principal name"
            className={inputClass}
          />

        </label>

        {/* PRINCIPAL MESSAGE */}

        <label className="mt-6 block font-semibold text-slate-700">

          Principal Message

          <textarea
            name="principal_message"
            value={form.principal_message}
            onChange={handleChange}
            rows={5}
            placeholder="Enter principal's message"
            className={inputClass}
          />

        </label>

      </section>

      {/* SOCIAL MEDIA */}

      <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(15,23,42,0.25)] sm:p-7">

        <h2 className="mb-2 text-xl font-bold text-slate-900">
          Social Media
        </h2>

        <p className="mb-7 text-sm text-slate-500">
          Add your school's social media links.
        </p>

        <div className="grid gap-6 md:grid-cols-2">

          {/* FACEBOOK */}

          <label className="font-semibold text-slate-700">

            Facebook URL

            <input
              type="url"
              name="facebook_url"
              value={form.facebook_url}
              onChange={handleChange}
              placeholder="https://facebook.com/..."
              className={inputClass}
            />

          </label>

          {/* INSTAGRAM */}

          <label className="font-semibold text-slate-700">

            Instagram URL

            <input
              type="url"
              name="instagram_url"
              value={form.instagram_url}
              onChange={handleChange}
              placeholder="https://instagram.com/..."
              className={inputClass}
            />

          </label>

        </div>

      </section>

      {/* ERROR MESSAGE */}

      {errorMessage && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 font-medium text-red-700 shadow-sm">
          {errorMessage}
        </div>
      )}

      {/* SUCCESS MESSAGE */}

      {success && (
        <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 font-semibold text-green-700 shadow-sm">
          <CheckCircle2 size={20} />
          Settings saved successfully.
        </div>
      )}

      {/* SAVE BUTTON */}

      <div className="sticky bottom-5 flex justify-end rounded-2xl border border-red-100 bg-white/90 p-4 shadow-[0_18px_45px_-20px_rgba(127,29,29,0.35)] backdrop-blur">

        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-700 to-orange-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 hover:shadow-red-300 disabled:cursor-not-allowed disabled:opacity-50"
        >

          {loading ? (
            <>
              <Loader2
                size={19}
                className="animate-spin"
              />

              Saving...
            </>
          ) : (
            <>
              <Save size={19} />

              Save Changes
            </>
          )}

        </button>

      </div>

    </form>
  );
}