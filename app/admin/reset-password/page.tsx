
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LockKeyhole, ShieldCheck } from "lucide-react";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMessage(
          "Could not update your password. Open the latest reset link from your email and try again."
        );
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
      setErrorMessage("Something went wrong. Please try again.");
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
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
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
            disabled={loading}
            className="w-full rounded-xl bg-red-600 px-4 py-3.5 font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Updating password..." : "Set New Password"}
          </button>
        </form>
      </section>
    </main>
  );
}
