"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Check, Clock, CreditCard, Mail, Minus, Phone, Plus, Tag, User } from "lucide-react";
import type { OfferItem } from "@/types";
import Recaptcha from "@/components/ui/Recaptcha";
import { nameSchema, emailSchema, phoneSchema, PHONE_ALLOWED_CHARS, PHONE_MAX_LENGTH } from "@/lib/validation";

const contactFields = [
  { name: "name", label: "Full Name ", placeholder: "Full Name", type: "text", Icon: User },
  { name: "email", label: "Email Address", placeholder: "Your valid email address", type: "email", Icon: Mail },
  { name: "phone", label: "Phone Number", placeholder: "Your phone no.", type: "tel", Icon: Phone },
] as const;

const paymentOptions = [
  {
    value: "now" as const,
    label: "Pay Now",
    description: "Secure your booking with payment today",
    Icon: CreditCard,
  },
  {
    value: "later" as const,
    label: "Pay Later",
    description: "Reserve now, settle payment at check-in",
    Icon: Clock,
  },
];

const bookingSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function OfferBookingForm({ offer }: { offer: OfferItem }) {
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

  const [checkIn, setCheckIn] = useState("");
  const [pax, setPax] = useState(1);
  const [payment, setPayment] = useState<"now" | "later">("now");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  const { onChange: onPhoneChange, ...phoneField } = register("phone");

  const totalAmount = offer.unitPrice * pax;

  const onPaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.floor(Number(e.target.value));
    setPax(Number.isFinite(value) && value >= 1 ? Math.min(value, 10) : 1);
  };

  const onValid = () => {
    if (payment === "later") {
      router.push("/contact");
      return;
    }
    setSubmitted(true);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onValid)} noValidate>
      {contactFields.map(({ name, label, placeholder, type, Icon }) => (
        <div key={name}>
          <label htmlFor={`booking-${name}`} className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            {label}
            <span className="text-red-500">*</span>
          </label>
          <div
            className={`flex items-center gap-3 rounded-2xl border px-5 py-4 focus-within:border-soft transition-colors ${
              errors[name] ? "border-red-400" : "border-hairline"
            }`}
          >
            <Icon className="w-4 h-4 text-luxury-muted shrink-0" aria-hidden />
            <input
              id={`booking-${name}`}
              type={type}
              inputMode={name === "phone" ? "tel" : undefined}
              maxLength={name === "phone" ? PHONE_MAX_LENGTH : undefined}
              placeholder={placeholder}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `booking-${name}-error` : undefined}
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
            <p id={`booking-${name}-error`} className="text-xs text-red-500 mt-2">
              {errors[name]?.message}
            </p>
          )}
        </div>
      ))}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="booking-checkin" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            Check-In <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-hairline px-4 py-4 focus-within:border-soft transition-colors">

            <input
              id="booking-checkin"
              type="date"
              required
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full min-w-0 bg-transparent text-sm text-luxury-charcoal focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="booking-pax" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            No. of Pax
          </label>
          <div className="flex items-center gap-1 rounded-2xl border border-hairline pl-1.5 pr-1.5 py-1.5 focus-within:border-soft transition-colors">
            <button
              type="button"
              onClick={() => setPax((p) => Math.max(1, p - 1))}
              disabled={pax <= 1}
              aria-label="Decrease pax"
              className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-luxury-charcoal hover:bg-luxury-charcoal/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <input
              id="booking-pax"
              type="number"
              min={1}
              max={10}
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
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="booking-price" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            Price
          </label>
          <div id="booking-price" className="flex items-center gap-2 h-13">
            <Tag className="w-4 h-4 text-luxury-muted shrink-0" aria-hidden />
            <span className="text-sm text-luxury-charcoal">
              {offer.currency} {offer.unitPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="block my-10">
        <span className="luxury-label text-[11px] text-luxury-charcoal block w-full">Total Amount</span>
        <span className=" text-xl block w-full">
          {offer.currency} {totalAmount.toLocaleString()}
        </span>
      </div>

      <div>
        <span className="luxury-label text-[11px] text-luxury-charcoal block mb-3">Choose Payment Method</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {paymentOptions.map(({ value, label, description, Icon }) => {
            const active = payment === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setPayment(value)}
                aria-pressed={active}
                className={`relative flex items-start gap-3 rounded-2xl border px-5 py-4 text-left transition-colors cursor-pointer ${
                  active ? "border-(--color-primary-green) bg-(--color-primary-green)/5" : "border-hairline hover:border-soft"
                }`}
              >
                <span
                  className={`flex w-10 h-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                    active ? "bg-(--color-primary-green) text-white" : "bg-luxury-cream text-luxury-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden />
                </span>
                <span className="flex-1 min-w-0 pr-2">
                  <span className="block text-sm font-medium text-luxury-charcoal">{label}</span>
                  <span className="block text-xs text-luxury-muted mt-0.5 leading-snug">{description}</span>
                </span>
                <span
                  className={`absolute top-4 right-4 w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                    active ? "border-(--color-primary-green) bg-(--color-primary-green)" : "border-hairline"
                  }`}
                >
                  {active && <Check className="w-3 h-3 text-white" aria-hidden />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Recaptcha />

      <button type="submit" className="luxury-btn bg-green-700 mt-7 text-white justify-center !py-4 hover:cursor-pointer">
        {submitted ? "Booking Received" : "Proceed to Booking"}
      </button>
      {submitted && (
        <p className="text-sm text-luxury-muted text-center">
          Thank you — you&apos;ll be redirected to our secure payment partner to complete the booking.
        </p>
      )}
    </form>
  );
}
