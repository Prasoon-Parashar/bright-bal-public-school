"use client";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const supabase = createClient();

type SchoolSettings = {
  school_name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  facebook: string;
  instagram: string;
  youtube: string;
};

export default function Footer() {
  const [school, setSchool] = useState<SchoolSettings>({
    school_name: "Bright Bal Public School",
    tagline: "English Medium School",
    address: "Baldev Nagar, Gobar Chowki, Agra",
phone: "+91 9997157985",
email: "brightbalp@gmail.com",
    website: "",
    logo_url: "",
    facebook: "",
    instagram: "",
    youtube: "",
  });

  useEffect(() => {
    fetchSchool();
  }, []);

  async function fetchSchool() {
    const { data } = await supabase
      .from("school_settings")
      .select("*")
      .single();

    if (data) setSchool(data);
  }

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(185,28,28,0.12),_transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

         {/* School Info */}
<div className="space-y-5">

  <div className="flex items-center gap-4">

    <Image
      src={school.logo_url || "/logo/logo.png.png"}
      alt="School Logo"
      width={72}
      height={72}
      className="h-[72px] w-[72px] rounded-full border-2 border-red-500 bg-white object-contain p-1"
      unoptimized
    />

    <div className="min-w-0">
      <h2 className="text-2xl font-extrabold leading-tight text-white">
        {school.school_name}
      </h2>

      <p className="mt-1 text-sm font-medium text-red-300">
        {school.tagline}
      </p>
    </div>

  </div>

  <p className="leading-7 text-gray-400">
    Empowering young minds with quality education, discipline,
    innovation and strong moral values.
  </p>

</div>

          {/* ================= Quick Links ================= */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                ["Home", "/"],
                ["About", "/about"],
                ["Gallery", "/gallery"],
                ["Notices", "/notices"],
                ["Admissions", "/admissions"],
                ["Contact", "/contact"],
              ].map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-gray-400 transition hover:text-red-400"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ================= Contact ================= */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Contact Us
            </h3>

            <div className="space-y-5">

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  school.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-gray-400 transition hover:text-white"
              >
                <MapPin className="mt-1 text-red-500" size={18} />
                <span>{school.address}</span>
              </a>

              {school.phone && (
                <a
                  href={`tel:${school.phone}`}
                  className="flex items-center gap-3 text-gray-400 transition hover:text-white"
                >
                  <Phone className="text-red-500" size={18} />
                  {school.phone}
                </a>
              )}

              {school.email && (
                <a
                  href={`mailto:${school.email}`}
                  className="flex items-center gap-3 text-gray-400 transition hover:text-white"
                >
                  <Mail className="text-red-500" size={18} />
                  {school.email}
                </a>
              )}

              {school.website && (
                <a
                  href={
                    school.website.startsWith("http")
                      ? school.website
                      : `https://${school.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 break-all text-gray-400 transition hover:text-white"
                >
                  <Globe className="text-red-500" size={18} />
                  {school.website}
                </a>
              )}

            </div>
          </div>

          {/* ================= Social ================= */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Follow Us
            </h3>

            <div className="flex gap-3">

              <a
                href={school.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  school.facebook
                    ? "bg-red-700 hover:scale-110 hover:bg-red-600"
                    : "cursor-not-allowed bg-slate-700"
                }`}
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href={school.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  school.instagram
                    ? "bg-red-700 hover:scale-110 hover:bg-red-600"
                    : "cursor-not-allowed bg-slate-700"
                }`}
              >
                <FaInstagram size={18} />
              </a>

              <a
                href={school.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  school.youtube
                    ? "bg-red-700 hover:scale-110 hover:bg-red-600"
                    : "cursor-not-allowed bg-slate-700"
                }`}
              >
                <FaYoutube size={18} />
              </a>

            </div>

            <p className="mt-5 text-sm leading-6 text-gray-400">
              Follow us on Facebook, Instagram and YouTube for school updates,
              events and announcements.
            </p>
          </div>

        </div>
      </div>

      {/* ================= Bottom ================= */}
      <div className="border-t border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm md:flex-row">

          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} {school.school_name}. All Rights Reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}