import type { MetadataRoute } from 'next';
import { FOCUS_COURSES, SITE } from '@/lib/content';
import { PROGRAMMES } from '@/lib/programmes';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE.url, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE.url}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...FOCUS_COURSES.map((c) => ({ url: `${SITE.url}/courses/${c.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${SITE.url}/programmes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...PROGRAMMES.map((p) => ({ url: `${SITE.url}/programmes/${p.slug}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
