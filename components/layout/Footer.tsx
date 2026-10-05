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

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

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
    <footer className="relative overflow-hidden bg-[#08110d] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#0aa84f]/10 blur-[150px]" />

        <div className="absolute -right-40 top-[30%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-yellow-400/5 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* =========================================================
          FLOATING DECORATIONS
      ========================================================= */}

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[5%] top-20 hidden text-[#0aa84f]/20 lg:block"
      >
        <BookOpen size={65} strokeWidth={1.2} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [0, 12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[6%] top-24 hidden text-yellow-400/20 lg:block"
      >
        <Star size={48} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-28 left-[8%] hidden text-red-400/15 lg:block"
      >
        <GraduationCap size={58} strokeWidth={1.2} />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[15%] bottom-32 h-4 w-4 rounded-full bg-[#0aa84f]"
      />

      {/* =========================================================
          TOP CTA
      ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-5 pt-12 sm:px-6 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-r from-[#0d2c1d] via-[#123c28] to-[#16261e] p-7 shadow-[0_25px_70px_rgba(0,0,0,0.25)] sm:p-9 lg:p-10"
        >
          {/* CTA glow */}

          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#0aa84f]/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-20 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#38d982]/20 bg-[#0aa84f]/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#62e89a]">
                <Sparkles size={14} />
                Growing Together
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
                Every child has the
                <span className="text-[#38d982]"> potential to shine.</span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                At Bright Bal Public School, we believe learning becomes
                meaningful when children feel supported, confident and
                inspired.
              </p>
            </div>

            <Link
              href="/admissions"
              className="group inline-flex shrink-0 items-center gap-3 rounded-2xl bg-[#0aa84f] px-6 py-4 text-sm font-black text-white shadow-lg shadow-green-900/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#079447] hover:shadow-xl"
            >
              Explore Admissions

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          MAIN FOOTER
      ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_1fr_0.9fr]">
          {/* =====================================================
              SCHOOL INFO
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <motion.div
                whileHover={{ rotate: 4, scale: 1.05 }}
                className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white p-1 shadow-xl"
              >
                <Image
                  src="/logo/logo.png.png"
                  alt="School Logo"
                  width={72}
                  height={72}
                  className="h-full w-full rounded-[1.15rem] object-contain"
                  unoptimized
                />

                <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full border-2 border-[#08110d] bg-[#0aa84f]" />
              </motion.div>

              <div className="min-w-0">
                <h2 className="text-xl font-black leading-tight text-white sm:text-2xl">
                  {school.school_name}
                </h2>

                <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-[#38d982]">
                  {school.tagline}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Empowering young minds with quality education, discipline,
              creativity and strong moral values for a brighter future.
            </p>

            {/* Mini values */}

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
                  className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* =====================================================
              QUICK LINKS
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0aa84f]/10 text-[#38d982]">
                <ArrowUpRight size={18} />
              </div>

              <h3 className="text-lg font-black text-white">
                Quick Links
              </h3>
            </div>

            <ul className="space-y-3">
              {quickLinks.map(([name, href]) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="group flex w-fit items-center gap-2 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-700 transition-all duration-300 group-hover:bg-[#38d982] group-hover:scale-125" />

                    {name}

                    <ArrowRight
                      size={14}
                      className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-hover:text-[#38d982]"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* =====================================================
              CONTACT
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <MapPin size={18} />
              </div>

              <h3 className="text-lg font-black text-white">
                Contact Us
              </h3>
            </div>

            <div className="space-y-4">
              {address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    address
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <MapPin
                    className="mt-0.5 shrink-0 text-red-400 transition-transform duration-300 group-hover:scale-110"
                    size={17}
                  />

                  <span className="leading-6">{address}</span>
                </a>
              )}

              {school.phone && (
                <a
                  href={`tel:${school.phone}`}
                  className="group flex items-center gap-3 text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Phone
                    className="shrink-0 text-[#38d982] transition-transform duration-300 group-hover:scale-110"
                    size={17}
                  />

                  {school.phone}
                </a>
              )}

              {school.email && (
                <a
                  href={`mailto:${school.email}`}
                  className="group flex items-center gap-3 break-all text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Mail
                    className="shrink-0 text-yellow-400 transition-transform duration-300 group-hover:scale-110"
                    size={17}
                  />

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
                  className="group flex items-center gap-3 break-all text-sm text-slate-400 transition-colors duration-300 hover:text-white"
                >
                  <Globe
                    className="shrink-0 text-blue-400 transition-transform duration-300 group-hover:scale-110"
                    size={17}
                  />

                  {school.website}
                </a>
              )}

              {/* Timing */}

              <div className="flex items-start gap-3 text-sm text-slate-400">
                <Clock3
                  className="mt-0.5 shrink-0 text-[#38d982]"
                  size={17}
                />

                <div>
                  <p className="font-semibold text-slate-300">
                    School Hours
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Monday - Saturday
                    <br />
                    8:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              SOCIAL
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400/10 text-yellow-400">
                <Heart size={18} />
              </div>

              <h3 className="text-lg font-black text-white">
                Follow Us
              </h3>
            </div>

            <p className="text-sm leading-7 text-slate-400">
              Stay connected with Bright Bal Public School for school
              activities, celebrations, announcements and special moments.
            </p>

            <div className="mt-6 flex gap-3">
              {/* Facebook */}

              <a
                href={school.facebook_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`group flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                  school.facebook_url
                    ? "bg-[#1877F2] hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                    : "cursor-not-allowed bg-white/10 text-slate-500"
                }`}
              >
                <FaFacebookF size={18} />
              </a>

              {/* Instagram */}

              <a
                href={school.instagram_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`group flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                  school.instagram_url
                    ? "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:-translate-y-1 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/20"
                    : "cursor-not-allowed bg-white/10 text-slate-500"
                }`}
              >
                <FaInstagram size={19} />
              </a>

              {/* YouTube */}

              <a
                href={school.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className={`group flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 ${
                  school.youtube
                    ? "bg-red-600 hover:-translate-y-1 hover:scale-105 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20"
                    : "cursor-not-allowed bg-white/10 text-slate-500"
                }`}
              >
                <FaYoutube size={19} />
              </a>
            </div>

            {/* Small trust card */}

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0aa84f]/10 text-[#38d982]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-xs font-black text-white">
                    A Safe Place to Learn
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

      {/* =========================================================
          DIVIDER
      ========================================================= */}

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />

          <motion.div
            animate={{
              scale: [1, 1.12, 1],
              rotate: [0, 8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0aa84f]/20 bg-[#0aa84f]/10 text-[#38d982]"
          >
            <GraduationCap size={17} />
          </motion.div>

          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
        </div>
      </div>

      {/* =========================================================
          BOTTOM
      ========================================================= */}

      <div className="relative mt-8 border-t border-white/5 bg-black/20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-center sm:px-6 md:flex-row md:text-left">
          <p className="text-xs text-slate-500 sm:text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-slate-300">
              {school.school_name}
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600 sm:text-xs">
            <span>Learn</span>
            <span className="text-[#0aa84f]">•</span>
            <span>Grow</span>
            <span className="text-red-500">•</span>
            <span>Lead</span>
          </div>
        </div>
      </div>
    </footer>
  );
}