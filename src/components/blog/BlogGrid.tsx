import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { blogPage } from "@/data/data";
import { formatBlogDate } from "@/lib/blog";

export default async function BlogGrid() {
  const posts = await getBlogPosts();
  const items = posts.length > 0 ? posts : blogPage.posts;

  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-300">
          {items.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group luxury-surface overflow-hidden flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden luxury-img-zoom relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={375}
                  className="w-full h-full object-cover"
                />
                 <p className="flex items-center gap-2 text-sm font-medium mt-5 absolute bottom-1.5 left-1.5 bg-black/60 text-white px-3.5 py-1.5 rounded-2xl z-10">
                  <i className="fa-solid fa-calendar text-sm shrink-0" aria-hidden="true" /> {formatBlogDate(post.date)}
                </p>

              </div>

              <div className="p-7 flex flex-col grow">
                <h3 className="luxury-section-title text-xl leading-snug">{post.title}</h3>
                <p className="text-luxury-muted  mt-4 leading-relaxed grow text-truncate">{post.excerpt}</p>

                <span className="inline-flex items-center gap-2 brown-btn luxury-label text-[11px] mt-5 group-hover:gap-3 transition-all">
                  Read More <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
