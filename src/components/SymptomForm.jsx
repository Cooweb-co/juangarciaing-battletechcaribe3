import { useState } from 'react'
import SeveritySelector from './SeveritySelector.jsx'

const MIN_LENGTH = 10
const MAX_LENGTH = 500

export default function SymptomForm({ onSubmit, isSubmitting }) {
  const [symptoms, setSymptoms] = useState('')
  const [severity, setSeverity] = useState('leve')
  const [touched, setTouched] = useState(false)

  const trimmedLength = symptoms.trim().length
  const isValid = trimmedLength >= MIN_LENGTH && trimmedLength <= MAX_LENGTH

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
        maxLength={MAX_LENGTH}
        placeholder="Ej: dolor de cabeza intenso desde hace 2 días, fiebre leve..."
        value={symptoms}
        onChange={(event) => setSymptoms(event.target.value)}
      />
      <p className="char-count">{trimmedLength}/{MAX_LENGTH}</p>
      {touched && !isValid && (
        <p className="field-error">
          Contá entre {MIN_LENGTH} y {MAX_LENGTH} caracteres.
        </p>
      )}

      <SeveritySelector value={severity} onChange={setSeverity} />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Analizando…' : 'Analizar síntomas'}
      </button>
    </form>
  )
}
