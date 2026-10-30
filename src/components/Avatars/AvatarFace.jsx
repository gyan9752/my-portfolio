// frontend/src/components/Avatars/AvatarFace.jsx
/** Reusable SVG Face for Gyanvendra's avatar matching Intro screen */
export default function AvatarFace({ mood = 'happy', idPrefix = 'av' }) {
  const fSkin = `${idPrefix}-fSkin`;
  const fHair = `${idPrefix}-fHair`;
  const fBeard = `${idPrefix}-fBeard`;

  return (
    <g className="avatar-face">
      <defs>
        <radialGradient id={fSkin} cx=".38" cy=".3" r=".85">
          <stop offset="0" stopColor="#e3aa7e" />
          <stop offset=".6" stopColor="#c68a60" />
          <stop offset="1" stopColor="#9a6342" />
        </radialGradient>
        <radialGradient id={fHair} cx=".4" cy=".15" r=".95">
          <stop offset="0" stopColor="#3b3b48" />
          <stop offset=".5" stopColor="#14141a" />
          <stop offset="1" stopColor="#09090d" />
        </radialGradient>
        <linearGradient id={fBeard} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23232b" />
          <stop offset="1" stopColor="#09090d" />
        </linearGradient>
      </defs>

      {/* Ears & Face Base */}
      <ellipse cx="42.5" cy="48" rx="5" ry="8" fill={`url(#${fSkin})`} />
      <ellipse cx="97.5" cy="48" rx="5" ry="8" fill={`url(#${fSkin})`} />
      <ellipse cx="70" cy="46" rx="27" ry="33" fill={`url(#${fSkin})`} />
      <ellipse cx="60" cy="30" rx="15" ry="8" fill="#fff" opacity=".1" />

      {/* Eyes & Brows */}
      {mood === 'wink' ? (
        <>
          <path d="M56 43 Q60 40 64 43" stroke="#1a1210" strokeWidth="2.4" strokeLinecap="round" fill="none" />
          <ellipse cx="80" cy="43" rx="4.2" ry="2.7" fill="#fff" />
          <circle cx="80.4" cy="43" r="2.2" fill="#1a1210" />
        </>
      ) : (
        <>
          <ellipse cx="60" cy="43" rx="4.2" ry="2.7" fill="#fff" />
          <ellipse cx="80" cy="43" rx="4.2" ry="2.7" fill="#fff" />
          <circle cx="60.4" cy="43" r="2.2" fill="#1a1210" />
          <circle cx="80.4" cy="43" r="2.2" fill="#1a1210" />
          <circle cx="61.2" cy="42" r="0.7" fill="#fff" />
          <circle cx="81.2" cy="42" r="0.7" fill="#fff" />
        </>
      )}
      <path d="M53 36 Q60 31.5 67 36" stroke="#0e0e12" strokeWidth="3.4" strokeLinecap="round" fill="none" />
      <path d="M73 36 Q80 31.5 87 36" stroke="#0e0e12" strokeWidth="3.4" strokeLinecap="round" fill="none" />

      {/* Nose */}
      <path d="M70 47 Q66 56 68.5 58.5 Q70 60 72.5 58.5" stroke="#8a5535" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <ellipse cx="68" cy="52" rx="1.6" ry="3.5" fill="#fff" opacity=".18" />

      {/* Beard & Smile */}
      <path d="M43 50 C43 70 55 83 70 83 C85 83 97 70 97 50 C94 59 90 63 84 64 C78 61 62 61 56 64 C50 63 46 59 43 50 Z" fill={`url(#${fBeard})`} />
      <path d="M61 66 Q70 68 79 66 Q77 74 70 74 Q63 74 61 66 Z" fill="#fff" />
      <path d="M58 63 Q64 58.5 70 61 Q76 58.5 82 63 Q76 64.5 70 63.5 Q64 64.5 58 63 Z" fill="#0b0b0f" />

      {/* Quiff hair */}
      <path d="M42 41 C35 13 50 -4 74 -4 C95 -4 105 15 98 41 C96 32 92 26 86 24 C78 21 66 21 56 25 C48 28 44 34 42 41 Z" fill={`url(#${fHair})`} />
      <path d="M49 14 Q66 -1 91 11" stroke="#fff" strokeOpacity=".2" strokeWidth="2.6" strokeLinecap="round" fill="none" />
    </g>
  );
}
