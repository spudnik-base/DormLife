import { MODULES } from "../data/modules";
import ModuleCard from "./ModuleCard.jsx";

export default function HomeView({
  levelNum,
  xp,
  xpPct,
  xpToNext,
  totalDone,
  getLevel,
  onOpenModule,
}) {
  const quizzesPassed = MODULES.filter((m) => getLevel(m.id) >= 2).length;

  return (
    <>
      <div className="hero">
        <div className="lv-row">
          <span className="hd" style={{ fontSize: 26, fontWeight: 900 }}>
            Level {levelNum}
          </span>
          <span style={{ fontSize: 13, color: "var(--muted)" }}>{xp} XP</span>
        </div>
        <div className="lv-bg">
          <div className="lv-fill" style={{ width: `${xpPct}%` }} />
        </div>
        <div className="lv-cap">{xpToNext} XP to next level</div>

        <div className="stat-row">
          <div className="stat-c">
            <div className="stat-n">{totalDone}</div>
            <div className="stat-l">Skills Done</div>
          </div>
          <div className="stat-c">
            <div className="stat-n">{quizzesPassed}</div>
            <div className="stat-l">Quizzes ✓</div>
          </div>
          <div className="stat-c">
            <div className="stat-n">{xp}</div>
            <div className="stat-l">Total XP</div>
          </div>
        </div>
      </div>

      <div className="sec-ttl" style={{ marginTop: 6 }}>
        Your Skills
      </div>
      <div className="mod-grid">
        {MODULES.map((m) => (
          <ModuleCard
            key={m.id}
            module={m}
            level={getLevel(m.id)}
            onClick={() => onOpenModule(m)}
          />
        ))}
      </div>
    </>
  );
}
