/** Formats a blog post's date for display, e.g. "May 14, 2026". Accepts any Date-parseable string — the CMS sends "Month D, YYYY", static data sends ISO. */
export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
