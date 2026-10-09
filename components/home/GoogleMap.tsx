"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  Navigation,
  ArrowUpRight,
  CarFront,
  ShieldCheck,
  Heart,
  School,
  Map,
} from "lucide-react";

const details = [
  {
    icon: MapPin,
    title: "School Address",
    value: "Baldev Nagar, Gober Chowki, Agra, Uttar Pradesh",
    color: "red",
    href: "https://www.google.com/maps/search/?api=1&query=Bright+Bal+Public+School+Agra",
  },
  {
    icon: Phone,
    title: "Phone Number",
    value: "+91 9997157985",
    color: "blue",
    href: "tel:+919997157985",
  },
  {
    icon: Mail,
    title: "Email Address",
    value: "brightbalp@gmail.com",
    color: "yellow",
    href: "mailto:brightbalp@gmail.com",
  },
  {
    icon: Clock3,
    title: "School Timings",
    value: "Monday – Saturday · 8:00 AM – 2:00 PM",
    color: "green",
    href: null,
  },
];

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Bright+Bal+Public+School+Agra";

export default function GoogleMap() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#F8FAFF] via-white to-[#EFF6FF] py-20 sm:py-24">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-200/35 blur-[120px]" />
        <div className="absolute -right-40 top-40 h-[450px] w-[450px] rounded-full bg-blue-200/40 blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(#1565C0 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      <div className="mx-auto max-w-[1450px] px-5 sm:px-8 lg:px-10">
        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-5 py-2.5 text-xs font-extrabold uppercase tracking-[0.17em] text-[#1565C0] shadow-sm sm:text-sm">
            <MapPin size={16} className="text-[#C62828]" />
            Our Location
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#101B33] sm:text-5xl lg:text-6xl">
            Visit Our{" "}
            <span className="bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] bg-clip-text text-transparent">
              Campus
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Find Bright Bal Public School in Agra. We welcome parents
            and families to connect with our school.
          </p>
        </motion.div>

        {/* MAIN LAYOUT */}
        <div className="grid items-stretch gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          {/* LEFT INFORMATION PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65 }}
            className="relative isolate flex flex-col overflow-hidden rounded-[2rem] bg-[#101B33] p-6 text-white shadow-[0_30px_80px_rgba(16,27,51,0.2)] sm:rounded-[2.3rem] sm:p-8 lg:p-9"
          >
            {/* GLOW EFFECTS */}
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-64 w-64 rounded-full bg-red-500/20 blur-[80px]" />

            {/* BRAND */}
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C62828] to-[#E53935] shadow-lg shadow-red-900/30 sm:h-[76px] sm:w-[76px]"
              >
                <School size={35} strokeWidth={1.6} />
              </motion.div>

              <div className="min-w-0 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300 sm:text-xs">
                  You Can Find Us At
                </span>

                <h3 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
                  Bright Bal
                  <span className="block text-red-300">
                    Public School
                  </span>
                </h3>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300 sm:text-xs">
                  English Medium School
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              Located in Agra, Bright Bal Public School is here to support
              your child&apos;s learning journey. Get in touch or plan your
              visit to our campus.
            </p>

            {/* CONTACT DETAIL CARDS */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {details.map((item, index) => {
                const Icon = item.icon;

                const iconColor =
                  item.color === "red"
                    ? "bg-red-100 text-[#C62828]"
                    : item.color === "blue"
                      ? "bg-blue-100 text-[#1565C0]"
                      : item.color === "yellow"
                        ? "bg-amber-100 text-amber-600"
                        : "bg-emerald-100 text-emerald-700";

                const content = (
                  <div className="flex h-full min-h-[112px] items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconColor}`}
                    >
                      <Icon size={21} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-500">
                        {item.title}
                      </p>

                      <p className="mt-1.5 break-words text-sm font-extrabold leading-5 text-[#101B33]">
                        {item.value}
                      </p>

                      {item.href && (
                        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-[#1565C0]">
                          View details
                          <ArrowUpRight size={12} />
                        </span>
                      )}
                    </div>
                  </div>
                );

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.title === "School Address"
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.title === "School Address"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={`${item.title}: ${item.value}`}
                        className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-400/50"
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* DIRECTIONS + CALL */}
            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[54px] items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#C62828] to-[#E53935] px-5 py-4 text-center text-sm font-extrabold text-white shadow-lg shadow-red-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-300/50"
              >
                <Navigation size={19} />
                Get Directions
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="tel:+919997157985"
                aria-label="Call Bright Bal Public School"
                className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 text-sm font-bold text-white transition-all hover:bg-white/15 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50"
              >
                <Phone size={18} />
                Call Now
              </a>
            </div>
          </motion.div>

          {/* RIGHT MAP CARD */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.65 }}
            className="flex min-w-0 flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-2.5 shadow-[0_30px_80px_rgba(15,23,42,0.10)] sm:rounded-[2.3rem] sm:p-3"
          >
            {/* MAP HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-3 py-4 sm:px-5 sm:py-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C62828]">
                  <Map size={24} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-base font-black text-[#101B33] sm:text-lg">
                    Find Us on the Map
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    Bright Bal Public School, Agra
                  </p>
                </div>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2.5 text-xs font-bold text-[#1565C0] transition-all hover:border-[#1565C0] hover:bg-[#1565C0] hover:text-white sm:text-sm"
              >
                Open Google Maps
                <ArrowUpRight size={15} />
              </a>
            </div>

            {/* EMBEDDED MAP */}
            <div className="relative min-h-[350px] flex-1 overflow-hidden rounded-[1.5rem] bg-slate-100 sm:min-h-[460px]">
              <iframe
                src="https://www.google.com/maps?q=Bright+Bal+Public+School+Agra&output=embed"
                title="Bright Bal Public School location in Agra"
                className="absolute inset-0 h-full min-h-[350px] w-full border-0 sm:min-h-[460px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* TRUST / FEATURE STRIP */}
            <div className="grid grid-cols-3 divide-x divide-slate-100 px-1 py-5 sm:px-2">
              <div className="flex flex-col items-center gap-2 px-1 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0]">
                  <CarFront size={21} />
                </span>
                <p className="text-xs font-extrabold text-[#101B33]">
                  Easy to Reach
                </p>
                <p className="hidden text-[10px] leading-4 text-slate-500 sm:block">
                  Plan your route
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 px-1 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-[#C62828]">
                  <ShieldCheck size={21} />
                </span>
                <p className="text-xs font-extrabold text-[#101B33]">
                  School Visit
                </p>
                <p className="hidden text-[10px] leading-4 text-slate-500 sm:block">
                  Connect with us
                </p>
              </div>

              <div className="flex flex-col items-center gap-2 px-1 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
                  <Heart size={21} />
                </span>
                <p className="text-xs font-extrabold text-[#101B33]">
                  Parents Welcome
                </p>
                <p className="hidden text-[10px] leading-4 text-slate-500 sm:block">
                  We&apos;re here to help
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM BRAND LINE */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-red-200" />
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.25em]">
            Same Location, Brighter Futures
          </p>
          <span className="h-px w-8 bg-blue-200" />
        </motion.div>
      </div>
    </section>
  );
}