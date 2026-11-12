import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { inventions } from "../data/inventions";
import { CardFace } from "./CardFace";
import { Ornithopter } from "./Ornithopter";

interface Props {
  onSelect: (index: number) => void;
  reducedMotion: boolean;
  paused: boolean;
}

const N = inventions.length;
const STEP = (Math.PI * 2) / N;
const CARD_W = 118;
const CARD_H = 157;
const TAU = Math.PI * 2;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * The "Interactive 3D Multiverse": Invention Cards orbiting a blueprint core.
 * Rendered as a 2.5D projection (canvas for light + DOM cards for crisp, accessible SVG),
 * so it needs no WebGL and stays light on low-end phones.
 */
export function Multiverse({ onSelect, reducedMotion, paused }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardEls = useRef<(HTMLButtonElement | null)[]>([]);
  const birdRef = useRef<HTMLDivElement>(null);

  const s = useRef({
    rot: Math.PI / 2 - STEP * 0.5,
    rotVel: 0,
    tilt: 0.34,
    zoom: 1,
    target: null as number | null,
    dragging: false,
    moved: 0,
    lastX: 0,
    lastY: 0,
    hovered: -1,
    visible: true,
    w: 0,
    h: 0,
    dpr: 1,
    t: 0,
    last: 0,
    trail: [] as { x: number; y: number }[],
  });

  const flags = useRef({ reducedMotion, paused });
  flags.current = { reducedMotion, paused };

  /* ---------- sizing ---------- */
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;
    const resize = () => {
      const r = stage.getBoundingClientRect();
      const st = s.current;
      st.w = r.width;
      st.h = r.height;
      st.dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(r.width * st.dpr);
      canvas.height = Math.round(r.height * st.dpr);
      st.trail = [];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    const io = new IntersectionObserver(([e]) => {
      s.current.visible = e.isIntersecting;
    });
    io.observe(stage);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  /* ---------- render loop ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const st = s.current;
      const { reducedMotion: rm, paused: pz } = flags.current;
      if (!st.visible || document.hidden || pz || st.w === 0) {
        st.last = now;
        return;
      }
      const dt = Math.min(3, (now - (st.last || now)) / 16.667);
      st.last = now;
      if (!rm) st.t += dt * 16.667;

      // rotation
      if (!st.dragging) {
        if (st.target !== null) {
          const d = st.target - st.rot;
          st.rot += d * 0.12 * dt;
          if (Math.abs(d) < 0.001) st.target = null;
        } else {
          st.rot += st.rotVel * dt;
          st.rotVel *= Math.pow(0.93, dt);
          if (!rm && st.hovered < 0) st.rot += 0.0019 * dt;
        }
      }

      const { w, h, dpr } = st;
      const narrow = w < 560;
      const cx = w * 0.5;
      const cy = h * (narrow ? 0.58 : 0.6);
      const base = Math.min(w * (narrow ? 0.4 : 0.44), h * 0.6);
      const Rx = base * st.zoom;
      const Ry = Rx * st.tilt;
      const cardScale = narrow ? 0.72 : 1;

      /* --- cards --- */
      for (let i = 0; i < N; i++) {
        const el = cardEls.current[i];
        if (!el) continue;
        const th = st.rot + i * STEP;
        const sin = Math.sin(th);
        const cos = Math.cos(th);
        const depth = (sin + 1) / 2;
        const x = cx + Rx * cos;
        const y = cy + Ry * sin;
        const bob = rm ? 0 : Math.sin(st.t * 0.0012 + i * 1.7) * 5;
        const lift = 30 * st.zoom;
        const sc = (0.6 + 0.62 * depth) * st.zoom * cardScale;
        const ry = -cos * 20;
        const rz = Math.sin(i * 2.3) * 5;
        el.style.transform = `translate3d(${(x - CARD_W / 2).toFixed(1)}px, ${(y - CARD_H - lift + bob).toFixed(
          1,
        )}px, 0) scale(${sc.toFixed(3)}) rotateY(${ry.toFixed(1)}deg) rotateZ(${rz.toFixed(1)}deg)`;
        el.style.opacity = (0.4 + 0.6 * depth).toFixed(2);
        el.style.zIndex = String(10 + Math.round(depth * 100));
      }

      /* --- ornithopter --- */
      const phi = rm ? -2.2 : st.t * 0.00032 - 2.2;
      const bx = cx + Rx * 0.6 * Math.cos(phi);
      const by = cy + Ry * 0.6 * Math.sin(phi) - Rx * 0.32 - Math.sin(phi * 2) * 18;
      const prev = st.trail[st.trail.length - 1];
      const heading = prev ? Math.atan2(by - prev.y, bx - prev.x) : 0;
      if (!prev || Math.hypot(bx - prev.x, by - prev.y) > 1.2) {
        st.trail.push({ x: bx, y: by });
        if (st.trail.length > 70) st.trail.shift();
      }
      const bdepth = (Math.sin(phi) + 1) / 2;
      const bird = birdRef.current;
      if (bird) {
        bird.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0) rotate(${(
          (heading * 180) /
          Math.PI
        ).toFixed(1)}deg) scale(${((0.55 + 0.4 * bdepth) * st.zoom * cardScale).toFixed(3)})`;
        bird.style.zIndex = String(10 + Math.round(bdepth * 100));
      }

      /* --- canvas: core, grid, rings, embers, trail --- */
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, Rx * 0.42);
      core.addColorStop(0, "rgba(255,238,210,0.95)");
      core.addColorStop(0.06, "rgba(255,214,160,0.8)");
      core.addColorStop(0.3, "rgba(240,163,92,0.22)");
      core.addColorStop(1, "rgba(240,163,92,0)");
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, st.tilt * 1.6);
      ctx.translate(-cx, -cy);
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(cx, cy, Rx * 0.42, 0, TAU);
      ctx.fill();
      ctx.restore();

      // polar blueprint grid
      ctx.lineWidth = 0.8;
      for (let k = 1; k <= 8; k++) {
        const f = k * 0.075;
        ctx.strokeStyle = `rgba(95,200,255,${(0.28 - k * 0.025).toFixed(3)})`;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Rx * f, Ry * f, 0, 0, TAU);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(95,200,255,0.12)";
      for (let k = 0; k < 24; k++) {
        const a = (k / 24) * TAU + st.rot * 0.25;
        ctx.beginPath();
        ctx.moveTo(cx + Rx * 0.06 * Math.cos(a), cy + Ry * 0.06 * Math.sin(a));
        ctx.lineTo(cx + Rx * 0.62 * Math.cos(a), cy + Ry * 0.62 * Math.sin(a));
        ctx.stroke();
      }

      // rings
      const ringGrad = ctx.createLinearGradient(cx - Rx, cy, cx + Rx, cy);
      ringGrad.addColorStop(0, "rgba(240,190,130,0.9)");
      ringGrad.addColorStop(0.35, "rgba(240,200,150,0.35)");
      ringGrad.addColorStop(0.5, "rgba(95,200,255,0.55)");
      ringGrad.addColorStop(0.7, "rgba(240,200,150,0.35)");
      ringGrad.addColorStop(1, "rgba(240,190,130,0.9)");
      ctx.save();
      ctx.shadowColor = "rgba(240,170,100,0.8)";
      ctx.shadowBlur = 14;
      ctx.strokeStyle = ringGrad;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Rx, Ry, 0, 0, TAU);
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = "rgba(232,200,150,0.22)";
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.ellipse(cx, cy, Rx * 1.1, Ry * 1.12, 0, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([2, 6]);
      ctx.strokeStyle = "rgba(95,200,255,0.3)";
      ctx.beginPath();
      ctx.ellipse(cx, cy, Rx * 0.8, Ry * 0.8, 0, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);

      // travelling light streaks on the main ring
      for (let k = 0; k < 2; k++) {
        const a0 = st.t * 0.0006 + k * Math.PI + st.rot * 0.6;
        ctx.save();
        ctx.shadowColor = k ? "rgba(95,200,255,0.9)" : "rgba(255,200,140,0.9)";
        ctx.shadowBlur = 18;
        for (let j = 0; j < 14; j++) {
          ctx.strokeStyle = k ? `rgba(160,225,255,${(j / 14) * 0.85})` : `rgba(255,224,180,${(j / 14) * 0.9})`;
          ctx.lineWidth = 0.6 + (j / 14) * 2.2;
          ctx.beginPath();
          ctx.ellipse(cx, cy, Rx, Ry, 0, a0 + j * 0.04, a0 + j * 0.04 + 0.05);
          ctx.stroke();
        }
        ctx.restore();
      }

      // embers riding the orbit
      for (let k = 0; k < 46; k++) {
        const a = k * 2.39996 + st.t * 0.00012 * (1 + (k % 3)) + st.rot * 0.5;
        const rr = 0.86 + ((k * 37) % 30) / 100;
        const ex = cx + Rx * rr * Math.cos(a);
        const ey = cy + Ry * rr * Math.sin(a) - ((k * 13) % 24);
        const dep = (Math.sin(a) + 1) / 2;
        ctx.fillStyle = k % 4 === 0 ? `rgba(150,220,255,${0.15 + 0.5 * dep})` : `rgba(255,205,150,${0.15 + 0.55 * dep})`;
        ctx.beginPath();
        ctx.arc(ex, ey, 0.6 + dep * 1.4, 0, TAU);
        ctx.fill();
      }

      // ink trail behind the ornithopter
      const tr = st.trail;
      if (tr.length > 2) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.shadowColor = "rgba(240,170,100,0.7)";
        ctx.shadowBlur = 10;
        for (let k = 1; k < tr.length; k++) {
          const f = k / tr.length;
          ctx.strokeStyle = `rgba(250,${Math.round(190 + 40 * f)},${Math.round(130 + 60 * f)},${(f * 0.75).toFixed(3)})`;
          ctx.lineWidth = 0.5 + f * 3.4;
          ctx.beginPath();
          ctx.moveTo(tr[k - 1].x, tr[k - 1].y);
          ctx.lineTo(tr[k].x, tr[k].y);
          ctx.stroke();
        }
        ctx.restore();
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ---------- drag to rotate ---------- */
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const st = s.current;
      if (!st.dragging) return;
      const dx = e.clientX - st.lastX;
      const dy = e.clientY - st.lastY;
      st.lastX = e.clientX;
      st.lastY = e.clientY;
      st.moved += Math.abs(dx) + Math.abs(dy);
      st.rot -= dx * 0.006;
      st.rotVel = -dx * 0.006;
      st.tilt = clamp(st.tilt + dy * 0.0015, 0.18, 0.56);
    };
    const up = () => {
      s.current.dragging = false;
      stageRef.current?.classList.remove("is-dragging");
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.button !== 0) return;
    const st = s.current;
    st.dragging = true;
    st.moved = 0;
    st.target = null;
    st.lastX = e.clientX;
    st.lastY = e.clientY;
    stageRef.current?.classList.add("is-dragging");
  };

  /* ---------- scroll to zoom (lets the page scroll once a zoom limit is reached) ---------- */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const wheel = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      const st = s.current;
      const next = clamp(st.zoom - e.deltaY * 0.0011, 0.72, 1.32);
      if (Math.abs(next - st.zoom) < 0.0005) return;
      e.preventDefault();
      st.zoom = next;
      st.trail = [];
    };
    stage.addEventListener("wheel", wheel, { passive: false });
    return () => stage.removeEventListener("wheel", wheel);
  }, []);

  /* ---------- keyboard ---------- */
  const bringToFront = useCallback((i: number) => {
    const st = s.current;
    const want = Math.PI / 2 - i * STEP;
    const k = Math.round((st.rot - want) / TAU);
    st.target = want + k * TAU;
    st.rotVel = 0;
  }, []);

  const onKeyDown = (e: ReactKeyboardEvent) => {
    const st = s.current;
    if (e.key === "ArrowLeft") st.rotVel = 0.05;
    else if (e.key === "ArrowRight") st.rotVel = -0.05;
    else if (e.key === "+" || e.key === "=") st.zoom = clamp(st.zoom + 0.08, 0.72, 1.32);
    else if (e.key === "-") st.zoom = clamp(st.zoom - 0.08, 0.72, 1.32);
    else return;
    st.target = null;
    st.trail = [];
  };

  return (
    <div
      ref={stageRef}
      className="multiverse"
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Interactive multiverse of inventions. Use Tab to move between cards, arrow keys to rotate, Enter to open."
    >
      <canvas ref={canvasRef} className="multiverse__canvas" aria-hidden="true" />
      <div className="multiverse__cards">
        {inventions.map((inv, i) => (
          <button
            key={inv.id}
            ref={(el) => {
              cardEls.current[i] = el;
            }}
            type="button"
            className="inv-card"
            aria-label={`${inv.imagined.title}, imagined ${inv.imagined.year}, realised as ${inv.realised.title}. Open card.`}
            onFocus={() => bringToFront(i)}
            onPointerEnter={() => {
              s.current.hovered = i;
            }}
            onPointerLeave={() => {
              s.current.hovered = -1;
            }}
            onClick={(e) => {
              // e.detail === 0 → keyboard activation; never treat it as the end of a drag
              if (e.detail !== 0 && s.current.moved > 8) return;
              onSelect(i);
            }}
          >
            <CardFace inv={inv} index={i} side="imagined" className="inv-card__face inv-card__face--then" />
            <CardFace inv={inv} index={i} side="realised" className="inv-card__face inv-card__face--now" />
            <span className="inv-card__scan" aria-hidden="true" />
          </button>
        ))}
        <div ref={birdRef} className="ornithopter" aria-hidden="true">
          <Ornithopter />
        </div>
      </div>
    </div>
  );
}
