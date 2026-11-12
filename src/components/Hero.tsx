import { site } from "../data/site.config";
import { useCountdown } from "../hooks/useCountdown";
import { BrushStroke } from "./BrushDefs";
import { IconArrowRight, IconCalendar } from "./Icons";

const pad = (n: number) => String(n).padStart(2, "0");

function Countdown() {
  const c = useCountdown(site.eventStart);
  if (c.done) {
    return (
      <p className="countdown countdown--live" role="status">
        <span className="live-dot" aria-hidden="true" /> Live now
      </p>
    );
  }
  const units: [number, string][] = [
    [c.days, "Days"],
    [c.hours, "Hours"],
    [c.minutes, "Mins"],
    [c.seconds, "Secs"],
  ];
  return (
    <div className="countdown" role="timer" aria-label={`${c.days} days, ${c.hours} hours and ${c.minutes} minutes to go`}>
      {units.map(([value, label]) => (
        <div className="countdown__tile" key={label} aria-hidden="true">
          <span className="countdown__num" key={value}>
            {pad(value)}
          </span>
          <span className="countdown__label">{label}</span>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const [line1, line2] = site.college;
  return (
    <div className="hero">
      <p className="hero__college reveal" style={{ "--d": "0.1s" }}>
        {line1}
        <br />
        {line2}
      </p>

      <p className="hero__presents reveal" style={{ "--d": "0.25s" }}>
        <span className="rule" aria-hidden="true" /> Presents <span className="rule" aria-hidden="true" />
      </p>

      <h1 className="wordmark" aria-label={`${site.festival} ${site.yearLabel} — ${site.theme}: ${site.tagline}`}>
        <span className="wordmark__text" aria-hidden="true">
          {site.festival}
        </span>
        <span className="wordmark__flick" aria-hidden="true" />
        <span className="wordmark__year reveal" style={{ "--d": "1.1s" }} aria-hidden="true">
          {site.yearLabel}
        </span>
      </h1>

      <div className="edition reveal" style={{ "--d": "1.3s" }}>
        <BrushStroke className="edition__brush" />
        <span className="edition__text">
          {site.edition}
          <sup>th</sup> Edition
        </span>
      </div>

      <p className="hero__theme reveal" style={{ "--d": "1.45s" }}>
        <strong>{site.theme}</strong> — {site.tagline}
      </p>

      <p className="hero__sub reveal" style={{ "--d": "1.55s" }}>
        {site.subline[0]}
        <br />
        {site.subline[1]}
      </p>

      <div className="reveal" style={{ "--d": "1.7s" }}>
        <Countdown />
      </div>

      <p className="hero__date reveal" style={{ "--d": "1.85s" }}>
        <span className="rule rule--long" aria-hidden="true" />
        <IconCalendar size={20} />
        <span>{site.dateLabel}</span>
        <span className="rule rule--long" aria-hidden="true" />
      </p>

      <a className="cta reveal" style={{ "--d": "2s" }} href={site.registerUrl}>
        <BrushStroke className="cta__brush" />
        <span className="cta__label">
          Register now <IconArrowRight size={20} />
        </span>
      </a>
    </div>
  );
}
