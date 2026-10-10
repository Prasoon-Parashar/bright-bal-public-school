"use client";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  MapPin,
  ArrowDown,
  ArrowUpRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type ContactItem = {
  icon: LucideIcon;
  title: string;
  detail: string;
  description: string;
  cta: string;
  href: string;
  accent: "red" | "blue";
  external?: boolean;
  ariaLabel: string;
};

const contactItems: ContactItem[] = [
  {
    icon: PhoneCall,
    title: "Call Us",
    detail: "+91 9997157985",
    description: "We're happy to assist you",
    cta: "Call Now",
    href: "tel:+919997157985",
    accent: "red",
    ariaLabel: "Call Bright Bal Public School at +91 9997157985",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "brightbalp@gmail.com",
    description: "Send us your enquiry",
    cta: "Send Email",
    href: "mailto:brightbalp@gmail.com",
    accent: "blue",
    ariaLabel: "Email Bright Bal Public School at brightbalp@gmail.com",
  },
  {
    icon: MapPin,
    title: "Visit Our School",
    detail: "Agra, Uttar Pradesh",
    description: "We welcome parents and visitors",
    cta: "Get Directions",
    href: "https://www.google.com/maps/search/?api=1&query=Bright+Bal+Public+School+Agra",
    accent: "red",
    external: true,
    ariaLabel: "Open Bright Bal Public School location in Google Maps",
  },
];

/* Colour tokens for each accent */
const accentStyles = {
  red: {
    badge: "from-[#E53935] to-[#B71C1C] shadow-red-500/40",
    glow: "bg-red-500",
    border: "from-red-400/60 via-white/10 to-white/5",
    text: "text-red-300",
    cta: "bg-red-500/15 text-red-100 group-hover:bg-[#E53935] group-hover:text-white",
    arrow: "bg-red-500/20 group-hover:bg-white/25",
    line: "from-[#C62828] to-[#E53935]",
  },
  blue: {
    badge: "from-[#2196F3] to-[#0D47A1] shadow-blue-500/40",
    glow: "bg-blue-500",
    border: "from-blue-400/60 via-white/10 to-white/5",
    text: "text-blue-300",
    cta: "bg-blue-500/15 text-blue-100 group-hover:bg-[#1565C0] group-hover:text-white",
    arrow: "bg-blue-500/20 group-hover:bg-white/25",
    line: "from-[#1565C0] to-blue-300",
  },
} as const;

export default function ContactHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#101B33] py-20 sm:py-24 lg:py-28">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-32 h-[450px] w-[450px] rounded-full bg-red-600/25 blur-[130px]" />

        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/30 blur-[140px]" />

        <div className="absolute bottom-[-180px] left-1/3 h-[400px] w-[400px] rounded-full bg-red-500/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* DECORATIVE SHAPES */}
      <motion.div
        animate={{ y: [0, -16, 0], rotate: [0, 8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[5%] top-[12%] hidden text-white/10 md:block"
      >
        <Mail size={54} strokeWidth={1.2} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[7%] top-[15%] hidden text-blue-200/20 md:block"
      >
        <Sparkles size={46} strokeWidth={1.4} />
      </motion.div>

      {/* HERO CONTENT */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          {/* EYEBROW */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-100 shadow-lg backdrop-blur-md sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />
            Get in Touch
          </div>

          {/* HEADING */}
          <h1 className="mt-7 text-4xl font-black leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s Start a
            <span className="mt-2 block bg-gradient-to-r from-red-400 via-rose-300 to-blue-300 bg-clip-text pb-2 text-transparent">
              Conversation
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Have questions about admissions, school activities or your
            child&apos;s learning journey? Connect with Bright Bal Public
            School. We&apos;re here to help.
          </p>

          {/* DECORATIVE DIVIDER */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-red-400/70" />

            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08] text-red-300 backdrop-blur">
              <Sparkles size={18} />
            </div>

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-blue-400/70" />
          </div>
        </motion.div>

        {/* CONTACT CARDS */}
        <div className="mt-14 grid items-start gap-6 md:mt-16 md:grid-cols-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const a = accentStyles[item.accent];
            const isCenter = index === 1;

            return (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                aria-label={item.ariaLabel}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative block rounded-[2rem] bg-gradient-to-b p-px ${a.border} ${
                  isCenter ? "" : "md:mt-8"
                }`}
              >
                {/* Card body */}
                <div className="relative flex min-h-[290px] flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-[#0f1a33]/90 p-6 backdrop-blur-xl transition-colors duration-300 group-hover:bg-[#13213f] sm:p-7">
                  {/* Corner glow */}
                  <div
                    className={`pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full opacity-30 blur-[60px] transition-opacity duration-500 group-hover:opacity-70 ${a.glow}`}
                  />

                  {/* Large watermark icon */}
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1}
                    className="pointer-events-none absolute -bottom-6 -right-6 h-40 w-40 -rotate-12 text-white/[0.04] transition-all duration-500 group-hover:-rotate-6 group-hover:text-white/[0.08]"
                  />

                  {/* Shine sweep on hover */}
                  <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />

                  {/* Top row: icon badge + number */}
                  <div className="relative flex items-start justify-between">
                    <div className="relative">
                      {/* Slow rotating dashed ring */}
                      <span
                        aria-hidden="true"
                        className="absolute -inset-2.5 animate-spin rounded-[1.7rem] border border-dashed border-white/20"
                        style={{ animationDuration: "18s" }}
                      />
                      <div
                        className={`relative flex h-16 w-16 items-center justify-center rounded-[1.3rem] bg-gradient-to-br text-white shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-6 ${a.badge}`}
                      >
                        <Icon size={28} strokeWidth={1.9} />
                      </div>
                    </div>

                    <span
                      aria-hidden="true"
                      className="text-5xl font-black leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)]"
                    >
                      0{index + 1}
                    </span>
                  </div>

                  {/* Text */}
                  <div className="relative mt-7">
                    <p
                      className={`text-xs font-bold uppercase tracking-[0.2em] ${a.text}`}
                    >
                      {item.title}
                    </p>

                    <h2 className="mt-2 break-words text-xl font-extrabold leading-snug text-white sm:text-2xl">
                      {item.detail}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  {/* CTA pill */}
                  <div className="relative mt-auto pt-6">
                    <span
                      className={`inline-flex items-center gap-2.5 rounded-full py-1.5 pl-4 pr-1.5 text-sm font-bold transition-colors duration-300 ${a.cta}`}
                    >
                      {item.cta}
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${a.arrow}`}
                      >
                        <ArrowUpRight
                          size={16}
                          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </span>
                    </span>
                  </div>

                  {/* BOTTOM ACCENT */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100 ${a.line}`}
                  />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* BOTTOM SCROLL CUE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400"
        >
          <span className="h-px w-7 bg-white/20" />

          <span className="flex items-center gap-2">
            We&apos;re happy to hear from you
            <ArrowDown size={14} className="text-red-300" />
          </span>

          <span className="h-px w-7 bg-white/20" />
        </motion.div>
      </div>
    </section>
  );
}