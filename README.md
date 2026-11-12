# TECHNEX 2026–27 · INKARNATE — Where Imagination Takes Form

Landing page for the 20th edition of TECHNEX, St. Vincent Pallotti College of Engineering & Technology, Nagpur.
Built with Vite, React 19 and TypeScript. The only runtime dependencies are React and React DOM.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

Requires Node 18+.

## Where to change things

| What | Where |
| --- | --- |
| Event date (countdown), date label, register/admin links, nav, social links | `src/data/site.config.ts` |
| Invention cards: titles, years, stories, related events | `src/data/inventions.ts` |
| Scroll chapters: words, headlines, events, light colour | `src/data/chapters.ts` |
| Card line-art (sketch + blueprint drawings) | `src/scene/art.tsx` |
| Card layout (both faces) | `src/scene/CardFace.tsx` |
| Colours, fonts, spacing | `:root` variables at the top of `src/styles.css` |
| Ambient sound | drop a file at `public/audio/ambient.mp3`. Without it, a soft synthesized hum plays instead (off by default) |

The countdown target is `2026-12-19T09:00:00+05:30` (9:00 AM IST). The "Make it real at TECHNEX" event names on each card are placeholders. Replace them with the real event list.

## How it's built

- **Hero** (`components/Hero.tsx`): brush wordmark with an ink-reveal mask, a brush-stroke "20th Edition" banner, an octagonal countdown and a brush CTA.
- **Interactive 3D Multiverse** (`scene/Multiverse.tsx`): ten Invention Cards orbit a blueprint core. It's a 2.5D projection (canvas for the light + DOM/SVG cards), so it needs no WebGL and stays light on phones.
  - Drag to rotate (vertical drag tilts the orbit). Scroll to zoom (the page scrolls normally once a zoom limit is reached). Click a card to open it.
  - Hover a card to see its blueprint "form" scan over the sketch. Opening a card plays the full **ink → form** transformation.
  - Keyboard: Tab through cards (each one swings to the front), arrow keys rotate, Enter opens, Esc closes, ←/→ step between cards in the panel.
  - Rendering pauses when the scene is off-screen, the tab is hidden or a card is open.
- **The Notebook journey** (`components/Journey.tsx`, data in `data/chapters.ts`): a pinned, scroll-driven section with six chapters (Flight, Motion, Vision, Thought, Power, Form) and a finale ("Chapter XX: Yours"). Each new chapter slides over the last like a turning page. As you scroll, the ink sketch draws itself and becomes a blueprint, a giant outlined word fills with gold, and a pinned note shows that chapter's TECHNEX events. A chapter index on the left jumps to any chapter. **Event names, times and venues in `chapters.ts` are placeholders.**
- **Backdrop** (`components/Backdrop.tsx`): ink-wash strokes, sweeping light arcs, drifting blueprint sheets, a wireframe skyline and paper grain, with gentle mouse parallax.
- **Below the fold** (`components/Sections.tsx`): Past → Present → Future, and a 20-edition legacy track.
- Respects `prefers-reduced-motion`. Responsive down to 360px: rails collapse into a menu and the scene stacks under the hero.

## Swapping in final artwork

- **Wordmark:** the TECHNEX title uses the Google font *Permanent Marker* with a dry-brush SVG filter. To use the real logo, replace the `.wordmark__text` span in `Hero.tsx` with an `<img src="/brand/technex-wordmark.svg">`.
- **Card art:** all drawings are original SVG line-art. To use rendered images, swap the `{thenArt[inv.id]}` / `{nowArt[inv.id]}` groups in `CardFace.tsx` for `<image href="/cards/{id}-then.png" … />`.

`docs/` holds the INKARNATE creative brief and the original layout reference.
