'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';
import { PILLARS } from '@/lib/content';
import { useReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

/** Sticky cards that shrink and blur as the next one slides over them. */
export default function Why() {
  const stack = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  useEffect(() => {
    if (rm || !stack.current) return;
    const cards = Array.from(stack.current.querySelectorAll<HTMLElement>('.pillar'));
    const tweens = cards.map((card, i) => {
      const next = cards[i + 1]; if (!next) return null;
      return gsap.to(card, { scale: 1 - (cards.length - 1 - i) * 0.035, opacity: 0.6, filter: 'blur(1.5px)', ease: 'none', scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top+=140', scrub: true } });
    });
    const t = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => { clearTimeout(t); tweens.forEach((tw) => { tw?.scrollTrigger?.kill(); tw?.kill(); }); };
  }, [rm]);

  return (
    <section id="why" className="wrap why">
      <Reveal className="why__head">
        <div className="kicker">Why G-TEC UK</div>
        <h2 className="h2">Four reasons learners choose us.</h2>
      </Reveal>
      <div ref={stack} className="stack">
        {PILLARS.map((p, i) => (
          <div key={p.n} className={`pillar${p.navy ? ' pillar--navy' : ''}`} style={{ top: 96 + i * 18 }}>
            <div>
              <div className="pillar__n">{p.n}</div>
              <h3 className="h3 pillar__title">{p.title}</h3>
              <p className="pillar__desc">{p.desc}</p>
            </div>
            <div className="pillar__img"><Image src={p.img} alt="" fill sizes="(max-width: 700px) 100vw, 520px" /></div>
          </div>
        ))}
      </div>
    </section>
  );
}
