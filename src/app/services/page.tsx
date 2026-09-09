import type { Metadata } from "next";
import ServicesHeader from "@/components/service/ServicesHeader";
import ServicesGrid from "@/components/service/ServicesGrid";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("services", {}, "/services", {
    title: `Hotel Facilities & Services | ${site.name}`,
    description:
      "Everyday comforts at Hotel Parkland, Sauraha — airport transfers, high-speed Wi-Fi, a garden pool, fitness centre, spa and more.",
  });
}

export default function ServicesPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <ServicesHeader />
      <ServicesGrid />
    </main>
  );
}
