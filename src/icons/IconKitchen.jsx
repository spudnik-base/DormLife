export default function IconKitchen({ size = 72, color = "#EDB9BE", stroke = "#2B2B3C", accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="102" rx="38" ry="5" fill={stroke} opacity="0.08" />

      {/* steam curls */}
      <path d="M 42 22 Q 38 18 42 14 Q 46 10 42 6" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 60 18 Q 56 14 60 10 Q 64 6 60 2" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 76 22 Q 72 18 76 14 Q 80 10 76 6" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />

      {/* pan body */}
      <g transform="translate(60 68)">
        <ellipse cx="0" cy="0" rx="38" ry="10" fill={color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
        <path d="M -38 0 L -34 14 Q -28 20 0 20 Q 28 20 34 14 L 38 0"
              fill={color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" strokeLinecap="round" />
        <ellipse cx="0" cy="0" rx="30" ry="6" fill="none" stroke={stroke} strokeWidth="2" opacity="0.6" />
      </g>

      {/* egg yolk */}
      <circle cx="50" cy="66" r="6" fill="#F5EDB0" stroke={stroke} strokeWidth="2.5" />
      <path d="M 44 66 Q 40 62 44 58" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.9" />

      {/* handle */}
      <g transform="translate(92 60) rotate(-20)">
        <rect x="0" y="-5" width="26" height="10" rx="4" fill={color} stroke={stroke} strokeWidth="4" strokeLinejoin="round" />
      </g>

      {/* flames under pan */}
      <g transform="translate(60 92)">
        <path d="M -14 0 Q -10 -10 -6 -4 Q -2 -12 2 -4 Q 6 -12 10 -4 Q 14 -10 12 0 Z"
              fill="#F3CDB3" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        <path d="M -6 -2 Q -2 -8 2 -2" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* accent sparkle */}
      <g transform="translate(22 42)">
        <path d="M 0 -5 L 2 -1 L 6 0 L 2 1 L 0 5 L -2 1 L -6 0 L -2 -1 Z" fill={accent} />
      </g>
    </svg>
  );
}
