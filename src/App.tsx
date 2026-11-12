import { useCallback, useEffect, useState } from "react";
import { Backdrop } from "./components/Backdrop";
import { BrushDefs } from "./components/BrushDefs";
import { CardPanel } from "./components/CardPanel";
import { MobileMenu, SideRail, SocialRail, TopBar } from "./components/Chrome";
import { Hero } from "./components/Hero";
import { Journey } from "./components/Journey";
import { About, Footer, HintBar, ScrollCue } from "./components/Sections";
import { Sketchbook } from "./components/Sketchbook";
import { inventions } from "./data/inventions";
import { site } from "./data/site.config";
import { useAmbientAudio } from "./hooks/useAmbientAudio";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { Multiverse } from "./scene/Multiverse";

export default function App() {
  const reducedMotion = useReducedMotion();
  const sound = useAmbientAudio(site.ambientAudio);
  const [selected, setSelected] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const close = useCallback(() => setSelected(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setSelected((i) => (i === null ? i : (i + dir + inventions.length) % inventions.length)),
    [],
  );
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // subtle parallax on the backdrop
  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5).toFixed(3);
        const y = (e.clientY / window.innerHeight - 0.5).toFixed(3);
        document.documentElement.style.setProperty("--px", x);
        document.documentElement.style.setProperty("--py", y);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", selected !== null || menuOpen);
  }, [selected, menuOpen]);

  return (
    <>
      <BrushDefs />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Backdrop />

      <div id="top" className="shell">
        <TopBar soundOn={sound.enabled} onToggleSound={sound.toggle} onOpenMenu={() => setMenuOpen(true)} />
        <SideRail />
        <SocialRail />

        <main id="main" className="stage-grid">
          <Hero />
          <section className="scene" aria-label="Invention multiverse">
            <Multiverse onSelect={setSelected} reducedMotion={reducedMotion} paused={selected !== null} />
          </section>
        </main>

        <div className="hero-foot">
          <HintBar />
          <ScrollCue />
        </div>
        <Sketchbook />
      </div>

      <Journey />
      <About />
      <Footer />

      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <CardPanel index={selected} onClose={close} onStep={step} reducedMotion={reducedMotion} />
    </>
  );
}
