import React, { useState } from "react";
import Pomodoro from "./pages/Pomodoro";

/* Simple placeholders for other pages */
function Placeholder({title}) {
  return (
    <div style={{
      minHeight: "60vh",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      color: "#2b2b2b",
      fontSize: 20,
      background: "transparent"
    }}>
      <div style={{background: "rgba(255,255,255,0.6)", padding: 24, borderRadius: 14}}>
        {title} page coming soon ✨
      </div>
    </div>
  );
}

export default function App(){
  const [route, setRoute] = useState("pomodoro");

  return (
    <div style={{height:"100vh", width:"100vw", overflow:"auto"}}>
      {/* Render current page */}
      {route === "calendar" && <Placeholder title="Calendar" />}
      {route === "notes" && <Placeholder title="Notes" />}
      {route === "pomodoro" && <Pomodoro />}
      {route === "reminders" && <Placeholder title="Reminders" />}
      {route === "profile" && <Placeholder title="Profile" />}

      {/* Bottom navigation - persistent */}
      <div style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        bottom: 18,
        width: "min(1100px, 96%)",
        background: "rgba(255,255,255,0.92)",
        padding: "12px 18px",
        borderRadius: 26,
        display: "flex",
        justifyContent: "space-around",
        boxShadow: "0 10px 30px rgba(18,18,18,0.06)",
        zIndex: 9999
      }}>
        <button onClick={() => setRoute("calendar")} className={`nav-btn ${route==='calendar'?'active':''}`}>Calendar</button>
        <button onClick={() => setRoute("notes")} className={`nav-btn ${route==='notes'?'active':''}`}>Notes</button>
        <button onClick={() => setRoute("pomodoro")} className={`nav-btn center ${route==='pomodoro'?'active':''}`}>Pomodoro</button>
        <button onClick={() => setRoute("reminders")} className={`nav-btn ${route==='reminders'?'active':''}`}>Reminders</button>
        <button onClick={() => setRoute("profile")} className={`nav-btn ${route==='profile'?'active':''}`}>Profile</button>
      </div>

      {/* small global styles for nav buttons */}
      <style>{`
        .nav-btn{
          border: none;
          background: transparent;
          font-weight:700;
          padding: 10px 16px;
          border-radius: 12px;
          cursor: pointer;
          color: #6b4352;
        }
        .nav-btn:hover { transform: translateY(-3px); }
        .nav-btn.active { background: linear-gradient(90deg,#ff98c7,#ff7fb3); color:white; box-shadow: 0 8px 22px rgba(255,125,170,0.16); }
        .nav-btn.center { padding: 12px 22px; border-radius: 18px; }
      `}</style>
    </div>
  );
}
