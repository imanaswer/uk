'use client';
import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Reveal from './Reveal';
import { TESTIMONIALS } from '@/lib/content';
import { useReducedMotion } from '@/lib/motion';

export default function Stories() {
  const rm = useReducedMotion();
  const [ref, embla] = useEmblaCarousel({ loop: true, align: 'start' }, rm ? [] : [Autoplay({ delay: 5500, stopOnInteraction: false })]);
  const [idx, setIdx] = useState(0);
  useEffect(() => { if (!embla) return; const on = () => setIdx(embla.selectedScrollSnap()); embla.on('select', on); return () => { embla.off('select', on); }; }, [embla]);

  return (
    <section id="stories" className="stories">
      <div className="wrap section-head">
        <Reveal className="section-head__copy section-head__copy--sm">
          <div className="kicker">Learner stories</div>
          <h2 className="h2">What our learners say.</h2>
          <p className="lead lead--sm">Drag to browse. Sample quotes shown — swap in UK cohort testimonials.</p>
        </Reveal>
        <div className="stories__controls">
          <button className="round-btn" aria-label="Previous" onClick={() => embla?.scrollPrev()}>←</button>
          <button className="round-btn" aria-label="Next" onClick={() => embla?.scrollNext()}>→</button>
          <div className="t-dots">
            {TESTIMONIALS.map((t, i) => <button key={t.name} className={i === idx ? 'is-active' : ''} aria-label={`Go to testimonial ${i + 1}`} onClick={() => embla?.scrollTo(i)} />)}
          </div>
        </div>
      </div>
      <div ref={ref} className="embla">
        <div className="embla__container">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className={`testimonial${i === idx ? ' is-active' : ''}`}>
              <div className="testimonial__q" aria-hidden>“</div>
              <blockquote><p>{t.quote}</p></blockquote>
              <figcaption className="testimonial__who">
                <div className="avatar" aria-hidden>{t.name[0]}</div>
                <div><div className="testimonial__name">{t.name}</div><div className="testimonial__role">{t.role}</div></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
