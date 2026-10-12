import Reveal from './Reveal';
import { SITE } from '@/lib/content';

export default function Contact() {
  return (
    <section id="contact" className="wrap contact">
      <Reveal className="contact__grid">
        <address className="contact__card">
          <div className="kicker kicker--sm">Communication address</div>
          <div className="contact__org">{SITE.legalName}</div>
          <div className="contact__addr">Office 718, Crown House Business Centre<br />North Circular Road<br />London NW10 7PN, United Kingdom<br /><a href={SITE.phoneHref}>{SITE.phone}</a><br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
        </address>
        <address className="contact__card">
          <div className="kicker kicker--sm">Registered address</div>
          <div className="contact__org">{SITE.legalName}</div>
          <div className="contact__addr">{SITE.registered.street}<br />{SITE.registered.locality}<br />{SITE.registered.postalCode}, United Kingdom<br /><a href={SITE.phoneHref}>{SITE.phone}</a><br /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
        </address>
        <address className="contact__card">
          <div className="kicker kicker--sm">Administrative office</div>
          <div className="contact__org">{SITE.hq.name}</div>
          <div className="contact__addr">{SITE.hq.street}<br />{SITE.hq.locality}<br />{SITE.hq.phones.map((p) => <span key={p}><a href={`tel:${p.replace(/ /g, '')}`}>{p}</a><br /></span>)}<a href={`mailto:${SITE.hq.email}`}>{SITE.hq.email}</a></div>
        </address>
        <address className="contact__card">
          <div className="kicker kicker--sm">Middle East office</div>
          <div className="contact__org">{SITE.me.name}</div>
          <div className="contact__addr">{SITE.me.street}<br />{SITE.me.locality}<br />{SITE.me.phones.map((p) => <span key={p}><a href={`tel:${p.replace(/ /g, '')}`}>{p}</a><br /></span>)}</div>
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
      <Reveal className="contact__map">
        <iframe
          title="Map of G-TEC EDUCATION UK, Crown House Business Centre, London NW10 7PN"
          src="https://maps.google.com/maps?q=Crown+House+Business+Centre,+North+Circular+Road,+London+NW10+7PN&z=15&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Reveal>
    </section>
  );
}
