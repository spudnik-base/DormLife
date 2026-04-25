import { MODULES, XP_CHORE } from "../data/modules";
import { ModuleIcon, IconTrophy } from "../icons";

export default function BadgesView({ getLevel }) {
  const earnedCount = MODULES.filter((m) => getLevel(m.id) === 3).length;
  const allDone = earnedCount === MODULES.length;

  return (
    <>
      <div style={{ padding: "20px 16px 13px" }}>
        <div className="hd" style={{ fontSize: 21, fontWeight: 900, marginBottom: 3 }}>
          Micro-Credentials
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          {earnedCount}/{MODULES.length} badges earned
        </div>
      </div>

      {allDone && (
        <div className="pro-b">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 5 }}>
            <IconTrophy size={48} />
          </div>
          <div className="hd" style={{ fontSize: 12, color: "var(--accent)", fontWeight: 900 }}>
            LIFE SKILLS PRO
          </div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>
            All modules complete
          </div>
        </div>
      )}

      <div className="bg-w">
        {MODULES.map((m) => {
          const lv = getLevel(m.id);
          const earned = lv === 3;
          return (
            <div
              key={m.id}
              className={`bg-c ${earned ? "on" : "off"}`}
              style={earned ? { borderColor: m.color } : undefined}
            >
              <div className="bg-em" style={{ display: "flex", justifyContent: "center" }}>
                <ModuleIcon id={m.id} color={m.color} size={44} />
              </div>
              <div className="bg-nm">{m.badge}</div>
              <div className={`bg-st ${earned ? "on" : "off"}`}>
                {earned ? "✓ Earned" : lv === 0 ? "Locked" : `${lv}/3 steps`}
              </div>
              {earned && (
                <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 3 }}>
                  +{XP_CHORE} XP
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ height: 20 }} />
    </>
  );
}
