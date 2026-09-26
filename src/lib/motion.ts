'use client';
import { useEffect, useSyncExternalStore, type MouseEvent } from 'react';

export const smooth = (a: number, b: number, x: number) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const mq = () => matchMedia('(prefers-reduced-motion: reduce)');
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => { const m = mq(); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); },
    () => mq().matches,
    () => false,
  );
}

/** Buttons that lean toward the cursor. Spread onto any element. */
export function useMagnet(rm: boolean) {
  return {
    onMouseMove(e: MouseEvent<HTMLElement>) {
      if (rm) return; const el = e.currentTarget, r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
    },
    onMouseLeave(e: MouseEvent<HTMLElement>) { e.currentTarget.style.transform = ''; },
  };
}

/** rAF-throttled scroll callback, also fired on resize and mount. */
export function useScrollFrame(fn: () => void) {
  useEffect(() => {
    let queued = false;
    const onScroll = () => { if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; fn(); }); };
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); fn();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, [fn]);
}
