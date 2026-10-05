import { createClient } from "@/lib/supabase/server";
import { getSchoolSettings } from "@/lib/supabase/getSchoolSettings";

import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Stats from "@/components/home/Stats";
import PrincipalMessage from "@/components/home/PrincipalMessage";
import Facilities from "@/components/home/Facilities";
import Gallery from "@/components/home/Gallery";
import AdmissionProcess from "@/components/home/AdmissionProcess";
import Testimonials from "@/components/home/Testimonials";
import LatestNews from "@/components/home/LatestNews";
import Contact from "@/components/home/Contact";
import ScrollProgress from "@/components/common/ScrollProgress";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import BackToTop from "@/components/common/BackToTop";

export default async function Home() {
  const supabase = await createClient();

  const [school, galleryResult] = await Promise.all([
    getSchoolSettings(),

    supabase
      .from("gallery")
      .select("id, title, image_url, category")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return (
    <>
      <Hero schoolSettings={school} />

      <About schoolSettings={school} />

      <WhyChooseUs />

      <Stats />

      <PrincipalMessage />

      <Facilities />

      <Gallery images={galleryResult.data ?? []} />

      <AdmissionProcess />

      <Testimonials />

      <LatestNews />

      <Contact />

      <ScrollProgress />

      <WhatsAppButton />

      <BackToTop />
    </>
  );
}