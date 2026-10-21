# Health Tramiter — Frontend (notas de desarrollo)

> Documentación principal: [`README.md`](README.md)

## Estado

Migración de prototipos HTML a **Next.js 14 + TypeScript** en curso avanzada. Auth, administración y trámites conectados al backend.

## Arranque local

```bash
cp .env.example .env
npm install
npm run dev
```

Requisitos: backend en `http://localhost:3001` y MySQL con seed aplicado.

## Autenticación

- **Access token:** `localStorage` (`accessToken`).
- **Refresh token:** cookie HttpOnly (backend).
- Peticiones con `credentials: 'include'`.
- Logout: API + limpieza local + redirect `/login`.

## Cliente HTTP

`src/services/httpClient.ts` — base URL desde `NEXT_PUBLIC_API_URL`.

## Prototipos

`legacy_prototypes/` — no eliminar; referencia visual para estilos y flujos.

## Despliegue

1. `npm ci && npm run build`
2. Variable `NEXT_PUBLIC_API_URL` apuntando a la API en producción.
3. Vercel / Node (`npm start`) / NGINX reverse proxy.

### Seguridad recomendada

- HTTPS en frontend y API.
- CORS configurado en backend para el dominio del frontend.
- No commitear `.env` ni credenciales (`js/credenciales.json` está en `.gitignore`).

## Scripts útiles

```bash
npm run dev
npm run build
npm run lint
npm run type-check
```
