"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

/**
 * Popup dialog shell for an "Enquire Now" button — supplies the backdrop,
 * header and close behaviour; the caller renders whatever form fits the
 * context (e.g. EnquiryForm for dining, MeetingEnquiryForm for a hall) as
 * children. Follows the same backdrop + dialog pattern as MobileMenu
 * (Escape to close, body scroll locked while open) rather than a
 * third-party dialog library.
 *
 * Portaled to document.body — trigger buttons often sit inside an
 * `animate-slide-in-*` ancestor, and a CSS transform on an ancestor turns it
 * into a containing block for `position: fixed` descendants, which would
 * otherwise confine this "fixed" overlay to that ancestor's box instead of
 * the viewport.
 */
export default function EnquiryModal({
  title,
  isOpen,
  onClose,
  children,
}: {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
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

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6">
      <div onClick={onClose} aria-hidden="true" className="absolute inset-0 bg-luxury-dark/60 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto luxury-scroll bg-white "
      >
        <div className="flex items-center justify-between px-6 sm:px-8 h-18 shrink-0 border-b border-hairline sticky top-0 bg-white/95 backdrop-blur-sm z-10">
          <h2 id="enquiry-modal-title" className="luxury-section-title text-xl text-luxury-charcoal truncate pr-4">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 rounded-full cursor-pointer text-luxury-charcoal hover:bg-luxury-charcoal/5 transition-colors shrink-0"
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-xl" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">{children}</div>
      </div>
    </div>,
    document.body
  );
}
