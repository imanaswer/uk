import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { DM_Sans, Sora } from 'next/font/google';
import { COURSES, SITE } from '@/lib/content';
import './globals.css';

const sora = Sora({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800'], variable: '--font-sora', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-dm-sans', display: 'swap' });

const title = 'G-TEC Education UK · IT & professional training in London';
const description = "The world's largest IT education network, now in the UK. Industry-aligned programmes in AI, cyber security, full stack development and data science at our London centre.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { title, description, url: '/', siteName: SITE.name, locale: 'en_GB', type: 'website', images: [{ url: '/logo.png', width: 3860, height: 2641, alt: 'G-TEC Education' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/logo.png'] },
  robots: { index: true, follow: true },
  icons: { icon: '/logo.png' },
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
  parentOrganization: { '@type': 'Organization', name: 'G-TEC Education', url: SITE.global },
  hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Professional courses', itemListElement: COURSES.map((c) => ({ '@type': 'Course', name: c.title, description: c.desc, provider: { '@type': 'Organization', name: SITE.name } })) },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB" className={`${sora.variable} ${dmSans.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
