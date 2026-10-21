'use client';
import React, { useEffect, useState } from 'react';
import AuthGuard from '../../components/auth/AuthGuard';
import AppShell from '../../components/layout/AppShell';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import ErrorBanner from '../../components/ui/ErrorBanner';
import { getUsers, deleteUser, createUser } from '../../services/userService';
import { getRoles } from '../../services/roleService';
import styles from '../../components/auth/login.module.css';
import pageStyles from '../../components/layout/appShell.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    identificationNumber: '',
    roleId: '',
  });

  const load = async () => {
    setLoading(true);
    try {
      const u = await getUsers();
      setUsers(Array.isArray(u) ? u : []);
      setErrorMsg(null);
    } catch (e: any) {
      setErrorMsg(e?.message || 'Error cargando usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    (async () => {
      try {
        const r = await getRoles();
        setRoles(Array.isArray(r) ? r : []);
      } catch {
        setRoles([]);
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este usuario?')) return;
    setErrorMsg(null);
    try {
      await deleteUser(id);
      await load();
      setSuccessMsg('Usuario eliminado correctamente');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error eliminando usuario');
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      await createUser({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        identificationTypeId: 1,
        identificationNumber: form.identificationNumber,
        roleId: Number(form.roleId) || roles[0]?.id || 2,
      });
      setShowForm(false);
      setForm({ firstName: '', lastName: '', email: '', password: '', identificationNumber: '', roleId: '' });
      await load();
      setSuccessMsg('Usuario creado correctamente');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error creando usuario');
    }
  };

  return (
    <AuthGuard roles={['ADMIN']} fallback="/dashboard">
      <AppShell title="Usuarios">
        <h1 className={pageStyles.pageTitle}>Administración de usuarios</h1>
        <p className={pageStyles.pageSubtitle}>Gestiona los usuarios del sistema</p>

        <ErrorBanner message={errorMsg} variant="error" />
        <ErrorBanner message={successMsg} variant="success" />

        <div style={{ marginBottom: '1rem' }}>
          <Button type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? 'Cancelar' : 'Agregar usuario'}
          </Button>
        </div>

        {showForm && (
          <Card title="Nuevo usuario">
            <form className={styles.form} onSubmit={handleCreate}>
              <div className={styles.formGrid}>
                <label className={styles.formLabel}>
                  Nombres
                  <input className={styles.input} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                </label>
                <label className={styles.formLabel}>
                  Apellidos
                  <input className={styles.input} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
                </label>
                <label className={`${styles.formLabel} ${styles.span2}`}>
                  Email
                  <input className={styles.input} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </label>
                <label className={`${styles.formLabel} ${styles.span2}`}>
                  Contraseña
                  <input className={styles.input} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                </label>
                <label className={`${styles.formLabel} ${styles.span2}`}>
                  Número de identificación
                  <input className={styles.input} value={form.identificationNumber} onChange={(e) => setForm({ ...form, identificationNumber: e.target.value })} required />
                </label>
                <label className={`${styles.formLabel} ${styles.span2}`}>
                  Rol
                  <select className={styles.input} value={form.roleId} onChange={(e) => setForm({ ...form, roleId: e.target.value })} required>
                    <option value="">Seleccione</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={styles.actions}>
                <Button type="submit">Guardar usuario</Button>
              </div>
            </form>
          </Card>
        )}

        <Card title="Listado de usuarios">
          {loading ? (
            <p>Cargando usuarios…</p>
          ) : users.length === 0 ? (
            <p>No hay usuarios registrados.</p>
          ) : (
            <>
              <Table
                columns={[
                  { key: 'id', label: 'ID' },
                  { key: 'name', label: 'Nombre' },
                  { key: 'email', label: 'Email' },
                  { key: 'role', label: 'Rol' },
                  { key: 'actions', label: 'Acciones' },
                ]}
                rows={users.map((u) => ({
                  id: u.id,
                  name: `${u.firstName} ${u.lastName}`,
                  email: u.email,
                  role: u.role,
                  actions: u.id,
                }))}
                renderCell={(key, row) => {
                  if (key === 'actions') {
                    return (
                      <Button type="button" variant="secondary" onClick={() => handleDelete(row.id as number)}>
                        Eliminar
                      </Button>
                    );
                  }
                  return String(row[key] ?? '');
                }}
              />
            </>
          )}
        </Card>
      </AppShell>
    </AuthGuard>
  );
}
