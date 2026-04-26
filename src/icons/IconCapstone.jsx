export default function IconCapstone({ size = 72, color = "#C7B4DB", stroke = "#2B2B3C", accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="104" rx="40" ry="5" fill={stroke} opacity="0.08" />

      {/* mortarboard top — flat parallelogram, viewed slightly from above */}
      <path d="M 60 22 L 104 40 L 60 58 L 16 40 Z"
            fill={color} stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />

      {/* highlight on the top plate */}
      <path d="M 22 40 Q 38 34 56 32" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

      {/* cap body — rounded under the board */}
      <path d="M 26 46 L 26 60 Q 26 76 60 76 Q 94 76 94 60 L 94 46"
            fill={color} stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />

      {/* tassel cord */}
      <path d="M 104 40 L 104 64" stroke={stroke} strokeWidth="3" strokeLinecap="round" />

      {/* tassel ball */}
      <circle cx="104" cy="68" r="6" fill={accent} stroke={stroke} strokeWidth="2.5" />

      {/* button on top centre */}
      <circle cx="60" cy="40" r="3" fill={stroke} />

      {/* sparkle accent */}
      <g transform="translate(20 20)">
        <path d="M 0 -6 L 2 -2 L 6 0 L 2 2 L 0 6 L -2 2 L -6 0 L -2 -2 Z" fill={accent} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      {/* small confetti dots */}
      <circle cx="14" cy="78" r="2" fill={accent} opacity="0.7" />
      <circle cx="100" cy="92" r="1.8" fill="#EDB9BE" />
    </svg>
  );
}
