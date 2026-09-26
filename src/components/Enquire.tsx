'use client';
import { useEffect, useState, type FormEvent } from 'react';
import Reveal from './Reveal';
import { COURSES } from '@/lib/content';

const STEPS = ['Choose a programme', 'Share your details', 'Consultant callback'];

export default function Enquire() {
  const [step, setStep] = useState(0);
  const [course, setCourse] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [firstName, setFirstName] = useState('there');

  // Course cards elsewhere on the page dispatch this to preselect.
  useEffect(() => {
    const on = (e: Event) => { setCourse((e as CustomEvent<string>).detail); setStep(0); setError(''); };
    addEventListener('pick-course', on); return () => removeEventListener('pick-course', on);
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (busy) return;
    const fd = new FormData(e.currentTarget);
    const body = { name: String(fd.get('name') ?? '').trim(), email: String(fd.get('email') ?? '').trim(), phone: String(fd.get('phone') ?? '').trim(), course, website: String(fd.get('website') ?? '') };
    if (!body.name || !/^\S+@\S+\.\S+$/.test(body.email) || body.phone.length < 7) { setError('Please enter your name, a valid email and phone number.'); return; }
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/enquire', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const d = (await res.json().catch(() => null))?.detail; throw new Error(typeof d === 'string' ? d : 'Request failed'); }
      setFirstName(body.name.split(' ')[0] || 'there'); setStep(2);
    } catch (err) {
      setError(err instanceof Error && err.message !== 'Request failed' ? err.message : `Something went wrong. Please try again or call us on +44 7859 731738.`);
    } finally { setBusy(false); }
  }

  return (
    <section id="enquire" className="enquire">
      <div className="wrap">
        <Reveal className="enquire__panel">
          <div className="enquire__glow" aria-hidden />
          <div className="enquire__intro">
            <div className="kicker kicker--coral">Quick enquiry</div>
            <h2 className="h2 h2--md">Talk to an education consultant.</h2>
            <p className="lead lead--light lead--sm">Tell us where you want to go. We&apos;ll map the right programme, intake dates and funding options — usually within one working day.</p>
            <ol className="steps">
              {STEPS.map((s, i) => <li key={s} className={i === step ? 'is-on' : i < step ? 'is-done' : ''}><span className="steps__n">{i + 1}</span><span>{s}</span></li>)}
            </ol>
          </div>
          <div className="enquire__form-wrap">
            <form className="enquiry" onSubmit={submit} noValidate>
              <fieldset className="enquiry__step" hidden={step !== 0}>
                <legend className="enquiry__title">Which programme interests you?</legend>
                <div className="enquiry__sub">Pick one to continue.</div>
                <div className="course-options" role="radiogroup">
                  {COURSES.map((c) => <button type="button" key={c.slug} role="radio" aria-checked={course === c.title} className={course === c.title ? 'is-active' : ''} onClick={() => setCourse(c.title)}>{c.title}</button>)}
                </div>
                <button type="button" className="btn btn--primary enquiry__next" disabled={!course} onClick={() => setStep(1)}>Continue →</button>
              </fieldset>
              <fieldset className="enquiry__step" hidden={step !== 1} disabled={step !== 1}>
                <legend className="enquiry__title">Your details</legend>
                <div className="enquiry__sub">Interested in <strong className="red">{course}</strong></div>
                <div className="enquiry__fields">
                  <input name="name" placeholder="Full name" autoComplete="name" aria-label="Full name" required />
                  <input name="email" placeholder="Email address" type="email" autoComplete="email" aria-label="Email address" required />
                  <input name="phone" placeholder="Phone (+44)" type="tel" autoComplete="tel" aria-label="Phone number" required />
                  <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hp" />
                  {error && <div className="form-error" role="alert">{error}</div>}
                </div>
                <div className="enquiry__nav">
                  <button type="button" className="btn btn--outline" onClick={() => { setStep(0); setError(''); }}>← Back</button>
                  <button type="submit" className="btn btn--primary" disabled={busy}>{busy ? 'Sending…' : 'Send enquiry'}</button>
                </div>
              </fieldset>
              <fieldset className="enquiry__step enquiry__done" hidden={step !== 2}>
                <div className="enquiry__check" aria-hidden>✓</div>
                <div className="enquiry__title">Thanks, {firstName}.</div>
                <p>A consultant will reach out about <strong>{course}</strong> within one working day.</p>
                <button type="button" className="btn btn--outline btn--sm" onClick={() => { setCourse(''); setStep(0); }}>Submit another</button>
              </fieldset>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
