// frontend/src/components/Avatars/AvatarTimelineWalker.jsx
import AvatarFace from './AvatarFace';
import './AvatarTimelineWalker.css';

export default function AvatarTimelineWalker() {
  return (
    <div className="timeline-walker" aria-hidden="true">
      {/* Mini Aura & Particle Ring */}
      <div className="timeline-walker__aura" />

      {/* Floating Milestone Bubble */}
      <div className="timeline-walker__bubble">
        <span>Exploring</span>
        <span className="timeline-walker__pulse" />
      </div>

      <svg viewBox="0 0 100 130" className="timeline-walker__svg">
        <defs>
          <filter id="walkerGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shadow under feet */}
        <ellipse cx="50" cy="124" rx="22" ry="4" fill="rgba(0,0,0,0.5)" />

        <g className="walker-char">
          {/* Tech Backpack */}
          <rect x="30" y="52" width="12" height="32" rx="5" fill="#14141e" stroke="var(--accent)" strokeWidth="1" />
          <circle cx="36" cy="62" r="2.5" fill="var(--accent)" filter="url(#walkerGlow)" />

          {/* Left Leg */}
          <g className="walker-leg walker-leg--l">
            <rect x="38" y="78" width="10" height="38" rx="5" fill="#1b1e2c" />
            <rect x="36" y="112" width="16" height="8" rx="4" fill="#0b0b10" stroke="var(--accent)" strokeWidth="0.8" />
          </g>

          {/* Right Leg */}
          <g className="walker-leg walker-leg--r">
            <rect x="52" y="78" width="10" height="38" rx="5" fill="#1b1e2c" />
            <rect x="50" y="112" width="16" height="8" rx="4" fill="#0b0b10" stroke="var(--accent)" strokeWidth="0.8" />
          </g>

          {/* Torso & Suit */}
          <g className="walker-torso">
            <rect x="35" y="48" width="30" height="42" rx="10" fill="#1a1c26" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            {/* V-neck & Neon Tie */}
            <path d="M44 48 L50 62 L56 48 Z" fill="#f4f4ef" />
            <path d="M48 55 L50 72 L52 55 Z" fill="var(--accent)" />
            {/* Neon Chest Badge */}
            <circle cx="58" cy="58" r="2" fill="var(--accent)" />

            {/* Left Arm */}
            <g className="walker-arm walker-arm--l">
              <rect x="28" y="52" width="8" height="26" rx="4" fill="#1a1c26" />
              <circle cx="32" cy="80" r="4" fill="#e3aa7e" />
            </g>

            {/* Right Arm (holding glowing beacon compass) */}
            <g className="walker-arm walker-arm--r">
              <rect x="64" y="52" width="8" height="24" rx="4" fill="#1a1c26" />
              <circle cx="68" cy="78" r="4" fill="#e3aa7e" />
              {/* Glowing Beacon */}
              <circle cx="68" cy="84" r="3.5" fill="var(--accent)" filter="url(#walkerGlow)" />
            </g>

            {/* Head */}
            <g transform="translate(15, 6) scale(0.5)">
              <AvatarFace idPrefix="timelineWalker" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
