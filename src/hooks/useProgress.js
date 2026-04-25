import { useCallback, useEffect, useMemo, useState } from "react";
import { MODULES, XP_LEARN, XP_QUIZ, XP_CHORE } from "../data/modules";

const STORAGE_KEY = "dorm-v5";
const XP_PER_LEVEL = 300;

function safeParse(raw) {
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function deriveLevel(progress, id) {
  const v = progress[id] || {};
  if (v.chore) return 3;
  if (v.quiz) return 2;
  if (v.learn) return 1;
  return 0;
}

function persist(state) {
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
}

export function useProgress() {
  const [progress, setProgress] = useState({});
  const [xp, setXp] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [dorm, setDorm] = useState("");
  const [sheetsUrl, setSheetsUrl] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = safeParse(window.localStorage.getItem(STORAGE_KEY));
    const envUrl = import.meta.env.VITE_SHEETS_URL || "";
    if (saved) {
      setProgress(saved.progress || {});
      setXp(saved.xp || 0);
      setStudentName(saved.studentName || "");
      setDorm(saved.dorm || "");
      setSheetsUrl(saved.sheetsUrl || envUrl);
    } else {
      setSheetsUrl(envUrl);
    }
    setReady(true);
  }, []);

  const getLevel = useCallback(
    (id) => deriveLevel(progress, id),
    [progress]
  );

  const markLearn = useCallback((id) => {
    if (progress[id]?.learn) return null;
    const nextProgress = { ...progress, [id]: { ...(progress[id] || {}), learn: true } };
    const nextXp = xp + XP_LEARN;
    setProgress(nextProgress);
    setXp(nextXp);
    persist({ progress: nextProgress, xp: nextXp, studentName, dorm, sheetsUrl });
    return { progress: nextProgress, xp: nextXp };
  }, [progress, xp, studentName, dorm, sheetsUrl]);

  const markQuizPassed = useCallback((id, score) => {
    if (progress[id]?.quiz) return null;
    if (score < 3) return null;
    const nextProgress = { ...progress, [id]: { ...(progress[id] || {}), quiz: true, score } };
    const nextXp = xp + XP_QUIZ;
    setProgress(nextProgress);
    setXp(nextXp);
    persist({ progress: nextProgress, xp: nextXp, studentName, dorm, sheetsUrl });
    return { progress: nextProgress, xp: nextXp };
  }, [progress, xp, studentName, dorm, sheetsUrl]);

  const markChoreDone = useCallback((id, reflection = "") => {
    if (progress[id]?.chore) return null;
    const nextProgress = { ...progress, [id]: { ...(progress[id] || {}), chore: true, reflection } };
    const nextXp = xp + XP_CHORE;
    setProgress(nextProgress);
    setXp(nextXp);
    persist({ progress: nextProgress, xp: nextXp, studentName, dorm, sheetsUrl });
    return { progress: nextProgress, xp: nextXp };
  }, [progress, xp, studentName, dorm, sheetsUrl]);

  const setupUser = useCallback((name, dormName, url) => {
    const nextUrl = url || "";
    setStudentName(name);
    setDorm(dormName);
    setSheetsUrl(nextUrl);
    persist({ progress, xp, studentName: name, dorm: dormName, sheetsUrl: nextUrl });
  }, [progress, xp]);

  const resetUser = useCallback(() => {
    try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
    setProgress({});
    setXp(0);
    setStudentName("");
    setDorm("");
    setSheetsUrl(import.meta.env.VITE_SHEETS_URL || "");
  }, []);

  const totalDone = useMemo(
    () => MODULES.filter((m) => deriveLevel(progress, m.id) === 3).length,
    [progress]
  );
  const levelNum = Math.floor(xp / XP_PER_LEVEL) + 1;
  const xpPct = ((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;
  const xpToNext = XP_PER_LEVEL - (xp % XP_PER_LEVEL);

  return {
    progress, xp, studentName, dorm, sheetsUrl, ready,
    getLevel,
    markLearn, markQuizPassed, markChoreDone,
    setupUser, resetUser,
    totalDone, levelNum, xpPct, xpToNext,
  };
}
