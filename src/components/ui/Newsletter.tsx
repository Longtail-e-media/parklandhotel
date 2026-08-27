"use client";

export default function Newsletter() {
  return (
    <form
      className="flex items-center gap-2 rounded-full border-[0.1px] p-1.5 pl-5 focus-within:border-soft transition-colors"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="Email address"
        aria-label="Email address"
        className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-dark focus:outline-none"
      />
      <button
        type="submit"
        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-(--color-primary-green) hover:dark:bg-(--color-primary-green) text-white transition-colors"
        aria-label="Subscribe"
      >
        <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
      </button>
    </form>
  );
}
