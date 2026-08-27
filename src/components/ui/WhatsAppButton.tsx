"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export default function WhatsAppButton({ phone }: { phone: string }) {
  const [showWhatsapp, setShowWhatsapp] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowWhatsapp(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!showWhatsapp) return null;

  return (
    <a
      href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-3 z-50 shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center"
    >
      <FontAwesomeIcon icon={faWhatsapp} className="w-8! h-8!" />
    </a>
  );
}
