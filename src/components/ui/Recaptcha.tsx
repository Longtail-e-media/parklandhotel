"use client";

import ReCAPTCHA from "react-google-recaptcha";

interface RecaptchaProps {
  onChange: (token: string | null) => void;
}

export default function Recaptcha({ onChange }: RecaptchaProps) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

  return (
    <div className="flex justify-start my-4">
      <ReCAPTCHA sitekey={siteKey} onChange={onChange} />
    </div>
  );
}
