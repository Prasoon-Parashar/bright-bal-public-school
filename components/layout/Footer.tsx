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
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  website: string;
  logo_url: string;
  facebook_url: string;
  instagram_url: string;
  youtube: string;
};

export default function Footer() {
  const [school, setSchool] = useState<SchoolSettings>({
    school_name: "Bright Bal Public School",
    tagline: "English Medium School",
    address_line_1: "Baldev Nagar",
    address_line_2: "Gobar Chowki",
    city: "Agra",
    state: "Uttar Pradesh",
    phone: "+91 9997157985",
    email: "brightbalp@gmail.com",
    website: "",
    logo_url: "",
    facebook_url: "",
    instagram_url: "",
    youtube: "",
  });

  useEffect(() => {
    fetchSchool();
  }, []);

  async function fetchSchool() {
    const { data, error } = await supabase
      .from("school_settings")
      .select(
        `
        school_name,
        tagline,
        address_line_1,
        address_line_2,
        city,
        state,
        phone,
        email,
        website,
        logo_url,
        facebook_url,
        instagram_url,
        youtube
        `
      )
      .single();

    if (error) {
      console.error("Footer settings error:", error);
      return;
    }

    if (data) {
      setSchool({
        school_name: data.school_name || "Bright Bal Public School",
        tagline: data.tagline || "English Medium School",
        address_line_1: data.address_line_1 || "",
        address_line_2: data.address_line_2 || "",
        city: data.city || "",
        state: data.state || "",
        phone: data.phone || "",
        email: data.email || "",
        website: data.website || "",
        logo_url: data.logo_url || "",
        facebook_url: data.facebook_url || "",
        instagram_url: data.instagram_url || "",
        youtube: data.youtube || "",
      });
    }
  }

  const address = [
    school.address_line_1,
    school.address_line_2,
    school.city,
    school.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(185,28,28,0.12),_transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* School Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Image
                src="/logo/logo.png.png"
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

          {/* Quick Links */}
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

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Contact Us
            </h3>

            <div className="space-y-5">

              {address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-gray-400 transition hover:text-white"
                >
                  <MapPin className="mt-1 shrink-0 text-red-500" size={18} />
                  <span>{address}</span>
                </a>
              )}

              {school.phone && (
                <a
                  href={`tel:${school.phone}`}
                  className="flex items-center gap-3 text-gray-400 transition hover:text-white"
                >
                  <Phone className="shrink-0 text-red-500" size={18} />
                  {school.phone}
                </a>
              )}

              {school.email && (
                <a
                  href={`mailto:${school.email}`}
                  className="flex items-center gap-3 break-all text-gray-400 transition hover:text-white"
                >
                  <Mail className="shrink-0 text-red-500" size={18} />
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
                  <Globe className="shrink-0 text-red-500" size={18} />
                  {school.website}
                </a>
              )}

            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-5 text-lg font-bold text-white">
              Follow Us
            </h3>

            <div className="flex gap-3">
              <a
                href={school.facebook_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  school.facebook_url
                    ? "bg-red-700 hover:scale-110 hover:bg-red-600"
                    : "cursor-not-allowed bg-slate-700"
                }`}
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href={school.instagram_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  school.instagram_url
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

      {/* Bottom */}
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