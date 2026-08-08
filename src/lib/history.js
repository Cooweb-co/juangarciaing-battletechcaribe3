const STORAGE_KEY = 'amv:consultation-history'
const MAX_ENTRIES = 20

function normalize(symptoms) {
  return symptoms.trim().toLowerCase().replace(/\s+/g, ' ')
}

export function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveConsultation({ symptoms, severity, report }) {
  const history = loadHistory()
  const entry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    symptoms,
    severity,
    report,
    createdAt: new Date().toISOString(),
  }
  const next = [entry, ...history].slice(0, MAX_ENTRIES)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}

// Evita quemar créditos de la API si ya se consultó exactamente lo mismo antes.
export function findCachedReport({ symptoms, severity }) {
  const target = normalize(symptoms)
  const match = loadHistory().find(
    (entry) => normalize(entry.symptoms) === target && entry.severity === severity,
  )
  return match ? match.report : null
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY)
}
