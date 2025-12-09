import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

import bg1 from "../assets/backgrounds/bg1.jpg";
import bg2 from "../assets/backgrounds/bg2.jpg";
import bg3 from "../assets/backgrounds/bg3.jpg";

import "../styles/Pomodoro.css";

const DEFAULTS = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60,
};

export default function Pomodoro() {
  const [mode, setMode] = useState("pomodoro");
  const [secondsLeft, setSecondsLeft] = useState(DEFAULTS.pomodoro);
  const [running, setRunning] = useState(false);
  const [sessionName, setSessionName] = useState("✨ Focus Session");
  const [editingName, setEditingName] = useState(false);


  const backgrounds = [bg1, bg2, bg3];
  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);

  const sounds = [{ id: "none", label: "No sound", src: null }];
  const [selectedSound, setSelectedSound] = useState("none");

  useEffect(() => {
    const savedBg = localStorage.getItem("flow_bg");
    if (savedBg) {
      const match = backgrounds.find(b => b === savedBg);
      if (match) setSelectedBg(match);
    }

    const savedSound = localStorage.getItem("flow_sound");
    if (savedSound) setSelectedSound(savedSound);
  }, []);

  useEffect(() => { localStorage.setItem("flow_bg", selectedBg); }, [selectedBg]);
  useEffect(() => { localStorage.setItem("flow_sound", selectedSound); }, [selectedSound]);

  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    setSecondsLeft(DEFAULTS[mode]);
    setRunning(false);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, [mode]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) { clearInterval(intervalRef.current); intervalRef.current = null; setRunning(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
    };
  }, [running]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60), s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

function resetTimer() {
  setRunning(false);
  setSecondsLeft(DEFAULTS[mode]);
}


  function toggleStartPause() {
    if (secondsLeft === 0) { setSecondsLeft(DEFAULTS[mode]); setRunning(true); return; }
    setRunning(r => !r);
  }

  return (
    <div className="pomodoro-root" style={{ backgroundImage: `url(${selectedBg})` }}>
      <div className="pomodoro-overlay" />

      <div className="pomodoro-container">
        <div className="pomodoro-top">
          <div className="session-name">
            {editingName ? (
              <input
                className="session-input"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
                autoFocus
              />
            ) : (
              <div className="session-pill" onClick={() => setEditingName(true)}>
                {sessionName} ✏️
              </div>

            )}
          </div>

          <div className="mode-buttons">
            <button className={mode === "pomodoro" ? "active" : ""} onClick={() => setMode("pomodoro")}>Pomodoro</button>
            <button className={mode === "short" ? "active" : ""} onClick={() => setMode("short")}>Short Break</button>
            <button className={mode === "long" ? "active" : ""} onClick={() => setMode("long")}>Long Break</button>
          </div>
        </div>

        <main className="pomodoro-center">
          <motion.div className="timer-wrap" animate={{ scale: running ? 1.02 : 1 }} transition={{ duration: 0.25 }}>
            <div className="timer">{formatTime(secondsLeft)}</div>

            <div className="controls">
<button className="control-btn" onClick={resetTimer}>Reset</button>

              <button className="control-btn primary" onClick={toggleStartPause}>{running ? "Pause" : "Start"}</button>
            </div>
          </motion.div>

          <motion.div className="side-panel" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <h4>Sounds</h4>
            <div className="sounds-list">
              {sounds.map(s => (
                <label key={s.id} className={`sound-item ${selectedSound === s.id ? "sel" : ""}`}>
                  <input type="radio" checked={selectedSound === s.id} onChange={() => setSelectedSound(s.id)} />
                  <span>{s.label}</span>
                </label>
              ))}
            </div>

            <h4 style={{ marginTop: 16 }}>Backgrounds</h4>
            <div className="bg-list">
              {backgrounds.map((b, i) => (
                <button key={i} className={`bg-thumb ${selectedBg === b ? "sel" : ""}`} style={{ backgroundImage: `url(${b})` }} onClick={() => setSelectedBg(b)} />
              ))}
            </div>
            <small className="bg-note">Add your own images to <code>src/assets/backgrounds</code></small>
          </motion.div>
        </main>
      </div>

      <audio ref={audioRef} />
    </div>
  );
}
