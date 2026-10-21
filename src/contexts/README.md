# Contexts

## `auth/AuthProvider.tsx`

Estado global de sesión:

- `user`, `token`, `login()`, `logout()`, `ready`
- Persistencia del access token en `localStorage`
- Logout llama al backend y redirige a `/login`

Usar `useAuth()` dentro de componentes cliente bajo el provider (root `layout.tsx`).
