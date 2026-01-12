export default function NoteCard({ note, onEditMeta, onOpen }) {
  return (
    <div
      className="note-card"
      style={{ background: note.color }}
      onClick={() => onOpen(note)}   // 👈 THIS WAS MISSING
    >
      <div className="note-card-header">
        <h4>{note.title}</h4>

        <button
          className="edit-btn"
          onClick={(e) => {
            e.stopPropagation();   // prevents opening notebook
            onEditMeta(note);      // opens edit modal
          }}
          title="Edit note details"
        >
          ✏️
        </button>
      </div>

      <p>
        {note.content
          ? note.content.replace(/<[^>]+>/g, "").slice(0, 80)
          : "No content yet…"}
      </p>
    </div>
  );
}
