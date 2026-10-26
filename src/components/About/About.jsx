import { useState, useRef, useEffect } from 'react';
import { Maximize2, X, ShieldCheck, ArrowRight } from 'lucide-react';
import { personal } from '../../data/portfolioData';
import './About.css';

export default function About() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  const profileImage = '/gyanvender-real.jpg';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRevealed(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className={`about-section ${isRevealed ? 'is-in' : ''}`}>
      <div className="about-wrap">
        <div className="about-grid">
          
          {/* Left Column: Portrait with View Full Photo Lightbox Trigger */}
          <div className="about-photo-col">
            <div className="about-photo-card" onClick={() => setIsImageModalOpen(true)}>
              <img
                src={profileImage}
                alt={`${personal.name} ${personal.surname}`}
                className="about-photo-img"
              />
              <div className="about-photo-overlay" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageModalOpen(true);
                }}
                className="about-photo-btn"
                aria-label="View Full Photo"
              >
                <Maximize2 size={14} />
                <span>View Full Photo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Headline & Content */}
          <div className="about-text-col">
            <span className="about-tag">About Me</span>

            <div className="about-headlines">
              <h2 className="about-heading-main">
                I turn curiosity into craft, ideas into systems, and chaos into clarity. Designing, building, breaking
              </h2>
              <p className="about-heading-sub">
                and rebuilding until meaning, beauty, and function align as one.
              </p>
            </div>

            {/* Bottom Stats & Experience Summary */}
            <div className="about-footer-row">
              <div className="about-stat-box">
                <span className="about-stat-num">12+</span>
                <span className="about-stat-lbl">Projects &amp;<br />Scalable Systems</span>
              </div>

              <div className="about-bio-box">
                <p className="about-bio-text">
                  Full Stack Developer with <strong>1 Year Experience at Scriza Pvt Ltd</strong>. Building responsive React frontends, robust Node.js APIs, and database architectures.
                </p>

                <div className="about-chips">
                  <span className="about-chip">Scriza Pvt Ltd</span>
                  <span className="about-chip">React &amp; Node.js</span>
                  <span className="about-chip">Full Stack Lead</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* FULL SCREEN PHOTO LIGHTBOX MODAL */}
      {isImageModalOpen && (
        <div className="about-modal-backdrop" onClick={() => setIsImageModalOpen(false)}>
          <div className="about-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="about-modal-header">
              <div>
                <h3 className="about-modal-name">
                  {personal.name} {personal.surname}
                  <span className="about-modal-role">Full Stack Developer</span>
                </h3>
                <p className="about-modal-sub">1 Year Experience @ Scriza Pvt Ltd</p>
              </div>

              <button
                type="button"
                onClick={() => setIsImageModalOpen(false)}
                className="about-modal-close"
                aria-label="Close photo"
              >
                <X size={18} />
              </button>
            </div>

            <div className="about-modal-img-wrap">
              <img
                src={profileImage}
                alt={`${personal.name} ${personal.surname} - Full View`}
                className="about-modal-img"
              />
            </div>

            <div className="about-modal-footer">
              <div className="about-modal-footer-badge">
                <ShieldCheck size={16} />
                <span>Profile Photo Lightbox</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
