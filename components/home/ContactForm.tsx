"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function ContactForm() {
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

    if (!/^[A-Za-z ]+$/.test(name.trim())) {
      alert("Please enter a valid name using English letters.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Enter a valid email address.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter your message.");
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
      console.error("Contact form submission failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClasses =
    "w-full rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-4 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-[#1565C0] focus:bg-white focus:ring-4 focus:ring-blue-500/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative isolate mx-auto w-full max-w-3xl"
    >
      {/* BACKGROUND GLOW */}
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-br from-red-200/40 via-transparent to-blue-200/50 blur-2xl" />

      {/* MAIN CARD */}
      <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.12)] sm:rounded-[2.5rem]">
        {/* HEADER */}
        <div className="relative isolate overflow-hidden bg-gradient-to-br from-[#101B33] via-[#172B4D] to-[#0D47A1] px-6 py-8 text-white sm:px-10 sm:py-10">
          <div className="absolute left-0 top-0 h-1.5 w-full bg-gradient-to-r from-[#C62828] via-[#E53935] to-blue-400" />

          <div className="pointer-events-none absolute -right-16 -top-20 -z-10 h-64 w-64 rounded-full bg-blue-400/20 blur-[80px]" />

          <div className="pointer-events-none absolute -bottom-24 -left-10 -z-10 h-56 w-56 rounded-full bg-red-500/20 blur-[80px]" />

          <div className="relative flex items-start gap-4 sm:gap-5">
            <motion.div
              animate={{ y: [0, -4, 0], rotate: [0, 3, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-blue-200 shadow-lg backdrop-blur-sm sm:h-16 sm:w-16"
            >
              <MessageSquare size={28} />
            </motion.div>

            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100 sm:text-xs">
                <Sparkles size={13} />
                Get in Touch
              </div>

              <h2 className="mt-4 text-2xl font-black tracking-tight sm:text-4xl">
                Send Us a Message
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-7 text-blue-100/90 sm:text-base">
                Have a question about admissions or school activities?
                We&apos;re here to help you and your family.
              </p>
            </div>
          </div>

          {/* TOPIC TAGS */}
          <div className="relative mt-7 flex flex-wrap gap-2">
            {["Admissions", "School Information", "Enquiries"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.08] px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-white sm:text-xs"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        {/* FORM BODY */}
        <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-10">
          {/* SUCCESS MESSAGE */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              className="flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#1565C0]">
                <CheckCircle2 size={22} />
              </div>

              <div>
                <h3 className="font-bold text-[#0D47A1]">
                  Message sent successfully!
                </h3>
                <p className="mt-1 text-sm leading-6 text-blue-800">
                  Thank you for contacting Bright Bal Public School. We
                  appreciate your enquiry.
                </p>
              </div>
            </motion.div>
          )}

          {/* NAME */}
          <div className="group">
            <label
              htmlFor="contact-name"
              className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#101B33]"
            >
              <User size={17} className="text-[#C62828]" />
              Full Name
              <span className="text-red-500">*</span>
            </label>

            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              autoComplete="name"
              maxLength={100}
              required
              className={inputClasses}
            />
          </div>

          {/* PHONE + EMAIL */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="group">
              <label
                htmlFor="contact-phone"
                className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#101B33]"
              >
                <Phone size={17} className="text-[#C62828]" />
                Mobile Number
                <span className="text-red-500">*</span>
              </label>

              <input
                id="contact-phone"
                type="tel"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="10-digit mobile number"
                autoComplete="tel-national"
                inputMode="numeric"
                maxLength={10}
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number"
                required
                className={inputClasses}
              />
            </div>

            <div className="group">
              <label
                htmlFor="contact-email"
                className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#101B33]"
              >
                <Mail size={17} className="text-[#1565C0]" />
                Email Address
                <span className="text-xs font-medium text-slate-400">
                  (Optional)
                </span>
              </label>

              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                autoComplete="email"
                maxLength={254}
                className={inputClasses}
              />
            </div>
          </div>

          {/* MESSAGE */}
          <div className="group">
            <label
              htmlFor="contact-message"
              className="mb-2.5 flex items-center gap-2 text-sm font-bold text-[#101B33]"
            >
              <MessageSquare size={17} className="text-[#1565C0]" />
              Your Message
              <span className="text-red-500">*</span>
            </label>

            <textarea
              id="contact-message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us how we can help you..."
              maxLength={500}
              required
              className={`${inputClasses} min-h-[140px] resize-y leading-7`}
            />

            <p className="mt-2 text-right text-xs text-slate-400">
              {message.length}/500 characters
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#C62828] via-[#E53935] to-[#1565C0] px-6 py-4 font-bold text-white shadow-lg shadow-red-700/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-700/20 disabled:cursor-not-allowed disabled:opacity-60 sm:py-5 sm:text-lg"
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
                  Send Message
                  <Send
                    size={19}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </span>
          </motion.button>

          {/* PRIVACY NOTE */}
          <div className="flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-500">
            <ShieldCheck size={15} className="shrink-0 text-[#1565C0]" />
            Your details will only be used to respond to your enquiry.
          </div>
        </form>

        {/* FOOTER STRIP */}
        <div className="flex items-center justify-center gap-2 border-t border-slate-100 bg-slate-50/80 px-5 py-4 text-center text-xs font-semibold text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C62828]" />
          Bright Bal Public School
          <span className="text-slate-300">•</span>
          <span className="text-[#1565C0]">Agra</span>
          <ArrowRight size={13} className="text-slate-400" />
        </div>
      </div>
    </motion.div>
  );
}