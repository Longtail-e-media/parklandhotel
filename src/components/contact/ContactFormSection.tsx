"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import Watermark from "@/components/ui/Watermark";
import Recaptcha from "@/components/ui/Recaptcha";
import { nameSchema, emailSchema, phoneSchema, messageSchema, PHONE_ALLOWED_CHARS, PHONE_MAX_LENGTH } from "@/lib/validation";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Your Name", type: "text", Icon: User },
  { name: "email", label: "Email", placeholder: "Your Email", type: "email", Icon: Mail },
  { name: "number", label: "Phone Number", placeholder: "Phone Number", type: "tel", Icon: Phone },
] as const;

const contactSchema = z.object({
  name: nameSchema,
  number: phoneSchema,
  email: emailSchema,
  message: messageSchema,
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", number: "", email: "", message: "" },
  });

  const { onChange: onNumberChange, ...numberField } = register("number");

  return (
    <section className="relative overflow-hidden pt-36 lg:pt-44 pb-16 lg:pb-24">
      <Watermark
        motif="leaf"
        className="w-28 lg:w-40 -left-8 top-16 text-gold/7"
        rotate={-12}
        duration={17}
      />
      <Watermark
        motif="grass"
        className="w-40 lg:w-56 left-[8%] bottom-0 text-luxury-charcoal/4"
        rotate={0}
        duration={20}
        delay={1.5}
      />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div className="animate-fade-in-up">
          <p className="luxury-label text-gold-text mb-5">Contact Us</p>
          <h1 className="luxury-section-title  text-5xl leading-[1.2] text-luxury-charcoal mb-10">
            Love to Hear From You,
            <br />
            Get in Touch!
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit(() => setSubmitted(true))} noValidate>
            {fields.map(({ name, label, placeholder, type, Icon }) => (
              <div key={name}>
                <label htmlFor={name} className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
                  {label} <span className="text-red-500">*</span>
                </label>
                <div
                  className={`flex items-center gap-3 rounded-2xl border px-5 py-4 focus-within:border-soft transition-colors ${
                    errors[name] ? "border-red-400" : "border-hairline"
                  }`}
                >
                  <Icon className="w-4 h-4 text-luxury-muted shrink-0" />
                  <input
                    id={name}
                    type={type}
                    inputMode={name === "number" ? "tel" : undefined}
                    maxLength={name === "number" ? PHONE_MAX_LENGTH : undefined}
                    placeholder={placeholder}
                    aria-invalid={!!errors[name]}
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                    className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none"
                    {...(name === "number"
                      ? {
                          ...numberField,
                          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                            e.target.value = e.target.value.replace(PHONE_ALLOWED_CHARS, "");
                            onNumberChange(e);
                          },
                        }
                      : register(name))}
                  />
                </div>
                {errors[name] && (
                  <p id={`${name}-error`} className="text-xs text-red-500 mt-2">
                    {errors[name]?.message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label htmlFor="message" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
                Your Message <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-start gap-3 rounded-2xl border px-5 py-4 focus-within:border-soft transition-colors ${
                  errors.message ? "border-red-400" : "border-hairline"
                }`}
              >
                <MessageSquare className="w-4 h-4 text-luxury-muted shrink-0 mt-0.5" />
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Message"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none resize-none"
                  {...register("message")}
                />
              </div>
              {errors.message && (
                <p id="message-error" className="text-xs text-red-500 mt-2">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Recaptcha />

            <button type="submit" className="luxury-btn luxury-btn-accent cursor-pointer max-w-80 justify-center !py-4">
              {submitted ? "Message Sent" : "Send Message"}
            </button>
            {submitted && (
              <p className="text-sm text-luxury-muted text-center">
                Thank you — our reservations team will be in touch shortly.
              </p>
            )}
          </form>
        </div>

        <div className="luxury-media relative w-full h-[380px] lg:h-full min-h-[420px] animate-fade-in-up delay-100">
          <Image
            src="/img/rooms/room-premier.jpg"
            alt="A Hotel Parkland suite"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
