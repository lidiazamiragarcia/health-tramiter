'use client';
import React, { useEffect, useState } from 'react';
import AuthGuard from '../../components/auth/AuthGuard';
import AppShell from '../../components/layout/AppShell';
import Card from '../../components/ui/Card';
import ErrorBanner from '../../components/ui/ErrorBanner';
import httpRequest from '../../services/httpClient';
import pageStyles from '../../components/layout/appShell.module.css';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await httpRequest('/usuarios/me', { method: 'GET' });
        setUser(data);
      } catch (err: any) {
        setError(err?.message || 'Error cargando perfil');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthGuard>
      <AppShell title="Perfil">
        <h1 className={pageStyles.pageTitle}>Perfil de usuario</h1>
        <p className={pageStyles.pageSubtitle}>Información de tu cuenta</p>

        <ErrorBanner message={error} variant="error" />

        <Card title="Datos personales">
          {loading ? (
            <p>Cargando perfil…</p>
          ) : user ? (
            <dl style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0.75rem 1rem', margin: 0 }}>
              <dt style={{ fontWeight: 600, color: 'var(--on-surface)' }}>Nombre</dt>
              <dd style={{ margin: 0 }}>{user.firstName} {user.lastName}</dd>
              <dt style={{ fontWeight: 600, color: 'var(--on-surface)' }}>Email</dt>
              <dd style={{ margin: 0 }}>{user.email}</dd>
              <dt style={{ fontWeight: 600, color: 'var(--on-surface)' }}>Rol</dt>
              <dd style={{ margin: 0 }}>{user.role}</dd>
              {user.identificationType && (
                <>
                  <dt style={{ fontWeight: 600, color: 'var(--on-surface)' }}>Identificación</dt>
                  <dd style={{ margin: 0 }}>{user.identificationTypeCode} — {user.identificationNumber}</dd>
                </>
              )}
            </dl>
          ) : (
            <p>No se pudo cargar la información del perfil.</p>
          )}
        </Card>
      </AppShell>
    </AuthGuard>
  );
}
