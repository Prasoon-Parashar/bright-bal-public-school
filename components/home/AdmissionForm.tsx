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
  Bus,
  FileText,
  CreditCard,
  ImageIcon,
} from "lucide-react";
import { div } from "framer-motion/m";

async function generateRegistrationNumber() {
  const supabase = createClient();

  const { count } = await supabase
    .from("admissions")
    .select("*", { count: "exact", head: true });

  const nextNumber = (count || 0) + 1;

  return `BBPS2026${String(nextNumber).padStart(5, "0")}`;
}
// ---------------- VERHOEFF CHECKSUM ----------------

const d = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,2,3,4,0,6,7,8,9,5],
  [2,3,4,0,1,7,8,9,5,6],
  [3,4,0,1,2,8,9,5,6,7],
  [4,0,1,2,3,9,5,6,7,8],
  [5,9,8,7,6,0,4,3,2,1],
  [6,5,9,8,7,1,0,4,3,2],
  [7,6,5,9,8,2,1,0,4,3],
  [8,7,6,5,9,3,2,1,0,4],
  [9,8,7,6,5,4,3,2,1,0],
];

const p = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,5,7,6,2,8,3,0,9,4],
  [5,8,0,3,7,9,6,1,4,2],
  [8,9,1,6,0,4,3,5,2,7],
  [9,4,5,3,1,2,6,8,7,0],
  [4,2,8,6,5,7,3,9,0,1],
  [2,7,9,3,8,0,6,4,1,5],
  [7,0,4,6,9,1,3,2,5,8],
];

function isValidAadhaar(aadhaar: string) {
  if (!/^[2-9][0-9]{11}$/.test(aadhaar)) return false;

  let c = 0;
  const reversed = aadhaar.split("").reverse().map(Number);

  for (let i = 0; i < reversed.length; i++) {
    c = d[c][p[i % 8][reversed[i]]];
  }

  return c === 0;
}
// -------- AGE VALIDATION --------
// -------- AGE VALIDATION --------
function calculateAge(dateOfBirth: string) {
  const today = new Date();
  const dob = new Date(dateOfBirth);

  let age = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

function isAgeValid(studentClass: string, dob: string) {
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

  const age = calculateAge(dob);
  const rule = ageRules[studentClass];

  return age >= rule.min && age < rule.max;
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
const categoryOptions: Record<string, string[]> = {
  Hindu: ["General", "OBC", "SC", "ST", "EWS"],
  Muslim: ["General", "OBC", "EWS"],
  Sikh: ["General", "OBC", "SC", "EWS"],
  Christian: ["General", "OBC", "ST", "EWS"],
  Jain: ["General", "OBC", "EWS"],
  Buddhist: ["General", "OBC", "SC", "ST", "EWS"],
  Other: ["General", "OBC", "EWS"],
};
const needsTC =
  studentClass &&
  !["Nursery", "LKG", "UKG", "1"].includes(studentClass);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

  // Aadhaar Validation
// Aadhaar Validation (UIDAI Verhoeff)
if (!isValidAadhaar(aadhaar)) {
  alert("Please enter a valid Aadhaar Number.");
  return;
}

// Reject obvious fake Aadhaar numbers
if (/^(\d)\1{11}$/.test(aadhaar)) {
  alert("Invalid Aadhaar number.");
  return;
}

if (
  aadhaar === "123456789012" ||
  aadhaar === "987654321098" ||
  aadhaar === "111122223333"
) {
  alert("Invalid Aadhaar number.");
  return;
}

// APAAR ID Validation
if (!isValidApaarId(apaarId)) {
  alert("Please enter a valid 12-digit APAAR ID.");
  return;
}
// Date of Birth Validation
const today = new Date();
const selectedDOB = new Date(dob);

// Future DOB not allowed
if (selectedDOB > today) {
  alert("Date of Birth cannot be in the future.");
  return;
}

// Age according to selected class
if (!isAgeValid(studentClass, dob)) {
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


  const rule = ageRules[studentClass];

 alert(
  `The student is not eligible for Class ${studentClass}. The required age for admission is ${rule.min} to ${rule.max} years.`
);
  return;
}
// Occupation Validation
const occupationRegex = /^[A-Za-z\s.&-]{2,50}$/;

if (!occupationRegex.test(fatherOccupation.trim())) {
  alert("Please enter a valid Father's Occupation.");
  return;
}

if (
  motherOccupation.trim() !== "" &&
  !occupationRegex.test(motherOccupation.trim())
) {
  alert("Please enter a valid Mother's Occupation.");
  return;
}
 // -------- MOBILE NUMBER VALIDATION --------
function isValidIndianMobile(number: string) {
  // Must start with 6-9 and contain exactly 10 digits
  if (!/^[6-9]\d{9}$/.test(number)) return false;

  // Reject same digit repeated 10 times (9999999999, 7777777777...)
  if (/^(\d)\1{9}$/.test(number)) return false;

  // Reject obvious sequential numbers
  const fakeNumbers = [
    "9876543210",
    "1234567890",
    "0123456789",
    "0987654321",
    "1122334455",
    "1234512345",
  ];

  if (fakeNumbers.includes(number)) return false;

  return true;
}
// -------- APAAR ID VALIDATION --------
function isValidApaarId(apaar: string) {
  // Must be exactly 12 digits
  if (!/^\d{12}$/.test(apaar)) return false;

  // Reject same digit repeated
  if (/^(\d)\1{11}$/.test(apaar)) return false;

  // Reject obvious fake IDs
  const fakeIds = [
    "123456789012",
    "987654321098",
    "111111111111",
    "222222222222",
    "999999999999",
    "000000000000",
  ];

  if (fakeIds.includes(apaar)) return false;

  return true;
}

// Father's Mobile Validation
if (!isValidIndianMobile(fatherPhone)) {
  alert("Please enter a valid Father's Mobile Number.");
  return;
}

// Mother's Mobile Validation
if (!isValidIndianMobile(motherPhone)) {
  alert("Please enter a valid Mother's Mobile Number.");
  return;
}

if (!studentPhoto || !birthCertificate || !addressProof) {
  alert("Upload all required documents.");
  return;
}

if (needsTC && !tcFile) {
  alert("Transfer Certificate is required.");
  return;
}

    try {
      setLoading(true);
      // 🔍 Check if student is already registered
const { data: existingStudent, error: checkError } = await supabase
  .from("admissions")
  .select("registration_number, student_name")
  .or(
    `aadhaar_number.eq.${aadhaar},apaar_id.eq.${apaarId}`
  )
  .maybeSingle();

if (checkError) {
  alert("Unable to verify existing admission records.");
  return;
}

if (existingStudent) {
  alert(
    `This student is already registered.\n\nRegistration Number: ${existingStudent.registration_number}`
  );
  return;
}
        console.log("Form submit started");
      const registrationNumber = await generateRegistrationNumber();
        console.log("Registration:", registrationNumber);
        
   const studentPhotoUrl = await uploadFile(studentPhoto!, "student-photo");
console.log("Student photo uploaded:", studentPhotoUrl);

const birthCertificateUrl = await uploadFile(
  birthCertificate!,
  "birth-certificate"
);
console.log("Birth certificate uploaded:", birthCertificateUrl);

const addressProofUrl = await uploadFile(
  addressProof!,
  "address-proof"
);
console.log("Address proof uploaded:", addressProofUrl);

let tcUrl: string | null = null;

if (needsTC && tcFile) {
  tcUrl = await uploadFile(tcFile, "tc");
  console.log("TC uploaded:", tcUrl);
}

  const { error } = await supabase.from("admissions").insert({
    
    
  student_name: studentName,
  father_name: fatherName,
  mother_name: motherName,

  aadhaar_number: aadhaar,
  apaar_id: apaarId,

  gender,
  blood_group: bloodGroup,
  category,
  religion,

  father_occupation: fatherOccupation,
  mother_occupation: motherOccupation,

  father_phone: fatherPhone,
  mother_phone: motherPhone,

  email,
  dob,

  class: studentClass,
  previous_school: needsTC ? previousSchool : null,

  address,
  city,
  state: stateName,
  pincode,

  student_photo_url: studentPhotoUrl,
  birth_certificate_url: birthCertificateUrl,
  address_proof_url: addressProofUrl,
  tc_url: tcUrl,
  registration_number: registrationNumber,
status: "Pending",
submitted_at: new Date().toISOString(),

});
     if (error) {
  if (error.code === "23505") {
    alert("This student is already registered for admission.");
  } else {
    alert(error.message);
  }
  return;
}

console.log("Admission inserted successfully.");
      setSuccessNumber(registrationNumber);
setSubmitted(true);
} catch (err: any) {
  console.error("SUBMIT ERROR:", err);
  alert(err.message || "Something went wrong while submitting the application.");
} finally {
  setLoading(false);
}
  }
  console.log("Admission inserted successfully.");
const inputStyle =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none";

const selectStyle =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-red-600 focus:ring-2 focus:ring-red-200 outline-none";

const sectionTitle =
  "md:col-span-2 flex items-center gap-3 mt-6 border-b border-red-200 pb-2 text-xl font-bold text-red-700";

  const printStyles = `
@media print {

  body * {
    visibility: hidden;
  }
    #print-receipt {
  color: #000 !important;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
  #admission-form {
  display: none !important;
}

#print-receipt {
  display: block !important;
}

#print-receipt * {
  color: #000 !important;
}

  #print-receipt,
  #print-receipt * {
    visibility: visible;
  }

  #print-receipt {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    max-width: 100%;
    padding: 40px;
    box-shadow: none !important;
    border-radius: 0 !important;
    margin: 0;
  }
    #admission-form {
  display: none !important;
}

  button {
    display: none !important;
  }

  @page {
    size: A4;
    margin: 15mm;
  }
}
`;

 if (submitted) {
  return (
    <>
      <style>{printStyles}</style>

      <div
        id="print-receipt"
        className="mx-auto max-w-2xl rounded-3xl border border-green-200 bg-white p-10 text-center shadow-xl"
      >
       {/* ===== SCHOOL HEADER FOR PRINT RECEIPT ===== */}
<div className="mb-6 flex items-center justify-center gap-4 border-b-2 border-red-700 pb-5">
  <img
    src="/logo/logo.png.png"
    alt="Bright Bal Public School Logo"
    className="h-20 w-20 object-contain"
  />

  <div className="text-center">
    <h1 className="text-3xl font-black text-red-700">
      BRIGHT BAL PUBLIC SCHOOL
    </h1>

    <p className="font-semibold text-slate-800">
      18/162 M.P. Pura, Tajganj, Agra - 282001
    </p>

    <p className="text-sm font-medium text-slate-600">
      Admission Application Receipt (Session 2026-27)
    </p>
  </div>
</div>

        <h2 className="mt-5 text-3xl font-bold text-green-700">
          Bright Bal Public School
        </h2>

        <p className="text-slate-600">English Medium School, Agra</p>

        <hr className="my-6" />

        <h3 className="text-2xl font-bold text-green-700">
          Admission Application Submitted Successfully
        </h3>

        <p className="mt-3 text-slate-600">
          Your admission application has been received successfully.
        </p>

        <div className="mt-8 rounded-2xl bg-green-50 p-6">
          <p className="text-sm text-slate-500">Registration Number</p>

          <h1 className="mt-2 text-4xl font-black text-green-700">
            {successNumber}
          </h1>

          <p className="mt-2 font-semibold text-green-700">
            Status : Pending Verification
          </p>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-green-600 bg-white p-6 text-left">
  <h3 className="mb-5 text-center text-2xl font-bold text-black">
    STUDENT DETAILS
  </h3>

  <div className="grid grid-cols-[170px_1fr] gap-y-4 text-[17px] leading-7">
    <p className="font-bold text-black">Student Name</p>
    <p className="font-semibold text-black">{studentName}</p>

    <p className="font-bold text-black">Father's Name</p>
    <p className="font-semibold text-black">{fatherName}</p>

    <p className="font-bold text-black">Mother's Name</p>
    <p className="font-semibold text-black">{motherName}</p>

    <p className="font-bold text-black">Class Applied</p>
    <p className="font-semibold text-black">{studentClass}</p>

    <p className="font-bold text-black">Date of Birth</p>
    <p className="font-semibold text-black">
      {new Date(dob).toLocaleDateString("en-GB")}
    </p>

    <p className="font-bold text-black">Mobile Number</p>
    <p className="font-semibold text-black">{fatherPhone}</p>

    <p className="font-bold text-black">Address</p>
    <p className="font-semibold text-black">
      {address}, {city}, {stateName} - {pincode}
    </p>
  </div>
</div>
        <p className="mt-8 text-sm text-slate-500">
          Please keep this registration number safe for future communication.
        </p>

        <button
        onClick={() => {
  setTimeout(() => {
    window.print();
  }, 200);
}}
          className="mt-6 rounded-2xl text-xl bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"
        >
          Print Receipt
        </button>
      </div>
    </>
  );
}


  return (
  <>
    <style>{printStyles}</style>

    <div
      id="admission-form"
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
    >
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-8 py-6 text-white">

        <h2 className="text-3xl font-bold">
          Admission Application
        </h2>

        <p className="mt-2 text-red-100">
          Fill in the details carefully to apply for admission.
        </p>
        

      </div>
      

      <form onSubmit={handleSubmit} className="grid gap-5 p-8 md:grid-cols-2">
        

  <div className={sectionTitle}>
  <User size={22}/>
  Student Personal Details
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Student Full Name *
  </label>

  <input
  required
  className={inputStyle}
  value={studentName}
  onChange={(e)=>setStudentName(e.target.value)}
/>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Gender *
  </label>

  <select
    className={selectStyle}
    value={gender}
    onChange={(e)=>setGender(e.target.value)}
  >
    <option value="">Select Gender</option>
    <option>Male</option>
    <option>Female</option>
    <option>Other</option>
  </select>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Aadhaar Number *
  </label>

 <input
  required
  type="text"
  inputMode="numeric"
  maxLength={12}
  className={inputStyle}
  value={aadhaar}
  onChange={(e) =>
    setAadhaar(
      e.target.value.replace(/\D/g, "").slice(0, 12)
    )
  }
  placeholder="Enter 12-digit Aadhaar Number"
/>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    APAAR ID *
  </label>

  <input
  required
  type="text"
  inputMode="numeric"
  maxLength={12}
  className={inputStyle}
  value={apaarId}
  onChange={(e) =>
    setApaarId(e.target.value.replace(/\D/g, "").slice(0, 12))
  }
  placeholder="Enter 12-digit APAAR ID"
/>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Date of Birth *
  </label>

  <input
  required
  type="date"
  max={new Date().toISOString().split("T")[0]}
  className={inputStyle}
  value={dob}
  onChange={(e) => setDob(e.target.value)}
/>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Blood Group *
  </label>

  <select
    className={selectStyle}
    value={bloodGroup}
    onChange={(e)=>setBloodGroup(e.target.value)}
  >
    <option value="">Select Blood Group</option>
    {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((b)=>(
      <option key={b}>{b}</option>
    ))}
  </select>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Religion *
  </label>

  <select
  className={selectStyle}
  value={religion}
  onChange={(e) => {
    setReligion(e.target.value);
    setCategory(""); // Religion change hote hi category reset
  }}
  required
>
  <option value="">Select Religion</option>

  {[
    "Hindu",
    "Muslim",
    "Sikh",
    "Christian",
    "Jain",
    "Buddhist",
    "Other",
  ].map((r) => (
    <option key={r} value={r}>
      {r}
    </option>
  ))}
</select>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Category *
  </label>

 <select
  className={selectStyle}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  disabled={!religion}
  required
>
  <option value="">
    {religion ? "Select Category" : "Select Religion First"}
  </option>

  {religion &&
    categoryOptions[religion]?.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
</select>
</div>


<div className={sectionTitle}>
  <Users size={22}/>
  Parent / Guardian Details
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Father's Name *
  </label>

  <input
    className={inputStyle}
    value={fatherName}
    onChange={(e)=>setFatherName(e.target.value)}
    placeholder="Father's Full Name"
  />
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Father's Occupation *
  </label>

 <input
  required
  className={inputStyle}
  value={fatherOccupation}
  onChange={(e) =>
    setFatherOccupation(
      e.target.value.replace(/[^A-Za-z\s.&-]/g, "")
    )
  }
  placeholder="Business / Teacher / Farmer / Govt. Employee"
/>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Father's Mobile *
  </label>

  <input
    className={inputStyle}
    maxLength={10}
    value={fatherPhone}
    onChange={(e)=>setFatherPhone(e.target.value.replace(/\D/g,""))}
    placeholder="10 digit mobile number"
  />
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Mother's Name *
  </label>

  <input
    className={inputStyle}
    value={motherName}
    onChange={(e)=>setMotherName(e.target.value)}
    placeholder="Mother's Full Name"
  />
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Mother's Occupation
  </label>

  <input
  className={inputStyle}
  value={motherOccupation}
  onChange={(e) =>
    setMotherOccupation(
      e.target.value.replace(/[^A-Za-z\s.&-]/g, "")
    )
  }
  placeholder="Homemaker / Teacher / Business / Doctor"
/>
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Mother's Mobile *
  </label>

  <input
    className={inputStyle}
    maxLength={10}
    value={motherPhone}
    onChange={(e)=>setMotherPhone(e.target.value.replace(/\D/g,""))}
    placeholder="10 digit mobile number"
  />
</div>

<div className="md:col-span-2">
  <label className="mb-2 block font-semibold text-slate-700">
    Parent Email Address
  </label>

  <input
    className={inputStyle}
    type="email"
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    placeholder="parent@gmail.com"
  />
</div>

 <div className={sectionTitle}>
  <Home size={22}/>
  Residential Address
</div>

<div className="md:col-span-2">
  <label className="mb-2 block font-semibold text-slate-700">
    Full Address *
  </label>

  <textarea
    rows={4}
    className={inputStyle}
    value={address}
    onChange={(e)=>setAddress(e.target.value)}
    placeholder="House No, Street, Colony, Landmark"
  />
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    City *
  </label>

  <input
    className={inputStyle}
    value={city}
    onChange={(e)=>setCity(e.target.value)}
    placeholder="Agra"
  />
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    State *
  </label>

  <input
    className={inputStyle}
    value={stateName}
    onChange={(e)=>setStateName(e.target.value)}
    placeholder="Uttar Pradesh"
  />
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Pincode *
  </label>

  <input
    className={inputStyle}
    maxLength={6}
    value={pincode}
    onChange={(e)=>setPincode(e.target.value.replace(/\D/g,""))}
    placeholder="282005"
  />
</div>

 <div className={sectionTitle}>
  <GraduationCap size={22}/>
  Admission Details
</div>

<div>
  <label className="mb-2 block font-semibold text-slate-700">
    Class Applying For *
  </label>

  <select
    className={selectStyle}
    value={studentClass}
    onChange={(e)=>setStudentClass(e.target.value)}
  >
    <option value="">Select Class</option>

    {[
      "Nursery","LKG","UKG","1","2","3","4","5","6","7","8"
    ].map((cls)=>(
      <option key={cls} value={cls}>
        {cls === "1"
          ? "Class 1"
          : cls === "2"
          ? "Class 2"
          : cls === "3"
          ? "Class 3"
          : cls === "4"
          ? "Class 4"
          : cls === "5"
          ? "Class 5"
          : cls === "6"
          ? "Class 6"
          : cls === "7"
          ? "Class 7"
          : cls === "8"
          ? "Class 8"
          : cls}
      </option>
    ))}
  </select>
</div>

{needsTC && (
  <>
    <div className="md:col-span-2 rounded-xl border border-yellow-300 bg-yellow-50 p-4">
      <p className="font-semibold text-yellow-800">
        Previous School Details Required
      </p>

      <p className="text-sm text-yellow-700">
        Since admission is for Class 2 or above, Transfer Certificate is mandatory.
      </p>
    </div>

    <div className="md:col-span-2">
      <label className="mb-2 block font-semibold text-slate-700">
        Previous School Name *
      </label>

      <input
        className={inputStyle}
        value={previousSchool}
        onChange={(e)=>setPreviousSchool(e.target.value)}
        placeholder="Enter previous school name"
      />
    </div>
  </>
)}
 <div className={sectionTitle}>
  <FileText size={22}/>
  Upload Required Documents
</div>

{[
  {
    title:"Student Passport Size Photo",
    setter:setStudentPhoto
  },
  {
    title:"Birth Certificate",
    setter:setBirthCertificate
  },
  {
    title:"Address Proof (Aadhaar / Electricity Bill / Ration Card)",
    setter:setAddressProof
  }
].map((doc,index)=>(
  <label
    key={index}
    className="cursor-pointer rounded-2xl border-2 border-dashed border-red-200 bg-red-50 p-5 transition hover:border-red-500 hover:bg-red-100"
  >
    <div className="flex items-center gap-4">
      <ImageIcon className="text-red-600"/>

      <div>
        <p className="font-semibold text-slate-800">{doc.title}</p>
        <p className="text-sm text-slate-500">
          JPG, PNG or PDF (Max 5 MB)
        </p>
      </div>
    </div>

    <input
      type="file"
      accept="image/*,application/pdf"
      className="mt-4 block w-full text-sm text-slate-700"
      onChange={(e)=>doc.setter(e.target.files?.[0] || null)}
    />
  </label>
))}

{needsTC && (
  <label className="md:col-span-2 cursor-pointer rounded-2xl border-2 border-dashed border-yellow-300 bg-yellow-50 p-5 hover:border-yellow-500">
    <div className="flex items-center gap-4">
      <FileText className="text-yellow-700"/>

      <div>
        <p className="font-semibold text-yellow-900">
          Transfer Certificate (TC)
        </p>

        <p className="text-sm text-yellow-700">
          Required for students taking admission in Class 2 or above.
        </p>
      </div>
    </div>

    <input
      type="file"
      accept="image/*,application/pdf"
      className="mt-4 block w-full text-sm text-slate-700"
      onChange={(e)=>setTcFile(e.target.files?.[0] || null)}
    />
  </label>
)}

 <div className="md:col-span-2 rounded-2xl border border-red-200 bg-red-50 p-5">
  <h4 className="font-bold text-red-700">Declaration</h4>

  <p className="mt-2 text-sm leading-6 text-slate-700">
    I hereby declare that all information provided in this admission application
    is true and correct. I understand that incorrect information may lead to
    cancellation of admission.
  </p>
</div>

<div className="md:col-span-2">
  <button
    type="submit"
    disabled={loading}
    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-700 to-red-500 py-4 text-lg font-bold text-white transition hover:scale-[1.01] disabled:opacity-50"
  >
    <Send size={22}/>

    {loading
      ? "Submitting Admission..."
      : "Submit Admission Application"}
  </button>
</div>
</form>

    </div>
    </>
  );
}