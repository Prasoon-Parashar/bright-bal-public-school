import {
  Phone,
  Mail,
  MapPin,
  Clock3,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <aside className="space-y-4">
      {/* Contact Header */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-red-500 p-6 text-white shadow-xl">
        <h2 className="text-3xl font-bold">
          Contact Information
        </h2>

        <p className="mt-2 text-red-100">
          Reach out to us for any school-related information.
        </p>
      </div>

      {/* Phone */}
      <div className="flex min-h-[104px] items-center gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <Phone size={24} />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-slate-800">
            Phone Number
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            +91 9997157985
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex min-h-[104px] items-center gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <Mail size={24} />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-slate-800">
            Email Address
          </h3>

          <p className="mt-1 break-all text-sm leading-6 text-slate-600">
            brightbalp@gmail.com
          </p>
        </div>
      </div>

      {/* School Address */}
      <div className="flex min-h-[104px] items-center gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <MapPin size={24} />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-slate-800">
            School Address
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Baldev Nagar, Gobar Chowki, Agra, Uttar Pradesh
          </p>
        </div>
      </div>

      {/* Office Hours */}
      <div className="flex min-h-[104px] items-center gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-xl">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-700">
          <Clock3 size={24} />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-bold text-slate-800">
            Office Hours
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Monday - Saturday
            <br />
            8:00 AM - 3:00 PM
          </p>
        </div>
      </div>
    </aside>
  );
}