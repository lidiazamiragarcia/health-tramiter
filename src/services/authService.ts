import httpRequest from './httpClient';

type LoginPayload = { email: string; password: string };

export async function login(payload: LoginPayload) {
  return httpRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export default { login };

