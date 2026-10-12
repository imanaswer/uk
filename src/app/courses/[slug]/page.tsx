import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight, Download } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import Enquire from '@/components/Enquire';
import { FOCUS_COURSES, SITE } from '@/lib/content';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => FOCUS_COURSES.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = FOCUS_COURSES.find((x) => x.slug === slug);
  if (!c) return {};
  return { title: `${c.title} · ${SITE.name}`, description: c.blurb, alternates: { canonical: `/courses/${c.slug}` } };
}

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const c = FOCUS_COURSES.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <div className="page">
      <Header />
      <main>
        <section className="page-intro">
          <div className="wrap course-hero">
            <Reveal>
              <div className="kicker kicker--coral">{c.level} · {c.kicker}</div>
              <h1 className="h2 page-intro__title">{c.title}</h1>
              <p className="lead lead--light">{c.blurb}</p>
              <div className="course-detail__ctas">
                <a href="#enquire" className="btn btn--primary">Enquire about this course <ArrowUpRight size={16} /></a>
                <a href={`/course/${encodeURIComponent(c.pdf)}`} className="btn btn--ghost" download><Download size={16} /> Download brochure</a>
              </div>
            </Reveal>
            <div className="course-hero__img"><Image src={`/media/${c.img}.jpg`} alt="" fill sizes="(max-width: 900px) 100vw, 480px" priority /></div>
          </div>
          <div className="wrap">
            <dl className="course-facts">
              <div><dt>Duration</dt><dd>{c.duration}</dd></div>
              <div><dt>Level</dt><dd>{c.level}</dd></div>
              <div><dt>Modules</dt><dd>{c.modules.length}</dd></div>
              <div><dt>Format</dt><dd>Labs, projects &amp; assessments</dd></div>
            </dl>
          </div>
        </section>
        <section className="course-detail">
          <div className="wrap course-detail__grid">
            <Reveal>
              <div className="kicker">Overview</div>
              <h2 className="h3">About the course</h2>
              {c.intro.map((p) => <p key={p} className="lead lead--sm course-detail__p">{p}</p>)}
            </Reveal>
            <Reveal>
              <div className="kicker">Curriculum</div>
              <h2 className="h3">What you&apos;ll learn</h2>
              <ol className="course-detail__modules">
                {c.modules.map((m) => <li key={m}>{m}</li>)}
              </ol>
            </Reveal>
          </div>
        </section>
        <section className="course-more">
          <div className="wrap">
            <div className="kicker">Keep exploring</div>
            <h2 className="h3">Related courses</h2>
            <div className="course-more__grid">
              {[...FOCUS_COURSES.filter((x) => x.slug !== c.slug && x.cat === c.cat), ...FOCUS_COURSES.filter((x) => x.cat !== c.cat)].slice(0, 4).map((x) => (
                <a key={x.slug} href={`/courses/${x.slug}`} className="course-more__card">
                  <span className="course-more__meta">{x.level} · {x.duration}</span>
                  <strong>{x.title}</strong>
                  <span className="course-more__go">View course <ArrowUpRight size={15} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <Enquire />
      </main>
      <Footer />
    </div>
  );
}
