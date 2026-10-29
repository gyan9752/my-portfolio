import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../../data/portfolioData';
import { sound } from '../../services/sound';
import useScrollVar from '../../hooks/useScrollVar';
import ProjectVisual from '../ProjectVisual/ProjectVisual';
import './Projects.css';

export default function Projects({ onOpen }) {
  const stackRef = useRef(null);
  // --p runs 0 → 1 across the whole sticky stack; cards read it with calc()
  useScrollVar(stackRef, { mode: 'sticky' });

  return (
    <section id="work" className="projects">
      <div className="projects__head">
        <h2 className="projects__title">
          <span className="projects__title-solid">SELECTED</span>{' '}
          <span className="projects__title-outline">WORK</span>
        </h2>
        <span className="projects__count">({String(projects.length).padStart(2, '0')})</span>
      </div>

      <div ref={stackRef} className="projects__stack" style={{ '--n1': projects.length - 1 }}>
        {projects.map((project, i) => (
          <div className="project" key={project.id} style={{ '--i': i }}>
            <article
              className="project__card"
              style={{ '--a': project.theme.a, '--b': project.theme.b }}
              onClick={() => {
                sound.playClick();
                onOpen(project);
              }}
              onMouseEnter={() => sound.playHover()}
              data-cursor="Open"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  sound.playClick();
                  onOpen(project);
                }
              }}
            >
              <div className="project__info">
                <span className="project__number">{project.number}</span>
                <div>
                  <span className="project__cat">{project.category}</span>
                  <h3 className="project__name">{project.title}</h3>
                  <ul className="project__tags">
                    {project.tags.slice(0, 3).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <span className="project__go" aria-hidden="true">
                  <ArrowUpRight size={26} />
                </span>
              </div>

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
