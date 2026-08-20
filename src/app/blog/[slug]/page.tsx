import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { blogPage } from "@/data/data";
import { site } from "@/config/site";
import { formatBlogDate } from "@/lib/blog";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedPosts from "@/components/blog/RelatedPosts";

export function generateStaticParams() {
  return blogPage.posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPage.posts.find((p) => p.slug === slug);
  if (!post) return {};

  const title = `${post.title} | Blog | ${site.name}`;
  return {
    title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      siteName: site.name,
      type: "article",
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPage.posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main id="main-content" className="flex flex-col min-h-screen">
      <article className="pt-36 lg:pt-44 pb-16 lg:pb-24">
        <div className="container mx-auto px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-luxury-muted hover:text-luxury-charcoal transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" /> All Stories
          </Link>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="min-w-0 lg:col-span-8">
              <p className="luxury-label text-gold-text mb-5">{post.category}</p>
              <h1 className="luxury-hero-title text-luxury-charcoal text-3xl lg:text-4xl">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-luxury-muted mt-6">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 brown-btn" strokeWidth={1.5} aria-hidden />
                  {formatBlogDate(post.date)}
                </span>
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 brown-btn" strokeWidth={1.5} aria-hidden />
                  {post.author}
                </span>
              </div>

              <div className="aspect-16/9 luxury-media mt-10 rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              <div className="mt-10 space-y-5 text-luxury-muted leading-relaxed">
                {post.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-hairline">
                <ShareButtons slug={post.slug} title={post.title} />
              </div>
            </div>

            <div className="lg:col-span-4 lg:sticky top-25">
              <RelatedPosts current={post} />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
