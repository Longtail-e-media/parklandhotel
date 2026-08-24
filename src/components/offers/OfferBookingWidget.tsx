import type { OfferItem } from "@/types";
import OfferBookingForm from "./OfferBookingForm";

export default function OfferBookingWidget({ offer, className = "" }: { offer: OfferItem; className?: string }) {
  return (
    <aside className={`luxury-surface p-7 sm:p-8 ${className}`}>
      <h2 className="luxury-section-title md:text-4xl mb-7">Book Offer &amp; Packages</h2>
      <OfferBookingForm offer={offer} />
    </aside>
  );
}
