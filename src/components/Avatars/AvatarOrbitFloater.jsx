// frontend/src/components/Avatars/AvatarOrbitFloater.jsx
import AvatarFace from './AvatarFace';
import './AvatarOrbitFloater.css';

export default function AvatarOrbitFloater() {
  return (
    <div className="orbit-floater" aria-hidden="true">
      {/* Zero-G Plasma Jet Particles */}
      <div className="orbit-floater__thruster-glow" />

      {/* Floating Tag */}
      <div className="orbit-floater__tag">
        <span>Stack Explorer</span>
      </div>

      <svg viewBox="0 0 140 160" className="orbit-floater__svg">
        <defs>
          <filter id="floaterGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="jetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
            <stop offset="60%" stopColor="var(--violet)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Thruster exhaust plumes */}
        <g className="orbit-floater__jets">
          <ellipse cx="50" cy="138" rx="5" ry="14" fill="url(#jetGrad)" />
          <ellipse cx="90" cy="138" rx="5" ry="14" fill="url(#jetGrad)" />
        </g>

        {/* Floating Astronaut Dev Rig */}
        <g className="orbit-floater__body">
          {/* Cyber Backpack / Jetpack */}
          <rect x="42" y="52" width="56" height="58" rx="14" fill="#12131c" stroke="var(--accent)" strokeWidth="1.5" />
          {/* Thruster nozzles */}
          <rect x="46" y="106" width="8" height="10" rx="3" fill="#252535" />
          <rect x="86" y="106" width="8" height="10" rx="3" fill="#252535" />
          {/* Jetpack energy core */}
          <circle cx="70" cy="80" r="10" fill="rgba(255,255,255,0.05)" stroke="var(--accent)" strokeWidth="1.2" />
          <circle cx="70" cy="80" r="5" fill="var(--accent)" filter="url(#floaterGlow)" />

          {/* Left Leg (Floating in zero gravity) */}
          <g className="floater-leg floater-leg--l">
            <rect x="44" y="98" width="14" height="34" rx="6" fill="#1a1c28" />
            <rect x="40" y="128" width="18" height="10" rx="4" fill="#0c0d14" stroke="var(--accent)" strokeWidth="1" />
          </g>

          {/* Right Leg (Curved / floating) */}
          <g className="floater-leg floater-leg--r">
            <rect x="82" y="98" width="14" height="34" rx="6" fill="#1a1c28" />
            <rect x="82" y="128" width="18" height="10" rx="4" fill="#0c0d14" stroke="var(--accent)" strokeWidth="1" />
          </g>

          {/* Torso & Suit */}
          <rect x="45" y="55" width="50" height="52" rx="14" fill="#181a24" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
          <path d="M60 55 L70 70 L80 55 Z" fill="#f4f4ef" />
          <path d="M68 62 L70 82 L72 62 Z" fill="var(--accent)" />

          {/* Left Arm (Reaching forward) */}
          <g className="floater-arm floater-arm--l">
            <rect x="28" y="58" width="14" height="32" rx="6" fill="#181a24" />
            <circle cx="35" cy="94" r="6" fill="#e3aa7e" />
          </g>

          {/* Right Arm (Holding floating mini crystal orb) */}
          <g className="floater-arm floater-arm--r">
            <rect x="98" y="58" width="14" height="30" rx="6" fill="#181a24" />
            <circle cx="105" cy="92" r="6" fill="#e3aa7e" />
            {/* Hologram Floating Cube / Crystal */}
            <g className="floater-holo" transform="translate(100, 102)">
              <polygon points="5,0 12,4 12,12 5,16 -2,12 -2,4" fill="rgba(var(--accent-rgb, 200, 255, 61), 0.3)" stroke="var(--accent)" strokeWidth="1.2" />
            </g>
          </g>

          {/* Face and Hair */}
          <g transform="translate(35, 12) scale(0.5)">
            <AvatarFace idPrefix="orbitFloater" />
          </g>
        </g>
      </svg>
    </div>
  );
}
