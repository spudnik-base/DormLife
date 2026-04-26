import { useEffect, useMemo, useState } from "react";
import { IconChart, IconCelebrate, IconCheck } from "../icons";

const MIN_WORDS = 10;

function countWords(s) {
  return (s || "").trim().match(/\S+/g)?.length || 0;
}

function normaliseSaved(saved) {
  if (!saved) return { takeaway: "", action: "" };
  if (typeof saved === "string") return { takeaway: saved, action: "" };
  return { takeaway: saved.takeaway || "", action: saved.action || "" };
}

export default function CheckInTab({
  module,
  done,
  savedReflection,
  onMarkDone,
  onUpdateReflection,
}) {
  const [flash, setFlash] = useState(false);
  const [flashKind, setFlashKind] = useState("save");
  const [takeaway, setTakeaway] = useState("");
  const [action, setAction] = useState("");

  // Hydrate fields from saved reflection on module change
  useEffect(() => {
    setFlash(false);
    const initial = normaliseSaved(savedReflection);
    setTakeaway(initial.takeaway);
    setAction(initial.action);
  }, [module.id, savedReflection]);

  const reflect = module.reflect || {
    takeaway: "What's one thing you're taking away from this?",
    action: "",
  };

  const totalWords = useMemo(
    () => countWords(takeaway) + countWords(action),
    [takeaway, action]
  );
  const canSubmit = totalWords >= MIN_WORDS;
  const wordsLeft = Math.max(0, MIN_WORDS - totalWords);

  // Track edits relative to saved (only matters when done)
  const isDirty = useMemo(() => {
    const s = normaliseSaved(savedReflection);
    return s.takeaway !== takeaway || s.action !== action;
  }, [savedReflection, takeaway, action]);

  const handleClick = () => {
    if (!canSubmit) return;
    if (done) {
      if (!isDirty) return;
      onUpdateReflection?.({ takeaway, action });
      setFlashKind("update");
    } else {
      onMarkDone({ takeaway, action });
      setFlashKind("save");
    }
    setFlash(true);
  };

  const ctaLabel = done
    ? (isDirty ? "Update Reflection" : "Reflection saved (+150 XP)")
    : "Save & Complete";

  const ctaClass = done && !isDirty ? "done-b done" : "done-b go";
  const ctaDisabled = !canSubmit || (done && !isDirty);

  return (
    <div className="ci-w">
      {reflect.takeaway && (
        <div className="ci-reflect">
          <label className="ci-reflect-label">{reflect.takeaway}</label>
          <textarea
            className="ci-reflect-input"
            value={takeaway}
            onChange={(e) => setTakeaway(e.target.value)}
            placeholder="A few words on what you're taking away…"
            maxLength={400}
            rows={3}
          />
        </div>
      )}

      {reflect.action && (
        <div className="ci-reflect">
          <label className="ci-reflect-label">{reflect.action}</label>
          <textarea
            className="ci-reflect-input"
            value={action}
            onChange={(e) => setAction(e.target.value)}
            placeholder="Be specific — what will you actually do?"
            maxLength={400}
            rows={3}
          />
        </div>
      )}

      <div className="ci-words">
        {canSubmit ? (
          <span className="ci-words-ok">
            ✓ {totalWords} words — ready to {done ? "update" : "save"}
          </span>
        ) : (
          <span className="ci-words-need">
            {totalWords} / {MIN_WORDS} words — {wordsLeft} more to {done ? "update" : "save"}
          </span>
        )}
      </div>

      <div
        className={ctaClass}
        onClick={ctaDisabled ? undefined : handleClick}
        style={ctaDisabled ? { opacity: 0.45, cursor: "not-allowed" } : undefined}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <IconCheck size={16} />
          {ctaLabel}
        </span>
      </div>

      {flash && (
        <div className="ci-confirm pop">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
            <IconCelebrate size={42} />
          </div>
          <div className="ci-conf-h">
            {flashKind === "update" ? "Reflection updated!" : "Reflection saved!"}
          </div>
          <div className="ci-conf-s">
            {flashKind === "update"
              ? "Your teacher will see the latest version."
              : "+150 XP · sent to teacher's Google Sheet"}
          </div>
        </div>
      )}

      <div className="sheet-note" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <IconChart size={14} />
        <span>Reflections are automatically logged to your teacher's Google Sheet.</span>
      </div>
      <div style={{ height: 20 }} />
    </div>
  );
}
