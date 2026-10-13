
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "registered-student-documents";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const VALID_STATUSES = [
  "Pending Review",
  "Under Review",
  "Needs Correction",
  "Verified",
  "Rejected",
] as const;

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function authorizeAdmin(request: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceKey) {
    return {
      error: errorResponse("Supabase server configuration is missing.", 500),
    };
  }

  const authorization = request.headers.get("authorization") ?? "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  if (!token) {
    return {
      error: errorResponse("Admin login required.", 401),
    };
  }

  const authClient = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await authClient.auth.getUser(token);

  if (error || !data.user) {
    return {
      error: errorResponse("Session expired. Please log in again.", 401),
    };
  }

  const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const email = data.user.email?.toLowerCase();

  if (!email || !allowedEmails.includes(email)) {
    return {
      error: errorResponse("Admin access denied.", 403),
    };
  }

  const admin = createClient(url, serviceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return { admin };
}

function isValidUuid(id: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const auth = await authorizeAdmin(request);
    if ("error" in auth) return auth.error;

    const { id } = await context.params;

    if (!isValidUuid(id)) {
      return errorResponse("Invalid student ID.", 400);
    }

    const { data: student, error: studentError } = await auth.admin
      .from("registered_student_updates")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (studentError) {
      console.error("Student query error:", studentError.message);
      return errorResponse("Unable to load student details.", 500);
    }

    if (!student) {
      return errorResponse("Student record not found.", 404);
    }

    const { data: documents, error: documentsError } = await auth.admin
      .from("registered_student_documents")
      .select(
        "id, document_type, storage_path, original_filename, mime_type, file_size_bytes, created_at"
      )
      .eq("submission_id", id)
      .order("created_at", { ascending: true });

    if (documentsError) {
      console.error("Documents query error:", documentsError.message);
      return errorResponse("Unable to load student documents.", 500);
    }

    console.log("Student ID:", id);
console.log("Documents found:", documents?.length ?? 0);

    const documentsWithUrls = await Promise.all(
      (documents ?? []).map(async (document) => {
        const { data, error } = await auth.admin.storage
          .from(BUCKET)
          .createSignedUrl(document.storage_path, 300);

        if (error) {
          console.error("Signed URL error:", error.message);
        }

        return {
          id: document.id,
          document_type: document.document_type,
          original_filename: document.original_filename,
          mime_type: document.mime_type,
          file_size_bytes: document.file_size_bytes,
          created_at: document.created_at,
          url: error ? null : data.signedUrl,
        };
      })
    );

    return NextResponse.json(
      {
        record: {
          ...student,
          documents: documentsWithUrls,
        },
      },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (error) {
    console.error("Registered student GET error:", error);
    return errorResponse("Unexpected server error.", 500);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const auth = await authorizeAdmin(request);
    if ("error" in auth) return auth.error;

    const { id } = await context.params;

    if (!isValidUuid(id)) {
      return errorResponse("Invalid student ID.", 400);
    }

    const body = await request.json();

    if (
      !body ||
      typeof body.status !== "string" ||
      !VALID_STATUSES.includes(
        body.status as (typeof VALID_STATUSES)[number]
      )
    ) {
      return errorResponse("Invalid review status.", 400);
    }

    if (
      body.admin_notes !== null &&
      body.admin_notes !== undefined &&
      (typeof body.admin_notes !== "string" || body.admin_notes.length > 2000)
    ) {
      return errorResponse("Admin notes must be 2000 characters or fewer.", 400);
    }

    const notes =
      typeof body.admin_notes === "string"
        ? body.admin_notes.trim() || null
        : null;

    if (body.status === "Needs Correction" && !notes) {
      return errorResponse(
        "Add a note explaining what needs correction.",
        400
      );
    }

    const { data: student, error } = await auth.admin
      .from("registered_student_updates")
      .update({
        status: body.status,
        admin_notes: notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("Student update error:", error.message);
      return errorResponse("Unable to save student review.", 500);
    }

    if (!student) {
      return errorResponse("Student record not found.", 404);
    }

    return NextResponse.json(
      { record: student },
      { headers: { "Cache-Control": "private, no-store" } }
    );
  } catch (error) {
    console.error("Registered student PATCH error:", error);
    return errorResponse("Unexpected server error.", 500);
  }
}
