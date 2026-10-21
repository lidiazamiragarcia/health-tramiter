export function normalizeRole(role?: string | null): string {
  return String(role || '').trim().toUpperCase();
}

export function isAdmin(role?: string | null): boolean {
  return normalizeRole(role) === 'ADMIN';
}

export function isTramitador(role?: string | null): boolean {
  return normalizeRole(role) === 'TRAMITADOR';
}

export function isUser(role?: string | null): boolean {
  return normalizeRole(role) === 'USER';
}

/** Admin tiene acceso total; tramitador toma y gestiona trámites asignados */
export function canManageTramites(role?: string | null): boolean {
  const r = normalizeRole(role);
  return r === 'ADMIN' || r === 'TRAMITADOR';
}

export function hasFullAccess(role?: string | null): boolean {
  return isAdmin(role);
}
