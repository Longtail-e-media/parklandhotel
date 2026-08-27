import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticles, findArticleBySlug } from "@/lib/data";
import { site } from "@/config/site";

/**
 * Top-level segments already owned by a static route (`src/app/<segment>`).
 * Next.js always prefers a literal route over this catch-all for the same
 * path, so these can never actually reach this file — excluded here only to
 * keep `generateStaticParams` from wasting a build on an unreachable page.
 */
const RESERVED_SLUGS = new Set([
  "about",
  "accommodations",
  "blog",
  "contact",
  "dining-bar",
  "experiences-destination",
  "faq",
  "gallery",
  "meetings-events",
  "offers",
]);

/**
 * Lets the client publish a brand-new page by adding an `article_all` entry
 * in the CMS and linking to `/<slug>` from the menu — no code change needed.
 * Renders the article's CKEditor HTML as-is (see AGENTS notes on `about-us`
 * for how much a client can customise: full Tailwind-classed markup, not
 * just plain rich text).
 */
export async function generateStaticParams() {
  const articles = await getArticles();
  if (!Array.isArray(articles)) return [];
  return articles
    .filter((a: any) => typeof a?.slug === "string" && !RESERVED_SLUGS.has(a.slug))
    .map((a: any) => ({ slug: a.slug as string }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) return {};

  const article = await findArticleBySlug(slug);
  if (!article?.content) return {};

  const title = article.meta_title?.trim() || `${article.title} | ${site.name}`;
  const description = article.meta_description?.trim() || article.subtitle || undefined;

  return {
    title,
    description,
    keywords: article.meta_keywords || undefined,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title,
      description,
      url: `/${slug}`,
      siteName: site.name,
      type: "website",
    },
  };
}

export default async function CmsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (RESERVED_SLUGS.has(slug)) notFound();

  const article = await findArticleBySlug(slug);
  if (!article?.content) notFound();

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <div className="pt-36 lg:pt-44 pb-4">
        <div className="container mx-auto px-6 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-base" aria-hidden="true" /> Back to Home
          </Link>
        </div>
      </div>

      <section className="relative pb-20 lg:pb-28">
        <div
          className="container mx-auto px-6 lg:px-10"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </section>
    </main>
  );
}
