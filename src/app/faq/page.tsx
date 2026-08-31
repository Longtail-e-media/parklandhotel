import type { Metadata } from "next";
import FaqHeader from "@/components/faq/FaqHeader";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("faq", {}, "/faq", {
    title: `FAQ | ${site.name}`,
    description:
      "Answers to common questions about booking, check-in and check-out, jungle safaris, amenities and transfers at Hotel Parkland in Sauraha, Chitwan National Park.",
  });
}

export default function FaqPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <FaqHeader />
      <FaqAccordion />
    </main>
  );
}
