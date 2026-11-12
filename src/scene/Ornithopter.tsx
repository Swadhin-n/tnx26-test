/** Leonardo-style flying machine, drawn in gold ink. Faces right; wings flap via CSS. */
export function Ornithopter() {
  return (
    <svg viewBox="0 0 120 70" width="120" height="70" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <g className="ornithopter__wing ornithopter__wing--top" strokeWidth="1.4">
        <path d="M58 33 Q48 8 20 4 Q30 14 26 22 Q40 20 44 30 Q52 28 58 33" fill="rgba(240,205,150,0.12)" />
        <path d="M58 33 L22 6 M58 33 L28 20 M58 33 L44 29" opacity=".7" />
      </g>
      <g className="ornithopter__wing ornithopter__wing--bottom" strokeWidth="1.4">
        <path d="M58 37 Q48 62 20 66 Q30 56 26 48 Q40 50 44 40 Q52 42 58 37" fill="rgba(240,205,150,0.12)" />
        <path d="M58 37 L22 64 M58 37 L28 50 M58 37 L44 41" opacity=".7" />
      </g>
      <ellipse cx="66" cy="35" rx="22" ry="6" strokeWidth="1.6" fill="rgba(20,14,8,0.6)" />
      <path d="M44 35 L30 35 M30 35 l-8 -6 M30 35 l-8 6" strokeWidth="1.3" />
      <circle cx="80" cy="35" r="3" strokeWidth="1.2" />
      <path d="M88 35 L100 35" strokeWidth="1.2" />
      <path d="M52 32 h4 M60 32 h4 M68 32 h4" strokeWidth=".8" opacity=".6" />
    </svg>
  );
}
