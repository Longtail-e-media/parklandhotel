import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { blogPage } from "@/data/data";
import { formatBlogDate } from "@/lib/blog";

export default function BlogGrid() {
  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-300">
          {blogPage.posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group luxury-surface overflow-hidden flex flex-col"
            >
              <div className="aspect-4/3 overflow-hidden luxury-img-zoom">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={375}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-7 flex flex-col grow">
                <p className="luxury-label text-gold-text text-[10px] mb-3">{post.category}</p>
                <h3 className="luxury-section-title text-xl leading-snug">{post.title}</h3>
                <p className="text-luxury-muted text-sm mt-4 leading-relaxed grow">{post.excerpt}</p>
                <p className="flex items-center gap-2 text-xs text-luxury-muted mt-5">
                  <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden /> {formatBlogDate(post.date)}
                </p>
                <span className="inline-flex items-center gap-2 brown-btn luxury-label text-[11px] mt-5 group-hover:gap-3 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
