import { PhoneCall, Mail, MapPin } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-red-500 py-24">

      <div className="absolute inset-0 bg-black/10" />

      <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 text-center text-white">

        <span className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold backdrop-blur">
          Get In Touch
        </span>

        <h1 className="mt-6 text-5xl font-extrabold md:text-6xl">
          Contact
          <span className="block text-yellow-300">
            Bright Bal Public School
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-red-100">
          We'd love to hear from you. Contact us for admissions,
          enquiries or any information regarding the school.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <PhoneCall className="mx-auto text-green-300" size={30}/>
            <h3 className="mt-3 text-xl font-bold">
              Call Us
            </h3>
            <p className="mt-2 text-red-100">
              +91 9997157985
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <Mail className="mx-auto text-green-300" size={30}/>
            <h3 className="mt-3 text-xl font-bold">
              Email
            </h3>
            <p className="mt-2 text-red-100">
              brightbalp@gmail.com
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
            <MapPin className="mx-auto text-green-300" size={30}/>
            <h3 className="mt-3 text-xl font-bold">
              Address
            </h3>
            <p className="mt-2 text-red-100">
              Agra, Uttar Pradesh
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}