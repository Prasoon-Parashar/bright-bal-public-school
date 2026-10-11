import type { Metadata } from "next";
import NoticeListPage from "@/components/home/NoticeListPage";
import { countdown, getHolidays, todayIST, weekday } from "@/components/home/NoticeBoard";

export const metadata: Metadata = {
  title: "Holidays | Bright Bal Public School",
};

export default async function HolidaysPage() {
  const today = todayIST();
  const holidays = await getHolidays(today, 60);

  const items = holidays.map((h) => ({
    iso: h.date,
    title: h.name,
    meta: weekday(h.date),
    tag: countdown(today, h.date),
  }));

  return (
    <NoticeListPage
      title="Holidays"
      subtitle="Upcoming government holidays. Please also watch the notice board for any school-specific closures."
      tone="amber"
      items={items}
      emptyText="No upcoming holidays found."
    />
  );
}