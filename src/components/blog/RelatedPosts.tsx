import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/types";
import ShareButtons from "@/components/blog/ShareButtons";

interface RelatedPostsProps {
  current: BlogPost;
  posts: BlogPost[];
}

/** Same-category posts first, padded out with the latest others, capped at 3. */
export default function RelatedPosts({ current, posts }: RelatedPostsProps) {
  const others = posts.filter((p) => p.slug !== current.slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  const related = [...sameCategory, ...rest].slice(0, 3);

  return (
    <div className="sticky top-0">
      <div className="mb-10 pb-8 border-b border-hairline">
        <ShareButtons slug={current.slug} title={current.title} />
      </div>

      {related.length > 0 && (
        <>
          <h2 className="luxury-section-title text-luxury-charcoal mb-8 text-2xl">Related Stories</h2>
          <div className="flex flex-col gap-6 ">
            {related.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group luxury-surface  flex gap-4 items-center border-0"
              >
                <div className="aspect-4/3 w-28 shrink-0 overflow-hidden luxury-img-zoom">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={200}
                    height={150}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="py-3 pr-4">
                  {post.category && (
                    <p className="luxury-label text-gold-text text-[10px] mb-1.5">{post.category}</p>
                  )}
                  <h3 className="text-sm font-medium text-luxury-charcoal leading-snug">{post.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
