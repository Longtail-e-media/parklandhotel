"use client";

// TEMPORARY: Hotel Parkland has no Mailchimp list of its own yet, so this
// posts to the manakamanahillcrest reference project's list as a stand-in —
// swap this action URL for Hotel Parkland's own embedded-form URL once one
// exists (Mailchimp → Audience → Signup forms → Embedded forms).
const MAILCHIMP_ACTION =
  "https://manakamanahillcrest.us12.list-manage.com/subscribe/post?u=c9a5f9fea652322559bf56230&id=528e344f90&f_id=00bec2e1f0";

export default function Newsletter() {
  return (
    <form
      className="flex items-center gap-2 rounded-full border-[0.1px] p-1.5 pl-5 focus-within:border-soft transition-colors"
      action={MAILCHIMP_ACTION}
      method="post"
      name="mc-embedded-subscribe-form"
      target="_blank"
      rel="noreferrer"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        name="EMAIL"
        placeholder="Email address"
        autoComplete="email"
        required
        className="flex-1 min-w-0 bg-transparent text-sm text-luxury-charcoal placeholder:text-luxury-dark focus:outline-none"
      />
      <button
        type="submit"
        name="subscribe"
        className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-(--color-primary-green) hover:dark:bg-(--color-primary-green) text-white transition-colors"
        aria-label="Subscribe"
      >
        <i className="fa-solid fa-arrow-right text-base" aria-hidden="true" />
      </button>
    </form>
  );
}
