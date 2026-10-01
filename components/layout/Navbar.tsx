"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type SchoolSettings = {
  school_name: string;
  tagline: string;
  admission_open: boolean;
  logo_url: string;
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const [school, setSchool] = useState<SchoolSettings>({
    school_name: "Bright Bal Public School",
    tagline: "English Medium School",
    admission_open: true,
    logo_url: "",
  });

  useEffect(() => {
    fetchSchoolSettings();
  }, []);

  async function fetchSchoolSettings() {
    const { data, error } = await supabase
      .from("school_settings")
      .select("school_name, tagline, admission_open, logo_url")
      .single();

    if (!error && data) {
      setSchool(data);
    }
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Notices", href: "/notices" },
    { name: "Admissions", href: "/admissions" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-red-100 bg-white/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-5 lg:px-8">

        {/* ---------- LOGO + SCHOOL NAME ---------- */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-red-200 bg-white shadow-sm sm:h-14 sm:w-14">
            <Image
              src={
                school.logo_url && school.logo_url !== ""
                  ? `${school.logo_url}?v=${Date.now()}`
                  : "/logo/logo.png.png"
              }
              alt="Bright Bal Public School"
              width={56}
              height={56}
              priority
              className="h-full w-full object-cover"
              unoptimized
            />
          </div>

          {/* SCHOOL NAME - NOW VISIBLE ON MOBILE */}
          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-base font-extrabold leading-tight text-red-700 sm:text-xl lg:text-2xl">
              {school.school_name}
            </h1>

            <p className="mt-0.5 text-[11px] font-medium text-slate-600 sm:mt-1 sm:text-sm">
              {school.tagline}
            </p>
          </div>
        </Link>

        {/* ---------- DESKTOP MENU ---------- */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`group relative text-[15px] font-semibold transition-all duration-300 ${
                  active
                    ? "text-red-700"
                    : "text-slate-700 hover:text-red-700"
                }`}
              >
                {link.name}

                <span
                  className={`absolute -bottom-2 left-0 h-[3px] rounded-full bg-red-700 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}

          {school.admission_open ? (
            <Link
              href="/admissions"
              className="rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-5 py-2.5 font-semibold text-white shadow-md transition hover:scale-105 hover:from-red-800 hover:to-red-700"
            >
              Apply Now
            </Link>
          ) : (
            <button
              disabled
              className="cursor-not-allowed rounded-xl bg-slate-400 px-5 py-2.5 font-semibold text-white"
            >
              Admissions Closed
            </button>
          )}
        </nav>

        {/* ---------- MOBILE BUTTON ---------- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 shrink-0 rounded-lg p-2 text-slate-700 hover:bg-red-50 md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* ---------- MOBILE MENU ---------- */}
      {isOpen && (
        <div className="border-t border-red-100 bg-white shadow-lg md:hidden">
          <div className="flex flex-col gap-4 px-6 py-5">
            {navLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition ${
                    active
                      ? "bg-red-50 text-red-700"
                      : "text-slate-700 hover:bg-red-50 hover:text-red-700"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {school.admission_open ? (
              <Link
                href="/admissions"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-xl bg-red-700 py-3 text-center font-semibold text-white"
              >
                Apply Now
              </Link>
            ) : (
              <button
                disabled
                className="mt-2 cursor-not-allowed rounded-xl bg-slate-400 py-3 text-center font-semibold text-white"
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