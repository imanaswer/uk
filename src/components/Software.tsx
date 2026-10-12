import { AppWindow, ArrowUpRight, BrainCircuit, Cloud, Smartphone } from 'lucide-react';
import Reveal from './Reveal';
import { SITE } from '@/lib/content';

const SERVICES = [
  { icon: AppWindow, title: 'Web apps & platforms', desc: 'Customer portals, dashboards, booking systems and internal tools, built to scale.' },
  { icon: Smartphone, title: 'Mobile apps', desc: 'iOS and Android apps your customers actually keep on their home screen.' },
  { icon: BrainCircuit, title: 'AI & automation', desc: 'Chatbots, AI agents and workflow automation that take the busywork off your team.' },
  { icon: Cloud, title: 'Cloud & DevOps', desc: 'Migrations, CI/CD and infrastructure that stays up, ships fast and keeps costs in check.' },
];
const STEPS = ['Discover', 'Design', 'Build', 'Launch & support'];
const mail = `mailto:${SITE.email}?subject=${encodeURIComponent('Software project enquiry')}`;

export default function Software() {
  return (
    <section id="software" className="soft">
      <div className="soft__glow" aria-hidden />
      <div className="wrap">
        <div className="soft__top">
          <Reveal className="soft__copy">
            <div className="kicker kicker--coral">G-TEC Software Studio</div>
            <h2 className="h2 soft__title">We don&apos;t just teach tech. <span className="soft__grad">We build it.</span></h2>
            <p className="lead lead--light">Need software for your business? The same engineers who train London&apos;s next developers design, build and run custom software for startups, SMEs and enterprises.</p>
            <div className="soft__ctas">
              <a href={mail} className="btn btn--primary">Start a project <ArrowUpRight size={16} /></a>
              <a href={SITE.phoneHref} className="btn btn--glass">Call {SITE.phone}</a>
            </div>
          </Reveal>
          <Reveal className="soft__code">
            <div className="soft__bar" aria-hidden><i /><i /><i /><span>your-next-product.ts</span></div>
            <pre aria-hidden>
              <code>
                <span className="t-k">const</span> project = <span className="t-k">await</span> gtec.<span className="t-f">build</span>({'{'}{'\n'}
                {'  '}idea: <span className="t-s">&apos;your big idea&apos;</span>,{'\n'}
                {'  '}stack: [<span className="t-s">&apos;Next.js&apos;</span>, <span className="t-s">&apos;AI&apos;</span>, <span className="t-s">&apos;Cloud&apos;</span>],{'\n'}
                {'  '}team: <span className="t-s">&apos;London + global&apos;</span>,{'\n'}
                {'}'});{'\n'}
                {'\n'}
                project.<span className="t-f">launch</span>(); <span className="t-c">{'// '}live, tested, supported</span>
                <span className="soft__caret" />
              </code>
            </pre>
          </Reveal>
        </div>
        <div className="soft__grid">
          {SERVICES.map((s) => (
            <Reveal key={s.title} className="soft__card">
              <span className="soft__icon"><s.icon size={22} strokeWidth={1.75} /></span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </Reveal>
          ))}
        </div>
        <ol className="soft__steps">
          {STEPS.map((s, i) => <li key={s}><span>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}
        </ol>
      </div>
    </section>
  );
}
