export async function analyzeSymptoms({ symptoms, severity }) {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms, severity }),
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(data?.error ?? 'No se pudo completar el análisis.')
  }

  return data.report
}
