import httpRequest from './httpClient';

export type Tramite = {
  id: number;
  userId: number;
  assignedTramitadorId?: number | null;
  type: string;
  description?: string;
  status: 'PENDIENTE' | 'EN_PROCESO' | 'COMPLETADO' | 'RECHAZADO';
  assignedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  requesterFirstName?: string;
  requesterLastName?: string;
  requesterEmail?: string;
  assigneeFirstName?: string;
  assigneeLastName?: string;
  assigneeEmail?: string;
};

export type PaginatedTramites = {
  items: Tramite[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type TramitePayload = {
  type: string;
  description?: string;
  status?: Tramite['status'];
  userId?: number;
};

export const getTramites = () => httpRequest<Tramite[]>('/tramites', { method: 'GET' });
export const getAvailableTramites = (page = 1, pageSize = 10) =>
  httpRequest<PaginatedTramites>(`/tramites/disponibles?page=${page}&pageSize=${pageSize}`, { method: 'GET' });
export const getAssignedTramites = () => httpRequest<Tramite[]>('/tramites/asignados', { method: 'GET' });
export const getTramite = (id: number) => httpRequest<Tramite>(`/tramites/${id}`, { method: 'GET' });
export const createTramite = (payload: TramitePayload) =>
  httpRequest('/tramites', { method: 'POST', body: JSON.stringify(payload) });
export const takeTramite = (id: number) =>
  httpRequest<Tramite>(`/tramites/${id}/tomar`, { method: 'POST' });
export const updateTramite = (id: number, payload: Partial<TramitePayload>) =>
  httpRequest(`/tramites/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTramite = (id: number) => httpRequest(`/tramites/${id}`, { method: 'DELETE' });

export const STATUS_LABELS: Record<Tramite['status'], string> = {
  PENDIENTE: 'Pendiente',
  EN_PROCESO: 'En proceso',
  COMPLETADO: 'Completado',
  RECHAZADO: 'Rechazado',
};

export function formatAssignee(tramite: Tramite): string {
  if (!tramite.assignedTramitadorId) return 'Sin asignar';
  const name = `${tramite.assigneeFirstName || ''} ${tramite.assigneeLastName || ''}`.trim();
  return name || tramite.assigneeEmail || 'Tramitador asignado';
}

export default {
  getTramites,
  getAvailableTramites,
  getAssignedTramites,
  getTramite,
  createTramite,
  takeTramite,
  updateTramite,
  deleteTramite,
  STATUS_LABELS,
  formatAssignee,
};
