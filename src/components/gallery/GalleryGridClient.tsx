"use client";

import { memo, useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import type Isotope from "isotope-layout";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import type { GalleryFilter } from "@/lib/data";
import type { GalleryItem } from "@/types";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

const LIGHTBOX_PLUGINS = [lgThumbnail, lgZoom];

/**
 * Grid + lightbox markup, split out and memoized. lightgallery/react tears
 * down and reinitializes its whole instance on every render of its parent
 * (its internal effect depends on a freshly-spread props object each time),
 * so without this split, every filter-pill click below would destroy and
 * recreate the lightbox and leave stray `.lg-container` nodes behind. `items`
 * is passed down once from the server component and never changes identity
 * across GalleryGridClient's own re-renders, so this subtree renders once and
 * Isotope handles all filtering imperatively after that.
 */
const GalleryLightboxGrid = memo(function GalleryLightboxGrid({
  gridRef,
  items,
}: {
  gridRef: RefObject<HTMLDivElement | null>;
  items: GalleryItem[];
}) {
  return (
    <LightGallery
      selector=".gallery-link"
      plugins={LIGHTBOX_PLUGINS}
      elementClassNames="contents"
      licenseKey="non-commercial"
      speed={500}
      download={false}
    >
      <div ref={gridRef} className="gallery-grid relative animate-fade-in-up delay-400">
        {items.map((item) => (
          <div
            key={item.src}
            className={`gallery-item cat-${item.category} w-1/2 sm:w-1/3 lg:w-1/4 p-2`}
          >
            <a
              href={item.src}
              data-thumb={item.src}
              data-sub-html={`<p>${item.alt}</p>`}
              className="gallery-link luxury-media  rounded-2xl luxury-img-zoom group relative block aspect-4/3 overflow-hidden cursor-zoom-in"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center bg-luxury-dark/0 group-hover:bg-luxury-dark/25 transition-colors duration-500"
              >
                <i
                  className="fa-solid fa-expand text-2xl text-white opacity-0 scale-75 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100"
                  aria-hidden="true"
                />
              </span>
            </a>
          </div>
        ))}
      </div>
    </LightGallery>
  );
});

/**
 * Isotope filters + imagesLoaded relayout + lightGallery popout, wired the
 * standard way these three are combined: Isotope owns the grid position of
 * `.gallery-item`s, imagesLoaded tells it when to re-measure as photos come
 * in, and lightGallery scans the `.gallery-link` anchors (via an explicit
 * `selector`, since they sit two levels below the container it mounts on)
 * to build the popout. The lightbox cycles through all photos regardless of
 * the active filter — simpler than keeping two libraries' item lists in
 * sync, and a reasonable trade-off for a gallery this size.
 */
export default function GalleryGridClient({
  items,
  categories,
}: {
  items: GalleryItem[];
  categories: GalleryFilter[];
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isoRef = useRef<Isotope | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    let imgLoad: ImagesLoaded.ImagesLoaded | undefined;
    const onProgress = () => isoRef.current?.layout();

    (async () => {
      const [{ default: IsotopeCtor }, { default: imagesLoaded }] = await Promise.all([
        import("isotope-layout"),
        import("imagesloaded"),
      ]);

      if (cancelled || !gridRef.current) return;

      isoRef.current = new IsotopeCtor(gridRef.current, {
        itemSelector: ".gallery-item",
        layoutMode: "fitRows",
        transitionDuration: "0.5s",
      });

      imgLoad = imagesLoaded(gridRef.current);
      imgLoad.on("progress", onProgress);
    })();

    return () => {
      cancelled = true;
      imgLoad?.off("progress", onProgress);
      isoRef.current?.destroy();
      isoRef.current = null;
    };
  }, []);

  const handleFilter = (key: string) => {
    setActiveFilter(key);
    isoRef.current?.arrange({ filter: key === "all" ? "*" : `.cat-${key}` });
  };

  return (
    <section className="relative pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up delay-300">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => handleFilter(cat.key)}
              aria-pressed={activeFilter === cat.key}
              className={`luxury-btn rounded-md hover:cursor-pointer ${
                activeFilter === cat.key ? "bg-(--color-primary-green) text-white" : ""
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <GalleryLightboxGrid gridRef={gridRef} items={items} />
      </div>
    </section>
  );
}
