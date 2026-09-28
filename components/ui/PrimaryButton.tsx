import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PrimaryButton({ children }: Props) {
  return (
    <button className="bg-red-700 hover:bg-red-800 hover:scale-105 active:scale-95 text-white px-7 py-3 rounded-xl transition-all duration-300 shadow-lg">
      {children}
    </button>
  );
}