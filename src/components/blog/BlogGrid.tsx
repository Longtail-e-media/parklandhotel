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
              <div className="aspect-4/3 overflow-hidden luxury-img-zoom relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={375}
                  className="w-full h-full object-cover"
                />
                 <p className="flex items-center gap-2 text-sm font-medium mt-5 absolute bottom-1.5 left-1.5 bg-black/60 text-white px-3.5 py-1.5 rounded-2xl z-10">
                  <Calendar className="w-3.5 h-3.5 shrink-0" aria-hidden /> {formatBlogDate(post.date)}
                </p>

              </div>

              <div className="p-7 flex flex-col grow">
                <h3 className="luxury-section-title text-xl leading-snug">{post.title}</h3>
                {/* <p className="text-luxury-muted  mt-4 leading-relaxed grow">{post.excerpt}</p> */}
                <p className="text-luxury-muted  mt-4 leading-relaxed grow text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus cum iste exercitationem? Eius veritatis ducimus quisquam error velit quibusdam, vel harum odio debitis temporibus omnis mollitia magni provident asperiores dignissimos ullam magnam vero adipisci id rerum ad! Et repudiandae totam tempora, voluptate eveniet quisquam quos debitis perferendis nihil tenetur voluptas!</p>

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
