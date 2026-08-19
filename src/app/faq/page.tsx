import type { Metadata } from "next";
import FaqHeader from "@/components/faq/FaqHeader";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `FAQ | ${site.name}`,
  description:
    "Answers to common questions about booking, check-in and check-out, jungle safaris, amenities and transfers at Hotel Parkland in Sauraha, Chitwan National Park.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ | ${site.name}`,
    description:
      "Answers to common questions about booking, check-in and check-out, jungle safaris, amenities and transfers at Hotel Parkland in Sauraha, Chitwan National Park.",
    url: "/faq",
    siteName: site.name,
    type: "website",
  },
};

export default function FaqPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <FaqHeader />
      <FaqAccordion />
    </main>
  );
}
