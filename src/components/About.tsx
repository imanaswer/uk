import Image from 'next/image';
import { BadgeCheck, Handshake, MapPin, UserRound } from 'lucide-react';
import Reveal from './Reveal';
import { SITE } from '@/lib/content';

const POINTS = [
  { icon: MapPin, title: 'Park Royal, London', desc: 'Our regional headquarters sits in the Wembley–Harrow Corridor, at the heart of London’s commercial hub.' },
  { icon: UserRound, title: 'Led by Mr. Shammas Kamaludeen', desc: 'UK operations that bridge local industry demand with high-quality education.' },
  { icon: Handshake, title: 'Universities and employers', desc: 'University collaborations and strategic corporate alliances behind every course.' },
];

export default function About() {
  return (
    <section id="about" className="wrap about">
      <Reveal className="about__grid">
        <div className="about__visual">
          <div className="about__media">
            <Image src="/media/london.jpg" alt="The London skyline along the River Thames" fill sizes="(max-width: 900px) 100vw, 520px" />
            <div className="about__badge about__badge--top"><BadgeCheck size={18} /> UKPRN {SITE.ukprn}</div>
            <div className="about__badge about__badge--bottom">
              <span className="about__badge-k">Regional HQ</span>
              <strong>Park Royal, London</strong>
            </div>
          </div>
          <div className="about__inset">
            <Image src="/media/train.jpg" alt="An instructor teaching a G-TEC class" fill sizes="240px" />
          </div>
        </div>
        <div className="about__body">
          <div className="about__kicker"><span className="brand__dot" /> About G-TEC UK</div>
          <h2 className="h2 h2--md about__title">
            <span className="about__welcome">Welcome to</span>
            <span className="about__brand">
              <span className="about__accent">G-TEC EDUCATION</span>
              <span className="about__uk">UK</span>
            </span>
          </h2>
          <p className="lead">A premier global training network empowering individuals and businesses through industry-aligned technical and professional education. With 23+ countries, 800+ centres and 4.3M+ alumni behind us, G-TEC brings more than two decades of skilling to the United Kingdom.</p>
          <ul className="about__points">
            {POINTS.map((p) => (
              <li key={p.title}>
                <span className="about__icon"><p.icon size={22} strokeWidth={1.75} /></span>
                <div><strong>{p.title}</strong><span>{p.desc}</span></div>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
