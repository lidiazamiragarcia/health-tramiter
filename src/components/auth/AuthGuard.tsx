'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { normalizeRole } from '../../utils/roles';
import { shellStyles } from '../layout/AppShell';

type Props = {
  children: React.ReactNode;
  roles?: string[];
  fallback?: string;
};

export default function AuthGuard({ children, roles, fallback = '/dashboard' }: Props) {
  const { user, ready } = useAuth();
  const router = useRouter();

  const allowed =
    user &&
    (!roles || roles.map(normalizeRole).includes(normalizeRole(user.role)));

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace('/login');
      return;
    }
    if (roles && !roles.map(normalizeRole).includes(normalizeRole(user.role))) {
      router.replace(fallback);
    }
  }, [user, ready, roles, router, fallback]);

  if (!ready) {
    return <div className={shellStyles.loading}>Cargando sesión…</div>;
  }

  if (!user || !allowed) {
    return <div className={shellStyles.loading}>Redirigiendo…</div>;
  }

  return <>{children}</>;
}
