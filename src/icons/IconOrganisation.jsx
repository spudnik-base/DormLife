export default function IconOrganisation({ size = 72, color = "#C7B4DB", stroke = "#2B2B3C", accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="106" rx="40" ry="5" fill={stroke} opacity="0.08" />

      {/* shelf unit — outer frame */}
      <rect x="18" y="30" width="84" height="72" rx="6" fill={color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
      {/* shelf divider */}
      <line x1="18" y1="66" x2="102" y2="66" stroke={stroke} strokeWidth="4" strokeLinecap="round" />

      {/* top shelf: stacked books leaning */}
      <g transform="translate(32 36)">
        <rect x="0" y="16" width="8" height="22" rx="1.5" fill="#FFFBF4" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
        <rect x="10" y="14" width="8" height="24" rx="1.5" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
        <g transform="translate(26 14) rotate(12)">
          <rect x="0" y="0" width="8" height="24" rx="1.5" fill="#FFFBF4" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
        </g>
      </g>

      {/* top shelf: small plant */}
      <g transform="translate(80 36)">
        <rect x="-6" y="22" width="12" height="10" rx="2" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 0 22 Q -4 14 -8 8 Q -2 14 0 22 Q 2 14 8 8 Q 4 14 0 22" fill="#BCDCC2" stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      </g>

      {/* bottom shelf: gift box with bow */}
      <g transform="translate(40 74)">
        <rect x="0" y="0" width="40" height="22" rx="3" fill="#FFFBF4" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        <line x1="20" y1="0" x2="20" y2="22" stroke={stroke} strokeWidth="2.5" />
        <path d="M 14 -2 Q 14 -8 18 -8 Q 22 -8 20 -2 Q 18 -8 22 -8 Q 26 -8 26 -2" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      </g>

      {/* legs */}
      <line x1="26" y1="102" x2="26" y2="108" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <line x1="94" y1="102" x2="94" y2="108" stroke={stroke} strokeWidth="4" strokeLinecap="round" />

      {/* accent sparkle */}
      <g transform="translate(102 22)">
        <path d="M 0 -5 L 2 -1 L 6 0 L 2 1 L 0 5 L -2 1 L -6 0 L -2 -1 Z" fill={accent} />
      </g>
    </svg>
  );
}
