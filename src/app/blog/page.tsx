import type { Metadata } from "next";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `Blog | ${site.name}`,
  description:
    "Notes on the wildlife, culture and everyday life of Chitwan — from the Hotel Parkland team on the ground in Sauraha.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Blog | ${site.name}`,
    description:
      "Notes on the wildlife, culture and everyday life of Chitwan — from the Hotel Parkland team on the ground in Sauraha.",
    url: "/blog",
    siteName: site.name,
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <BlogHeader />
      <BlogGrid />
    </main>
  );
}
