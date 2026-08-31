// Data-access layer — the only module that talks to fetchAPI besides api.ts
// itself. Pages/components never import fetchAPI directly; they call the named
// helpers below, which own all endpoint names, response-shape quirks and
// filtering. Changing where data comes from is an api.ts/env concern; changing
// what a page receives is a change here.

import { fetchAPI } from "./api";
import { resolveHeroImages } from "./images";
import type { ActivityItem, AmenityItem, BlogPost, DiningVenue, FaqItem, GalleryItem, Landmark, MeetingSpace, NavItem, NearbyItem, NewsData, OfferItem, RoomType, Testimonial } from "@/types";
import type { SiteMetadata } from "@/types/metadata";
import { business } from "@/config/site";

// ── Site-wide ────────────────────────────────────────────────────────────────

export function getSiteRegulars(): Promise<any | null> {
  return fetchAPI<any>("siteregulars");
}

/** Site-wide CSS for CMS rich-text blocks (until `siteregulars` exposes it). */
export function getCustomCss(): Promise<any | null> {
  return fetchAPI<any>("css");
}

/**
 * The `metadata` endpoint (site/home/pages meta blocks).
 * Falls back to an empty object so all consumers degrade gracefully.
 */
export async function getSiteMetadata(): Promise<SiteMetadata> {
  try {
    const data = await fetchAPI<SiteMetadata>("metadata");
    return data ?? {};
  } catch {
    return {};
  }
}

/** Raw CMS `schema` entries (JSON-LD blocks); [] when unavailable. */
export async function getCmsSchemaEntries<T = any>(): Promise<T[]> {
  try {
    const data = await fetchAPI<T[]>("schema");
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** Splits a comma-separated CMS phone/email field into a clean list. */
export function splitContactList(value?: string | null): string[] {
  return (value ?? "").split(",").map((s) => s.trim()).filter(Boolean);
}

// ── Navigation & social ──────────────────────────────────────────────────────

/** Raw shape of one `menu` entry, as returned by the CMS `api_menu.php`. */
interface CmsMenuItem {
  id: string;
  title: string;
  link: string;
  /** "1" = external URL, otherwise an internal route. */
  linktype?: string | number;
  subLinks?: CmsMenuItem[];
}

interface CmsMenuContainer {
  /** 1 = header nav, 2 = footer quick links, 3 = footer other links. */
  type: string | number;
  items: CmsMenuItem[];
}

function mapMenuItem(item: CmsMenuItem): NavItem {
  return {
    label: item.title,
    href: item.link,
    ...(item.subLinks && item.subLinks.length > 0
      ? { children: item.subLinks.map(mapMenuItem) }
      : {}),
  };
}

/** Menu items for one container: type 1 = header nav, type 2 = footer nav. */
export async function getMenuItems(type: number): Promise<NavItem[]> {
  const menu = (await fetchAPI<CmsMenuContainer[]>("menu")) || [];
  const items = menu.find((item) => Number(item.type) === type)?.items || [];
  return items.map(mapMenuItem);
}

/** Social-link group: type 1 = footer icons, type 2 = partner/OTA logos. */
export async function getSocialGroup(type: number): Promise<any | null> {
  const social = await fetchAPI<any[]>("social");
  return social?.find((item: any) => Number(item.type) === type) ?? null;
}

// ── Packages & categories (rooms / events / restaurant) ─────────────────────
// Parent-category ids live in CATEGORY_IDS (src/config/site.ts).

/** Parent-category record from `package` (banner, description, meta, faq). */
export async function getPackage(id: string): Promise<any | null> {
  const packages = await fetchAPI<any[]>("package");
  return packages?.find((p) => String(p.id) === id) ?? null;
}

/** Raw `subpackage` response — only for consumers that scan every category. */
export function getSubpackages(): Promise<any[] | null> {
  return fetchAPI<any[]>("subpackage");
}

/** Items (rooms/venues/outlets) of one `subpackage` category. */
export async function getCategoryItems(parentId: string): Promise<any[]> {
  const subpackage = await getSubpackages();
  // The CMS returns `{ action: "error", message: "no data found" }` instead
  // of `[]` when a category has no data — guard against the non-array shape.
  if (!Array.isArray(subpackage)) return [];
  const category = subpackage.find(
    (c: any) => String(c.parent_id) === parentId,
  );
  // Same CMS quirk can show up at the item level too — guard against a
  // non-array `items` (e.g. the same error object) rather than crashing
  // downstream `.find`/`.map` calls.
  return Array.isArray(category?.items) ? category.items : [];
}

export async function findCategoryItem(
  parentId: string,
  slug: string,
): Promise<any | null> {
  const items = await getCategoryItems(parentId);
  return items.find((item: any) => item.slug === slug) ?? null;
}

// ── Rooms (`subpackage` parent_id "1") ───────────────────────────────────────

/** Parent-category id for room types in the `subpackage` endpoint. */
const ROOMS_CATEGORY_ID = "1";

/** Raw shape of one `subpackage` room item, as returned by `api_subpackage.php`. */
interface CmsRoomItem {
  slug: string;
  title: string;
  img?: { src: string; title: string }[];
  gallery_images?: { src: string; title: string }[];
  /** Content up to the CMS's "read more" marker — the card blurb. */
  description?: string;
  /** Content after the "read more" marker — shown only on the detail page. */
  content_1?: string | null;
  price?: string;
  /** Free-text floor area, e.g. "5sq.m" — CMS doesn't normalise the unit. */
  rooms_Size?: string | null;
  /** Free-text sleeps count, e.g. "3 people". */
  occupancy?: string | null;
  /** Each amenity is a `tbl_features` record, not a plain string. */
  amenities?: { title: string; icon?: string; img?: string }[];
}

/** Pulls the leading integer out of a free-text occupancy field, e.g. "3 people" -> 3. */
function parseOccupancy(value?: string | null): number {
  const match = value?.match(/\d+/);
  return match ? Number(match[0]) : 2;
}

/**
 * Caps a blurb to roughly N characters on a word boundary, so the room card
 * (fixed to 3 lines) always gets pre-shortened text instead of a CSS clamp
 * hiding whatever the CMS happens to send.
 */
function truncate(text: string, maxLength = 140): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}

/**
 * Room `description` comes out of the CMS's CKEditor field as rich HTML
 * (`<p>`, `<br>`, `&nbsp;`, …), but the UI renders it as plain text — strip
 * the markup, turning `</p>` / `<br>` into line breaks so paragraph splitting
 * below still works.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<\/p\s*>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&mdash;/gi, "—")
    .replace(/&ndash;/gi, "–")
    .replace(/&[lr]squo;/gi, "'")
    .replace(/&[lr]dquo;/gi, '"')
    .replace(/&hellip;/gi, "…")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();
}

/** Maps one CMS `subpackage` room item onto the `RoomType` shape the UI expects. */
function mapRoomItem(item: CmsRoomItem): RoomType {
  const images = resolveHeroImages(item);
  // `description` is the card blurb (content before the CMS's "read more"
  // marker); `content_1` is the rest, shown only on the detail page — combine
  // both for the full paragraph list, but truncate only the card blurb.
  const cardParagraphs = stripHtml(item.description ?? "")
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const fullParagraphs = stripHtml([item.description, item.content_1].filter(Boolean).join("\n\n"))
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    slug: item.slug,
    name: item.title,
    image: images[0] ?? "",
    images,
    description: truncate(cardParagraphs[0] ?? ""),
    longDescription: fullParagraphs.length > 0 ? fullParagraphs : undefined,
    pricePerNight: Number(item.price) || 0,
    size: item.rooms_Size?.trim() || "",
    adults: parseOccupancy(item.occupancy),
    // Not modelled by the CMS yet — no bed-type/rating fields on `subpackage`.
    beds: "",
    rating: Number(business.aggregateRating?.ratingValue) || 0,
    features: Array.isArray(item.amenities)
      ? item.amenities.map((a) => a?.title).filter((title): title is string => Boolean(title))
      : [],
  };
}

/** Room types shown on the homepage/accommodations pages, from `subpackage`. */
export async function getRooms(): Promise<RoomType[]> {
  const items = await getCategoryItems(ROOMS_CATEGORY_ID);
  return items.map(mapRoomItem);
}

/** Rooms category record (banner/title/description) for the listing page, from `package`. */
export function getRoomsPackage(): Promise<any | null> {
  return getPackage(ROOMS_CATEGORY_ID);
}

// ── Dining & Bar (`subpackage` parent_id "2") ────────────────────────────────

const DINING_CATEGORY_ID = "2";

/** Raw shape of one `subpackage` dining/meeting item — same schema is reused across categories. */
interface CmsVenueItem {
  slug: string;
  title: string;
  img?: { src: string; title: string }[];
  gallery_images?: { src: string; title: string }[];
  description?: string;
  content_1?: string | null;
  /** Each amenity is a `tbl_features` record, not a plain string. */
  amenities?: { title: string; icon?: string; img?: string }[];
}

/** Maps one CMS `subpackage` item onto the `DiningVenue` shape the UI expects. */
function mapDiningVenue(item: CmsVenueItem): DiningVenue {
  const images = resolveHeroImages(item);
  const paragraphs = stripHtml([item.description, item.content_1].filter(Boolean).join("\n\n"))
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    slug: item.slug,
    name: item.title,
    // The CMS has no dedicated restaurant/bar field yet — infer it from the slug.
    category: /bar/i.test(item.slug) ? "bar" : "restaurant",
    image: images[0] ?? "",
    images,
    excerpt: truncate(paragraphs[0] ?? "", 160),
    description: paragraphs.length > 0 ? paragraphs : [""],
    // Not modelled by the CMS yet — no opening-hours field on `subpackage`.
    hours: undefined,
    features: Array.isArray(item.amenities)
      ? item.amenities.map((a) => a?.title).filter((title): title is string => Boolean(title))
      : [],
  };
}

/** Dining/bar venues shown on the homepage/dining-bar pages, from `subpackage`. */
export async function getDiningVenues(): Promise<DiningVenue[]> {
  const items = await getCategoryItems(DINING_CATEGORY_ID);
  return items.map(mapDiningVenue);
}

/** Dining & Bar category record (banner/title/description) for the listing page, from `package`. */
export function getDiningPackage(): Promise<any | null> {
  return getPackage(DINING_CATEGORY_ID);
}

// ── Meetings & Events (`subpackage` parent_id "3") ───────────────────────────

const MEETINGS_CATEGORY_ID = "3";

/** Raw shape of one `subpackage` meeting-space item's setup-style pax fields. */
interface CmsMeetingItem extends CmsVenueItem {
  theater?: string | null;
  class_room_style?: string | null;
  u_shape?: string | null;
  round_table?: string | null;
  rooms_Size?: string | null;
  size?: string | null;
}

/** Pulls the leading integer out of a free-text pax field, e.g. "120 pax" -> 120. */
function parsePax(value?: string | null): number | null {
  const match = value?.match(/\d+/);
  return match ? Number(match[0]) : null;
}

/** Maps one CMS `subpackage` item onto the `MeetingSpace` shape the UI expects. */
function mapMeetingSpace(item: CmsMeetingItem): MeetingSpace {
  const images = resolveHeroImages(item);
  const paragraphs = stripHtml([item.description, item.content_1].filter(Boolean).join("\n\n"))
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const setupStyleFields: [string, string | null | undefined][] = [
    ["U-Shape Style", item.u_shape],
    ["Classroom Style", item.class_room_style],
    ["Theatre Style", item.theater],
    ["Round Table", item.round_table],
  ];
  const setupStyles = setupStyleFields
    .map(([style, value]) => ({ style, pax: parsePax(value) }))
    .filter((s): s is { style: string; pax: number } => s.pax !== null);
  const maxPax = setupStyles.reduce((max, s) => Math.max(max, s.pax), 0);

  return {
    slug: item.slug,
    name: item.title,
    image: images[0] ?? "",
    images,
    excerpt: truncate(paragraphs[0] ?? "", 160),
    description: paragraphs.length > 0 ? paragraphs : [""],
    // Not a distinct CMS field — derived from the largest configured setup-style pax count.
    capacity: maxPax > 0 ? `Up to ${maxPax} guests` : undefined,
    size: item.rooms_Size?.trim() || item.size?.trim() || undefined,
    features: Array.isArray(item.amenities)
      ? item.amenities.map((a) => a?.title).filter((title): title is string => Boolean(title))
      : [],
    setupStyles: setupStyles.length > 0 ? setupStyles : undefined,
  };
}

/** Meeting/event spaces shown on the homepage/meetings-events pages, from `subpackage`. */
export async function getMeetingSpaces(): Promise<MeetingSpace[]> {
  const items = await getCategoryItems(MEETINGS_CATEGORY_ID);
  return items.map(mapMeetingSpace);
}

/** Meetings & Events category record (banner/title/description) for the listing page, from `package`. */
export function getMeetingsPackage(): Promise<any | null> {
  return getPackage(MEETINGS_CATEGORY_ID);
}

// ── CMS articles (`article_all`) ─────────────────────────────────────────────

export function getArticles(): Promise<any[] | null> {
  return fetchAPI<any[]>("article_all");
}

export async function findArticleBySlug(slug: string): Promise<any | null> {
  const articles = await getArticles();
  return articles?.find((item: any) => item.slug === slug) ?? null;
}

/**
 * Hero/breadcrumb background for a static page. The `article_all` type-2
 * category holds one item per page slug whose first gallery image is the
 * banner; falls back to the CMS-wide default image from `siteregulars`.
 */
export async function getPageHeroImage(
  pageSlug: string,
): Promise<string | undefined> {
  const [articles, siteRegulars] = await Promise.all([
    getArticles(),
    getSiteRegulars(),
  ]);
  const category = Array.isArray(articles)
    ? articles.find((item: any) => item.type === "2")
    : null;
  const item = category?.items?.find((i: any) => i.slug === pageSlug);
  return item?.gallery_images?.[0]?.src || siteRegulars?.default;
}

// ── Home articles (`homeArticle`) ────────────────────────────────────────────

export function getHomeArticles(): Promise<any | null> {
  return fetchAPI<any>("homeArticle");
}

/** `homeArticle` may arrive as an array or a keyed object — find by CMS id. */
export async function GethomeArticleById(id: number): Promise<any | null> {
  const data = await getHomeArticles();
  const items: any[] = Array.isArray(data) ? data : Object.values(data || {});
  return items.find((item: any) => Number(item?.id) === id) ?? null;
}

// ── Blog (`blog`) ─────────────────────────────────────────────────────────

/**
 * Maps one CMS `blog` item onto the `BlogPost` shape the UI expects. The CMS
 * has no `excerpt`/`category` fields, so the excerpt falls back to a
 * truncated first paragraph and `category` is left unset.
 */
function mapBlogItem(item: NewsData): BlogPost {
  const paragraphs = stripHtml(item.content ?? "")
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    slug: item.slug,
    title: item.title,
    excerpt: item.meta_description?.trim() || truncate(paragraphs[0] ?? "", 160),
    content: paragraphs.length > 0 ? paragraphs : [""],
    image: item.image || item.banner_image || "",
    date: item.date,
    author: item.author || "Hotel Parkland Team",
  };
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const data = await fetchAPI<NewsData[]>("blog");
  return Array.isArray(data) ? data.map(mapBlogItem) : [];
}

/** Robust slug match — tolerates leading slashes and nested CMS slugs. */
export function findBlogPostIndex(posts: BlogPost[], slug: string): number {
  return posts.findIndex((p) => {
    const cleanSlug = p.slug.startsWith("/") ? p.slug.slice(1) : p.slug;
    const targetSlug = slug.startsWith("/") ? slug.slice(1) : slug;
    return cleanSlug === targetSlug || cleanSlug.endsWith(`/${targetSlug}`);
  });
}

// ── Services / facilities ────────────────────────────────────────────────────

/** `services` grouped by category; type 1 = facilities, type 2 = services. */
export function getServices(type?: 1 | 2): Promise<any[] | null> {
  return fetchAPI<any[]>(type ? `services?type=${type}` : "services");
}

// `services` may come back grouped into categories ({ items: [...] }) or as a
// flat list — check both shapes since the CMS doesn't guarantee one or the other.
export async function findServiceBySlug(slug: string): Promise<any | null> {
  const services = await getServices();
  if (!Array.isArray(services)) return null;

  for (const entry of services) {
    if (Array.isArray(entry?.items)) {
      const match = entry.items.find((item: any) => item.slug === slug);
      if (match) return match;
    } else if (entry?.slug === slug) {
      return entry;
    }
  }
  return null;
}

/** Homepage amenity icons, from the `services` type-1 (facilities) group — icon is resolved from `slug` by the UI. */
export async function getAmenities(): Promise<AmenityItem[]> {
  const groups = await getServices(1);
  if (!Array.isArray(groups)) return [];
  const items = groups.flatMap((group: any) => group?.items ?? []);
  return items.map((item: any) => ({ label: item.title, icon: item.slug }));
}

/** Homepage activity tiles, from the `services` type-2 (activities) group — the first item is the featured tile. */
export async function getActivities(): Promise<ActivityItem[]> {
  const groups = await getServices(2);
  if (!Array.isArray(groups)) return [];
  const items = groups.flatMap((group: any) => group?.items ?? []);
  return items.map((item: any, index: number) => ({
    title: item.title,
    subtitle: item.content_0 ? stripHtml(item.content_0) || undefined : undefined,
    image: resolveHeroImages(item)[0] ?? "",
    featured: index === 0,
  }));
}

// ── Simple endpoints ─────────────────────────────────────────────────────────

/** Raw shape of one `testimonial` entry, as returned by `api_testimonial.php`. */
interface CmsTestimonial {
  id: string;
  name: string;
  /** Guest's country — doubles as the card's subtitle line. */
  title: string;
  /** Review platform, e.g. "TripAdvisor" | "Google". */
  via: string;
  linksrc?: string;
  rating?: string | number;
  image?: string;
  content: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchAPI<CmsTestimonial[]>("testimonial");
  if (!Array.isArray(data)) return [];
  return data.map((t) => ({
    quote: t.content,
    author: t.name,
    rating: t.rating !== undefined ? Number(t.rating) : undefined,
    source: t.via || t.title,
  }));
}

export async function getFaqs(): Promise<FaqItem[]> {
  const data = await fetchAPI<FaqItem[]>("faq");
  return Array.isArray(data) ? data : [];
}

/** Images of one gallery group, selected by its CMS `display` label. */
export async function getGalleryImages(display = "Inner Page"): Promise<any[]> {
  const data = await fetchAPI<any>("gallery");
  const group = Array.isArray(data)
    ? data.find((gallery: any) => gallery.display === display)
    : null;
  return group?.items || [];
}

/** Homepage gallery strip images, from the `gallery` group with `display: "Home Page"`. */
export async function getHomeGalleryImages(): Promise<{ src: string; alt: string }[]> {
  const items = await getGalleryImages("Home Page");
  return items.map((item: any) => ({ src: item.image, alt: item.title || "Hotel Parkland" }));
}

/** Raw shape of one `gallery` item, as returned by `api_gallery.php`. */
interface CmsGalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

/** Filter pill for the /gallery page's Isotope grid — `key` matches items' `category`. */
export interface GalleryFilter {
  key: string;
  label: string;
}

export interface GalleryPageData {
  items: GalleryItem[];
  categories: GalleryFilter[];
}

/** Turns free text into a URL/CSS-safe slug ("Fine Dining" -> "fine-dining"). */
function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Turns a free-text CMS category ("Fine Dining") into a CSS-class-safe slug
 * ("fine-dining") — the /gallery grid uses this as both the Isotope filter
 * key and the `cat-{key}` class on each item.
 */
function slugifyCategory(value: string): string {
  return slugify(value) || "other";
}

/**
 * Gallery items + filter pills for the /gallery page. Unlike other endpoints,
 * the CMS doesn't ship a fixed category list — the pills are derived from
 * whatever categories the items themselves actually use, in first-seen order.
 */
export async function getGalleryPage(display = "Inner Page"): Promise<GalleryPageData> {
  const raw = await getGalleryImages(display);
  if (raw.length === 0) return { items: [], categories: [] };

  const labels = new Map<string, string>();
  const items: GalleryItem[] = (raw as CmsGalleryItem[]).map((item) => {
    const key = slugifyCategory(item.category ?? "");
    if (!labels.has(key)) labels.set(key, (item.category ?? "Other").trim());
    return { src: item.image, alt: item.title, category: key };
  });

  const categories: GalleryFilter[] = [
    { key: "all", label: "All" },
    ...Array.from(labels, ([key, label]) => ({ key, label })),
  ];

  return { items, categories };
}

/** Raw shape of one `offers` entry, as returned by the CMS `api_offers.php`. */
interface CmsOffer {
  id: string;
  title: string;
  start_date?: string;
  end_date: string;
  /** Numeric rate in the site's business currency — same convention as `subpackage.price`. */
  rate?: string;
  /** "1" = also show this offer in the homepage promo popup. */
  displayaspopup?: string;
  image: string;
  content?: string;
}

/** Maps one CMS `offers` item onto the `OfferItem` shape the /offers page expects. */
function mapOfferItem(item: CmsOffer): OfferItem {
  const unitPrice = Number(item.rate) || 0;
  const paragraphs = stripHtml(item.content ?? "")
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    slug: slugify(item.title) || item.id,
    name: item.title,
    image: item.image,
    excerpt: truncate(paragraphs[0] ?? "", 160),
    price: unitPrice ? `${business.currency} ${unitPrice.toLocaleString()}` : undefined,
    unitPrice,
    currency: business.currency,
    expiryDate: item.end_date,
  };
}

/** Offers/packages for the /offers listing + detail pages, from `offers`. */
export async function getOffers(): Promise<OfferItem[]> {
  const data = await fetchAPI<CmsOffer[]>("offers");
  return Array.isArray(data) ? data.map(mapOfferItem) : [];
}

export function getVirtualTour<T = any>(): Promise<T | null> {
  return fetchAPI<T>("virtual_tour");
}

export interface DealOfTheDay {
  id?: string;
  title?: string;
  slug?: string;
  dod_date?: string;
  /** "1" = email enquiry, "2" = WhatsApp enquiry. */
  type?: string;
  mail?: string;
  whatsapp?: string;
  image?: string;
}

export function getDealOfTheDay(): Promise<DealOfTheDay | null> {
  return fetchAPI<DealOfTheDay>("dod");
}

/** Raw shape of one `slideshow` group, as returned by the CMS `api_slideshow.php`. */
interface CmsSlideshowItem {
  title: string;
  src: string;
  description?: string;
  buttonLink?: string;
}

interface CmsSlideshowGroup {
  mediaType: string;
  items: CmsSlideshowItem[];
}

export async function getSlideshow(): Promise<CmsSlideshowGroup[]> {
  const data = await fetchAPI<CmsSlideshowGroup[]>("slideshow");
  return Array.isArray(data) ? data : [];
}

/** First `video`-type slideshow src, for the homepage hero background. */
export async function getHeroVideoSrc(): Promise<string | null> {
  const groups = await getSlideshow();
  const videoGroup = groups.find((g) => g.mediaType === "video");
  return videoGroup?.items?.[0]?.src || null;
}

/** Maps a raw `nearby` CMS record onto the `NearbyItem` shape the UI expects. */
function mapLandmark(l: Landmark): NearbyItem {
  return {
    title: l.title,
    distance: l.distance,
    // The CMS has no separate search-query text — `query` only matters as a
    // fallback when `mapUrl` (the CMS's own ready-made embed) is unavailable.
    query: l.title,
    description: l.content,
    mapUrl: l.map_url || undefined,
  };
}

export async function getNearbyLandmarks(): Promise<NearbyItem[]> {
  const data = await fetchAPI<Landmark[]>("nearby");
  return Array.isArray(data) ? data.map(mapLandmark) : [];
}

/** `popup` arrives in several wrapper shapes; normalise to a flat array. */
export async function getPopupItems(): Promise<any[]> {
  try {
    const data = await fetchAPI<any>("popup");
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (data?.items && Array.isArray(data.items)) return data.items;
    if (data && typeof data === "object") return [data];
  } catch (err) {
    console.error("Failed to fetch popup data", err);
  }
  return [];
}

/** One image slot on a CMS `popup` item, as returned by `api_popup.php`. */
interface CmsPopupImage {
  url: string;
  alt?: string;
}

/** Raw shape of one entry inside a `popup` group's `items` array. */
interface CmsPopupItem {
  title?: string;
  /** Popup is only shown while now is within [start_date, end_date]. */
  start_date?: string;
  end_date?: string;
  orientation?: string;
  imglink?: CmsPopupImage[];
  /** External link target, e.g. "www.booking.com" — no protocol, not a site route. */
  link?: string;
  /** Video embed src, present when the parent group's `type` is "video". */
  src?: string;
}

/** One `popup` group — all items in a group share a media `type`. */
interface CmsPopupGroup {
  type?: string;
  orientation?: string;
  items?: CmsPopupItem[];
}

/** A single ready-to-render slide for the homepage promo popup. */
export interface PopupSlide {
  title: string;
  type: "image" | "video";
  orientation: "vertical" | "horizontal" | "square";
  image?: string;
  alt?: string;
  videoSrc?: string;
  /** Resolved href — absolute for bare CMS domains, otherwise an internal path. */
  href?: string;
}

/** Whether a popup item's [start_date, end_date] window covers right now. */
function isPopupActive(item: CmsPopupItem): boolean {
  const now = Date.now();
  if (item.start_date && new Date(item.start_date).getTime() > now) return false;
  if (item.end_date && new Date(item.end_date).getTime() < now) return false;
  return true;
}

/**
 * The CMS stores link targets as a bare domain ("www.booking.com") rather
 * than a full URL, so a naive `/${link}` (as if it were a site route) would
 * produce a broken internal path. Treat anything with a "." and no leading
 * slash as an external host and add the missing protocol.
 */
export function resolveExternalHref(link?: string): string | undefined {
  if (!link) return undefined;
  if (/^https?:\/\//i.test(link)) return link;
  if (link.startsWith("/")) return link;
  if (link.includes(".")) return `https://${link}`;
  return `/${link}`;
}

function mapPopupSlide(item: CmsPopupItem, group: CmsPopupGroup): PopupSlide {
  const isVideo = group.type === "video";
  const orientationRaw = item.orientation || group.orientation;
  const orientation: PopupSlide["orientation"] =
    orientationRaw === "vertical" || orientationRaw === "horizontal" ? orientationRaw : "square";

  return {
    title: item.title || "Promotional offer",
    type: isVideo ? "video" : "image",
    orientation,
    image: !isVideo ? item.imglink?.[0]?.url : undefined,
    alt: item.imglink?.[0]?.alt || item.title,
    videoSrc: isVideo ? item.src : undefined,
    href: resolveExternalHref(item.link),
  };
}

/**
 * Homepage promo popup slides — flattened from every currently-active
 * `popup` group and mapped to the shape the modal renders. Unlike
 * rooms/offers/etc. there's no static fallback: a promo with nothing live
 * to show should show nothing.
 */
export async function getActivePopupSlides(): Promise<PopupSlide[]> {
  const groups = (await getPopupItems()) as CmsPopupGroup[];
  const slides: PopupSlide[] = [];

  for (const group of groups) {
    if (!Array.isArray(group?.items)) continue;
    for (const item of group.items) {
      if (!isPopupActive(item)) continue;
      const slide = mapPopupSlide(item, group);
      if (slide.type === "image" ? slide.image : slide.videoSrc) slides.push(slide);
    }
  }

  return slides;
}
