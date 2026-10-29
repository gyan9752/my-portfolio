import { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, X } from 'lucide-react';
import ProjectVisual from '../ProjectVisual/ProjectVisual';
import { sound } from '../../services/sound';
import './ProjectOverlay.css';

export default function ProjectOverlay({ project, onClose }) {
  const scroller = useRef(null);
  // Keep rendering the last project while the close animation plays
  const shown = useRef(project);
  if (project) shown.current = project;
  const data = shown.current;

  useEffect(() => {
    if (!project) return undefined;
    scroller.current?.scrollTo(0, 0);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  return (
    <div
      ref={scroller}
      className={`overlay ${project ? 'is-open' : ''}`}
      style={data ? { '--a': data.theme.a, '--b': data.theme.b } : undefined}
      aria-hidden={!project}
    >
      {data && (
        <div className="overlay__inner">
          <button
            className="overlay__close"
            onClick={handleClose}
            onMouseEnter={() => sound.playHover()}
            aria-label="Close project"
            data-cursor="Close"
          >
            <X size={26} />
          </button>

          <div className="overlay__meta">
            <span className="overlay__num">{data.number}</span>
            <span className="overlay__cat">{data.category}</span>
          </div>

          <h2 className="overlay__title">
            {data.title.split('').map((ch, i) => (
              <span key={i} style={{ '--i': i }}>
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </h2>

          <p className="overlay__tagline">{data.tagline}</p>

          <div className="overlay__visual">
            <ProjectVisual project={data} />
          </div>

          <ul className="overlay__features">
            {data.features.map((f, i) => (
              <li key={f} style={{ '--i': i }}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                {f}
              </li>
            ))}
          </ul>

          <div className="overlay__tags">
            {data.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="overlay__actions">
            <a className="overlay__btn overlay__btn--solid" href={data.liveUrl} target="_blank" rel="noreferrer">
              Live site <ArrowUpRight size={18} />
            </a>
            <a className="overlay__btn" href={data.githubUrl} target="_blank" rel="noreferrer">
              <Github size={18} /> Code
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
