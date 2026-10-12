import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import { COURSES, SITE } from '@/lib/content';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const display = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-display', display: 'swap' });
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

const title = 'G-TEC EDUCATION UK · IT & professional training in London';
const description = 'Part of a global training network spanning 23+ countries, 800+ centres and 4.3M+ alumni. Courses in generative AI, machine learning, data science, cyber security and full-stack development in Park Royal, London.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/', siteName: SITE.name, locale: 'en_GB', type: 'website', images: [{ url: '/logo.png', width: 3860, height: 2641, alt: 'G-TEC EDUCATION' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/logo.png'] },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  telephone: SITE.phone,
  email: SITE.email,
  address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: SITE.address.locality, postalCode: SITE.address.postalCode, addressCountry: SITE.address.country },
  sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.linkedin, SITE.global],
  parentOrganization: { '@type': 'Organization', name: 'G-TEC EDUCATION', url: SITE.global },
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Professional courses', itemListElement: COURSES.map((c) => ({ '@type': 'Course', name: c.title, description: c.desc, provider: { '@type': 'Organization', name: SITE.name } })) },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
