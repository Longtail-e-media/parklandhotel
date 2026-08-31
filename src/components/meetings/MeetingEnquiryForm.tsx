"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Recaptcha from "@/components/ui/Recaptcha";
import { nameSchema, emailSchema, phoneSchema, PHONE_ALLOWED_CHARS, PHONE_MAX_LENGTH } from "@/lib/validation";
import { submitEnquiry } from "@/lib/enquiry";


const fields = [
  { name: "name", label: "Full Name", placeholder: "Full Name", type: "text", icon: "user" },
  { name: "email", label: "Email", placeholder: "Email", type: "email", icon: "envelope" },
  { name: "mobile", label: "Mobile No.", placeholder: "Mobile No.", type: "tel", icon: "phone" },
] as const;

const EVENT_SLOTS = [
  { value: "morning", label: "Morning" },
  { value: "afternoon", label: "Afternoon" },
  { value: "evening", label: "Evening" },
  { value: "all-day", label: "All Day" },
] as const;

const meetingEnquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  mobile: phoneSchema,
  eventSlot: z.string().min(1, "Please select an event slot."),
  eventDate: z.string().min(1, "Please select a date."),
  message: z.string(),
});

type MeetingEnquiryFormValues = z.infer<typeof meetingEnquirySchema>;

export default function MeetingEnquiryForm({ spaceName }: { spaceName?: string } = {}) {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);
  const [pax, setPax] = useState(1);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<MeetingEnquiryFormValues>({
    resolver: zodResolver(meetingEnquirySchema),
    defaultValues: { name: "", email: "", mobile: "", eventSlot: "", eventDate: "", message: "" },
  });

  const { onChange: onMobileChange, ...mobileField } = register("mobile");

  const onPaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(Number(e.target.value));
    setPax(Number.isFinite(value) && value >= 1 ? Math.min(value, 10) : 1);
  };

  const onSubmit = async (data: MeetingEnquiryFormValues) => {
    if (!captchaToken) {
      setSubmitError("Please complete the reCAPTCHA.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitEnquiry("enquery_mail_hall.php", {
      full_name: data.name,
      email: data.email,
      phone: data.mobile,
      schedule_slot: data.eventSlot,
      event_date: data.eventDate,
      pax: String(pax),
      special_request: data.message,
      package_name: spaceName || "General Enquiry",
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
          <label htmlFor={`hall-${name}`} className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
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
              id={`hall-${name}`}
              type={type}
              inputMode={name === "mobile" ? "tel" : undefined}
              maxLength={name === "mobile" ? PHONE_MAX_LENGTH : undefined}
              placeholder={placeholder}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `hall-${name}-error` : undefined}
              className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none"
              {...(name === "mobile"
                ? {
                    ...mobileField,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      e.target.value = e.target.value.replace(PHONE_ALLOWED_CHARS, "");
                      onMobileChange(e);
                    },
                  }
                : register(name))}
            />
          </div>
          {errors[name] && (
            <p id={`hall-${name}-error`} className="text-xs text-red-500 mt-2">
              {errors[name]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="hall-date" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
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
              id="hall-date"
              type="date"
              min={today}
              aria-invalid={!!errors.eventDate}
              aria-describedby={errors.eventDate ? "hall-date-error" : undefined}
              className="w-full min-w-0 bg-transparent text-sm text-luxury-charcoal focus:outline-none"
              {...register("eventDate")}
            />
          </div>
          {errors.eventDate && (
            <p id="hall-date-error" className="text-xs text-red-500 mt-2">
              {errors.eventDate.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="hall-pax" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
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
            <input
              id="hall-pax"
              name="pax"
              type="number"
              min={1}
              max={10}
              required
              value={pax}
              onChange={onPaxChange}
              className="w-full min-w-0 text-center bg-transparent text-sm text-luxury-charcoal focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => setPax((p) => Math.min(10, p + 1))}
              disabled={pax >= 10}
              aria-label="Increase pax"
              className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-luxury-charcoal hover:bg-luxury-charcoal/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-plus text-sm" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="hall-eventSlot" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
          Event Slot
          <span className="text-red-500">*</span>
        </label>
        <Controller
          control={control}
          name="eventSlot"
          render={({ field }) => (
            <EventSlotSelect value={field.value} onChange={field.onChange} hasError={!!errors.eventSlot} />
          )}
        />
        {errors.eventSlot && (
          <p id="hall-eventSlot-error" className="text-xs text-red-500 mt-2">
            {errors.eventSlot.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="hall-message" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
          Message
        </label>
        <div className="flex items-start gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
          <i className="fa-solid fa-message text-base text-luxury-muted shrink-0 mt-0.5" aria-hidden="true" />
          <textarea
            id="hall-message"
            rows={3}
            placeholder="Message…"
            className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none resize-none"
            {...register("message")}
          />
        </div>
      </div>

      <Recaptcha onChange={setCaptchaToken} />

      {submitError && <p className="text-xs text-red-500 font-medium">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="luxury-btn luxury-btn-accent !py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : submitted ? "Message Sent" : "Submit"}
      </button>
      {submitted && (
        <p className="text-sm text-luxury-muted text-center">
          Thank you — our events team will be in touch shortly.
        </p>
      )}
    </form>
  );
}

function EventSlotSelect({
  value,
  onChange,
  hasError,
}: {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selected = EVENT_SLOTS.find((slot) => slot.value === value);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id="hall-eventSlot"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-colors cursor-pointer ${
          open ? "border-soft" : hasError ? "border-red-400" : "border-hairline"
        }`}
      >
        <i className="fa-solid fa-clock text-base text-luxury-muted shrink-0" aria-hidden="true" />
        <span className={`flex-1 min-w-0 text-sm ${selected ? "text-luxury-charcoal" : "text-luxury-muted"}`}>
          {selected ? selected.label : "Select slot"}
        </span>
        <i
          aria-hidden="true"
          className={`fa-solid fa-chevron-down text-base text-luxury-muted shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        role="listbox"
        aria-label="Event Slot"
        className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 origin-top rounded-2xl border border-hairline bg-white py-1.5 shadow-xl transition-all duration-150 ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {EVENT_SLOTS.map((slot) => {
          const isSelected = slot.value === value;
          return (
            <button
              key={slot.value}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => {
                onChange(slot.value);
                setOpen(false);
              }}
              className={`flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-3 text-left text-sm transition-colors hover:bg-luxury-charcoal/5 ${
                isSelected ? "text-luxury-charcoal font-medium" : "text-luxury-charcoal/80"
              }`}
            >
              {slot.label}
              {isSelected && <i className="fa-solid fa-check text-base text-gold" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
