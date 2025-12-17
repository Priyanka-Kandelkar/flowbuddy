import React, { useState } from "react";
import Pomodoro from "./pages/Pomodoro";
import Reminders from "./pages/Reminders";

function Placeholder({ title }) {
  return (
    <div className="placeholder">
      <div className="placeholder-card">
        {title} page coming soon ✨
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState("pomodoro");

  return (
    <div className="app-root">
      {/* PAGE AREA */}
      <div className="page-area">
        <div className={`page ${route === "pomodoro" ? "active" : ""}`}>
          <Pomodoro />
        </div>

        <div className={`page ${route === "reminders" ? "active" : ""}`}>
          <Reminders />
        </div>

        <div className={`page ${route === "notes" ? "active" : ""}`}>
          <Placeholder title="Notes" />
        </div>

        <div className={`page ${route === "flowbuddy" ? "active" : ""}`}>
          <Placeholder title="FlowBuddy" />
        </div>

        <div className={`page ${route === "profile" ? "active" : ""}`}>
          <Placeholder title="Profile" />
        </div>
      </div>

      {/* FLOATING NAV */}
      <div className="bottom-nav">
        <button onClick={() => setRoute("reminders")} className={`nav-btn ${route === "reminders" ? "active" : ""}`}>
          Reminders
        </button>

        <button onClick={() => setRoute("notes")} className={`nav-btn ${route === "notes" ? "active" : ""}`}>
          Notes
        </button>

        <button onClick={() => setRoute("pomodoro")} className={`nav-btn center ${route === "pomodoro" ? "active" : ""}`}>
          Pomodoro
        </button>

        <button onClick={() => setRoute("flowbuddy")} className={`nav-btn ${route === "flowbuddy" ? "active" : ""}`}>
          FlowBuddy
        </button>

        <button onClick={() => setRoute("profile")} className={`nav-btn ${route === "profile" ? "active" : ""}`}>
          Profile
        </button>
      </div>
    </div>
  );
}
