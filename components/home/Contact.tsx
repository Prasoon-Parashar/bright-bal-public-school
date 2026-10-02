"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
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
} from "lucide-react";

export default function Contact() {
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

    if (!/^[6-9]\d{9}$/.test(phone)) {
      alert("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    try {
      setLoading(true);

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

      alert("Message Sent Successfully!");

      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
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
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: "+91 9997157985",
    },
    {
      icon: Mail,
      title: "Email Address",
      content: "brightbalp@gmail.com",
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
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-red-100/60 blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-[450px] w-[450px] rounded-full bg-yellow-100/60 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* HEADING */}
        <div className="mx-auto max-w-3xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-2.5 text-sm font-bold text-red-700">
            <Sparkles size={17} />
            Get in Touch
          </div>

          <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            We&apos;re Here to
            <span className="text-red-700"> Help You</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Have questions about admissions or our school? Contact Bright Bal
            Public School and our team will be happy to assist you.
          </p>

        </div>

        {/* MAIN CONTENT */}
        <div className="mt-16 grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT */}
          <div className="flex flex-col">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-700">
                Contact Information
              </p>

              <h3 className="mt-3 text-3xl font-extrabold text-slate-900">
                Let&apos;s Start a Conversation
              </h3>

              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Whether you need admission information, school details or
                general assistance, you can reach us using any of the options
                below.
              </p>
            </div>

          {/* Contact Cards */}
<div className="mt-8 grid grid-cols-1 gap-4">
  {contactDetails.map((item) => {
    const Icon = item.icon;

    return (
      <div
        key={item.title}
        className="group flex min-h-[104px] w-full items-center gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
      >
        <div className="flex h-12 w-12 min-h-12 min-w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700 transition-all duration-300 group-hover:bg-red-700 group-hover:text-white">
          <Icon size={24} />
        </div>

        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-extrabold text-slate-900">
            {item.title}
          </h4>

          <div className="mt-1 break-words text-sm leading-6 text-slate-600">
            {item.content}
          </div>
        </div>
      </div>
    );
  })}
</div>

            {/* Quick Info */}
            <div className="mt-6 rounded-3xl bg-gradient-to-r from-red-800 via-red-700 to-red-500 p-7 text-white shadow-xl">

              <div className="flex items-start gap-4">

                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-white/10 p-3">
                  <CheckCircle2 size={25} />
                </div>

                <div>
                  <h4 className="text-xl font-extrabold">
                    Admission Enquiries Welcome
                  </h4>

                  <p className="mt-2 leading-7 text-red-100">
                    Parents can contact the school for information regarding
                    classes, admission procedures and other queries.
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* FORM */}
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">

            {/* Form Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-red-800 via-red-700 to-red-500 px-8 py-8 text-white">

              <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                  <MessageSquare size={24} />
                </div>

                <h3 className="mt-5 text-3xl font-extrabold">
                  Send Us a Message
                </h3>

                <p className="mt-2 max-w-lg leading-7 text-red-100">
                  Fill out the form below and our school team will get in
                  touch with you.
                </p>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-7 sm:p-8"
            >

              {/* Name */}
              <div>
                <label className="mb-2.5 flex items-center gap-2 text-sm font-bold text-slate-800">
                  <User size={17} className="text-red-700" />
                  Your Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
                />
              </div>

              {/* Phone + Email */}
              <div className="grid gap-6 sm:grid-cols-2">

                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Phone size={17} className="text-red-700" />
                    Mobile Number
                  </label>

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
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
                  />
                </div>

                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-sm font-bold text-slate-800">
                    <Mail size={17} className="text-red-700" />
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
                  />
                </div>

              </div>

              {/* Message */}
              <div>
                <label className="mb-2.5 flex items-center gap-2 text-sm font-bold text-slate-800">
                  <MessageSquare size={17} className="text-red-700" />
                  Your Message
                </label>

                <textarea
                  rows={6}
                  placeholder="Tell us how we can help you..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-red-600 focus:bg-white focus:ring-4 focus:ring-red-600/10"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-red-800 to-red-600 py-4 font-bold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50"
              >
                <Send
                  size={19}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />

                {loading ? "Sending Message..." : "Send Message"}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                Your details will only be used to respond to your school
                enquiry.
              </p>

            </form>

          </div>

        </div>

        {/* MAP */}
        <div className="mt-16 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl">

          {/* Map Heading */}
          <div className="flex flex-col justify-between gap-5 border-b border-slate-200 p-6 sm:flex-row sm:items-center sm:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-red-100 p-3 text-red-700">
                <Navigation size={25} />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Find Us on the Map
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Bright Bal Public School, Agra
                </p>
              </div>

            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <MapPin size={17} className="text-red-600" />
              Baldev Nagar, Gober Chowki
            </div>

          </div>

          <iframe
            src="https://www.google.com/maps?q=Bright+Bal+Public+School+Agra&output=embed"
            className="h-[450px] w-full border-0"
            loading="lazy"
            allowFullScreen
            title="Bright Bal Public School Location"
          />

        </div>

      </div>
    </section>
  );
}