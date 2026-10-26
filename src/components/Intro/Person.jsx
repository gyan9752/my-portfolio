/** Flat SVG character with soft shading. `pose`: idle | walk | shake | clap. Pass the head as children. */
export default function Person({ pose, suit, shirt = '#f4f4ef', tie, skin = '#f2c9a5', children }) {
  const shade = (x, y, w, h, rx) => <rect x={x} y={y} width={w} height={h} rx={rx} fill="url(#introShade)" />;

  const arm = (side, x) => (
    <g className={`arm arm--${side}`}>
      <rect x={x - 8} y="98" width="16" height="46" rx="8" fill={suit} />
      {shade(x - 8, 98, 16, 46, 8)}
      <g className={`fore fore--${side}`}>
        <rect x={x - 8} y="136" width="16" height="46" rx="8" fill={suit} />
        {shade(x - 8, 136, 16, 46, 8)}
        <circle cx={x} cy="184" r="9" fill={skin} />
      </g>
    </g>
  );

  return (
    <g className={`p p--${pose}`}>
      <g className="p__body">
        <g className="leg leg--l">
          <rect x="46" y="172" width="22" height="86" rx="10" fill="#1b1e2e" />
          {shade(46, 172, 22, 86, 10)}
          <rect x="42" y="250" width="32" height="14" rx="7" fill="#0c0d14" />
        </g>
        <g className="leg leg--r">
          <rect x="72" y="172" width="22" height="86" rx="10" fill="#1b1e2e" />
          {shade(72, 172, 22, 86, 10)}
          <rect x="68" y="250" width="32" height="14" rx="7" fill="#0c0d14" />
        </g>
        <rect x="36" y="82" width="68" height="100" rx="24" fill={suit} />
        {shade(36, 82, 68, 100, 24)}
        <rect x="62" y="70" width="16" height="20" rx="6" fill={skin} />
        <path d="M56 84 L70 118 L84 84 Z" fill={shirt} />
        <path d="M62 84 L70 96 L78 84 Z" fill={skin} />
        {tie && <path d="M70 108 L65 116 L70 156 L75 116 Z" fill={tie} />}
        <path d="M56 84 L47 124 L68 106 L61 90 Z M84 84 L93 124 L72 106 L79 90 Z" fill="rgba(0,0,0,.28)" stroke="rgba(255,255,255,.08)" />
        {arm('l', 44)}
        {arm('r', 96)}
        {children}
      </g>
    </g>
  );
}
