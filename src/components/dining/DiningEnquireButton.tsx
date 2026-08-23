"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import EnquiryModal from "@/components/ui/EnquiryModal";
import EnquiryForm from "@/components/ui/EnquiryForm";

export default function DiningEnquireButton({ venueName }: { venueName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="luxury-btn  mt-10 inline-flex cursor-pointer"
      >
        Enquire Now <ArrowRight className="w-4 h-4" />
      </button>

      <EnquiryModal title={`Enquire — ${venueName}`} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <EnquiryForm />
      </EnquiryModal>
    </>
  );
}
