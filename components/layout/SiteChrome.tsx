import { getSchoolSettings } from "@/lib/supabase/getSchoolSettings";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteChromeClient from "@/components/layout/SiteChromeClient";

export default async function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const school = await getSchoolSettings();

  return (
    <SiteChromeClient>
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

      <main>{children}</main>

      <Footer />
    </SiteChromeClient>
  );
}