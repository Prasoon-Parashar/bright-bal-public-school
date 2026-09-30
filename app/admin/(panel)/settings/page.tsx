"use client";
import { uploadSchoolImage } from "@/lib/supabase/storage";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import {
  School,
  Phone,
  Upload,
  Save,
  ShieldCheck,
  Bell,
  Settings,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const supabase = createClient();

export default function SettingsPage() {
  async function handleLogoUpload(file: File) {
    if (!settingsId) {
      setMessage({
        type: "error",
        text: "Settings are not ready yet. Please wait a moment and try again.",
      });
      return;
    }

    try {
      const url = await uploadSchoolImage(file, "logo");
      updateField("logoUrl", url);

      const { error } = await supabase
        .from("school_settings")
        .update({ logo_url: url })
        .eq("id", settingsId);

      if (error) {
        throw error;
      }

      setMessage({
        type: "success",
        text: "School logo updated successfully.",
      });
    } catch (error) {
      console.error("LOGO UPLOAD ERROR:", error);
      setMessage({
        type: "error",
        text: "Logo upload failed.",
      });
    }
  }

  async function deleteGalleryImages() {
    const { error } = await supabase
  .from("notices")
  .delete()
  .neq("id", 0);

    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }

    setMessage({ type: "success", text: "Gallery cleared successfully." });
  }

  async function deleteNotices() {
    const { error } = await supabase.from("notices").delete().neq("id", 0);

    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }

    setMessage({ type: "success", text: "Notices cleared successfully." });
  }
  const [settingsId, setSettingsId] = useState<number | null>(null);
  const [settings, setSettings] = useState({
    // About Section
aboutTitle: "",
aboutSubtitle: "",
aboutDescription: "",
aboutImage: "",
    
  // School
  schoolName: "Bright Bal Public School",
  tagline: "English Medium School",
  principal: "Principal Name",
  motto: "",
  udise: "",
  affiliation: "",

  // Contact
  phone: "",
  alternatePhone: "",
  whatsapp: "",
  email: "",
  website: "",
  address: "",
  mapUrl: "",

  // Social
  facebook: "",
  instagram: "",
  youtube: "",

  // Images
  logoUrl: "",
  faviconUrl: "",

  // Admission
  admissionOpen: true,
  admissionSession: "2027-28",
  admissionLastDate: "",
  admissionBanner: "🎓 Admissions Open for Session 2027-28",

  // Homepage
  heroTitle: "",
  heroSubtitle: "",
  principalMessage: "",

  // Website Controls
  maintenanceMode: false,
  maintenanceMessage: "",

  
});

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    setMessage(null);

const { data: rows, error } = await supabase
  .from("school_settings")
  .select("*")
  .order("id", { ascending: true })
  .limit(1);

const data = rows?.[0] ?? null;

    if (error || !data) {
      setMessage({
        type: "error",
        text: error?.message || "School settings could not be loaded.",
      });
      setLoading(false);
      return;
    }

    setSettingsId(data.id);
   setSettings({
  // About
  aboutTitle: data.about_title || "",
  aboutSubtitle: data.about_subtitle || "",
  aboutDescription: data.about_description || "",
  aboutImage: data.about_image || "",

  // School
  schoolName: data.school_name || "Bright Bal Public School",
  tagline: data.tagline || "English Medium School",
  principal: data.principal_name || "Nidhi Parashar",
  motto: data.motto || "",
  udise: data.udise_no || "",
  affiliation: data.affiliation_no || "",

  // Contact
  phone: data.phone || "",
  alternatePhone: data.alternate_phone || "",
  whatsapp: data.whatsapp || "",
  email: data.email || "",
  website: data.website || "",
  address: data.address || "",
  mapUrl: data.map_url || "",

  // Social
  facebook: data.facebook || "",
  instagram: data.instagram || "",
  youtube: data.youtube || "",

  // Images
  logoUrl: data.logo_url || "",
  faviconUrl: data.favicon_url || "",

  // Admission
  admissionOpen: data.admission_open ?? true,
  admissionSession: data.admission_session || "2027-28",
  admissionLastDate: data.admission_last_date || "",
  admissionBanner:
    data.admission_banner || "🎓 Admissions Open for Session 2027-28",

  // Homepage
  heroTitle: data.hero_title || "",
  heroSubtitle: data.hero_subtitle || "",
  principalMessage: data.principal_message || "",

  // Website Controls
  maintenanceMode: data.maintenance_mode ?? false,
  maintenanceMessage: data.maintenance_message || "",
});
    setLoading(false);
  }

  function updateField<K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K]
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setMessage(null);
  }
  async function toggleMaintenance() {
  if (!settingsId) return;

  const nextValue = !settings.maintenanceMode;

  setSettings((prev) => ({
    ...prev,
    maintenanceMode: nextValue,
  }));

  const { error } = await supabase
    .from("school_settings")
    .update({
      maintenance_mode: nextValue,
    })
    .eq("id", settingsId);

  if (error) {
    // Agar database update fail hua to toggle ko previous state par lao
    setSettings((prev) => ({
      ...prev,
      maintenanceMode: !nextValue,
    }));

    setMessage({
      type: "error",
      text: `Maintenance mode update failed: ${error.message}`,
    });

    return;
  }

  setMessage({
    type: "success",
    text: nextValue
      ? "Maintenance mode enabled."
      : "Maintenance mode disabled.",
  });
}


async function resetSettings() {
  if (!settingsId) return;

  const defaults = {
    school_name: "Bright Bal Public School",
    tagline: "English Medium School",
    principal_name: "Nidhi Parashar",
    motto: "Learn • Grow • Shine",

    phone: "",
    alternate_phone: "",
    whatsapp: "",
    email: "",
    website: "",
    address: "Agra, Uttar Pradesh",
    map_url: "",

    facebook: "",
    instagram: "",
    youtube: "",

    logo_url: "/logo/logo.png",
    favicon_url: "",

    about_title: "Building Strong Foundations for a Brighter Future",
    about_subtitle: "Welcome to Bright Bal Public School",
    about_description:
      "At Bright Bal Public School, every child receives quality education, discipline and values.",
    about_image: "/images/school-building.jpg.jpeg",

    hero_title: "Where Young Minds Build Bright Futures",
    hero_subtitle:
      "Quality education meets discipline, confidence and creativity.",

    admission_open: true,
    admission_session: "2027-28",
    admission_last_date: "",
    admission_banner: "🎓 Admissions Open for Session 2027-28",

    maintenance_mode: false,
    maintenance_message: "Website is under maintenance. We'll be back shortly.",
  };

  await supabase.from("school_settings").update(defaults).eq("id", settingsId);
  await fetchSettings();

  setMessage({
    type: "success",
    text: "Website reset successfully.",
  });
}

 async function saveSettings() {
  if (!settingsId || saving) return;

  setSaving(true);
  setMessage(null);

  try {
    const { data, error } = await supabase
      .from("school_settings")
      .update({

        about_title: settings.aboutTitle,
        about_subtitle: settings.aboutSubtitle,
        about_description: settings.aboutDescription,
        about_image: settings.aboutImage,

        school_name: settings.schoolName,
        tagline: settings.tagline,
        principal_name: settings.principal,
        motto: settings.motto,
        udise_no: settings.udise,
        affiliation_no: settings.affiliation,

        phone: settings.phone,
        alternate_phone: settings.alternatePhone,
        whatsapp: settings.whatsapp,
        email: settings.email,
        website: settings.website,
        address: settings.address,
        map_url: settings.mapUrl,

        facebook: settings.facebook,
        instagram: settings.instagram,
        youtube: settings.youtube,

        logo_url: settings.logoUrl,
        favicon_url: settings.faviconUrl,

        admission_open: settings.admissionOpen,
        admission_session: settings.admissionSession,
        admission_last_date: settings.admissionLastDate,
        admission_banner: settings.admissionBanner,

        hero_title: settings.heroTitle,
        hero_subtitle: settings.heroSubtitle,
        principal_message: settings.principalMessage,

        maintenance_mode: settings.maintenanceMode,
        maintenance_message: settings.maintenanceMessage,
      })
      .eq("id", settingsId)
      .select();

    if (error) {
      console.error("SAVE SETTINGS ERROR:", error);

      setMessage({
        type: "error",
        text: error.message,
      });

      return;
    }

    if (!data) {
      setMessage({
        type: "error",
        text: "Settings update failed. No row was updated.",
      });

      return;
    }

    setMessage({
      type: "success",
      text: "Settings saved successfully.",
    });

    await fetchSettings();
  } catch (err) {
    console.error("SETTINGS SAVE ERROR:", err);

    setMessage({
      type: "error",
      text: "Something went wrong while saving settings.",
    });

  } finally {
    setSaving(false);
  }
}

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <div className="h-32 animate-pulse rounded-[32px] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
        <div className="grid gap-6 lg:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-72 animate-pulse rounded-[28px] bg-slate-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-28">
      {message && (
        <div
          role="status"
          className={`rounded-2xl border p-4 font-semibold ${
            message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-r from-[#020617] via-[#450A0A] to-[#DC2626] p-8 text-white shadow-[0_25px_70px_rgba(127,29,29,0.45)]">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-red-500/30 blur-3xl" />
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-700/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-red-200">
              Bright Bal Admin Portal
            </p>

            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Bright Bal Public School
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-red-100">
              Manage school branding, admissions, notices, gallery, contact details
              and every website setting from one beautiful dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                🎓 Admin Control Center
              </div>

              <div className="rounded-full border border-red-300/20 bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 backdrop-blur">
  🎓 Session {settings.admissionSession}
</div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-red-50 backdrop-blur">
                <GraduationCap size={16} />
                Smart Learning
              </div>
            </div>
          </div>

          <div className="w-full max-w-xs rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-200">
              Live Status
            </p>

            <div className="mt-4 flex items-center gap-3">
  <span
    className={`h-3 w-3 rounded-full ${
      settings.maintenanceMode
        ? "bg-red-400"
        : "bg-emerald-400 animate-pulse"
    }`}
  />

  <span className="text-lg font-bold">
    {settings.maintenanceMode
      ? "Maintenance Mode"
      : "Website Active"}
  </span>
</div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-red-100">Workspace</span>
                <span className="font-bold">Settings</span>
              </div>

              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-red-100">Theme</span>
                <span className="font-bold">Bright Bal Red</span>
              </div>

              <div className="flex items-center justify-between">
  <span className="text-red-100">Portal</span>
  <span
    className={`font-bold ${
      settings.maintenanceMode
        ? "text-yellow-300"
        : "text-emerald-300"
    }`}
  >
    {settings.maintenanceMode ? "MAINTENANCE" : "LIVE"}
  </span>
</div>
            </div>
          </div>
        </div>
      </div>

      <Card title="School Information" icon={<School className="text-red-600" />}>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="School Name"
            value={settings.schoolName}
            onChange={(v) => updateField("schoolName", v)}
            placeholder="Bright Bal Public School"
          />

          <Input
            label="Tagline"
            value={settings.tagline}
            onChange={(v) => updateField("tagline", v)}
            placeholder="English Medium School"
          />

          <Input
            label="Principal Name"
            value={settings.principal}
            onChange={(v) => updateField("principal", v)}
            placeholder="Principal Name"
          />

          <Input
            label="School Motto"
            value={settings.motto}
            onChange={(v) => updateField("motto", v)}
            placeholder="Learn • Grow • Shine"
          />

          <Input
            label="UDISE Number"
            value={settings.udise}
            onChange={(v) => updateField("udise", v)}
            placeholder="Enter UDISE Number"
          />

          <Input
            label="Affiliation Number"
            value={settings.affiliation}
            onChange={(v) => updateField("affiliation", v)}
            placeholder="Enter Affiliation Number"
          />

          <div className="md:col-span-2 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border bg-red-50 p-6 text-center">
              <label className="block text-sm font-bold text-red-700">
                School Logo
              </label>

              <div className="mt-4 flex justify-center">
                <img
                  src={settings.logoUrl || "/logo/logo.png"}
                  alt="School logo"
                  className="h-28 w-28 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>

              <label className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-bold text-white transition hover:bg-red-700">
                <Upload size={18} />
                Upload Logo
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleLogoUpload(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Contact Information" icon={<Phone className="text-green-600" />}>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Primary Phone"
            value={settings.phone}
            onChange={(v) => updateField("phone", v)}
            placeholder="+91 9997157985"
          />

          <Input
            label="Alternate Phone"
            value={settings.alternatePhone}
            onChange={(v) => updateField("alternatePhone", v)}
            placeholder="+91 9876543210"
          />

          <Input
            label="WhatsApp Number"
            value={settings.whatsapp}
            onChange={(v) => updateField("whatsapp", v)}
            placeholder="+91 9997157985"
          />

          <Input
            label="Email Address"
            value={settings.email}
            onChange={(v) => updateField("email", v)}
            placeholder="brightbalp@gmail.com"
          />

          <Input
            label="Website URL"
            value={settings.website}
            onChange={(v) => updateField("website", v)}
            placeholder="www.brightbalpublicschool.in"
          />

          <Input
            label="Google Maps URL"
            value={settings.mapUrl}
            onChange={(v) => updateField("mapUrl", v)}
            placeholder="Paste Google Maps Link"
          />

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold text-slate-700">School Address</label>
            <textarea
              rows={4}
              value={settings.address}
              onChange={(e) => updateField("address", e.target.value)}
              placeholder="18/162 M.P. Pura, Tajganj, Agra - 282001"
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-100"
            />
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <h3 className="mb-5 text-lg font-bold text-slate-800">Social Media Links</h3>

          <div className="grid gap-5 md:grid-cols-3">
            <Input
              label="Facebook URL"
              value={settings.facebook}
              onChange={(v) => updateField("facebook", v)}
              placeholder="https://facebook.com/..."
            />

            <Input
              label="Instagram URL"
              value={settings.instagram}
              onChange={(v) => updateField("instagram", v)}
              placeholder="https://instagram.com/..."
            />

            <Input
              label="YouTube URL"
              value={settings.youtube}
              onChange={(v) => updateField("youtube", v)}
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      </Card>

      <Card title="About Section" icon={<School className="text-red-600" />}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <Input
              label="About Heading"
              value={settings.aboutTitle}
              onChange={(v) => updateField("aboutTitle", v)}
            />

            <Input
              label="About Subtitle"
              value={settings.aboutSubtitle}
              onChange={(v) => updateField("aboutSubtitle", v)}
            />

            <Input
              label="About Image URL"
              value={settings.aboutImage}
              onChange={(v) => updateField("aboutImage", v)}
            />
          </div>

          <div className="rounded-3xl border bg-slate-50 p-5">
            <label className="text-sm font-bold">About Description</label>
            <textarea
              rows={11}
              value={settings.aboutDescription}
              onChange={(e) => updateField("aboutDescription", e.target.value)}
              className="mt-3 w-full rounded-2xl border p-4 outline-none"
            />
          </div>

          {settings.aboutImage && (
            <img
              src={settings.aboutImage}
              alt="About"
              className="mt-6 h-72 w-full rounded-3xl object-cover shadow-xl"
            />
          )}
        </div>
      </Card>

      <Card title="Live Website Preview" icon={<Sparkles className="text-yellow-600" />}>
        <div className="rounded-[28px] border bg-gradient-to-br from-red-50 to-white p-6">
          <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">
            <div className="bg-red-700 px-5 py-3 text-white font-bold">Homepage Preview</div>

            <div className="grid gap-6 p-6 lg:grid-cols-2">
              <div>
                <Input
                  label="Hero Title"
                  value={settings.heroTitle}
                  onChange={(v) => updateField("heroTitle", v)}
                />

                <Input
                  label="Hero Subtitle"
                  value={settings.heroSubtitle}
                  onChange={(v) => updateField("heroSubtitle", v)}
                />

                <p className="mt-4 text-slate-600">{settings.heroSubtitle}</p>

                <button
                  type="button"
                  className="mt-6 rounded-xl bg-red-600 px-5 py-3 font-bold text-white"
                >
                  Apply for Admission
                </button>
              </div>

              <img
                src={settings.aboutImage || "/images/school-building.jpg.jpeg"}
                alt="School preview"
                className="h-60 rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card title="Admission Settings" icon={<ShieldCheck className="text-red-600" />}>
        <div className="space-y-8">
          <div className="rounded-3xl border border-red-100 bg-gradient-to-r from-red-50 via-white to-orange-50 p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                  ADMISSION STATUS
                </div>

                <h3 className="text-2xl font-black text-slate-900">
                  {settings.admissionOpen ? "Admissions are Open" : "Admissions are Closed"}
                </h3>

                <p className="text-slate-600">
                  Students can submit admission forms through the website only when this switch is enabled.
                </p>
              </div>

              <button
                type="button"
                onClick={() => updateField("admissionOpen", !settings.admissionOpen)}
                className={`relative h-12 w-24 rounded-full transition-all duration-300 ${
                  settings.admissionOpen ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                <span
                  className={`absolute top-1 h-10 w-10 rounded-full bg-white shadow-md transition-all duration-300 ${
                    settings.admissionOpen ? "left-[52px]" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Admission Session"
              value={settings.admissionSession}
              onChange={(v) => updateField("admissionSession", v)}
              placeholder="2027-28"
            />

            <Input
              label="Admission Last Date"
              value={settings.admissionLastDate}
              onChange={(v) => updateField("admissionLastDate", v)}
              placeholder="31 March 2027"
            />

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-bold text-slate-700">
                Admission Banner
              </label>

              <textarea
                rows={3}
                value={settings.admissionBanner}
                onChange={(e) => updateField("admissionBanner", e.target.value)}
                placeholder="🎓 Admissions Open for Session 2027-28"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-red-600 focus:ring-4 focus:ring-red-100"
              />
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-lg">
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-orange-500 p-6 text-white">
              <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-bold">
                {settings.admissionOpen ? "OPEN NOW" : "CLOSED"}
              </span>

              <h3 className="mt-4 text-3xl font-black">
                Admissions {settings.admissionSession}
              </h3>

              <p className="mt-3 text-red-100">
                {settings.admissionBanner || "Admissions are open for the new academic session."}
              </p>

              <div className="mt-5 rounded-xl bg-white/10 p-4 backdrop-blur">
                <p className="text-sm text-red-100">Last Date</p>
                <p className="text-lg font-bold">
                  {settings.admissionLastDate || "Not Added"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Website Controls" icon={<Settings className="text-violet-600" />}>
        <div className="space-y-6">
          <div className="rounded-3xl border border-violet-100 bg-gradient-to-r from-violet-50 via-white to-purple-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-slate-900">Maintenance Mode</p>
                <p className="text-slate-600">
                  Show a maintenance page instead of the website.
                </p>
              </div>

              <button
                type="button"
                onClick={toggleMaintenance}
                className={`relative h-11 w-24 rounded-full transition-all ${
                  settings.maintenanceMode ? "bg-red-500" : "bg-emerald-500"
                }`}
              >
                <span
                  className={`absolute top-1 h-9 w-9 rounded-full bg-white shadow-md transition-all ${
                    settings.maintenanceMode ? "left-14" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">
              Maintenance Message
            </label>

            <textarea
              rows={4}
              value={settings.maintenanceMessage}
              onChange={(e) => updateField("maintenanceMessage", e.target.value)}
              placeholder="Website is under maintenance. We'll be back shortly."
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-violet-600 focus:ring-4 focus:ring-violet-100"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              Maintenance Preview
            </p>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <div className="mb-3 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
                WEBSITE UNDER MAINTENANCE
              </div>

              <h4 className="text-xl font-black text-slate-900">We'll be back soon!</h4>

              <p className="mt-2 text-slate-600">
                {settings.maintenanceMessage ||
                  "Website is under maintenance. We'll be back shortly."}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Danger Zone" icon={<Bell className="text-red-600" />}>
        <div className="space-y-4 rounded-2xl border border-red-200 bg-red-50 p-4">
          <button
            type="button"
            className="w-full rounded-2xl border border-red-300 bg-white py-4 font-bold text-red-700 transition hover:bg-red-100"
            onClick={deleteGalleryImages}
          >
            Delete All Gallery Images
          </button>

          <button
            type="button"
            className="w-full rounded-2xl border border-red-300 bg-white py-4 font-bold text-red-700 transition hover:bg-red-100"
            onClick={deleteNotices}
          >
            Delete All Notices
          </button>

          <button
            type="button"
            onClick={resetSettings}
            className="w-full rounded-2xl bg-red-700 py-4 font-bold text-white hover:bg-red-800"
          >
            Reset Website Settings
          </button>
        </div>
      </Card>

      <div className="sticky bottom-4 z-40 flex justify-end pt-4">
  <div className="rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur">
    <button
      onClick={saveSettings}
      disabled={saving}
      className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-red-700 to-red-500 px-6 py-3.5 text-base font-bold text-white transition hover:from-red-800 hover:to-red-600 disabled:cursor-not-allowed disabled:opacity-60 sm:px-8"
    >
      <Save size={20} />
      {saving ? "Saving..." : "Save Changes"}
    </button>
  </div>
</div>
    </div>
  );
}

/* ---------- Card ---------- */

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(185,28,28,0.12)]">

      <div className="group flex items-center gap-3 border-b border-red-100 bg-gradient-to-r from-red-50/80 to-white px-6 py-5 sm:px-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-red-100">
          {icon}
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{title}</h2>
          <div className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-red-600 to-orange-400 transition-all group-hover:w-16" />
        </div>
      </div>

      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}

/* ---------- Input ---------- */

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition-all duration-200 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100"
      />
    </div>
  );
}