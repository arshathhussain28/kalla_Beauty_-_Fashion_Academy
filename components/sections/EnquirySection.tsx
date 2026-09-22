import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";

// Page hierarchy §16, item 8: "Enquiry — the form."
export function EnquirySection() {
  return (
    <section className="bg-white px-6 py-16 lg:px-12 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeading
          eyebrow="Admissions"
          title="Find Your Course"
          description="Tell us what you're interested in and a course advisor will follow up with duration, fees and the admissions steps."
        />
        <LeadForm />
      </div>
    </section>
  );
}
