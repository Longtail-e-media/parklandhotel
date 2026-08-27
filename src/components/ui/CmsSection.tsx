import type { ReactNode } from "react";
import { findArticleBySlug } from "@/lib/data";

interface CmsSectionProps {
  /** `article_all` slug the client manages via CKEditor. */
  slug: string;
  id?: string;
  /** Wrapper class for the CMS HTML block once an override exists. */
  className?: string;
  /** Static fallback rendered until the client adds this slug in the CMS. */
  children: ReactNode;
}

/**
 * Renders a CMS `article_all` entry (keyed by `slug`) once the client adds
 * one via CKEditor, otherwise renders `children`. Any page can pick up a
 * client-managed override just by supplying a slug — the client isn't
 * limited to a single hardcoded page.
 */
export default async function CmsSection({
  slug,
  id,
  className = "container mx-auto px-6 lg:px-10",
  children,
}: CmsSectionProps) {
  const article = await findArticleBySlug(slug);

  if (article?.content) {
    return (
      <section id={id} className="relative py-20 lg:py-28 scroll-mt-24">
        <div className={className} dangerouslySetInnerHTML={{ __html: article.content }} />
      </section>
    );
  }

  return <>{children}</>;
}
