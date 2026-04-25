import { useEffect, useState } from "react";
import { IconClipboard, IconChart, IconCelebrate, IconCheck } from "../icons";

export default function CheckInTab({ module, done, savedReflection = "", onMarkDone }) {
  const [flash, setFlash] = useState(false);
  const [reflection, setReflection] = useState("");

  useEffect(() => {
    setFlash(false);
    setReflection("");
  }, [module.id]);

  const handleClick = () => {
    if (done) return;
    onMarkDone(reflection.trim());
    setFlash(true);
  };

  return (
    <div className="ci-w">
      <div className="ci-note">
        <div className="ci-note-h" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <IconClipboard size={16} />
          <span>Today's task</span>
        </div>
        <div className="ci-note-b">{module.choreNote}</div>
      </div>

      {module.reflectPrompt && (
        <div className="ci-reflect">
          <label className="ci-reflect-label">{module.reflectPrompt}</label>
          {done ? (
            <div className="ci-reflect-saved">
              {savedReflection || <em style={{ color: "var(--muted)" }}>No reflection saved.</em>}
            </div>
          ) : (
            <textarea
              className="ci-reflect-input"
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="A sentence or two — totally optional."
              maxLength={300}
              rows={3}
            />
          )}
        </div>
      )}

      <div className={`done-b ${done ? "done" : "go"}`} onClick={handleClick}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <IconCheck size={16} />
          {done ? "Chore Complete! (+150 XP)" : "Mark as Done"}
        </span>
      </div>

      {flash && (
        <div className="ci-confirm pop">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
            <IconCelebrate size={42} />
          </div>
          <div className="ci-conf-h">Chore logged!</div>
          <div className="ci-conf-s">+150 XP · sent to teacher's Google Sheet</div>
        </div>
      )}

      <div className="sheet-note" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <IconChart size={14} />
        <span>Completions are automatically logged to your teacher's Google Sheet in real time.</span>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
