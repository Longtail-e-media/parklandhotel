import Image from "next/image";
import Link from "next/link";
import { blogPage } from "@/data/data";
import type { BlogPost } from "@/types";

interface RelatedPostsProps {
  current: BlogPost;
}

/** Same-category posts first, padded out with the latest others, capped at 3. */
export default function RelatedPosts({ current }: RelatedPostsProps) {
  const others = blogPage.posts.filter((p) => p.slug !== current.slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  const related = [...sameCategory, ...rest].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <h2 className="luxury-section-title text-luxury-charcoal mb-10">Related Stories</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {related.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group luxury-surface overflow-hidden block"
            >
              <div className="aspect-4/3 overflow-hidden luxury-img-zoom">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="luxury-label text-gold-text text-[10px] mb-2">{post.category}</p>
                <h3 className="text-base font-medium text-luxury-charcoal leading-snug">{post.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
