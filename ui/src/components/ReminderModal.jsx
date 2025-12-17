import { useState, useEffect } from "react";
import "../styles/ReminderModal.css";

const DAYS = [
  { key: "mon", label: "M" },
  { key: "tue", label: "T" },
  { key: "wed", label: "W" },
  { key: "thu", label: "T" },
  { key: "fri", label: "F" },
  { key: "sat", label: "S" },
  { key: "sun", label: "S" }
];

export default function ReminderModal({
  reminder,
  isExisting,
  onSave,
  onClose,
  onDelete
}) {
  const [title, setTitle] = useState("");
  const [hour, setHour] = useState("01");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  // 🔥 NEW: repeat days state
  const [repeatDays, setRepeatDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false
  });

  useEffect(() => {
    if (reminder) {
      setTitle(reminder.title || "");
      setHour(reminder.hour || "01");
      setMinute(reminder.minute || "00");
      setPeriod(reminder.period || "AM");
      setRepeatDays(
        reminder.repeatDays || {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false
        }
      );
    }
  }, [reminder]);

  const clampHour = (val) =>
    Math.min(12, Math.max(0, Number(val))).toString().padStart(2, "0");

  const clampMinute = (val) =>
    Math.min(59, Math.max(0, Number(val))).toString().padStart(2, "0");

  const toggleDay = (day) => {
    setRepeatDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      title,
      hour,
      minute,
      period,
      repeatDays
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">
          {reminder ? "Edit Reminder 🎀" : "Add Reminder 🎀"}
        </h3>

        <input
          className="title-input"
          placeholder="Reminder title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* TIME ROW */}
        <div className="time-row">
          <div className="time-control">
            <input
              className="time-input"
              type="number"
              value={hour}
              onChange={(e) => setHour(clampHour(e.target.value))}
            />
            <div className="spinner">
              <button onClick={() => setHour(clampHour(Number(hour) + 1))}>▲</button>
              <button onClick={() => setHour(clampHour(Number(hour) - 1))}>▼</button>
            </div>
          </div>

          <span className="colon">:</span>

          <div className="time-control">
            <input
              className="time-input"
              type="number"
              value={minute}
              onChange={(e) => setMinute(clampMinute(e.target.value))}
            />
            <div className="spinner">
              <button onClick={() => setMinute(clampMinute(Number(minute) + 1))}>▲</button>
              <button onClick={() => setMinute(clampMinute(Number(minute) - 1))}>▼</button>
            </div>
          </div>

          <select
            className="period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>

        {/* 🔥 REPEAT SECTION */}
        <div className="repeat-section">
          <div className="repeat-label">Repeat</div>
          <div className="repeat-days">
            {DAYS.map(day => (
              <button
                key={day.key}
                className={`day-btn ${repeatDays[day.key] ? "active" : ""}`}
                onClick={() => toggleDay(day.key)}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="modal-actions">
          {isExisting && (
            <button className="delete-btn" onClick={() => onDelete(reminder.id)}>
              Delete
            </button>
          )}
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={handleSave} disabled={!title.trim()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
