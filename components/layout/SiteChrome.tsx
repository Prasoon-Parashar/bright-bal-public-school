import { getSchoolSettings } from "@/lib/supabase/getSchoolSettings";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteChromeClient from "@/components/layout/SiteChromeClient";
import HideOnAdmin from "@/components/layout/HideOnAdmin";

export default async function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const school = await getSchoolSettings();

  return (
    <SiteChromeClient>
      {/* Navbar and Footer are hidden automatically on /admin pages */}
      <HideOnAdmin>
        <Navbar
          schoolSettings={
            school
              ? {
                  school_name: school.school_name,
                  tagline: school.tagline,
                  admission_open: school.admission_open,
                  logo_url: school.logo_url,
                }
              : undefined
          }
        />
      </HideOnAdmin>

      <main>{children}</main>

      <HideOnAdmin>
        <Footer />
      </HideOnAdmin>
    </SiteChromeClient>
  );
}