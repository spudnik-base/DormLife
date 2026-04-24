import { useState } from "react";
import { useProgress } from "./hooks/useProgress";
import { useSheets } from "./hooks/useSheets";
import { MOCK_STUDENTS } from "./data/mockStudents";
import {
  BottomNav,
  SyncChip,
  HomeView,
  ChoresView,
  BadgesView,
  ModuleDetail,
  SetupScreen,
  TeacherView,
} from "./components";
import DebugPanel from "./components/DebugPanel.jsx";

const DEBUG = typeof window !== "undefined"
  && new URLSearchParams(window.location.search).get("debug") === "1";

export default function App() {
  const progressApi = useProgress();
  const sheetsApi = useSheets({
    sheetsUrl: progressApi.sheetsUrl,
    studentName: progressApi.studentName,
    dorm: progressApi.dorm,
  });

  const [mode, setMode] = useState("student");
  const [tab, setTab] = useState("home");
  const [activeModule, setActiveModule] = useState(null);
  const [moduleInitialTab, setModuleInitialTab] = useState("learn");
  const [pinged, setPinged] = useState({});

  if (!progressApi.ready) return null;

  const needsSetup = !progressApi.studentName || !progressApi.dorm;
  if (needsSetup) {
    return (
      <div className="da">
        <SetupScreen
          initialSheetsUrl={progressApi.sheetsUrl}
          onSubmit={(name, dorm, url) => progressApi.setupUser(name, dorm, url)}
        />
        {DEBUG && <DebugPanel progressApi={progressApi} sheetsApi={sheetsApi} />}
      </div>
    );
  }

  const openModule = (m, startTab = "learn") => {
    setActiveModule(m);
    setModuleInitialTab(startTab);
  };

  const closeModule = () => setActiveModule(null);

  const toggleMode = () => {
    setMode((m) => (m === "student" ? "teacher" : "student"));
    setActiveModule(null);
    setTab("home");
  };

  const handleMarkLearn = () => {
    if (!activeModule) return;
    const next = progressApi.markLearn(activeModule.id);
    if (next) sheetsApi.sync(next);
  };

  const handleQuizPass = (score) => {
    if (!activeModule) return;
    const next = progressApi.markQuizPassed(activeModule.id, score);
    if (next) sheetsApi.sync(next);
  };

  const handleMarkDone = () => {
    if (!activeModule) return;
    const next = progressApi.markChoreDone(activeModule.id);
    if (next) sheetsApi.sync(next);
  };

  const handlePing = (studentId) => {
    setPinged((p) => ({ ...p, [studentId]: true }));
  };

  const activeLevel = activeModule ? progressApi.getLevel(activeModule.id) : 0;

  return (
    <div className="da">
      <div className="app-hd">
        <div className="logo">dormlife</div>
        <SyncChip status={sheetsApi.syncStatus} />
        <div className="xp-p">⚡ {progressApi.xp} XP</div>
        <div
          className={`mode-b ${mode === "teacher" ? "ra" : ""}`}
          onClick={toggleMode}
        >
          {mode === "teacher" ? "Student" : "RA View"}
        </div>
      </div>

      {activeModule ? (
        <ModuleDetail
          module={activeModule}
          level={activeLevel}
          learned={!!progressApi.progress[activeModule.id]?.learn}
          quizPassed={!!progressApi.progress[activeModule.id]?.quiz}
          choreDone={!!progressApi.progress[activeModule.id]?.chore}
          initialTab={moduleInitialTab}
          onBack={closeModule}
          onMarkLearn={handleMarkLearn}
          onPass={handleQuizPass}
          onMarkDone={handleMarkDone}
        />
      ) : (
        <>
          <div className="main">
            {mode === "teacher" ? (
              <TeacherView
                students={MOCK_STUDENTS}
                pinged={pinged}
                onPing={handlePing}
              />
            ) : (
              <>
                {tab === "home" && (
                  <HomeView
                    levelNum={progressApi.levelNum}
                    xp={progressApi.xp}
                    xpPct={progressApi.xpPct}
                    xpToNext={progressApi.xpToNext}
                    totalDone={progressApi.totalDone}
                    getLevel={progressApi.getLevel}
                    onOpenModule={(m) => openModule(m, "learn")}
                  />
                )}
                {tab === "chores" && (
                  <ChoresView
                    getLevel={progressApi.getLevel}
                    onOpenCheckIn={(m) => openModule(m, "checkin")}
                  />
                )}
                {tab === "badges" && (
                  <BadgesView getLevel={progressApi.getLevel} />
                )}
              </>
            )}
          </div>
          {mode === "student" && <BottomNav tab={tab} onChange={setTab} />}
        </>
      )}
      {DEBUG && <DebugPanel progressApi={progressApi} sheetsApi={sheetsApi} />}
    </div>
  );
}
