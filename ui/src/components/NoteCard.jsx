export default function NoteCard({ note, onEditMeta, onDelete, onOpen }) {

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

         <button
      className="delete-btn"
      onClick={(e) => {
        e.stopPropagation();   // 👈 don't open note
        onDelete(note.id);    // 👈 delete it
      }}
      title="Delete note"
    >
      🗑️
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
