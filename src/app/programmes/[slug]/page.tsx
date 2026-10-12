import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import Enquire from '@/components/Enquire';
import { PROGRAMMES, TIERS, domainSlug } from '@/lib/programmes';
import { SITE } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => PROGRAMMES.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROGRAMMES.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title} · ${SITE.name}`, description: p.objective, alternates: { canonical: `/programmes/${p.slug}` } };
}

export default async function ProgrammePage({ params }: Props) {
  const { slug } = await params;
  const p = PROGRAMMES.find((x) => x.slug === slug);
  if (!p) notFound();
  const sameDomain = PROGRAMMES.filter((x) => x.domain === p.domain);
  const step = TIERS.findIndex((t) => t.id === p.tier);
  return (
    <div className="page">
      <Header />
      <main>
        <section className={`page-intro page-intro--glow pg-hero pg-hero--${p.tier}`}>
          <div className="wrap course-hero">
          <Reveal>
            <a href={`/programmes?domain=${domainSlug(p.domain)}`} className="pg-hero__crumb">{p.domain}</a>
            <div className="kicker kicker--coral">{p.level}</div>
            <h1 className="h2 page-intro__title">{p.subject}</h1>
            <p className="lead lead--light pg-hero__lead">{p.objective}</p>
            <div className="course-detail__ctas">
              <a href="#enquire" className="btn btn--primary">Enquire about this programme <ArrowUpRight size={16} /></a>
              <Link href="/programmes" className="btn btn--glass">All programmes</Link>
            </div>
          </Reveal>
          <div className="course-hero__img"><Image src={p.img} alt="" fill sizes="(max-width: 900px) 100vw, 480px" priority /></div>
          </div>
          <div className="wrap">
            <dl className="course-facts">
              <div><dt>Level</dt><dd>{p.level}</dd></div>
              <div><dt>Duration</dt><dd>{p.duration}</dd></div>
              <div><dt>Modules</dt><dd>{p.modules.length}</dd></div>
              <div><dt>Delivery</dt><dd>Blended &amp; practical</dd></div>
            </dl>
          </div>
        </section>

        <section className="course-detail">
          <div className="wrap course-detail__grid">
            <Reveal>
              <div className="kicker">Overview</div>
              <h2 className="h3">How the programme works</h2>
              <p className="lead lead--sm course-detail__p">{p.outline}</p>
              <div className="pg-note"><strong>Delivery approach</strong>{p.delivery}</div>
            </Reveal>
            <Reveal>
              <div className="kicker">Curriculum</div>
              <h2 className="h3">Modules</h2>
              <ol className="pg-modules">
                {p.modules.map((m, i) => (
                  <li key={m.title}>
                    <span className="pg-modules__n">{String(i + 1).padStart(2, '0')}</span>
                    <div><strong>{m.title}</strong>{m.desc && <p>{m.desc}</p>}</div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section className="pg-outcomes">
          <div className="wrap">
            <Reveal>
              <div className="kicker kicker--coral">Learning outcomes</div>
              <h2 className="h3">By the end, you will be able to</h2>
              <ul className="pg-outcomes__list">
                {p.outcomes.map((o) => <li key={o}><span className="pg-outcomes__tick"><Check size={16} strokeWidth={3} /></span>{o}</li>)}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="course-detail">
          <div className="wrap">
            <Reveal>
              <div className="kicker">Your pathway</div>
              <h2 className="h3">Progress through {p.domain}</h2>
              <div className="pathway">
                {TIERS.map((t, i) => (
                  <div key={t.id} className={`pathway__col${i === step ? ' is-current' : ''}`}>
                    <div className="pathway__head"><span>Step {i + 1}</span><strong>{t.name}</strong><em>{t.duration}</em></div>
                    <ul>
                      {sameDomain.filter((x) => x.tier === t.id).map((x) => (
                        <li key={x.slug}>{x.slug === p.slug ? <span aria-current="page">{x.subject}</span> : <a href={`/programmes/${x.slug}`}>{x.subject}</a>}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <Enquire initialCourse={p.title} />
      </main>
      <Footer />
    </div>
  );
}
