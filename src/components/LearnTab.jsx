export default function LearnTab({ module, learned, onMarkLearn }) {
  return (
    <>
      <div className="tips-list">
        {module.tips.map((tip, i) => (
          <div
            key={i}
            className="tip-c sup"
            style={{
              animationDelay: `${i * 0.07}s`,
              opacity: 0,
              animationFillMode: "forwards",
            }}
          >
            <div className="tip-ic">{tip.icon}</div>
            <div>
              <div className="tip-h">{tip.h}</div>
              <div className="tip-b">{tip.b}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`mark-b ${learned ? "done" : "go"}`}
        onClick={learned ? undefined : onMarkLearn}
      >
        {learned ? "✓ Learned (+50 XP)" : "Mark as Learned →"}
      </div>
      <div style={{ height: 20 }} />
    </>
  );
}
