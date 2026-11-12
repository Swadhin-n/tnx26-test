import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "technex:sound";

function readPref(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

function writePref(on: boolean) {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    /* storage unavailable — ignore */
  }
}

interface Synth {
  ctx: AudioContext;
  master: GainNode;
}

/** A soft, low "workshop hum": two detuned sines through a low-pass filter. */
function createSynth(): Synth | null {
  const Ctor: typeof AudioContext | undefined =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.value = 0;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 420;
  filter.connect(master);
  master.connect(ctx.destination);

  [55, 82.4, 110.3].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = i === 2 ? "triangle" : "sine";
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.value = i === 2 ? 0.05 : 0.12;
    // slow shimmer
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.07 + i * 0.03;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.04;
    lfo.connect(lfoGain).connect(g.gain);
    osc.connect(g).connect(filter);
    osc.start();
    lfo.start();
  });
  return { ctx, master };
}

/**
 * Ambient sound, OFF by default. Plays `src` if it exists, otherwise a synthesized drone.
 * Browsers only allow audio after a user gesture, so the first "on" must come from a click.
 */
export function useAmbientAudio(src: string) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<Synth | null>(null);
  const modeRef = useRef<"file" | "synth" | null>(null);

  const start = useCallback(async () => {
    if (!modeRef.current) {
      try {
        const res = await fetch(src, { method: "HEAD" });
        const type = res.headers.get("content-type") ?? "";
        modeRef.current = res.ok && type.startsWith("audio") ? "file" : "synth";
      } catch {
        modeRef.current = "synth";
      }
    }
    if (modeRef.current === "file") {
      if (!audioRef.current) {
        audioRef.current = new Audio(src);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.35;
      }
      await audioRef.current.play().catch(() => undefined);
    } else {
      if (!synthRef.current) synthRef.current = createSynth();
      const s = synthRef.current;
      if (!s) return;
      await s.ctx.resume();
      s.master.gain.setTargetAtTime(0.5, s.ctx.currentTime, 0.8);
    }
  }, [src]);

  const stop = useCallback(() => {
    audioRef.current?.pause();
    const s = synthRef.current;
    if (s) s.master.gain.setTargetAtTime(0, s.ctx.currentTime, 0.25);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    writePref(next);
    if (next) void start();
    else stop();
  }, [enabled, start, stop]);

  // If the visitor previously turned sound on, resume on their first interaction.
  useEffect(() => {
    if (!readPref()) return;
    const resume = () => {
      setEnabled(true);
      void start();
    };
    window.addEventListener("pointerdown", resume, { once: true });
    return () => window.removeEventListener("pointerdown", resume);
  }, [start]);

  useEffect(
    () => () => {
      audioRef.current?.pause();
      void synthRef.current?.ctx.close();
    },
    [],
  );

  return { enabled, toggle };
}
