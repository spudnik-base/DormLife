/* UI icons used outside the module/tip set. Two flavours:
   - Small inline icons: 24x24, stroke="currentColor", fill="none". They
     pick up the surrounding text colour, matching the nav icon pattern.
   - Large illustrated icons: chunky-illustration style with pastel fill +
     ink stroke + accent details. Used at hero scale (Trophy, Celebrate,
     Retry) where the brand vibe matters more than legibility.
*/

const INK = "#2B2B3C";

/* ── small line icons (currentColor stroke) ───────────────── */

export function IconLearn({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d="M 3 5 Q 3 4 4 4 L 11 4 Q 12 4 12 5 L 12 19 Q 12 20 11 20 L 4 20 Q 3 20 3 19 Z" />
      <path d="M 21 5 Q 21 4 20 4 L 13 4 Q 12 4 12 5 L 12 19 Q 12 20 13 20 L 20 20 Q 21 20 21 19 Z" />
      <path d="M 6 8 H 9 M 6 12 H 9 M 15 8 H 18 M 15 12 H 18" />
    </svg>
  );
}

export function IconQuiz({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d="M 8 18 L 16 18 M 9 21 L 15 21" />
      <path d="M 7 13 A 5 5 0 1 1 17 13 Q 17 14.5 15.5 16 L 8.5 16 Q 7 14.5 7 13 Z" />
      <path d="M 12 4 V 2 M 19 6 L 20.5 4.5 M 5 6 L 3.5 4.5 M 4 12 H 2 M 22 12 H 20" />
    </svg>
  );
}

export function IconCheckIn({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <rect x="4" y="6" width="16" height="15" rx="2.5" />
      <path d="M 9 6 V 4 H 15 V 6" />
      <path d="M 8 13 L 11 16 L 16 10" />
    </svg>
  );
}

export function IconClipboard({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <rect x="5" y="5" width="14" height="17" rx="2.5" />
      <path d="M 9 5 V 3 H 15 V 5" />
      <path d="M 8 11 H 16 M 8 15 H 14" />
    </svg>
  );
}

export function IconChart({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d="M 4 21 H 21" />
      <path d="M 7 18 V 11 M 12 18 V 6 M 17 18 V 14" />
    </svg>
  );
}

export function IconCheck({ size = 18 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
      <path d="M 5 13 L 10 18 L 19 7" />
    </svg>
  );
}

/* ── large illustrated icons (pastel + ink + accent) ─────── */

export function IconTrophy({ size = 56, color = "#F5EDB0", stroke = INK, accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="32" cy="58" rx="20" ry="3" fill={stroke} opacity="0.08" />
      {/* base */}
      <rect x="22" y="46" width="20" height="6" rx="1.5" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="18" y="52" width="28" height="5" rx="1.5" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      {/* stem */}
      <rect x="28" y="42" width="8" height="6" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      {/* cup body */}
      <path d="M 16 10 L 48 10 L 47 28 Q 45 42 32 42 Q 19 42 17 28 Z"
            fill={color} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      {/* handles */}
      <path d="M 16 14 Q 8 14 8 22 Q 8 30 18 30" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M 48 14 Q 56 14 56 22 Q 56 30 46 30" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" />
      {/* star */}
      <path d="M 32 18 L 35 24 L 41 25 L 36 29 L 38 35 L 32 32 L 26 35 L 28 29 L 23 25 L 29 24 Z"
            fill={accent} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
      {/* highlight */}
      <path d="M 22 14 Q 20 22 22 30" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export function IconCelebrate({ size = 64, color = "#BCDCC2", stroke = INK, accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* central big sparkle */}
      <path d="M 32 6 L 36 24 L 54 28 L 36 32 L 32 50 L 28 32 L 10 28 L 28 24 Z"
            fill={accent} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      <circle cx="32" cy="28" r="5" fill="#FFFFFF" stroke={stroke} strokeWidth="2.5" />

      {/* surrounding small sparkles */}
      <g transform="translate(8 12)">
        <path d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z" fill={color} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <g transform="translate(56 14)">
        <path d="M 0 -3 L 1 -1 L 3 0 L 1 1 L 0 3 L -1 1 L -3 0 L -1 -1 Z" fill="#EDB9BE" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <g transform="translate(54 50)">
        <path d="M 0 -4 L 1 -1 L 4 0 L 1 1 L 0 4 L -1 1 L -4 0 L -1 -1 Z" fill="#F5EDB0" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <g transform="translate(10 50)">
        <path d="M 0 -3 L 1 -1 L 3 0 L 1 1 L 0 3 L -1 1 L -3 0 L -1 -1 Z" fill="#B5C4E6" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      </g>

      {/* confetti dots */}
      <circle cx="14" cy="32" r="2" fill={color} stroke={stroke} strokeWidth="1.5" />
      <circle cx="50" cy="34" r="1.8" fill="#EDB9BE" stroke={stroke} strokeWidth="1.5" />
      <circle cx="20" cy="58" r="1.6" fill={accent} />
      <circle cx="44" cy="56" r="1.6" fill="#F5EDB0" stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}

export function IconRetry({ size = 64, color = "#F3CDB3", stroke = INK, accent = "#7A6BD1" }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="32" cy="58" rx="20" ry="3" fill={stroke} opacity="0.08" />
      {/* circular refresh arrow */}
      <path d="M 14 32 A 18 18 0 1 1 32 50"
            fill="none" stroke={stroke} strokeWidth="5" strokeLinecap="round" />
      <path d="M 14 32 L 14 22 L 24 32 Z"
            fill={color} stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
      {/* heart in center for encouragement */}
      <path d="M 32 36 Q 24 30 24 24 Q 24 19 28 19 Q 32 19 32 24 Q 32 19 36 19 Q 40 19 40 24 Q 40 30 32 36 Z"
            fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      {/* spark accent */}
      <g transform="translate(50 14)">
        <path d="M 0 -6 L 1.5 -1.5 L 6 0 L 1.5 1.5 L 0 6 L -1.5 1.5 L -6 0 L -1.5 -1.5 Z" fill={accent} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
