import type { Invention } from "../data/inventions";
import { nowArt, thenArt } from "./art";

interface Props {
  inv: Invention;
  index: number;
  side: "imagined" | "realised";
  className?: string;
}

/** One face of an Invention Card, drawn entirely in SVG (240 × 320). */
export function CardFace({ inv, index, side, className }: Props) {
  const no = String(index + 1).padStart(2, "0");
  const fit = (t: string) => ({ fontSize: t.length > 22 ? 12 : t.length > 17 ? 13.5 : 15.5 });

  if (side === "imagined") {
    return (
      <svg className={className} viewBox="0 0 240 320" aria-hidden="true" focusable="false">
        <rect width="240" height="320" fill="url(#parchment)" />
        <rect width="240" height="320" filter="url(#paper-grain)" opacity="0.35" />
        <rect x="8" y="8" width="224" height="304" fill="none" stroke="#6b4a26" strokeWidth="1.2" />
        <rect x="13" y="13" width="214" height="294" fill="none" stroke="#6b4a26" strokeWidth="0.5" opacity="0.7" />

        <text x="24" y="36" className="cf-label" fill="#5a3c1e">
          IMAGINED
        </text>
        <text x="216" y="36" className="cf-label" fill="#5a3c1e" textAnchor="end">
          {inv.imagined.year.toUpperCase()}
        </text>
        <path d="M24 44 H216" stroke="#6b4a26" strokeWidth="0.6" opacity="0.6" />

        <g
          transform="translate(40 58)"
          color="#4a2e14"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ink-rough)"
        >
          {thenArt[inv.id]}
        </g>

        {/* marginal notes, in the manner of a notebook */}
        <g stroke="#5a3c1e" strokeWidth="0.7" fill="none" opacity="0.55">
          <path d="M22 210 q6 -3 12 0 t12 0 t12 0 M22 216 q5 -3 10 0 t10 0" />
          <path d="M176 206 q6 -3 12 0 t12 0 t8 0 M184 212 q5 -3 10 0 t10 0" />
          <path d="M28 64 l10 10 M28 74 l10 -10" />
        </g>

        <text x="120" y="246" className="cf-title" fill="#3b2410" textAnchor="middle" style={fit(inv.imagined.title)}>
          {inv.imagined.title}
        </text>
        <text x="120" y="266" className="cf-by" fill="#5a3c1e" textAnchor="middle">
          {inv.imagined.by}
        </text>
        <path d="M84 280 H156" stroke="#6b4a26" strokeWidth="0.6" />
        <text x="120" y="298" className="cf-no" fill="#6b4a26" textAnchor="middle">
          FOLIO {no}
        </text>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 240 320" aria-hidden="true" focusable="false">
      <rect width="240" height="320" fill="url(#blueprint)" />
      <rect width="240" height="320" fill="url(#bp-grid-major)" />
      <rect x="8" y="8" width="224" height="304" fill="none" stroke="url(#chrome)" strokeWidth="1.4" />
      <rect x="13" y="13" width="214" height="294" fill="none" stroke="#5fc8ff" strokeOpacity="0.35" strokeWidth="0.5" />

      <text x="24" y="36" className="cf-label" fill="#9fdcff">
        REALISED
      </text>
      <text x="216" y="36" className="cf-label" fill="#9fdcff" textAnchor="end">
        {inv.realised.year.toUpperCase()}
      </text>
      <path d="M24 44 H216" stroke="#5fc8ff" strokeOpacity="0.45" strokeWidth="0.6" />

      <g
        transform="translate(40 58)"
        color="#d7f1ff"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="cf-glow"
      >
        {nowArt[inv.id]}
      </g>

      {/* dimension lines */}
      <g stroke="#5fc8ff" strokeOpacity="0.6" strokeWidth="0.6" fill="none">
        <path d="M40 212 H200 M40 208 V216 M200 208 V216" />
        <path d="M212 58 V198 M208 58 H216 M208 198 H216" />
      </g>
      <text x="120" y="226" className="cf-dim" fill="#7fd0ff" textAnchor="middle">
        REF {no}·{inv.id.toUpperCase()}
      </text>

      <text
        x="120"
        y="252"
        className="cf-title cf-title--chrome"
        fill="url(#chrome)"
        textAnchor="middle"
        style={fit(inv.realised.title)}
      >
        {inv.realised.title}
      </text>
      <path d="M84 270 H156" stroke="#5fc8ff" strokeOpacity="0.5" strokeWidth="0.6" />
      <text x="120" y="292" className="cf-no" fill="#7fd0ff" textAnchor="middle">
        {inv.imagined.year.toUpperCase()} → {inv.realised.year.toUpperCase()}
      </text>
    </svg>
  );
}
