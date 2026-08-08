const SYSTEM_PROMPT = `Actuás como un asistente de triaje médico orientativo, NO un médico.
Recibís síntomas descritos en lenguaje natural y una severidad autopercibida (leve, moderado, severo).
Respondé EXCLUSIVAMENTE con un JSON válido, sin texto adicional, con esta forma exacta:
{
  "posiblesCausas": string[],
  "recomendaciones": string[],
  "nivelUrgencia": "bajo" | "medio" | "alto"
}
No des un diagnóstico definitivo. Si la severidad es "severo" o los síntomas sugieren emergencia,
recomendá buscar atención médica inmediata y usá nivelUrgencia "alto".`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { symptoms, severity } = req.body ?? {}

  if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length < 10) {
    return res.status(400).json({ error: 'Describí los síntomas con más detalle (mínimo 10 caracteres).' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'El servidor no tiene configurada la API key de OpenAI.' })
  }

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          {
            role: 'user',
            content: `Síntomas: ${symptoms}\nSeveridad autopercibida: ${severity ?? 'no especificada'}`,
          },
        ],
      }),
    })

    if (!openaiResponse.ok) {
      const detail = await openaiResponse.text()
      console.error('OpenAI API error', openaiResponse.status, detail)
      return res.status(502).json({ error: 'No se pudo obtener el análisis en este momento. Probá de nuevo.' })
    }

    const data = await openaiResponse.json()
    const content = data.choices?.[0]?.message?.content

    if (!content) {
      return res.status(502).json({ error: 'La IA no devolvió una respuesta válida.' })
    }

    const report = JSON.parse(content)
    return res.status(200).json({ report })
  } catch (error) {
    console.error('Error en /api/analyze', error)
    return res.status(500).json({ error: 'Error interno al procesar el análisis.' })
  }
}
