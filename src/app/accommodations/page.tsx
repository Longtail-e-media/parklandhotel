import type { Metadata } from "next";
import AboutHeader from "@/components/about/AboutHeader";
import AboutIntro from "@/components/about/AboutIntro";
import FacilitiesShowcase from "@/components/about/FacilitiesShowcase";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `About Us | ${site.name}`,
  description:
    "Since 1987, Hotel Parkland has welcomed travellers to Sauraha with mature gardens, traditional hospitality and easy access to Chitwan National Park.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About Us | ${site.name}`,
    description:
      "Since 1987, Hotel Parkland has welcomed travellers to Sauraha with mature gardens, traditional hospitality and easy access to Chitwan National Park.",
    url: "/about",
    siteName: site.name,
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <AboutHeader />
      <AboutIntro />
      <FacilitiesShowcase />
    </main>
  );
}
