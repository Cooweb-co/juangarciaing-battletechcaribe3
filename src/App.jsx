import { useState } from 'react'
import SymptomForm from './components/SymptomForm.jsx'
import ReportView from './components/ReportView.jsx'
import Disclaimer from './components/Disclaimer.jsx'
import { analyzeSymptoms } from './lib/api.js'

export default function App() {
  const [report, setReport] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(input) {
    setIsSubmitting(true)
    setError(null)
    setReport(null)
    try {
      const result = await analyzeSymptoms(input)
      setReport(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Asistente Médico Virtual</h1>
        <p>Análisis preliminar de síntomas — solo con fines orientativos.</p>
      </header>
      <main className="app-main">
        <Disclaimer />
        <SymptomForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        {error && (
          <div className="card error-box" role="alert">
            {error}
          </div>
        )}
        <ReportView report={report} />
      </main>
    </div>
  )
}
