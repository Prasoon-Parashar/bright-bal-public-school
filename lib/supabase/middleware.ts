
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({ request });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
 const isPublicAdminAuthPage =
  pathname === "/admin/login" ||
  pathname === "/admin/reset-password";

const isAdminRoute =
  pathname.startsWith("/admin") && !isPublicAdminAuthPage;

  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const isAuthorizedAdmin =
    !error &&
    !!user?.email &&
    adminEmails.includes(user.email.toLowerCase());

  // Unauthenticated or unauthorized users cannot access admin pages.
  if (isAdminRoute && !isAuthorizedAdmin) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";

    return NextResponse.redirect(url);
  }

  // Keep the login page public. Do not redirect logged-in users here;
  // the login page itself must remain accessible while we diagnose sessions.
  return response;
}
