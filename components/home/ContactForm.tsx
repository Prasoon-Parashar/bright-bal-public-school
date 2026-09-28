"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
} from "lucide-react";

export default function ContactForm() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(name.trim())) {
      alert("Please enter a valid name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Enter a valid 10-digit mobile number.");
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      alert("Enter a valid email.");
      return;
    }

    if (!message.trim()) {
      alert("Please enter your message.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("enquiries")
        .insert({
          name,
          phone,
          email,
          message,
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Message sent successfully!");

      setName("");
      setPhone("");
      setEmail("");
      setMessage("");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">

      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-8 py-6 text-white">

        <h2 className="text-3xl font-bold">
          Send Us a Message
        </h2>

        <p className="mt-2 text-red-100">
          We'd love to hear from you.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 p-8 md:grid-cols-2"
      >

        {/* Name */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

            <User size={18} />

            Full Name

          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
             className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
            placeholder="Enter your full name"
            required
          />

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

            <Phone size={18} />

            Mobile Number

          </label>

          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value.replace(/\D/g, "")
              )
            }
             className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
            placeholder="10-digit mobile number"
            required
          />

        </div>

                {/* Email */}

        <div>

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

            <Mail size={18} />

            Email Address

          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
            placeholder="example@gmail.com"
          />

        </div>

        {/* Message */}

        <div className="md:col-span-2">

          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700">

            <MessageSquare size={18} />

            Message

          </label>

          <textarea
            rows={6}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
             className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
            placeholder="Write your message..."
            required
          />

        </div>

        {/* Submit */}

        <div className="md:col-span-2">

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-8 py-5 text-lg font-semibold text-white shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >

            <Send size={22} />

            {loading
              ? "Sending Message..."
              : "Send Message"}

          </button>

          <p className="mt-4 text-center text-sm text-slate-500">
            We'll get back to you as soon as possible.
          </p>

        </div>

              </form>

    </div>
  );
}