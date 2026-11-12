import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 22, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const IconHome = (p: IconProps) => (
  <Base {...p}>
    <path d="M3.5 11 12 4l8.5 7" />
    <path d="M6 9.5V20h4.5v-5.5h3V20H18V9.5" />
  </Base>
);
export const IconInfo = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.01" />
  </Base>
);
export const IconAward = (p: IconProps) => (
  <Base {...p}>
    <path d="m12 3 2.2 4.6 5 .7-3.6 3.5.9 5L12 14.4 7.5 16.8l.9-5L4.8 8.3l5-.7z" />
    <path d="M8.5 16.5 7 21l5-2 5 2-1.5-4.5" />
  </Base>
);
export const IconImage = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
    <circle cx="9" cy="10" r="1.8" />
    <path d="m4 18 5.5-5 4 3.5 2.5-2 4 3.5" />
  </Base>
);
export const IconUsers = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8.5" r="3" />
    <circle cx="5.5" cy="10" r="2.2" />
    <circle cx="18.5" cy="10" r="2.2" />
    <path d="M6.5 19c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5" />
    <path d="M2.5 18c0-2.2 1.4-3.8 3.4-4.1M21.5 18c0-2.2-1.4-3.8-3.4-4.1" />
  </Base>
);
export const IconMail = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);
export const IconVolumeOff = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="m16 9.5 5 5M21 9.5l-5 5" />
  </Base>
);
export const IconVolumeOn = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
    <path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.5a8 8 0 0 1 0 11" />
  </Base>
);
export const IconInstagram = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <path d="M17 7v.01" />
  </Base>
);
export const IconYoutube = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="m10 9.2 5 2.8-5 2.8z" />
  </Base>
);
export const IconLinkedin = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M8 10.5V17M8 7.5v.01M11.5 17v-6.5M11.5 13.2c0-1.6 1-2.7 2.5-2.7s2.5 1 2.5 2.8V17" />
  </Base>
);
export const IconFacebook = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
    <path d="M14.5 20.5v-7h2.3l.4-2.7h-2.7V9.2c0-.8.3-1.3 1.4-1.3h1.4V5.5a17 17 0 0 0-2.1-.1c-2 0-3.4 1.2-3.4 3.5v1.9H9.5v2.7h2.3v7" />
  </Base>
);
export const IconGlobe = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
  </Base>
);
export const IconCalendar = (p: IconProps) => (
  <Base {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" />
  </Base>
);
export const IconArrowRight = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" />
  </Base>
);
export const IconCompass = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
    <path d="M12 3v1.5M12 19.5V21M3 12h1.5M19.5 12H21" />
  </Base>
);
export const IconMouse = (p: IconProps) => (
  <Base {...p}>
    <rect x="6.5" y="3" width="11" height="18" rx="5.5" />
    <path d="M12 7v3" />
  </Base>
);
export const IconZoom = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5M10.5 8v5M8 10.5h5" />
  </Base>
);
export const IconPointer = (p: IconProps) => (
  <Base {...p}>
    <path d="m9 9 11 4.2-4.6 1.6L13.8 19.5z" />
    <path d="M5 3.5 6 6M2.5 7l2.6.6M9.6 2.6 9 5.2M3.5 11.5l2-1.5" />
  </Base>
);
export const IconChevronsDown = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 6 6 6 6-6M6 12.5l6 6 6-6" />
  </Base>
);
export const IconMenu = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Base>
);
export const IconClose = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);
