import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "#fde2e4",
  "#fff1c1",
  "#e6e6fa",
  "#e0f4e8",
  "#e8f0fe"
];

export default function AddNoteModal({
  mode,
  note,
  onCreate,
  onUpdate,
  onDelete,
  onClose
}) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    if (mode === "edit" && note) {
      setTitle(note.title);
      setColor(note.color);
    }
  }, [mode, note]);

  const handleSave = () => {
    const payload = {
      id: note?.id || Date.now(),
      title,
      content: note?.content || "",
      color
    };

    mode === "edit" ? onUpdate(payload) : onCreate(payload);
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal pretty-modal notes-modal"
        initial={{ y: 40, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.94 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {/* HEADER */}
        <div className="modal-header">
          <h2>{mode === "edit" ? "Edit Note" : "New Note"}</h2>
        </div>

        {/* BODY */}
        <div className="modal-body">
          <input
            placeholder="Note title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="color-options">
            {COLORS.map(c => (
              <div
                key={c}
                className={`color-swatch ${color === c ? "active" : ""}`}
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>

          <div className="modal-actions">
            {mode === "create" && (
              <button className="primary-btn" onClick={handleSave}>
                Create
              </button>
            )}

            {mode === "edit" && (
              <>
                <button className="primary-btn" onClick={handleSave}>
                  Save
                </button>

                <button
                  className="danger-btn"
                  onClick={() => onDelete(note.id)}
                >
                  Delete
                </button>
              </>
            )}

            <button className="ghost-btn" onClick={onClose}>
              Cancel
            </button>
          </div>



        </div>
      </motion.div>
    </motion.div>
  );
}
