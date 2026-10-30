// frontend/src/components/Avatars/AvatarDeskCoder.jsx
import AvatarFace from './AvatarFace';
import './AvatarDeskCoder.css';

export default function AvatarDeskCoder({ onInteract }) {
  return (
    <div className="desk-coder" onClick={onInteract} role="img" aria-label="Gyanvendra coding at his desk">
      {/* Floating Code Badges / Particles */}
      <div className="desk-coder__code-floaters" aria-hidden="true">
        <span className="code-pill code-pill--1">&lt;React /&gt;</span>
        <span className="code-pill code-pill--2">&#123; Node.js &#125;</span>
        <span className="code-pill code-pill--3">API 200 OK</span>
        <span className="code-pill code-pill--4">git push</span>
      </div>

      <svg viewBox="0 0 280 260" className="desk-coder__svg">
        <defs>
          {/* Laptop Screen Glow Gradient */}
          <linearGradient id="coderScreenGlow" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
          </linearGradient>

          {/* Desk Surface Gradient */}
          <linearGradient id="deskTopGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>

          {/* Screen Light Cone Projection */}
          <linearGradient id="screenBeam" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.32" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Ambient background glow from monitor */}
        <circle cx="140" cy="110" r="90" fill="var(--accent)" opacity="0.08" filter="blur(20px)" />

        {/* Chair Backrest */}
        <rect x="95" y="65" width="90" height="120" rx="20" fill="#14141d" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <path d="M105 85 Q140 75 175 85" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />

        {/* Coder Body (Torso & Head) */}
        <g className="desk-coder__body">
          {/* Torso / Dark Blazer */}
          <rect x="105" y="115" width="70" height="95" rx="18" fill="#1b1d28" />
          {/* Collar & Tie */}
          <path d="M128 115 L140 138 L152 115 Z" fill="#f4f4ef" />
          <path d="M136 128 L140 160 L144 128 Z" fill="var(--accent)" />

          {/* Head & Face */}
          <g transform="translate(70, 48) scale(1)">
            <AvatarFace idPrefix="heroCoder" />
          </g>

          {/* Glowing Headset (Cyberpunk Dev Look) */}
          <g className="desk-coder__headset">
            <path d="M102 85 C95 48, 185 48, 178 85" stroke="var(--accent)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <rect x="98" y="80" width="8" height="18" rx="4" fill="var(--accent)" />
            <rect x="174" y="80" width="8" height="18" rx="4" fill="var(--accent)" />
            {/* Mic */}
            <path d="M102 96 Q108 110 120 108" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="120" cy="108" r="2.5" fill="#f4f4ef" />
          </g>
        </g>

        {/* Glass Work Desk */}
        <g className="desk-coder__desk">
          {/* Desk shadow */}
          <ellipse cx="140" cy="245" rx="110" ry="8" fill="#000" opacity="0.4" />
          {/* Desk Legs */}
          <line x1="35" y1="205" x2="25" y2="245" stroke="#252535" strokeWidth="4" strokeLinecap="round" />
          <line x1="245" y1="205" x2="255" y2="245" stroke="#252535" strokeWidth="4" strokeLinecap="round" />
          {/* Desk Top */}
          <rect x="20" y="200" width="240" height="12" rx="6" fill="url(#deskTopGrad)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line x1="26" y1="201" x2="254" y2="201" stroke="var(--accent)" strokeOpacity="0.4" strokeWidth="1.5" />
        </g>

        {/* Steaming Coffee Cup on Desk */}
        <g className="desk-coder__coffee" transform="translate(42, 178)">
          <rect x="0" y="10" width="18" height="14" rx="3" fill="#1b1e2a" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <path d="M18 13 C22 13 22 20 18 20" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" fill="none" />
          <path d="M4 14 H14" stroke="var(--accent)" strokeWidth="1.5" />
          {/* Steam curls */}
          <path className="steam steam--1" d="M5 8 Q7 4 5 1" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          <path className="steam steam--2" d="M12 7 Q14 3 12 0" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>

        {/* Laptop & Typing Hands */}
        <g className="desk-coder__laptop-rig">
          {/* Screen Light Cone Beam */}
          <polygon points="110,200 170,200 190,135 90,135" fill="url(#screenBeam)" />

          {/* Laptop Base (Keyboard) */}
          <polygon points="98,206 182,206 174,196 106,196" fill="#14141e" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Trackpad */}
          <rect x="130" y="201" width="20" height="4" rx="1" fill="rgba(255,255,255,0.15)" />

          {/* Laptop Open Screen */}
          <polygon points="106,196 174,196 170,146 110,146" fill="#0d0e14" stroke="var(--accent)" strokeWidth="1.2" />
          {/* Screen Display Content */}
          <rect x="114" y="150" width="52" height="42" rx="2" fill="url(#coderScreenGlow)" />
          {/* Code lines on screen */}
          <line x1="118" y1="156" x2="140" y2="156" stroke="var(--accent-contrast, #000)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="122" y1="162" x2="158" y2="162" stroke="var(--accent-contrast, #000)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="122" y1="168" x2="146" y2="168" stroke="var(--accent-contrast, #000)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="118" y1="174" x2="134" y2="174" stroke="var(--accent-contrast, #000)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="122" y1="180" x2="162" y2="180" stroke="var(--accent-contrast, #000)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Typing Hands / Arms */}
          <g className="desk-coder__hands">
            {/* Left Arm & Hand */}
            <path className="hand-type hand-type--l" d="M102 145 Q108 185 124 198" stroke="#1b1d28" strokeWidth="14" strokeLinecap="round" fill="none" />
            <circle className="hand-finger hand-finger--l" cx="126" cy="199" r="6" fill="#e3aa7e" />

            {/* Right Arm & Hand */}
            <path className="hand-type hand-type--r" d="M178 145 Q172 185 156 198" stroke="#1b1d28" strokeWidth="14" strokeLinecap="round" fill="none" />
            <circle className="hand-finger hand-finger--r" cx="154" cy="199" r="6" fill="#e3aa7e" />
          </g>
        </g>
      </svg>

      {/* Floating Status Tag */}
      <div className="desk-coder__tag">
        <span className="desk-coder__pulse-dot" />
        <span>Live Coding • React & Node.js</span>
      </div>
    </div>
  );
}
