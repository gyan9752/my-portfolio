import { useEffect, useState } from 'react';
import { ArrowUpRight, Palette, Volume2, VolumeX } from 'lucide-react';
import { navLinks, personal } from '../../data/portfolioData';
import { sound } from '../../services/sound';
import { THEMES, applyTheme, getSavedTheme, subscribeTheme } from '../../services/theme';
import './Navbar.css';

export default function Navbar({ ready, go, onOpenBooking }) {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(() => sound.isSoundEnabled());
  const [activeTheme, setActiveTheme] = useState(() => getSavedTheme());
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Live IST Clock (Noida, India)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).format(new Date());
        setLocalTime(timeStr);
      } catch (e) {
        setLocalTime('');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to external sound and theme updates
  useEffect(() => {
    const unsubSound = sound.subscribe((enabled) => setIsSoundOn(enabled));
    const unsubTheme = subscribeTheme((theme) => setActiveTheme(theme));
    return () => {
      unsubSound();
      unsubTheme();
    };
  }, []);

  // Close palette dropdown when clicking outside
  useEffect(() => {
    if (!paletteOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.nav__theme-wrapper')) {
        setPaletteOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [paletteOpen]);

  // Hide while scrolling down, show when scrolling up
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    sound.playClick();
    go(id);
  };

  const handleBookingClick = () => {
    sound.playClick();
    onOpenBooking();
  };

  const handleSoundToggle = () => {
    const nextState = sound.toggleSound();
    setIsSoundOn(nextState);
  };

  const handleSelectTheme = (t) => {
    applyTheme(t.id);
    setActiveTheme(t);
    sound.playThemeChange();
    setPaletteOpen(false);
  };

  return (
    <header className={`nav ${ready ? 'is-ready' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <button
        className="nav__logo"
        onClick={() => handleNavClick('top')}
        onMouseEnter={() => sound.playHover()}
        aria-label="Back to top"
      >
        <span>{personal.initials}</span>
      </button>

      {/* Live Time & Status HUD */}
      <div className="nav__hud" title="Gyanvendra • Noida, IN (IST)">
        <span className="nav__hud-radar" />
        <span className="nav__hud-content">
          <span className="nav__hud-city">Noida, IN</span>
          {localTime && <span className="nav__hud-time">{localTime}</span>}
        </span>
      </div>

      <nav className="nav__links">
        {navLinks.map(({ id, label }) => (
          <button
            key={id}
            className={`nav__link ${active === id ? 'is-active' : ''}`}
            onClick={() => handleNavClick(id)}
            onMouseEnter={() => sound.playHover()}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="nav__actions">
        {/* Sound FX & Theme Accent Controls */}
        <div className="nav__tools">
          <button
            type="button"
            className={`nav__tool-btn nav__sound-btn ${isSoundOn ? 'is-active' : ''}`}
            onClick={handleSoundToggle}
            onMouseEnter={() => sound.playHover()}
            title={isSoundOn ? 'Sound FX: On (Click to mute)' : 'Sound FX: Off (Click to unmute)'}
            aria-label="Toggle Sound Effects"
          >
            {isSoundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span className={`nav__eq ${isSoundOn ? 'is-playing' : ''}`} aria-hidden="true">
              <span className="eq-bar eq-bar--1" />
              <span className="eq-bar eq-bar--2" />
              <span className="eq-bar eq-bar--3" />
              <span className="eq-bar eq-bar--4" />
            </span>
          </button>

          <div className="nav__theme-wrapper">
            <button
              type="button"
              className={`nav__tool-btn nav__theme-btn ${paletteOpen ? 'is-open' : ''}`}
              onClick={() => {
                sound.playClick();
                setPaletteOpen((prev) => !prev);
              }}
              onMouseEnter={() => sound.playHover()}
              title={`Accent: ${activeTheme.name} (Click to change)`}
              aria-label="Change Accent Color"
            >
              <span className="nav__theme-dot" style={{ backgroundColor: activeTheme.hex }} />
              <Palette size={14} />
            </button>

            {paletteOpen && (
              <div className="nav__palette-dropdown">
                <span className="nav__palette-title">Theme Accent</span>
                <div className="nav__palette-dots">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`nav__swatch ${activeTheme.id === t.id ? 'is-selected' : ''}`}
                      style={{ '--swatch-color': t.hex }}
                      onClick={() => handleSelectTheme(t)}
                      onMouseEnter={() => sound.playHover()}
                      title={t.name}
                      aria-label={t.name}
                    >
                      <span className="nav__swatch-circle" />
                      <span className="nav__swatch-label">{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <button
          className="nav__book"
          onClick={handleBookingClick}
          onMouseEnter={() => sound.playHover()}
          aria-label="Book Call"
        >
          <span>Book Call</span>
        </button>

        <button
          className="nav__cta"
          onClick={() => handleNavClick('contact')}
          onMouseEnter={() => sound.playHover()}
        >
          <span>Hire me</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </header>
  );
}

