import type { CSSProperties } from "react";

/**
 * Shared SVG filters, gradients and patterns. Rendered once at the top of the app;
 * every inline SVG on the page can reference these by id.
 */
export function BrushDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        {/* Hand-drawn wobble for sketch lines */}
        <filter id="ink-rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
        </filter>

        {/* Dry-brush ragged edge */}
        <filter id="brush-edge" x="-10%" y="-30%" width="120%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.42" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>

        {/* Soft ink wash for the big background strokes */}
        <filter id="ink-wash" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.05" numOctaves="4" seed="11" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="38" xChannelSelector="R" yChannelSelector="B" result="d" />
          <feGaussianBlur in="d" stdDeviation="0.8" />
        </filter>

        {/* Paper grain overlay */}
        <filter id="paper-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.55" />
          </feComponentTransfer>
        </filter>

        <linearGradient id="gold-brush" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b98a52" stopOpacity="0.15" />
          <stop offset="0.12" stopColor="#e9cfa2" />
          <stop offset="0.55" stopColor="#f3dfb8" />
          <stop offset="0.9" stopColor="#d7b07c" />
          <stop offset="1" stopColor="#a87a45" stopOpacity="0.2" />
        </linearGradient>

        <radialGradient id="parchment" cx="0.5" cy="0.42" r="0.75">
          <stop offset="0" stopColor="#f4e6c8" />
          <stop offset="0.65" stopColor="#e2c99a" />
          <stop offset="1" stopColor="#b48c5a" />
        </radialGradient>

        <linearGradient id="blueprint" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#10283a" />
          <stop offset="1" stopColor="#081521" />
        </linearGradient>

        <linearGradient id="chrome" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#f1f3f6" />
          <stop offset="0.45" stopColor="#9aa1ab" />
          <stop offset="0.55" stopColor="#d9dde3" />
          <stop offset="1" stopColor="#6d7480" />
        </linearGradient>

        <pattern id="bp-grid" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M12 0H0V12" fill="none" stroke="#5fc8ff" strokeOpacity="0.14" strokeWidth="0.6" />
        </pattern>
        <pattern id="bp-grid-major" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="url(#bp-grid)" />
          <path d="M60 0H0V60" fill="none" stroke="#5fc8ff" strokeOpacity="0.22" strokeWidth="0.8" />
        </pattern>
      </defs>
    </svg>
  );
}

/** A horizontal dry-brush stroke used behind the "20th Edition" banner and the CTA. */
export function BrushStroke({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <g filter="url(#brush-edge)">
        <path
          fill="url(#gold-brush)"
          d="M10 42 C44 22 122 16 202 19 C282 15 356 17 392 29 C382 39 394 49 378 57 C302 66 222 61 142 64 C82 66 32 70 4 57 C16 52 2 47 10 42 Z"
        />
        <path fill="none" stroke="#f0dcb4" strokeOpacity="0.55" strokeWidth="1.4" d="M0 30 C90 14 260 10 398 22" />
        <path fill="none" stroke="#d8b27c" strokeOpacity="0.5" strokeWidth="1.2" d="M14 66 C120 72 300 68 400 60" />
        <path fill="none" stroke="#e9cfa2" strokeOpacity="0.35" strokeWidth="2" d="M380 34 C392 38 398 40 400 44" />
      </g>
    </svg>
  );
}
