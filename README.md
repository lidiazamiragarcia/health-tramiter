# Health Tramiter — Frontend

Aplicación web en **Next.js 14 (App Router) + TypeScript** para gestión de trámites de salud, conectada a `health-tramiter-api`.

Los prototipos HTML originales están en `legacy_prototypes/` como referencia visual.

## Funcionalidad actual

### Autenticación
- Login (`/login`) — entrada por defecto (`/` redirige aquí)
- Registro (`/register`)
- Recuperar contraseña (`/recuperar`)
- Reset con token (`/reset-password`)
- JWT: access token en `localStorage`, refresh en cookie HttpOnly

### Por rol

| Rol | Pantallas principales |
|-----|----------------------|
| **USER** | Dashboard, Mis trámites (`/tramites`), Perfil |
| **TRAMITADOR** | Dashboard, Trámites disponibles, Mis trámites asignados, Perfil |
| **ADMIN** | Dashboard, Administración, Usuarios, Roles, Gestión de trámites, Perfil |

### Trámites
- Usuario crea solicitudes y ve estado + tramitador asignado.
- Tramitador toma trámites de lista paginada y gestiona los suyos.
- Admin ve y gestiona todos.

### UI / layout
- `AppShell` con sidebar, navbar y menú de usuario (avatar con inicial del email).
- `AuthGuard` por rol en rutas protegidas.
- Estilos: CSS Modules + variables globales (`src/styles/globals.css`).

## Instalación

```bash
cp .env.example .env
npm install
npm run dev
```

Frontend: `http://localhost:3000`  
API (por defecto): `http://localhost:3001/api/v1`

Asegúrate de tener el backend y MySQL en ejecución con el seed aplicado.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL base de la API (ej. `http://localhost:3001/api/v1`) |

> No subir `.env` al repositorio.

## Estructura

```text
src/
  app/                 # Rutas App Router
  components/
    auth/              # LoginForm, AuthGuard
    layout/            # AppShell, Sidebar, Navbar, UserMenu, UserAvatar
    ui/                # Button, Card, Table, Pagination, ErrorBanner
  contexts/auth/       # AuthProvider
  services/            # httpClient, auth, user, role, tramite
  utils/               # roles, avatar, decodeJwt
  styles/
legacy_prototypes/     # HTML/CSS/JS de referencia
public/                # logo.png, assets estáticos
```

## Scripts

```bash
npm run dev          # desarrollo
npm run build        # build producción
npm start            # servidor producción
npm run lint         # ESLint
npm run type-check   # TypeScript
```

## Usuarios de prueba

(Mismos que el seed del backend)

| Rol | Email | Contraseña |
|-----|-------|------------|
| ADMIN | `z.ami98@hotmail.com` | `Admin123!` |
| USER | `usuario@health-tramiter.local` | `User123!` |
| TRAMITADOR | `tramitador@health-tramiter.local` | `Tramitador123!` |

## Documentación adicional

- [`README_FRONTEND.md`](README_FRONTEND.md) — notas de migración y despliegue
- [`ARCHITECTURE.md`](ARCHITECTURE.md)
- [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md)
- [`CHANGELOG.md`](CHANGELOG.md)
- [`ROADMAP.md`](ROADMAP.md)
- [`AGENTS.md`](AGENTS.md)

## Despliegue (resumen)

1. `npm ci && npm run build`
2. Configurar `NEXT_PUBLIC_API_URL` al dominio de la API en producción.
3. Desplegar en Vercel, Node (`npm start`) o detrás de NGINX con HTTPS.
