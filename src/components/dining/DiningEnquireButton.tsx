"use client";

import { useState } from "react";
import EnquiryModal from "@/components/ui/EnquiryModal";
import EnquiryForm from "@/components/ui/EnquiryForm";

export default function DiningEnquireButton({ venueName }: { venueName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="luxury-btn  mt-10 inline-flex cursor-pointer bg-(--color-primary-green) text-white"
      >
        Enquire Now <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
      </button>

      <EnquiryModal title={`Enquire — ${venueName}`} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <EnquiryForm subject={venueName} />
      </EnquiryModal>
    </>
  );
}
