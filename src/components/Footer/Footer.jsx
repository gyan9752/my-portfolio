import { ArrowUp } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import { sound } from '../../services/sound';
import './Footer.css';

export default function Footer({ go }) {
  const fullName = `${personal.name} ${personal.surname}`.toUpperCase();

  const handleTopClick = () => {
    sound.playClick();
    go('top');
  };

  return (
    <footer className="footer">
      <div className="footer__giant" aria-hidden="true">
        <svg viewBox="0 0 1600 160" className="footer__giant-svg" preserveAspectRatio="xMidYMid meet">
          <text
            x="800"
            y="112"
            textAnchor="middle"
            textLength="1480"
            lengthAdjust="spacing"
            className="footer__giant-text"
          >
            {fullName}
          </text>
        </svg>
      </div>

      <div className="footer__bar">
        <span>
          © {new Date().getFullYear()} {personal.name} {personal.surname} •{' '}
          <a href="/gadmin" style={{ color: 'inherit', textDecoration: 'none', opacity: 0.6 }} title="Admin Portal">
            Admin
          </a>
        </span>
        <button
          className="footer__top"
          onClick={handleTopClick}
          onMouseEnter={() => sound.playHover()}
          aria-label="Back to top"
          data-cursor="Top"
        >
          <ArrowUp size={20} />
        </button>
        <span>{personal.location}</span>
      </div>
    </footer>
  );
}
