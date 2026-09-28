import { createClient } from "@/lib/supabase/server";
import {
  GraduationCap,
  ImageIcon,
  BellRing,
  MessageSquare,
} from "lucide-react";

export default async function StatsCards() {
  const supabase = await createClient();

  const [
    { count: admissions },
    { count: gallery },
    { count: notices },
    { count: enquiries },
  ] = await Promise.all([
    supabase.from("admissions").select("*", { count: "exact", head: true }),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
    supabase.from("notices").select("*", { count: "exact", head: true }),
    supabase.from("contact_messages").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      title: "Admissions",
      value: admissions ?? 0,
      icon: GraduationCap,
      color: "bg-red-600",
    },
    {
      title: "Gallery Images",
      value: gallery ?? 0,
      icon: ImageIcon,
      color: "bg-blue-600",
    },
    {
      title: "Notices",
      value: notices ?? 0,
      icon: BellRing,
      color: "bg-orange-500",
    },
    {
      title: "Enquiries",
      value: enquiries ?? 0,
      icon: MessageSquare,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.28)]"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-amber-300" />

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                {card.title}
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                {card.value}
              </h2>
            </div>

            <div className={`${card.color} flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg`}>
              <card.icon size={26} />
            </div>
          </div>

          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`${card.color} h-full rounded-full`}
              style={{ width: `${Math.min((card.value / Math.max(card.value, 50)) * 100, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}