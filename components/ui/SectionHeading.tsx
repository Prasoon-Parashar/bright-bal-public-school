interface SectionHeadingProps {
  title: string;
  subtitle: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: SectionHeadingProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
        {title}
      </h2>

      <p className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
        {subtitle}
      </p>
    </div>
  );
}