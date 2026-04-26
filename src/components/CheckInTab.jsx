import { useEffect, useMemo, useState } from "react";
import { IconChart, IconCelebrate, IconCheck } from "../icons";

const MIN_WORDS = 10;

const PLACEHOLDERS = {
  takeaway:     "A sentence or two on what you're taking away…",
  action:       "Be specific — what will you actually do?",
  contribution: "List your skills, talents, hobbies, character traits…",
  commitment:   "How will you show up for this dorm?",
};

function countWords(s) {
  return (s || "").trim().match(/\S+/g)?.length || 0;
}

function normaliseSaved(saved, keys) {
  const out = {};
  keys.forEach((k) => { out[k] = ""; });
  if (!saved) return out;
  if (typeof saved === "string") {
    out[keys[0]] = saved;
    return out;
  }
  keys.forEach((k) => { out[k] = saved[k] || ""; });
  return out;
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
  const [answers, setAnswers] = useState({});

  const reflectEntries = useMemo(
    () => Object.entries(module.reflect || {}),
    [module.id]
  );
  const keys = useMemo(() => reflectEntries.map(([k]) => k), [reflectEntries]);

  useEffect(() => {
    setFlash(false);
    setAnswers(normaliseSaved(savedReflection, keys));
  }, [module.id, savedReflection, keys]);

  const totalWords = useMemo(
    () => Object.values(answers).reduce((sum, v) => sum + countWords(v), 0),
    [answers]
  );
  const canSubmit = totalWords >= MIN_WORDS;
  const wordsLeft = Math.max(0, MIN_WORDS - totalWords);

  const isDirty = useMemo(() => {
    const saved = normaliseSaved(savedReflection, keys);
    return keys.some((k) => (answers[k] || "") !== (saved[k] || ""));
  }, [answers, savedReflection, keys]);

  const setAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleClick = () => {
    if (!canSubmit) return;
    if (done) {
      if (!isDirty) return;
      onUpdateReflection?.(answers);
      setFlashKind("update");
    } else {
      onMarkDone(answers);
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
      {reflectEntries.map(([key, prompt]) => (
        <div className="ci-reflect" key={key}>
          <label className="ci-reflect-label">{prompt}</label>
          <textarea
            className="ci-reflect-input"
            value={answers[key] || ""}
            onChange={(e) => setAnswer(key, e.target.value)}
            placeholder={PLACEHOLDERS[key] || "Write a sentence or two…"}
            maxLength={500}
            rows={3}
          />
        </div>
      ))}

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
