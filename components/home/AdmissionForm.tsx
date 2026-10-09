"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadFile } from "@/lib/supabase/upload";
import {
  User,
  Users,
  CalendarDays,
  GraduationCap,
  Send,
  Phone,
  Mail,
  MapPin,
  Heart,
  School,
  Briefcase,
  Home,
  FileText,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ClipboardCheck,
  LoaderCircle,
  AlertCircle,
  Printer,
  LockKeyhole,
  BookOpen,
  Building2,
  BadgeCheck,
  CreditCard,
  IdCard,
  Clock3
} from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ageRules: Record<string, { min: number; max: number }> = {
  Nursery: { min: 3, max: 4 },
  LKG: { min: 4, max: 5 },
  UKG: { min: 5, max: 6 },
  "1": { min: 6, max: 7 },
  "2": { min: 7, max: 8 },
  "3": { min: 8, max: 9 },
  "4": { min: 9, max: 10 },
  "5": { min: 10, max: 11 },
  "6": { min: 11, max: 12 },
  "7": { min: 12, max: 13 },
  "8": { min: 13, max: 14 },
};

const categoryOptions: Record<string, string[]> = {
  Hindu: ["General", "OBC", "SC", "ST", "EWS"],
  Muslim: ["General", "OBC", "EWS"],
  Sikh: ["General", "OBC", "SC", "EWS"],
  Christian: ["General", "OBC", "ST", "EWS"],
  Jain: ["General", "OBC", "EWS"],
  Buddhist: ["General", "OBC", "SC", "ST", "EWS"],
  Other: ["General", "OBC", "EWS"],
};

const classOptions = [
  { value: "Nursery", label: "Nursery" },
  { value: "LKG", label: "LKG" },
  { value: "UKG", label: "UKG" },
  ...Array.from({ length: 8 }, (_, i) => ({
    value: String(i + 1),
    label: `Class ${i + 1}`,
  })),
];

const indianMobileRegex = /^[6-9]\d{9}$/;
const occupationRegex = /^[A-Za-z\s.&-]{2,50}$/;

function generateRegistrationNumber(count: number) {
  return `BBPS2026${String(count + 1).padStart(5, "0")}`;
}

function calculateAge(dateOfBirth: string) {
  const today = new Date();
  const dob = new Date(`${dateOfBirth}T00:00:00`);

  let age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();

  if (
    month < 0 ||
    (month === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
}

/* Verhoeff checksum for Aadhaar format validation */
const verhoeffD = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const verhoeffP = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

function isValidAadhaar(value: string) {
  if (!/^[2-9]\d{11}$/.test(value)) return false;

  let checksum = 0;
  const reversed = value.split("").reverse().map(Number);

  for (let i = 0; i < reversed.length; i++) {
    checksum = verhoeffD[checksum][
      verhoeffP[i % 8][reversed[i]]
    ];
  }

  return checksum === 0;
}

function isValidApaarId(value: string) {
  return (
    /^\d{12}$/.test(value) &&
    !/^(\d)\1{11}$/.test(value) &&
    ![
      "123456789012",
      "987654321098",
      "111111111111",
      "222222222222",
      "999999999999",
      "000000000000",
    ].includes(value)
  );
}

function isValidIndianMobile(value: string) {
  if (!indianMobileRegex.test(value)) return false;
  if (/^(\d)\1{9}$/.test(value)) return false;

  return ![
    "9876543210",
    "1234567890",
    "0123456789",
    "0987654321",
    "1122334455",
    "1234512345",
  ].includes(value);
}

function isAgeValid(studentClass: string, dob: string) {
  const rule = ageRules[studentClass];

  if (!rule || !dob) return false;

  const age = calculateAge(dob);
  return age >= rule.min && age < rule.max;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

type FieldProps = {
  label: string;
  icon?: React.ElementType;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
};

function Field({
  label,
  icon: Icon,
  required = false,
  hint,
  children,
}: FieldProps) {
  return (
    <div className="min-w-0">
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-700">
        {Icon && <Icon size={16} className="text-[#C62828]" />}
        <span>{label}</span>
        {required && <span className="text-red-600">*</span>}
      </label>

      {children}

      {hint && (
        <p className="mt-1.5 text-xs leading-5 text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}

function SectionHeading({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <div className="relative md:col-span-2 mt-5 flex items-center gap-4 overflow-hidden rounded-2xl border border-red-100 bg-gradient-to-r from-red-50 via-white to-blue-50 p-4 sm:p-5">
      <div className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-[#C62828] to-[#1565C0]" />

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#C62828] shadow-sm ring-1 ring-red-100">
        <Icon size={23} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-black uppercase tracking-[0.22em] text-[#1565C0]">
          STEP {number}
        </div>

        <h3 className="mt-1 text-base font-extrabold text-[#101B33] sm:text-lg">
          {title}
        </h3>

        <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
          {description}
        </p>
      </div>

      <CheckCircle2
        size={20}
        className="hidden shrink-0 text-slate-300 sm:block"
      />
    </div>
  );
}

export default function AdmissionForm() {
  const supabase = createClient();

  const [studentName, setStudentName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");

  const [aadhaar, setAadhaar] = useState("");
  const [apaarId, setApaarId] = useState("");

  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [category, setCategory] = useState("");
  const [religion, setReligion] = useState("");

  const [fatherOccupation, setFatherOccupation] = useState("");
  const [motherOccupation, setMotherOccupation] = useState("");

  const [fatherPhone, setFatherPhone] = useState("");
  const [motherPhone, setMotherPhone] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("Uttar Pradesh");
  const [pincode, setPincode] = useState("");

  const [dob, setDob] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [previousSchool, setPreviousSchool] = useState("");

  const [studentPhoto, setStudentPhoto] = useState<File | null>(null);
  const [birthCertificate, setBirthCertificate] = useState<File | null>(null);
  const [addressProof, setAddressProof] = useState<File | null>(null);
  const [tcFile, setTcFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [successNumber, setSuccessNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const needsTC =
    Boolean(studentClass) &&
    !["Nursery", "LKG", "UKG", "1"].includes(studentClass);

  const inputStyle =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-blue-300 focus:border-[#1565C0] focus:ring-4 focus:ring-blue-100/70";

  const selectStyle =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 shadow-sm outline-none transition-all duration-300 hover:border-blue-300 focus:border-[#1565C0] focus:ring-4 focus:ring-blue-100/70 disabled:cursor-not-allowed disabled:bg-slate-100";

  const fileInputStyle =
    "mt-4 block w-full cursor-pointer text-sm text-slate-600 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-[#101B33] file:px-4 file:py-2.5 file:font-bold file:text-white hover:file:bg-[#1565C0] file:transition-colors";

  function validateFileSize(file: File | null, label: string) {
    if (!file) return true;

    if (file.size > MAX_FILE_SIZE) {
      setFormError(
        `${label} is too large. Maximum file size is 5 MB.`
      );
      return false;
    }

    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    setFormError("");

    if (!isValidAadhaar(aadhaar)) {
      setFormError("Please enter a valid 12-digit Aadhaar number.");
      return;
    }

    if (!isValidApaarId(apaarId)) {
      setFormError("Please enter a valid 12-digit APAAR ID.");
      return;
    }

    if (!dob || new Date(`${dob}T00:00:00`) > new Date()) {
      setFormError("Please enter a valid date of birth.");
      return;
    }

    if (!isAgeValid(studentClass, dob)) {
      const rule = ageRules[studentClass];

      setFormError(
        rule
          ? `The student does not meet the age criteria for ${studentClass}. Required age: ${rule.min} to under ${rule.max} years.`
          : "Please select the class for admission."
      );
      return;
    }

    if (!occupationRegex.test(fatherOccupation.trim())) {
      setFormError("Please enter a valid father's occupation.");
      return;
    }

    if (
      motherOccupation.trim() &&
      !occupationRegex.test(motherOccupation.trim())
    ) {
      setFormError("Please enter a valid mother's occupation.");
      return;
    }

    if (!isValidIndianMobile(fatherPhone)) {
      setFormError("Please enter a valid father's mobile number.");
      return;
    }

    if (!isValidIndianMobile(motherPhone)) {
      setFormError("Please enter a valid mother's mobile number.");
      return;
    }

    if (!studentPhoto || !birthCertificate || !addressProof) {
      setFormError(
        "Please upload the student photo, birth certificate and address proof."
      );
      return;
    }

    if (needsTC && !tcFile) {
      setFormError(
        "A Transfer Certificate is required for the selected class."
      );
      return;
    }

    if (
      !validateFileSize(studentPhoto, "Student photo") ||
      !validateFileSize(birthCertificate, "Birth certificate") ||
      !validateFileSize(addressProof, "Address proof") ||
      (needsTC && !validateFileSize(tcFile, "Transfer certificate"))
    ) {
      return;
    }

    setLoading(true);

    try {
      const { data: existingStudent, error: checkError } = await supabase
        .from("admissions")
        .select("registration_number, student_name")
        .or(`aadhaar_number.eq.${aadhaar},apaar_id.eq.${apaarId}`)
        .maybeSingle();

      if (checkError) {
        throw new Error("Unable to verify existing admission records.");
      }

      if (existingStudent) {
        setFormError(
          `This student appears to be registered already. Registration number: ${existingStudent.registration_number}`
        );
        return;
      }

      const { count, error: countError } = await supabase
        .from("admissions")
        .select("*", { count: "exact", head: true });

      if (countError) {
        throw new Error("Unable to generate a registration number.");
      }

      const registrationNumber = generateRegistrationNumber(count ?? 0);

      const studentPhotoUrl = await uploadFile(
        studentPhoto,
        "student-photo"
      );

      const birthCertificateUrl = await uploadFile(
        birthCertificate,
        "birth-certificate"
      );

      const addressProofUrl = await uploadFile(
        addressProof,
        "address-proof"
      );

      let tcUrl: string | null = null;

      if (needsTC && tcFile) {
        tcUrl = await uploadFile(tcFile, "tc");
      }

      const { error: insertError } = await supabase
        .from("admissions")
        .insert({
          student_name: studentName.trim(),
          father_name: fatherName.trim(),
          mother_name: motherName.trim(),

          aadhaar_number: aadhaar,
          apaar_id: apaarId,

          gender,
          blood_group: bloodGroup,
          category,
          religion,

          father_occupation: fatherOccupation.trim(),
          mother_occupation: motherOccupation.trim(),

          father_phone: fatherPhone,
          mother_phone: motherPhone,
          email: email.trim() || null,

          dob,
          class: studentClass,
          previous_school: needsTC ? previousSchool.trim() : null,

          address: address.trim(),
          city: city.trim(),
          state: stateName.trim(),
          pincode,

          student_photo_url: studentPhotoUrl,
          birth_certificate_url: birthCertificateUrl,
          address_proof_url: addressProofUrl,
          tc_url: tcUrl,

          registration_number: registrationNumber,
          status: "Pending",
          submitted_at: new Date().toISOString(),
        });

      if (insertError) {
        if (insertError.code === "23505") {
          throw new Error(
            "This student is already registered for admission."
          );
        }

        throw new Error(insertError.message);
      }

      setSuccessNumber(registrationNumber);
      setSubmitted(true);
    } catch (error) {
      console.error("Admission submission failed.");

      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the application."
      );
    } finally {
      setLoading(false);
    }
  }

    /* ==========================================
     PART 2: PRINT RECEIPT + FORM HEADER
  ========================================== */

  if (submitted) {
    return (
      <>
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden !important;
            }

            #print-receipt,
            #print-receipt * {
              visibility: visible !important;
            }

            #print-receipt {
              position: absolute !important;
              inset: 0 auto auto 0 !important;
              width: 100% !important;
              max-width: 100% !important;
              padding: 24px !important;
              margin: 0 !important;
              border: none !important;
              box-shadow: none !important;
              border-radius: 0 !important;
              background: white !important;
              color: black !important;
            }

            .no-print {
              display: none !important;
            }

            @page {
              size: A4;
              margin: 12mm;
            }
          }
        `}</style>

        <div
          id="print-receipt"
          className="overflow-hidden rounded-[2rem] border border-emerald-200 bg-white shadow-2xl shadow-emerald-950/10"
        >
          <div className="h-2 bg-gradient-to-r from-[#C62828] via-emerald-400 to-[#1565C0]" />

          <div className="p-6 sm:p-10">

            <div className="flex flex-col items-center gap-4 border-b border-slate-200 pb-7 text-center sm:flex-row sm:text-left">

              <img
                src="/logo/logo.png.png"
                alt="Bright Bal Public School Logo"
                className="h-20 w-20 shrink-0 object-contain"
              />

              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-black tracking-tight text-[#C62828] sm:text-3xl">
                  BRIGHT BAL PUBLIC SCHOOL
                </h1>

                <p className="mt-2 text-sm font-semibold text-slate-700">
                  18/162 M.P. Pura, Tajganj, Agra - 282001
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  English Medium School | Session 2026–27
                </p>
              </div>

              <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 sm:flex">
                <BadgeCheck size={37} />
              </div>

            </div>

            <div className="py-8 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 size={37} />
              </div>

              <h2 className="mt-5 text-2xl font-black text-slate-900 sm:text-3xl">
                Application Submitted!
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-600">
                Your admission application has been received.
                Please keep your registration number for future communication.
              </p>

            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-700">
                Your Registration Number
              </p>

              <p className="mt-3 break-all text-3xl font-black tracking-wide text-emerald-800 sm:text-4xl">
                {successNumber}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">
                <Clock3 size={16} />
                Status: Pending Verification
              </div>

            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">

              <div className="flex items-center gap-3 bg-[#101B33] px-5 py-4 text-white">
                <User size={21} className="text-red-300" />

                <h3 className="font-extrabold tracking-wide">
                  STUDENT DETAILS
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-4 p-5 sm:grid-cols-2 sm:p-7">

                {[
                  ["Student Name", studentName],
                  ["Father's Name", fatherName],
                  ["Mother's Name", motherName],
                  [
                    "Class Applied",
                    classOptions.find((item) => item.value === studentClass)
                      ?.label ?? studentClass,
                  ],
                  [
                    "Date of Birth",
                    dob ? new Date(`${dob}T00:00:00`).toLocaleDateString("en-GB") : "",
                  ],
                  ["Father's Mobile", fatherPhone],
                  ["City", city],
                  ["State", stateName],
                  ["Pincode", pincode],
                  ["Registration Number", successNumber],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="min-w-0 border-b border-slate-100 pb-3"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {label}
                    </p>

                    <p className="mt-1 break-words font-bold text-slate-900">
                      {value || "—"}
                    </p>
                  </div>
                ))}

                <div className="min-w-0 border-b border-slate-100 pb-3 sm:col-span-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Residential Address
                  </p>

                  <p className="mt-1 break-words font-bold text-slate-900">
                    {address}, {city}, {stateName} - {pincode}
                  </p>
                </div>

              </div>

            </div>

            <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-6 text-blue-900">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="mt-0.5 shrink-0" />

                <p>
                  This receipt confirms submission only. Admission is
                  subject to document verification and confirmation by
                  the school administration.
                </p>
              </div>
            </div>

            <div className="no-print mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#C62828] px-6 py-4 font-bold text-white shadow-lg shadow-red-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1565C0]"
              >
                <Printer size={19} />
                Print Admission Receipt
              </button>

            </div>

          </div>
        </div>
      </>
    );
  }

  /* ==========================================
     ADMISSION FORM
  ========================================== */

  return (
    <div
      id="admission-form"
      className="scroll-mt-28 overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_25px_80px_-30px_rgba(16,27,51,0.22)]"
    >

      {/* Form header */}
      <div className="relative isolate overflow-hidden bg-[#101B33] px-6 py-8 text-white sm:px-8 sm:py-9">

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(198,40,40,0.45),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(21,101,192,0.35),transparent_50%)]" />

        <div className="absolute -right-12 -top-16 -z-10 h-48 w-48 rounded-full bg-red-500/15 blur-3xl" />

        <div className="flex items-start gap-4">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur">
            <GraduationCap size={29} className="text-red-300" />
          </div>

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-200">
              <Sparkles size={14} />
              Session 2026–27
            </div>

            <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
              Admission Application
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Complete the student and parent details below to apply
              to Bright Bal Public School.
            </p>
          </div>

        </div>

        <div className="mt-7 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#C62828] to-blue-400" />
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-x-6 gap-y-6 p-5 sm:p-8 lg:p-10 md:grid-cols-2"
      >

        {/* STUDENT DETAILS */}
        <SectionHeading
          number="01"
          title="Student Personal Details"
          description="Enter the student's information exactly as it appears on official documents."
          icon={User}
        />

        <Field label="Student Full Name" icon={User} required>
          <input
            required
            autoComplete="name"
            className={inputStyle}
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student's full name"
          />
        </Field>

        <Field label="Gender" icon={Users} required>
          <select
            required
            className={selectStyle}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </Field>

        <Field
          label="Aadhaar Number"
          icon={IdCard}
          required
          hint="Enter the student's 12-digit Aadhaar number."
        >
          <input
            required
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={12}
            className={inputStyle}
            value={aadhaar}
            onChange={(e) =>
              setAadhaar(e.target.value.replace(/\D/g, "").slice(0, 12))
            }
            placeholder="12-digit Aadhaar number"
          />
        </Field>

        <Field
          label="APAAR ID"
          icon={CreditCard}
          required
          hint="Enter the student's 12-digit APAAR ID."
        >
          <input
            required
            type="password"
            inputMode="numeric"
            autoComplete="off"
            maxLength={12}
            className={inputStyle}
            value={apaarId}
            onChange={(e) =>
              setApaarId(e.target.value.replace(/\D/g, "").slice(0, 12))
            }
            placeholder="12-digit APAAR ID"
          />
        </Field>

        <Field label="Date of Birth" icon={CalendarDays} required>
          <input
            required
            type="date"
            max={new Date().toISOString().split("T")[0]}
            className={inputStyle}
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </Field>

        <Field label="Blood Group" icon={Heart} required>
          <select
            required
            className={selectStyle}
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Select blood group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Religion" icon={Users} required>
          <select
            required
            className={selectStyle}
            value={religion}
            onChange={(e) => {
              setReligion(e.target.value);
              setCategory("");
            }}
          >
            <option value="">Select religion</option>
            {Object.keys(categoryOptions).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Category" icon={ShieldCheck} required>
          <select
            required
            className={selectStyle}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={!religion}
          >
            <option value="">
              {religion ? "Select category" : "Select religion first"}
            </option>

            {(categoryOptions[religion] ?? []).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </Field>

                {/* ==========================================
            PARENT / GUARDIAN DETAILS
        ========================================== */}
        <SectionHeading
          number="02"
          title="Parent & Guardian Details"
          description="Provide the contact details used for school communication."
          icon={Users}
        />

        <Field label="Father's Full Name" icon={User} required>
          <input
            required
            autoComplete="off"
            className={inputStyle}
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Enter father's full name"
          />
        </Field>

        <Field label="Mother's Full Name" icon={Heart} required>
          <input
            required
            autoComplete="off"
            className={inputStyle}
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            placeholder="Enter mother's full name"
          />
        </Field>

        <Field label="Father's Occupation" icon={Briefcase} required>
          <input
            required
            className={inputStyle}
            value={fatherOccupation}
            onChange={(e) => setFatherOccupation(e.target.value)}
            placeholder="e.g. Teacher, Business"
          />
        </Field>

        <Field label="Mother's Occupation" icon={Briefcase}>
          <input
            className={inputStyle}
            value={motherOccupation}
            onChange={(e) => setMotherOccupation(e.target.value)}
            placeholder="Enter mother's occupation"
          />
        </Field>

        <Field label="Father's Mobile Number" icon={Phone} required>
          <input
            required
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
            className={inputStyle}
            value={fatherPhone}
            onChange={(e) =>
              setFatherPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit mobile number"
          />
        </Field>

        <Field label="Mother's Mobile Number" icon={Phone} required>
          <input
            required
            type="tel"
            inputMode="numeric"
            maxLength={10}
            className={inputStyle}
            value={motherPhone}
            onChange={(e) =>
              setMotherPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit mobile number"
          />
        </Field>

        <Field label="Email Address" icon={Mail} hint="Optional">
          <input
            type="email"
            autoComplete="email"
            className={inputStyle}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="parent@example.com"
          />
        </Field>

        {/* ==========================================
            ADDRESS DETAILS
        ========================================== */}
        <SectionHeading
          number="03"
          title="Residential Address"
          description="Enter the current residential address of the student."
          icon={MapPin}
        />

        <div className="md:col-span-2">
          <Field label="Full Address" icon={Home} required>
            <textarea
              required
              rows={3}
              maxLength={300}
              autoComplete="street-address"
              className={`${inputStyle} resize-y`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House number, street, locality..."
            />
            <p className="mt-1 text-right text-xs text-slate-400">
              {address.length}/300 characters
            </p>
          </Field>
        </div>

        <Field label="City" icon={Building2} required>
          <input
            required
            autoComplete="address-level2"
            className={inputStyle}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
        </Field>

        <Field label="State" icon={MapPin} required>
          <input
            required
            autoComplete="address-level1"
            className={inputStyle}
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            placeholder="Enter state"
          />
        </Field>

        <Field label="PIN Code" icon={MapPin} required>
          <input
            required
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={6}
            pattern="[1-9][0-9]{5}"
            className={inputStyle}
            value={pincode}
            onChange={(e) =>
              setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="6-digit PIN code"
          />
        </Field>

        {/* ==========================================
            ADMISSION DETAILS
        ========================================== */}
        <SectionHeading
          number="04"
          title="Admission Details"
          description="Select the class and provide previous-school information where applicable."
          icon={GraduationCap}
        />

        <div className="md:col-span-2 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-white to-red-50/60 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#101B33] text-white">
              <School size={23} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-extrabold text-[#101B33]">
                Choose Your Desired Class
              </h4>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Admissions are available from Nursery to Class VIII.
                Age eligibility will be checked before submission.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {classOptions.map((item) => {
              const selected = studentClass === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setStudentClass(item.value)}
                  aria-pressed={selected}
                  className={`group flex min-h-14 items-center justify-between gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition-all duration-300 ${
                    selected
                      ? "border-[#C62828] bg-[#C62828] text-white shadow-lg shadow-red-900/15"
                      : "border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <span>{item.label}</span>
                  {selected && <CheckCircle2 size={17} />}
                </button>
              );
            })}
          </div>

          {studentClass && (
            <div className="mt-4 flex items-start gap-2 rounded-xl border border-blue-100 bg-white p-3 text-sm text-slate-600">
              <ShieldCheck
                size={18}
                className="mt-0.5 shrink-0 text-[#1565C0]"
              />
              <p>
                Selected class:{" "}
                <strong className="text-[#101B33]">
                  {classOptions.find((item) => item.value === studentClass)?.label}
                </strong>
                . The submitted date of birth will be checked against the
                configured age criteria.
              </p>
            </div>
          )}
        </div>

        <Field
          label="Previous School Name"
          icon={School}
          required={needsTC}
          hint={
            needsTC
              ? "Required for the selected class."
              : "Optional for Nursery, LKG, UKG and Class I."
          }
        >
          <input
            required={needsTC}
            className={inputStyle}
            value={previousSchool}
            onChange={(e) => setPreviousSchool(e.target.value)}
            placeholder="Enter previous school name"
          />
        </Field>

        <div className="hidden md:block" />

        {/* ==========================================
            DOCUMENT UPLOADS
        ========================================== */}
        <SectionHeading
          number="05"
          title="Required Documents"
          description="Upload clear, readable documents. Accepted formats: JPG, PNG or PDF, up to 5 MB each."
          icon={FileText}
        />

        <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">

          {/* Student photo */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C62828] transition-colors group-hover:bg-[#C62828] group-hover:text-white">
                <ImageIcon size={22} />
              </div>

              <div>
                <h4 className="font-extrabold text-[#101B33]">
                  Student Photograph <span className="text-red-600">*</span>
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Recent passport-size photograph
                </p>
              </div>
            </div>

            <input
              required
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className={fileInputStyle}
              onChange={(e) =>
                setStudentPhoto(e.target.files?.[0] ?? null)
              }
            />

            {studentPhoto && (
              <p className="mt-3 flex items-center gap-2 break-all text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={15} className="shrink-0" />
                {studentPhoto.name}
              </p>
            )}
          </div>

          {/* Birth certificate */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0] transition-colors group-hover:bg-[#1565C0] group-hover:text-white">
                <FileText size={22} />
              </div>

              <div>
                <h4 className="font-extrabold text-[#101B33]">
                  Birth Certificate <span className="text-red-600">*</span>
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Government-issued birth certificate
                </p>
              </div>
            </div>

            <input
              required
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className={fileInputStyle}
              onChange={(e) =>
                setBirthCertificate(e.target.files?.[0] ?? null)
              }
            />

            {birthCertificate && (
              <p className="mt-3 flex items-center gap-2 break-all text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={15} className="shrink-0" />
                {birthCertificate.name}
              </p>
            )}
          </div>

          {/* Address proof */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0] transition-colors group-hover:bg-[#1565C0] group-hover:text-white">
                <MapPin size={22} />
              </div>

              <div>
                <h4 className="font-extrabold text-[#101B33]">
                  Address Proof <span className="text-red-600">*</span>
                </h4>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  A valid document showing residential address
                </p>
              </div>
            </div>

            <input
              required
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className={fileInputStyle}
              onChange={(e) =>
                setAddressProof(e.target.files?.[0] ?? null)
              }
            />

            {addressProof && (
              <p className="mt-3 flex items-center gap-2 break-all text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={15} className="shrink-0" />
                {addressProof.name}
              </p>
            )}
          </div>

          {/* Transfer certificate */}
          <div
            className={`group rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              needsTC
                ? "border-red-200 hover:shadow-red-950/5"
                : "border-slate-200 hover:border-blue-200 hover:shadow-blue-950/5"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-[#101B33] group-hover:text-white">
                <ClipboardCheck size={22} />
              </div>

              <div>
                <h4 className="font-extrabold text-[#101B33]">
                  Transfer Certificate{" "}
                  {needsTC ? (
                    <span className="text-red-600">*</span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">
                      (If applicable)
                    </span>
                  )}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {needsTC
                    ? "Required for the selected class."
                    : "Upload if available or required by the school."}
                </p>
              </div>
            </div>

            <input
              required={needsTC}
              type="file"
              accept="image/jpeg,image/png,image/webp,application/pdf"
              className={fileInputStyle}
              onChange={(e) => setTcFile(e.target.files?.[0] ?? null)}
            />

            {tcFile && (
              <p className="mt-3 flex items-center gap-2 break-all text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={15} className="shrink-0" />
                {tcFile.name}
              </p>
            )}
          </div>

        </div>

                {/* ==========================================
            DECLARATION & FINAL SUBMISSION
        ========================================== */}
        <div className="md:col-span-2 mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

          <div className="flex items-center gap-3 border-b border-slate-200 bg-gradient-to-r from-red-50 via-white to-blue-50 px-5 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#C62828] shadow-sm ring-1 ring-red-100">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="font-extrabold text-[#101B33]">
                Declaration & Confirmation
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Please review before submitting your application.
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-300 hover:border-blue-300">
              <input
                required
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 accent-[#C62828]"
              />

              <span className="text-sm leading-7 text-slate-600">
                I confirm that the information and documents provided in
                this application are accurate to the best of my knowledge.
                I understand that submitting this form does not guarantee
                admission and that the application is subject to verification
                and approval by the school administration.
              </span>
            </label>

            <div className="mt-4 flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <LockKeyhole
                size={19}
                className="mt-0.5 shrink-0 text-[#1565C0]"
              />

              <p className="text-xs leading-6 text-blue-900">
                Please provide only the information requested by the school.
                Ensure uploaded documents are correct and readable.
                Avoid sharing your registration details publicly.
              </p>
            </div>
          </div>

        </div>

        {/* ERROR MESSAGE */}
        {formError && (
          <div
            role="alert"
            className="md:col-span-2 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 shadow-sm"
          >
            <AlertCircle
              size={21}
              className="mt-0.5 shrink-0 text-[#C62828]"
            />

            <div className="min-w-0 flex-1">
              <p className="font-extrabold">
                Application needs attention
              </p>

              <p className="mt-1 break-words leading-6">
                {formError}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setFormError("")}
              aria-label="Dismiss error"
              className="shrink-0 rounded-lg px-2 py-1 font-bold text-red-700 transition hover:bg-red-100"
            >
              ✕
            </button>
          </div>
        )}

        {/* SUBMIT BUTTON */}
        <div className="md:col-span-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-start gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={23} />
                </div>

                <div>
                  <p className="font-extrabold text-[#101B33]">
                    Ready to submit?
                  </p>

                  <p className="mt-1 max-w-md text-xs leading-6 text-slate-500">
                    Check all details and ensure your documents are uploaded
                    before submitting the application.
                  </p>
                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex w-full shrink-0 items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#C62828] px-7 py-4 font-extrabold text-white shadow-lg shadow-red-950/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1565C0] hover:shadow-xl hover:shadow-blue-950/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                {loading ? (
                  <>
                    <LoaderCircle
                      size={20}
                      className="relative animate-spin"
                    />
                    <span className="relative">
                      Submitting Application...
                    </span>
                  </>
                ) : (
                  <>
                    <Send size={19} className="relative" />

                    <span className="relative">
                      Submit Application
                    </span>

                    <ArrowRight
                      size={18}
                      className="relative transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>

            </div>

          </div>

        </div>

      </form>

      {/* FORM FOOTER */}
      <div className="border-t border-slate-200 bg-slate-50 px-5 py-5 sm:px-8">

        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <ShieldCheck size={16} className="text-[#1565C0]" />
            Bright Bal Public School · Agra
          </div>

          <p className="text-xs text-slate-400">
            Fields marked with <span className="font-bold text-red-600">*</span>{" "}
            are required.
          </p>

        </div>

      </div>

    </div>
  );
}
