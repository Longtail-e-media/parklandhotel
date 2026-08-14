import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import "./globals.css";
import { site, contact, address, business, SITE_URL } from "@/config/site";

const playfairDisplay = Playfair_Display({
  variable: "--font-display-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    title: site.title,
    description: site.description,
    url: SITE_URL,
    siteName: site.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

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
    <html lang={site.locale} className={`${playfairDisplay.variable} ${manrope.variable}`}>
      <head>
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
      </body>
    </html>
  );
}
