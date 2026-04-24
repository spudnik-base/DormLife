import { ModuleIcon } from "../icons";

export default function ModuleCard({ module, level, onClick }) {
  return (
    <div className="mod-c" onClick={onClick}>
      <div className="m-blob" style={{ background: module.color }} />
      <div className="m-em">
        <ModuleIcon id={module.id} color={module.color} size={40} />
      </div>
      <div className="m-nm">{module.title}</div>
      <div className="m-sb">{module.sub}</div>
      <div className="m-dots" style={{ color: module.color }}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={`dot ${level > i ? "on" : ""}`} />
        ))}
        {level === 3 && (
          <span style={{ fontSize: 9, marginLeft: 4, fontWeight: 700 }}>Done!</span>
        )}
      </div>
    </div>
  );
}
