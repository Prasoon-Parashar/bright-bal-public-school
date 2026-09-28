import AdmissionHero from "@/components/home/AdmissionHero";
import AdmissionForm from "@/components/home/AdmissionForm";
import AdmissionBenefits from "@/components/home/AdmissionBenefits";

export default function AdmissionsPage() {
  return (
    <>
      <AdmissionHero />

      <section className="bg-slate-50 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <AdmissionForm />
          </div>

          <AdmissionBenefits />

        </div>
      </section>
    </>
  );
}