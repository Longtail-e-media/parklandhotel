import type { Metadata } from "next";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("contact", {}, "/contact", {
    title: `Contact Us | ${site.name}`,
    description:
      "Get in touch with Hotel Parkland in Sauraha, Chitwan National Park — send us a message or reach our Kathmandu and Chitwan offices directly.",
  });
}

export default function ContactPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <ContactFormSection />
      <ContactInfoSection />
    </main>
  );
}
