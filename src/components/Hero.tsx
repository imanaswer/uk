'use client';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { STATS, TICKER, WORDS } from '@/lib/content';
import { smooth, useMagnet, useReducedMotion, useScrollFrame } from '@/lib/motion';
import gsap from 'gsap';
import NetworkBackground from './NetworkBackground';

function useCycle(n: number, ms: number, rm: boolean) {
  const [i, set] = useState(0);
  useEffect(() => { if (rm) return; const t = setInterval(() => set((v) => (v + 1) % n), ms); return () => clearInterval(t); }, [n, ms, rm]);
  return i;
}

export default function Hero() {
  const rm = useReducedMotion();
  const magnet = useMagnet(rm);
  const section = useRef<HTMLElement>(null), content = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (rm || !titleRef.current) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(titleRef.current.querySelectorAll('.char-reveal'), 
      { opacity: 0, y: 60, rotateX: -40, scale: 0.9 }, 
      { opacity: 1, y: 0, rotateX: 0, scale: 1, duration: 1.2, stagger: 0.04, ease: "power4.out" }
    )
    .fromTo([subtitleRef.current, ctaRef.current], 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }, "-=0.8"
    );
  }, [rm]);

  const word = useCycle(WORDS.length, 2600, rm);

  const [counts, setCounts] = useState(STATS.map(() => 0));
  useEffect(() => {
    const t0 = performance.now(), ease = (t: number) => 1 - Math.pow(1 - t, 3); let raf = 0;
    const step = (now: number) => { const p = Math.min(1, (now - t0) / 1800); setCounts(STATS.map((s) => s.value * ease(p))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, []);

  useScrollFrame(useCallback(() => {
    const s = section.current, ct = content.current; if (!s || !ct) return;
    const r = s.getBoundingClientRect(); const p = smooth(0, 1, -r.top / (r.height * 0.75));
    ct.style.opacity = String(1 - p); ct.style.transform = `translateY(${-p * 80}px) scale(${1 - p * 0.06})`;
  }, []));

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (rm) return; const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    const mx = x - 0.5, my = y - 0.5;
    if (card.current) card.current.style.transform = `perspective(1200px) rotateY(${mx * -6}deg) rotateX(${my * 6}deg)`;
    if (floatA.current) floatA.current.style.transform = `translateY(${my * -14}px)`;
    if (floatB.current) floatB.current.style.transform = `translateY(${my * 18}px)`;
  };

  return (
    <section id="top" ref={section} className="hero" style={{ display: 'flex', flexDirection: 'column', position: 'relative', paddingTop: '120px', paddingBottom: '60px' }}>
      <NetworkBackground />
      <div className="hero__shade" style={{ background: 'radial-gradient(circle at center, rgba(0,34,79,0) 0%, rgba(0,34,79,0.95) 100%)', zIndex: 1, pointerEvents: 'none' }} />
      
      <div ref={content} className="wrap hero__content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '1000px', zIndex: 10 }}>
        <div className="hero__badge" style={{ marginBottom: '2rem' }}><span className="hero__new">NEW</span>Now in London · Wembley–Harrow Corridor</div>
        
        <h1 className="hero__title" ref={titleRef} style={{ fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 1.05, letterSpacing: '-0.04em', textWrap: 'balance', textShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <span className="char-reveal" style={{ display: 'inline-block' }}>The</span>{' '}
          <span className="char-reveal" style={{ display: 'inline-block' }}>world&apos;s</span>{' '}
          <span className="char-reveal" style={{ display: 'inline-block' }}>largest</span>{' '}
          <span className="char-reveal" style={{ display: 'inline-block' }}>IT</span>{' '}
          <span className="char-reveal" style={{ display: 'inline-block' }}>education</span>{' '}
          <span className="char-reveal" style={{ display: 'inline-block' }}>network,</span>{' '}
          <span className="char-reveal" style={{ display: 'inline-block' }}>now</span>{' '}
          <span className="char-reveal" style={{ display: 'inline-block' }}>training</span>{' '}
          <span className="hero__word char-reveal" style={{ display: 'inline-block' }}><span key={word}>{WORDS[word]}</span></span>
        </h1>
        
        <p className="hero__lead" ref={subtitleRef} style={{ fontSize: 'clamp(18px, 2vw, 24px)', maxWidth: '700px', margin: '2rem auto', color: 'rgba(255,255,255,0.9)' }}>
          Industry-aligned technical and professional programmes from a network spanning 23+ countries, 800+ centres and 4.3 million alumni.
        </p>
        
        <div className="hero__cta" ref={ctaRef} style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '1rem' }}>
          <a href="#courses" className="btn btn--primary btn--lg" {...magnet} style={{ fontSize: '18px', padding: '20px 40px' }}>Explore courses</a>
          <a href="#journey" className="btn btn--ghost" style={{ fontSize: '18px', padding: '20px 40px' }}><span className="btn__play" aria-hidden>▶</span>See how it works</a>
        </div>
      </div>
      
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', zIndex: 10, marginTop: '40px' }}>
        <dl className="hero__stats" style={{ display: 'flex', gap: '60px', borderTop: 'none', padding: 0, margin: 0, background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', padding: '24px 48px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.15)' }}>
          {STATS.slice(0, 3).map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center' }}><dd className="stat__v" style={{ fontSize: '32px', color: '#fff' }}>{s.format(counts[i])}</dd><dt className="stat__l" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.label}</dt></div>
          ))}
        </dl>
      </div>
    </section>
  );
}
