"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqPage } from "@/data/data";
import Watermark from "@/components/ui/Watermark";

/**
 * Single-open accordion. Uses the same 0fr/1fr grid-rows trick as
 * MobileMenu's submenu (see components/ui/MobileMenu.tsx) to animate to the
 * answer's natural height, since a plain `height: auto` can't transition.
 */
export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden pb-24 lg:pb-32">
      <Watermark
        motif="leaf"
        className="w-32 lg:w-48 -right-10 top-10 text-gold/7"
        rotate={10}
        duration={17}
      />
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col gap-4 animate-fade-in-up delay-300">
          {faqPage.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;

            return (
              <div key={item.question} className="luxury-surface px-6 lg:px-8">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer"
                >
                  <span className="font-medium text-luxury-charcoal">{item.question}</span>
                  <Plus
                    className={`w-5 h-5 shrink-0 text-luxury-charcoal transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <div
                  id={panelId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <p className={`overflow-hidden text-luxury-muted leading-relaxed  ${isOpen && "pb-6"}`}>
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
