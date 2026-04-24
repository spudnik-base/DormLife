import { IconHome, IconChores, IconBadges } from "../icons";

const TABS = [
  { id: "home",    Icon: IconHome,    label: "Home" },
  { id: "chores",  Icon: IconChores,  label: "Chores" },
  { id: "badges",  Icon: IconBadges,  label: "Badges" },
];

export default function BottomNav({ tab, onChange }) {
  return (
    <div className="bot-nav">
      {TABS.map(({ id, Icon, label }) => (
        <div
          key={id}
          className={`nav-b ${tab === id ? "on" : ""}`}
          onClick={() => onChange(id)}
        >
          <div className="nav-ic">
            <Icon />
          </div>
          {label}
        </div>
      ))}
    </div>
  );
}
