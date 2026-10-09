"use client";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  BookOpen,
  GraduationCap,
  Star,
  Heart,
  ShieldCheck,
  Clock3,
} from "lucide-react";
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

const quickLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Gallery", "/gallery"],
  ["Notices", "/notices"],
  ["Admissions", "/admissions"],
  ["Contact", "/contact"],
];

export default function Footer() {
  const [school, setSchool] = useState<SchoolSettings>({
    school_name: "Bright Bal Public School",
    tagline: "English Medium School",
    address_line_1: "Baldev Nagar",
    address_line_2: "Gober Chowki",
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

    fetchSchool();
  }, []);

  const address = [
    school.address_line_1,
    school.address_line_2,
    school.city,
    school.state,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="relative isolate overflow-hidden bg-[#0B1428] text-white">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-red-600/15 blur-[140px]" />

        <div className="absolute -right-40 top-[25%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-red-500/10 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* FLOATING DECORATIONS */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-5, 5, -5] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[4%] top-32 hidden text-red-300/15 lg:block"
      >
        <BookOpen size={62} strokeWidth={1.2} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 10, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[5%] top-24 hidden text-blue-300/20 lg:block"
      >
        <Star size={44} strokeWidth={1.3} />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [5, -5, 5] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-40 left-[7%] hidden text-blue-300/15 lg:block"
      >
        <GraduationCap size={58} strokeWidth={1.2} />
      </motion.div>

      {/* ADMISSION CTA */}
      <div className="relative mx-auto max-w-7xl px-5 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#17243D] via-[#13233B] to-[#102D52] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-9 lg:rounded-[2.5rem] lg:p-11"
        >
          {/* CTA DECORATIONS */}
          <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/20 blur-[90px]" />

          <div className="pointer-events-none absolute -bottom-24 left-20 -z-10 h-64 w-64 rounded-full bg-red-500/20 blur-[90px]" />

          <div className="absolute right-0 top-0 h-1 w-full bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0]" />

          <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-200 sm:text-xs">
                <Sparkles size={14} />
                Admissions & New Beginnings
              </div>

              <h2 className="mt-5 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                Every child deserves
                <span className="block bg-gradient-to-r from-red-300 via-rose-200 to-blue-300 bg-clip-text text-transparent">
                  a brighter tomorrow.
                </span>
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                At Bright Bal Public School, we nurture curiosity,
                confidence and strong values to help children grow
                into their best selves.
              </p>
            </div>

            <Link
              href="/admissions"
              className="group relative inline-flex shrink-0 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#C62828] to-[#E53935] px-6 py-4 text-sm font-black text-white shadow-lg shadow-red-950/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-300/40 sm:px-7"
            >
              <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-full" />

              <span className="relative">Explore Admissions</span>

              <ArrowRight
                size={18}
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* CTA BOTTOM DETAILS */}
          <div className="relative mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <ShieldCheck size={16} className="text-blue-300" />
              A supportive learning environment
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Heart size={16} className="text-red-300" />
              Learning with values
            </div>
          </div>
        </motion.div>
      </div>

      {/* MAIN FOOTER STARTS IN PART 2 */}

            {/* MAIN FOOTER */}
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_0.9fr] lg:gap-10">

          {/* SCHOOL BRANDING */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 4, scale: 1.05 }}
                className="relative flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[1.4rem] border border-slate-200 bg-white p-1.5 shadow-xl shadow-blue-950/20"
              >
                <Image
                  src="/logo/logo.png.png"
                  alt="Bright Bal Public School Logo"
                  width={68}
                  height={68}
                  className="h-full w-full rounded-[1rem] object-contain"
                  unoptimized
                />

                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-[#0B1428] bg-[#C62828]" />
              </motion.div>

              <div className="min-w-0">
                <h2 className="text-lg font-black leading-tight text-white sm:text-xl">
                  {school.school_name}
                </h2>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-blue-300 sm:text-xs">
                  {school.tagline}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Empowering young minds with quality education, discipline,
              creativity and strong moral values for a brighter future.
            </p>

            {/* SCHOOL VALUES */}
            <div className="mt-7 flex flex-wrap gap-2">
              {["Learn", "Grow", "Lead"].map((item, index) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.08,
                  }}
                  className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] ${
                    index === 1
                      ? "border-blue-300/20 bg-blue-400/10 text-blue-200"
                      : "border-white/10 bg-white/[0.04] text-slate-300"
                  }`}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10 text-blue-300">
                <ArrowUpRight size={19} />
              </div>

              <h3 className="text-lg font-black text-white">
                Quick Links
              </h3>
            </div>

            <ul className="space-y-3.5">
              {quickLinks.map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="group flex w-fit items-center gap-2.5 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600 transition-all duration-300 group-hover:scale-125 group-hover:bg-[#E53935]" />

                    {name}

                    <ArrowRight
                      size={14}
                      className="translate-x-[-4px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-blue-300"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CONTACT INFORMATION */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-300/15 bg-red-400/10 text-red-300">
                <MapPin size={19} />
              </div>

              <h3 className="text-lg font-black text-white">
                Contact Us
              </h3>
            </div>

            <div className="space-y-5">
              {address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <MapPin
                    className="mt-0.5 shrink-0 text-red-300 transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />

                  <span className="leading-6">{address}</span>
                </a>
              )}

              {school.phone && (
                <a
                  href={`tel:${school.phone.replace(/[^\d+]/g, "")}`}
                  className="group flex items-center gap-3 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Phone
                    className="shrink-0 text-blue-300 transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />

                  <span>{school.phone}</span>
                </a>
              )}

              {school.email && (
                <a
                  href={`mailto:${school.email}`}
                  className="group flex items-start gap-3 break-all text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Mail
                    className="mt-0.5 shrink-0 text-red-300 transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />

                  <span>{school.email}</span>
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
                  className="group flex items-start gap-3 break-all text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Globe
                    className="mt-0.5 shrink-0 text-blue-300 transition-transform duration-300 group-hover:scale-110"
                    size={18}
                  />

                  <span>{school.website}</span>
                </a>
              )}

              {/* SCHOOL HOURS */}
              <div className="flex items-start gap-3 text-sm text-slate-400">
                <Clock3
                  className="mt-0.5 shrink-0 text-blue-300"
                  size={18}
                />

                <div>
                  <p className="font-bold text-slate-200">
                    School Hours
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Monday – Saturday
                    <br />
                    8:00 AM – 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SOCIAL MEDIA */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10 text-blue-300">
                <Heart size={19} />
              </div>

              <h3 className="text-lg font-black text-white">
                Follow Our Journey
              </h3>
            </div>

            <p className="text-sm leading-7 text-slate-400">
              Stay connected with our school activities, celebrations,
              announcements and special moments.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={school.facebook_url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                aria-disabled={!school.facebook_url}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                  school.facebook_url
                    ? "bg-[#1877F2] text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/25"
                    : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-slate-600"
                }`}
                onClick={(e) => {
                  if (!school.facebook_url) e.preventDefault();
                }}
              >
                <FaFacebookF size={19} />
              </a>

              <a
                href={school.instagram_url || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                aria-disabled={!school.instagram_url}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                  school.instagram_url
                    ? "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/25"
                    : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-slate-600"
                }`}
                onClick={(e) => {
                  if (!school.instagram_url) e.preventDefault();
                }}
              >
                <FaInstagram size={19} />
              </a>

              <a
                href={school.youtube || undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                aria-disabled={!school.youtube}
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                  school.youtube
                    ? "bg-red-600 text-white hover:-translate-y-1 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/25"
                    : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-slate-600"
                }`}
                onClick={(e) => {
                  if (!school.youtube) e.preventDefault();
                }}
              >
                <FaYoutube size={20} />
              </a>
            </div>

            {/* TRUST CARD */}
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-blue-300/20 hover:bg-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#C62828]/20 to-[#1565C0]/20 text-blue-300">
                  <ShieldCheck size={21} />
                </div>

                <div>
                  <p className="text-xs font-black text-white">
                    A Place to Learn & Grow
                  </p>

                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Education • Values • Growth
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PART 3 CONTINUES HERE */}

            {/* FOOTER DIVIDER */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      {/* COPYRIGHT BAR */}
      <div className="relative mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          {/* COPYRIGHT */}
          <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-xs leading-6 text-slate-400 sm:justify-start">
            <span>
              © {new Date().getFullYear()}
            </span>

            <span className="font-bold text-white">
              {school.school_name}
            </span>

            <span>All rights reserved.</span>
          </div>

          {/* MADE WITH CARE */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span>Made with</span>

            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex text-red-400"
            >
              <Heart size={14} fill="currentColor" />
            </motion.span>

            <span>for young minds in Agra</span>
          </div>

          {/* BACK TO TOP */}
          <button
            type="button"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-bold text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/30 hover:bg-blue-400/10 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/30"
          >
            Back to Top

            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* BOTTOM BRAND ACCENT */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="h-1 w-10 rounded-full bg-[#C62828]" />
          <span className="h-1 w-5 rounded-full bg-[#E53935]" />
          <span className="h-1 w-10 rounded-full bg-[#1565C0]" />
        </div>
      </div>
    </footer>
  );
}