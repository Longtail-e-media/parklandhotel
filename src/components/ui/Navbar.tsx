import { getMenuItems, getSiteRegulars, splitContactList } from "@/lib/data";
import { navItems as fallbackNavItems } from "@/data/data";
import { contact, links } from "@/config/site";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const [menuItems, siteRegulars] = await Promise.all([
    getMenuItems(1),
    getSiteRegulars(),
  ]);
  const phone = splitContactList(siteRegulars?.contact_info)[0] || contact.phone;
  return (
    <NavbarClient
      // Fall back to the static menu if the CMS is unreachable or has no
      // header menu configured yet, so the site stays navigable either way.
      menu={menuItems.length > 0 ? menuItems : fallbackNavItems}
      // `logo_upload` is the dark/colour lockup (solid header); the light
      // variant meant for the footer's dark background doubles as the mark
      // for the transparent hero header, which needs the same light contrast.
      logoDark={siteRegulars?.logo_upload || "/img/logo2.png"}
      logoLight={siteRegulars?.footer_logo_upload || "/img/logo.png"}
      phone={phone}
      phoneHref={`tel:${phone.replace(/\s+/g, "")}`}
      // `booking_code` is a ready-made link to the property's booking engine;
      // no live engine yet means it's usually absent, so fall back to a call.
      bookingUrl={siteRegulars?.booking_code || links.booking}
      email={splitContactList(siteRegulars?.email_address)[0] || contact.email}
    />
  );
}
