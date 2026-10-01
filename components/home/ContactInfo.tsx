import {
  Phone,
  Mail,
  MapPin,
  Clock3,
} from "lucide-react";

export default function ContactInfo() {
  return (
    <aside className="space-y-6">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">

        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-500 p-6 text-white">
          <h2 className="text-3xl font-bold">
            Contact Information
          </h2>

          <p className="mt-2 text-red-100">
            Reach out to us for any school-related information.
          </p>
        </div>

        <div className="space-y-5 p-6">

          {/* Phone */}
          <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
            <div className="rounded-xl bg-red-100 p-3">
              <Phone className="text-red-700" />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Phone Number
              </h3>

              <p className="text-slate-600">
                +91 9997157985
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
            <div className="rounded-xl bg-red-100 p-3">
              <Mail className="text-red-700" />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Email Address
              </h3>

              <p className="text-slate-600 break-all">
                brightbalp@gmail.com
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
            <div className="rounded-xl bg-red-100 p-3">
              <MapPin className="text-red-700" />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                School Address
              </h3>

              <p className="text-slate-600 leading-6">
                Baldev Nagar,
                <br />
                Gobar Chowki, Agra,
                <br />
                Uttar Pradesh
              </p>
            </div>
          </div>

          {/* Office Hours */}
          <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
            <div className="rounded-xl bg-red-100 p-3">
              <Clock3 className="text-red-700" />
            </div>

            <div>
              <h3 className="font-bold text-slate-800">
                Office Hours
              </h3>

              <p className="text-slate-600 leading-6">
                Monday - Saturday
                <br />
                8:00 AM - 3:00 PM
              </p>
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
}