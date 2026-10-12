import data from './programmes.json';

// Generated from public/course/new coures by scripts/import-programmes.py.
export type Tier = 'foundation' | 'professional' | 'advanced';
export type Programme = {
  slug: string; title: string; subject: string; level: string; tier: Tier; duration: string; domain: string;
  img: string; objective: string; outline: string; delivery: string; modules: { title: string; desc: string }[]; outcomes: string[];
};

export const TIERS: { id: Tier; name: string; short: string; duration: string; blurb: string }[] = [
  { id: 'foundation', name: 'Foundation Certificate', short: 'Foundation', duration: '4 months', blurb: 'Core concepts and supervised practical skills for entry-level roles.' },
  { id: 'professional', name: 'Professional Certificate', short: 'Professional', duration: '6 months', blurb: 'Job-ready competence with tools, standards and an applied project.' },
  { id: 'advanced', name: 'Advanced Professional Certificate', short: 'Advanced', duration: '9 months', blurb: 'Specialist and leadership capability for senior and supervisory roles.' },
];
const ORDER = TIERS.map((t) => t.id);

// Industry cover photos (public/media/programmes, Pexels licence). Each programme has its own photo in programmes/p/.
const PHOTO: Record<string, string> = {
  Agriculture: 'agriculture', Automotive: 'automotive', Business: 'business', Construction: 'construction', Creative: 'creative',
  Digital: 'digital', Electrical: 'electrical', Healthcare: 'healthcare', Hospitality: 'hospitality', HVAC: 'hvac',
  Industrial: 'automation', Logistics: 'logistics', Mechanical: 'mechanical', Oil: 'oilgas', Renewable: 'renewable',
};
export const domainImg = (domain: string) => `/media/programmes/${PHOTO[domain.split(/[ ,]/)[0]]}-1.jpg`;

const sorted = [...(data as Omit<Programme, 'img'>[])].sort((a, b) => a.domain.localeCompare(b.domain) || ORDER.indexOf(a.tier) - ORDER.indexOf(b.tier) || a.subject.localeCompare(b.subject));
export const PROGRAMMES: Programme[] = sorted.map((p) => ({ ...p, img: `/media/programmes/p/${p.slug}.jpg` }));
export const DOMAINS = [...new Set(PROGRAMMES.map((p) => p.domain))];
export const domainSlug = (d: string) => d.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
