export default function IconLaundry({ size = 72, color = "#B5C4E6", stroke = "#2B2B3C", accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="104" rx="40" ry="5" fill={stroke} opacity="0.08" />

      {/* machine drum outer */}
      <circle cx="60" cy="58" r="44" fill={color} stroke={stroke} strokeWidth="5" />
      {/* machine latch / top dial hint */}
      <circle cx="60" cy="14" r="4" fill={color} stroke={stroke} strokeWidth="2.5" />

      {/* porthole inner */}
      <circle cx="60" cy="58" r="34" fill="#FFFBF4" stroke={stroke} strokeWidth="3" />

      {/* water waves at bottom of porthole */}
      <path d="M 30 66 Q 40 61 50 66 T 70 66 T 90 66" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 34 74 Q 44 70 54 74 T 74 74 T 88 74" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.6" />

      {/* tumbling shirt */}
      <g transform="translate(60 50) rotate(-22)">
        <path d="M -14 -8 L -20 -2 L -16 4 L -10 0 L -10 12 L 10 12 L 10 0 L 16 4 L 20 -2 L 14 -8 L 8 -6 L 8 -10 L -8 -10 L -8 -6 Z"
              fill={color} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        <path d="M -5 -5 Q 0 -7 5 -5" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* bubbles inside */}
      <circle cx="42" cy="42" r="2.5" fill="#FFFFFF" stroke={stroke} strokeWidth="1.5" />
      <circle cx="80" cy="48" r="1.8" fill="#FFFFFF" stroke={stroke} strokeWidth="1.5" />

      {/* outer bubble */}
      <circle cx="98" cy="22" r="5" fill="#FFFBF4" stroke={stroke} strokeWidth="2.5" />

      {/* accent sparkle */}
      <g transform="translate(22 24)">
        <path d="M 0 -5 L 2 -1 L 6 0 L 2 1 L 0 5 L -2 1 L -6 0 L -2 -1 Z" fill={accent} />
      </g>
    </svg>
  );
}
