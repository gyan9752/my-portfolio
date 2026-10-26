import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { navLinks, personal } from '../../data/portfolioData';
import './Navbar.css';

export default function Navbar({ ready, go, onOpenBooking }) {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('');

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

  return (
    <header className={`nav ${ready ? 'is-ready' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <button className="nav__logo" onClick={() => go('top')} aria-label="Back to top">
        {personal.initials}
      </button>

      <nav className="nav__links">
        {navLinks.map(({ id, label }) => (
          <button key={id} className={`nav__link ${active === id ? 'is-active' : ''}`} onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>

      <div className="nav__actions">
        <button className="nav__book" onClick={onOpenBooking} aria-label="Book Call">
          <span>Book Call</span>
        </button>

        <button className="nav__cta" onClick={() => go('contact')}>
          <span>Hire me</span>
          <ArrowUpRight size={16} />
        </button>
      </div>
    </header>
  );
}
