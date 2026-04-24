const TABS = [
  { id: "home", icon: "🏠", label: "Home" },
  { id: "chores", icon: "✅", label: "Chores" },
  { id: "badges", icon: "🏅", label: "Badges" },
];

export default function BottomNav({ tab, onChange }) {
  return (
    <div className="bot-nav">
      {TABS.map(({ id, icon, label }) => (
        <div
          key={id}
          className={`nav-b ${tab === id ? "on" : ""}`}
          onClick={() => onChange(id)}
        >
          <div className="nav-ic">{icon}</div>
          {label}
        </div>
      ))}
    </div>
  );
}
