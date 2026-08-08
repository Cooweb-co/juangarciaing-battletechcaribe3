export default function ReportView({ report, fromCache }) {
  if (!report) return null

  return (
    <section className="card report-view">
      <div className="report-header">
        <h2>Análisis preliminar</h2>
        {fromCache && (
          <span className="badge cache-badge" title="Ya habías consultado esto — no se volvió a llamar a la IA">
            desde historial
          </span>
        )}
      </div>

      {report.posiblesCausas?.length > 0 && (
        <>
          <h3>Posibles causas</h3>
          <ul>
            {report.posiblesCausas.map((causa, index) => (
              <li key={index}>{causa}</li>
            ))}
          </ul>
        </>
      )}

      {report.recomendaciones?.length > 0 && (
        <>
          <h3>Recomendaciones generales</h3>
          <ul>
            {report.recomendaciones.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </>
      )}

      {report.nivelUrgencia && (
        <p className="urgency">
          <strong>Nivel de urgencia sugerido:</strong> {report.nivelUrgencia}
        </p>
      )}
    </section>
  )
}
