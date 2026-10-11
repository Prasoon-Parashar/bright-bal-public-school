/**
 * EDIT THIS FILE to manage the Upcoming Events column.
 * (Latest News comes from your Supabase "notices" table.)
 * Dates must be written as "YYYY-MM-DD".
 * The entries below are SAMPLES - replace them with your real news and events.
 */

export type EventItem = {
  title: string;
  date: string; // YYYY-MM-DD
  note?: string; // optional small line, e.g. "10:00 AM, School Ground"
};

// Past events are hidden automatically.
export const upcomingEvents: EventItem[] = [
  { title: "Annual Sports Day", date: "2026-11-14", note: "School Ground" },
  { title: "Children's Day Celebration", date: "2026-11-14" },
  { title: "Science Exhibition", date: "2026-11-28", note: "School Hall" },
  { title: "Annual Day Function", date: "2026-12-12" },
];