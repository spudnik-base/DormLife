import { useMemo, useState } from "react";
import { MODULES } from "../data/modules";
import { DORMS } from "../data/dorms";

const LEVEL_BG = [
  "var(--ink-softer)",
  "color-mix(in srgb, var(--butter) 50%, transparent)",
  "color-mix(in srgb, var(--peri) 50%, transparent)",
  "color-mix(in srgb, var(--mint) 55%, transparent)",
];

const LEVEL_DOT = ["", "var(--accent)", "#5778B0", "#5A9E68"];
const LEVEL_DOT_TEXT = ["", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
const LEVEL_LETTER = ["", "L", "Q", "✓"];

export default function TeacherView({ students, pinged, onPing }) {
  const [filterDorm, setFilterDorm] = useState("");

  const shown = useMemo(
    () => (filterDorm ? students.filter((s) => s.dorm === filterDorm) : students),
    [students, filterDorm]
  );

  const totalTasks = shown.reduce(
    (sum, s) => sum + Object.values(s.m).filter((v) => v === 3).length,
    0
  );
  const needNudge = shown.filter(
    (s) => Object.values(s.m).reduce((a, v) => a + v, 0) < 3
  ).length;

  return (
    <>
      <div className="ra-hd">
        <div className="ra-ttl">RA Dashboard</div>
        <div className="ra-sub">
          {filterDorm || "All dorms"} · auto-syncs to Google Sheets
        </div>
      </div>

      <div className="ra-stats">
        <div className="ra-sc">
          <div className="ra-sn" style={{ color: "var(--accent)" }}>{shown.length}</div>
          <div className="ra-sl">Students</div>
        </div>
        <div className="ra-sc">
          <div className="ra-sn" style={{ color: "#4A7A55" }}>{totalTasks}</div>
          <div className="ra-sl">Tasks Done</div>
        </div>
        <div className="ra-sc">
          <div className="ra-sn" style={{ color: "#8F4453" }}>{needNudge}</div>
          <div className="ra-sl">Need Nudge</div>
        </div>
      </div>

      <div style={{ padding: "0 16px 14px" }}>
        <select
          className="setup-select"
          style={{ width: "100%", fontSize: 13, padding: "10px 14px" }}
          value={filterDorm}
          onChange={(e) => setFilterDorm(e.target.value)}
        >
          <option value="">All dorms</option>
          {DORMS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="sec-ttl">Student Progress</div>
      <div className="stu-list">
        {shown.map((s) => {
          const done = Object.values(s.m).filter((v) => v === 3).length;
          const behind = done < 2;
          const isPinged = pinged?.[s.id];
          return (
            <div key={s.id} className="stu-c">
              <div className="stu-row">
                <div className="stu-av">{s.av}</div>
                <div style={{ flex: 1 }}>
                  <div className="stu-nm">{s.name}</div>
                  <div className="stu-xp">
                    ⚡ {s.xp} XP · {done}/6 done · {s.dorm}
                  </div>
                </div>
                {behind && (
                  <div
                    className={`ping-b ${isPinged ? "sent" : "need"}`}
                    onClick={() => !isPinged && onPing(s.id)}
                  >
                    {isPinged ? "✓ Pinged" : "Ping 🔔"}
                  </div>
                )}
              </div>
              <div className="stu-mods">
                {MODULES.map((m) => {
                  const lv = s.m[m.id] || 0;
                  return (
                    <div
                      key={m.id}
                      className="sm-b"
                      style={{ background: LEVEL_BG[lv] }}
                      title={`${m.title}: ${LEVEL_LETTER[lv] || "—"}`}
                    >
                      {m.emoji}
                      {lv > 0 && (
                        <div
                          className="sm-lv"
                          style={{ background: LEVEL_DOT[lv], color: LEVEL_DOT_TEXT[lv] }}
                        >
                          {LEVEL_LETTER[lv]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        {shown.length === 0 && (
          <div style={{ padding: "20px 4px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
            No students in {filterDorm} yet.
          </div>
        )}
      </div>
      <div className="ra-leg">L = Learned · Q = Quiz passed · ✓ = Chore done</div>
    </>
  );
}
