"use client";

import Script from "next/script";

const RECAPTCHA_SITE_KEY = "6LfmqM8qAAAAAP2rcnIbVUSu0mnVnBqLdFiI2nj9";

export default function Recaptcha() {
  return (
    <>
      <Script src="https://www.google.com/recaptcha/api.js" strategy="lazyOnload" />
      <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} />
    </>
  );
}
