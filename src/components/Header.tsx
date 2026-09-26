'use client';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { NAV, SITE } from '@/lib/content';
import { useMagnet, useReducedMotion, useScrollFrame } from '@/lib/motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const magnet = useMagnet(rm);

  useScrollFrame(useCallback(() => {
    const y = scrollY, vh = innerHeight, doc = document.documentElement.scrollHeight - vh;
    if (progress.current) progress.current.style.width = (doc > 0 ? (y / doc) * 100 : 0).toFixed(2) + '%';
    setScrolled(y > 24);
    let a = '';
    for (const [href] of NAV) { const el = document.querySelector(href); if (el && el.getBoundingClientRect().top <= vh * 0.45) a = href; }
    setActive(a);
  }, []));

  const links = NAV.map(([href, label]) => (
    <a key={href} href={href} className={active === href ? 'is-active' : ''} onClick={() => setOpen(false)}>{label}</a>
  ));

  return (
    <>
      <div ref={progress} className="progress" aria-hidden />
      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="wrap header__bar">
          <a href="#top" className="brand" aria-label="G-TEC Education UK, back to top">
            <Image src="/logo.png" alt="G-TEC Education" width={70} height={48} className="brand__logo" style={{ width: "auto", height: 48 }} priority />
            <span className="brand__region">UNITED KINGDOM</span>
          </a>
          <nav className="nav" aria-label="Primary">{links}</nav>
          <div className="header__actions">
            <a href={SITE.phoneHref} className="header__phone">{SITE.phone}</a>
            <a href="#enquire" className="btn btn--primary btn--sm" {...magnet}>Enquire now</a>
            <button className="burger" aria-label="Menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((o) => !o)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
        <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile" hidden={!open}>{links}</nav>
      </header>
    </>
  );
}
