<nav className="header-nav">
  <button onClick={()=>onNavigate('calendar')}>Calendar</button>
  <button onClick={()=>onNavigate('notes')}>Notes</button>
  <button onClick={()=>onNavigate('pomodoro')} className="center-btn">Pomodoro</button>
  <button onClick={()=>onNavigate('reminders')}>Reminders</button>
  <button onClick={()=>onNavigate('profile')}>Profile</button>
</nav>
