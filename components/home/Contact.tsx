"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  User,
  MessageSquare,
  Send,
  Sparkles,
  Navigation,
  CheckCircle2,
  BookOpen,
  Star,
  GraduationCap,
  ArrowRight,
  Heart,
  School,
  ShieldCheck,
  CircleCheck,
} from "lucide-react";

export default function Contact() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    try {
      setLoading(true);
      setSuccess(false);

      const { error } = await supabase.from("enquiries").insert({
        name: name.trim(),
        phone,
        email: email.trim(),
        message: message.trim(),
      });

      if (error) {
        alert(error.message);
        return;
      }

      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const contactDetails = [
    {
      icon: MapPin,
      title: "School Address",
      content: "Baldev Nagar, Gober Chowki, Agra, Uttar Pradesh",
      color: "red",
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+91 9997157985",
      color: "blue",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "brightbalp@gmail.com",
      color: "red",
    },
    {
      icon: Clock,
      title: "School Timings",
      content: (
        <>
          Monday - Saturday
          <br />
          8:00 AM - 2:00 PM
        </>
      ),
      color: "blue",
    },
  ];

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-gradient-to-br from-[#FEF2F2] via-white to-[#EFF6FF] py-20 sm:py-24 lg:py-28"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-red-200/40 blur-[130px]" />

        <div className="absolute -right-40 top-[35%] h-[450px] w-[450px] rounded-full bg-blue-200/40 blur-[140px]" />

        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-yellow-100/40 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(#C62828 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* FLOATING EDUCATION ICONS */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-4, 4, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[4%] top-[13%] hidden text-[#C62828]/20 md:block"
      >
        <BookOpen size={55} strokeWidth={1.3} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[6%] top-[12%] hidden text-yellow-500/40 md:block"
      >
        <Star size={40} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[26%] left-[6%] hidden text-blue-500/20 md:block"
      >
        <Mail size={42} strokeWidth={1.4} />
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[18%] right-[5%] hidden text-[#C62828]/20 md:block"
      >
        <GraduationCap size={50} strokeWidth={1.3} />
      </motion.div>

      {/* MAIN CONTAINER */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* SECTION HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/90 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#C62828] shadow-sm backdrop-blur-md sm:text-sm">
            <Sparkles size={16} />
            Get in Touch
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-[#101B33] sm:text-5xl lg:text-6xl">
            Let&apos;s Start a
            <span className="block bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] bg-clip-text text-transparent">
              Conversation
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Have a question about admissions, school activities or your
            child&apos;s learning journey? We&apos;re here to help you every
            step of the way.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-red-200" />

            <motion.div
              animate={{ scale: [1, 1.12, 1], rotate: [0, 8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-lg shadow-red-500/20"
            >
              <Heart size={18} fill="currentColor" />
            </motion.div>

            <span className="h-px w-12 bg-blue-200" />
          </div>
        </motion.div>

        {/* MAIN GRID */}
        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#C62828]">
                Contact Information
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-tight text-[#101B33] sm:text-4xl">
                We&apos;re Always
                <span className="block text-[#1565C0]">
                  Happy to Help
                </span>
              </h3>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Planning a school visit or looking for admission information?
                Get in touch with Bright Bal Public School. We&apos;ll help
                you find the information you need.
              </p>
            </div>

            {/* CONTACT CARDS */}
            <div className="mt-8 space-y-4">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                const isRed = item.color === "red";

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_12px_35px_rgba(15,23,42,0.05)] backdrop-blur-sm transition-all duration-300 hover:border-red-200 hover:shadow-[0_20px_45px_rgba(21,101,192,0.10)]"
                  >
                    <div
                      className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 ${
                        isRed ? "bg-red-200/50" : "bg-blue-200/60"
                      }`}
                    />

                    <div className="relative flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 group-hover:rotate-3 group-hover:scale-105 group-hover:text-white ${
                          isRed
                            ? "bg-red-50 text-[#C62828] group-hover:bg-[#C62828]"
                            : "bg-blue-50 text-[#1565C0] group-hover:bg-[#1565C0]"
                        }`}
                      >
                        <Icon size={24} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-base font-black text-[#101B33] sm:text-lg">
                          {item.title}
                        </h4>

                        <div className="mt-1 break-words text-sm leading-6 text-slate-600">
                          {item.content}
                        </div>
                      </div>

                      <ArrowRight
                        size={18}
                        className={`hidden shrink-0 transition-all duration-300 group-hover:translate-x-1 sm:block ${
                          isRed
                            ? "text-red-300 group-hover:text-[#C62828]"
                            : "text-blue-300 group-hover:text-[#1565C0]"
                        }`}
                      />
                    </div>

                    <div
                      className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                        isRed
                          ? "bg-gradient-to-r from-[#C62828] to-[#E53935]"
                          : "bg-gradient-to-r from-[#1565C0] to-[#0D47A1]"
                      }`}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* PART 2 CONTINUES HERE */}

                        {/* PARENTS WELCOME CARD */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mt-6 overflow-hidden rounded-[2rem] bg-[#101B33] p-7 text-white shadow-[0_25px_60px_rgba(15,23,42,0.18)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-red-500/20 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                  <ShieldCheck size={27} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-300">
                    Parents Are Welcome
                  </p>

                  <h4 className="mt-2 text-xl font-black">
                    Your Questions Matter
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Contact us for admissions, school information, timings,
                    activities or any other enquiry. We&apos;re happy to help.
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-slate-300">
                <CircleCheck size={16} className="text-blue-300" />
                Here for your child&apos;s learning journey
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: ENQUIRY FORM */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* FLOATING BADGE */}
            <motion.div
              animate={{ y: [0, -7, 0], rotate: [-2, 2, -2] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 -top-5 z-20 hidden items-center gap-2 rounded-2xl border border-white bg-white px-4 py-3 text-xs font-bold text-[#1565C0] shadow-xl sm:flex"
            >
              <MessageSquare size={16} />
              Let&apos;s Talk
            </motion.div>

            <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] sm:rounded-[2.5rem]">
              {/* FORM HEADER */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#101B33] via-[#162D50] to-[#0D47A1] px-7 py-8 text-white sm:px-9 sm:py-10">
                <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#C62828] via-[#E53935] to-blue-400" />

                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-400/20 blur-[90px]" />

                <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-red-500/20 blur-[90px]" />

                <div className="pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full border border-white/10" />

                <div className="pointer-events-none absolute right-14 top-14 h-16 w-16 rounded-full border border-red-200/20" />

                <motion.div
                  animate={{ y: [0, -5, 0], rotate: [0, 4, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute right-10 top-9 text-blue-200/30"
                >
                  <Sparkles size={38} />
                </motion.div>

                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-blue-200 shadow-lg backdrop-blur-sm">
                    <MessageSquare size={26} />
                  </div>

                  <div className="mt-5 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400" />

                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">
                      We&apos;re Here to Help
                    </span>
                  </div>

                  <h3 className="mt-2 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                    Send Us a Message
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-blue-100/90 sm:text-base">
                    Tell us what you need. Share your enquiry and our school
                    team will have the details needed to respond.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {["Admissions", "School Information", "Enquiries"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-red-400/70 to-transparent" />
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="space-y-6 p-7 sm:p-9">
                {/* SUCCESS MESSAGE */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    role="status"
                    className="rounded-2xl border border-blue-200 bg-blue-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#1565C0]">
                        <CheckCircle2 size={21} />
                      </div>

                      <div>
                        <h4 className="font-black text-[#0D47A1]">
                          Message Sent Successfully!
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-blue-800">
                          Thank you for contacting Bright Bal Public School.
                          Our team will get back to you.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* NAME */}
                <div className="group">
                  <label
                    htmlFor="contact-name"
                    className="mb-2.5 flex items-center gap-2 text-sm font-black text-[#101B33]"
                  >
                    <User size={17} className="text-[#C62828]" />
                    Your Name
                  </label>

                  <div className="relative">
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      maxLength={100}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#C62828] focus:bg-white focus:ring-4 focus:ring-red-500/10"
                    />

                    <div className="pointer-events-none absolute bottom-0 left-5 right-5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#C62828] to-[#1565C0] transition-transform duration-300 group-focus-within:scale-x-100" />
                  </div>
                </div>

                {/* PHONE AND EMAIL */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="group">
                    <label
                      htmlFor="contact-phone"
                      className="mb-2.5 flex items-center gap-2 text-sm font-black text-[#101B33]"
                    >
                      <Phone size={17} className="text-[#C62828]" />
                      Mobile Number
                    </label>

                    <div className="relative">
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="10-digit number"
                        value={phone}
                        maxLength={10}
                        inputMode="numeric"
                        autoComplete="tel-national"
                        pattern="[6-9][0-9]{9}"
                        title="Enter a valid 10-digit Indian mobile number"
                        onChange={(e) => {
                          setPhone(e.target.value.replace(/\D/g, ""));
                        }}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#C62828] focus:bg-white focus:ring-4 focus:ring-red-500/10"
                      />

                      <div className="pointer-events-none absolute bottom-0 left-5 right-5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#C62828] to-[#1565C0] transition-transform duration-300 group-focus-within:scale-x-100" />
                    </div>
                  </div>

                  <div className="group">
                    <label
                      htmlFor="contact-email"
                      className="mb-2.5 flex items-center gap-2 text-sm font-black text-[#101B33]"
                    >
                      <Mail size={17} className="text-[#1565C0]" />
                      Email Address
                    </label>

                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        maxLength={254}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#1565C0] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      />

                      <div className="pointer-events-none absolute bottom-0 left-5 right-5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#1565C0] to-[#C62828] transition-transform duration-300 group-focus-within:scale-x-100" />
                    </div>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="group">
                  <label
                    htmlFor="contact-message"
                    className="mb-2.5 flex items-center gap-2 text-sm font-black text-[#101B33]"
                  >
                    <MessageSquare size={17} className="text-[#1565C0]" />
                    Your Message
                  </label>

                  <div className="relative">
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={500}
                      required
                      className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#1565C0] focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    />

                    <div className="pointer-events-none absolute bottom-0 left-5 right-5 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#1565C0] to-[#C62828] transition-transform duration-300 group-focus-within:scale-x-100" />
                  </div>

                  <p className="mt-2 text-right text-xs text-slate-400">
                    {message.length}/500 characters
                  </p>
                </div>

                {/* PART 3 CONTINUES HERE */}

                                {/* SUBMIT BUTTON */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] py-4 font-black text-white shadow-lg shadow-red-700/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-700/20 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative flex items-center gap-3">
                    {loading ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Your Enquiry
                        <Send
                          size={19}
                          className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-6"
                        />
                      </>
                    )}
                  </span>
                </motion.button>

                {/* PRIVACY NOTE */}
                <div className="flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
                  <ShieldCheck
                    size={15}
                    className="shrink-0 text-[#1565C0]"
                  />
                  Your details will only be used to respond to your enquiry.
                </div>
              </form>
            </div>
          </motion.div>
        </div>

                {/* PREMIUM SCHOOL LOCATION */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="relative mt-16 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(16,27,51,0.14)] sm:mt-20 sm:rounded-[2.5rem]"
        >
          {/* PREMIUM DARK HEADER */}
          <div className="relative isolate overflow-hidden bg-[#101B33] px-6 py-8 sm:px-9 sm:py-10 lg:px-12">
            <div className="pointer-events-none absolute -right-16 -top-24 -z-10 h-72 w-72 rounded-full bg-blue-500/25 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-red-500/20 blur-[90px]" />

            <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
              <div className="flex items-start gap-4 sm:gap-5">
                {/* ANIMATED LOCATION ICON */}
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center sm:h-[76px] sm:w-[76px]">
                  <motion.div
                    animate={{
                      scale: [1, 1.25, 1.45],
                      opacity: [0.45, 0.2, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                    className="absolute inset-0 rounded-[1.5rem] bg-red-400"
                  />

                  <motion.div
                    animate={{ y: [0, -5, 0], rotate: [0, 4, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex h-full w-full items-center justify-center rounded-[1.5rem] border border-white/15 bg-gradient-to-br from-[#C62828] to-[#E53935] text-white shadow-xl shadow-red-950/30"
                  >
                    <Navigation size={30} strokeWidth={1.8} />
                  </motion.div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-blue-200 sm:text-xs">
                    <MapPin size={13} />
                    Find Our Campus
                  </div>

                  <h3 className="mt-4 text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                    Your Journey to
                    <span className="block bg-gradient-to-r from-red-300 via-rose-200 to-blue-300 bg-clip-text text-transparent">
                      Bright Bal Public School
                    </span>
                  </h3>

                  <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-300 sm:text-base">
                    <MapPin
                      size={18}
                      className="mt-1 shrink-0 text-red-300"
                    />
                    Baldev Nagar, Gober Chowki, Agra, Uttar Pradesh
                  </p>
                </div>
              </div>

              {/* DIRECTIONS BUTTON */}
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Bright+Bal+Public+School+Agra"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full shrink-0 items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#C62828] to-[#E53935] px-6 py-4 text-sm font-black text-white shadow-lg shadow-red-950/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:w-fit"
              >
                <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-full" />

                <Navigation size={19} className="relative" />
                <span className="relative">Get Directions</span>

                <ArrowRight
                  size={18}
                  className="relative transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* HEADER ACCENT */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0]" />
          </div>

          {/* MAP TOP BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#1565C0]">
                <MapPin size={21} />
              </div>

              <div>
                <p className="text-sm font-black text-[#101B33]">
                  Explore Our Location
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Agra, Uttar Pradesh
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#1565C0] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              Interactive Map
            </span>
          </div>

          {/* MAP CONTAINER */}
          <div className="relative bg-slate-100 p-2 sm:p-3">
            <div className="relative h-[350px] overflow-hidden rounded-[1.5rem] sm:h-[430px] lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps?q=Bright+Bal+Public+School+Agra&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Bright Bal Public School location in Agra"
              />

              {/* FLOATING SCHOOL CARD */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pointer-events-none absolute bottom-4 left-4 hidden max-w-[calc(100%-2rem)] sm:block"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-[0_15px_40px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C62828]">
                    <School size={24} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-black text-[#101B33]">
                      Bright Bal Public School
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      English Medium School · Agra
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* BOTTOM CONTACT STRIP */}
          <div className="grid gap-px border-t border-slate-100 bg-slate-100 sm:grid-cols-2">
            <a
              href="tel:+919997157985"
              className="group flex items-center gap-4 bg-white px-6 py-5 transition-colors duration-300 hover:bg-red-50/70 sm:px-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-[#C62828] transition-all duration-300 group-hover:bg-[#C62828] group-hover:text-white">
                <Phone size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-500">
                  Need Help Finding Us?
                </p>
                <p className="mt-1 text-sm font-black text-[#101B33] sm:text-base">
                  +91 9997157985
                </p>
              </div>

              <ArrowRight
                size={18}
                className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#C62828]"
              />
            </a>

            <a
              href="mailto:brightbalp@gmail.com"
              className="group flex items-center gap-4 bg-white px-6 py-5 transition-colors duration-300 hover:bg-blue-50/70 sm:px-8"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#1565C0] transition-all duration-300 group-hover:bg-[#1565C0] group-hover:text-white">
                <Mail size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-slate-500">
                  Have a Question?
                </p>
                <p className="break-all text-sm font-black text-[#101B33] sm:text-base">
                  brightbalp@gmail.com
                </p>
              </div>

              <ArrowRight
                size={18}
                className="shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-[#1565C0]"
              />
            </a>
          </div>
        </motion.div>

        {/* BOTTOM TAGLINE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-red-200" />

          <span className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 sm:text-xs sm:tracking-[0.25em]">
            Connect • Communicate • Grow Together
          </span>

          <span className="h-px w-8 bg-blue-200" />
        </motion.div>
      </div>
    </section>
  );
}