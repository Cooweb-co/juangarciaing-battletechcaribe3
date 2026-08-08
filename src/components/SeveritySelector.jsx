const LEVELS = [
  { value: 'leve', label: 'Leve' },
  { value: 'moderado', label: 'Moderado' },
  { value: 'severo', label: 'Severo' },
]

export default function SeveritySelector({ value, onChange }) {
  return (
    <fieldset className="severity-selector">
      <legend>Severidad de los síntomas</legend>
      <div className="severity-options">
        {LEVELS.map((level) => (
          <label key={level.value} className="severity-option">
            <input
              type="radio"
              name="severity"
              value={level.value}
              checked={value === level.value}
              onChange={() => onChange(level.value)}
            />
            {level.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
