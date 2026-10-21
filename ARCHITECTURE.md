# Arquitectura — Frontend (Health Tramiter)

## Resumen

**Next.js 14 App Router** + **TypeScript** + **CSS Modules**. Cliente de API centralizado con refresh automático de JWT.

## Capas

```text
app/(routes) → components → services → API REST
                ↑
         contexts (AuthProvider)
```

| Capa | Responsabilidad |
|------|-----------------|
| **app/** | Rutas, layouts, páginas (`page.tsx`) |
| **components/** | UI reutilizable y layout (AppShell, Sidebar, Navbar) |
| **services/** | Llamadas HTTP (`httpClient`, `*Service.ts`) |
| **contexts/** | Estado global de autenticación |
| **utils/** | Roles, avatar, decode JWT |

## Autenticación

- `AuthProvider` guarda access token en `localStorage`.
- `httpClient` adjunta `Authorization: Bearer` y reintenta con `/auth/refresh` en 401.
- `AuthGuard` protege rutas y valida roles antes de renderizar.
- Redirect post-login: ADMIN → `/admin`, TRAMITADOR → `/tramites/disponibles`, USER → `/dashboard`.

## Layout autenticado

`AppShell` = `Sidebar` + `Navbar` + contenido.

- Sidebar: navegación filtrada por rol.
- Navbar: título de página + `UserMenu` (avatar con inicial del email, Perfil, Cerrar sesión).

## Estilos

- Variables globales en `src/styles/globals.css`.
- CSS Modules por componente (`*.module.css`).
- Referencia visual: `legacy_prototypes/`.

## Pantallas migradas

| Ruta | Descripción |
|------|-------------|
| `/login`, `/register`, `/recuperar`, `/reset-password` | Auth pública |
| `/dashboard` | Inicio por rol |
| `/profile` | Perfil usuario |
| `/tramites` | Mis trámites (USER) |
| `/tramites/disponibles` | Tomar trámites (TRAMITADOR) |
| `/tramites/gestion` | Gestión (TRAMITADOR / ADMIN) |
| `/admin`, `/users`, `/roles` | Administración (ADMIN) |

## Principios

- `"use client"` solo donde hay hooks, eventos o browser APIs.
- No llamar API desde componentes visuales; usar `services/`.
- Componentes pequeños, una responsabilidad.
- Mobile-first y accesibilidad básica (labels, aria en menús).

## Pendiente

- Tests e2e (login, flujo trámites).
- Mover access token a cookie HttpOnly (opcional, mayor seguridad).
- Design system documentado.
- Métricas dinámicas en dashboard.
