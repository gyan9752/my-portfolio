import { useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects } from '../../data/portfolioData';
import { sound } from '../../services/sound';
import useScrollVar from '../../hooks/useScrollVar';
import ProjectVisual from '../ProjectVisual/ProjectVisual';
import './Projects.css';

export default function Projects({ onOpen }) {
  const stackRef = useRef(null);
  // --p runs 0 → 1 across the whole sticky stack; cards read it with calc()
  useScrollVar(stackRef, { mode: 'sticky' });

  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="work" className="projects">
      {/* Section Header */}
      <div className="projects__head">
        <h2 className="projects__title">
          <span className="projects__title-solid">SELECTED</span>{' '}
          <span className="projects__title-outline">WORK</span>
        </h2>
        <span className="projects__count">({String(projects.length).padStart(2, '0')})</span>
      </div>

      {/* Sticky Overlapping / Stacking Cards Container */}
      <div ref={stackRef} className="projects__stack" style={{ '--n1': projects.length - 1 }}>
        {projects.map((project, i) => (
          <div className="project" key={project.id} style={{ '--i': i }}>
            <article
              className="project__card"
              style={{ '--a': project.theme.a, '--b': project.theme.b }}
              onMouseMove={handleSpotlight}
              onClick={() => {
                sound.playClick();
                onOpen(project);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="Details"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  sound.playClick();
                  onOpen(project);
                }
              }}
            >
              {/* Info Column */}
              <div className="project__info">
                <span className="project__number">{project.number}</span>

                <div className="project__info-main">
                  <div className="project__badge-row">
                    <span className="project__cat">{project.category}</span>
                    <span className="project__live-pill">
                      <span className="project__live-dot" /> Live Site
                    </span>
                  </div>

                  <h3 className="project__name">{project.title}</h3>
                  <p className="project__tagline">{project.tagline}</p>

                  <ul className="project__tags">
                    {project.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>

                  {/* Prominent CTAs */}
                  <div className="project__cta-row">
                    <button
                      type="button"
                      className="project__open-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                        onOpen(project);
                      }}
                      onMouseEnter={() => sound.playHover()}
                    >
                      <span>Project Details &amp; Gallery</span>
                      <ArrowUpRight size={17} />
                    </button>

                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project__live-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        sound.playClick();
                      }}
                      onMouseEnter={() => sound.playHover()}
                      title={`Visit ${project.title} Live`}
                    >
                      <span>Live Site</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>

                <span
                  className="project__go"
                  aria-hidden="true"
                  title="Open Project Details Page"
                >
                  <ArrowUpRight size={26} />
                </span>
              </div>

              {/* Visual Column (Clean Flat Studio Browser, Real Screenshots) */}
              <div className="project__visual">
                <div className="project__tilt">
                  <ProjectVisual project={project} />
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
