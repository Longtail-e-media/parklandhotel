"use client";

import { useState } from "react";
import Image from "next/image";
import { User, Mail, MessageSquare } from "lucide-react";
import Watermark from "@/components/ui/Watermark";

const fields = [
  { name: "name", label: "Your Name", placeholder: "Your Name", type: "text", Icon: User },
  { name: "email", label: "Your Email", placeholder: "Your Email", type: "email", Icon: Mail },
] as const;

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);

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

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            {fields.map(({ name, label, placeholder, type, Icon }) => (
              <div key={name}>
                <label htmlFor={name} className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
                  {label}
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
                  <Icon className="w-4 h-4 text-luxury-muted shrink-0" />
                  <input
                    id={name}
                    name={name}
                    type={type}
                    required
                    placeholder={placeholder}
                    className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none"
                  />
                </div>
              </div>
            ))}

            <div>
              <label htmlFor="message" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
                Your Message
              </label>
              <div className="flex items-start gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
                <MessageSquare className="w-4 h-4 text-luxury-muted shrink-0 mt-0.5" />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Message"
                  className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-muted focus:outline-none resize-none"
                />
              </div>
            </div>

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
