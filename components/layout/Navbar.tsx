"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type SchoolSettings = {
  school_name: string;
  tagline: string;
  admission_open: boolean;
  logo_url: string;
};

type NavbarProps = {
  schoolSettings?: SchoolSettings;
};

const defaultSchool: SchoolSettings = {
  school_name: "Bright Bal Public School",
  tagline: "English Medium School",
  admission_open: true,
  logo_url: "",
};

export default function Navbar({ schoolSettings }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const transparentHome = pathname === "/" && !isScrolled && !isOpen;

  const school = schoolSettings ?? defaultSchool;

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 24);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Notices", href: "/notices" },
    { name: "Admissions", href: "/admissions" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Main Navbar */}
      <div
        className={`border-b backdrop-blur-2xl transition-colors duration-300 ${
          transparentHome
            ? "border-transparent bg-transparent shadow-none"
            : "border-slate-200/70 bg-white/90 shadow-[0_8px_35px_rgba(15,23,42,0.07)]"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* =========================
              BRAND
          ========================== */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3.5"
          >
            {/* Logo */}
            <div className="relative">
              {/* Subtle brand glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500/20 via-indigo-500/10 to-blue-500/20 blur-md transition duration-300 group-hover:opacity-100" />

              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-red-200 group-hover:shadow-md sm:h-[52px] sm:w-[52px]">
                <Image
                  src={
                    school.logo_url?.trim()
                      ? school.logo_url
                      : "/logo/logo.png.png"
                  }
                  alt="Bright Bal Public School"
                  width={56}
                  height={56}
                  priority
                  className="h-full w-full object-contain p-1"
                />
              </div>
            </div>

            {/* Brand Text */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className={`whitespace-nowrap text-[15px] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-300 sm:text-lg lg:text-xl ${transparentHome ? "text-white group-hover:text-emerald-200" : "text-slate-950 group-hover:text-red-700"}`}>
                  {school.school_name}
                </h1>

                {/* Small premium dot */}
                <span className="hidden h-1.5 w-1.5 rounded-full bg-gradient-to-r from-red-500 to-indigo-500 sm:block" />
              </div>

              <p className={`mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-[10px] ${transparentHome ? "text-white/70" : "text-slate-400"}`}>
                {school.tagline}
              </p>
            </div>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <div className="hidden items-center gap-5 md:flex lg:gap-7">

            <nav className={`flex items-center rounded-2xl border px-2 py-1.5 ${transparentHome ? "border-white/20 bg-black/10" : "border-slate-200/70 bg-slate-50/60"}`}>
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group relative mx-0.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all duration-300 lg:px-3.5 ${
                      transparentHome
                        ? active
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                        : active
                          ? "text-slate-950"
                          : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <span className="relative z-10">
                      {link.name}
                    </span>

                    {/* Active background */}
                    <span
                      className={`absolute inset-0 -z-0 rounded-xl transition-all duration-300 ${
                        transparentHome
                          ? active
                            ? "bg-white/15"
                            : "bg-transparent group-hover:bg-white/10"
                          : active
                            ? "bg-white shadow-sm"
                            : "bg-transparent group-hover:bg-white/70"
                      }`}
                    />

                    {/* Accent underline */}
                    <span
                      className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-red-600 to-indigo-600 transition-all duration-300 ${
                        active
                          ? "w-5"
                          : "w-0 group-hover:w-5"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* =========================
                APPLY BUTTON
            ========================== */}
            {school.admission_open ? (
              <Link
                href="/admissions"
                
className="group relative isolate overflow-hidden rounded-2xl bg-[#C62828] px-6 py-3 font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B71C1C] hover:shadow-xl hover:shadow-red-600/30 animate-[applyPulse_3s_ease-in-out_infinite]"

              >
              <span className="relative z-10 inline-flex items-center gap-2">
  Apply Now
  <ArrowRight size={18} />
</span>

                <span
  aria-hidden="true"
  className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[applyShine_4s_ease-in-out_infinite]"
/>

                {!transparentHome && (
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-700 to-blue-600 transition-transform duration-500 group-hover:translate-x-0" />
                )}
              </Link>
            ) : (
              <button
                disabled
                className="cursor-not-allowed rounded-xl bg-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600"
              >
                Admissions Closed
              </button>
            )}
          </div>

          {/* =========================
              MOBILE BUTTON
          ========================== */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all duration-300 md:hidden ${transparentHome ? "border-white/30 bg-white/10 text-white hover:bg-white/20" : "border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"}`}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* Premium Accent Line */}
        <div className={`h-[2px] w-full bg-gradient-to-r from-red-600 via-indigo-600 to-blue-500 transition-opacity duration-300 ${transparentHome ? "opacity-0" : "opacity-80"}`} />
      </div>

      {/* =========================
          MOBILE MENU
      ========================== */}
      {isOpen && (
        <div className="border-b border-slate-200 bg-white/95 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="mx-auto max-w-7xl px-5 py-5">

            {/* Mobile brand label */}
            <div className="mb-3 flex items-center gap-2 px-2">
              <span className="h-px w-5 bg-red-500" />

              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Navigation
              </span>
            </div>

            <div className="space-y-1.5">
              {navLinks.map((link) => {
                const active = pathname === link.href;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-gradient-to-r from-red-50 to-indigo-50 text-red-700"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    <span>{link.name}</span>

                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        active
                          ? "bg-red-600"
                          : "bg-slate-200 group-hover:bg-indigo-500"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Mobile Apply */}
            {school.admission_open ? (
              <Link
                href="/admissions"
                onClick={() => setIsOpen(false)}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-rose-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/20"
              >
                Apply for Admission
                <ArrowRight size={17} />
              </Link>
            ) : (
              <button
                disabled
                className="mt-4 w-full cursor-not-allowed rounded-xl bg-slate-300 py-3.5 text-sm font-semibold text-slate-600"
              >
                Admissions Closed
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}