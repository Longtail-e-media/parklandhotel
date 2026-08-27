import { getGalleryPage } from "@/lib/data";
import { galleryPage } from "@/data/data";
import GalleryGridClient from "./GalleryGridClient";

export default async function GalleryGrid() {
  const page = await getGalleryPage();
  const items = page.items.length > 0 ? page.items : galleryPage.items;
  const categories = page.items.length > 0 ? page.categories : galleryPage.categories;

  return <GalleryGridClient items={items} categories={categories} />;
}
