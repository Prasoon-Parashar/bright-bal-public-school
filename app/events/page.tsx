import type { Metadata } from "next";
import NoticeListPage from "@/components/home/NoticeListPage";
import { countdown, todayIST, weekday } from "@/components/home/NoticeBoard";
import { upcomingEvents } from "@/data/noticeBoard";

export const metadata: Metadata = {
  title: "Upcoming Events | Bright Bal Public School",
};

export default function EventsPage() {
  const today = todayIST();

  const items = upcomingEvents
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => ({
      iso: e.date,
      title: e.title,
      meta: e.note ? `${e.note} • ${weekday(e.date)}` : weekday(e.date),
      tag: countdown(today, e.date),
    }));

  return (
    <NoticeListPage
      title="Upcoming Events"
      subtitle="All the events and activities planned at Bright Bal Public School."
      tone="red"
      items={items}
      emptyText="No upcoming events right now. Please check again soon."
    />
  );
}