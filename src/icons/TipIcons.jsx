/* Small single-object icons used inside module Learn tabs.
   32x32 viewBox, rendered at ~28px. Prop contract:
     { size = 28, color, stroke = "#2B2B3C" }
   color defaults to the module's pastel when the tip is rendered via TIP_ICONS.
*/

const INK = "#2B2B3C";

const wrap = (children, size) => (
  <svg viewBox="0 0 32 32" width={size} height={size} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">{children}</svg>
);

/* ── dishes ──────────────────────────────────────────────── */
export const TipDrop = ({ size = 28, color = "#F5EDB0", stroke = INK }) => wrap(
  <>
    <path d="M 16 4 C 10 12, 7 17, 7 21 A 9 9 0 0 0 25 21 C 25 17, 22 12, 16 4 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 11 22 Q 12 26 15 26" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
  </>, size
);

export const TipThermo = ({ size = 28, color = "#F5EDB0", stroke = INK }) => wrap(
  <>
    <rect x="12.5" y="4" width="7" height="18" rx="3.5" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="16" cy="24.5" r="4.5" fill={color} stroke={stroke} strokeWidth="2.5" />
    <line x1="21" y1="9" x2="24" y2="9" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <line x1="21" y1="13" x2="24" y2="13" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <line x1="21" y1="17" x2="24" y2="17" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
  </>, size
);

export const TipOrder = ({ size = 28, color = "#F5EDB0", stroke = INK }) => wrap(
  <>
    <rect x="3" y="7" width="26" height="4" rx="2" fill={color} stroke={stroke} strokeWidth="2.2" />
    <rect x="6" y="14" width="20" height="4" rx="2" fill={color} stroke={stroke} strokeWidth="2.2" />
    <rect x="9" y="21" width="14" height="4" rx="2" fill={color} stroke={stroke} strokeWidth="2.2" />
  </>, size
);

export const TipWind = ({ size = 28, color = "#F5EDB0", stroke = INK }) => wrap(
  <>
    <path d="M 4 11 L 20 11 Q 24 11 24 7 Q 24 4 21 4" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 4 17 L 25 17 Q 29 17 29 13 Q 29 10 26 10" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M 4 23 L 18 23 Q 22 23 22 27 Q 22 30 19 30" fill="none" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </>, size
);

/* ── laundry ─────────────────────────────────────────────── */
export const TipTag = ({ size = 28, color = "#B5C4E6", stroke = INK }) => wrap(
  <>
    <path d="M 14 3 L 28 3 L 28 17 L 17 28 L 3 14 L 14 3 Z" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="21" cy="10" r="2.5" fill="#FFFBF4" stroke={stroke} strokeWidth="2" />
    <line x1="8" y1="18" x2="16" y2="18" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
  </>, size
);

export const TipScale = ({ size = 28, color = "#B5C4E6", stroke = INK }) => wrap(
  <>
    <line x1="16" y1="5" x2="16" y2="27" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="5" y1="9" x2="27" y2="9" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 8 9 L 4 17 Q 4 20 8 20 Q 12 20 12 17 L 8 9 Z" fill={color} stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
    <path d="M 24 9 L 20 17 Q 20 20 24 20 Q 28 20 28 17 L 24 9 Z" fill={color} stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
    <rect x="12" y="26" width="8" height="2.5" rx="1" fill={stroke} />
  </>, size
);

export const TipBolt = ({ size = 28, color = "#B5C4E6", stroke = INK }) => wrap(
  <path d="M 18 3 L 7 18 L 14 18 L 12 29 L 24 13 L 16 13 L 18 3 Z"
    fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
  , size
);

/* ── garbage ─────────────────────────────────────────────── */
export const TipRecycle = ({ size = 28, color = "#F3CDB3", stroke = INK }) => wrap(
  <>
    <path d="M 16 5 L 11 13 L 14.5 13 L 14.5 18 L 17.5 18 L 17.5 13 L 21 13 Z"
      fill={color} stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
    <g transform="rotate(120 16 16)">
      <path d="M 16 5 L 11 13 L 14.5 13 L 14.5 18 L 17.5 18 L 17.5 13 L 21 13 Z"
        fill={color} stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
    </g>
    <g transform="rotate(240 16 16)">
      <path d="M 16 5 L 11 13 L 14.5 13 L 14.5 18 L 17.5 18 L 17.5 13 L 21 13 Z"
        fill={color} stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
    </g>
  </>, size
);

export const TipCalendar = ({ size = 28, color = "#F3CDB3", stroke = INK }) => wrap(
  <>
    <rect x="4" y="7" width="24" height="22" rx="3" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="4" y1="13" x2="28" y2="13" stroke={stroke} strokeWidth="2.2" />
    <line x1="10" y1="3" x2="10" y2="10" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    <line x1="22" y1="3" x2="22" y2="10" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="19" y="18" width="5" height="5" rx="1" fill={stroke} />
  </>, size
);

export const TipBroom = ({ size = 28, color = "#F3CDB3", stroke = INK }) => wrap(
  <>
    <line x1="22" y1="6" x2="11" y2="17" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    <path d="M 7 15 L 20 28 L 26 23 L 13 10 Z" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="12" y1="20" x2="17" y2="25" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
    <line x1="15" y1="17" x2="20" y2="22" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
  </>, size
);

export const TipKnot = ({ size = 28, color = "#F3CDB3", stroke = INK }) => wrap(
  <>
    <path d="M 6 6 C 14 14, 18 18, 26 26" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
    <path d="M 6 26 C 14 18, 18 14, 26 6" fill="none" stroke={stroke} strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="5" fill={color} stroke={stroke} strokeWidth="2.5" />
  </>, size
);

/* ── organisation ────────────────────────────────────────── */
export const TipFolder = ({ size = 28, color = "#C7B4DB", stroke = INK }) => wrap(
  <>
    <path d="M 3 8 L 12 8 L 15 11 L 28 11 L 28 25 Q 28 27 26 27 L 5 27 Q 3 27 3 25 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="3" y1="15" x2="28" y2="15" stroke={stroke} strokeWidth="2" opacity="0.5" />
  </>, size
);

export const TipRefresh = ({ size = 28, color = "#C7B4DB", stroke = INK }) => wrap(
  <>
    <path d="M 5 16 A 11 11 0 1 1 16 27" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    <path d="M 5 16 L 5 10 L 11 16 Z" fill={color} stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
  </>, size
);

export const TipMoon = ({ size = 28, color = "#C7B4DB", stroke = INK }) => wrap(
  <>
    <path d="M 21 4 A 12 12 0 1 0 28 21 A 10 10 0 0 1 21 4 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="9" cy="10" r="1.2" fill={stroke} />
    <circle cx="5" cy="18" r="1" fill={stroke} />
  </>, size
);

export const TipHands = ({ size = 28, color = "#C7B4DB", stroke = INK }) => wrap(
  <>
    <path d="M 3 14 Q 3 10 7 10 L 13 10 Q 15 10 15 12 L 15 20 Q 15 22 13 22 L 7 22 Q 3 22 3 18 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 29 14 Q 29 10 25 10 L 19 10 Q 17 10 17 12 L 17 20 Q 17 22 19 22 L 25 22 Q 29 22 29 18 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="16" cy="16" r="2" fill="#FFFBF4" stroke={stroke} strokeWidth="2" />
  </>, size
);

/* ── kitchen ─────────────────────────────────────────────── */
export const TipKnife = ({ size = 28, color = "#EDB9BE", stroke = INK }) => wrap(
  <>
    <path d="M 5 22 L 22 5 Q 26 5 26 9 L 14 22 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="3" y="22" width="15" height="5" rx="1.5" fill={stroke} />
  </>, size
);

export const TipSpray = ({ size = 28, color = "#EDB9BE", stroke = INK }) => wrap(
  <>
    <rect x="8" y="11" width="12" height="17" rx="2" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 14 11 L 14 6 L 20 6 L 23 9 L 20 9 L 20 11" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="26" cy="5" r="1" fill={stroke} />
    <circle cx="28" cy="8" r="1" fill={stroke} />
    <circle cx="27" cy="3" r="1" fill={stroke} />
  </>, size
);

export const TipIce = ({ size = 28, color = "#EDB9BE", stroke = INK }) => wrap(
  <>
    <path d="M 6 10 L 16 4 L 26 10 L 26 22 L 16 28 L 6 22 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 6 10 L 16 16 L 26 10" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinejoin="round" />
    <line x1="16" y1="16" x2="16" y2="28" stroke={stroke} strokeWidth="2.2" />
  </>, size
);

export const TipFlame = ({ size = 28, color = "#EDB9BE", stroke = INK }) => wrap(
  <>
    <path d="M 16 3 Q 10 10 10 16 Q 10 23 16 29 Q 22 23 22 16 Q 22 12 19 9 Q 17 13 16 10 Q 15 7 16 3 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 14 20 Q 16 17 18 20 Q 18 23 16 25 Q 14 23 14 20 Z"
      fill="#FFFBF4" stroke={stroke} strokeWidth="1.8" strokeLinejoin="round" />
  </>, size
);

/* ── community ───────────────────────────────────────────── */
export const TipSpeaker = ({ size = 28, color = "#BCDCC2", stroke = INK }) => wrap(
  <>
    <path d="M 3 11 L 10 11 L 18 5 L 18 27 L 10 21 L 3 21 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 22 11 Q 26 16 22 21" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M 25 7 Q 31 16 25 25" fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
  </>, size
);

export const TipChat = ({ size = 28, color = "#BCDCC2", stroke = INK }) => wrap(
  <>
    <path d="M 4 6 L 28 6 Q 30 6 30 8 L 30 20 Q 30 22 28 22 L 14 22 L 8 28 L 8 22 L 4 22 Q 2 22 2 20 L 2 8 Q 2 6 4 6 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <circle cx="10" cy="14" r="1.5" fill={stroke} />
    <circle cx="16" cy="14" r="1.5" fill={stroke} />
    <circle cx="22" cy="14" r="1.5" fill={stroke} />
  </>, size
);

export const TipJar = ({ size = 28, color = "#BCDCC2", stroke = INK }) => wrap(
  <>
    <rect x="8" y="3" width="16" height="5" rx="1.5" fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M 6 10 Q 6 8 8 8 L 24 8 Q 26 8 26 10 L 26 27 Q 26 29 24 29 L 8 29 Q 6 29 6 27 Z"
      fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="10" y1="16" x2="22" y2="16" stroke={stroke} strokeWidth="2" opacity="0.6" />
  </>, size
);

export const TipStar = ({ size = 28, color = "#BCDCC2", stroke = INK }) => wrap(
  <path d="M 16 3 L 19.5 11.5 L 29 12 L 22 18.5 L 24 28 L 16 23 L 8 28 L 10 18.5 L 3 12 L 12.5 11.5 Z"
    fill={color} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
  , size
);

/* ── mapping — order matches the tips array in each module ── */
export const TIP_ICONS = {
  dishes:       [TipDrop,      TipThermo,    TipOrder,     TipWind],
  laundry:      [TipTag,       TipThermo,    TipScale,     TipBolt],
  garbage:      [TipRecycle,   TipCalendar,  TipBroom,     TipKnot],
  organisation: [TipFolder,    TipRefresh,   TipMoon,      TipHands],
  kitchen:      [TipKnife,     TipSpray,     TipIce,       TipFlame],
  community:    [TipSpeaker,   TipChat,      TipJar,       TipStar],
};
