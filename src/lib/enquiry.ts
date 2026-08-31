// The CMS has no mail-sending library of its own — enquiry forms POST straight
// to plain PHP scripts on the CMS backend (`enquery_mail_contact.php`,
// `enquery_mail_hall.php`, …), the same endpoints the CMS's own admin-built
// frontend uses. Those scripts verify the included Google reCAPTCHA token
// server-side and send the email themselves; there is nothing to configure
// on the Next.js side beyond the recipient's reCAPTCHA site key.

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost/hotelparkland/api/v1/";

// The CMS also serves these PHP endpoints from its root — e.g.
// http://localhost/hotelparkland/enquery_mail_contact.php when the API is
// http://localhost/hotelparkland/api/v1 — derive that root the same way
// next.config.ts derives the CMS images path from NEXT_PUBLIC_API_URL.
const CMS_ROOT = API_BASE_URL.replace(/\/?api\/v1\/?$/, "");

export interface EnquiryResult {
  ok: boolean;
  message?: string;
}

/** Full URL of a CMS root-level PHP script, e.g. "booking_mail.php". */
export function cmsEndpointUrl(endpointFile: string): string {
  return `${CMS_ROOT.replace(/\/$/, "")}/${endpointFile}`;
}

/**
 * Posts an enquiry to one of the CMS's `enquery_mail_*.php` endpoints.
 * `endpointFile` is just the script name, e.g. "enquery_mail_contact.php".
 */
export async function submitEnquiry(
  endpointFile: string,
  data: Record<string, unknown>,
  captchaToken: string,
): Promise<EnquiryResult> {
  try {
    const res = await fetch(cmsEndpointUrl(endpointFile), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, "g-recaptcha-response": captchaToken }),
    });

    if (!res.ok) {
      return { ok: false, message: "Server responded with an error. Please try again later." };
    }

    const json = await res.json().catch(() => null);
    if (json && json.action === "unsuccess") {
      return { ok: false, message: json.message || "Something went wrong. Please try again later." };
    }

    return { ok: true };
  } catch (err) {
    console.warn("[submitEnquiry] failed:", err);
    return { ok: false, message: "Something went wrong. Please try again later." };
  }
}
