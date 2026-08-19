/** Formats a blog post's ISO date for display, e.g. "May 14, 2026". */
export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
