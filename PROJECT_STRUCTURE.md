# Estructura del proyecto — Frontend

```text
health-tramiter/
├── public/
│   └── logo.png
├── legacy_prototypes/       # HTML/CSS/JS originales (referencia)
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout + AuthProvider
│   │   ├── page.tsx         # Redirect → /login
│   │   ├── login/
│   │   ├── register/
│   │   ├── recuperar/
│   │   ├── reset-password/
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── admin/
│   │   ├── users/
│   │   ├── roles/
│   │   └── tramites/
│   │       ├── page.tsx           # Mis trámites (USER)
│   │       ├── disponibles/
│   │       ├── gestion/
│   │       └── create/
│   ├── components/
│   │   ├── auth/            # LoginForm, AuthGuard, ErrorBanner
│   │   ├── layout/          # AppShell, Sidebar, Navbar, UserMenu, UserAvatar
│   │   └── ui/              # Button, Card, Table, Pagination, Grid
│   ├── contexts/auth/       # AuthProvider.tsx
│   ├── services/
│   │   ├── httpClient.ts
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── roleService.ts
│   │   └── tramiteService.ts
│   ├── utils/
│   │   ├── roles.ts
│   │   ├── avatar.ts
│   │   └── decodeJwt.ts
│   └── styles/
│       └── globals.css
├── .env.example
└── package.json
```

## Convenciones

- Rutas en `src/app/` (App Router).
- Páginas con estado/hooks: `"use client"` al inicio del archivo.
- Servicios exportan funciones tipadas; tipos de dominio junto al servicio o en `types/`.
- Imports desde `@/` no configurado; usar rutas relativas actuales.

## Navegación por rol (sidebar)

| Rol | Enlaces visibles |
|-----|------------------|
| USER | Dashboard, Mis trámites, Perfil |
| TRAMITADOR | Dashboard, Trámites disponibles, Mis trámites asignados, Perfil |
| ADMIN | Dashboard, Admin, Usuarios, Roles, Gestión trámites, Perfil |
