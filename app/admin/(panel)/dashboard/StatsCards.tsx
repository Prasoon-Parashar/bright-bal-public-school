
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
    supabase.from("enquiries").select("*", { count: "exact", head: true }),
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
    <div className="grid w-full min-w-0 grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:rounded-3xl sm:p-5"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-amber-300" />

            <div className="flex min-w-0 items-start justify-between gap-2 sm:gap-3">
              <div className="min-w-0 flex-1">
                <p className="break-words text-xs font-semibold uppercase tracking-wide text-slate-500 sm:text-sm sm:tracking-wider">
                  {card.title}
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-900 sm:mt-4 sm:text-3xl xl:text-4xl">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white shadow-md sm:h-12 sm:w-12 sm:rounded-2xl`}
              >
                <Icon size={22} />
              </div>
            </div>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 sm:mt-5">
              <div
                className={`${card.color} h-full rounded-full`}
                style={{
                  width: `${
                    Math.min(
                      (card.value / Math.max(card.value, 50)) * 100,
                      100
                    )
                  }%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
