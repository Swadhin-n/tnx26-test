/**
 * Fixed atmospheric layer: ink-wash brush strokes framing the page, sweeping light arcs,
 * drifting blueprint sheets, a wireframe skyline and paper grain.
 */

function WireCity({ className, seed }: { className: string; seed: number }) {
  // deterministic pseudo-random so the skyline is stable between renders
  let x = seed;
  const rnd = () => {
    x = (x * 9301 + 49297) % 233280;
    return x / 233280;
  };
  const towers: { x: number; w: number; h: number }[] = [];
  let cursor = 0;
  while (cursor < 300) {
    const w = 18 + rnd() * 26;
    towers.push({ x: cursor, w, h: 60 + rnd() * 170 });
    cursor += w + 3 + rnd() * 8;
  }
  return (
    <svg className={className} viewBox="0 0 300 240" preserveAspectRatio="xMaxYMax meet" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#cfe6ff" strokeWidth="0.6">
        {towers.map((t, i) => {
          const top = 240 - t.h;
          const floors = Math.floor(t.h / 9);
          return (
            <g key={i} opacity={0.35 + (i % 3) * 0.15}>
              <path d={`M${t.x} 240 V${top} H${t.x + t.w} V240`} />
              {i % 2 === 0 && <path d={`M${t.x + t.w / 2} ${top} v-${8 + (i % 4) * 4}`} />}
              {Array.from({ length: floors }, (_, f) => (
                <path key={f} d={`M${t.x} ${240 - f * 9} H${t.x + t.w}`} opacity="0.45" />
              ))}
              <path d={`M${t.x + t.w * 0.33} ${top} V240 M${t.x + t.w * 0.66} ${top} V240`} opacity="0.3" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__vignette" />

      <div className="bp-sheet bp-sheet--1" />
      <div className="bp-sheet bp-sheet--2" />
      <div className="bp-sheet bp-sheet--3" />

      <WireCity className="wire-city wire-city--top" seed={7} />
      <WireCity className="wire-city wire-city--bottom" seed={21} />

      <svg className="backdrop__ink" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ink-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9a86c" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#8a5a2e" stopOpacity="0.45" />
            <stop offset="1" stopColor="#3a2414" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ink-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#e8c896" stopOpacity="0.7" />
            <stop offset="1" stopColor="#6b4320" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="arc-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#f0a35c" stopOpacity="0" />
            <stop offset="0.45" stopColor="#ffd9a8" stopOpacity="0.9" />
            <stop offset="1" stopColor="#f0a35c" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="arc-blue" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5fc8ff" stopOpacity="0" />
            <stop offset="0.6" stopColor="#a8e2ff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#5fc8ff" stopOpacity="0" />
          </linearGradient>
          <filter id="arc-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* top-left ink wash */}
        <g filter="url(#ink-wash)">
          <path
            fill="url(#ink-a)"
            d="M-40 -40 C120 -30 260 30 300 120 C250 90 170 80 120 130 C180 150 210 200 190 260 C140 200 60 190 -40 240 Z"
          />
          <path fill="url(#ink-a)" opacity="0.6" d="M-20 300 C40 260 90 290 110 340 C70 330 20 350 -20 400 Z" />
        </g>

        {/* bottom-left swirl (behind the sketchbook) */}
        <g filter="url(#ink-wash)">
          <path
            fill="url(#ink-b)"
            d="M-40 640 C60 560 180 560 230 620 C170 610 120 640 110 690 C170 660 240 690 260 760 C200 730 140 760 120 820 C80 760 20 760 -40 800 Z"
          />
        </g>

        {/* right-hand sweeping light arcs */}
        <g filter="url(#arc-glow)" fill="none" strokeLinecap="round">
          <path stroke="url(#arc-gold)" strokeWidth="3" d="M560 860 C900 840 1350 760 1520 520 C1600 400 1610 260 1560 120" />
          <path stroke="url(#arc-gold)" strokeWidth="1.2" opacity="0.7" d="M640 900 C980 880 1420 800 1580 560" />
          <path stroke="url(#arc-blue)" strokeWidth="1.4" d="M1300 60 C1460 120 1560 220 1600 320" />
          <path stroke="url(#arc-gold)" strokeWidth="2" opacity="0.8" d="M1180 0 C1380 40 1560 160 1640 300" />
        </g>

        {/* right edge ink */}
        <g filter="url(#ink-wash)" opacity="0.7">
          <path fill="url(#ink-b)" d="M1640 600 C1560 640 1520 720 1540 800 C1500 780 1460 820 1450 920 L1640 920 Z" />
          <path fill="url(#ink-b)" d="M1640 -20 C1580 30 1560 90 1590 150 C1600 110 1620 90 1640 90 Z" />
        </g>
      </svg>

      <svg className="backdrop__grain" width="100%" height="100%">
        <rect width="100%" height="100%" filter="url(#paper-grain)" />
      </svg>
    </div>
  );
}
