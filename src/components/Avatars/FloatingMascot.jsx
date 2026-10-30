// frontend/src/components/Avatars/FloatingMascot.jsx
import { useState } from 'react';
import { X, Sparkles, MessageSquare } from 'lucide-react';
import AvatarFace from './AvatarFace';
import { sound } from '../../services/sound';
import './FloatingMascot.css';

const MESSAGES = [
  "Hey there! Need a modern web app? 👋",
  "React, Node.js & Next.js specialist! ⚡",
  "Scroll down to explore my journey! 🚀",
  "Ready to discuss your tech ideas! 💡",
  "Click 'Book Call' to talk directly! 📅",
];

export default function FloatingMascot() {
  const [minimized, setMinimized] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [isWaving, setIsWaving] = useState(false);

  const handleClick = () => {
    sound.playClick();
    setIsWaving(true);
    setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    setTimeout(() => setIsWaving(false), 800);
  };

  if (minimized) {
    return (
      <button
        className="mascot-docked"
        onClick={() => {
          sound.playClick();
          setMinimized(false);
        }}
        title="Open Gyanvendra Assistant"
        aria-label="Open Gyanvendra Mascot"
      >
        <span className="mascot-docked__dot" />
        <svg viewBox="0 0 100 100" width="36" height="36">
          <AvatarFace idPrefix="mascotMin" mood="happy" />
        </svg>
      </button>
    );
  }

  return (
    <div className="mascot">
      {/* Speech Bubble */}
      <div className="mascot__bubble" onClick={handleClick}>
        <p>{MESSAGES[msgIndex]}</p>
        <button
          className="mascot__close"
          onClick={(e) => {
            e.stopPropagation();
            sound.playClick();
            setMinimized(true);
          }}
          aria-label="Minimize companion"
          title="Minimize companion"
        >
          <X size={13} />
        </button>
      </div>

      {/* Avatar Body */}
      <button
        className={`mascot__body-btn ${isWaving ? 'is-waving' : ''}`}
        onClick={handleClick}
        onMouseEnter={() => sound.playHover()}
        aria-label="Interactive Avatar Mascot"
      >
        <svg viewBox="0 0 120 120" className="mascot__svg">
          {/* Torso & Suit */}
          <rect x="35" y="60" width="50" height="55" rx="14" fill="#14141e" stroke="var(--accent)" strokeWidth="1.2" />
          <path d="M50 60 L60 76 L70 60 Z" fill="#f4f4ef" />
          <path d="M58 68 L60 88 L62 68 Z" fill="var(--accent)" />

          {/* Left Waving Arm */}
          <g className="mascot-arm-wave">
            <path d="M36 65 Q18 45 20 30" stroke="#14141e" strokeWidth="11" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="28" r="5.5" fill="#e3aa7e" />
          </g>

          {/* Right Arm */}
          <path d="M84 65 Q96 82 88 100" stroke="#14141e" strokeWidth="11" strokeLinecap="round" fill="none" />
          <circle cx="88" cy="100" r="5.5" fill="#e3aa7e" />

          {/* Face */}
          <g transform="translate(25, 12) scale(0.7)">
            <AvatarFace idPrefix="mascotFull" mood={isWaving ? 'wink' : 'happy'} />
          </g>
        </svg>

        <span className="mascot__glow" />
      </button>
    </div>
  );
}
