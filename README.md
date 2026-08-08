# Token Battle

Repo generado automáticamente para tu batalla. Codea acá, el árbitro lee tus commits/PRs en vivo.

## Asistente Médico Virtual

Triaje preliminar de síntomas con IA. **No reemplaza una consulta médica real.**

### Stack

- Frontend: React + Vite
- Backend: función serverless de Node.js en `/api/analyze` (Vercel), llama a la API de OpenAI
- Sin base de datos — historial de consultas en `localStorage` del navegador

### Correr en local

```bash
npm install
npm run dev
```

Para probar la función serverless localmente necesitás `npx vercel dev` (usa las funciones de `/api`).

### Variables de entorno

| Variable | Descripción |
| --- | --- |
| `OPENAI_API_KEY` | API key de OpenAI, requerida por `/api/analyze`. Configurar en Vercel (Project Settings → Environment Variables) y localmente como variable de entorno, nunca commiteada. |
