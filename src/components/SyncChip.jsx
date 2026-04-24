const CHIP = {
  syncing: { label: "⟳ Syncing…", className: "sync sy" },
  ok:      { label: "✓ Synced",   className: "sync ok" },
  offline: { label: "Offline",    className: "sync of" },
};

export default function SyncChip({ status }) {
  if (!status) return null;
  const chip = CHIP[status];
  if (!chip) return null;
  return <div className={chip.className}>{chip.label}</div>;
}
