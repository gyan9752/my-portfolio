import { useState } from 'react';
import { ArrowUpRight, Github, Linkedin, Loader2, Mail, MessageCircle } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import { sendMessage } from '../../services/api';
import { sound } from '../../services/sound';
import SplitText from '../SplitText/SplitText';
import Magnetic from '../Magnetic/Magnetic';
import './Contact.css';

const links = [
  { icon: Mail, href: `mailto:${personal.email}`, label: 'Email' },
  { icon: MessageCircle, href: personal.socials.whatsapp, label: 'WhatsApp' },
  { icon: Github, href: personal.socials.github, label: 'GitHub' },
  { icon: Linkedin, href: personal.socials.linkedin, label: 'LinkedIn' },
];

const confetti = Array.from({ length: 28 }, (_, i) => ({
  angle: (360 / 28) * i,
  dist: 90 + ((i * 37) % 80),
  delay: (i % 7) * 0.02,
  color: ['#c8ff3d', '#7c5cff', '#ff5d8f', '#4fb7ff'][i % 4],
}));

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    sound.playClick();
    setStatus('sending');
    setError('');
    try {
      await sendMessage(form);
      setStatus('sent');
      sound.playSuccess();
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? `Server unreachable — email me at ${personal.email}` : err.message);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact__glow" aria-hidden="true" />

      <div className="contact__head">
        <h2 className="contact__title-row">
          <SplitText as="span" text="LET'S" className="contact__title" stagger={0.06} />
          <SplitText as="span" text="TALK" className="contact__title contact__title--outline" delay={0.2} stagger={0.07} />
        </h2>
        <span className="contact__spark" aria-hidden="true">
          ✦
        </span>
      </div>

      <div className="contact__grid">
        <form className={`form ${status === 'sent' ? 'is-sent' : ''}`} onSubmit={submit}>
          {[
            { key: 'name', label: 'Name', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
          ].map((f) => (
            <label className="field" key={f.key}>
              <input type={f.type} value={form[f.key]} onChange={update(f.key)} placeholder=" " required />
              <span>{f.label}</span>
              <i />
            </label>
          ))}
          <label className="field">
            <textarea rows={3} value={form.message} onChange={update('message')} placeholder=" " required minLength={5} />
            <span>Message</span>
            <i />
          </label>

          <div className="form__foot">
            <Magnetic strength={0.25}>
              <button
                className="form__send"
                type="submit"
                disabled={status === 'sending'}
                data-cursor="Send"
                onMouseEnter={() => sound.playHover()}
              >
                {status === 'sending' ? <Loader2 size={20} className="spin" /> : <ArrowUpRight size={22} />}
                <span>{status === 'sending' ? 'Sending' : 'Send'}</span>
              </button>
            </Magnetic>
            {status === 'error' && <p className="form__error">{error}</p>}
          </div>

          {/* success state */}
          <div className="form__done" aria-live="polite">
            <div className="form__burst">
              {confetti.map((c, i) => (
                <span key={i} style={{ '--ang': `${c.angle}deg`, '--dist': `${c.dist}px`, '--delay': `${c.delay}s`, background: c.color }} />
              ))}
              <b>✓</b>
            </div>
            <p>Sent!</p>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setStatus('idle');
              }}
              onMouseEnter={() => sound.playHover()}
            >
              Send another
            </button>
          </div>
        </form>

        <div className="contact__side">
          <a
            className="contact__mail"
            href={`mailto:${personal.email}`}
            data-cursor="Mail"
            onClick={() => sound.playClick()}
            onMouseEnter={() => sound.playHover()}
          >
            {personal.email}
          </a>
          <div className="contact__icons">
            {links.map(({ icon: Icon, href, label }) => (
              <Magnetic key={label} strength={0.5}>
                <a
                  className="contact__icon"
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                >
                  <Icon size={22} />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
