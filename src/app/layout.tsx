import type { Metadata } from "next";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CookieConsent from "@/components/ui/CookieConsent";
config.autoAddCss = false;
import "./globals.css";
import { site, contact, address, business, SITE_URL } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata("home", { openGraph: { locale: "en_US" } }, "/");
}

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": business.starRating >= 5 ? "Resort" : "LodgingBusiness",
    name: site.name,
    description: site.description,
    url: SITE_URL,
    telephone: contact.phoneE164,
    email: contact.email,
    priceRange: business.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.locality,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: address.geo.latitude,
      longitude: address.geo.longitude,
    },
    amenityFeature: business.amenities.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
    })),
    ...(business.aggregateRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: business.aggregateRating.ratingValue,
        reviewCount: business.aggregateRating.reviewCount,
        bestRating: business.aggregateRating.bestRating,
        worstRating: business.aggregateRating.worstRating,
      },
    }),
    sameAs: [] as string[],
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.locale} className={`${cormorantGaramond.variable} ${workSans.variable}`}>
      <head>
        {/* CMS rich-text (CKEditor) content can't embed Lucide's React icons,
            so authors mark icons up as plain `<i class="fa-solid fa-...">`
            tags — loading the Font Awesome 7 web-font kit from cdnjs (no
            self-hosted icon assets) is what turns those into glyphs. */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.1/css/all.min.css"
          integrity="sha512-QeR2VH+lsBE5LSAe1Q5EnTBbe7XTBubt8dG93Y7gidSgdMCr8nVqKcfKAMyN96SV8KDbZVTDXChatu5G2KQGzg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-999 focus:px-4 focus:py-2 focus:bg-gold focus:text-white focus:rounded focus:text-sm"
        >
          Skip to main content
        </a>
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
