import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { SITE_URL } from "@/config/site";

interface ShareButtonsProps {
  slug: string;
  title: string;
}

/** Facebook and LinkedIn share links for a blog post — plain anchors, no client JS needed. */
export default function ShareButtons({ slug, title }: ShareButtonsProps) {
  const url = `${SITE_URL}/blog/${slug}`;

  const shareLinks = [
    {
      label: "Share on Facebook",
      icon: faFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
    },
    {
      label: "Share on LinkedIn",
      icon: faLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="luxury-label text-[11px] text-luxury-muted">Share</span>
      {shareLinks.map(({ label, icon, href }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-10 h-10 flex items-center justify-center rounded-full border border-hairline text-luxury-charcoal/70 hover:border-soft hover:-translate-y-0.5 transition-all duration-300"
        >
          <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" />
        </a>
      ))}
    </div>
  );
}
