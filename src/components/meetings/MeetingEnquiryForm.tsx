"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Mail, MessageSquare, Phone,  User, Users } from "lucide-react";
import Recaptcha from "@/components/ui/Recaptcha";
import { nameSchema, emailSchema, phoneSchema, PHONE_ALLOWED_CHARS, PHONE_MAX_LENGTH } from "@/lib/validation";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Full Name", type: "text", Icon: User },
  { name: "email", label: "Email", placeholder: "Email", type: "email", Icon: Mail },
  { name: "mobile", label: "Mobile No.", placeholder: "Mobile No.", type: "tel", Icon: Phone },
] as const;

const meetingEnquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  mobile: phoneSchema,
  message: z.string(),
});

type MeetingEnquiryFormValues = z.infer<typeof meetingEnquirySchema>;

export default function MeetingEnquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MeetingEnquiryFormValues>({
    resolver: zodResolver(meetingEnquirySchema),
    defaultValues: { name: "", email: "", mobile: "", message: "" },
  });

  const { onChange: onMobileChange, ...mobileField } = register("mobile");

  return (
    <form className="space-y-5" onSubmit={handleSubmit(() => setSubmitted(true))} noValidate>
      {fields.map(({ name, label, placeholder, type, Icon }) => (
        <div key={name}>
          <label htmlFor={`hall-${name}`} className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            {label}
          </label>
          <div
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 focus-within:border-soft transition-colors ${
              errors[name] ? "border-red-400" : "border-hairline"
            }`}
          >
            <Icon className="w-4 h-4 text-luxury-muted shrink-0" aria-hidden />
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
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-hairline px-4 py-4 focus-within:border-soft transition-colors">
            <Calendar className="w-4 h-4 text-luxury-muted shrink-0" aria-hidden />
            <input
              id="hall-date"
              name="date"
              type="date"
              required
              min={today}
              className="w-full min-w-0 bg-transparent text-sm text-luxury-charcoal focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="hall-pax" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            Pax
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-hairline px-4 py-4 focus-within:border-soft transition-colors">
            <Users className="w-4 h-4 text-luxury-muted shrink-0" aria-hidden />
            <input
              id="hall-pax"
              name="pax"
              type="number"
              min={1}
              required
              placeholder="Pax"
              className="w-full min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="hall-message" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
          Message
        </label>
        <div className="flex items-start gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
          <MessageSquare className="w-4 h-4 text-luxury-muted shrink-0 mt-0.5" aria-hidden />
          <textarea
            id="hall-message"
            rows={3}
            placeholder="Message…"
            className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none resize-none"
            {...register("message")}
          />
        </div>
      </div>

      <Recaptcha />

      <button type="submit" className="luxury-btn luxury-btn-accent !py-4">
        {submitted ? "Message Sent" : "Submit"}
      </button>
      {submitted && (
        <p className="text-sm text-luxury-muted text-center">
          Thank you — our events team will be in touch shortly.
        </p>
      )}
    </form>
  );
}
