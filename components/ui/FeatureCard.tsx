import { ReactNode } from "react";


interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300 hover:-translate-y-2">

      <div className="text-red-700 text-5xl mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-4 text-gray-600 leading-7">
        {description}
      </p>

    </div>
  );
}