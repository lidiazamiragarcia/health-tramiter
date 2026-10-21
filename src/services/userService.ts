import httpRequest from './httpClient';

export const getUsers = () => httpRequest('/usuarios', { method: 'GET' });
export const getUser = (id: number) => httpRequest(`/usuarios/${id}`, { method: 'GET' });
export const createUser = (payload: any) => httpRequest('/usuarios', { method: 'POST', body: JSON.stringify(payload) });
export const updateUser = (id: number, payload: any) => httpRequest(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteUser = (id: number) => httpRequest(`/usuarios/${id}`, { method: 'DELETE' });
export const getMe = () => httpRequest('/usuarios/me', { method: 'GET' });

export default { getUsers, getUser, createUser, updateUser, deleteUser, getMe };

