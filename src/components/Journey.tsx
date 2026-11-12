import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { chapters } from "../data/chapters";
import { site } from "../data/site.config";
import { nowArt, thenArt } from "../scene/art";
import { drawable } from "../scene/drawable";
import { BrushStroke } from "./BrushDefs";
import { IconArrowRight } from "./Icons";

/** Viewport-heights of scroll given to each chapter. */
const SEG_VH = 150;
const TOTAL = chapters.length + 1; // + finale

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => {
  const x = clamp01((v - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/* ---------------- Scene pieces ---------------- */

/** Faint Vitruvian construction geometry + ink wash behind each chapter. */
function Fresco({ variant }: { variant: number }) {
  const r = 300 + (variant % 3) * 30;
  return (
    <svg className="fresco" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g className="fresco__wash" filter="url(#ink-wash)">
        <ellipse cx={1050 + (variant % 2) * 120} cy="420" rx="560" ry="300" />
        <ellipse cx="300" cy={780 - (variant % 3) * 60} rx="420" ry="140" />
      </g>
      <g className="fresco__geo" fill="none" strokeWidth="1">
        {drawable(
          <g>
            <circle cx="1060" cy="440" r={r} />
            <rect x={1060 - r * 0.88} y={440 - r * 0.88} width={r * 1.76} height={r * 1.76} />
            <path d={`M${1060 - r} 440 H${1060 + r} M1060 ${440 - r} V${440 + r}`} />
            <path d={`M${1060 - r * 0.88} ${440 - r * 0.88} L${1060 + r * 0.88} ${440 + r * 0.88}`} />
            <path d={`M${1060 - r * 1.25} 120 A ${r * 1.4} ${r * 1.4} 0 0 1 ${1060 + r * 1.3} 160`} />
            <circle cx="1060" cy="440" r={r * 0.36} />
          </g>,
        )}
        <path className="ink-fade" d="M120 860 H1480" strokeDasharray="2 10" />
      </g>
    </svg>
  );
}

function NotebookNotes() {
  return (
    <g stroke="#5a3c1e" strokeWidth="0.6" fill="none" opacity="0.5">
      <path d="M14 16 q5 -3 10 0 t10 0 t10 0 M14 22 q5 -3 10 0 t10 0" />
      <path d="M150 166 q5 -3 10 0 t10 0 t10 0 M160 172 q5 -3 10 0 t10 0" />
      <path d="M178 14 l8 8 M178 22 l8 -8" />
    </g>
  );
}

function Plate({ art }: { art: (typeof chapters)[number]["art"] }) {
  return (
    <div className="plate" aria-hidden="true">
      <svg className="plate__layer plate__layer--then" viewBox="0 0 200 180">
        <rect width="200" height="180" fill="url(#parchment)" />
        <rect x="5" y="5" width="190" height="170" fill="none" stroke="#6b4a26" strokeWidth="0.8" />
        <NotebookNotes />
        <g
          transform="translate(20 22)"
          color="#3f260f"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#ink-rough)"
        >
          {drawable(thenArt[art])}
        </g>
      </svg>
      <svg className="plate__layer plate__layer--now" viewBox="0 0 200 180">
        <rect width="200" height="180" fill="url(#blueprint)" />
        <rect width="200" height="180" fill="url(#bp-grid-major)" />
        <rect x="5" y="5" width="190" height="170" fill="none" stroke="url(#chrome)" strokeWidth="0.9" />
        <g
          transform="translate(20 22)"
          color="#d7f1ff"
          stroke="currentColor"
          fill="none"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cf-glow"
        >
          {nowArt[art]}
        </g>
        <g stroke="#5fc8ff" strokeOpacity="0.6" strokeWidth="0.5" fill="none">
          <path d="M20 168 H180 M20 165 V171 M180 165 V171" />
          <path d="M190 22 V162 M187 22 H193 M187 162 H193" />
        </g>
      </svg>
      <span className="plate__scan" />
    </div>
  );
}

/* ---------------- Journey ---------------- */

export function Journey() {
  const rootRef = useRef<HTMLElement>(null);
  const sceneEls = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -vh || rect.top > vh * 1.5) return;
      const seg = (rect.height - vh) / (TOTAL - 0.5);
      const prog = Math.max(-1, -rect.top / seg);
      root.style.setProperty("--journey", clamp01(prog / (TOTAL - 0.5)).toFixed(4));

      sceneEls.current.forEach((el, i) => {
        if (!el) return;
        const t = prog - i;
        const enter = i === 0 ? 1 : smooth(-0.22, 0.04, t);
        const visible = enter > 0.001 && t < 1.1;
        el.dataset.visible = visible ? "true" : "false";
        if (!visible) return;
        const s = el.style;
        s.setProperty("--t", Math.max(-1, Math.min(1.2, t)).toFixed(4));
        s.setProperty("--enter", enter.toFixed(4));
        s.setProperty("--exit", smooth(0.8, 1.05, t).toFixed(4));
        s.setProperty("--draw", smooth(i === 0 ? -0.55 : -0.05, 0.36, t).toFixed(4));
        const morph = smooth(0.4, 0.68, t);
        s.setProperty("--morph", morph.toFixed(4));
        s.setProperty("--scan", Math.sin(Math.PI * morph).toFixed(4));
        s.setProperty("--events", smooth(0.5, 0.72, t).toFixed(4));
        s.setProperty("--text", smooth(i === 0 ? -0.6 : -0.12, i === 0 ? -0.1 : 0.14, t).toFixed(4));
      });

      const idx = Math.min(TOTAL - 1, Math.max(0, Math.floor(prog + 0.2)));
      if (idx !== activeRef.current) {
        activeRef.current = idx;
        setActive(idx);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (i: number) => {
    const root = rootRef.current;
    if (!root) return;
    const top = root.getBoundingClientRect().top + window.scrollY;
    const seg = (root.offsetHeight - window.innerHeight) / (TOTAL - 0.5);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + seg * (i + (i === 0 ? 0 : 0.1)) + 2, behavior: reduce ? "auto" : "smooth" });
  };

  const indexItems = [...chapters.map((c) => ({ numeral: c.numeral, word: c.word })), { numeral: "XX", word: "Yours" }];

  return (
    <section
      id="journey"
      ref={rootRef}
      className="journey"
      style={{ height: `${TOTAL * SEG_VH}vh` }}
      aria-label="From notebook to machine: the TECHNEX journey"
    >
      <div className="journey__sticky">
        <nav className="journey__index" aria-label="Chapters">
          <p className="journey__index-title">The Notebook</p>
          <ol>
            {indexItems.map((item, i) => (
              <li key={item.word}>
                <button
                  type="button"
                  className={i === active ? "is-active" : undefined}
                  aria-current={i === active ? "step" : undefined}
                  onClick={() => goTo(i)}
                >
                  <span className="journey__index-num">{item.numeral}</span>
                  <span className="journey__index-word">{item.word}</span>
                </button>
              </li>
            ))}
          </ol>
          <span className="journey__progress" aria-hidden="true" />
        </nav>

        <p className="journey__counter" aria-live="polite">
          {active < chapters.length ? `Chapter ${chapters[active].numeral}` : "Chapter XX"}
          <span> / </span>
          {site.edition}th Edition
        </p>

        {chapters.map((c, i) => (
          <article
            key={c.id}
            ref={(el) => {
              sceneEls.current[i] = el;
            }}
            className="chapter"
            data-visible={i === 0 ? "true" : "false"}
            style={{ zIndex: i + 1, "--light": c.light } as CSSProperties}
            aria-labelledby={`ch-${c.id}`}
          >
            <Fresco variant={i} />
            <div className="chapter__word" aria-hidden="true">
              {c.word}
            </div>

            <div className="chapter__text">
              <p className="chapter__numeral">
                Chapter {c.numeral} · {c.word}
              </p>
              <h2 id={`ch-${c.id}`} className="chapter__headline">
                {c.headline}
              </h2>
              <p className="chapter__body">{c.body}</p>
              <p className="chapter__arc">
                <span className="chapter__then">{c.imagined}</span>
                <IconArrowRight size={16} />
                <span className="chapter__now">{c.realised}</span>
              </p>
            </div>

            <div className="chapter__stage">
              <Plate art={c.art} />
              <aside className="note" aria-label={`Events for ${c.word}`}>
                <span className="note__pin" aria-hidden="true" />
                <p className="note__title">Make it real at TECHNEX</p>
                <ul>
                  {c.events.map((e) => (
                    <li key={e.name}>
                      <strong>{e.name}</strong>
                      <span>
                        {e.when} · {e.where}
                      </span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </article>
        ))}

        {/* Finale — the blank page */}
        <article
          ref={(el) => {
            sceneEls.current[chapters.length] = el;
          }}
          className="chapter chapter--finale"
          data-visible="false"
          style={{ zIndex: chapters.length + 1, "--light": "240, 163, 92" } as CSSProperties}
          aria-labelledby="ch-finale"
        >
          <Fresco variant={chapters.length} />
          <div className="chapter__word" aria-hidden="true">
            Imagine
          </div>
          <div className="chapter__text">
            <p className="chapter__numeral">Chapter XX · Yours</p>
            <h2 id="ch-finale" className="chapter__headline">
              The next page is blank.
              <br />
              It's yours.
            </h2>
            <p className="chapter__body">
              Every machine in this notebook was once just an idea. For twenty editions TECHNEX has been where young
              minds turn sketches into reality. Bring yours on {site.dateLabel}.
            </p>
            <a className="cta chapter__cta" href={site.registerUrl}>
              <BrushStroke className="cta__brush" />
              <span className="cta__label">
                Register now <IconArrowRight size={20} />
              </span>
            </a>
          </div>
          <div className="chapter__stage">
            <div className="plate plate--blank" aria-hidden="true">
              <svg className="plate__layer" viewBox="0 0 200 180">
                <rect width="200" height="180" fill="url(#parchment)" />
                        <rect x="5" y="5" width="190" height="170" fill="none" stroke="#6b4a26" strokeWidth="0.8" />
                <g stroke="#6b4a26" strokeWidth="0.3" opacity="0.35">
                  {Array.from({ length: 13 }, (_, k) => (
                    <path key={k} d={`M14 ${24 + k * 11} H186`} />
                  ))}
                </g>
                <g
                  color="#3f260f"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  filter="url(#ink-rough)"
                >
                  {drawable(
                    <g>
                      <path d="M40 120 C60 60 90 40 110 70 C126 94 96 112 84 96 C74 82 100 58 130 64 C152 68 160 92 150 110" />
                      <path d="M150 110 L176 34 L182 36 L156 112 Z" />
                    </g>,
                  )}
                </g>
                <text x="100" y="152" textAnchor="middle" className="plate__hand">
                  your idea here
                </text>
              </svg>
            </div>
            <aside className="note" aria-label="Festival details">
              <span className="note__pin" aria-hidden="true" />
              <p className="note__title">{site.festival} 2026–27</p>
              <ul>
                <li>
                  <strong>{site.dateLabel}</strong>
                  <span>{site.college.join(" ")}</span>
                </li>
                <li>
                  <strong>
                    {site.theme} · {site.edition}th Edition
                  </strong>
                  <span>{site.tagline}</span>
                </li>
              </ul>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
