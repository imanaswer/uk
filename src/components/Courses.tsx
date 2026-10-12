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
  const [all, setAll] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const rm = useReducedMotion();
  const first = useRef(true);
  const matches = COURSES.filter((c) => cat === 'All' || c.cat === cat);
  const list = all ? matches : matches.slice(0, 3);

  useEffect(() => {
    const cards = grid.current?.querySelectorAll('.card'); if (!cards?.length) return;
    if (rm) { cards.forEach((c) => ((c as HTMLElement).style.opacity = '1')); return; }
    const opts = { opacity: 1, y: 0, rotateX: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', clearProps: 'transform' };
    gsap.set(cards, { y: 60, rotateX: 8, transformPerspective: 900 });
    const tw = first.current ? gsap.to(cards, { ...opts, scrollTrigger: { trigger: grid.current, start: 'top 82%' } }) : gsap.to(cards, opts);
    first.current = false;
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [cat, all, rm]);

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
            <div className="kicker kicker--coral">Professional courses</div>
            <h2 className="h2" style={{ color: '#fff' }}>Explore our professional courses.</h2>
            <p className="lead lead--light">Build your future with industry-recognised programmes designed to prepare you for today&apos;s most in-demand careers. Generative AI, machine learning, data, cyber security and full-stack development.</p>
          </div>
          <div className="cats" role="tablist" aria-label="Filter courses">
            {CATS.map((c) => <button key={c} role="tab" aria-selected={c === cat} className={c === cat ? 'is-active' : ''} onClick={() => { setCat(c); setAll(false); }}>{c}</button>)}
          </div>
        </Reveal>
        <div ref={grid} className="course-grid">
          {list.map((c) => (
            <article key={c.slug} className="card" onMouseMove={tilt} onMouseLeave={untilt}>
              <div className="card__img"><Image src={c.img} alt="" fill sizes="(max-width: 700px) 100vw, 380px" /></div>
              <div className="card__header">
                <span className="card__cat">{c.cat}</span>
                <h3 className="card__title">{c.title}</h3>
              </div>
              <p className="card__desc">{c.desc}</p>
              <div className="card__meta"><span>{c.duration}</span><span>{c.level}</span></div>
              <div className="card__links">
                <a href={`/courses/${c.slug}`} className="card__link">View course details <span aria-hidden>→</span></a>
                <a href="#enquire" className="card__enq" onClick={() => dispatchEvent(new CustomEvent('pick-course', { detail: c.title }))}>Enquire</a>
              </div>
              <div className="card__glare" aria-hidden />
            </article>
          ))}
        </div>
        {matches.length > 3 && (
          <div className="courses__more">
            <button type="button" className="btn btn--glass" aria-expanded={all} onClick={() => { if (all) grid.current?.scrollIntoView({ block: 'start' }); setAll(!all); }}>
              {all ? 'Show fewer courses' : `View all ${matches.length} courses`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
