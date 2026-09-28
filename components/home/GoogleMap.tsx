import { MapPinned } from "lucide-react";

export default function GoogleMap() {
  return (
    <section className="bg-slate-50 py-20">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-10 text-center">

          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-5 py-2 font-semibold text-red-700">

            <MapPinned size={18} />

            Find Us

          </div>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Visit Our Campus
          </h2>

          <p className="mt-3 text-slate-600">
            Easily locate Bright Bal Public School using Google Maps.
          </p>

        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl">

            <iframe
    src="https://www.google.com/maps?q=Bright+Bal+Public+School+Agra&output=embed"
    className="w-full h-[450px]"
    loading="lazy"
    allowFullScreen
  />

        </div>

      </div>

    </section>
  );
}