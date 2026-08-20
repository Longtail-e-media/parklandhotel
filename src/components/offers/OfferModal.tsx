"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Mail, MessageSquare, Phone, User, X } from "lucide-react";
import type { OfferItem } from "@/types";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Full Name", type: "text", Icon: User },
  { name: "email", label: "Email Address", placeholder: "Email Address", type: "email", Icon: Mail },
  { name: "phone", label: "Phone Number", placeholder: "Phone Number", type: "tel", Icon: Phone },
] as const;

/**
 * Popup reservation form for an offer, opened from OffersGrid. Follows the
 * same backdrop + dialog pattern as MobileMenu (Escape to close, body scroll
 * locked while open) rather than a third-party dialog library.
 */
export default function OfferModal({ offer, onClose }: { offer: OfferItem | null; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const isOpen = offer !== null;

  // Reset for the next offer once this one closes. Adjusted synchronously during
  // render (React's documented pattern for state that depends on a prop change)
  // instead of in an Effect, which would setState after commit and cause an
  // extra render with the previous offer's stale submitted/notRobot values.
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen);
    if (!isOpen) {
      setSubmitted(false);
      setNotRobot(false);
    }
  }

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!offer) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-luxury-dark/60 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-modal-title"
        className="relative w-full max-w-4xl max-h-[90vh]luxury-scroll bg-white "
      >
        <div className="flex items-center justify-between px-6 sm:px-8 h-18 shrink-0 border-b border-hairline sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <h2 id="offer-modal-title" className="luxury-section-title text-xl text-luxury-charcoal truncate pr-4">
            {offer.name}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-full cursor-pointer text-luxury-charcoal hover:bg-luxury-charcoal/5 transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-8">
          <div className="relative luxury-media aspect-4/5 sm:aspect-auto sm:h-full min-h-70">
            <Image src={offer.image} alt={offer.name} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
          </div>

          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (!notRobot) return;
              setSubmitted(true);
            }}
          >
            {fields.map(({ name, label, placeholder, type, Icon }) => (
              <div key={name}>
                <label htmlFor={`offer-${name}`} className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
                  {label}
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
                  <Icon className="w-4 h-4 text-luxury-muted shrink-0" aria-hidden />
                  <input
                    id={`offer-${name}`}
                    name={name}
                    type={type}
                    required
                    placeholder={placeholder}
                    className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none"
                  />
                </div>
              </div>
            ))}

            <div>
              <label htmlFor="offer-request" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
                Special Request
              </label>
              <div className="flex items-start gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
                <MessageSquare className="w-4 h-4 text-luxury-muted shrink-0 mt-0.5" aria-hidden />
                <textarea
                  id="offer-request"
                  name="request"
                  rows={3}
                  placeholder="Special request…"
                  className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none resize-none"
                />
              </div>
            </div>

              {/*  */}

            <button type="submit" className="luxury-btn luxury-btn-accent  !py-4">
              {submitted ? "Message Sent" : "Send Message"}
            </button>
            {submitted && (
              <p className="text-sm text-luxury-muted text-center">
                Thank you — our reservations team will be in touch shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
