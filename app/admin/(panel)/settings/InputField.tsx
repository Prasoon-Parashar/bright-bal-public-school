"use client";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export default function InputField({
  label,
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold uppercase tracking-wide text-slate-700">
        {label}
      </label>

      <input
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full rounded-2xl border border-slate-200
          bg-slate-50 px-5 py-4
          text-[15px] text-slate-800
          placeholder:text-slate-400
          shadow-sm transition-all duration-300
          focus:border-red-600
          focus:bg-white
          focus:ring-4 focus:ring-red-100
          outline-none
        "
      />
    </div>
  );
}