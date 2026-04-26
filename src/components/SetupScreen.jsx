import { useState } from "react";
import { DORMS } from "../data/dorms";

export default function SetupScreen({ initialSheetsUrl = "", onSubmit }) {
  const [name, setName] = useState("");
  const [dorm, setDorm] = useState("");
  const [sheetsUrl, setSheetsUrl] = useState(initialSheetsUrl);

  const ready = name.trim().length > 0 && dorm.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ready) return;
    onSubmit(name.trim(), dorm, sheetsUrl.trim());
  };

  return (
    <form className="setup-w" onSubmit={handleSubmit}>
      <div className="setup-hero">
        <h1>dormlife<span>.</span></h1>
        <p>Dorm life skills — let's get you set up.</p>
      </div>

      <div className="setup-field">
        <label htmlFor="setup-name">Your name</label>
        <input
          id="setup-name"
          className="setup-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Alex"
          autoComplete="off"
          autoFocus
        />
      </div>

      <div className="setup-field">
        <label>Your dorm</label>
        <div className="dorm-chips">
          {DORMS.map((d) => (
            <div
              key={d}
              className={`dorm-chip ${dorm === d ? "selected" : ""}`}
              onClick={() => setDorm(d)}
            >
              {d}
            </div>
          ))}
        </div>
      </div>

      {!initialSheetsUrl && (
        <div className="setup-field">
          <label htmlFor="setup-url">Sheets URL (optional)</label>
          <input
            id="setup-url"
            className="setup-input"
            type="url"
            value={sheetsUrl}
            onChange={(e) => setSheetsUrl(e.target.value)}
            placeholder="https://script.google.com/…/exec"
            autoComplete="off"
          />
        </div>
      )}

      <button type="submit" className="setup-submit" disabled={!ready}>
        Start →
      </button>
    </form>
  );
}
