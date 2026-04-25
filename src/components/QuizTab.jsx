import { useEffect, useState } from "react";
import { IconCelebrate, IconRetry } from "../icons";

function pickRandom(arr, n) {
  const copy = [...arr];
  const take = Math.min(n, copy.length);
  for (let i = 0; i < take; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, take);
}

export default function QuizTab({ module, quizPassed, onPass }) {
  const [qIdx, setQIdx] = useState(0);
  const [qSel, setQSel] = useState(null);
  const [qFeed, setQFeed] = useState(false);
  const [qAns, setQAns] = useState([]);
  const [qDone, setQDone] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(() => pickRandom(module.quiz, 5));

  useEffect(() => {
    setQIdx(0);
    setQSel(null);
    setQFeed(false);
    setQAns([]);
    setQDone(false);
    setActiveQuiz(pickRandom(module.quiz, 5));
  }, [module.id]);

  const reset = () => {
    setQIdx(0);
    setQSel(null);
    setQFeed(false);
    setQAns([]);
    setQDone(false);
    setActiveQuiz(pickRandom(module.quiz, 5));
  };

  const pickAnswer = (i) => {
    if (qFeed) return;
    setQSel(i);
    setQFeed(true);
    const nextAns = [...qAns, i];
    setQAns(nextAns);

    setTimeout(() => {
      if (qIdx < activeQuiz.length - 1) {
        setQIdx((q) => q + 1);
        setQSel(null);
        setQFeed(false);
      } else {
        setQDone(true);
        const score = nextAns.filter((a, j) => a === activeQuiz[j].a).length;
        if (score >= 3 && !quizPassed) {
          onPass(score);
        }
      }
    }, 800);
  };

  if (qDone) {
    const score = qAns.filter((a, i) => a === activeQuiz[i].a).length;
    const passed = score >= 3;
    return (
      <div className="qr-w pop">
        <div className="qr-em" style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
          {passed ? <IconCelebrate size={72} /> : <IconRetry size={72} />}
        </div>
        <div className="qr-title">{passed ? "Nailed it!" : "Not quite…"}</div>
        <div className="qr-sub">
          {passed ? "Quiz passed · +100 XP" : "Need 3/5 to pass. You've got this."}
        </div>
        <div className="qr-score">{score}/5</div>
        <div className="qr-lbl">Correct Answers</div>
        {!passed && (
          <div className="retry-b" onClick={reset}>
            Try Again
          </div>
        )}
      </div>
    );
  }

  const q = activeQuiz[qIdx];
  return (
    <div className="quiz-w">
      <div className="q-bar">
        {activeQuiz.map((_, i) => (
          <div key={i} className={`q-pip ${i < qIdx ? "d" : i === qIdx ? "c" : ""}`} />
        ))}
      </div>
      <div className="q-txt" key={qIdx}>
        Q{qIdx + 1}: {q.q}
      </div>
      <div className="q-opts">
        {q.opts.map((opt, i) => {
          let cls = "q-opt";
          if (qFeed) {
            cls += " lk";
            if (i === q.a) cls += " ok";
            else if (i === qSel && i !== q.a) cls += " no";
          }
          return (
            <div key={i} className={cls} onClick={() => pickAnswer(i)}>
              {opt}
            </div>
          );
        })}
      </div>
    </div>
  );
}
