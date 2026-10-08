import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './Reveal';
import { DOMAINS, PROGRAMMES, TIERS, domainImg, domainSlug } from '@/lib/programmes';

export default function Programmes() {
  return (
    <section id="programmes" className="prog">
      <div className="wrap">
        <Reveal className="prog__head">
          <div>
            <div className="kicker">Certificate programmes</div>
            <h2 className="h2 h2--md">{PROGRAMMES.length} programmes across {DOMAINS.length} industries.</h2>
          </div>
          <p className="lead lead--sm">From healthcare and hospitality to automation, energy and construction. Start at Foundation level and progress to Professional and Advanced Professional certificates in the same field.</p>
        </Reveal>
        <Reveal className="tiers">
          {TIERS.map((t, i) => (
            <a key={t.id} href={`/programmes?level=${t.id}`} className={`tier tier--${t.id}`}>
              <span className="tier__step">Step {i + 1}</span>
              <strong className="tier__count">{PROGRAMMES.filter((p) => p.tier === t.id).length}</strong>
              <span className="tier__name">{t.name}</span>
              <span className="tier__dur">{t.duration}</span>
              <p>{t.blurb}</p>
              <span className="tier__go">Browse <ArrowUpRight size={15} /></span>
            </a>
          ))}
        </Reveal>
        <Reveal className="domains">
          {DOMAINS.map((d) => (
            <a key={d} href={`/programmes?domain=${domainSlug(d)}`} className="domain">
              <Image src={domainImg(d)} alt="" fill sizes="(max-width: 600px) 100vw, 300px" />
              <span className="domain__n">{PROGRAMMES.filter((p) => p.domain === d).length} programmes</span>
              <span className="domain__name">{d}<ArrowUpRight size={18} /></span>
            </a>
          ))}
          <Link href="/programmes" className="domain domain--all">
            <span className="domain__n">{PROGRAMMES.length} programmes</span>
            <span className="domain__name">Explore all programmes<ArrowUpRight size={18} /></span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
