import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Check current logged-in user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Login page ko public rehne do
  const isLoginPage = pathname === "/admin/login";

  // Baaki saare /admin routes protected
  const isAdminRoute =
    pathname.startsWith("/admin") && !isLoginPage;

  // Login nahi hai aur admin page khol raha hai
  if (!user && isAdminRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";

    return NextResponse.redirect(url);
  }

  // Already logged in hai aur login page khol raha hai
  if (user && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/dashboard";

    return NextResponse.redirect(url);
  }

  return response;
}