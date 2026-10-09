"use client";

import {
  Phone,
  Mail,
  MapPin,
  Clock3,
  ArrowUpRight,
  Navigation,
  Sparkles,
  MessageCircle,
  School,
} from "lucide-react";

const contactItems = [
  {
    title: "Phone Number",
    value: "+91 9997157985",
    description: "Call us for admission enquiries",
    href: "tel:+919997157985",
    icon: Phone,
    color: "red",
  },
  {
    title: "Email Address",
    value: "brightbalp@gmail.com",
    description: "Send us your questions",
    href: "mailto:brightbalp@gmail.com",
    icon: Mail,
    color: "blue",
  },
];

export default function ContactInfo() {
  return (
    <aside className="space-y-5">

      {/* PREMIUM CONTACT HEADER */}
      <div className="group relative overflow-hidden rounded-[2rem] bg-[#101B33] p-7 text-white shadow-xl shadow-slate-900/10 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1565C0]/25 via-transparent to-[#C62828]/25" />

        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-125" />

        <div className="pointer-events-none absolute -right-5 -top-5 h-24 w-24 rounded-full border border-white/10" />

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-100">
            <Sparkles size={14} className="text-yellow-300" />
            WE&apos;RE HERE TO HELP
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
            Let&apos;s Talk
            <br />
            <span className="bg-gradient-to-r from-red-300 via-white to-blue-300 bg-clip-text text-transparent">
              About Your Child&apos;s Future.
            </span>
          </h2>

          <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
            Have questions about admissions or school information? Our team
            is here to help you with the next step.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-200">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
            Bright Bal Public School, Agra
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C62828] via-white/70 to-[#1565C0]" />
      </div>

      {/* PHONE AND EMAIL */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {contactItems.map((item) => {
          const Icon = item.icon;
          const isRed = item.color === "red";

          return (
            <a
              key={item.title}
              href={item.href}
              className="group relative flex min-h-[120px] items-center gap-4 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/[0.06]"
            >
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full ${
                  isRed ? "bg-[#C62828]" : "bg-[#1565C0]"
                }`}
              />

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 ${
                  isRed
                    ? "bg-red-50 text-[#C62828] group-hover:bg-[#C62828] group-hover:text-white"
                    : "bg-blue-50 text-[#1565C0] group-hover:bg-[#1565C0] group-hover:text-white"
                }`}
              >
                <Icon size={25} strokeWidth={1.9} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {item.title}
                </p>

                <p className="mt-1 break-words text-base font-extrabold text-[#101B33] transition-colors group-hover:text-[#1565C0]">
                  {item.value}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>

              <ArrowUpRight
                size={19}
                className="shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#1565C0]"
              />
            </a>
          );
        })}
      </div>

      {/* SCHOOL ADDRESS */}
      <a
        href="https://www.google.com/maps/search/?api=1&query=Bright+Bal+Public+School+Baldev+Nagar+Gobar+Chowki+Agra"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex min-h-[130px] items-center gap-4 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/[0.06]"
      >
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#1565C0] transition-all duration-500 group-hover:w-full" />

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1565C0] transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:bg-[#1565C0] group-hover:text-white">
          <MapPin size={25} strokeWidth={1.9} />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            VISIT OUR SCHOOL
          </p>

          <h3 className="mt-1 text-base font-extrabold text-[#101B33] transition-colors group-hover:text-[#1565C0]">
            School Address
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Baldev Nagar, Gobar Chowki, Agra, Uttar Pradesh
          </p>

          <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#1565C0]">
            <Navigation size={14} />
            Get Directions
            <ArrowUpRight
              size={13}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </a>

      {/* OFFICE HOURS */}
      <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/[0.05]">
        <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#C62828] transition-all duration-500 group-hover:w-full" />

        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C62828] transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 group-hover:bg-[#C62828] group-hover:text-white">
            <Clock3 size={25} strokeWidth={1.9} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              WHEN TO REACH US
            </p>

            <h3 className="mt-1 text-base font-extrabold text-[#101B33] transition-colors group-hover:text-[#1565C0]">
              Office Hours
            </h3>

            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
              Monday – Saturday
            </p>

            <p className="text-sm font-extrabold text-[#101B33]">
              8:00 AM – 3:00 PM
            </p>
          </div>

          <div className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 sm:flex">
            <School size={19} />
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-red-100 bg-red-50/60 px-4 py-3">
          <p className="text-xs leading-6 text-slate-600">
            Please contact the school office during working hours for
            admission and administrative enquiries.
          </p>
        </div>
      </div>

      {/* QUICK CONTACT CTA */}
      <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C62828] via-[#D32F2F] to-[#E53935] p-6 text-white shadow-xl shadow-red-950/10">
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full border border-white/15 transition-transform duration-700 group-hover:scale-125" />

        <div className="pointer-events-none absolute -bottom-12 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
            <MessageCircle size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-extrabold">
              Need Quick Assistance?
            </h3>

            <p className="mt-1 text-sm leading-6 text-red-100">
              Call our school office for enquiries.
            </p>
          </div>

          <a
            href="tel:+919997157985"
            aria-label="Call Bright Bal Public School"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#C62828] transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:text-[#1565C0]"
          >
            <Phone size={20} />
          </a>
        </div>

        <div className="relative mt-5 border-t border-white/20 pt-4">
          <p className="text-xs leading-5 text-red-100">
            Bright Bal Public School · Agra, Uttar Pradesh
          </p>
        </div>
      </div>

    </aside>
  );
}