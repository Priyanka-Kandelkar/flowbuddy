import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/notes.css";
import NoteCard from "../components/NoteCard";
import AddNoteModal from "../components/AddNoteModal";
import NotebookView from "../components/NotebookView";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [openNote, setOpenNote] = useState(null);

    const handleCreate = (note) => {
        setNotes([note, ...notes]);
        setShowModal(false);
    };

    const handleUpdate = (updatedNote) => {
        setNotes(notes.map(n => (n.id === updatedNote.id ? updatedNote : n)));
        setEditingNote(null);
    };

    const handleDelete = (id) => {
        setNotes(notes.filter(n => n.id !== id));
        setEditingNote(null);
    };

    return (
        <div className="notes-page">
            <div className="notes-grid">
                {/* ADD NOTE CARD */}
                <motion.div
                    className="note-card add-note-card"
                    whileHover={{
                        scale: 1.06,
                        boxShadow: "0 14px 35px rgba(0,0,0,0.2)"
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => {
                        setEditingNote(null);
                        setShowModal(true);
                    }}
                >
                    +
                </motion.div>

                {/* EXISTING NOTES */}
                {notes.map(note => (
                    <motion.div
                        key={note.id}
                        whileHover={{
                            scale: 1.04,
                            boxShadow: "0 12px 30px rgba(0,0,0,0.18)"
                        }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <NoteCard
                            note={note}
                            onEditMeta={(n) => {
                                setEditingNote(n);
                                setShowModal(true);
                            }}
                            onOpen={setOpenNote}
                        />
                    </motion.div>
                ))}
            </div>

            {/* CREATE / EDIT META MODAL */}
            <AnimatePresence>
                {(showModal || editingNote) && (
                    <AddNoteModal
                        mode={editingNote ? "edit" : "create"}
                        note={editingNote}
                        onCreate={handleCreate}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        onClose={() => {
                            setShowModal(false);
                            setEditingNote(null);
                        }}
                    />
                )}
            </AnimatePresence>

            {/* NOTEBOOK VIEW */}
            <AnimatePresence>
                {openNote && (
                    <NotebookView
                        note={openNote}
                        onSave={(updatedContent) => {
                            setNotes(notes =>
                                notes.map(n =>
                                    n.id === openNote.id
                                        ? { ...n, content: updatedContent }
                                        : n
                                )
                            );
                            setOpenNote(null);
                        }}
                    />

                )}
            </AnimatePresence>
        </div>
    );
}
