import { ArrowUp } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import './Footer.css';

export default function Footer({ go }) {
  const fullName = `${personal.name} ${personal.surname}`.toUpperCase();

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
          © {new Date().getFullYear()} {personal.name} {personal.surname}
        </span>
        <button className="footer__top" onClick={() => go('top')} aria-label="Back to top" data-cursor="Top">
          <ArrowUp size={20} />
        </button>
        <span>{personal.location}</span>
      </div>
    </footer>
  );
}
