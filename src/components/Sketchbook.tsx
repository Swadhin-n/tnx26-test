import { thenArt } from "../scene/art";

/** The open inventor's notebook in the bottom-left corner — where every idea begins. */
export function Sketchbook() {
  return (
    <div className="sketchbook" aria-hidden="true">
      <svg viewBox="0 0 520 300" focusable="false">
        {/* cover & page stack */}
        <path d="M14 230 L250 286 L506 220 L496 236 L250 300 L4 244 Z" fill="#3b2614" />
        <path d="M20 222 L250 276 L250 286 L14 230 Z" fill="#d8bf92" />
        <path d="M480 214 L250 276 L250 286 L494 222 Z" fill="#cdb287" />

        {/* left page */}
        <path d="M30 60 Q140 40 250 92 L250 276 Q140 228 20 222 Z" fill="url(#parchment)" />
        {/* right page */}
        <path d="M250 92 Q360 30 490 46 L480 214 Q360 214 250 276 Z" fill="url(#parchment)" />
        <path d="M250 92 L250 276" stroke="#6b4a26" strokeWidth="1" opacity="0.6" />
        <path d="M30 60 Q140 40 250 92 L250 276 Q140 228 20 222 Z" filter="url(#paper-grain)" opacity="0.4" />
        <path d="M250 92 Q360 30 490 46 L480 214 Q360 214 250 276 Z" filter="url(#paper-grain)" opacity="0.4" />

        {/* sketches */}
        <g
          transform="translate(52 82) scale(0.95) skewY(6)"
          color="#4a2e14"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ink-rough)"
        >
          {thenArt.print}
        </g>
        <g
          transform="translate(290 74) scale(0.98) skewY(-7)"
          color="#4a2e14"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ink-rough)"
        >
          {thenArt.limb}
        </g>
        <g stroke="#5a3c1e" strokeWidth="0.8" fill="none" opacity="0.5">
          <path d="M60 214 q6 -3 12 0 t12 0 t12 0 t12 0 M60 206 q6 -3 12 0 t12 0 t12 0" />
          <path d="M300 206 q6 -3 12 0 t12 0 t12 0 t12 0 M380 196 q6 -3 12 0 t12 0 t12 0" />
        </g>
      </svg>
    </div>
  );
}
