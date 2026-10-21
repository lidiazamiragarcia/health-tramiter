'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import authService from '../../services/authService';
import { decodeJwt } from '../../utils/decodeJwt';

type User = { id: number; firstName: string; lastName: string; email: string; role?: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  ready: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem('accessToken');
    if (t) {
      setToken(t);
      const payload = decodeJwt(t);
      if (payload) setUser({ id: payload.id, firstName: payload.firstName || '', lastName: payload.lastName || '', email: payload.email, role: payload.role || null });
    }
    setReady(true);
  }, []);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    const accessToken = data?.accessToken;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      setToken(accessToken);
      const payload = decodeJwt(accessToken);
      const userObj = payload ? { id: payload.id, firstName: payload.firstName || '', lastName: payload.lastName || '', email: payload.email, role: payload.role || null } : null;
      setUser(userObj);
      return userObj;
    }
    return null;
  };

  const logout = () => {
    // Attempt to notify backend to revoke refresh token (if any)
    try {
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1'}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      }).catch(() => {
        /* ignore network errors; proceed to clear client state */
      });
    } finally {
      localStorage.removeItem('accessToken');
      setToken(null);
      setUser(null);
      router.push('/login');
    }
  };

  return <AuthContext.Provider value={{ user, token, login, logout, ready }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

