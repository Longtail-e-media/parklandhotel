"use client";

import { useState } from "react";
import EnquiryModal from "@/components/ui/EnquiryModal";
import MeetingEnquiryForm from "./MeetingEnquiryForm";

export default function MeetingEnquireButton({ spaceName }: { spaceName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="luxury-btn mt-10 inline-flex cursor-pointer bg-(--color-primary-green) text-white"
      >
        Enquire Now <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
      </button>

      <EnquiryModal title={`Hall Enquiry — ${spaceName}`} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MeetingEnquiryForm />
      </EnquiryModal>
    </>
  );
}
