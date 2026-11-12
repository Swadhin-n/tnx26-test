import { site } from "../data/site.config";
import { IconChevronsDown, IconCompass, IconMouse, IconPointer, IconZoom } from "./Icons";

export function HintBar() {
  return (
    <div className="hintbar" role="note">
      <span className="hintbar__title">
        <IconCompass size={22} /> Interactive 3D Multiverse
      </span>
      <span className="hintbar__sep" aria-hidden="true" />
      <span className="hintbar__item">
        <IconMouse size={18} /> Drag to rotate
      </span>
      <span className="hintbar__sep" aria-hidden="true" />
      <span className="hintbar__item">
        <IconZoom size={18} /> Scroll to zoom
      </span>
      <span className="hintbar__sep" aria-hidden="true" />
      <span className="hintbar__item">
        <IconPointer size={18} /> Click cards to explore
      </span>
    </div>
  );
}

export function ScrollCue() {
  return (
    <a className="scroll-cue" href="#journey" aria-label="Scroll to the notebook journey">
      <IconChevronsDown size={28} />
    </a>
  );
}

const eras = [
  {
    tag: "Past",
    title: "The ideas that changed humanity",
    body: "Notebooks of flying machines, brass calculating engines and jars that caught lightning. Every one began as a sketch nobody else believed in.",
  },
  {
    tag: "Present",
    title: "The innovations shaping our world",
    body: "Aircraft, prosthetics, imaging, intelligent machines. Imagination, experimented into form and engineered until it worked.",
  },
  {
    tag: "Future",
    title: "The possibilities waiting to be created",
    body: "The next sketch is yours. TECHNEX is where it leaves the page: prototyped, tested and built in front of everyone.",
  },
];

/** Below-the-fold: the INKARNATE philosophy and the 20-edition legacy. */
export function About() {
  return (
    <section id="about" className="about" aria-labelledby="about-title">
      <p className="eyebrow">{site.theme}</p>
      <h2 id="about-title" className="about__title">
        Every innovation was once an <em>imagination.</em>
      </h2>
      <div className="eras">
        {eras.map((e, i) => (
          <article key={e.tag} className="era">
            <span className="era__index">0{i + 1}</span>
            <p className="era__tag">{e.tag}</p>
            <h3>{e.title}</h3>
            <p>{e.body}</p>
          </article>
        ))}
      </div>

      <div id="legacy" className="legacy" aria-label="Twenty editions of TECHNEX">
        <p className="legacy__label">Two decades · twenty editions</p>
        <ol className="legacy__track">
          {Array.from({ length: site.edition }, (_, i) => (
            <li key={i} className={i === site.edition - 1 ? "is-now" : undefined}>
              <span className="sr-only">Edition {i + 1}</span>
              <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ol>
        <p className="legacy__note">
          Twenty years of young minds turning sketches into machines. The 20th edition isn't an anniversary. It's
          what comes next.
        </p>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="footer">
      <p>
        {site.festival} {site.yearLabel} · {site.theme} — {site.tagline}
      </p>
      <p>
        {site.college.join(" ")} · Celebrating {site.edition} editions of innovation
      </p>
    </footer>
  );
}
