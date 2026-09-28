"use client";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Clock3 } from "lucide-react";
import { generateAdmissionPDF } from "./generateAdmissionPDF";
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
} from "lucide-react";

export default function AdmissionDrawer({
  admission,
  open,
  onClose,
  onStatusUpdate,
}: any) {
  const supabase = createClient();
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState(admission?.status || "Pending");
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    setStatus(admission?.status || "Pending");
  }, [admission?.status]);

  async function updateStatus(
    newStatus: "Approved" | "Rejected" | "Pending"
  ) {
    const confirmMessage =
      newStatus === "Approved"
        ? "Approve this admission?"
        : newStatus === "Rejected"
        ? "Reject this admission?"
        : "Mark this admission as Pending?";

    if (!confirm(confirmMessage)) return;

    setUpdating(true);

    const { error } = await supabase
      .from("admissions")
      .update({ status: newStatus })
      .eq("id", admission.id);

    if (error) {
      alert(error.message);
      setUpdating(false);
      return;
    }

    setStatus(newStatus);

    await onStatusUpdate?.();

    alert(`Admission ${newStatus} successfully.`);

    onClose();
    setUpdating(false);
  }

  function openPreview(url: string) {
    setPreviewUrl(url);
    setPreviewOpen(true);
  }

  if (!open || !admission) return null;


  return (
    <>
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white shadow-2xl">

      <div className="sticky top-0 z-10 flex items-start justify-between bg-gradient-to-r from-red-700 to-red-600 px-6 py-6 text-white shadow-md">
  <div>
    <h2 className="text-3xl font-bold">{admission.student_name}</h2>

    <p className="mt-1 font-medium text-red-100">
      Registration No. {admission.registration_number}
    </p>
  </div>

  <button
    onClick={onClose}
    className="rounded-full bg-white/20 p-2 hover:bg-white/30"
  >
    <X size={24} />
  </button>
</div>

<div
  id="admission-pdf"
  className="space-y-6 bg-white p-6"
>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-center">

  <img
  src="/logo/logo.png.png"
  crossOrigin="anonymous"
  className="mx-auto mb-3 h-20 w-20 object-contain"
  alt="Bright Bal Public School Logo"
/>
  <h1 className="text-2xl font-black text-red-700">
    BRIGHT BAL PUBLIC SCHOOL
  </h1>

  <p className="font-medium text-slate-800">
    18/162 M.P. Pura, Tajganj, Agra - 282001
  </p>

  <p className="text-sm font-medium text-slate-700">
    Admission Application Receipt
  </p>

</div>

          <img
  src={admission.student_photo_url}
  crossOrigin="anonymous"
  className="mx-auto h-36 w-36 rounded-full border object-cover"
/>

         <div className="pdf-section rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <h3 className="mb-5 text-xl font-bold text-red-700">
    Student Information
  </h3>

  <div className="grid grid-cols-2 gap-y-4 text-[15px]">

    <p className="font-semibold text-slate-700">Gender</p>
    <p className="font-medium text-slate-900">{admission.gender}</p>

    <p className="font-semibold text-slate-700">Date of Birth</p>
    <p className="font-medium text-slate-900">
      {new Date(admission.dob).toLocaleDateString("en-GB")}
    </p>

    <p className="font-semibold text-slate-700">Class Applied</p>
    <p className="font-medium text-slate-900">{admission.class}</p>

    <p className="font-semibold text-slate-700">Religion</p>
    <p className="font-medium text-slate-900">{admission.religion || "-"}</p>

    <p className="font-semibold text-slate-700">Category</p>
    <p className="font-medium text-slate-900">{admission.category || "-"}</p>

    <p className="font-semibold text-slate-700">Blood Group</p>
    <p className="font-medium text-slate-900">{admission.blood_group || "-"}</p>

    <p className="font-semibold text-slate-700">Aadhaar</p>
    <p className="font-medium text-slate-900">
      {admission.aadhaar_number
        ? `XXXXXXXX${String(admission.aadhaar_number).slice(-4)}`
        : "-"}
    </p>

    <p className="font-semibold text-slate-700">APAAR ID</p>
    <p className="font-medium text-slate-900">{admission.apaar_id || "-"}</p>

  </div>
</div>

          <div className="pdf-section rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <h3 className="mb-5 text-xl font-bold text-red-700">
    Parent Information
  </h3>

  <div className="space-y-4 text-[15px]">

    <div>
      <p className="text-sm font-semibold text-slate-500">Father's Name</p>
      <p className="text-slate-900 font-medium">{admission.father_name}</p>
    </div>

    <div>
      <p className="text-sm font-semibold text-slate-500">Occupation</p>
      <p className="text-slate-900 font-medium">{admission.father_occupation}</p>
    </div>

    <div>
      <p className="text-sm font-semibold text-slate-500">Mobile Number</p>
      <p className="text-slate-900 font-medium">{admission.father_phone}</p>
    </div>

    <hr className="border-slate-200"/>

    <div>
      <p className="text-sm font-semibold text-slate-500">Mother's Name</p>
      <p className="text-slate-900 font-medium">{admission.mother_name}</p>
    </div>

    <div>
      <p className="text-sm font-semibold text-slate-500">Occupation</p>
      <p className="text-slate-900 font-medium">{admission.mother_occupation}</p>
    </div>

    <div>
      <p className="text-sm font-semibold text-slate-500">Mobile Number</p>
      <p className="text-slate-900 font-medium">{admission.mother_phone}</p>
    </div>

    <div>
      <p className="text-sm font-semibold text-slate-500">Email Address</p>
      <p className="text-slate-900 font-medium">{admission.email || "-"}</p>
    </div>

  </div>
</div>

      <div className="pdf-section rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <h3 className="mb-5 text-xl font-bold text-red-700">
    Residential Address
  </h3>

  <p className="leading-7 text-slate-900 font-medium">
    {admission.address}
  </p>

  <p className="mt-3 text-slate-700 font-medium">
    {admission.city}, {admission.state} - {admission.pincode}
  </p>
</div>
         {/* ================= DOCUMENTS ================= */}

<div className="pdf-section rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
  <h3 className="mb-5 text-xl font-bold text-red-700">
    Uploaded Documents
  </h3>

  <div className="space-y-4">

    {[
      {
        title: "Student Passport Photo",
        url: admission.student_photo_url,
      },
      {
        title: "Birth Certificate",
        url: admission.birth_certificate_url,
      },
      {
        title: "Address Proof",
        url: admission.address_proof_url,
      },
      {
        title: "Transfer Certificate",
        url: admission.tc_url,
      },
    ].map((doc, index) => (
      <div
        key={index}
        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
      >
        <div className="flex items-center gap-3">
          <FileText className="text-red-600" size={22} />

          <div>
            <p className="font-semibold text-slate-900">{doc.title}</p>

            <p className="text-sm text-slate-600">
              {doc.url ? "Document Uploaded" : "Not Uploaded"}
            </p>
          </div>
        </div>

        {doc.url && (
          <div className="flex gap-2">

            <button
              onClick={() => openPreview(doc.url)}
              className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
            >
              <Eye size={18} />
            </button>

       <a
  href={`${doc.url}?download=${admission.registration_number}_${doc.title.replaceAll(" ", "_")}.png`}
  download
  className="rounded-lg bg-slate-700 p-2 text-white hover:bg-slate-900"
>
  <Download size={18} />
</a>

          </div>
        )}

      </div>
    ))}
</div>

</div> {/* PDF content ends here */}
<div className="mt-6 px-6 pb-2">
  <button
    onClick={() => generateAdmissionPDF(admission.registration_number)}
    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-700 py-4 text-lg font-bold text-white hover:bg-red-800"
  >
    <Download size={22} />
    Download Admission PDF
  </button>
</div>

<h3 className="text-xl font-bold text-red-700">
  Admission Status
</h3>

<div className="mt-6 grid grid-cols-3 gap-3">
  {/* Approve */}
  <button
    disabled={updating}
    onClick={() => updateStatus("Approved")}
    className={`group flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all duration-200 ${
      status === "Approved"
        ? "border-green-600 bg-green-600 text-white shadow-lg"
        : "border-green-200 bg-green-50 text-green-700 hover:border-green-500 hover:bg-green-100"
    }`}
  >
 
   
    <CheckCircle2 size={30} className="mb-2" />
    <span className="font-bold">Approve</span>
    <span className="mt-1 text-xs opacity-80">
      {status === "Approved" ? "Selected" : "Verify Admission"}
    </span>
  </button>

  {/* Reject */}
  <button
    disabled={updating}
    onClick={() => updateStatus("Rejected")}
    className={`group flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all duration-200 ${
      status === "Rejected"
        ? "border-red-600 bg-red-600 text-white shadow-lg"
        : "border-red-200 bg-red-50 text-red-700 hover:border-red-500 hover:bg-red-100"
    }`}
  >
    <XCircle size={30} className="mb-2" />
    <span className="font-bold">Reject</span>
    <span className="mt-1 text-xs opacity-80">
      {status === "Rejected" ? "Selected" : "Decline Admission"}
    </span>
  </button>

  {/* Pending */}
  <button
    disabled={updating}
    onClick={() => updateStatus("Pending")}
    className={`group flex flex-col items-center justify-center rounded-2xl border-2 p-4 transition-all duration-200 ${
      status === "Pending"
        ? "border-yellow-500 bg-yellow-500 text-white shadow-lg"
        : "border-yellow-200 bg-yellow-50 text-yellow-700 hover:border-yellow-500 hover:bg-yellow-100"
    }`}
  >
    <Clock3 size={30} className="mb-2" />
    <span className="font-bold">Pending</span>
    <span className="mt-1 text-xs opacity-80">
      {status === "Pending" ? "Selected" : "Keep Waiting"}
    </span>
  </button>
</div>

        </div>

         </div>
    </div>

    {/* ================= DOCUMENT PREVIEW MODAL ================= */}

    {previewOpen && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-5">

        <div className="relative max-h-[90vh] w-full max-w-5xl overflow-auto rounded-3xl bg-white p-5">

          <button
            onClick={() => setPreviewOpen(false)}
            className="absolute right-5 top-5 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
          >
            <X size={20} />
          </button>

          {previewUrl.endsWith(".pdf") ? (
            <iframe
              src={previewUrl}
              className="h-[80vh] w-full rounded-xl"
            />
          ) : (
            <img
              src={previewUrl}
              alt="Document Preview"
              className="mx-auto max-h-[80vh] rounded-xl object-contain"
            />
          )}

          <div className="mt-5 flex justify-end gap-3">

            <button
              onClick={() => window.open(previewUrl, "_blank")}
              className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white hover:bg-slate-900"
            >
              <ExternalLink className="mr-2 inline" size={18} />
              Open Full Size
            </button>

            <button
  onClick={async () => {
    const response = await fetch(`${previewUrl}?download`);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
      previewUrl.split("/").pop()?.split("?")[0] || "document";

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  }}
  className="rounded-xl bg-red-700 px-5 py-3 font-semibold text-white hover:bg-red-800"
>
  <Download className="mr-2 inline" size={18} />
  Download
</button>

          </div>

        </div>

      </div>
    )}

  </>
);
}