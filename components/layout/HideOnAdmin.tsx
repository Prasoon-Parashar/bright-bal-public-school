"use client";

import { usePathname } from "next/navigation";

/**
 * Wrap anything that should NOT appear in the admin panel
 * (navbar, footer, WhatsApp button, back-to-top, scroll bar...).
 * Works with server components inside it too.
 */
export default function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return <>{children}</>;
}