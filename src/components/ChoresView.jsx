import { MODULES, XP_CHORE } from "../data/modules";
import { ModuleIcon } from "../icons";

export default function ChoresView({ getLevel, onOpenCheckIn }) {
  return (
    <>
      <div style={{ padding: "20px 16px 13px" }}>
        <div className="hd" style={{ fontSize: 21, fontWeight: 900, marginBottom: 3 }}>
          Daily Chores
        </div>
        <div style={{ fontSize: 12, color: "var(--muted)" }}>
          Mark done when complete — synced to teacher's sheet
        </div>
      </div>

      <div className="ch-list">
        {MODULES.map((m) => {
          const done = getLevel(m.id) === 3;
          return (
            <div
              key={m.id}
              className={`ch-row ${done ? "dn" : ""}`}
              onClick={() => onOpenCheckIn(m)}
            >
              <div className={`chk-c ${done ? "dn" : ""}`}>{done ? "✓" : ""}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <ModuleIcon id={m.id} color={m.color} size={28} />
                <div>
                  <div className="ch-nm">{m.title}</div>
                  <div className="ch-ht">
                    {done ? `✓ Complete · +${XP_CHORE} XP` : m.choreNote}
                  </div>
                </div>
              </div>
              {!done && (
                <span style={{ fontSize: 15, color: "var(--faint)" }}>›</span>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
