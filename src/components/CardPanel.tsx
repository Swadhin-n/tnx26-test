import { useEffect, useRef, useState } from "react";
import { inventions } from "../data/inventions";
import { CardFace } from "../scene/CardFace";
import { IconArrowRight, IconClose } from "./Icons";

type Phase = "imagined" | "forming" | "realised";

interface Props {
  index: number | null;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
  reducedMotion: boolean;
}

/** Opens a card: the ink sketch materialises into its realised invention. */
export function CardPanel({ index, onClose, onStep, reducedMotion }: Props) {
  const open = index !== null;
  const inv = open ? inventions[index] : null;
  const [run, setRun] = useState(0);
  // phase is tied to the card being shown, so switching cards always restarts at "imagined"
  const key = `${index}-${run}`;
  const [seq, setSeq] = useState<{ key: string; phase: Phase }>({ key: "", phase: "imagined" });
  const phase: Phase = seq.key === key ? seq.phase : reducedMotion ? "realised" : "imagined";
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // run the ink → form sequence whenever a card opens (or replays)
  useEffect(() => {
    if (!open) return;
    if (reducedMotion) return;
    const a = window.setTimeout(() => setSeq({ key, phase: "forming" }), 700);
    const b = window.setTimeout(() => setSeq({ key, phase: "realised" }), 2200);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [open, key, reducedMotion]);

  // focus management + keyboard
  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      returnFocus.current?.focus?.();
    };
  }, [open, onClose, onStep]);

  if (!inv || index === null) return null;

  return (
    <div className="panel-wrap" onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="panel" role="dialog" aria-modal="true" aria-labelledby="panel-title">
        <button ref={closeRef} type="button" className="icon-btn panel__close" onClick={onClose} aria-label="Close">
          <IconClose size={18} />
        </button>

        <div className={`panel__card phase-${phase}`} key={key}>
          <CardFace inv={inv} index={index} side="imagined" className="panel__face panel__face--then" />
          <CardFace inv={inv} index={index} side="realised" className="panel__face panel__face--now" />
          <span className="panel__scan" aria-hidden="true" />
        </div>

        <div className="panel__info">
          <p className="panel__kicker">
            Folio {String(index + 1).padStart(2, "0")} / {String(inventions.length).padStart(2, "0")}
          </p>
          <h2 id="panel-title" className="panel__title">
            <span className="panel__then">{inv.imagined.title}</span>
            <IconArrowRight size={22} aria-hidden="true" />
            <span className="panel__now">{inv.realised.title}</span>
          </h2>
          <p className="panel__meta">
            Imagined {inv.imagined.year} · {inv.imagined.by}
          </p>
          <p className="panel__story">{inv.story}</p>

          <div className="panel__events">
            <p className="panel__events-label">Make it real at TECHNEX</p>
            <ul>
              {inv.atTechnex.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>

          <div className="panel__actions">
            <button type="button" className="ghost-btn" onClick={() => onStep(-1)}>
              ← Previous
            </button>
            <button type="button" className="ghost-btn" onClick={() => setRun((r) => r + 1)}>
              Replay transformation
            </button>
            <button type="button" className="ghost-btn" onClick={() => onStep(1)}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
