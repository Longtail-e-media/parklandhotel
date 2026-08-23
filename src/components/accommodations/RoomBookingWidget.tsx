"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CalendarCheck, CalendarX, ChevronDown, DoorOpen, Users } from "lucide-react";
import type { RoomType } from "@/types";
import Recaptcha from "@/components/ui/Recaptcha";

export default function RoomBookingWidget({
  room,
  rooms,
  className = "",
}: {
  room: RoomType;
  rooms: RoomType[];
  className?: string;
}) {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const today = new Date().toISOString().slice(0, 10);

  return (
    <aside className={`luxury-surface p-7 sm:p-8 ${className}`}>
      <h2 className="luxury-section-title text-xl mb-7">Book a Room</h2>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          router.push("/contact");
        }}
      >
        <div>
          <label htmlFor="check-in" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            Check In Date
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
            <CalendarCheck className="w-4 h-4 text-luxury-muted shrink-0" aria-hidden />
            <input
              id="check-in"
              type="date"
              required
              min={today}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="check-out" className="luxury-label text-[11px] text-luxury-charcoal block mb-3">
            Check Out Date
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-hairline px-5 py-4 focus-within:border-soft transition-colors">
            <CalendarX className="w-4 h-4 text-luxury-muted shrink-0" aria-hidden />
            <input
              id="check-out"
              type="date"
              required
              min={checkIn || today}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal focus:outline-none"
            />
          </div>
        </div>

        <Recaptcha />

        <button type="submit" className="luxury-btn hover:cursor-pointer rounded-2xl luxury-btn-accent mt-4 justify-center py-4!">
          Check Availability <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </form>
    </aside>
  );
}
