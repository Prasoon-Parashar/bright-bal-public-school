"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SiteChromeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = pathname.startsWith("/admin");

  // New page successfully loaded
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  // Detect every internal navigation click
  useEffect(() => {
    if (isAdmin) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (!target) return;

      const link = target.closest("a");

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href) return;

      // Ignore external links
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("//")
      ) {
        return;
      }

      // Ignore special links
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        link.target === "_blank"
      ) {
        return;
      }

      // Ignore browser special-click behavior
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const url = new URL(href, window.location.origin);

      // Same page
      if (url.pathname === window.location.pathname) {
        return;
      }

      // Start loading immediately
      setIsLoading(true);
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {children}

      {isLoading && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-md"
          role="status"
          aria-live="polite"
          aria-label="Loading page"
        >
          <div className="flex flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-red-100 border-t-red-600" />

              <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-white shadow-lg">
                <img
                  src="/logo/logo.png.png"
                  alt="Bright Bal Public School"
                  className="h-full w-full object-contain p-1"
                />
              </div>
            </div>

            <p className="mt-5 text-sm font-semibold tracking-wide text-slate-700">
              Loading
              <span className="ml-1 inline-flex">
                <span className="animate-pulse">.</span>
                <span className="animate-pulse [animation-delay:200ms]">
                  .
                </span>
                <span className="animate-pulse [animation-delay:400ms]">
                  .
                </span>
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}