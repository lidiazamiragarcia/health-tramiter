import httpRequest from './httpClient';

export const getRoles = () => httpRequest('/roles', { method: 'GET' });
export const createRole = (payload: any) => httpRequest('/roles', { method: 'POST', body: JSON.stringify(payload) });
export const updateRole = (id: number, payload: any) => httpRequest(`/roles/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteRole = (id: number) => httpRequest(`/roles/${id}`, { method: 'DELETE' });

export default { getRoles, createRole, updateRole, deleteRole };

