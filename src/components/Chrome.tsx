import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { site } from "../data/site.config";
import type { RailId, SocialId } from "../data/site.config";
import {
  IconAward,
  IconClose,
  IconFacebook,
  IconGlobe,
  IconHome,
  IconImage,
  IconInfo,
  IconInstagram,
  IconLinkedin,
  IconMail,
  IconMenu,
  IconUsers,
  IconVolumeOff,
  IconVolumeOn,
  IconYoutube,
} from "./Icons";

export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeDasharray="118 16"
        transform="rotate(-40 32 32)"
      />
      <path
        d="M10 34h10l4.5-11 6.5 20 5-15 3.5 6H54"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------------- Top bar ---------------- */

interface TopBarProps {
  soundOn: boolean;
  onToggleSound: () => void;
  onOpenMenu: () => void;
}

export function TopBar({ soundOn, onToggleSound, onOpenMenu }: TopBarProps) {
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label={`${site.festival} ${site.yearLabel} home`}>
        <LogoMark />
        <span className="brand__name">
          {site.festival} {site.yearLabel.replace(/\s/g, "")}
        </span>
      </a>

      <nav className="topnav" aria-label="Primary">
        {site.nav.map((item, i) => (
          <span key={item.href} className="topnav__item">
            {i > 0 && <span className="topnav__sep" aria-hidden="true" />}
            <a href={item.href}>{item.label}</a>
          </span>
        ))}
      </nav>

      <div className="topbar__actions">
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}
        >
          {soundOn ? <IconVolumeOn size={18} /> : <IconVolumeOff size={18} />}
        </button>
        <a className="pill-btn" href={site.adminUrl}>
          Admin
        </a>
        <button type="button" className="icon-btn menu-btn" onClick={onOpenMenu} aria-label="Open menu">
          <IconMenu size={18} />
        </button>
      </div>
    </header>
  );
}

/* ---------------- Left rail ---------------- */

const railIcons: Record<RailId, (p: { size?: number }) => ReactElement> = {
  home: IconHome,
  about: IconInfo,
  highlights: IconAward,
  gallery: IconImage,
  team: IconUsers,
  contact: IconMail,
};

function useActiveHash() {
  const [hash, setHash] = useState(() => window.location.hash || "#top");
  useEffect(() => {
    const on = () => setHash(window.location.hash || "#top");
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash;
}

export function SideRail() {
  const active = useActiveHash();
  return (
    <nav className="rail rail--left" aria-label="Sections">
      {site.rail.map((item) => {
        const Icon = railIcons[item.id];
        const isActive = active === item.href;
        return (
          <a
            key={item.id}
            href={item.href}
            className={`rail__btn${isActive ? " is-active" : ""}`}
            aria-current={isActive ? "page" : undefined}
            data-tip={item.label}
          >
            <Icon size={20} />
            <span className="sr-only">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ---------------- Right rail ---------------- */

const socialIcons: Record<SocialId, (p: { size?: number }) => ReactElement> = {
  instagram: IconInstagram,
  youtube: IconYoutube,
  linkedin: IconLinkedin,
  facebook: IconFacebook,
  website: IconGlobe,
};

export function SocialRail({ className = "rail rail--right" }: { className?: string }) {
  return (
    <nav className={className} aria-label="Social media">
      {site.social.map((item) => {
        const Icon = socialIcons[item.id];
        return (
          <a
            key={item.id}
            href={item.href}
            className="rail__btn"
            target="_blank"
            rel="noreferrer noopener"
            data-tip={item.label}
          >
            <Icon size={20} />
            <span className="sr-only">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ---------------- Mobile menu ---------------- */

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
      <button type="button" className="icon-btn mobile-menu__close" onClick={onClose} aria-label="Close menu">
        <IconClose size={18} />
      </button>
      <nav aria-label="Mobile">
        {[...site.nav, ...site.rail].map((item) => (
          <a key={item.label} href={item.href} onClick={onClose}>
            {item.label}
          </a>
        ))}
        <a href={site.adminUrl} onClick={onClose}>
          Admin
        </a>
      </nav>
      <SocialRail className="mobile-menu__social" />
    </div>
  );
}
