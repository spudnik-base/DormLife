import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function SettingsMenu({ studentName, dorm, onSyncNow, onSignOut }) {
  const [open, setOpen] = useState(false);
  const [confirmingSignOut, setConfirmingSignOut] = useState(false);

  useEffect(() => {
    if (!open) setConfirmingSignOut(false);
  }, [open]);

  const handleSyncClick = () => {
    onSyncNow();
    setOpen(false);
  };

  const handleSignOutClick = () => {
    if (!confirmingSignOut) {
      setConfirmingSignOut(true);
      return;
    }
    onSignOut();
    setOpen(false);
  };

  const overlay = open && (
    <div
      className="settings-overlay"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="settings-menu"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings-meta">
          <div className="settings-name">{studentName}</div>
          <div className="settings-dorm">{dorm}</div>
        </div>

        <button className="settings-item" onClick={handleSyncClick}>
          <span className="settings-ic">↻</span>
          <span>Sync now</span>
        </button>

        <button
          className={`settings-item danger ${confirmingSignOut ? "confirm" : ""}`}
          onClick={handleSignOutClick}
        >
          <span className="settings-ic">⎋</span>
          <span>{confirmingSignOut ? "Tap again to confirm — wipes local progress" : "Sign out"}</span>
        </button>

        <button className="settings-cancel" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="settings-btn"
        onClick={() => setOpen(true)}
        aria-label="Settings"
      >
        ⋯
      </button>
      {overlay && createPortal(overlay, document.body)}
    </>
  );
}
