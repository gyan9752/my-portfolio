import { useState } from 'react';
import { Lock, ExternalLink } from 'lucide-react';
import { sound } from '../../services/sound';
import './ProjectVisual.css';

export default function ProjectVisual({ project, activeIndex, onSelectIndex }) {
  const { title, liveUrl, gallery, heroImage } = project;
  const [localIndex, setLocalIndex] = useState(0);

  const currentIndex = activeIndex !== undefined ? activeIndex : localIndex;
  const setIndex = onSelectIndex || setLocalIndex;

  const screens = gallery && gallery.length > 0
    ? gallery
    : [{ url: heroImage, title: title, caption: 'Live Production Platform' }];

  const currentScreen = screens[currentIndex] || screens[0];
  const domain = liveUrl ? liveUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : '';

  return (
    <div className="pv-studio">
      {/* 1. Studio macOS Window Header Bar */}
      <div className="pv-studio__bar">
        <div className="pv-studio__dots">
          <span className="pvd-dot pvd-dot--red" />
          <span className="pvd-dot pvd-dot--yellow" />
          <span className="pvd-dot pvd-dot--green" />
        </div>

        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="pv-studio__url"
          onClick={(e) => e.stopPropagation()}
          title={`Visit ${domain} (Live Website)`}
        >
          <Lock size={11} className="pv-studio__lock" />
          <span>https://{domain}</span>
          <ExternalLink size={10} className="pv-studio__ext" />
        </a>

        <div className="pv-studio__meta">
          <span className="pv-studio__live-dot" />
          <span>LIVE PRODUCTION</span>
        </div>
      </div>

      {/* 2. Razor-Sharp Screen Canvas (Zero 3D Tilt Distortion) */}
      <div className="pv-studio__viewport">
        <img
          key={currentScreen.url}
          src={currentScreen.url}
          alt={currentScreen.title || `${title} screenshot`}
          className="pv-studio__img"
          loading="lazy"
        />

        {/* Minimal screen title watermark */}
        <div className="pv-studio__screen-tag">
          <span className="pv-studio__screen-num">0{currentIndex + 1}</span>
          <span className="pv-studio__screen-name">{currentScreen.title}</span>
        </div>
      </div>

      {/* 3. Interactive Screen Selector Pills (Switch screens on the card!) */}
      {screens.length > 1 && (
        <div className="pv-studio__pills" onClick={(e) => e.stopPropagation()}>
          {screens.map((screen, idx) => (
            <button
              key={screen.url}
              type="button"
              className={`pv-studio__pill ${currentIndex === idx ? 'is-active' : ''}`}
              onClick={() => {
                sound.playClick();
                setIndex(idx);
              }}
              onMouseEnter={() => sound.playHover()}
            >
              <span className="pill-dot" />
              <span className="pill-text">{screen.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
