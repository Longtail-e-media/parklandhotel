import type { Metadata } from "next";
import ContactFormSection from "@/components/contact/ContactFormSection";
import ContactInfoSection from "@/components/contact/ContactInfoSection";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact Us | ${site.name}`,
  description:
    "Get in touch with Hotel Parkland in Sauraha, Chitwan National Park — send us a message or reach our Kathmandu and Chitwan offices directly.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact Us | ${site.name}`,
    description:
      "Get in touch with Hotel Parkland in Sauraha, Chitwan National Park — send us a message or reach our Kathmandu and Chitwan offices directly.",
    url: "/contact",
    siteName: site.name,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <ContactFormSection />
      <ContactInfoSection />
    </main>
  );
}
