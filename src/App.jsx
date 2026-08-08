import { useState } from 'react'
import SymptomForm from './components/SymptomForm.jsx'
import ReportView from './components/ReportView.jsx'
import Disclaimer from './components/Disclaimer.jsx'
import HistoryPanel from './components/HistoryPanel.jsx'
import { analyzeSymptoms } from './lib/api.js'
import { loadHistory, saveConsultation, findCachedReport, clearHistory } from './lib/history.js'

export default function App() {
  const [report, setReport] = useState(null)
  const [fromCache, setFromCache] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState(() => loadHistory())
  const [formKey, setFormKey] = useState(0)

  async function handleSubmit(input) {
    setIsSubmitting(true)
    setError(null)
    setReport(null)
    setFromCache(false)
    try {
      const cached = findCachedReport(input)
      if (cached) {
        setReport(cached)
        setFromCache(true)
        return
      }
      const result = await analyzeSymptoms(input)
      setReport(result)
      setHistory(saveConsultation({ ...input, report: result }))
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleSelectHistory(entry) {
    setReport(entry.report)
    setFromCache(true)
    setError(null)
  }

  function handleClearHistory() {
    clearHistory()
    setHistory([])
  }

  function handleReset() {
    setReport(null)
    setFromCache(false)
    setError(null)
    setFormKey((key) => key + 1)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>🩺 Asistente Médico Virtual</h1>
        <p>Análisis preliminar de síntomas — solo con fines orientativos.</p>
      </header>
      <main className="app-main">
        <Disclaimer />
        <SymptomForm key={formKey} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        {isSubmitting && (
          <div className="loading-row" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            Analizando síntomas…
          </div>
        )}
        {error && (
          <div className="card error-box" role="alert" aria-live="assertive">
            {error}
          </div>
        )}
        {report && !isSubmitting && (
          <div aria-live="polite">
            <ReportView report={report} fromCache={fromCache} />
            <button type="button" className="reset-button" onClick={handleReset}>
              Nueva consulta
            </button>
          </div>
        )}
        <HistoryPanel
          history={history}
          onSelect={handleSelectHistory}
          onClear={handleClearHistory}
        />
      </main>
    </div>
  )
}
