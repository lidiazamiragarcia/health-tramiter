'use client';
import React, { useEffect, useState } from 'react';
import AuthGuard from '../../components/auth/AuthGuard';
import AppShell from '../../components/layout/AppShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ErrorBanner from '../../components/ui/ErrorBanner';
import { getRoles, createRole, deleteRole } from '../../services/roleService';
import styles from '../../components/auth/login.module.css';
import pageStyles from '../../components/layout/appShell.module.css';

export default function RolesPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const r = await getRoles();
      setRoles(Array.isArray(r) ? r : []);
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error cargando roles');
      setRoles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      await createRole({ name, description });
      setName('');
      setDescription('');
      setShowForm(false);
      await load();
      setSuccessMsg('Rol creado correctamente');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error creando rol');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este rol?')) return;
    setErrorMsg(null);
    try {
      await deleteRole(id);
      await load();
      setSuccessMsg('Rol eliminado correctamente');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error eliminando rol');
    }
  };

  return (
    <AuthGuard roles={['ADMIN']} fallback="/dashboard">
      <AppShell title="Roles">
        <h1 className={pageStyles.pageTitle}>Gestión de roles</h1>
        <p className={pageStyles.pageSubtitle}>Administra los permisos del sistema</p>

        <ErrorBanner message={errorMsg} variant="error" />
        <ErrorBanner message={successMsg} variant="success" />

        <div style={{ marginBottom: '1rem' }}>
          <Button type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? 'Cancelar' : 'Agregar rol'}
          </Button>
        </div>

        {showForm && (
          <Card title="Nuevo rol">
            <form className={styles.form} onSubmit={handleCreate}>
              <label className={styles.formLabel}>
                Nombre del rol
                <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} required />
              </label>
              <label className={styles.formLabel}>
                Descripción
                <input className={styles.input} value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <div className={styles.actions}>
                <Button type="submit">Guardar rol</Button>
              </div>
            </form>
          </Card>
        )}

        <Card title="Roles registrados">
          {loading ? (
            <p>Cargando roles…</p>
          ) : roles.length === 0 ? (
            <p>No hay roles registrados.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {roles.map((r) => (
                <div
                  key={r.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.85rem 1rem',
                    border: '1px solid var(--surface-dim)',
                    borderRadius: 'var(--radius-sm)',
                    background: '#fff',
                  }}
                >
                  <div>
                    <strong>{r.name}</strong>
                    {r.description && (
                      <div style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', marginTop: 4 }}>
                        {r.description}
                      </div>
                    )}
                  </div>
                  <Button type="button" variant="secondary" onClick={() => handleDelete(r.id)}>
                    Eliminar
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </AppShell>
    </AuthGuard>
  );
}
