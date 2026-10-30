// frontend/src/components/Avatars/AvatarContactDesk.jsx
import AvatarFace from './AvatarFace';
import './AvatarContactDesk.css';

export default function AvatarContactDesk({ status = 'idle' }) {
  const isSent = status === 'sent';

  return (
    <div className={`contact-avatar ${isSent ? 'is-celebrating' : ''}`}>
      {/* Speech Bubble / Status */}
      <div className="contact-avatar__bubble">
        {isSent ? (
          <span>Message on the way! 🎉🚀</span>
        ) : (
          <span>Got a project? Let's talk! ☕</span>
        )}
      </div>

      {/* Flying Paper Plane Effect on Sent */}
      {isSent && (
        <div className="contact-avatar__plane" aria-hidden="true">
          <svg viewBox="0 0 40 40" width="34" height="34">
            <polygon points="0,20 38,4 20,38 18,22" fill="var(--accent)" stroke="#fff" strokeWidth="1" />
          </svg>
          <span className="contact-avatar__contrail" />
        </div>
      )}

      <svg viewBox="0 0 200 180" className="contact-avatar__svg">
        <defs>
          <filter id="contactGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Glow */}
        <circle cx="100" cy="90" r="70" fill="var(--accent)" opacity="0.08" />

        {/* Desk Surface */}
        <rect x="15" y="145" width="170" height="8" rx="4" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <line x1="20" y1="145" x2="180" y2="145" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

        {/* Coffee Mug with Heart */}
        <g transform="translate(142, 126)">
          <rect x="0" y="5" width="15" height="14" rx="3" fill="#181a24" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <path d="M15 8 C18 8 18 14 15 14" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" />
          <circle cx="7.5" cy="12" r="2.5" fill="var(--accent)" />
          {/* Steam */}
          <path className="contact-steam" d="M4 2 Q7 -2 4 -5" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
        </g>

        {/* Character Body */}
        <g className="contact-char">
          {/* Torso */}
          <rect x="70" y="85" width="60" height="65" rx="16" fill="#1b1d28" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <path d="M90 85 L100 102 L110 85 Z" fill="#f4f4ef" />
          <path d="M97 95 L100 120 L103 95 Z" fill="var(--accent)" />

          {/* Arms */}
          {isSent ? (
            /* Celebrating Double Cheer Arms */
            <g className="cheer-arms">
              <path d="M72 90 Q50 60 45 42" stroke="#1b1d28" strokeWidth="12" strokeLinecap="round" fill="none" />
              <circle cx="44" cy="40" r="6" fill="#e3aa7e" />
              <path d="M128 90 Q150 60 155 42" stroke="#1b1d28" strokeWidth="12" strokeLinecap="round" fill="none" />
              <circle cx="156" cy="40" r="6" fill="#e3aa7e" />
            </g>
          ) : (
            /* Rested / Waving Arm */
            <g className="normal-arms">
              <path d="M72 90 Q60 115 75 142" stroke="#1b1d28" strokeWidth="12" strokeLinecap="round" fill="none" />
              <circle cx="76" cy="142" r="6" fill="#e3aa7e" />
              <path d="M128 90 Q145 115 130 142" stroke="#1b1d28" strokeWidth="12" strokeLinecap="round" fill="none" />
              <circle cx="130" cy="142" r="6" fill="#e3aa7e" />
            </g>
          )}

          {/* Face */}
          <g transform="translate(50, 30) scale(0.72)">
            <AvatarFace idPrefix="contactDev" mood={isSent ? 'wink' : 'happy'} />
          </g>
        </g>
      </svg>
    </div>
  );
}
