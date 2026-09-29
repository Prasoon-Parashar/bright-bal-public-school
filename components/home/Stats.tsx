export default function Stats() {
  return (
    <section className="relative z-20 -mt-12 pb-10 sm:-mt-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">

          {/* Years of Excellence */}
          <div className="group rounded-3xl border border-red-100 bg-white p-7 text-center shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-9">
            <h2 className="text-4xl font-extrabold leading-none text-red-700 sm:text-5xl">
              25+
            </h2>

            <p className="mt-3 text-base font-semibold text-slate-600 sm:text-lg">
              Years of Excellence
            </p>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-red-600 transition-all duration-300 group-hover:w-20" />
          </div>

          {/* Classes */}
          <div className="group rounded-3xl border border-red-100 bg-white p-7 text-center shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-9">
            <h2 className="text-3xl font-extrabold leading-tight text-red-700 sm:text-5xl">
              Nursery - VIII
            </h2>

            <p className="mt-3 text-base font-semibold text-slate-600 sm:text-lg">
              Classes
            </p>

            <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-red-600 transition-all duration-300 group-hover:w-20" />
          </div>

        </div>
      </div>
    </section>
  );
}