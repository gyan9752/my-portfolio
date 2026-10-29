import { useRef } from 'react';
import { ArrowDown, ArrowUpRight, Calendar } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import { sound } from '../../services/sound';
import ParticleField from '../ParticleField/ParticleField';
import SplitText from '../SplitText/SplitText';
import Magnetic from '../Magnetic/Magnetic';
import './Hero.css';

export default function Hero({ ready, go, onOpenBooking }) {
  const sectionRef = useRef(null);

  return (
    <section id="top" ref={sectionRef} className={`hero ${ready ? 'is-ready' : ''}`}>
      {/* Animated backdrop */}
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__aurora hero__aurora--1" />
        <span className="hero__aurora hero__aurora--2" />
        <span className="hero__aurora hero__aurora--3" />
        <span className="hero__grid" />
        <ParticleField />
      </div>

      <div className="hero__inner">
        <div className="hero__text">
          <div className="hero__badge">
            <span className="hero__pulse" />
            Open to work
          </div>

          <h1 className="hero__title">
            <SplitText text={personal.name.toUpperCase()} when={ready} delay={0.1} stagger={0.045} className="hero__first" />
            <SplitText text={personal.surname.toUpperCase()} when={ready} delay={0.45} stagger={0.05} className="hero__last" />
          </h1>

          <div className="hero__role" aria-label={personal.roles.join(', ')}>
            <span className="hero__role-dash" />
            <div className="hero__role-window">
              <div className="hero__role-track">
                {[...personal.roles, personal.roles[0]].map((role, i) => (
                  <span key={`${role}-${i}`}>{role}</span>
                ))}
              </div>
            </div>
            <span className="hero__role-dash" />
          </div>

          <p className="hero__tagline">
            Full Stack Developer specializing in high-performance React &amp; Next.js applications, robust Node.js backend architectures, and modern web experiences.
          </p>

          <div className="hero__actions">
            <Magnetic>
              <button
                className="btn btn--solid"
                onClick={() => {
                  sound.playClick();
                  go('work');
                }}
                onMouseEnter={() => sound.playHover()}
                data-cursor="Go"
              >
                See my work <ArrowDown size={18} />
              </button>
            </Magnetic>
            <Magnetic>
              <button
                className="btn btn--cal"
                onClick={() => {
                  sound.playClick();
                  onOpenBooking();
                }}
                onMouseEnter={() => sound.playHover()}
              >
                <Calendar size={17} /> Book a call
              </button>
            </Magnetic>
            <Magnetic>
              <button
                className="btn btn--ghost"
                onClick={() => {
                  sound.playClick();
                  go('contact');
                }}
                onMouseEnter={() => sound.playHover()}
              >
                Say hi <ArrowUpRight size={18} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      <button
        className="hero__scroll"
        onClick={() => {
          sound.playClick();
          go('work');
        }}
        onMouseEnter={() => sound.playHover()}
        aria-label="Scroll down"
      >
        <span />
      </button>
    </section>
  );
}
