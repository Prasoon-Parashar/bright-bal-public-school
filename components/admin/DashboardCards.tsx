import {
  ImageIcon,
  BellRing,
  MessageSquare,
  GraduationCap,
} from "lucide-react";

export default function DashboardCards({
  galleryCount,
  noticeCount,
  enquiryCount,
}: {
  galleryCount: number;
  noticeCount: number;
  enquiryCount: number;
}) {
  const cards = [
    {
      title: "Gallery Images",
      value: galleryCount,
      icon: ImageIcon,
      color: "from-blue-600 to-cyan-500",
      accent: "bg-blue-500",
      description: "Media uploaded",
    },
    {
      title: "Contact Enquiries",
      value: enquiryCount,
      icon: MessageSquare,
      color: "from-green-600 to-emerald-500",
      accent: "bg-emerald-500",
      description: "Messages received",
    },
    {
      title: "Latest Notices",
      value: noticeCount,
      icon: BellRing,
      color: "from-orange-500 to-yellow-500",
      accent: "bg-orange-500",
      description: "Published updates",
    },
    {
      title: "Admissions",
      value: "OPEN",
      icon: GraduationCap,
      color: "from-red-600 to-pink-500",
      accent: "bg-red-600",
      description: "Admission portal",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-red-100 hover:shadow-[0_24px_48px_-24px_rgba(127,29,29,0.3)]"
          >
            <div className={`absolute inset-x-0 top-0 h-1 ${card.accent}`} />

            <div className="flex items-start justify-between gap-4">
              <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${card.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-105`}
            >
              <Icon size={28} />
              </div>

            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
              Live
            </span>
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">{card.title}</p>

            <h2 className="mt-2 text-4xl font-black tracking-tight text-slate-900">
              {card.value}
            </h2>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm font-medium text-slate-500">{card.description}</span>
              <span className={`h-2 w-2 rounded-full ${card.accent}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}