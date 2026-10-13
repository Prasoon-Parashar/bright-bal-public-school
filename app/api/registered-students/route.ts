
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";

export const runtime = "nodejs";

const BUCKET = "registered-student-documents";
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedDocuments = [
  "student_photo",
  "aadhaar_card",
  "birth_certificate",
  "address_proof",
  "affidavit",
  "caste_certificate",
  "ews_certificate",
  "other_certificate",
] as const;

const requiredDocuments = [
  "student_photo",
  "aadhaar_card",
  "address_proof",
];

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
];

function textValue(data: FormData, key: string) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validMobile(value: string) {
  return /^[6-9]\d{9}$/.test(value);
}

export async function POST(request: Request) {
let supabase: any;

  let uploadedPaths: string[] = [];
  let submissionId: string | undefined;

  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid form submission." },
        { status: 415 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "Server configuration is incomplete." },
        { status: 500 }
      );
    }

    supabase = createClient(supabaseUrl, serviceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    const data = await request.formData();

    // Honeypot: bots often fill hidden fields.
    if (textValue(data, "website")) {
      return NextResponse.json(
        { error: "Unable to process this submission." },
        { status: 400 }
      );
    }

    const fields = {
      admission_number: textValue(data, "admission_number"),
      academic_session: textValue(data, "academic_session"),
      student_name: textValue(data, "student_name"),
      date_of_birth: textValue(data, "date_of_birth"),
      gender: textValue(data, "gender"),
      religion: textValue(data, "religion"),
      category: textValue(data, "category"),
      aadhaar_number: textValue(data, "aadhaar_number"),
      apaar_id: textValue(data, "apaar_id"),
      blood_group: textValue(data, "blood_group"),
      current_class: textValue(data, "current_class"),
      section: textValue(data, "section"),
      guardian_name: textValue(data, "guardian_name"),
      guardian_relation: textValue(data, "guardian_relation"),
      guardian_mobile: textValue(data, "guardian_mobile"),
      alternate_mobile: textValue(data, "alternate_mobile"),
      guardian_email: textValue(data, "guardian_email"),
      address_line: textValue(data, "address_line"),
      city: textValue(data, "city"),
      state: textValue(data, "state"),
      postal_code: textValue(data, "postal_code"),
      emergency_contact: textValue(data, "emergency_contact"),
    };

    const declaration =
      textValue(data, "declaration_accepted") === "true";

      if (
  ![
    "Hindu",
    "Muslim",
    "Christian",
    "Sikh",
    "Buddhist",
    "Jain",
    "Other",
  ].includes(fields.religion)
) {
  return NextResponse.json(
    { error: "Please select a valid religion." },
    { status: 400 }
  );
}

    const requiredValues = [
      fields.admission_number,
      fields.academic_session,
      fields.student_name,
      fields.date_of_birth,
      fields.gender,
      fields.category,
      fields.current_class,
      fields.guardian_name,
      fields.guardian_relation,
      fields.guardian_mobile,
      fields.address_line,
      fields.city,
      fields.state,
      fields.postal_code,
    ];

    if (requiredValues.some((value) => !value)) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
        { status: 400 }
      );
    }

    if (!declaration) {
      return NextResponse.json(
        { error: "Please accept the declaration." },
        { status: 400 }
      );
    }

    if (!["Male", "Female", "Other"].includes(fields.gender)) {
      return NextResponse.json(
        { error: "Invalid gender selection." },
        { status: 400 }
      );
    }

    if (!["General", "OBC", "SC", "ST", "EWS", "Other"].includes(fields.category)) {
      return NextResponse.json(
        { error: "Invalid category selection." },
        { status: 400 }
      );
    }

    if (!validMobile(fields.guardian_mobile)) {
      return NextResponse.json(
        { error: "Enter a valid 10-digit parent mobile number." },
        { status: 400 }
      );
    }

    for (const mobile of [
      fields.alternate_mobile,
      fields.emergency_contact,
    ]) {
      if (mobile && !validMobile(mobile)) {
        return NextResponse.json(
          { error: "Enter valid 10-digit contact numbers." },
          { status: 400 }
        );
      }
    }

    if (
      fields.aadhaar_number &&
      !/^\d{12}$/.test(fields.aadhaar_number)
    ) {
      return NextResponse.json(
        { error: "Aadhaar number must contain 12 digits." },
        { status: 400 }
      );
    }

    if (
      !/^\d{6}$/.test(fields.postal_code) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(fields.date_of_birth) ||
      Number.isNaN(Date.parse(fields.date_of_birth)) ||
      new Date(`${fields.date_of_birth}T00:00:00`) > new Date()
    ) {
      return NextResponse.json(
        { error: "Please check the date of birth and PIN code." },
        { status: 400 }
      );
    }

    if (
      fields.guardian_email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.guardian_email)
    ) {
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      ["OBC", "SC", "ST"].includes(fields.category) &&
      !(data.get("caste_certificate") instanceof File &&
        (data.get("caste_certificate") as File).size > 0)
    ) {
      return NextResponse.json(
        { error: "Please upload the caste certificate." },
        { status: 400 }
      );
    }

    if (
      fields.category === "EWS" &&
      !(data.get("ews_certificate") instanceof File &&
        (data.get("ews_certificate") as File).size > 0)
    ) {
      return NextResponse.json(
        { error: "Please upload the EWS certificate." },
        { status: 400 }
      );
    }

    const files: { key: string; file: File }[] = [];

    for (const key of allowedDocuments) {
      const value = data.get(key);

      if (value instanceof File && value.size > 0) {
        if (!allowedMimeTypes.includes(value.type)) {
          return NextResponse.json(
            { error: `Unsupported file type for ${key}.` },
            { status: 400 }
          );
        }

        if (value.size > MAX_FILE_SIZE) {
          return NextResponse.json(
            { error: `Each file must be 5 MB or smaller (${key}).` },
            { status: 400 }
          );
        }

        files.push({ key, file: value });
      }
    }

    for (const key of requiredDocuments) {
      if (!files.some((item) => item.key === key)) {
        return NextResponse.json(
          { error: `Please upload the required document: ${key}.` },
          { status: 400 }
        );
      }
    }

    const { data: record, error: insertError } = await supabase
      .from("registered_student_updates")
      .insert({
        ...fields,
        declaration_accepted: true,
      })
      .select("id, reference_number")
      .single();

    if (insertError || !record) {
      return NextResponse.json(
        { error: "Could not save the student record. Please check the details and try again." },
        { status: 400 }
      );
    }

    submissionId = record.id;

    const documentRows = [];

    for (const item of files) {
      const extension =
        item.file.type === "application/pdf"
          ? "pdf"
          : item.file.type === "image/png"
            ? "png"
            : "jpg";

      const storagePath =
        `${record.id}/${item.key}-${randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, item.file, {
          contentType: item.file.type,
          upsert: false,
        });

      if (uploadError) {
        throw new Error("A document could not be uploaded. Please try again.");
      }

      uploadedPaths.push(storagePath);

      documentRows.push({
        submission_id: record.id,
        document_type: item.key,
        storage_path: storagePath,
        original_filename: item.file.name.slice(0, 255),
        mime_type: item.file.type,
        file_size_bytes: item.file.size,
      });
    }

    const { error: documentsError } = await supabase
      .from("registered_student_documents")
      .insert(documentRows);

    if (documentsError) {
      throw new Error("Documents could not be saved. Please try again.");
    }

    return NextResponse.json(
      { reference_number: record.reference_number },
      { status: 201 }
    );
  } catch (error) {
    // Clean up partial submissions if an upload or document insert fails.
    if (supabase && uploadedPaths.length > 0) {
      await supabase.storage.from(BUCKET).remove(uploadedPaths);
    }

    if (supabase && submissionId) {
      await supabase
        .from("registered_student_updates")
        .delete()
        .eq("id", submissionId);
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unexpected server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
