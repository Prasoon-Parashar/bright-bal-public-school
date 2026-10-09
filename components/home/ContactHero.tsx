import { motion } from "framer-motion";
import {
  PhoneCall,
  Mail,
  MapPin,
  ArrowDown,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const contactItems = [
  {
    icon: PhoneCall,
    title: "Call Us",
    detail: "+91 9997157985",
    description: "We're happy to assist you",
    href: "tel:+919997157985",
    accent: "red",
  },
  {
    icon: Mail,
    title: "Email Us",
    detail: "brightbalp@gmail.com",
    description: "Send us your enquiry",
    href: "mailto:brightbalp@gmail.com",
    accent: "blue",
  },
  {
    icon: MapPin,
    title: "Visit Our School",
    detail: "Agra, Uttar Pradesh",
    description: "We welcome parents and visitors",
    href: "https://www.google.com/maps/search/?api=1&query=Bright+Bal+Public+School+Agra",
    accent: "red",
  },
];

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
        <div className="mt-14 grid gap-5 md:mt-16 md:grid-cols-3">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            const isRed = item.accent === "red";

            return (
              <motion.a
                key={item.title}
                href={item.href}
                target={item.title === "Visit Our School" ? "_blank" : undefined}
                rel={
                  item.title === "Visit Our School"
                    ? "noopener noreferrer"
                    : undefined
                }
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.2 + index * 0.12,
                  ease: "easeOut",
                }}
                whileHover={{ y: -7 }}
                whileTap={{ scale: 0.98 }}
                className="group relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6 text-left backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.10] sm:p-7"
              >
                {/* CARD GLOW */}
                <div
                  className={`pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-30 blur-[55px] transition-opacity duration-500 group-hover:opacity-70 ${
                    isRed ? "bg-red-500" : "bg-blue-500"
                  }`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 ${
                      isRed
                        ? "border-red-300/20 bg-red-400/10 text-red-300"
                        : "border-blue-300/20 bg-blue-400/10 text-blue-300"
                    }`}
                  >
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>

                <div className="relative mt-6">
                  <h2 className="text-lg font-bold text-white">
                    {item.title}
                  </h2>

                  <p className="mt-2 break-words text-base font-semibold text-blue-100 sm:text-lg">
                    {item.detail}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                </div>

                {/* BOTTOM ACCENT */}
                <div
                  className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                    isRed
                      ? "bg-gradient-to-r from-[#C62828] to-[#E53935]"
                      : "bg-gradient-to-r from-[#1565C0] to-blue-300"
                  }`}
                />
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