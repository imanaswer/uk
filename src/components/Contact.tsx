import Reveal from './Reveal';
import { SITE } from '@/lib/content';

export default function Contact() {
  return (
    <section id="contact" className="wrap contact">
      <Reveal className="contact__grid">
        <address className="contact__card">
          <div className="kicker kicker--sm">Communication address</div>
          <div className="contact__org">{SITE.legalName}</div>
          <div className="contact__addr">Office 718, Crown House Business Centre<br />North Circular Road<br />London NW10 7PN, United Kingdom</div>
        </address>
        <address className="contact__card">
          <div className="kicker kicker--sm">Registered address</div>
          <div className="contact__org">{SITE.legalName}</div>
          <div className="contact__addr">{SITE.registered.street}<br />{SITE.registered.locality}<br />{SITE.registered.postalCode}, United Kingdom</div>
        </address>
        <div className="contact__card contact__card--navy">
          <div className="kicker kicker--coral kicker--sm">Reach us</div>
          <a href={SITE.phoneHref} className="contact__phone">{SITE.phone}</a>
          <a href={`mailto:${SITE.email}`} className="contact__mail">{SITE.email}</a>
          <div className="contact__social">
            <a href={SITE.social.facebook} target="_blank" rel="noopener">Facebook</a>
            <a href={SITE.social.instagram} target="_blank" rel="noopener">Instagram</a>
            <a href={SITE.social.linkedin} target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
