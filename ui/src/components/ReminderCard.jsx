export default function ReminderCard({ reminder, onEdit, onDelete }) {
  return (
    <div className="reminder-card">
      <div>
        <div className="reminder-title">{reminder.title}</div>
        <div className="reminder-time">
          {reminder.hour}:{reminder.minute} {reminder.period}
        </div>
      </div>

      <div className="card-actions">
        <button onClick={onEdit}>✏️</button>
        <button onClick={onDelete}>🗑</button>
      </div>
    </div>
  );
}
