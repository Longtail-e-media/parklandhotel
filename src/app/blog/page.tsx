import type { Metadata } from "next";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("blog", {}, "/blog", {
    title: `Blog | ${site.name}`,
    description:
      "Notes on the wildlife, culture and everyday life of Chitwan — from the Hotel Parkland team on the ground in Sauraha.",
  });
}

export default function BlogPage() {
  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <BlogHeader />
      <BlogGrid />
    </main>
  );
}
