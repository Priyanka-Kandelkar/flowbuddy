import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/notebook.css";

export default function NotebookView({ note, onSave }) {
  const pageRef = useRef(null);
  console.log("Notebook opened", note);


  useEffect(() => {
    pageRef.current.innerHTML = note?.content || "";
  }, [note]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.execCommand("insertLineBreak");
    }
  };

  const handleClose = () => {
    onSave(pageRef.current.innerHTML);
  };

  return (
    <motion.div
      className="notebook-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="notebook-container"
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <div className="notebook-topbar">
          <span className="notebook-title">{note.title}</span>
          <button className="notebook-close" onClick={handleClose}>
            ✕
          </button>
        </div>

        <div
          ref={pageRef}
          className="notebook-page single"
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
        />
      </motion.div>
    </motion.div>
  );
}
