import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Github, X, ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import ProjectVisual from '../ProjectVisual/ProjectVisual';
import { sound } from '../../services/sound';
import './ProjectOverlay.css';

export default function ProjectOverlay({ project, onClose }) {
  const scroller = useRef(null);
  // Keep rendering the last project while the close animation plays
  const shown = useRef(project);
  if (project) shown.current = project;
  const data = shown.current;

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!project) return undefined;
    setActiveSlide(0);
    scroller.current?.scrollTo(0, 0);
    const onKey = (e) => {
      if (e.key === 'Escape') {
        sound.playClick();
        onClose();
      }
      if (data?.gallery?.length > 1) {
        if (e.key === 'ArrowRight') {
          sound.playHover();
          setActiveSlide((prev) => (prev + 1) % data.gallery.length);
        } else if (e.key === 'ArrowLeft') {
          sound.playHover();
          setActiveSlide((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose, data]);

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  const domain = data?.liveUrl
    ? data.liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
    : `${data?.slug}.app`;

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
            <span className="overlay__role-badge">Full Stack Developer</span>
          </div>

          <h2 className="overlay__title">{data.title}</h2>

          <p className="overlay__tagline">{data.tagline}</p>

          {data.gallery && data.gallery.length > 0 ? (
            <div className="overlay__gallery-section">
              <div className="overlay__gal-card">
                {/* Browser bar */}
                <div className="overlay__gal-bar">
                  <div className="overlay__gal-dots">
                    <span className="gal-dot gal-dot--red" />
                    <span className="gal-dot gal-dot--yellow" />
                    <span className="gal-dot gal-dot--green" />
                  </div>
                  <div className="overlay__gal-url">
                    <Lock size={11} className="gal-lock" />
                    <span>https://{domain}</span>
                  </div>
                  <div className="overlay__gal-count">
                    <span>{String(activeSlide + 1).padStart(2, '0')} / {String(data.gallery.length).padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Viewport */}
                <div className="overlay__gal-viewport">
                  <img
                    key={activeSlide}
                    src={data.gallery[activeSlide].url}
                    alt={data.gallery[activeSlide].title}
                    className="overlay__gal-img"
                  />

                  {data.gallery.length > 1 && (
                    <>
                      <button
                        type="button"
                        className="overlay__gal-arrow overlay__gal-arrow--prev"
                        onClick={() => {
                          sound.playClick();
                          setActiveSlide((prev) => (prev - 1 + data.gallery.length) % data.gallery.length);
                        }}
                        aria-label="Previous screenshot"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        type="button"
                        className="overlay__gal-arrow overlay__gal-arrow--next"
                        onClick={() => {
                          sound.playClick();
                          setActiveSlide((prev) => (prev + 1) % data.gallery.length);
                        }}
                        aria-label="Next screenshot"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  <div className="overlay__gal-caption">
                    <h4 className="overlay__gal-title">{data.gallery[activeSlide].title}</h4>
                    <p className="overlay__gal-desc">{data.gallery[activeSlide].caption}</p>
                  </div>
                </div>
              </div>

              {/* Thumbnails strip */}
              {data.gallery.length > 1 && (
                <div className="overlay__thumbs">
                  {data.gallery.map((item, idx) => (
                    <button
                      key={item.url}
                      type="button"
                      className={`overlay__thumb ${activeSlide === idx ? 'is-active' : ''}`}
                      onClick={() => {
                        sound.playClick();
                        setActiveSlide(idx);
                      }}
                      onMouseEnter={() => sound.playHover()}
                    >
                      <img src={item.url} alt={item.title} className="overlay__thumb-img" />
                      <div className="overlay__thumb-meta">
                        <span className="overlay__thumb-idx">0{idx + 1}</span>
                        <span className="overlay__thumb-label">{item.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="overlay__visual">
              <ProjectVisual project={data} />
            </div>
          )}

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
