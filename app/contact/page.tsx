import ContactHero from "@/components/home/ContactHero";
import ContactForm from "@/components/home/ContactForm";
import ContactInfo from "@/components/home/ContactInfo";
import GoogleMap from "@/components/home/GoogleMap";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>

          <ContactInfo />
        </div>
      </section>

      <GoogleMap />
    </>
  );
}