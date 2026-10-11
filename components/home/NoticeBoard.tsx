import Link from "next/link";
import { ArrowUpRight, CalendarDays, Newspaper, PartyPopper } from "lucide-react";
import AutoScrollList from "./AutoScrollList";
import { createClient } from "@/lib/supabase/server";
import { upcomingEvents, type EventItem } from "@/data/noticeBoard";

type NewsItem = { id: string; title: string; date: string; href?: string };

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type Tone = "blue" | "red" | "amber";

export const tones: Record<Tone, { chip: string; dot: string; head: string; tag: string }> = {
  blue: {
    chip: "bg-blue-50 text-[#1565C0] ring-blue-100",
    dot: "bg-[#1565C0]",
    head: "from-[#101B33] to-[#1565C0]",
    tag: "bg-blue-50 text-[#1565C0]",
  },
  red: {
    chip: "bg-red-50 text-[#C62828] ring-red-100",
    dot: "bg-[#C62828]",
    head: "from-[#101B33] to-[#C62828]",
    tag: "bg-red-50 text-[#C62828]",
  },
  amber: {
    chip: "bg-amber-50 text-amber-600 ring-amber-100",
    dot: "bg-amber-500",
    head: "from-[#101B33] to-amber-600",
    tag: "bg-amber-50 text-amber-700",
  },
};

export const parse = (iso: string) => {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return { y, m, d };
};

export const todayIST = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // YYYY-MM-DD

const daysBetween = (fromIso: string, toIso: string) => {
  const a = parse(fromIso);
  const b = parse(toIso);
  return Math.round((Date.UTC(b.y, b.m - 1, b.d) - Date.UTC(a.y, a.m - 1, a.d)) / 86400000);
};

export const fullDate = (iso: string) => {
  const { y, m, d } = parse(iso);
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

export const weekday = (iso: string) => {
  const { y, m, d } = parse(iso);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { weekday: "long" });
};

export const countdown = (today: string, iso: string) => {
  const n = daysBetween(today, iso);
  if (n === 0) return "Today";
  if (n === 1) return "Tomorrow";
  return `In ${n} days`;
};

/* ------------------------------------------------------------------ */
/* Latest news: your published notices from Supabase                   */
/* ------------------------------------------------------------------ */
/* If your column names are different, add them to these lists. */
const TITLE_KEYS = ["title", "heading", "name", "subject"];
const DATE_KEYS = ["notice_date", "date", "created_at"];
const LINK_KEYS = ["file_url", "pdf_url", "attachment_url", "document_url", "link", "url"];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pick = (row: Record<string, any>, keys: string[]) =>
  keys.map((k) => row[k]).find((v) => typeof v === "string" && v.trim()) as string | undefined;

const toISTDate = (value: string) =>
  value.length > 10
    ? new Date(value).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
    : value;

async function getNews(): Promise<NewsItem[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("notices")
      .select("*")
      .eq("status", "Published")
      .order("created_at", { ascending: false })
      .limit(15);

    return (data ?? [])
      .map((row, i): NewsItem | null => {
        const title = pick(row, TITLE_KEYS);
        const rawDate = pick(row, DATE_KEYS);
        if (!title || !rawDate) return null;
        return {
          id: String(row.id ?? i),
          title,
          date: toISTDate(rawDate),
          href: pick(row, LINK_KEYS) ?? "/notices",
        };
      })
      .filter((n): n is NewsItem => n !== null);
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ */
/* Government holidays (India) via Calendarific                        */
/* ------------------------------------------------------------------ */
type Holiday = { name: string; date: string };

/* Used only if no API key is set or the API is unreachable.
   These are the fixed-date national holidays. */
const fallbackHolidays = (year: number): Holiday[] => [
  { name: "Republic Day", date: `${year}-01-26` },
  { name: "Independence Day", date: `${year}-08-15` },
  { name: "Gandhi Jayanti", date: `${year}-10-02` },
  { name: "Christmas Day", date: `${year}-12-25` },
];

export async function getHolidays(today: string, limit = 12): Promise<Holiday[]> {
  const year = parse(today).y;
  const key = process.env.CALENDARIFIC_API_KEY;
  let list: Holiday[] = [];

  if (key) {
    try {
      const responses = await Promise.all(
        [year, year + 1].map(async (y) => {
          const res = await fetch(
            `https://calendarific.com/api/v2/holidays?api_key=${key}&country=IN&year=${y}&type=national`,
            { next: { revalidate: 60 * 60 * 24 } } // cache 1 day -> very few API calls
          );
          return res.ok ? res.json() : null;
        })
      );

      list = responses.flatMap((r) =>
        (r?.response?.holidays ?? []).map(
          (h: { name: string; date: { iso: string } }) => ({
            name: h.name,
            date: h.date.iso.slice(0, 10),
          })
        )
      );
    } catch {
      list = [];
    }
  }

  if (list.length === 0) list = [...fallbackHolidays(year), ...fallbackHolidays(year + 1)];

  const seen = new Set<string>();
  return list
    .filter((h) => h.date >= today)
    .filter((h) => {
      const k = `${h.date}|${h.name}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* UI pieces                                                           */
/* ------------------------------------------------------------------ */
export function DateChip({ iso, tone }: { iso: string; tone: Tone }) {
  const { y, d, m } = parse(iso);
  return (
    <div
      className={`flex h-16 w-14 shrink-0 flex-col items-center justify-center rounded-2xl ring-1 ${tones[tone].chip}`}
    >
      <span className="text-xl font-black leading-none">{d}</span>
      <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wider">{MONTHS[m - 1]}</span>
      <span className="text-[9px] font-semibold leading-none opacity-70">{y}</span>
    </div>
  );
}

function Row({
  iso,
  tone,
  title,
  meta,
  tag,
  href,
}: {
  iso: string;
  tone: Tone;
  title: string;
  meta: string;
  tag?: string;
  href?: string;
}) {
  const body = (
    <div className="flex items-start gap-3.5 border-b border-slate-100 py-3.5 transition-colors hover:bg-slate-50/80">
      <DateChip iso={iso} tone={tone} />
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[15px] font-bold leading-snug text-[#101B33]">{title}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>{meta}</span>
          {tag && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tones[tone].tag}`}>
              {tag}
            </span>
          )}
        </div>
      </div>
      {href && <ArrowUpRight size={16} className="mt-1 shrink-0 text-slate-300" />}
    </div>
  );

  if (!href) return body;
  return /^https?:\/\//.test(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <Link href={href}>{body}</Link>
  );
}

function Column({
  title,
  icon,
  tone,
  count,
  viewAllHref,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  tone: Tone;
  count: number;
  viewAllHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_20px_50px_-28px_rgba(16,27,51,0.35)]">
      <div className={`flex items-center justify-between bg-gradient-to-r px-5 py-4 text-white ${tones[tone].head}`}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
            {icon}
          </span>
          <h3 className="text-lg font-extrabold">{title}</h3>
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Live
        </span>
      </div>

      {children}

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3 text-xs text-slate-500">
        <span>
          {count} {count === 1 ? "item" : "items"} <span className="text-slate-300">•</span> hover to pause
        </span>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-1 rounded-full bg-[#101B33] px-3.5 py-1.5 text-xs font-bold text-white transition hover:bg-[#1565C0]"
          >
            View All <ArrowUpRight size={13} />
          </Link>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default async function NoticeBoard() {
  const today = todayIST();
  const [holidays, news] = await Promise.all([getHolidays(today), getNews()]);
  const events: EventItem[] = upcomingEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-16 sm:py-20">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-red-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1565C0] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C62828]" />
            Stay Updated
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-[#101B33] sm:text-4xl">
            Notice Board
          </h2>
          <p className="mt-3 text-slate-500">
            News, events and holidays from Bright Bal Public School.
          </p>
        </div>

        {/* Three columns */}
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <Column title="Latest News" icon={<Newspaper size={20} />} tone="blue" count={news.length} viewAllHref="/notices">
            <AutoScrollList emptyText="No news yet.">
              {news.map((n) => (
                <Row key={n.id} iso={n.date} tone="blue" title={n.title} meta={fullDate(n.date)} href={n.href} />
              ))}
            </AutoScrollList>
          </Column>

          <Column title="Upcoming Events" icon={<CalendarDays size={20} />} tone="red" count={events.length} viewAllHref="/events">
            <AutoScrollList emptyText="No upcoming events right now.">
              {events.map((e) => (
                <Row
                  key={e.title + e.date}
                  iso={e.date}
                  tone="red"
                  title={e.title}
                  meta={e.note ? `${e.note} • ${weekday(e.date)}` : weekday(e.date)}
                  tag={countdown(today, e.date)}
                />
              ))}
            </AutoScrollList>
          </Column>

          <Column title="Holidays" icon={<PartyPopper size={20} />} tone="amber" count={holidays.length} viewAllHref="/holidays">
            <AutoScrollList emptyText="No upcoming holidays found.">
              {holidays.map((h) => (
                <Row
                  key={h.name + h.date}
                  iso={h.date}
                  tone="amber"
                  title={h.name}
                  meta={weekday(h.date)}
                  tag={countdown(today, h.date)}
                />
              ))}
            </AutoScrollList>
          </Column>
        </div>
      </div>
    </section>
  );
}