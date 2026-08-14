"use client";

import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <form className="flex" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Email address"
        aria-label="Email address"
        className="flex-1 min-w-0 bg-transparent border border-white/25 px-4 py-3 text-sm placeholder:text-white/40 focus:outline-none focus:border-gold"
      />
      <button
        type="submit"
        className="shrink-0 bg-gold hover:bg-gold-dim text-white px-4 transition-colors"
        aria-label="Subscribe"
      >
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
