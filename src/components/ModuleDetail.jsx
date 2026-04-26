import { useEffect, useMemo, useState } from "react";
import { ModuleIcon, IconLearn, IconQuiz, IconCheckIn } from "../icons";
import LearnTab from "./LearnTab.jsx";
import QuizTab from "./QuizTab.jsx";
import CheckInTab from "./CheckInTab.jsx";

const ALL_TABS = [
  { id: "learn",   label: "Read",    Icon: IconLearn,   need: "tips" },
  { id: "quiz",    label: "Quiz",    Icon: IconQuiz,    need: "quiz" },
  { id: "checkin", label: "Reflect", Icon: IconCheckIn, need: "reflect" },
];

const ALL_XP_TAGS = [
  { label: "Read",    xp: 50,  threshold: 1, Icon: IconLearn,   need: "tips" },
  { label: "Quiz",    xp: 100, threshold: 2, Icon: IconQuiz,    need: "quiz" },
  { label: "Reflect", xp: 150, threshold: 3, Icon: IconCheckIn, need: "reflect" },
];

export default function ModuleDetail({
  module,
  level,
  learned,
  quizPassed,
  choreDone,
  savedReflection,
  initialTab,
  onBack,
  onMarkLearn,
  onPass,
  onMarkDone,
  onUpdateReflection,
}) {
  const tabs = useMemo(
    () => ALL_TABS.filter((t) => module[t.need]),
    [module]
  );
  const xpTags = useMemo(
    () => ALL_XP_TAGS.filter((t) => module[t.need]),
    [module]
  );

  const [tab, setTab] = useState(() => {
    const fallback = tabs[0]?.id;
    return tabs.some((t) => t.id === initialTab) ? initialTab : fallback;
  });

  useEffect(() => {
    const fallback = tabs[0]?.id;
    setTab(tabs.some((t) => t.id === initialTab) ? initialTab : fallback);
  }, [module.id, initialTab, tabs]);

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
          {xpTags.map(({ label, xp, threshold, Icon }) => {
            const reached = level >= threshold;
            return (
              <div
                key={label}
                className="xp-tag"
                style={{
                  background: reached ? `${module.color}40` : "var(--ink-softer)",
                  border: `1px solid ${reached ? module.color : "var(--ink-soft)"}`,
                  color: reached ? "var(--ink)" : "var(--muted)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Icon size={13} />
                <span>{label} +{xp}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="tabs">
        {tabs.map(({ id, label, Icon }) => (
          <div
            key={id}
            className={`tab-b ${tab === id ? "on" : ""}`}
            onClick={() => setTab(id)}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Icon size={14} />
              {label}
            </span>
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
          <CheckInTab
            module={module}
            done={choreDone}
            savedReflection={savedReflection}
            onMarkDone={onMarkDone}
            onUpdateReflection={onUpdateReflection}
          />
        )}
      </div>
    </div>
  );
}
