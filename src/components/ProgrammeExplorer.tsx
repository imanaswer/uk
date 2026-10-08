'use client';
import { useDeferredValue, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Search } from 'lucide-react';
import { TIERS, type Tier } from '@/lib/programmes';

type Item = { slug: string; img: string; subject: string; tier: Tier; duration: string; domain: string };

export default function ProgrammeExplorer({ items, domains, initial }: { items: Item[]; domains: string[]; initial: { tier: Tier | ''; domain: string } }) {
  const [q, setQ] = useState('');
  const [tier, setTier] = useState(initial.tier);
  const [domain, setDomain] = useState(initial.domain);
  const query = useDeferredValue(q.trim().toLowerCase());

  const hits = items.filter((p) => (!tier || p.tier === tier) && (!domain || p.domain === domain) && (!query || `${p.subject} ${p.domain}`.toLowerCase().includes(query)));
  const groups = domains.map((d) => [d, hits.filter((p) => p.domain === d)] as const).filter(([, l]) => l.length);
  const tierName = (t: Tier) => TIERS.find((x) => x.id === t)!.short;

  return (
    <section className="explorer">
      <div className="wrap">
        <div className="explorer__bar">
          <label className="explorer__search">
            <Search size={18} aria-hidden />
            <input type="search" placeholder="Search programmes, e.g. solar, nursing, logistics" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search programmes" />
          </label>
          <div className="seg" role="tablist" aria-label="Filter by level">
            <button role="tab" aria-selected={!tier} className={!tier ? 'is-active' : ''} onClick={() => setTier('')}>All levels</button>
            {TIERS.map((t) => <button key={t.id} role="tab" aria-selected={tier === t.id} className={tier === t.id ? 'is-active' : ''} onClick={() => setTier(t.id)}>{t.short === 'Advanced' ? 'Advanced Professional' : t.short}</button>)}
          </div>
          <select className="explorer__select" value={domain} onChange={(e) => setDomain(e.target.value)} aria-label="Filter by industry">
            <option value="">All {domains.length} industries</option>
            {domains.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <p className="explorer__count" aria-live="polite">{hits.length} programme{hits.length === 1 ? '' : 's'}</p>
        {groups.map(([d, list]) => (
          <div key={d} className="explorer__group">
            <h2 className="explorer__domain"><span>{d}</span><span className="explorer__n">{list.length}</span></h2>
            <div className="prow-grid">
              {list.map((p) => (
                <a key={p.slug} href={`/programmes/${p.slug}`} className={`prow prow--${p.tier}`}>
                  <span className="prow__img"><Image src={p.img} alt="" fill sizes="(max-width: 600px) 100vw, 300px" /><span className="prow__tier">{tierName(p.tier)}</span></span>
                  <span className="prow__body">
                    <strong>{p.subject}</strong>
                    <span className="prow__meta">{p.duration}<span className="prow__go">View programme <ArrowUpRight size={15} /></span></span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
        {!hits.length && (
          <div className="explorer__empty">
            <p>No programmes match that search.</p>
            <button className="btn btn--outline btn--sm" onClick={() => { setQ(''); setTier(''); setDomain(''); }}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
