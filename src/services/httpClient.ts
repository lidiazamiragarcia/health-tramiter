// Default API base: prefer NEXT_PUBLIC_API_URL, fallback to localhost:3001 (backend dev)
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

type RequestOptions = RequestInit & { token?: string };

function getStoredToken() {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  } catch {
    return null;
  }
}

async function handleResponse(res: Response) {
  const payload = await res.json().catch(() => null);
  if (!res.ok || (payload && payload.success === false)) {
    const details = payload?.errors?.map((e: any) => e.msg).filter(Boolean).join(' ') || payload?.message || 'Request failed';
    const err: any = new Error(details);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }
  return payload?.data ?? payload;
}

export async function httpRequest<T = any>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined)
  };

  const token = options.token || getStoredToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const fetchOptions = { ...options, headers, credentials: 'include' as RequestCredentials };
  let res = await fetch(`${API_BASE}${path}`, fetchOptions);
  try {
    return await handleResponse(res);
  } catch (err: any) {
    // Try refresh once on 401
    if (err && err.status === 401) {
      try {
        const refreshRes = await fetch(`${API_BASE}/auth/refresh`, { method: 'POST', credentials: 'include' });
        if (refreshRes.ok) {
          const refreshPayload = await refreshRes.json().catch(() => null);
          const newAccess = refreshPayload?.data?.accessToken ?? refreshPayload?.accessToken;
          if (newAccess) {
            try {
              localStorage.setItem('accessToken', newAccess);
            } catch {}
            // retry original request with new token
            const retryHeaders = { ...headers, Authorization: `Bearer ${newAccess}` };
            const retryOptions = { ...options, headers: retryHeaders, credentials: 'include' as RequestCredentials };
            res = await fetch(`${API_BASE}${path}`, retryOptions);
            return await handleResponse(res);
          }
        }
      } catch (refreshErr) {
        // ignore and fallthrough to throw original error
      }
    }
    // On 401 after refresh attempt failed, clear token and redirect to login
    try {
      if (typeof window !== 'undefined' && err && err.status === 401) {
        try { localStorage.removeItem('accessToken'); } catch {}
        window.location.href = '/login';
      }
    } catch {}
    throw err;
  }
}

export default httpRequest;
