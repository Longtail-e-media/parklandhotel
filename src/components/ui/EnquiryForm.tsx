"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Recaptcha from "@/components/ui/Recaptcha";
import { nameSchema, emailSchema, phoneSchema, PHONE_ALLOWED_CHARS, PHONE_MAX_LENGTH, eventSchema } from "@/lib/validation";
import { submitEnquiry } from "@/lib/enquiry";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Full Name", type: "text", icon: "user" },
  { name: "email", label: "Email Address", placeholder: "Email Address", type: "email", icon: "envelope" },
  { name: "event", label: "Event Name", placeholder: "Enter your event name", type: "text", icon: "calendar" },
  { name: "phone", label: "Phone Number", placeholder: "Phone Number", type: "tel", icon: "phone" },
] as const;

const enquirySchema = z.object({
  name: nameSchema,
  event: eventSchema,
  email: emailSchema,
  phone: phoneSchema,
  eventDate: z.string().min(1, "Please select a date."),
  request: z.string(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

/**
 * Shared name / email / phone / special-request enquiry form. Used standalone
 * (e.g. the offer detail page's booking widget) and inside EnquiryModal for
 * "Enquire Now" popups elsewhere on the site. `subject` names what the
 * enquiry is about (e.g. a dining venue) for the emailed message.
 */
export default function EnquiryForm({
  submitLabel = "Send Message",
  subject,
}: {
  submitLabel?: string;
  subject?: string;
}) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [pax, setPax] = useState(1);
  const today = new Date().toISOString().slice(0, 10);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", phone: "", event: "", eventDate: "", request: "" },
  });

  const { onChange: onPhoneChange, ...phoneField } = register("phone");

  const onPaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(Number(e.target.value));
    setPax(Number.isFinite(value) && value >= 1 ? value : 1);
  };

  const onSubmit = async (data: EnquiryFormValues) => {
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const message = [
      subject ? `Enquiry about: ${subject}` : null,
      `Event: ${data.event}`,
      `Date: ${data.eventDate}`,
      `Pax: ${pax}`,
      data.request,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await submitEnquiry("enquery_mail_contact.php", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      message,
    }, captchaToken);

    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.message ?? "Something went wrong. Please try again later.");
      return;
    }

    setSubmitted(true);
    reset();
    setPax(1);
    setCaptchaToken(null);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map(({ name, label, placeholder, type, icon }) => (
        <div key={name}>
          <label htmlFor={`enquiry-${name}`} className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            {label}
            <span className="text-red-500">*</span>
          </label>
          <div
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 focus-within:border-soft transition-colors ${
              errors[name] ? "border-red-400" : "border-hairline"
            }`}
          >
            <i className={`fa-solid fa-${icon} text-base text-luxury-muted shrink-0`} aria-hidden="true" />
            <input
              id={`enquiry-${name}`}
              type={type}
              inputMode={name === "phone" ? "tel" : undefined}
              maxLength={name === "phone" ? PHONE_MAX_LENGTH : undefined}
              placeholder={placeholder}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `enquiry-${name}-error` : undefined}
              className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none"
              {...(name === "phone"
                ? {
                    ...phoneField,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.replace(PHONE_ALLOWED_CHARS, "");
                      onPhoneChange(e);
                    },
                  }
                : register(name))}
            />
          </div>
          {errors[name] && (
            <p id={`enquiry-${name}-error`} className="text-xs text-red-500 mt-2">
              {errors[name]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-date" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            Date
              <span className="text-red-500">*</span>
          </label>
          <div
            className={`flex items-center gap-2 rounded-2xl border px-4 py-4 focus-within:border-soft transition-colors ${
              errors.eventDate ? "border-red-400" : "border-hairline"
            }`}
          >
            <i className="fa-solid fa-calendar text-base text-luxury-muted shrink-0" aria-hidden="true" />
            <input
              id="enquiry-date"
              type="date"
              min={today}
              aria-invalid={!!errors.eventDate}
              aria-describedby={errors.eventDate ? "enquiry-date-error" : undefined}
              className="w-full min-w-0 bg-transparent text-sm text-luxury-charcoal focus:outline-none"
              {...register("eventDate")}
            />
          </div>
          {errors.eventDate && (
            <p id="enquiry-date-error" className="text-xs text-red-500 mt-2">
              {errors.eventDate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="enquiry-pax" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            Pax
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-1 rounded-2xl border border-hairline pl-1.5 pr-1.5 py-1.5 focus-within:border-soft transition-colors">
            <button
              type="button"
              onClick={() => setPax((p) => Math.max(1, p - 1))}
              disabled={pax <= 1}
              aria-label="Decrease pax"
              className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-luxury-charcoal hover:bg-luxury-charcoal/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-minus text-sm" aria-hidden="true" />
            </button>
            <i className="fa-solid fa-users text-base text-luxury-muted shrink-0" aria-hidden="true" />
            <input
              id="enquiry-pax"
              name="pax"
              type="number"
              min={1}
              required
              value={pax}
              onChange={onPaxChange}
              className="w-full min-w-0 text-center bg-transparent text-sm text-luxury-charcoal focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setPax((p) => p + 1)}
              aria-label="Increase pax"
              className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-luxury-charcoal hover:bg-luxury-charcoal/5 transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-plus text-sm" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-request" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
          Special Request
        </label>
        <div className="flex items-start gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
          <i className="fa-solid fa-message text-base text-luxury-muted shrink-0 mt-0.5" aria-hidden="true" />
          <textarea
            id="enquiry-request"
            rows={3}
            placeholder="Special request…"
            className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none resize-none"
            {...register("request")}
          />
        </div>
      </div>

      <Recaptcha onChange={setCaptchaToken} />

      {submitError && <p className="text-sm text-red-500 font-medium">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="luxury-btn luxury-btn-accent !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : submitted ? "Message Sent" : submitLabel}
      </button>
      {submitted && (
        <p className="text-sm text-luxury-muted text-center">
          Thank you — our reservations team will be in touch shortly.
        </p>
      )}
    </form>
  );
}
