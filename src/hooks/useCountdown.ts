import { useEffect, useState } from "react";

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function compute(targetMs: number): Countdown {
  const diff = Math.max(0, targetMs - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    done: diff === 0,
  };
}

/** Ticks once per second towards an ISO date (include the timezone offset). */
export function useCountdown(iso: string): Countdown {
  const target = new Date(iso).getTime();
  const [value, setValue] = useState<Countdown>(() => compute(target));

  useEffect(() => {
    setValue(compute(target));
    const id = window.setInterval(() => setValue(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return value;
}
