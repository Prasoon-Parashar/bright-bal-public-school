
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function GET(request: Request) {
  try {
    if (!supabaseUrl || !anonKey || !serviceKey) {
      console.error("Missing Supabase environment variables.");
      return jsonError("Server configuration is incomplete.", 500);
    }

    const authorization = request.headers.get("authorization");
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice(7)
      : "";

    if (!token) {
      return jsonError("Please sign in as an administrator.", 401);
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: userData, error: authError } =
      await authClient.auth.getUser(token);

    if (authError || !userData.user) {
      return jsonError("Your session is invalid or expired.", 401);
    }

    const allowedEmails = (process.env.ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    const email = userData.user.email?.toLowerCase();

    if (!email || !allowedEmails.includes(email)) {
      return jsonError("Administrator access is not permitted.", 403);
    }

    const adminClient = createClient(supabaseUrl, serviceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data, error } = await adminClient
      .from("registered_student_updates")
      .select(
        [
          "id",
          "reference_number",
          "admission_number",
          "academic_session",
          "student_name",
          "date_of_birth",
          "gender",
          "religion",
          "category",
          "apaar_id",
          "blood_group",
          "current_class",
          "section",
          "guardian_name",
          "guardian_relation",
          "guardian_mobile",
          "alternate_mobile",
          "guardian_email",
          "address_line",
          "city",
          "state",
          "postal_code",
          "emergency_contact",
          "declaration_accepted",
          "status",
          "admin_notes",
          "created_at",
          "updated_at",
        ].join(",")
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Registered student query failed:", error.message);
      return jsonError("Unable to load registered student records.", 500);
    }

    return NextResponse.json(
      { records: data ?? [] },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error("Registered students GET error:", error);
    return jsonError("An unexpected server error occurred.", 500);
  }
}
