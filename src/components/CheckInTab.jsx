import { useEffect, useState } from "react";
import { IconClipboard, IconChart, IconCelebrate, IconCheck } from "../icons";

export default function CheckInTab({ module, done, onMarkDone }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(false);
  }, [module.id]);

  const handleClick = () => {
    if (done) return;
    onMarkDone();
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
