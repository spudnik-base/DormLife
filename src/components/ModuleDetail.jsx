import { useEffect, useState } from "react";
import { ModuleIcon } from "../icons";
import LearnTab from "./LearnTab.jsx";
import QuizTab from "./QuizTab.jsx";
import CheckInTab from "./CheckInTab.jsx";

const TAB_CONFIG = [
  { id: "learn", label: "📖 Learn" },
  { id: "quiz", label: "🧠 Quiz" },
  { id: "checkin", label: "✅ Check-in" },
];

const XP_TAG_CONFIG = [
  { label: "📖 Learn", xp: 50, threshold: 1 },
  { label: "🧠 Quiz", xp: 100, threshold: 2 },
  { label: "✅ Done", xp: 150, threshold: 3 },
];

export default function ModuleDetail({
  module,
  level,
  learned,
  quizPassed,
  choreDone,
  initialTab = "learn",
  onBack,
  onMarkLearn,
  onPass,
  onMarkDone,
}) {
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    setTab(initialTab);
  }, [module.id, initialTab]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        className="mod-hd"
        style={{ background: `${module.color}33` }}
      >
        <div className="m-blob2" style={{ background: module.color }} />
        <div className="back-b" onClick={onBack}>
          ← Back
        </div>
        <div className="m-big-em">
          <ModuleIcon id={module.id} color={module.color} size={64} />
        </div>
        <div className="m-big-nm">{module.title}</div>
        <div className="m-big-sb">{module.sub}</div>

        <div className="xp-tags">
          {XP_TAG_CONFIG.map(({ label, xp, threshold }) => {
            const reached = level >= threshold;
            return (
              <div
                key={label}
                className="xp-tag"
                style={{
                  background: reached ? `${module.color}40` : "var(--ink-softer)",
                  border: `1px solid ${reached ? module.color : "var(--ink-soft)"}`,
                  color: reached ? "var(--ink)" : "var(--muted)",
                }}
              >
                {label} +{xp}
              </div>
            );
          })}
        </div>
      </div>

      <div className="tabs">
        {TAB_CONFIG.map(({ id, label }) => (
          <div
            key={id}
            className={`tab-b ${tab === id ? "on" : ""}`}
            onClick={() => setTab(id)}
          >
            {label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
        {tab === "learn" && (
          <LearnTab module={module} learned={learned} onMarkLearn={onMarkLearn} />
        )}
        {tab === "quiz" && (
          <QuizTab module={module} quizPassed={quizPassed} onPass={onPass} />
        )}
        {tab === "checkin" && (
          <CheckInTab module={module} done={choreDone} onMarkDone={onMarkDone} />
        )}
      </div>
    </div>
  );
}
