export default function IconGarbage({ size = 72, color = "#F3CDB3", stroke = "#2B2B3C", accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="106" rx="40" ry="5" fill={stroke} opacity="0.08" />

      {/* bin body — slight trapezoid */}
      <path d="M 30 40 L 90 40 L 86 100 L 34 100 Z"
            fill={color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />

      {/* vertical ribs */}
      <line x1="48" y1="46" x2="46" y2="94" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="60" y1="46" x2="60" y2="94" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.55" />
      <line x1="72" y1="46" x2="74" y2="94" stroke={stroke} strokeWidth="2" strokeLinecap="round" opacity="0.55" />

      {/* lid askew */}
      <g transform="translate(60 34) rotate(-8)">
        <rect x="-36" y="-8" width="72" height="12" rx="4" fill={color} stroke={stroke} strokeWidth="4.5" strokeLinejoin="round" />
        <rect x="-8" y="-14" width="16" height="6" rx="2" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
      </g>

      {/* banana peel poking out */}
      <g transform="translate(74 36) rotate(32)">
        <path d="M -2 -14 Q 6 -10 10 0 Q 14 14 6 22 Q 14 16 12 6 Q 10 -6 2 -14 Z"
              fill="#F5EDB0" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      </g>

      {/* stink line + fly */}
      <path d="M 26 18 Q 30 14 26 10 Q 22 6 26 2" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="26" r="2.5" fill={stroke} />
      <path d="M 17 23 Q 14 20 17 24 M 27 23 Q 30 20 27 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />

      {/* accent recycle sparkle */}
      <g transform="translate(100 22)">
        <path d="M 0 -6 L 2 -2 L 6 0 L 2 2 L 0 6 L -2 2 L -6 0 L -2 -2 Z" fill={accent} />
      </g>
    </svg>
  );
}
