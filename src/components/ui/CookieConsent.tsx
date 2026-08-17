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
<div className="fixed inset-x-0 bottom-0 z-50 pb-4">
  <div className="w-[80%] mx-auto rounded-md border border-gray-300 bg-white px-5 py-4 shadow-lg">

    <h2 className="mb-1.5 text-lg font-bold text-black sm:text-xl">
      We value your privacy
    </h2>

    <p className="mb-4 text-sm leading-relaxed text-black sm:text-base">
      We use essential cookies to help give you the best possible shopping
      experience. With your consent, we may also use non-essential cookies to
      improve user experience and analyse website traffic. By accepting, you
      agree to our website&apos;s cookie use as described in our{" "}
      <a
        href="/cookies-policy"
        className="font-medium underline hover:text-gray-600"
      >
        Cookies Policy
      </a>
      . You can change your cookie settings at anytime by clicking
      &quot;Reject All&quot;.
    </p>

    <div className="flex justify-center gap-3">
      <button
        type="button"
        onClick={handleReject}
        className="h-11 w-40 rounded-lg border hover:cursor-pointer border-gray-400 bg-white px-4 text-sm font-semibold text-black transition-colors hover:bg-gray-100 sm:w-48 sm:text-base"
      >
        Reject
      </button>

      <button
        type="button"
        onClick={handleAccept}
        className="h-11 w-40 rounded-lg hover:cursor-pointer bg-(--color-primary-green) px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-48 sm:text-base"
      >
        Accept All Cookies
      </button>
    </div>

  </div>
</div>
  );
}
