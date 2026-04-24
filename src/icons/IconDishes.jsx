export default function IconDishes({ size = 72, color = "#F5EDB0", stroke = "#2B2B3C", accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="104" rx="42" ry="5" fill={stroke} opacity="0.08" />

      {/* tilted plate */}
      <g transform="translate(60 72) rotate(-12)">
        <ellipse cx="0" cy="0" rx="44" ry="12" fill={color} stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />
        <ellipse cx="0" cy="0" rx="30" ry="7" fill="none" stroke={stroke} strokeWidth="2" />
        <path d="M -22 -4 Q -10 -8 4 -6" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.85" />
      </g>

      {/* sponge mid-scrub */}
      <g transform="translate(50 44) rotate(22)">
        <rect x="-28" y="-11" width="56" height="22" rx="6" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
        <rect x="-28" y="-11" width="56" height="8" rx="5" fill="#FFFFFF" opacity="0.55" />
        <circle cx="-16" cy="4" r="1.8" fill={stroke} opacity="0.4" />
        <circle cx="-4" cy="7" r="1.5" fill={stroke} opacity="0.4" />
        <circle cx="10" cy="3" r="2" fill={stroke} opacity="0.4" />
        <circle cx="20" cy="6" r="1.5" fill={stroke} opacity="0.4" />
      </g>

      {/* bubbles */}
      <circle cx="92" cy="28" r="9" fill="#FFFBF4" stroke={stroke} strokeWidth="3" />
      <circle cx="89" cy="25" r="2.2" fill="#FFFFFF" />
      <circle cx="106" cy="42" r="5" fill="#FFFBF4" stroke={stroke} strokeWidth="2.5" />
      <circle cx="100" cy="16" r="3.5" fill="#FFFBF4" stroke={stroke} strokeWidth="2" />

      {/* water drips */}
      <path d="M 24 82 Q 22 90 25 98" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M 40 86 Q 38 94 41 102" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />

      {/* accent sparkle */}
      <g transform="translate(16 30)">
        <path d="M 0 -5 L 2 -1 L 6 0 L 2 1 L 0 5 L -2 1 L -6 0 L -2 -1 Z" fill={accent} />
      </g>
    </svg>
  );
}
