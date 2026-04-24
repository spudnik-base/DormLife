export default function IconCommunity({ size = 72, color = "#BCDCC2", stroke = "#2B2B3C", accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="60" cy="104" rx="42" ry="5" fill={stroke} opacity="0.08" />

      {/* left figure */}
      <g transform="translate(40 0)">
        <circle cx="0" cy="42" r="16" fill={color} stroke={stroke} strokeWidth="5" />
        <path d="M -22 100 Q -22 72 0 72 Q 22 72 22 100 Z"
              fill={color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
        {/* face */}
        <circle cx="-5" cy="42" r="1.8" fill={stroke} />
        <circle cx="5" cy="42" r="1.8" fill={stroke} />
        <path d="M -4 47 Q 0 50 4 47" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* right figure */}
      <g transform="translate(80 6)">
        <circle cx="0" cy="38" r="14" fill={color} stroke={stroke} strokeWidth="5" />
        <path d="M -20 94 Q -20 68 0 68 Q 20 68 20 94 Z"
              fill={color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
        {/* face */}
        <circle cx="-4" cy="38" r="1.6" fill={stroke} />
        <circle cx="4" cy="38" r="1.6" fill={stroke} />
        <path d="M -3 43 Q 0 45 3 43" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* heart between them */}
      <g transform="translate(60 20)">
        <path d="M 0 10 Q -10 0 -10 -6 Q -10 -12 -4 -12 Q 0 -12 0 -6 Q 0 -12 4 -12 Q 10 -12 10 -6 Q 10 0 0 10 Z"
              fill={accent} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      </g>

      {/* speech dot */}
      <circle cx="104" cy="56" r="3" fill={color} stroke={stroke} strokeWidth="2" />

      {/* small ground dots */}
      <circle cx="24" cy="96" r="1.8" fill={accent} opacity="0.7" />
      <circle cx="100" cy="90" r="1.8" fill={stroke} opacity="0.5" />
    </svg>
  );
}
