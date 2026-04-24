import { useState } from "react";

export default function DebugPanel({ progressApi, sheetsApi }) {
  const [result, setResult] = useState(null);
  const [sending, setSending] = useState(false);

  const envUrl = import.meta.env.VITE_SHEETS_URL || "";
  const activeUrl = progressApi.sheetsUrl || "";

  const runTest = async () => {
    setSending(true);
    setResult(null);
    const url = activeUrl || envUrl;
    if (!url) {
      setResult({ ok: false, msg: "No URL configured in state OR env — sync cannot fire." });
      setSending(false);
      return;
    }
    const payload = {
      student: progressApi.studentName || "__debug_test__",
      dorm: progressApi.dorm || "Beau Site",
      xp: progressApi.xp || 0,
      dishes: 0, laundry: 0, garbage: 0, organisation: 0, kitchen: 0, community: 0,
    };
    const started = performance.now();
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      const ms = Math.round(performance.now() - started);
      let body = "";
      try { body = await res.text(); } catch { body = "(unreadable body)"; }
      setResult({
        ok: res.ok,
        msg: `HTTP ${res.status} ${res.statusText} · ${ms}ms\n${body.slice(0, 400)}`,
      });
    } catch (err) {
      const ms = Math.round(performance.now() - started);
      setResult({ ok: false, msg: `fetch threw after ${ms}ms:\n${err?.name}: ${err?.message}` });
    }
    setSending(false);
  };

  const nuke = () => {
    localStorage.clear();
    location.reload();
  };

  const row = (label, val, highlight) => (
    <div style={{ display: "flex", gap: 8, alignItems: "baseline", padding: "3px 0" }}>
      <span style={{ minWidth: 110, color: "#8B8B9E", fontSize: 11 }}>{label}</span>
      <span style={{ color: highlight ? "#7A6BD1" : "#2B2B3C", wordBreak: "break-all", fontSize: 11 }}>
        {val || <em style={{ color: "#EDB9BE" }}>(empty)</em>}
      </span>
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        left: 12,
        right: 12,
        maxWidth: 406,
        margin: "0 auto",
        background: "#FFFBF4",
        border: "2px solid #7A6BD1",
        borderRadius: 14,
        padding: 14,
        zIndex: 9999,
        fontFamily: "ui-monospace, monospace",
        fontSize: 11,
        maxHeight: "60vh",
        overflowY: "auto",
        boxShadow: "0 10px 40px rgba(43,43,60,0.15)",
      }}
    >
      <div style={{ fontFamily: "Unbounded, sans-serif", fontWeight: 900, marginBottom: 8 }}>
        🐞 dormlife debug
      </div>
      {row("envVar", envUrl, !!envUrl)}
      {row("state URL", activeUrl, !!activeUrl)}
      {row("student", progressApi.studentName)}
      {row("dorm", progressApi.dorm)}
      {row("xp", String(progressApi.xp))}
      {row("level", String(progressApi.levelNum))}
      {row("progress keys", Object.keys(progressApi.progress).join(", "))}
      {row("syncStatus", sheetsApi.syncStatus || "(idle)")}
      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        <button
          onClick={runTest}
          disabled={sending}
          style={{
            background: "#7A6BD1",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 8,
            padding: "8px 14px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          {sending ? "sending…" : "Send test ping →"}
        </button>
        <button
          onClick={nuke}
          style={{
            background: "transparent",
            color: "#8F4453",
            border: "1.5px solid #EDB9BE",
            borderRadius: 8,
            padding: "8px 14px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          clear localStorage + reload
        </button>
      </div>
      {result && (
        <pre
          style={{
            marginTop: 10,
            padding: 10,
            background: result.ok ? "rgba(188,220,194,0.35)" : "rgba(237,185,190,0.35)",
            border: `1.5px solid ${result.ok ? "#BCDCC2" : "#EDB9BE"}`,
            borderRadius: 8,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
          }}
        >
          {result.msg}
        </pre>
      )}
      <div style={{ marginTop: 8, color: "#8B8B9E", fontSize: 10 }}>
        Remove <code>?debug=1</code> from URL to hide.
      </div>
    </div>
  );
}
