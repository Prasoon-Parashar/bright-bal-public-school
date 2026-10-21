
"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function ResetPasswordPage() {
  const [supabase] = useState(() => createClient());
  const router = useRouter();
  const recoveryHandled = useRef(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [recoveryReady, setRecoveryReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    

    async function initializeRecovery() {
       if (recoveryHandled.current) return;
  recoveryHandled.current = true;
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!mounted) return;

        if (error) {
          setErrorMessage(
            `Reset link could not be verified: ${error.message}. Request a new reset email.`
          );
          return;
        }

        // Remove the one-time code from the address bar.
        url.searchParams.delete("code");
        window.history.replaceState({}, "", url.toString());
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error) {
        setErrorMessage(`Could not verify recovery session: ${error.message}`);
        return;
      }

      if (session) {
        setRecoveryReady(true);
      } else {
        setErrorMessage(
          "Reset session is missing or expired. Request a new password reset email and open its latest link."
        );
      }
    }

    void initializeRecovery();

    return () => {
      mounted = false;
    };
  }, [supabase]);

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        setErrorMessage(
          sessionError?.message ??
            "Your recovery session has expired. Request a new reset email."
        );
        return;
      }

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setErrorMessage(`Password update failed: ${error.message}`);
        return;
      }

      setSuccessMessage(
        "Password updated successfully. Redirecting to login..."
      );

      await supabase.auth.signOut();

      window.setTimeout(() => {
        router.replace("/admin/login");
      }, 1500);
    } catch (error) {
      console.error("Password update failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-950 via-red-800 to-slate-950 px-4 py-8">
      <section className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-red-700 to-red-500 px-6 py-8 text-center text-white sm:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <ShieldCheck size={30} />
          </div>

          <h1 className="mt-4 text-2xl font-extrabold">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-red-100">
            Set a new password for your admin account.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-5 p-6 sm:p-8">
          <div>
            <label
              htmlFor="new-password"
              className="mb-2 block text-sm font-bold text-slate-800"
            >
              New Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="mb-2 block text-sm font-bold text-slate-800"
            >
              Confirm New Password
            </label>

            <input
              id="confirm-password"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Enter the password again"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-red-600 focus:ring-4 focus:ring-red-600/10"
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="break-words rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            >
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p
              role="status"
              className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-semibold text-green-700"
            >
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !recoveryReady}
            className="w-full rounded-xl bg-red-600 px-4 py-3.5 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Updating password..."
              : !recoveryReady
                ? "Verifying reset link..."
                : "Set New Password"}
          </button>
        </form>
      </section>
    </main>
  );
}
