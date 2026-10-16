"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {

  ArrowRight,

  CheckCircle2,

  FileCheck2,

  FileText,

  GraduationCap,

  LockKeyhole,

  MapPin,

  ShieldCheck,

  Sparkles,

  UploadCloud,

  UserRound,

  Users,

  XCircle,

} from "lucide-react";

const inputClass =

  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

const labelClass = "block text-sm font-semibold text-slate-700";

const acceptedFileTypes = [

  "image/jpeg",

  "image/png",

  "application/pdf",

];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const documentFields = [

  {

    name: "student_photo",

    label: "Student Photograph",

    description: "Upload a recent passport-size photograph of the student.",

    required: true,

    accept: "image/jpeg,image/png",

  },

  {

    name: "aadhaar_card",

    label: "Aadhaar Card",

    description: "Upload the front and back together in one image or PDF.",

    required: true,

    accept: "image/jpeg,image/png,application/pdf",

  },

  {

    name: "birth_certificate",

    label: "Birth Certificate (if available)",

    description: "Preferred proof of date of birth. Upload if available.",

    required: false,

    accept: "image/jpeg,image/png,application/pdf",

  },

  {

    name: "affidavit",

    label: "Affidavit (if Birth Certificate is unavailable)",

    description: "Upload this only when the birth certificate is unavailable.",

    required: false,

    accept: "image/jpeg,image/png,application/pdf",

  },

  {

    name: "address_proof",

    label: "Address Proof",

    description: "Upload a valid document showing the current residential address.",

    required: true,

    accept: "image/jpeg,image/png,application/pdf",

  },

];

const religions = [

  "Hindu",

  "Muslim",

  "Christian",

  "Sikh",

  "Buddhist",

  "Jain",

  "Other",

  "Prefer not to disclose",

];

const categories = ["General", "OBC", "SC", "ST", "EWS", "Other"];

export default function RegisteredStudentsPage() {

  const [category, setCategory] = useState("General");

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [reference, setReference] = useState("");

  const [accepted, setAccepted] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState<Record<string, string>>(

    {}

  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {

    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    const aadhaar = form.elements.namedItem(

      "aadhaar_number"

    ) as HTMLInputElement | null;

  const fatherMobile = form.elements.namedItem(
  "father_mobile"
) as HTMLInputElement | null;

const motherMobile = form.elements.namedItem(
  "mother_mobile"
) as HTMLInputElement | null;

    const email = form.elements.namedItem(

      "guardian_email"

    ) as HTMLInputElement | null;

    if (aadhaar?.value && !/^\d{12}$/.test(aadhaar.value)) {

      setMessage("Aadhaar number must contain exactly 12 digits.");

      aadhaar.focus();

      return;

    }

if (
  !fatherMobile ||
  !/^[6-9]\d{9}$/.test(fatherMobile.value)
) {
  setMessage("Enter a valid 10-digit father's mobile number.");
  fatherMobile?.focus();
  return;
}

if (
  !motherMobile ||
  !/^[6-9]\d{9}$/.test(motherMobile.value)
) {
  setMessage("Enter a valid 10-digit mother's mobile number.");
  motherMobile?.focus();
  return;
}

    if (email?.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {

      setMessage("Enter a valid email address.");

      email.focus();

      return;

    }

    if (!accepted) {

      setMessage("Please accept the declaration before submitting.");

      return;

    }

    setLoading(true);

    setMessage("");

    setReference("");

    const formData = new FormData(form);

    formData.set("category", category);

    formData.set("declaration_accepted", "true");

    const birthCertificate = formData.get("birth_certificate") as File | null;

const affidavit = formData.get("affidavit") as File | null;

const hasBirthCertificate = Boolean(

  birthCertificate && birthCertificate.size > 0

);

const hasAffidavit = Boolean(affidavit && affidavit.size > 0);

if (!hasBirthCertificate && !hasAffidavit) {

  setMessage(

    "Please upload either a Birth Certificate or an Affidavit."

  );

  setLoading(false);

  return;

}

    try {

      const response = await fetch("/api/registered-students", {

        method: "POST",

        body: formData,

      });

      const result = await response.json();

      if (!response.ok) {

        throw new Error(

          result.error || "Submission failed. Please check your details."

        );

      }

      setReference(result.reference_number);

      setMessage("Your student record has been submitted successfully.");

      form.reset();

      setCategory("General");

      setAccepted(false);

      setSelectedFiles({});

      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {

      setMessage(

        error instanceof Error

          ? error.message

          : "Something went wrong. Please try again."

      );

    } finally {

      setLoading(false);

    }

  }

  function handleFileChange(name: string, file?: File) {

    if (!file) {

      setSelectedFiles((previous) => {

        const next = { ...previous };

        delete next[name];

        return next;

      });

      return;

    }

    if (!acceptedFileTypes.includes(file.type)) {

      setMessage("Only JPG, PNG and PDF files are allowed.");

      setSelectedFiles((previous) => {

        const next = { ...previous };

        delete next[name];

        return next;

      });

      return;

    }

    if (file.size > MAX_FILE_SIZE) {

      setMessage("Each document must be 5 MB or smaller.");

      setSelectedFiles((previous) => {

        const next = { ...previous };

        delete next[name];

        return next;

      });

      return;

    }

    setMessage("");

    setSelectedFiles((previous) => ({

      ...previous,

      [name]: file.name,

    }));

  }

  return (

    <main className="min-h-screen overflow-hidden bg-[#f5f7fb] pb-16">

      {/* Animated hero */}

      <section className="relative isolate overflow-hidden bg-[#101B33] text-white">

        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#101B33] via-[#12345A] to-[#1565C0]" />

        <motion.div

          initial={{ opacity: 0, scale: 0.7 }}

          animate={{ opacity: 0.18, scale: 1 }}

          transition={{ duration: 1.2 }}

          className="absolute -right-24 -top-32 -z-10 h-96 w-96 rounded-full bg-blue-300 blur-3xl"

        />

        <motion.div

          initial={{ opacity: 0, scale: 0.6 }}

          animate={{ opacity: 0.12, scale: 1 }}

          transition={{ duration: 1.4, delay: 0.2 }}

          className="absolute -bottom-40 -left-20 -z-10 h-96 w-96 rounded-full bg-red-500 blur-3xl"

        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.3fr_0.7fr] lg:py-24">

          <motion.div

            initial={{ opacity: 0, y: 28 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.65, ease: "easeOut" }}

          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-blue-100 backdrop-blur-md sm:text-sm">

              <GraduationCap size={18} />

              BRIGHT BAL PUBLIC SCHOOL · AGRA

            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">

              Registered Student

              <span className="mt-2 block bg-gradient-to-r from-blue-200 via-white to-red-200 bg-clip-text text-transparent">

                Record Update

              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base sm:leading-8">

              Keep your child&apos;s school records up to date. Submit the

              student&apos;s information and required documents through this

              online form for school verification.

            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur">

                <ShieldCheck size={18} className="text-emerald-300" />

                Secure submission

              </div>

              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm backdrop-blur">

                <FileCheck2 size={18} className="text-blue-200" />

                Document verification

              </div>

            </div>

          </motion.div>

          <motion.div

            initial={{ opacity: 0, x: 24, rotate: 2 }}

            animate={{ opacity: 1, x: 0, rotate: 0 }}

            transition={{ duration: 0.7, delay: 0.15 }}

            className="relative mx-auto w-full max-w-sm"

          >

            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

              <motion.div

                animate={{ y: [0, -6, 0] }}

                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}

                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#C62828] shadow-lg"

              >

                <GraduationCap size={34} />

              </motion.div>

              <p className="text-sm font-medium text-blue-100">

                Academic Session

              </p>

              <h2 className="mt-1 text-3xl font-extrabold">2026–27</h2>

              <div className="my-6 h-px bg-white/15" />

              <div className="space-y-4 text-sm text-blue-50">

                <p className="flex items-center gap-3">

                  <CheckCircle2 size={18} className="shrink-0 text-emerald-300" />

                  Fill in accurate student details

                </p>

                <p className="flex items-center gap-3">

                  <CheckCircle2 size={18} className="shrink-0 text-emerald-300" />

                  Upload clear supporting documents

                </p>

                <p className="flex items-center gap-3">

                  <CheckCircle2 size={18} className="shrink-0 text-emerald-300" />

                  Save your submission reference

                </p>

              </div>

            </div>

            <div className="absolute -bottom-4 -right-3 -z-10 h-full w-full rounded-3xl border border-blue-300/20" />

          </motion.div>

        </div>

      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        <motion.div

          initial={{ opacity: 0, y: 18 }}

          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.5, delay: 0.2 }}

          className="relative -mt-6 mb-8 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 shadow-sm sm:p-5"

        >

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">

            <FileText size={20} />

          </div>

          <div>

            <p className="font-bold text-amber-950">Before you begin</p>

            <p className="mt-1 text-sm leading-6 text-amber-900">

              This form is only for students already registered with the school.

              New admission applicants should use the Admissions page. Upload

              clear documents, and do not submit anyone else&apos;s information.

            </p>

          </div>

        </motion.div>

        <AnimatePresence>

          {message && (

            <motion.div

              initial={{ opacity: 0, y: -10, height: 0 }}

              animate={{ opacity: 1, y: 0, height: "auto" }}

              exit={{ opacity: 0, height: 0 }}

              role="status"

              className={`mb-6 overflow-hidden rounded-2xl border p-5 ${

                reference

                  ? "border-emerald-200 bg-emerald-50 text-emerald-900"

                  : "border-red-200 bg-red-50 text-red-800"

              }`}

            >

              <div className="flex items-start gap-3">

                {reference ? (

                  <CheckCircle2 className="mt-0.5 shrink-0" size={21} />

                ) : (

                  <XCircle className="mt-0.5 shrink-0" size={21} />

                )}

                <div className="min-w-0">

                  <p className="font-semibold">{message}</p>

                  {reference && (

                    <p className="mt-2 text-sm">

                      Reference number:{" "}

                      <strong className="select-all break-all">{reference}</strong>

                      <br />

                      Save this number for future communication.

                    </p>

                  )}

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">

          <FormSection

            icon={<UserRound size={21} />}

            number="01"

            title="Student Information"

            description="Enter the student's existing school and personal details."

            delay={0.05}

          >

            <div className="grid gap-5 sm:grid-cols-2">

              <Field label="Student's Full Name" name="student_name" required />

              <Field label="School Admission Number" name="admission_number" required />

              <Field label="Date of Birth" name="date_of_birth" type="date" required />

              <SelectField label="Gender" name="gender" required>

                <option value="">Select gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>

              </SelectField>

<SelectField

  label="Religion"

  name="religion"

  required

>

  <option value="">Select religion</option>

  {religions

    .filter((religion) => religion !== "Prefer not to disclose")

    .map((religion) => (

      <option key={religion} value={religion}>

        {religion}

      </option>

    ))}

</SelectField>

              <SelectField

                label="Category"

                name="category"

                required

                value={category}

                onChange={(value) => setCategory(value)}

              >

                {categories.map((item) => (

                  <option key={item} value={item}>{item}</option>

                ))}

              </SelectField>

              <Field

                label="Aadhaar Number"

                name="aadhaar_number"

                inputMode="numeric"

                maxLength={12}

                pattern="[0-9]{12}"

                placeholder="12 digits, numbers only"

                onInput={(value) => value.replace(/\D/g, "").slice(0, 12)}

              />

              <Field

                label="APAAR ID"

                name="apaar_id"

                maxLength={20}

                placeholder="Enter APAAR ID if available"

              />

              <SelectField label="Blood Group" name="blood_group">

                <option value="">Select if known</option>

                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map((v) => (

                  <option key={v} value={v}>{v}</option>

                ))}

              </SelectField>

              <SelectField label="Current Class" name="current_class" required>

                <option value="">Select current class</option>

                {[

                  "Nursery",

                  "LKG",

                  "UKG",

                  "Class I",

                  "Class II",

                  "Class III",

                  "Class IV",

                  "Class V",

                  "Class VI",

                  "Class VII",

                  "Class VIII",

                ].map((studentClass) => (

                  <option key={studentClass} value={studentClass}>

                    {studentClass}

                  </option>

                ))}

              </SelectField>

              <Field label="Section (if applicable)" name="section" placeholder="e.g. A" />

              <Field label="Academic Session" name="academic_session" defaultValue="2026-27" required />

            </div>

          </FormSection>

          <FormSection

            icon={<Users size={21} />}

            number="02"

            title="Parent / Guardian Information"

            description="Provide contact details for school communication."

            delay={0.1}

          >

           <div className="grid gap-5 sm:grid-cols-2">
  <Field
    label="Father's Full Name"
    name="father_name"
    required
    maxLength={100}
    placeholder="Enter father's full name"
  />

  <Field
    label="Father's Mobile Number"
    name="father_mobile"
    type="tel"
    inputMode="numeric"
    maxLength={10}
    pattern="[6-9][0-9]{9}"
    placeholder="10-digit Indian mobile number"
    required
    onInput={(value) => value.replace(/\D/g, "").slice(0, 10)}
  />

  <Field
    label="Mother's Full Name"
    name="mother_name"
    required
    maxLength={100}
    placeholder="Enter mother's full name"
  />

  <Field
    label="Mother's Mobile Number"
    name="mother_mobile"
    type="tel"
    inputMode="numeric"
    maxLength={10}
    pattern="[6-9][0-9]{9}"
    placeholder="10-digit Indian mobile number"
    required
    onInput={(value) => value.replace(/\D/g, "").slice(0, 10)}
  />

  <Field
    label="Email Address (optional)"
    name="guardian_email"
    type="email"
    maxLength={254}
    placeholder="parent@example.com"
  />

  <Field
    label="Emergency Contact (optional)"
    name="emergency_contact"
    type="tel"
    inputMode="numeric"
    maxLength={10}
    pattern="[6-9][0-9]{9}"
    placeholder="10-digit number"
    onInput={(value) => value.replace(/\D/g, "").slice(0, 10)}
  />
</div>

          </FormSection>

          <FormSection

            icon={<MapPin size={21} />}

            number="03"

            title="Residential Address"

            description="Enter the current residential address of the student."

            delay={0.15}

          >

            <div className="grid gap-5 sm:grid-cols-2">

              <Field label="Full Address / House Number" name="address_line" required />

              <Field label="City" name="city" defaultValue="Agra" required />

              <Field label="State" name="state" defaultValue="Uttar Pradesh" required />

              <Field

                label="PIN Code"

                name="postal_code"

                inputMode="numeric"

                maxLength={6}

                pattern="[0-9]{6}"

                placeholder="6-digit PIN code"

                required

                onInput={(value) => value.replace(/\D/g, "").slice(0, 6)}

              />

            </div>

          </FormSection>

          <FormSection

            icon={<UploadCloud size={21} />}

            number="04"

            title="Required Documents"

            description="Upload clear and readable documents. Maximum file size: 5 MB each."

            delay={0.2}

          >

            <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">

              <LockKeyhole size={20} className="mt-0.5 shrink-0 text-blue-700" />

              <p className="text-xs leading-6 text-blue-900 sm:text-sm">

                Documents may contain sensitive personal information. Upload

                only the required files. JPG, PNG and PDF are accepted.

                Aadhaar front and back should be combined into a single file.

              </p>

            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {documentFields.map((doc, index) => (

                <FileField

                  key={doc.name}

                  {...doc}

                  index={index}

                  fileName={selectedFiles[doc.name] || ""}

                  onFileChange={(file) => handleFileChange(doc.name, file)}

                />

              ))}

              <AnimatePresence mode="wait">

                {category === "OBC" || category === "SC" || category === "ST" ? (

                  <motion.div

                    key="caste"

                    initial={{ opacity: 0, y: 12 }}

                    animate={{ opacity: 1, y: 0 }}

                    exit={{ opacity: 0, y: -8 }}

                    transition={{ duration: 0.22 }}

                  >

                    <FileField

                      name="caste_certificate"

                      label="Caste Certificate"

                      description="Required for selected category"

                      accept="image/jpeg,image/png,application/pdf"

                      required

                      index={4}

                      fileName={selectedFiles.caste_certificate || ""}

                      onFileChange={(file) => handleFileChange("caste_certificate", file)}

                    />

                  </motion.div>

                ) : category === "EWS" ? (

                  <motion.div

                    key="ews"

                    initial={{ opacity: 0, y: 12 }}

                    animate={{ opacity: 1, y: 0 }}

                    exit={{ opacity: 0, y: -8 }}

                    transition={{ duration: 0.22 }}

                  >

                    <FileField

                      name="ews_certificate"

                      label="EWS Certificate"

                      description="Required for EWS category"

                      accept="image/jpeg,image/png,application/pdf"

                      required

                      index={5}

                      fileName={selectedFiles.ews_certificate || ""}

                      onFileChange={(file) => handleFileChange("ews_certificate", file)}

                    />

                  </motion.div>

                ) : null}

              </AnimatePresence>

            </div>

            <p className="mt-4 text-xs leading-6 text-slate-500">

              Other category certificates may be requested by the school during

              verification if applicable. No affidavit is required in this form.

            </p>

          </FormSection>

          <motion.section

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true, amount: 0.15 }}

            transition={{ duration: 0.45 }}

            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"

          >

            <div className="h-1.5 bg-gradient-to-r from-[#C62828] via-[#1565C0] to-[#101B33]" />

            <div className="p-5 sm:p-7">

              <div className="mb-5 flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#C62828]">

                  <ShieldCheck size={23} />

                </div>

                <div>

                  <h2 className="text-lg font-bold text-[#101B33]">

                    Declaration & Submission

                  </h2>

                  <p className="mt-1 text-sm text-slate-500">

                    Please review the information before submitting.

                  </p>

                </div>

              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/50">

                <input

                  id="declaration"

                  type="checkbox"

                  checked={accepted}

                  onChange={(event) => setAccepted(event.target.checked)}

                  className="mt-1 h-4 w-4 shrink-0 accent-[#C62828]"

                  required

                />

                <span className="text-sm leading-6 text-slate-600">

                  I declare that the information and documents provided are

                  accurate to the best of my knowledge. I understand that the

                  school may contact me for verification or corrections. *

                </span>

              </label>

              <motion.button

                type="submit"

                disabled={loading || !accepted}

                whileHover={!loading && accepted ? { scale: 1.01 } : undefined}

                whileTap={!loading && accepted ? { scale: 0.98 } : undefined}

                className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#C62828] to-[#a51e1e] px-5 py-4 font-bold text-white shadow-lg shadow-red-900/15 transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-64"

              >

                {loading ? (

                  <>

                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />

                    Submitting Record...

                  </>

                ) : (

                  <>

                    <ShieldCheck size={20} />

                    Submit Student Record

                    <ArrowRight size={18} />

                  </>

                )}

              </motion.button>

              <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">

                <LockKeyhole size={15} className="mt-0.5 shrink-0" />

                Submission does not mean automatic verification. The school

                will review the record and may request corrections.

              </p>

            </div>

          </motion.section>

        </form>

        <footer className="mt-10 text-center">

          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">

            <Sparkles size={16} className="text-[#C62828]" />

            Bright Bal Public School, Agra

          </div>

          <p className="text-xs text-slate-400">

            Student Record Update Portal · Academic Session 2026–27

          </p>

        </footer>

      </div>

    </main>

  );

}

function FormSection({

  icon,

  number,

  title,

  description,

  delay,

  children,

}: {

  icon: ReactNode;

  number: string;

  title: string;

  description: string;

  delay: number;

  children: ReactNode;

}) {

  return (

    <motion.section

      initial={{ opacity: 0, y: 24 }}

      whileInView={{ opacity: 1, y: 0 }}

      viewport={{ once: true, amount: 0.08 }}

      transition={{ duration: 0.48, delay, ease: "easeOut" }}

      className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md sm:rounded-3xl"

    >

      <div className="border-b border-slate-100 p-5 sm:p-7">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-blue-50 text-[#C62828]">

            {icon}

          </div>

          <div className="min-w-0 flex-1">

            <div className="flex flex-wrap items-center gap-2">

              <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-extrabold tracking-widest text-slate-500">

                STEP {number}

              </span>

            </div>

            <h2 className="mt-2 text-lg font-bold text-[#101B33] sm:text-xl">

              {title}

            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">

              {description}

            </p>

          </div>

        </div>

      </div>

      <div className="p-5 sm:p-7">{children}</div>

    </motion.section>

  );

}

function Field({

  label,

  name,

  type = "text",

  required = false,

  placeholder,

  defaultValue,

  inputMode,

  maxLength,

  pattern,

  onInput,

}: {

  label: string;

  name: string;

  type?: string;

  required?: boolean;

  placeholder?: string;

  defaultValue?: string;

  inputMode?: "text" | "numeric" | "tel" | "email" | "search" | "url" | "none" | "decimal";

  maxLength?: number;

  pattern?: string;

  onInput?: (value: string) => string;

}) {

  return (

    <div>

      <label htmlFor={name} className={labelClass}>

        {label}{required ? " *" : ""}

      </label>

      <input

        id={name}

        name={name}

        type={type}

        required={required}

        placeholder={placeholder}

        defaultValue={defaultValue}

        inputMode={inputMode}

        maxLength={maxLength}

        pattern={pattern}

        onInput={onInput ? (event) => {

          const input = event.currentTarget;

          input.value = onInput(input.value);

        } : undefined}

        className={inputClass}

      />

    </div>

  );

}

function SelectField({

  label,

  name,

  required = false,

  value,

  onChange,

  children,

}: {

  label: string;

  name: string;

  required?: boolean;

  value?: string;

  onChange?: (value: string) => void;

  children: ReactNode;

}) {

  return (

    <div>

      <label htmlFor={name} className={labelClass}>

        {label}{required ? " *" : ""}

      </label>

      <select

        id={name}

        name={name}

        required={required}

        value={value}

        defaultValue={value === undefined ? "" : undefined}

        onChange={onChange ? (event) => onChange(event.target.value) : undefined}

        className={inputClass}

      >

        {children}

      </select>

    </div>

  );

}

function FileField({

  name,

  label,

  description,

  required = false,

  accept = "image/jpeg,image/png,application/pdf",

  index,

  fileName,

  onFileChange,

}: {

  name: string;

  label: string;

  description: string;

  required?: boolean;

  accept?: string;

  index: number;

  fileName: string;

  onFileChange: (file?: File) => void;

}) {

  return (

    <motion.div

      initial={{ opacity: 0, y: 10 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.3, delay: index * 0.04 }}

      className={`group rounded-2xl border border-dashed p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm sm:p-5 ${

        fileName

          ? "border-emerald-300 bg-emerald-50/40"

          : "border-slate-300 bg-slate-50/70 hover:border-blue-300 hover:bg-blue-50/30"

      }`}

    >

      <div className="flex items-start gap-3">

        <div

          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${

            fileName

              ? "bg-emerald-100 text-emerald-700"

              : "bg-white text-[#1565C0] shadow-sm"

          }`}

        >

          {fileName ? <CheckCircle2 size={20} /> : <UploadCloud size={20} />}

        </div>

        <div className="min-w-0 flex-1">

          <label htmlFor={name} className="block cursor-pointer text-sm font-bold text-slate-800">

            {label}{required ? " *" : ""}

          </label>

          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>

        </div>

      </div>

      <input

        id={name}

        name={name}

        type="file"

        accept={accept}

        required={required}

        onChange={(event) => onFileChange(event.target.files?.[0])}

        className="mt-4 block w-full cursor-pointer text-xs text-slate-600 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-100 file:px-3 file:py-2.5 file:font-semibold file:text-blue-800 file:transition hover:file:bg-blue-200"

      />

      {fileName && (

        <div className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-100/70 p-2.5 text-xs text-emerald-800">

          <CheckCircle2 size={15} className="mt-0.5 shrink-0" />

          <span className="break-all font-medium">{fileName}</span>

        </div>

      )}

      <p className="mt-2 text-[11px] text-slate-400">

        {required ? "Required document" : "Optional document"} · Max 5 MB

      </p>

    </motion.div>

  );

}
