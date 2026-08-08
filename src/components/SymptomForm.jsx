import { useState } from 'react'
import SeveritySelector from './SeveritySelector.jsx'

export default function SymptomForm({ onSubmit, isSubmitting }) {
  const [symptoms, setSymptoms] = useState('')
  const [severity, setSeverity] = useState('leve')
  const [touched, setTouched] = useState(false)

  const isValid = symptoms.trim().length >= 10

  function handleSubmit(event) {
    event.preventDefault()
    setTouched(true)
    if (!isValid || isSubmitting) return
    onSubmit({ symptoms: symptoms.trim(), severity })
  }

  return (
    <form className="card symptom-form" onSubmit={handleSubmit}>
      <label htmlFor="symptoms">Describí tus síntomas</label>
      <textarea
        id="symptoms"
        rows={5}
        placeholder="Ej: dolor de cabeza intenso desde hace 2 días, fiebre leve..."
        value={symptoms}
        onChange={(event) => setSymptoms(event.target.value)}
      />
      {touched && !isValid && (
        <p className="field-error">Contá un poco más (mínimo 10 caracteres).</p>
      )}

      <SeveritySelector value={severity} onChange={setSeverity} />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Analizando…' : 'Analizar síntomas'}
      </button>
    </form>
  )
}
