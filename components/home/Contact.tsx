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

  async function handleSubmit(e: React.FormEvent) {
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

      setTimeout(() => {
        setSuccess(false);
      }, 6000);
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
      color: "green",
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+91 9997157985",
      color: "red",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "brightbalp@gmail.com",
      color: "yellow",
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
      color: "green",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8faf9] py-24 sm:py-28 lg:py-32">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-48 top-10 h-[500px] w-[500px] rounded-full bg-red-100/60 blur-[150px]" />

        <div className="absolute -right-48 top-[35%] h-[500px] w-[500px] rounded-full bg-green-100/70 blur-[150px]" />

        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-yellow-100/50 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(#0aa84f 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      {/* =========================================================
          FLOATING EDUCATION DECORATIONS
      ========================================================= */}

      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [-4, 4, -4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[4%] top-[13%] hidden text-[#0aa84f]/20 md:block"
      >
        <BookOpen size={58} strokeWidth={1.3} />
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
        className="pointer-events-none absolute right-[6%] top-[12%] hidden text-yellow-500/30 md:block"
      >
        <Star size={43} fill="currentColor" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -10, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[26%] left-[6%] hidden text-red-400/20 md:block"
      >
        <Mail size={45} strokeWidth={1.4} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [5, -5, 5],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute bottom-[18%] right-[5%] hidden text-[#0aa84f]/20 md:block"
      >
        <GraduationCap size={52} strokeWidth={1.3} />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute left-[17%] top-[24%] h-4 w-4 rounded-full bg-red-300"
      />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[19%] top-[28%] h-5 w-5 rounded-full bg-green-300"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* =========================================================
            HEADING
        ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[#078a43] shadow-sm sm:text-sm">
            <Sparkles size={16} />
            Get in Touch
          </div>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Let&apos;s Start a{" "}
            <span className="text-[#078a43]">Conversation</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Have a question about admissions, school activities or your
            child&apos;s learning journey? We&apos;re always happy to help.
          </p>

          {/* Divider */}

          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-red-200" />

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-[#0aa84f]"
            >
              <Heart size={17} fill="currentColor" />
            </motion.div>

            <span className="h-px w-12 bg-red-200" />
          </div>
        </motion.div>

        {/* =========================================================
            MAIN GRID
        ========================================================= */}

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:mt-20">
          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75 }}
            className="flex flex-col"
          >
            {/* Intro */}

            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-red-600">
                Contact Information
              </p>

              <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                We&apos;re Always
                <span className="text-[#078a43]"> Happy to Help</span>
              </h3>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Whether you are planning a school visit, looking for admission
                information or simply have a question, our team is here for
                you.
              </p>
            </div>

            {/* Contact Cards */}

            <div className="mt-8 space-y-4">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;

                const iconStyles =
                  item.color === "red"
                    ? "bg-red-50 text-red-600 group-hover:bg-red-600"
                    : item.color === "yellow"
                      ? "bg-yellow-50 text-yellow-600 group-hover:bg-yellow-500"
                      : "bg-green-50 text-[#0aa84f] group-hover:bg-[#0aa84f]";

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -5, x: 4 }}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] transition-all duration-300 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(10,168,79,0.12)]"
                  >
                    {/* Hover glow */}

                    <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-green-100/40 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl transition-all duration-300 group-hover:text-white group-hover:rotate-3 group-hover:scale-105 ${iconStyles}`}
                      >
                        <Icon size={24} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-base font-black text-slate-900 sm:text-lg">
                          {item.title}
                        </h4>

                        <div className="mt-1 break-words text-sm leading-6 text-slate-600">
                          {item.content}
                        </div>
                      </div>

                      <ArrowRight
                        size={18}
                        className="hidden text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#0aa84f] sm:block"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gradient-to-r from-[#078a43] via-[#0aa84f] to-red-500 transition-transform duration-500 group-hover:scale-x-100" />
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Info */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="relative mt-6 overflow-hidden rounded-[2rem] bg-[#13221b] p-7 text-white shadow-[0_25px_60px_rgba(15,23,42,0.18)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#0aa84f]/20 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-red-500/10 blur-3xl" />

              <div className="relative flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0aa84f]/15 text-[#4be38b]">
                  <ShieldCheck size={27} />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4be38b]">
                    Parents Welcome
                  </p>

                  <h4 className="mt-2 text-xl font-black">
                    Your Questions Matter
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Reach out to us for admissions, school information,
                    timings, activities or any other query.
                  </p>
                </div>
              </div>

              <div className="relative mt-6 flex items-center gap-2 border-t border-white/10 pt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                <CircleCheck size={15} className="text-[#4be38b]" />
                We&apos;re here to help
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================================
              FORM SIDE
          ===================================================== */}

          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            {/* Floating badge */}

            <motion.div
              animate={{
                y: [0, -8, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-3 -top-5 z-20 hidden items-center gap-2 rounded-2xl border border-white bg-white px-4 py-3 text-xs font-bold text-[#078a43] shadow-xl sm:flex"
            >
              <MessageSquare size={16} />
              Let&apos;s Talk
            </motion.div>

            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]">
              {/* Form Header */}

              {/* Form Header */}

<div className="relative overflow-hidden bg-[#5b1720] px-7 py-8 text-white sm:px-9 sm:py-10">

  {/* Top accent */}
  <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#f5c76b] via-[#d94b4b] to-[#8b1e2d]" />

  {/* Soft background glow */}
  <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d94b4b]/25 blur-[90px]" />

  <div className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-[#f5c76b]/10 blur-[90px]" />

  {/* Decorative circles */}
  <div className="pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full border border-[#f5c76b]/15" />

  <div className="pointer-events-none absolute right-14 top-14 h-16 w-16 rounded-full border border-white/10" />

  {/* Decorative sparkle */}
  <motion.div
    animate={{
      y: [0, -6, 0],
      rotate: [0, 8, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 4.5,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="pointer-events-none absolute right-10 top-9 text-[#f5c76b]/30"
  >
    <Sparkles size={42} />
  </motion.div>

  {/* Main content */}
  <div className="relative">

    {/* Icon */}
    <motion.div
      animate={{
        y: [0, -4, 0],
        rotate: [0, 3, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f5c76b]/25 bg-white/10 text-[#f5c76b] shadow-lg backdrop-blur-sm"
    >
      <MessageSquare size={27} />
    </motion.div>

    {/* Small label */}
    <div className="mt-5 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#f5c76b]" />

      <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#f5c76b]">
        We&apos;re Here to Help
      </span>
    </div>

    {/* Heading */}
    <h3 className="mt-2 max-w-xl text-3xl font-black tracking-tight text-white sm:text-4xl">
      Send Us a Message
    </h3>

    {/* Description */}
    <p className="mt-3 max-w-lg text-sm leading-7 text-rose-100 sm:text-base">
      Tell us what you need. Fill in the details and our school
      team will get back to you.
    </p>

    {/* Categories */}
    <div className="mt-6 flex flex-wrap gap-2">

      <span className="rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-[#f5c76b]/50 hover:bg-[#f5c76b]/10">
        Admissions
      </span>

      <span className="rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-[#f5c76b]/50 hover:bg-[#f5c76b]/10">
        School Info
      </span>

      <span className="rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-300 hover:border-[#f5c76b]/50 hover:bg-[#f5c76b]/10">
        Enquiries
      </span>

    </div>

  </div>

  {/* Bottom decorative line */}
  <div className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#f5c76b]/70 to-transparent" />

</div>

              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-6 p-7 sm:p-9"
              >
                {/* Success */}

                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="rounded-2xl border border-green-200 bg-green-50 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-[#0aa84f]">
                        <CheckCircle2 size={21} />
                      </div>

                      <div>
                        <h4 className="font-black text-green-800">
                          Message Sent Successfully!
                        </h4>

                        <p className="mt-1 text-sm leading-6 text-green-700">
                          Thank you for contacting Bright Bal Public School.
                          Our team will get back to you.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Name */}

                <div className="group">
                  <label className="mb-2.5 flex items-center gap-2 text-sm font-black text-slate-800">
                    <User size={17} className="text-red-600" />
                    Your Name
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                    />

                    <div className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-red-600 to-[#0aa84f] transition-transform duration-300 group-focus-within:scale-x-100" />
                  </div>
                </div>

                {/* Phone + Email */}

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="group">
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-black text-slate-800">
                      <Phone size={17} className="text-red-600" />
                      Mobile Number
                    </label>

                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        value={phone}
                        maxLength={10}
                        inputMode="numeric"
                        pattern="[6-9][0-9]{9}"
                        title="Enter a valid 10-digit Indian mobile number"
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          setPhone(value);
                        }}
                        required
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10"
                      />

                      <div className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-red-600 to-[#0aa84f] transition-transform duration-300 group-focus-within:scale-x-100" />
                    </div>
                  </div>

                  <div className="group">
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-black text-slate-800">
                      <Mail size={17} className="text-[#0aa84f]" />
                      Email Address
                    </label>

                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#0aa84f] focus:bg-white focus:ring-4 focus:ring-[#0aa84f]/10"
                      />

                      <div className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-[#078a43] to-red-500 transition-transform duration-300 group-focus-within:scale-x-100" />
                    </div>
                  </div>
                </div>

                {/* Message */}

                <div className="group">
                  <label className="mb-2.5 flex items-center gap-2 text-sm font-black text-slate-800">
                    <MessageSquare size={17} className="text-[#0aa84f]" />
                    Your Message
                  </label>

                  <div className="relative">
                    <textarea
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-300 focus:border-[#0aa84f] focus:bg-white focus:ring-4 focus:ring-[#0aa84f]/10"
                    />

                    <div className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-[#078a43] to-red-500 transition-transform duration-300 group-focus-within:scale-x-100" />
                  </div>
                </div>

                {/* Submit */}

                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#078a43] via-[#0aa84f] to-[#079447] py-4 font-black text-white shadow-lg shadow-green-700/20 transition-all duration-300 hover:shadow-xl hover:shadow-green-700/25 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={19}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-6"
                      />
                    </>
                  )}
                </motion.button>

                {/* Privacy */}

                <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
                  <ShieldCheck
                    size={14}
                    className="text-[#0aa84f]"
                  />
                  Your details will only be used to respond to your enquiry.
                </div>
              </form>
            </div>
          </motion.div>
        </div>

        {/* =========================================================
            MAP
        ========================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.75 }}
          className="relative mt-16 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.1)] sm:mt-20"
        >
          {/* Map Header */}

          <div className="relative flex flex-col justify-between gap-5 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:px-8 sm:py-7">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  y: [0, -4, 0],
                  rotate: [0, 4, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600"
              >
                <Navigation size={25} />
              </motion.div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0aa84f]">
                  Find Us
                </p>

                <h3 className="mt-1 text-2xl font-black text-slate-900">
                  Visit Bright Bal Public School
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Baldev Nagar, Gober Chowki, Agra
                </p>
              </div>
            </div>

            <Link
              href="https://www.google.com/maps/search/?api=1&query=Bright+Bal+Public+School+Agra"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-green-200 bg-green-50 px-5 py-3 text-sm font-bold text-[#078a43] transition-all duration-300 hover:-translate-y-1 hover:border-[#0aa84f] hover:bg-[#0aa84f] hover:text-white"
            >
              Open in Maps
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Map */}

          <div className="relative">
            <iframe
              src="https://www.google.com/maps?q=Bright+Bal+Public+School+Agra&output=embed"
              className="h-[400px] w-full border-0 sm:h-[450px]"
              loading="lazy"
              allowFullScreen
              title="Bright Bal Public School Location"
            />

            {/* Map floating badge */}

            <div className="pointer-events-none absolute bottom-5 left-5 hidden rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-xl backdrop-blur-md sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs font-black text-slate-900">
                    Bright Bal Public School
                  </p>

                  <p className="text-[10px] text-slate-500">
                    Agra, Uttar Pradesh
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom tagline */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-3"
        >
          <span className="h-px w-8 bg-green-200" />

          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 sm:text-xs">
            Connect • Communicate • Grow Together
          </span>

          <span className="h-px w-8 bg-green-200" />
        </motion.div>
      </div>
    </section>
  );
}