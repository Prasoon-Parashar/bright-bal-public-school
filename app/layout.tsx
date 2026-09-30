import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import "yet-another-react-lightbox/styles.css";

import ThemeProvider from "@/components/providers/ThemeProvider";
import SiteChrome from "@/components/layout/SiteChrome";
import { createClient } from "@/lib/supabase/server";
import MaintenanceGate from "@/components/layout/MaintenanceGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bright Bal Public School | English Medium School, Agra",
  description:
    "Bright Bal Public School is an English Medium School in Agra providing quality education from Nursery to Class VIII with discipline, values and holistic development.",

  openGraph: {
    title: "Bright Bal Public School",
    description:
      "Admissions Open. English Medium School in Agra from Nursery to Class VIII.",
    images: ["/images/school-building.jpg.jpeg"],
  },

  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};
 

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("school_settings")
    .select("maintenance_mode, maintenance_message")
    .single();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {data?.maintenance_mode ? (
            // Maintenance Screen
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-6">
              <div className="max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">
                <h1 className="text-4xl font-black text-red-700">
                  🚧 Website Under Maintenance
                </h1>

                <p className="mt-5 text-lg text-slate-600">
                  {data.maintenance_message ||
                    "We are updating the website. Please visit again soon."}
                </p>
              </div>
            </div>
          ) : (
            // Normal Website (Navbar + Footer Included)
            <MaintenanceGate>
              <SiteChrome>{children}</SiteChrome>
            </MaintenanceGate>
          )}
          
        </ThemeProvider>

      </body>
    </html>
  );
}