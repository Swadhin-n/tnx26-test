/**
 * Everything editable about the site lives here: dates, links, copy.
 * Change values here, not inside components.
 */
export const site = {
  festival: "TECHNEX",
  yearLabel: "26 – 27",
  theme: "INKARNATE",
  tagline: "Where Imagination Takes Form",
  edition: 20,
  college: ["St. Vincent Pallotti College of", "Engineering & Technology, Nagpur"],
  subline: ["Two decades of", "redefining innovation."],

  /** Countdown target — ISO string with the IST offset. */
  eventStart: "2026-12-19T09:00:00+05:30",
  dateLabel: "19 – 20 December",

  registerUrl: "#register",
  adminUrl: "#admin",

  nav: [
    { label: "Workshops", href: "#workshops" },
    { label: "Events", href: "#journey" },
  ],

  rail: [
    { id: "home", label: "Home", href: "#top" },
    { id: "about", label: "About INKARNATE", href: "#about" },
    { id: "highlights", label: "The Notebook", href: "#journey" },
    { id: "gallery", label: "Gallery", href: "#gallery" },
    { id: "team", label: "Team", href: "#team" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  social: [
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "youtube", label: "YouTube", href: "#" },
    { id: "linkedin", label: "LinkedIn", href: "#" },
    { id: "facebook", label: "Facebook", href: "#" },
    { id: "website", label: "College website", href: "#" },
  ],

  /** Optional ambient track. If the file is missing, a soft synthesized drone is used instead. */
  ambientAudio: "/audio/ambient.mp3",
} as const;

export type RailId = (typeof site.rail)[number]["id"];
export type SocialId = (typeof site.social)[number]["id"];
