'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/lib/motion';

/** Fades + lifts its children in once, when 12% is visible. */
export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      if (rm) { el.style.opacity = '1'; el.style.transform = 'none'; return; }
      gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', clearProps: 'transform' });
    }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, [rm]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
