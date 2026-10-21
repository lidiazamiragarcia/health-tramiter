'use client';
import React from 'react';
import Link from 'next/link';
import AuthGuard from '../../components/auth/AuthGuard';
import AppShell from '../../components/layout/AppShell';
import Card from '../../components/ui/Card';
import pageStyles from '../../components/layout/appShell.module.css';

export default function AdminPage() {
  return (
    <AuthGuard roles={['ADMIN']} fallback="/dashboard">
      <AppShell title="Administración">
        <h1 className={pageStyles.pageTitle}>Panel de administración</h1>
        <p className={pageStyles.pageSubtitle}>Acceso completo: usuarios, roles y trámites</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          <Card title="Usuarios">
            <p style={{ marginBottom: '1rem', color: 'var(--on-surface-variant)' }}>
              Crear, editar y eliminar usuarios del sistema.
            </p>
            <Link href="/users" style={{ fontWeight: 600 }}>Ir a gestión de usuarios →</Link>
          </Card>
          <Card title="Roles">
            <p style={{ marginBottom: '1rem', color: 'var(--on-surface-variant)' }}>
              Administra los roles y permisos disponibles.
            </p>
            <Link href="/roles" style={{ fontWeight: 600 }}>Ir a gestión de roles →</Link>
          </Card>
          <Card title="Trámites">
            <p style={{ marginBottom: '1rem', color: 'var(--on-surface-variant)' }}>
              Ver y gestionar todos los trámites del sistema.
            </p>
            <Link href="/tramites/gestion" style={{ fontWeight: 600 }}>Ir a gestión de trámites →</Link>
          </Card>
        </div>
      </AppShell>
    </AuthGuard>
  );
}
