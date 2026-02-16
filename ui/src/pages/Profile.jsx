import React, { useState } from "react";
import "../styles/profile.css";
import { useRef } from "react";
import { useEffect } from "react";


export default function Profile() {
  const [focusTime, setFocusTime] = useState("Morning");
  const [goal, setGoal] = useState("Study");
  const [tone, setTone] = useState("Gentle");

  const [avatarColor, setAvatarColor] = useState("#ff9acb");
  const [avatarImage, setAvatarImage] = useState(null);

  const [name, setName] = useState("");
  const [vibe, setVibe] = useState("");

  const [editingName, setEditingName] = useState(false);
  const [editingVibe, setEditingVibe] = useState(false);

  const fileRef = useRef(null);
  const [avatarClicked, setAvatarClicked] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatarImage(url);
  };


  const savePreferences = async () => {
    try {
      await fetch("http://localhost:8081/user/preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          tone,
          goal,
          focusTime
        })
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };


  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/user/preferences/1"
        );

        if (!response.ok) return;

        const text = await response.text();

        if (!text) return; // handle empty body safely

        const data = JSON.parse(text);

        setTone(data.tone);
        setGoal(data.goal);
        setFocusTime(data.focusTime);

      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };

    fetchPreferences();
  }, []);



  return (
    <div className="profile-root">
      <div className="profile-glass">

        {/* HEADER */}
        <div className="profile-header">
          <div
            className={`avatar-circle ${avatarClicked ? "clicked" : ""}`}
            style={{
              background: avatarImage
                ? `url(${avatarImage}) center / cover no-repeat`
                : avatarColor
            }}
            onClick={() => {
              setAvatarClicked(true);
              fileRef.current?.click();

              setTimeout(() => setAvatarClicked(false), 180);
            }}
          >
            {!avatarImage && "🌸"}
          </div>


          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />

          {avatarImage && (
            <button
              className="pill-button remove-avatar-pill"
              onClick={() => setAvatarImage(null)}
            >
              Remove photo
            </button>
          )}



          <div className="color-picker">
            {["#ff9acb", "#c9b6ff", "#ffd6e8", "#b8f2e6", "#fde2a7"].map(color => (
              <button
                key={color}
                className="color-dot"
                style={{ background: color, opacity: avatarImage ? 0.4 : 1 }}
                disabled={!!avatarImage}
                onClick={() => setAvatarColor(color)}
              />

            ))}
          </div>
        </div>

        {editingName ? (
          <input
            className="profile-name"
            autoFocus
            value={name}
            placeholder="Your name"
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setEditingName(false)}
          />
        ) : (
          <div
            className="profile-name display"
            onClick={() => setEditingName(true)}
          >
            {name || "Your name"}
          </div>
        )}

        {editingVibe ? (
          <input
            className="profile-vibe"
            autoFocus
            value={vibe}
            placeholder="Focused • Soft mornings • Deep work evenings"
            onChange={(e) => setVibe(e.target.value)}
            onBlur={() => setEditingVibe(false)}
          />
        ) : (
          <div
            className="profile-vibe display"
            onClick={() => setEditingVibe(true)}
          >
            {vibe || "Focused • Soft mornings • Deep work evenings"}
          </div>
        )}


        {/* PREFERENCES */}
        <div className="profile-section">
          <h3>Preferences</h3>

          <div className="pref-row pill-group">
            {["Morning", "Afternoon", "Night"].map(option => (
              <button
                key={option}
                className={focusTime === option ? "active" : ""}
                onClick={() => setFocusTime(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="pref-row pill-group">
            {["Study", "Work", "Balance", "Mental Health"].map(option => (
              <button
                key={option}
                className={goal === option ? "active" : ""}
                onClick={() => setGoal(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="pref-row pill-group">
            {["Gentle", "Motivational", "Straight Forward"].map(option => (
              <button
                key={option}
                className={tone === option ? "active" : ""}
                onClick={() => setTone(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="pref-save">
            <button
              className="save-pref-btn"
              onClick={savePreferences}
            >
              Save Preferences
            </button>
          </div>
          {saved && <p className="saved-msg">Preferences saved ✨</p>}
        </div>



        {/* STATS */}
        <div className="profile-section">
          <h3>Your Flow</h3>

          <div className="stats-grid">
            <div className="stat-card">
              <span>🔥</span>
              <strong>24</strong>
              <p>Pomodoros</p>
            </div>

            <div className="stat-card">
              <span>📝</span>
              <strong>12</strong>
              <p>Notes</p>
            </div>

            <div className="stat-card">
              <span>📆</span>
              <strong>7</strong>
              <p>Days active</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
