import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import Enquire from '@/components/Enquire';
import ProgrammeExplorer from '@/components/ProgrammeExplorer';
import { DOMAINS, PROGRAMMES, TIERS, domainSlug, type Tier } from '@/lib/programmes';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
  title: `Certificate programmes · ${SITE.name}`,
  description: `${PROGRAMMES.length} Foundation, Professional and Advanced Professional certificate programmes across ${DOMAINS.length} industries.`,
  alternates: { canonical: '/programmes' },
};

// Homepage tiles link here with ?level= / ?domain=.
export default async function ProgrammesPage({ searchParams }: { searchParams: Promise<{ level?: string; domain?: string }> }) {
  const { level, domain } = await searchParams;
  const initial = { tier: (TIERS.some((t) => t.id === level) ? level : '') as Tier | '', domain: DOMAINS.find((d) => domainSlug(d) === domain) ?? '' };
  const items = PROGRAMMES.map(({ slug, img, subject, tier, duration, domain }) => ({ slug, img, subject, tier, duration, domain }));
  return (
    <div className="page">
      <Header />
      <main>
        <section className="page-intro page-intro--glow">
          <Reveal className="wrap">
            <div className="kicker kicker--coral">Certificate programmes</div>
            <h1 className="h2 page-intro__title">Find the programme that fits where you want to go.</h1>
            <p className="lead lead--light">{PROGRAMMES.length} industry-oriented programmes across {DOMAINS.length} sectors, delivered through blended theory, demonstrations and virtual and simulation-based practical work.</p>
            <div className="page-intro__stats">
              {TIERS.map((t) => <div key={t.id}><strong>{PROGRAMMES.filter((p) => p.tier === t.id).length}</strong><span>{t.name} · {t.duration}</span></div>)}
            </div>
          </Reveal>
        </section>
        <ProgrammeExplorer items={items} domains={DOMAINS} initial={initial} />
        <Enquire />
      </main>
      <Footer />
    </div>
  );
}
