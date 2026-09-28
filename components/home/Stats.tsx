import Counter from "../ui/Counter";

export default function Stats() {
  return (
    <section className="-mt-20 relative z-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/30 border border-transparent dark:border-gray-700 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <Counter end={500} suffix="+" />
            <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Students
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/30 border border-transparent dark:border-gray-700 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <Counter end={20} suffix="+" />
            <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Teachers
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/30 border border-transparent dark:border-gray-700 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-4xl font-bold text-red-700 dark:text-red-400 transition-colors duration-300">
              25+
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Years of Excellence
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/30 border border-transparent dark:border-gray-700 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <h2 className="text-4xl font-bold text-red-700 dark:text-red-400 transition-colors duration-300">
              Nursery - VIII
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-300">
              Classes
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}