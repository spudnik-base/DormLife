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
    if (!sheetsUrl) return;
    if (!studentName || !dorm) return;

    setSyncStatus("syncing");

    const payload = {
      student: studentName,
      dorm,
      xp,
      ...Object.fromEntries(MODULES.map((m) => [m.id, deriveLevel(progress, m.id)])),
    };

    try {
      await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      setSyncStatus("ok");
      resetStatusAfter(2500);
    } catch {
      setSyncStatus("offline");
      resetStatusAfter(3000);
    }
  }, [sheetsUrl, studentName, dorm]);

  return { sync, syncStatus };
}
