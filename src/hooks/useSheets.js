import { useCallback, useRef, useState } from "react";
import { MODULES } from "../data/modules";

function deriveLevel(progress, id) {
  const v = progress[id] || {};
  if (v.chore) return 3;
  if (v.quiz) return 2;
  if (v.learn) return 1;
  return 0;
}

export function useSheets({ sheetsUrl, studentName, dorm }) {
  const [syncStatus, setSyncStatus] = useState(null);
  const clearTimer = useRef(null);

  const resetStatusAfter = (ms) => {
    if (clearTimer.current) clearTimeout(clearTimer.current);
    clearTimer.current = setTimeout(() => setSyncStatus(null), ms);
  };

  const sync = useCallback(async ({ progress, xp }) => {
    if (!sheetsUrl) {
      console.warn("[dormlife] sync skipped — no sheetsUrl. VITE_SHEETS_URL env var not baked into build?");
      return;
    }
    if (!studentName || !dorm) {
      console.warn("[dormlife] sync skipped — missing studentName or dorm", { studentName, dorm });
      return;
    }

    setSyncStatus("syncing");

    const payload = {
      student: studentName,
      dorm,
      xp,
      ...Object.fromEntries(MODULES.map((m) => [m.id, deriveLevel(progress, m.id)])),
    };

    console.log("[dormlife] POST →", sheetsUrl, payload);

    try {
      const res = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const body = await res.text().catch(() => "(unreadable)");
      console.log("[dormlife] ← HTTP", res.status, res.statusText, body.slice(0, 200));
      setSyncStatus("ok");
      resetStatusAfter(2500);
    } catch (err) {
      console.error("[dormlife] fetch threw:", err);
      setSyncStatus("offline");
      resetStatusAfter(3000);
    }
  }, [sheetsUrl, studentName, dorm]);

  return { sync, syncStatus };
}
