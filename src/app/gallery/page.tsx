import type { Metadata } from "next";
import GalleryHeader from "@/components/gallery/GalleryHeader";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Gallery | ${site.name}`,
  description:
    "Browse photos of Hotel Parkland in Sauraha — the property, rooms and suites, dining, wellness and Chitwan wildlife experiences.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: `Gallery | ${site.name}`,
    description:
      "Browse photos of Hotel Parkland in Sauraha — the property, rooms and suites, dining, wellness and Chitwan wildlife experiences.",
    url: "/gallery",
    siteName: site.name,
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <GalleryHeader />
      <GalleryGrid />
    </main>
  );
}
