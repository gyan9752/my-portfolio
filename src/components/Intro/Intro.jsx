import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import { saveVisitor } from '../../services/api';
import Person from './Person';
import Face from './Face';
import './Intro.css';

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('walk'); // walk → shake → clap → leave
  const [form, setForm] = useState({ name: '', email: '' });
  const timers = useRef([]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const t = setTimeout(() => setPhase((p) => (p === 'walk' ? 'shake' : p)), 2700);
    return () => {
      clearTimeout(t);
      timers.current.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, []);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const first = form.name.trim().split(' ')[0];
  const valid = form.name.trim().length > 1 && EMAIL_RE.test(form.email.trim());
  const busy = phase === 'clap' || phase === 'leave';

  const submit = (e) => {
    e.preventDefault();
    if (!valid || busy) return;
    saveVisitor({ name: form.name.trim(), email: form.email.trim() });
    setPhase('clap');
    timers.current = [setTimeout(() => setPhase('leave'), 2300), setTimeout(onDone, 2900)];
  };

  const pose = phase === 'leave' ? 'clap' : phase;
  const visitorPose = phase === 'walk' ? 'idle' : pose;
  const bubble = phase === 'shake' ? 'Nice to meet you! Who are you?' : busy ? `Welcome, ${first}! 🎉` : '';

  return (
    <div className={`intro ${phase === 'leave' ? 'is-leaving' : ''}`}>
      <div className="intro__glow" aria-hidden="true" />
      <div className="intro__wrap">
        <div className="intro__stage">
          {bubble && <div className="intro__bubble" key={bubble}>{bubble}</div>}
          {phase === 'clap' && (
            <div className="intro__fx" aria-hidden="true">
              {['👏', '✨', '👏', '🎉', '✨', '👏'].map((e, i) => <span key={i} style={{ '--i': i }}>{e}</span>)}
            </div>
          )}

          <svg viewBox="0 0 520 330" role="img" aria-label="Gyanvendra shaking hands with you">
            <defs>
              <linearGradient id="introShade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity=".12" />
                <stop offset=".5" stopColor="#fff" stopOpacity="0" />
                <stop offset="1" stopColor="#000" stopOpacity=".32" />
              </linearGradient>
            </defs>
            <ellipse cx="260" cy="318" rx="230" ry="8" fill="rgba(255,255,255,.06)" />

            <g transform="translate(470 52) scale(-1 1)">
              <Person pose={visitorPose} suit="#3b3f5c" tie="#7c5cff" skin="#d9a77e">
                <circle cx="70" cy="44" r="34" fill="#2b2f45" stroke="#7c5cff" strokeWidth="3" />
                <g transform="translate(70 44) scale(-1 1)">
                  <text className="intro__initial" textAnchor="middle" dominantBaseline="central">
                    {first ? first[0].toUpperCase() : '?'}
                  </text>
                </g>
              </Person>
            </g>

            <g transform="translate(130 52)">
              <g className="walker">
                <Person pose={pose} suit="#2a2f3d" shirt="#3d424f" skin="#c68a60">
                  <Face />
                </Person>
              </g>
            </g>
          </svg>
        </div>

        <form className="intro__card" onSubmit={submit}>
          <span className="intro__eyebrow">Welcome</span>
          <h1>Hi, I'm {personal.name}.</h1>
          <p>Tell me who's visiting before you step in.</p>

          <label>
            Your name
            <input type="text" value={form.name} onChange={update('name')} placeholder="e.g. Rahul Sharma" autoComplete="name" disabled={busy} />
          </label>
          <label>
            Your email
            <input type="email" value={form.email} onChange={update('email')} placeholder="you@company.com" autoComplete="email" disabled={busy} />
          </label>

          <button type="submit" disabled={!valid || busy}>
            {busy ? 'Opening…' : 'Enter portfolio'} <ArrowRight size={18} />
          </button>
          <small>Used only so I know who visited.</small>
        </form>
      </div>
    </div>
  );
}
