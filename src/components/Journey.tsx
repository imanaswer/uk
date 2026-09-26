'use client';
import { useCallback, useRef } from 'react';
import Image from 'next/image';
import { SCENES } from '@/lib/content';
import { clamp01, smooth, useScrollFrame } from '@/lib/motion';

/** Sticky image frame cross-fades between scenes as the steps scroll past. */
export default function Journey() {
  const root = useRef<HTMLElement>(null);
  useScrollFrame(useCallback(() => {
    const s = root.current; if (!s) return;
    const vh = innerHeight, r = s.getBoundingClientRect(), n = SCENES.length;
    const p = clamp01((vh * 0.55 - r.top) / (r.height - vh * 0.6)) * (n - 1);
    s.querySelectorAll<HTMLElement>('[data-scene]').forEach((el, i) => { const vis = 1 - smooth(0.25, 0.75, Math.abs(p - i)); el.style.opacity = String(vis); el.style.transform = `scale(${1 + (1 - vis) * 0.04})`; });
    s.querySelectorAll<HTMLElement>('[data-step]').forEach((el, i) => { const vis = 1 - smooth(0.3, 0.8, Math.abs(p - i)); el.style.opacity = String(0.3 + 0.7 * vis); el.style.transform = `translateY(${(1 - vis) * 20}px)`; });
    s.querySelectorAll<HTMLElement>('[data-scene-dot] > span').forEach((el, i) => { el.style.width = clamp01(p - i + 1) * 100 + '%'; });
  }, []));

  return (
    <section id="journey" ref={root} className="wrap journey">
      <div className="journey__sticky">
        <div className="kicker">Your journey</div>
        <h2 className="h2">From first call to first day at work.</h2>
        <div className="journey__frame">
          {SCENES.map((sc, i) => (
            <div key={sc.n} className="journey__scene" data-scene={i}>
              <Image src={sc.img} alt="" fill sizes="(max-width: 900px) 100vw, 560px" />
              <div className="journey__scene-shade" />
              <div className="journey__scene-text"><div className="journey__n">{sc.n}</div><div className="journey__t">{sc.title}</div><div className="journey__c">{sc.caption}</div></div>
            </div>
          ))}
          <div className="journey__dots" aria-hidden>{SCENES.map((sc) => <span key={sc.n} data-scene-dot><span /></span>)}</div>
        </div>
      </div>
      <div className="journey__steps">
        {SCENES.map((sc, i) => (
          <div key={sc.n} className="step" data-step={i}>
            <div className="step__head"><span className="step__num">{sc.n}</span><span className="step__kicker">{sc.kicker}</span></div>
            <h3 className="h3">{sc.title}</h3>
            <p className="step__body">{sc.body}</p>
            <div className="tags">{sc.tags.map((t) => <span key={t}>{t}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
