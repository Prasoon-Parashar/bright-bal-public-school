import ContactHero from "@/components/home/ContactHero";
import ContactForm from "@/components/home/ContactForm";
import ContactInfo from "@/components/home/ContactInfo";
import GoogleMap from "@/components/home/GoogleMap";
import SectionDivider from "@/components/home/SectionDivider";
import EducationIllustration from "@/components/home/EducationIllustration";

export default function ContactPage() {
  return (
    <main>
      {/* Contact hero */}
      <ContactHero />

      {/* Contact form, illustration and information */}
      <section className="bg-slate-50 py-8 sm:py-10 lg:py-12">
        <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:gap-10">
          {/* Left column */}
          <div className="min-w-0 space-y-8 lg:col-span-2">
            <ContactForm />

            {/* Decorative panel fills the area below the form */}
            <EducationIllustration />
          </div>

          {/* Right column */}
          <div className="min-w-0">
            <ContactInfo />
          </div>
        </div>
      </section>

      {/* Existing divider */}
      <SectionDivider />

      {/* Existing Google Map */}
      <GoogleMap />
    </main>
  );
}