import { useCallback, useRef, useState } from "react";
import { MODULES } from "../data/modules";

function deriveLevel(progress, id) {
  const v = progress[id] || {};
  if (v.chore) return 3;
  if (v.quiz) return 2;
  if (v.learn) return 1;
  return 0;
}

function joinReflection(r) {
  if (!r) return "";
  if (typeof r === "string") return r;
  const parts = [];
  if (r.takeaway) parts.push(`TAKEAWAY: ${r.takeaway}`);
  if (r.action)   parts.push(`ACTION: ${r.action}`);
  return parts.join("\n\n");
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
      reflections: Object.fromEntries(
        MODULES.map((m) => [m.id, joinReflection(progress[m.id]?.reflection)])
      ),
    };

    console.log("[dormlife] POST →", sheetsUrl, payload);

    try {
      // no-cors required: Apps Script /a/macros/<domain>/ URLs 302 redirect to
      // script.googleusercontent.com, and the browser blocks cross-origin reads
      // through that redirect. Opaque response — request still reaches the
      // script and the sheet gets written.
      await fetch(sheetsUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      console.log("[dormlife] ← fetch completed (opaque response, no-cors)");
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
