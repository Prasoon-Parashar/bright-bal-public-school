import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DateChip, parse, tones, type Tone } from "./NoticeBoard";

export type ListItem = {
  iso: string; // YYYY-MM-DD
  title: string;
  meta: string;
  tag?: string;
};

const FULL_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

type Props = {
  title: string;
  subtitle: string;
  tone: Tone;
  items: ListItem[];
  emptyText: string;
};

/** Full-page list, grouped month by month. */
export default function NoticeListPage({ title, subtitle, tone, items, emptyText }: Props) {
  const groups = items.reduce<Record<string, ListItem[]>>((acc, item) => {
    const key = item.iso.slice(0, 7); // YYYY-MM
    (acc[key] ||= []).push(item);
    return acc;
  }, {});

  return (
    <main className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white pb-20 pt-32 sm:pt-36">
      <div className="pointer-events-none absolute -left-24 top-24 h-64 w-64 rounded-full bg-red-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-96 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-[#C62828]"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1565C0] shadow-sm">
            <span className={`h-1.5 w-1.5 rounded-full ${tones[tone].dot}`} />
            Bright Bal Public School
          </span>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-[#101B33] sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">{subtitle}</p>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
            {emptyText}
          </div>
        ) : (
          <div className="mt-12 space-y-10">
            {Object.entries(groups).map(([key, list]) => {
              const { y, m } = parse(`${key}-01`);
              return (
                <section key={key}>
                  <div className="mb-4 flex items-center gap-3">
                    <h2 className="text-lg font-extrabold text-[#101B33]">
                      {FULL_MONTHS[m - 1]} {y}
                    </h2>
                    <span className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-semibold text-slate-400">
                      {list.length} {list.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {list.map((item) => (
                      <div
                        key={item.iso + item.title}
                        className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <DateChip iso={item.iso} tone={tone} />
                        <div className="min-w-0 flex-1">
                          <p className="text-base font-bold leading-snug text-[#101B33]">
                            {item.title}
                          </p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                            <span>{item.meta}</span>
                            {item.tag && (
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tones[tone].tag}`}
                              >
                                {item.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}