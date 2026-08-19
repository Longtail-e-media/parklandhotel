"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import type { NavItem } from "@/types";
import { site, contact, address } from "@/config/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menu: NavItem[];
}

/**
 * Off-canvas side navigation (the Bootstrap `offcanvas` pattern, in Tailwind):
 * a fixed panel parked off-screen at `translate-x-full` that slides in over a
 * dimmed backdrop. Used at every breakpoint — the nav has too many items, and
 * long labels like "Experiences & Destination", to sit inline in the header.
 */
export default function MobileMenu({ isOpen, onClose, menu }: MobileMenuProps) {
  // Label of the expanded submenu — only one is open at a time.
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Collapse any open submenu when the panel closes, so it reopens clean.
  // Adjusted during render rather than in an effect — an effect would need a
  // second render pass to apply (see react-hooks/set-state-in-effect).
  const [wasOpen, setWasOpen] = useState(isOpen);
  if (wasOpen !== isOpen) {
    setWasOpen(isOpen);
    if (!isOpen) setOpenSubmenu(null);
  }

  // Close on Escape, and lock body scroll while the panel is open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-50  transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Panel */}
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed top-0 right-0 z-60 h-dvh w-80 max-w-[85vw] bg-white text-luxury-charcoal flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 shrink-0 border-b border-hairline">
          <span className="luxury-hero-title text-xl">{site.name}</span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 cursor-pointer hover:opacity-70 transition-opacity"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <ul className="flex flex-col">
            {menu.map((item) => {
              const submenuId = `submenu-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
              const isExpanded = openSubmenu === item.label;

              return (
                <li key={item.label} className="border-b border-hairline last:border-0">
                  {item.children?.length ? (
                    <>
                      {/* Split button (Bootstrap's split-dropdown pattern): the
                          label navigates straight to the parent listing page,
                          the caret is a separate control that only toggles
                          the submenu — so both the parent link and its
                          children stay reachable. */}
                      <div className="flex items-stretch">
                        <Link
                          href={item.href || "#"}
                          onClick={onClose}
                          className="flex-1 py-4 text-sm text-left cursor-pointer transition-colors"
                        >
                          {item.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => setOpenSubmenu(isExpanded ? null : item.label)}
                          aria-expanded={isExpanded}
                          aria-controls={submenuId}
                          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label} submenu`}
                          className="flex items-center pl-3 -mr-2 pr-2 border-l border-hairline cursor-pointer transition-colors"
                        >
                          <ChevronDown
                            className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* 0fr → 1fr animates to the content's natural height,
                          which a plain `height: auto` transition can't do. */}
                      <div
                        id={submenuId}
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <ul className="overflow-hidden">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href || "#"}
                                onClick={onClose}
                                tabIndex={isExpanded ? undefined : -1}
                                className="block pl-4 py-2 border-l-2 border-hairline text-sm text-luxury-charcoal/80 hover:text-(--color-dark-brown) hover:border-(--color-dark-brown) transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                          <li aria-hidden="true" className="h-2" />
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={onClose}
                      className="block py-4 text-sm hover:text-gold transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <Link
            href="#book"
            onClick={onClose}
            className="luxury-btn luxury-btn-solid mt-8 w-full justify-center text-center"
          >
            Book Now
          </Link>
        </nav>

        <div className="px-6 pb-8 pt-4 text-sm text-luxury-charcoal/70 space-y-1 shrink-0 border-t border-hairline">
          <p>{address.full}</p>
          <p>
            <a href={`tel:${contact.phoneE164}`} className="hover:text-gold transition-colors">
              {contact.phone}
            </a>
          </p>
          <p>
            <a href={`mailto:${contact.email}`} className="hover:text-gold transition-colors">
              {contact.email}
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
