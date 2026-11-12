import type { ReactElement } from "react";
import type { InventionId } from "../data/inventions";

/**
 * Original line-art for the Invention Cards.
 * Every drawing sits in a 160 × 140 box and uses `currentColor` strokes,
 * so the same art can be skinned as an ink sketch or as a blueprint.
 *
 * To use final renders instead, swap the card faces in InventionCard.tsx
 * for <image href="/cards/{id}-then.png" /> etc.
 */

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ------------------------------------------------------------------ */
/* IMAGINED — Renaissance / early-industrial sketches                  */
/* ------------------------------------------------------------------ */

export const thenArt: Record<InventionId, ReactElement> = {
  flight: (
    <g>
      <path d="M70 70 Q40 38 4 50 Q18 62 12 76 Q30 72 34 88 Q52 80 70 84" />
      <path d="M90 70 Q120 38 156 50 Q142 62 148 76 Q130 72 126 88 Q108 80 90 84" />
      <path d="M70 72 L8 52 M70 76 L14 74 M70 80 L34 86 M70 74 L30 60" opacity=".7" />
      <path d="M90 72 L152 52 M90 76 L146 74 M90 80 L126 86 M90 74 L130 60" opacity=".7" />
      <ellipse cx="80" cy="80" rx="10" ry="24" />
      <path d="M80 56 V28 M80 28 L40 48 M80 28 L120 48" />
      <circle cx="80" cy="100" r="6" />
      <path d="M74 102 L80 132 L86 102" />
      <path d="M76 66 l8 0 M75 74 l10 0 M75 82 l10 0 M76 90 l8 0" opacity=".5" />
    </g>
  ),
  limb: (
    <g>
      <circle cx="28" cy="40" r="13" />
      <circle cx="28" cy="40" r="4" />
      <path d="M38 31 L94 62 L86 76 L30 49 Z" />
      <circle cx="93" cy="72" r="10" />
      <circle cx="93" cy="72" r="3" />
      <path d="M99 65 L134 103 L123 112 L87 79 Z" />
      <path d="M130 103 L147 111 L144 125 L124 116 Z" />
      <path d="M147 111 L157 103 M147 116 L159 115 M145 121 L155 129 M138 122 L142 133" />
      <path d="M28 27 Q70 34 93 62 Q112 84 142 108" strokeDasharray="3 4" />
      <path d="M48 40 l6 -10 M60 46 l6 -10 M72 52 l6 -10 M106 86 l9 -6 M114 95 l9 -6" opacity=".55" />
    </g>
  ),
  comms: (
    <g>
      <rect x="28" y="100" width="104" height="14" rx="2" />
      <path d="M38 96 L132 80" />
      <circle cx="132" cy="78" r="8" />
      <path d="M74 98 L82 86 L90 98 Z" />
      <path d="M108 96 l-4 -3 l8 -3 l-8 -3 l8 -3 l-4 -3" />
      <path d="M28 108 Q8 110 12 80 Q16 50 48 40 Q80 30 102 44" />
      <path d="M40 22 h3 M50 22 h12 M70 22 h3 M80 22 h3 M92 22 h12 M112 22 h12 M132 22 h3" strokeWidth="3" />
      <path d="M34 120 l-4 10 M126 120 l4 10" opacity=".6" />
    </g>
  ),
  imaging: (
    <g>
      <path d="M80 12 V128" />
      <path d="M77 30 h6 M77 44 h6 M77 58 h6 M77 72 h6 M77 86 h6 M77 100 h6 M77 114 h6" />
      <path d="M44 20 Q80 12 116 20" />
      <path d="M80 30 Q44 26 40 50 M80 44 Q38 40 36 66 M80 58 Q36 56 36 82 M80 72 Q40 72 42 96 M80 86 Q48 88 52 106" />
      <path d="M80 30 Q116 26 120 50 M80 44 Q122 40 124 66 M80 58 Q124 56 124 82 M80 72 Q120 72 118 96 M80 86 Q112 88 108 106" />
      <circle cx="130" cy="112" r="16" />
      <path d="M141 124 L154 137" strokeWidth="3" />
      <path d="M124 106 q4 -4 9 -3" opacity=".6" />
    </g>
  ),
  ai: (
    <g>
      {[38, 80, 122].map((x) => (
        <g key={x}>
          <path d={`M${x} 18 V114`} />
          {range(6).map((j) => (
            <ellipse key={j} cx={x} cy={26 + j * 16} rx="15" ry="4.5" />
          ))}
        </g>
      ))}
      <rect x="16" y="114" width="128" height="10" rx="1" />
      <path d="M16 12 H144" />
      <path d="M144 70 h10 v-14 h6" />
      <circle cx="160" cy="56" r="0.5" />
      <path d="M22 130 l-4 8 M138 130 l4 8" opacity=".6" />
    </g>
  ),
  print: (
    <g>
      <rect x="28" y="20" width="10" height="112" />
      <rect x="122" y="20" width="10" height="112" />
      <rect x="22" y="12" width="116" height="14" />
      <path d="M80 26 l-6 4 l12 4 l-12 4 l12 4 l-12 4 l12 4 l-12 4 l12 4 l-6 4 V72" />
      <path d="M46 52 L114 42" strokeWidth="3" />
      <rect x="54" y="72" width="52" height="8" />
      <rect x="38" y="100" width="84" height="10" />
      <path d="M50 96 h60 M52 92 h56" opacity=".6" />
      <path d="M38 110 V132 M122 110 V132" opacity=".6" />
    </g>
  ),
  rotor: (
    <g>
      <path d="M80 16 V104" />
      <path d="M80 22 C134 28 134 46 80 50 C26 54 26 70 80 74 C128 78 128 90 80 94" />
      <path d="M80 22 C30 26 30 34 80 36" opacity=".45" />
      <ellipse cx="80" cy="110" rx="52" ry="11" />
      <path d="M80 104 L36 116 M80 104 L124 116 M80 104 L80 121" />
      <path d="M30 108 l-10 -14 M130 108 l10 -14" opacity=".7" />
      <path d="M50 64 l-4 4 M46 58 l-4 4 M112 84 l4 4" opacity=".5" />
    </g>
  ),
  cart: (
    <g>
      <path d="M18 76 L142 76 L132 90 L28 90 Z" />
      <circle cx="40" cy="104" r="18" />
      <circle cx="122" cy="104" r="18" />
      {range(6).map((k) => {
        const a = (k * Math.PI) / 3;
        return (
          <g key={k}>
            <path d={`M40 104 l${(17 * Math.cos(a)).toFixed(1)} ${(17 * Math.sin(a)).toFixed(1)}`} />
            <path d={`M122 104 l${(17 * Math.cos(a)).toFixed(1)} ${(17 * Math.sin(a)).toFixed(1)}`} />
          </g>
        );
      })}
      <circle cx="80" cy="54" r="18" strokeDasharray="3 2.5" />
      <path d="M80 54 m-12 0 a12 12 0 1 1 12 12 a8 8 0 1 1 -8 -8 a4 4 0 1 1 4 4" />
      <circle cx="44" cy="62" r="10" strokeDasharray="2.5 2" />
      <circle cx="116" cy="62" r="10" strokeDasharray="2.5 2" />
      <path d="M142 76 L156 60" />
    </g>
  ),
  power: (
    <g>
      <path d="M52 50 L52 118 Q80 130 108 118 L108 50" />
      <ellipse cx="80" cy="50" rx="28" ry="6" />
      <path d="M52 86 Q80 94 108 86 M52 86 V118 M108 86 V118" opacity=".7" />
      <path d="M58 92 v20 M66 94 v22 M74 95 v22 M82 95 v22 M90 95 v22 M98 93 v21" opacity=".4" />
      <path d="M80 48 V18" />
      <circle cx="80" cy="14" r="6" />
      <path d="M80 60 q-6 8 0 16 q6 8 0 16" opacity=".7" />
      <path d="M22 4 L36 30 L27 32 L44 58" strokeWidth="2.4" />
      <path d="M140 6 L130 26 L138 28 L126 46" opacity=".6" />
    </g>
  ),
  calc: (
    <g>
      <path d="M14 58 L30 42 L150 42 L146 58 Z" />
      <rect x="14" y="58" width="132" height="58" rx="3" />
      <path d="M146 58 L150 42 L150 100 L146 116" />
      {range(6).map((i) => (
        <g key={i}>
          <rect x={23 + i * 21} y="46" width="10" height="8" />
          <circle cx={28 + i * 21} cy="88" r="8" />
          <path d={`M${28 + i * 21} 80 V96 M${20 + i * 21} 88 H${36 + i * 21}`} opacity=".6" />
        </g>
      ))}
      <path d="M20 126 l-4 8 M140 126 l4 8" opacity=".6" />
    </g>
  ),
};

/* ------------------------------------------------------------------ */
/* REALISED — modern technical drawings                                */
/* ------------------------------------------------------------------ */

export const nowArt: Record<InventionId, ReactElement> = {
  flight: (
    <g>
      <path d="M80 6 Q88 14 88 34 L88 114 Q86 130 80 136 Q74 130 72 114 L72 34 Q72 14 80 6 Z" />
      <path d="M72 58 L8 92 L8 100 L72 84 Z" />
      <path d="M88 58 L152 92 L152 100 L88 84 Z" />
      <path d="M74 116 L50 130 L50 135 L76 128 Z M86 116 L110 130 L110 135 L84 128 Z" />
      <rect x="32" y="78" width="9" height="16" rx="3" />
      <rect x="119" y="78" width="9" height="16" rx="3" />
      <path d="M80 18 V122" strokeDasharray="2 4" opacity=".6" />
    </g>
  ),
  limb: (
    <g>
      <rect x="18" y="118" width="54" height="14" rx="2" />
      <path d="M26 118 Q45 98 64 118" />
      <path d="M38 106 L62 44 L77 50 L54 110 Z" />
      <circle cx="70" cy="46" r="11" />
      <circle cx="70" cy="46" r="4" />
      <path d="M76 37 L132 51 L129 66 L72 56 Z" />
      <circle cx="132" cy="59" r="7.5" />
      <path d="M138 52 L154 46 L156 53 L141 57 M138 66 L154 72 L156 65 L141 61" />
      <path d="M44 92 l12 4 M54 70 l12 4 M96 48 l-2 10 M112 52 l-2 10" opacity=".5" />
    </g>
  ),
  comms: (
    <g>
      <rect x="54" y="14" width="56" height="114" rx="10" />
      <rect x="59" y="25" width="46" height="90" rx="3" />
      <path d="M74 19 h16" />
      <circle cx="82" cy="121" r="3" />
      <path d="M118 28 a10 10 0 0 1 8 10 M121 18 a20 20 0 0 1 15 18 M124 8 a30 30 0 0 1 22 26" />
      <circle cx="16" cy="36" r="4" />
      <circle cx="26" cy="88" r="4" />
      <circle cx="14" cy="122" r="4" />
      <path d="M20 37 L54 50 M30 88 L54 80 M18 120 L54 104 M16 40 L26 84 M26 92 L16 118" opacity=".6" />
      <path d="M66 40 h32 M66 50 h24 M66 60 h28" opacity=".5" />
    </g>
  ),
  imaging: (
    <g>
      <circle cx="80" cy="62" r="50" />
      <circle cx="80" cy="62" r="30" />
      <circle cx="80" cy="62" r="40" strokeDasharray="2 5" opacity=".6" />
      <rect x="4" y="88" width="152" height="8" rx="3" />
      <path d="M24 96 V128 M136 96 V128 M16 128 H144" />
      <path d="M58 52 H102 M54 62 H106 M58 72 H102" opacity=".55" />
      <path d="M36 86 Q46 78 60 84 Q72 80 88 84" opacity=".7" />
    </g>
  ),
  ai: (
    <g>
      {[22, 52, 82, 112].flatMap((y1) =>
        [36, 62, 88, 114].map((y2) => (
          <path key={`a${y1}-${y2}`} d={`M24 ${y1 + 8} L80 ${y2}`} opacity=".35" />
        )),
      )}
      {[36, 62, 88, 114].flatMap((y1) =>
        [44, 75, 106].map((y2) => <path key={`b${y1}-${y2}`} d={`M80 ${y1} L136 ${y2}`} opacity=".35" />),
      )}
      {[30, 60, 90, 120].map((y) => (
        <circle key={`l1${y}`} cx="24" cy={y} r="6" />
      ))}
      {[36, 62, 88, 114].map((y) => (
        <circle key={`l2${y}`} cx="80" cy={y} r="7" />
      ))}
      {[44, 75, 106].map((y) => (
        <circle key={`l3${y}`} cx="136" cy={y} r="6" />
      ))}
      <rect x="64" y="22" width="32" height="106" rx="6" strokeDasharray="4 3" opacity=".7" />
    </g>
  ),
  print: (
    <g>
      <path d="M20 132 V10 H140 V132 M20 132 H140" />
      <path d="M20 40 H140" />
      <rect x="68" y="34" width="24" height="16" rx="2" />
      <path d="M76 50 L84 50 L80 58 Z" />
      <rect x="38" y="112" width="84" height="6" />
      <path d="M62 112 L64 104 L60 96 L62 88 L66 80 L70 72 L90 72 L94 80 L98 88 L100 96 L96 104 L98 112" />
      {range(9).map((i) => (
        <path key={i} d={`M${63 - (i % 3)} ${108 - i * 4} H${97 + (i % 3)}`} opacity=".45" />
      ))}
      <path d="M80 58 V70" strokeDasharray="1 2" />
    </g>
  ),
  rotor: (
    <g>
      <rect x="66" y="56" width="28" height="28" rx="6" />
      <circle cx="80" cy="70" r="5" />
      <path d="M68 58 L42 34 M92 58 L118 34 M68 82 L42 106 M92 82 L118 106" strokeWidth="3" />
      {[
        [38, 30],
        [122, 30],
        [38, 110],
        [122, 110],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="22" strokeDasharray="3 3" opacity=".6" />
          <circle cx={x} cy={y} r="3.5" />
          <path d={`M${x - 18} ${y - 4} L${x + 18} ${y + 4}`} />
        </g>
      ))}
    </g>
  ),
  cart: (
    <g>
      <path d="M8 98 L20 74 Q38 54 68 52 L104 52 Q122 54 136 72 L152 78 Q157 82 155 98 Z" />
      <path d="M38 74 Q48 60 68 59 L82 59 L82 74 Z M88 59 L104 59 Q116 62 124 74 L88 74 Z" />
      <circle cx="40" cy="100" r="13" />
      <circle cx="40" cy="100" r="5" />
      <circle cx="122" cy="100" r="13" />
      <circle cx="122" cy="100" r="5" />
      <rect x="78" y="42" width="14" height="8" rx="2" />
      <path d="M85 42 V36" />
      <path d="M90 30 a12 12 0 0 1 10 10 M92 22 a22 22 0 0 1 18 18" opacity=".7" />
      <path d="M156 82 a10 10 0 0 1 0 12" opacity=".7" />
      <path d="M2 118 H158" strokeDasharray="8 6" opacity=".5" />
    </g>
  ),
  power: (
    <g>
      <rect x="44" y="22" width="72" height="108" rx="10" />
      <rect x="64" y="12" width="32" height="10" rx="2" />
      {range(4).map((i) => (
        <rect key={i} x="54" y={100 - i * 22} width="52" height="16" rx="2" opacity={i === 3 ? 0.35 : 0.8} />
      ))}
      <path d="M86 40 L70 72 L82 72 L74 100 L94 64 L82 64 Z" strokeWidth="2.2" />
      <path d="M124 40 h20 M124 76 h20 M124 112 h20" opacity=".5" />
    </g>
  ),
  calc: (
    <g>
      <rect x="38" y="28" width="84" height="84" rx="5" />
      <rect x="56" y="46" width="48" height="48" rx="2" />
      {range(7).map((i) => {
        const p = 40 + i * 13;
        return (
          <g key={i}>
            <path d={`M${p} 28 V16 M${p} 112 V124 M38 ${p} H26 M122 ${p} H134`} />
          </g>
        );
      })}
      <path d="M64 54 h12 v12 h12 M96 86 h-10 v-10 M64 86 h8" opacity=".6" />
      <circle cx="46" cy="36" r="2.5" />
    </g>
  ),
};
