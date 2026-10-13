
"use client";

import NavbarBus from "./NavbarBus";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  GraduationCap,
  FileCheck2,
} from "lucide-react";
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

const admissionLinks = [
  {
    name: "New Admission",
    description: "Apply for admission",
    href: "/admissions",
    icon: GraduationCap,
  },
  {
    name: "Registered Student Update",
    description: "Update existing student records",
    href: "/registered-students",
    icon: FileCheck2,
  },
];

export default function Navbar({ schoolSettings }: NavbarProps) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [admissionsOpen, setAdmissionsOpen] = useState(false);

  const transparentHome =
    pathname === "/" && !isScrolled && !isOpen;

  const school = schoolSettings ?? defaultSchool;

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateScrollState();

    window.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, [pathname]);

  useEffect(() => {
    setIsOpen(false);
    setAdmissionsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Notices", href: "/notices" },
    { name: "Contact", href: "/contact" },
  ];

  const isAdmissionActive =
    pathname === "/admissions" ||
    pathname.startsWith("/admissions/") ||
    pathname === "/registered-students";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative border-b backdrop-blur-2xl transition-colors duration-300 ${
          transparentHome
            ? "border-transparent bg-transparent shadow-none"
            : "border-slate-200/70 bg-white/95 shadow-[0_8px_35px_rgba(15,23,42,0.07)]"
        }`}
      >
        <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* BRAND */}
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3.5"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
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

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1
                  className={`whitespace-nowrap text-[15px] font-extrabold leading-none tracking-[-0.02em] transition-colors duration-300 sm:text-lg lg:text-xl ${
                    transparentHome
                      ? "text-white group-hover:text-emerald-200"
                      : "text-slate-950 group-hover:text-red-700"
                  }`}
                >
                  {school.school_name}
                </h1>

                <span className="hidden h-1.5 w-1.5 rounded-full bg-gradient-to-r from-red-500 to-indigo-500 sm:block" />
              </div>

              <p
                className={`mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] sm:text-[10px] ${
                  transparentHome ? "text-white/70" : "text-slate-400"
                }`}
              >
                {school.tagline}
              </p>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden items-center gap-4 md:flex lg:gap-6">
            <nav
              className={`flex items-center rounded-2xl border px-2 py-1.5 ${
                transparentHome
                  ? "border-white/20 bg-black/10"
                  : "border-slate-200/70 bg-slate-50/60"
              }`}
            >
              {navLinks.slice(0, 4).map((link) => {
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

                    <span
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        transparentHome
                          ? active
                            ? "bg-white/15"
                            : "bg-transparent group-hover:bg-white/10"
                          : active
                            ? "bg-white shadow-sm"
                            : "bg-transparent group-hover:bg-white/70"
                      }`}
                    />

                    <span
                      className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-red-600 to-indigo-600 transition-all duration-300 ${
                        active ? "w-5" : "w-0 group-hover:w-5"
                      }`}
                    />
                  </Link>
                );
              })}

              {/* ADMISSIONS DROPDOWN */}
              <div
                className="relative mx-0.5"
                onMouseEnter={() => setAdmissionsOpen(true)}
                onMouseLeave={() => setAdmissionsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() =>
                    setAdmissionsOpen((previous) => !previous)
                  }
                  aria-expanded={admissionsOpen}
                  aria-haspopup="true"
                  className={`group relative flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition-all duration-300 lg:px-3.5 ${
                    transparentHome
                      ? isAdmissionActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                      : isAdmissionActive
                        ? "text-slate-950"
                        : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span className="relative z-10">Admissions</span>

                  <ChevronDown
                    size={15}
                    className={`relative z-10 transition-transform duration-300 ${
                      admissionsOpen ? "rotate-180" : ""
                    }`}
                  />

                  <span
                    className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      transparentHome
                        ? isAdmissionActive
                          ? "bg-white/15"
                          : "bg-transparent group-hover:bg-white/10"
                        : isAdmissionActive
                          ? "bg-white shadow-sm"
                          : "bg-transparent group-hover:bg-white/70"
                    }`}
                  />
                </button>

                {/* DROPDOWN PANEL */}
                <div
                  className={`absolute left-1/2 top-full z-[70] w-[310px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                    admissionsOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
                    <div className="px-3 pb-2 pt-2">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Student Services
                      </p>
                    </div>

                    {admissionLinks.map((item) => {
                      const Icon = item.icon;
                      const active = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setAdmissionsOpen(false)}
                          className={`group flex items-center gap-3 rounded-xl p-3 transition-all duration-200 ${
                            active
                              ? "bg-red-50"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                              active
                                ? "bg-[#C62828] text-white"
                                : "bg-blue-50 text-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white"
                            }`}
                          >
                            <Icon size={21} />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span
                              className={`block text-sm font-bold ${
                                active
                                  ? "text-[#C62828]"
                                  : "text-slate-800"
                              }`}
                            >
                              {item.name}
                            </span>
                            <span className="mt-1 block text-xs text-slate-500">
                              {item.description}
                            </span>
                          </span>

                          <ArrowRight
                            size={16}
                            className="shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#C62828]"
                          />
                        </Link>
                      );
                    })}

                    <div className="mx-2 my-2 h-px bg-slate-100" />

                    <p className="px-3 pb-2 text-[11px] leading-5 text-slate-400">
                      Select the appropriate option to continue.
                    </p>
                  </div>
                </div>
              </div>

              {navLinks.slice(4).map((link) => {
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
                    <span className="relative z-10">{link.name}</span>
                    <span
                      className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                        transparentHome
                          ? active
                            ? "bg-white/15"
                            : "bg-transparent group-hover:bg-white/10"
                          : active
                            ? "bg-white shadow-sm"
                            : "bg-transparent group-hover:bg-white/70"
                      }`}
                    />
                    <span
                      className={`absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-red-600 to-indigo-600 transition-all duration-300 ${
                        active ? "w-5" : "w-0 group-hover:w-5"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* APPLY BUTTON */}
            {school.admission_open ? (
              <Link
                href="/admissions"
                className="group relative isolate animate-[applyPulse_3s_ease-in-out_infinite] overflow-hidden rounded-2xl bg-[#C62828] px-5 py-3 font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B71C1C] hover:shadow-xl hover:shadow-red-600/30 lg:px-6"
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

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setIsOpen((previous) => !previous)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border shadow-sm transition-all duration-300 md:hidden ${
              transparentHome
                ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
                : "border-slate-200 bg-white text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            }`}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <NavbarBus transparent={transparentHome} />

        {/* ACCENT LINE */}
        <div
          className={`h-[2px] w-full bg-gradient-to-r from-red-600 via-indigo-600 to-blue-500 transition-opacity duration-300 ${
            transparentHome ? "opacity-0" : "opacity-80"
          }`}
        />
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="max-h-[calc(100vh-80px)] overflow-y-auto border-b border-slate-200 bg-white/95 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="mx-auto max-w-7xl px-5 py-5">
            <div className="mb-3 flex items-center gap-2 px-2">
              <span className="h-px w-5 bg-red-500" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
                Navigation
              </span>
            </div>

            <div className="space-y-1.5">
              {navLinks.slice(0, 4).map((link) => {
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

              {/* MOBILE ADMISSIONS ACCORDION */}
              <div className="overflow-hidden rounded-xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() =>
                    setAdmissionsOpen((previous) => !previous)
                  }
                  aria-expanded={admissionsOpen}
                  className={`flex w-full items-center justify-between px-4 py-3.5 text-sm font-semibold transition ${
                    isAdmissionActive
                      ? "bg-red-50 text-red-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span>Admissions</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      admissionsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    admissionsOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-1 bg-slate-50 p-2">
                      {admissionLinks.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => {
                              setIsOpen(false);
                              setAdmissionsOpen(false);
                            }}
                            className={`flex items-center gap-3 rounded-xl p-3 transition ${
                              active
                                ? "bg-white text-red-700 shadow-sm"
                                : "text-slate-700 hover:bg-white"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                active
                                  ? "bg-red-100 text-red-700"
                                  : "bg-blue-50 text-[#1565C0]"
                              }`}
                            >
                              <Icon size={20} />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-bold">
                                {item.name}
                              </span>
                              <span className="mt-1 block text-xs text-slate-500">
                                {item.description}
                              </span>
                            </span>
                            <ArrowRight size={16} className="shrink-0 text-slate-400" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {navLinks.slice(4).map((link) => {
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

            {/* MOBILE APPLY BUTTON */}
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
