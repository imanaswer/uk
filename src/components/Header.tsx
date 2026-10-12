'use client';
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Phone } from 'lucide-react';
import { NAV, SITE } from '@/lib/content';
import { useMagnet, useReducedMotion, useScrollFrame } from '@/lib/motion';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [raised, setRaised] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const path = usePathname();
  const magnet = useMagnet(rm);

  useScrollFrame(useCallback(() => {
    const y = scrollY, vh = innerHeight, doc = document.documentElement.scrollHeight - vh;
    if (progress.current) progress.current.style.width = (doc > 0 ? (y / doc) * 100 : 0).toFixed(2) + '%';
    const intro = document.querySelector('main > :first-child');
    setScrolled(intro ? intro.getBoundingClientRect().bottom <= 80 : y > 24);
    setRaised(y > 24);
    let a = '';
    for (const [href] of NAV) { if (!href.startsWith('#')) continue; const el = document.querySelector(href); if (el && el.getBoundingClientRect().top <= vh * 0.45) a = href; }
    setActive(a);
  }, []));

  const links = NAV.map(([href, label]) => (
    <a key={href} href={href.startsWith('#') ? `/${href}` : href} className={active === href || path === href ? 'is-active' : ''} onClick={() => setOpen(false)}>{label}</a>
  ));

  return (
    <>
      <div ref={progress} className="progress" aria-hidden />
      <header className={`header${scrolled ? ' is-scrolled' : raised ? ' is-raised' : ''}`}>
        <div className="wrap header__bar">
          <a href="/#top" className="brand" aria-label="G-TEC EDUCATION UK, back to top">
            <Image src={scrolled ? "/logo-mark.png" : "/logo-mark-light.png"} alt="G-TEC EDUCATION" width={79} height={48} className="brand__logo" style={{ width: "auto", height: 48 }} priority />
            <span className="brand__region"><span className="brand__dot" aria-hidden />United Kingdom</span>
          </a>
          <nav className="nav" aria-label="Primary">{links}</nav>
          <div className="header__actions">
            <a href={SITE.phoneHref} className="header__phone" aria-label={`Call us on ${SITE.phone}`}><span className="header__phone-icon"><Phone size={15} strokeWidth={2} /></span><span className="header__phone-num">{SITE.phone}</span></a>
            <a href={path === '/' ? '#enquire' : '/#enquire'} className="btn btn--primary btn--sm" {...magnet}>Enquire now <ArrowUpRight size={16} strokeWidth={2.25} /></a>
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
