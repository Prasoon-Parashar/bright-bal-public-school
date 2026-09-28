"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Unable to connect to the server. Please check your Supabase configuration."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-red-950 via-red-800 to-slate-950 px-6 py-12">

      {/* Background Effects */}

      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-red-500/30 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[140px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />


      {/* Login Card */}

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}

        <div className="mb-8 flex flex-col items-center text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white shadow-2xl shadow-black/30">

            <GraduationCap
              size={42}
              className="text-red-700"
            />

          </div>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-white">
            Bright Bal Public School
          </h1>

      

        </div>


        {/* Card */}

        <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-white shadow-2xl shadow-black/40">

          {/* Header */}

          <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-8 py-8 text-center text-white">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">

              <ShieldCheck size={30} />

            </div>

            <h2 className="mt-4 text-3xl font-extrabold">
              Admin Login
            </h2>

            <p className="mt-2 text-sm text-red-100">
              Secure access to your school administration panel
            </p>

          </div>


          {/* Form */}

          <form
            onSubmit={handleLogin}
            className="space-y-6 p-8"
          >

            {/* Email */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-800">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="admin@example.com"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-4 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-800">
                Password
              </label>

              <div className="relative">

                <LockKeyhole
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 py-4 pl-12 pr-12 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-red-700"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>


            {/* Error */}

            {errorMessage && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {errorMessage}
              </div>
            )}


            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-700 to-red-600 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-red-800 hover:to-red-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Login
                  <ArrowRight
                    size={20}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}

            </button>

          </form>


          {/* Footer */}

          <div className="border-t border-slate-100 bg-slate-50 px-8 py-5 text-center">

            <p className="text-xs text-slate-500">
              🔒 Authorized personnel only
            </p>

          </div>

        </div>


        {/* Bottom */}

        <p className="mt-6 text-center text-xs text-red-200">
          Bright Bal Public School • Administration Portal
        </p>

      </div>

    </main>
  );
}