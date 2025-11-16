// src/pages/Schedule.js
import React, { useEffect, useMemo, useState } from "react";
import "./Schedule.css";

const DEFAULT = {
  timezone: "Asia/Kolkata",
  days: {
    Mon: { active: true, from: "09:00", to: "17:00" },
    Tue: { active: true, from: "09:00", to: "17:00" },
    Wed: { active: true, from: "09:00", to: "17:00" },
    Thu: { active: true, from: "09:00", to: "17:00" },
    Fri: { active: true, from: "09:00", to: "17:00" },
    Sat: { active: false, from: "10:00", to: "14:00" },
    Sun: { active: false, from: "", to: "" },
  },
};

const STORAGE_KEY = "clinic_availability_v1";

export default function Schedule() {
  const [av, setAv] = useState(DEFAULT);
  const [msg, setMsg] = useState(null); // { type: "ok" | "err", text }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setAv(JSON.parse(raw));
    } catch (e) {
      console.warn("Failed to read availability from storage", e);
    }
  }, []);

  const toggle = (d) =>
    setAv((v) => ({
      ...v,
      days: { ...v.days, [d]: { ...v.days[d], active: !v.days[d].active } },
    }));

  const setTime = (d, f, val) =>
    setAv((v) => ({
      ...v,
      days: { ...v.days, [d]: { ...v.days[d], [f]: val } },
    }));

  const setTimezone = (tz) => setAv((v) => ({ ...v, timezone: tz }));

  const saved = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : DEFAULT;
    } catch {
      return DEFAULT;
    }
  }, []);

  const isDirty = useMemo(() => JSON.stringify(av) !== JSON.stringify(saved), [av, saved]);

  // validation: active days require from/to and from < to
  const validate = () => {
    for (const [day, cfg] of Object.entries(av.days)) {
      if (cfg.active) {
        if (!cfg.from || !cfg.to) return { ok: false, text: `${day}: set both from and to` };
        if (cfg.from >= cfg.to) return { ok: false, text: `${day}: 'from' must be before 'to'` };
      }
    }
    if (!av.timezone || !av.timezone.trim()) return { ok: false, text: "Timezone cannot be empty" };
    return { ok: true };
  };

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const save = () => {
    const v = validate();
    if (!v.ok) {
      showMsg("err", v.text);
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(av));
      showMsg("ok", "Availability saved");
    } catch (e) {
      console.error(e);
      showMsg("err", "Failed to save availability");
    }
  };

  const resetToDefault = () => {
    setAv(DEFAULT);
    showMsg("ok", "Reset to defaults (not saved)");
  };

  const summary = useMemo(() => {
    const parts = [];
    for (const [d, cfg] of Object.entries(av.days)) {
      parts.push(cfg.active ? `${d}: ${cfg.from}→${cfg.to}` : `${d}: off`);
    }
    return parts.join(" · ");
  }, [av]);

  return (
    <div className="page">
      <h1 className="title">Schedule / Availability</h1>

      <div className="card schedule-card">
        <div className="top-row">
          <div className="tz">
            <label>Time zone</label>
            <input value={av.timezone} onChange={(e) => setTimezone(e.target.value)} />
          </div>

          <div className="controls">
            <button className="btn" onClick={save} disabled={!isDirty}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={resetToDefault}>
              Reset
            </button>
          </div>
        </div>

        <div className="grid2">
          {Object.entries(av.days).map(([day, cfg]) => (
            <div key={day} className="slot">
              <div className="slot-left">
                <input
                  id={`chk-${day}`}
                  type="checkbox"
                  checked={cfg.active}
                  onChange={() => toggle(day)}
                />
                <label htmlFor={`chk-${day}`} className="day">{day}</label>
              </div>

              <div className="slot-times">
                <input
                  type="time"
                  value={cfg.from}
                  disabled={!cfg.active}
                  onChange={(e) => setTime(day, "from", e.target.value)}
                />
                <span className="to">to</span>
                <input
                  type="time"
                  value={cfg.to}
                  disabled={!cfg.active}
                  onChange={(e) => setTime(day, "to", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="summary">
          <strong>Summary:</strong> <span className="muted">{summary}</span>
        </div>

        <div className="hint">Tip: make changes and press Save to persist them across sessions.</div>
      </div>

      {msg && <div className={`toast ${msg.type === "err" ? "err" : "ok"}`}>{msg.text}</div>}
    </div>
  );
}
