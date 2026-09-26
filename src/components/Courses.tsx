'use client';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';
import { CATS, COURSES } from '@/lib/content';
import { useReducedMotion } from '@/lib/motion';

gsap.registerPlugin(ScrollTrigger);

export default function Courses() {
  const [cat, setCat] = useState('All');
  const grid = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const first = useRef(true);
  const list = COURSES.filter((c) => cat === 'All' || c.cat === cat);

  useEffect(() => {
    const cards = grid.current?.querySelectorAll('.card'); if (!cards?.length) return;
    if (rm) { cards.forEach((c) => ((c as HTMLElement).style.opacity = '1')); return; }
    const opts = { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'transform' };
    gsap.set(cards, { y: 60, rotateX: 8, transformPerspective: 900 });
    const tw = first.current ? gsap.to(cards, { ...opts, scrollTrigger: { trigger: grid.current, start: 'top 82%' } }) : gsap.to(cards, opts);
    first.current = false;
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [cat, rm]);

  const tilt = (e: MouseEvent<HTMLElement>) => {
    if (rm) return; const el = e.currentTarget, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.transition = 'box-shadow .25s'; el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-6px)`; el.style.boxShadow = '0 30px 50px -24px rgba(0,65,137,.45)';
    const g = el.querySelector<HTMLElement>('.card__glare'); if (g) { g.style.setProperty('--gx', `${x * 100}%`); g.style.setProperty('--gy', `${y * 100}%`); g.style.opacity = '1'; }
  };
  const untilt = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget; el.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .25s'; el.style.transform = ''; el.style.boxShadow = '';
    const g = el.querySelector<HTMLElement>('.card__glare'); if (g) g.style.opacity = '0';
  };

  return (
    <section id="courses" className="courses">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="section-head__copy">
            <div className="kicker">Professional courses</div>
            <h2 className="h2">Built for the careers employers are hiring for now.</h2>
            <p className="lead">Industry-recognised programmes with live projects, real tools and certification recognised across the G-TEC network.</p>
          </div>
          <div className="cats" role="tablist" aria-label="Filter courses">
            {CATS.map((c) => <button key={c} role="tab" aria-selected={c === cat} className={c === cat ? 'is-active' : ''} onClick={() => setCat(c)}>{c}</button>)}
          </div>
        </Reveal>
        <div ref={grid} className="course-grid">
          {list.map((c) => (
            <article key={c.slug} className="card" onMouseMove={tilt} onMouseLeave={untilt}>
              <div className="card__media">
                <Image src={c.img} alt="" fill sizes="(max-width: 700px) 100vw, 380px" />
                <span className="card__cat">{c.cat}</span>
              </div>
              <div className="card__body">
                <h3 className="card__title">{c.title}</h3>
                <p className="card__desc">{c.desc}</p>
                <div className="card__meta"><span>{c.duration}</span><span>{c.level}</span></div>
                <a href="#enquire" className="card__link" onClick={() => dispatchEvent(new CustomEvent('pick-course', { detail: c.title }))}>
                  Enquire about this course <span aria-hidden>→</span>
                </a>
              </div>
              <div className="card__glare" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
