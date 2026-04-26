import { IconCapstone } from "../icons";
import { CAPSTONE } from "../data/capstone";

export default function CapstoneCard({ unlocked, level, totalRequired, totalDone, onClick }) {
  const complete = level === 3;
  const stateClass = complete ? "complete" : unlocked ? "ready" : "locked";

  const subtitle = complete
    ? "✓ Complete · Dorm Member"
    : unlocked
    ? "Unlocked — final step"
    : `${totalDone} / ${totalRequired} modules complete`;

  return (
    <div
      className={`capstone-card ${stateClass}`}
      onClick={unlocked ? onClick : undefined}
      role={unlocked ? "button" : undefined}
      aria-disabled={!unlocked}
    >
      <div className="capstone-art">
        <IconCapstone size={84} color={CAPSTONE.color} />
      </div>
      <div className="capstone-body">
        <div className="capstone-eyebrow">FINAL STEP</div>
        <div className="capstone-title">{CAPSTONE.title}</div>
        <div className="capstone-sub">{CAPSTONE.sub}</div>
        <div className="capstone-state">{subtitle}</div>
      </div>
      <div className="capstone-arrow">{unlocked ? "→" : "🔒"}</div>
    </div>
  );
}
