"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      requestAnimationFrame(() => setShow(true));
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="max-w-xl mx-auto bg-white border border-hairline rounded-xl shadow-lg px-5 py-4 flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm leading-snug flex-1 text-center sm:text-left">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <div className="flex gap-2.5 shrink-0">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-(--color-primary-green) hover:cursor-pointer text-white text-sm font-medium rounded-lg transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 border border-hairline hover:cursor-pointer text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
