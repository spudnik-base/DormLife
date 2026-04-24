import { useEffect, useState } from "react";

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
        <div className="ci-note-h">📋 Today's task</div>
        <div className="ci-note-b">{module.choreNote}</div>
      </div>
      <div className={`done-b ${done ? "done" : "go"}`} onClick={handleClick}>
        {done ? "✓ Chore Complete! (+150 XP)" : "✅ Mark as Done"}
      </div>
      {flash && (
        <div className="ci-confirm pop">
          <div className="ci-conf-em">🎉</div>
          <div className="ci-conf-h">Chore logged!</div>
          <div className="ci-conf-s">+150 XP · sent to teacher's Google Sheet</div>
        </div>
      )}
      <div className="sheet-note">
        📊 Completions are automatically logged to your teacher's Google Sheet in real time.
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
