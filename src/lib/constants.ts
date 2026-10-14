// src/lib/constants.ts
// All site-wide content, phone numbers, links, and labels.
// Separating content from components makes it easy to update without touching JSX.

export const SITE = {
  name: "Aurixia Capital",
  tagline: "Building Wealth. Creating Assets. Securing Your Future.",
  subTagline: "Strategic Investments. Smarter Decisions. Stronger Futures.",
  url: "https://aurixacapital.in",
  email: "info@aurixacapital.in",
};

export const PHONES = [
  { label: "Advisory Desk", number: "+91 99160 77741", href: "tel:+919916077741" },
  { label: "Client Relations", number: "+91 95389 97811", href: "tel:+919538997811" },
  { label: "Management", number: "+91 62907 77944", href: "tel:+916290777944" },
];

export const SOCIAL = {
  instagram: "https://instagram.com/aurixacapital.in",
  facebook: "https://facebook.com/aurixacapital.in",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "International", href: "#international" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export interface WorldClock {
  city: string;
  country: string;
  timezone: string;
  abbr: string;
}

export const WORLD_CLOCKS: WorldClock[] = [
  { city: "Mumbai", country: "India", timezone: "Asia/Kolkata", abbr: "IST" },
  { city: "Dubai", country: "UAE", timezone: "Asia/Dubai", abbr: "GST" },
  { city: "Singapore", country: "Singapore", timezone: "Asia/Singapore", abbr: "SGT" },
  { city: "Kuala Lumpur", country: "Malaysia", timezone: "Asia/Kuala_Lumpur", abbr: "MYT" },
  { city: "London", country: "Europe", timezone: "Europe/London", abbr: "GMT" },
];

export const CHAPTER_LABELS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "international", label: "International" },
  { id: "process", label: "Process" },
  { id: "why-us", label: "Why Us" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];
