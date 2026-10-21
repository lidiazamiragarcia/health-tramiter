# Components

Componentes reutilizables de la UI.

## Layout (`layout/`)
- `AppShell` — shell autenticado (sidebar + navbar + contenido)
- `Sidebar` — navegación por rol
- `Navbar` — título + `UserMenu`
- `UserMenu` / `UserAvatar` — menú avatar (Perfil, Cerrar sesión)
- `LogoutButton` — cierre de sesión en sidebar

## Auth (`auth/`)
- `LoginForm`, `AuthGuard`, estilos compartidos de formularios

## UI (`ui/`)
- `Button`, `Card`, `Table`, `Pagination`, `ErrorBanner`, `Grid`, `ActionCard`

Convención: componentes pequeños; estilos en `*.module.css` junto al componente.
