export default function HistoryPanel({ history, onSelect, onClear }) {
  if (history.length === 0) return null

  return (
    <section className="card history-panel">
      <div className="history-header">
        <h2>Historial de consultas</h2>
        <button type="button" className="link-button" onClick={onClear}>
          Borrar historial
        </button>
      </div>
      <ul className="history-list">
        {history.map((entry) => (
          <li key={entry.id}>
            <button
              type="button"
              className="history-item"
              onClick={() => onSelect(entry)}
            >
              <span className="history-symptoms">{entry.symptoms}</span>
              <span className={`badge severity-${entry.severity}`}>{entry.severity}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
