"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Lilita_One, Poppins } from "next/font/google";
import { Check, Menu, X } from "lucide-react";
import { useState } from "react";

/* Chunky rounded display font (headline, logo, buttons) + clean body font */
const display = Lilita_One({ weight: "400", subsets: ["latin"] });
const body = Poppins({ weight: ["400", "500", "600"], subsets: ["latin"] });

type HeroProps = {
  schoolSettings?: {
    school_name?: string;
    tagline?: string;
    logo_url?: string;
    hero_title?: string;
    hero_subtitle?: string;
    admission_open?: boolean;
    admission_session?: string;
    admission_banner?: string;
  } | null;
};

const defaultSchool = {
  school_name: "Bright Bal Public School",
  tagline: "English Medium School",
  hero_title: "Where Young Minds Build Bright Futures",
hero_subtitle:
  "Welcome to Bright Bal Public School, where quality education, strong values and creativity come together to help every child grow with confidence.",
  admission_open: true,
  admission_session: "2027-28",
  admission_banner: "Admissions Open",
};

const highlights = [
  "English Medium",
  "Nursery to Class VIII",
  "Holistic Development",
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Notices", href: "/notices" },
  { label: "Contact", href: "/contact" },
];



/* ---------- Chalk-style school doodles for the dark area ---------- */
const doodleProps = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const CapIcon = ({ className = "" }) => (
  <svg {...doodleProps} className={className}>
    <path d="M32 14 60 26 32 38 4 26Z" />
    <path d="M16 32v12c0 6 32 6 32 0V32M56 28v16" />
  </svg>
);
const BookIcon = ({ className = "" }) => (
  <svg {...doodleProps} className={className}>
    <path d="M32 16C24 10 12 10 4 14v34c8-4 20-4 28 2 8-6 20-6 28-2V14c-8-4-20-4-28 2ZM32 16v34" />
  </svg>
);
const PencilIcon = ({ className = "" }) => (
  <svg {...doodleProps} className={className}>
    <path d="m12 52 4-12L44 12l8 8-28 28ZM38 18l8 8M12 52l12-4" />
  </svg>
);
const StarIcon = ({ className = "" }) => (
  <svg {...doodleProps} className={className}>
    <path d="m32 6 7 18 19 1-15 12 5 19-16-11-16 11 5-19L6 25l19-1Z" />
  </svg>
);
const BulbIcon = ({ className = "" }) => (
  <svg {...doodleProps} className={className}>
    <path d="M32 8C20 8 14 18 18 28c3 6 6 8 6 14h16c0-6 3-8 6-14C50 18 44 8 32 8ZM26 48h12M28 54h8" />
  </svg>
);

/* Soft flat-bottom cloud */
const CloudIcon = ({ className = "" }) => (
  <svg viewBox="0 0 140 80" fill="currentColor" aria-hidden="true" className={className}>
    <circle cx="36" cy="52" r="16" />
    <circle cx="62" cy="36" r="24" />
    <circle cx="92" cy="44" r="20" />
    <circle cx="114" cy="56" r="12" />
    <rect x="36" y="52" width="78" height="16" />
  </svg>
);

/* Flags hanging on a string, like a school-day garland */
const flagColors = ["#0aa84f", "#ffffff", "#f5c518", "#0aa84f", "#ffffff", "#f5c518", "#0aa84f"];
const flagPoints = [
  [30, 12], [90, 19], [150, 23], [200, 24], [250, 23], [310, 19], [370, 12],
];

export default function Hero({ schoolSettings }: HeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  /* Database se null aaye to default use karo (spread null ko override kar deta hai) */
  const school = {
    school_name: schoolSettings?.school_name || defaultSchool.school_name,
    tagline: schoolSettings?.tagline || defaultSchool.tagline,
    logo_url: schoolSettings?.logo_url || "",
    hero_title: schoolSettings?.hero_title || defaultSchool.hero_title,
    hero_subtitle: schoolSettings?.hero_subtitle || defaultSchool.hero_subtitle,
    admission_open:
      schoolSettings?.admission_open ?? defaultSchool.admission_open,
    admission_session:
      schoolSettings?.admission_session || defaultSchool.admission_session,
  };

  /* "School Admission" -> "School" + "Admission" */
 const headline = school.hero_title || "Where Young Minds Build Bright Futures";

  return (
    <section
      className={`${body.className} relative isolate overflow-hidden bg-[#1f1f1f] lg:h-[min(56vw,860px)] lg:min-h-[660px]`}
    >
      {/* ============ NAVBAR ============ */}
      <header className="
  absolute
  inset-x-0
  top-0
  z-50
  flex
  h-20
  items-center
  justify-between
  px-4
  sm:h-24
  sm:px-8
  lg:px-[9%]
">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white sm:h-11 sm:w-11">
            <Image
              src={school.logo_url || "/logo/logo.png.png"}
              alt={school.school_name}
              width={44}
              height={44}
              className="h-full w-full object-contain"
            />
          </span>
          <span
            className={`${display.className} hidden text-xl leading-none text-white sm:block lg:text-[1.7rem]`}
          >
            {school.school_name}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] font-medium text-white/90 transition hover:text-[#3ddc84]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {mobileMenuOpen && (
  <div
    className="
      absolute
      left-4
      right-4
      top-[72px]
      rounded-2xl
      border
      border-white/10
      bg-[#1f1f1f]/95
      p-3
      shadow-2xl
      backdrop-blur-xl
      md:hidden
    "
  >
    {navLinks.map((link) => (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setMobileMenuOpen(false)}
        className="
          block
          rounded-xl
          px-4
          py-3
          text-sm
          font-semibold
          text-white/90
          transition
          hover:bg-[#0aa84f]
        "
      >
        {link.label}
      </Link>
    ))}
  </div>
)}

        <nav className="hidden items-center gap-8 md:flex"></nav>
        <button
  type="button"
  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
  onClick={() => setMobileMenuOpen((prev) => !prev)}
  className="
    flex
    h-10
    w-10
    items-center
    justify-center
    rounded-full
    border
    border-white/20
    bg-black/20
    text-white
    md:hidden
  "
>
  {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
</button>

        {school.admission_open && (
         <Link
  href="/admissions"
  className={`
  ${display.className}
  group
  relative
  inline-flex
  items-center
  gap-3
  rounded-xl
  rounded-bl-sm
  bg-[#0aa84f]
  px-7
  py-3.5
  text-xl
  uppercase
  tracking-wide
  text-white
  shadow-[0_10px_25px_rgba(10,168,79,0.22)]
  transition-all
  duration-300
  hover:-translate-y-1
  hover:bg-red-600
  hover:shadow-[0_12px_28px_rgba(220,38,38,0.28)]
  after:absolute
  after:-bottom-3
  after:left-0
  after:h-0
  after:w-0
  after:border-r-[18px]
  after:border-t-[14px]
  after:border-r-transparent
  after:border-t-[#0aa84f]
  after:content-['']
  after:transition-colors
  after:duration-300
  group-hover:after:border-t-red-600
`}
>
  <span className="relative z-10 flex items-center gap-2">
    Apply Now
    <span className="transition-transform duration-300 group-hover:translate-x-1">
      →
    </span>
  </span>
</Link>
        )}
      </header>

      {/* ============ DESKTOP SHAPES ============ */}
      {/* Big white circle sweeping in from the left */}
      <div className="absolute -left-[6%] top-[27%] z-10 hidden aspect-square w-[84%] rounded-full bg-white lg:block" />

      {/* Green classroom circle on the right */}
      <div className="absolute -right-[10%] top-[36%] z-10 hidden aspect-square w-[58%] overflow-hidden rounded-full bg-[#0a7a3c] lg:block">
        <div
          className="absolute -inset-4 scale-110 bg-cover bg-center blur-[3px]"
          style={{ backgroundImage: "url('/images/school-building.jpg.jpeg')" }}
        />
        <div className="absolute inset-0 bg-[#078a43]/[0.55]" />
      </div>

      {/* Creative school doodles in the dark area */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[5] hidden lg:block">
        {/* Clouds (very light, behind everything else) */}
        <CloudIcon className="absolute left-[21%] top-[11%] w-[13vw] text-white/[0.07]" />
        <CloudIcon className="absolute -left-[1%] top-[34%] w-[10vw] text-white/[0.06]" />
        <CloudIcon className="absolute left-[39%] top-[22%] w-[9vw] text-white/[0.05]" />
        <CloudIcon className="absolute left-[64%] top-[24%] w-[11vw] text-white/[0.07]" />
        <CloudIcon className="absolute left-[70%] top-[11%] w-[7vw] text-white/[0.05]" />

        <svg viewBox="0 0 400 52" className="absolute left-[1%] top-[12%] w-[40%]">
          <path d="M0 8Q200 40 400 8" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          {flagPoints.map(([x, y], i) => (
            <path
              key={x}
              d={`M${x - 13} ${y}L${x + 13} ${y}L${x} ${y + 26}Z`}
              fill={flagColors[i]}
              opacity="0.9"
            />
          ))}
        </svg>

<div
  className="
    pointer-events-none
    absolute
    right-[5%]
    top-[16%]
    z-[35]
    hidden
    items-center
    gap-3
    lg:flex
  "
>
  <span className="h-px w-8 bg-white/25" />

  <p
    className={`
      ${display.className}
      whitespace-nowrap
      text-[clamp(1rem,1.6vw,1.65rem)]
      leading-none
      tracking-wide
      text-white/90
      drop-shadow-md
    `}
  >
    Learn. Play.{" "}
    <span className="text-[#3ddc84]">Grow.</span>
  </p>

  <span
    className="
      h-2.5
      w-2.5
      shrink-0
      rounded-full
      bg-[#f5c518]
      shadow-[0_0_12px_rgba(245,197,24,0.55)]
    "
  />
</div>

        <CapIcon className="absolute left-[45%] top-[15%] w-[4vw] rotate-12 text-white/30" />
        <BulbIcon className="absolute left-[61%] top-[14%] w-[3vw] -rotate-6 text-[#3ddc84]/70" />
        <BookIcon className="absolute left-[54%] top-[25%] w-[4vw] -rotate-6 text-white/30" />
        <StarIcon className="absolute left-[47%] top-[30%] w-[2.2vw] rotate-12 text-[#f5c518]/80" />
        <PencilIcon className="absolute left-[60%] top-[36%] w-[3vw] rotate-6 text-[#f5c518]/70" />
      </div>

      {/* Student (breaks out above the green circle) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="absolute bottom-0 right-[1%] z-20 hidden h-[98%] w-[47%] lg:block"
      >
        <Image
          src="/images/hero-student.png"
          alt="Smiling school student holding books"
          fill
          priority
          sizes="47vw"
          className="object-contain object-bottom"
        />
      </motion.div>

      {/* ============ CONTENT ============ */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-30 mt-24 rounded-t-[2.5rem] bg-white px-6 pb-10 pt-10 sm:px-10 lg:absolute lg:left-[13%] lg:top-[36%] lg:mt-0 lg:w-[44%] text-center lg:rounded-none lg:bg-transparent lg:p-0"
      >
      <h1
  className={`
    ${display.className}
    uppercase
    leading-[0.92]
    tracking-tight
    text-[clamp(2.8rem,4.2vw,4.7rem)]
  `}
>
  <span className="block text-[#2b2b2b]">
    Where
  </span>

  <span className="block text-[#0aa84f]">
    Young Minds
  </span>

  <span className="block text-[#0aa84f]">
    Build Bright Futures
  </span>
</h1>

        <p className="
  mx-auto
  mt-5
  max-w-[520px]
  text-[15px]
  leading-[1.65]
  text-[#2b2b2b]
  lg:text-[clamp(13px,1.15vw,16px)]
">
          {school.hero_subtitle}
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
  {highlights.map((item) => (
    <li
  key={item}
  className="
    group
    flex
    min-h-[64px] sm:min-h-[72px]
    flex-col
    items-center
    justify-center
    rounded-2xl
    border
    border-[#0aa84f]/40
    bg-white
    px-2
    py-3
    text-center
    shadow-[0_6px_18px_rgba(10,168,79,0.08)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-red-500
    hover:shadow-[0_10px_24px_rgba(220,38,38,0.14)]
  "
>
    <span
  className="
    mb-2
    flex
    h-7
    w-7
    items-center
    justify-center
    rounded-full
    bg-[#0aa84f]/10
    text-[#0aa84f]
    transition-all
    duration-300
    group-hover:bg-red-50
    group-hover:text-red-600
  "
>
  <Check size={14} strokeWidth={3} />
</span>

      <span className="text-xs sm:text-xs font-semibold leading-tight text-[#1f2937] sm:text-xs">
        {item}
      </span>
    </li>
  ))}
</ul>

        <div className="
  mt-7
  flex
  flex-wrap
  items-center
  justify-center
  gap-x-6
  gap-y-4
  lg:mt-[1.5vw]
">
          <div className="text-center">
            {/* Speech-bubble button */}
  <Link
  href="/admissions"
  className={`
    ${display.className}
    group
    relative
    inline-flex
    items-center
    gap-3
    rounded-xl
    rounded-bl-sm
    bg-[#0aa84f]
    px-7
    py-3.5
    text-xl
    uppercase
    tracking-wide
    text-white
    shadow-[0_10px_25px_rgba(10,168,79,0.22)]
    transition-all
    duration-300
    hover:-translate-y-1
    hover:bg-red-600
    hover:shadow-[0_12px_28px_rgba(220,38,38,0.28)]
  `}
>
  Apply for Admission

  <span className="transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>

  {/* Button corner */}
  <span
    className="
      absolute
      -bottom-[10px]
      left-0
      h-0
      w-0
      border-r-[18px]
      border-t-[14px]
      border-r-transparent
      border-t-[#0aa84f]
      transition-colors
      duration-300
      group-hover:border-t-red-600
    "
  />
</Link>
            <div className="mt-4 flex justify-center">
  <div
    className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-[#0aa84f]/20
      bg-[#0aa84f]/[0.07]
      px-4
      py-2
      shadow-sm
    "
  >
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0aa84f]/40" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0aa84f]" />
    </span>

    <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#08783c] sm:text-xs">
      Admissions Open
    </span>

    <span className="h-4 w-px bg-[#0aa84f]/25" />

    <span className="text-[11px] font-bold text-[#2b2b2b] sm:text-xs">
      Session {school.admission_session}
    </span>
  </div>
</div>
          </div>

        </div>
      </motion.div>

      {/* ============ MOBILE / TABLET STUDENT ============ */}
      <div className="relative z-10 -mt-px h-[380px] overflow-hidden bg-white lg:hidden">
        <div className="absolute -bottom-[45%] left-1/2 aspect-square w-[130%] -translate-x-1/2 overflow-hidden rounded-full bg-[#0a7a3c]">
          <div
            className="absolute -inset-4 scale-110 bg-cover bg-center blur-[3px]"
            style={{ backgroundImage: "url('/images/school-building.jpg.jpeg')" }}
          />
          <div className="absolute inset-0 bg-[#078a43]/[0.55]" />
        </div>
        <div className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-[75%] max-w-[360px]">
          <Image
            src="/images/hero-student.png"
            alt="Smiling school student holding books"
            fill
            sizes="75vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}