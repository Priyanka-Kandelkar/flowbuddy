import { useState } from "react";
import "../styles/Reminders.css";
import ReminderCard from "../components/ReminderCard";
import ReminderModal from "../components/ReminderModal";

export default function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  const openAddModal = () => {
    setEditingReminder(null);
    setShowModal(true);
  };

  const openEditModal = (reminder) => {
    setEditingReminder(reminder);
    setShowModal(true);
  };

  const saveReminder = (data) => {
    if (editingReminder && editingReminder.id) {
      setReminders(reminders.map(r =>
        r.id === editingReminder.id ? { ...data, id: r.id } : r
      ));
    } else {
      setReminders([...reminders, { ...data, id: Date.now() }]);
    }
    setShowModal(false);
    setEditingReminder(null);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const isExistingReminder = (reminder) =>
    reminder && reminders.some(r => r.id === reminder.id);

  return (
    <div className="reminders-container">
      <div className="reminders-header">
        <h2>Reminders 🎀</h2>
        <button className="add-btn" onClick={openAddModal}>+ Add</button>
      </div>

      <div className="preset-reminders">
        {/* preset buttons */}
      </div>

      {/* PRESETS */}
      <div className="preset-reminders">
        <button onClick={() => openEditModal({
          title: "Drink Water 💧", hour: "09", minute: "00", period: "AM"
        })}>
          💧 Water
        </button>

        <button onClick={() => openEditModal({
          title: "Lunch Time 🍱", hour: "02", minute: "00", period: "PM"
        })}>
          🍱 Lunch
        </button>

        <button onClick={() => openEditModal({
          title: "Medication 💊", hour: "10", minute: "00", period: "PM"
        })}>
          💊 Medication
        </button>
      </div>

      {/* 🔥 SCROLL AREA */}
      <div className="reminders-scroll">
        <div className="reminder-list">
          {reminders.map(reminder => (
            <ReminderCard
              key={reminder.id}
              reminder={reminder}
              onEdit={() => openEditModal(reminder)}
              onDelete={() => deleteReminder(reminder.id)}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <ReminderModal
          reminder={editingReminder}
          isExisting={isExistingReminder(editingReminder)}
          onSave={saveReminder}
          onDelete={(id) => {
            deleteReminder(id);
            setShowModal(false);
          }}
          onClose={() => {
            setShowModal(false);
            setEditingReminder(null);
          }}
        />
      )}
    </div>
  );
}
