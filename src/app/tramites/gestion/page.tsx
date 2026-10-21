'use client';
import React, { useEffect, useState } from 'react';
import AuthGuard from '../../../components/auth/AuthGuard';
import AppShell from '../../../components/layout/AppShell';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';
import ErrorBanner from '../../../components/ui/ErrorBanner';
import {
  getTramites,
  getAssignedTramites,
  updateTramite,
  deleteTramite,
  STATUS_LABELS,
  formatAssignee,
  Tramite,
} from '../../../services/tramiteService';
import { useAuth } from '../../../contexts/auth/AuthProvider';
import { isAdmin } from '../../../utils/roles';
import formStyles from '../../../components/auth/login.module.css';
import pageStyles from '../../../components/layout/appShell.module.css';

const STATUS_OPTIONS = Object.entries(STATUS_LABELS) as [Tramite['status'], string][];

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('es-CO');
}

export default function GestionTramitesPage() {
  const { user } = useAuth();
  const admin = isAdmin(user?.role);
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ type: '', description: '', status: 'PENDIENTE' as Tramite['status'] });

  const load = async () => {
    setLoading(true);
    try {
      const data = admin ? await getTramites() : await getAssignedTramites();
      setTramites(Array.isArray(data) ? data : []);
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error cargando trámites');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [admin]);

  const startEdit = (t: Tramite) => {
    setEditingId(t.id);
    setForm({ type: t.type, description: t.description || '', status: t.status });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setErrorMsg(null);
    try {
      await updateTramite(editingId, form);
      setEditingId(null);
      await load();
      setSuccessMsg('Trámite actualizado');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error actualizando trámite');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este trámite?')) return;
    setErrorMsg(null);
    try {
      await deleteTramite(id);
      await load();
      setSuccessMsg('Trámite eliminado');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error eliminando trámite');
    }
  };

  return (
    <AuthGuard roles={['TRAMITADOR', 'ADMIN']} fallback="/tramites">
      <AppShell title="Gestión de trámites">
        <h1 className={pageStyles.pageTitle}>Gestión de trámites</h1>
        <p className={pageStyles.pageSubtitle}>
          {admin
            ? 'Como administrador puedes ver y gestionar todos los trámites del sistema.'
            : 'Trámites que has tomado. Aquí puedes actualizar el estado y hacer seguimiento.'}
        </p>

        <ErrorBanner message={errorMsg} variant="error" />
        <ErrorBanner message={successMsg} variant="success" />

        {editingId && (
          <Card title={`Editar trámite #${editingId}`}>
            <form className={formStyles.form} onSubmit={handleSave}>
              <label className={formStyles.formLabel}>
                Tipo
                <input className={formStyles.input} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} required />
              </label>
              <label className={formStyles.formLabel}>
                Descripción
                <textarea className={formStyles.input} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </label>
              <label className={formStyles.formLabel}>
                Estado
                <select className={formStyles.input} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Tramite['status'] })}>
                  {STATUS_OPTIONS.map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </label>
              <div className={formStyles.actions}>
                <Button type="submit">Guardar cambios</Button>
                <Button type="button" variant="secondary" onClick={() => setEditingId(null)}>Cancelar</Button>
              </div>
            </form>
          </Card>
        )}

        <Card title={admin ? 'Todos los trámites' : 'Mis trámites asignados'}>
          {loading ? (
            <p>Cargando trámites…</p>
          ) : tramites.length === 0 ? (
            <p>
              {admin
                ? 'No hay trámites registrados.'
                : 'Aún no has tomado trámites. Ve a Trámites disponibles para elegir uno.'}
            </p>
          ) : (
            <Table
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'requester', label: 'Solicitante' },
                ...(admin ? [{ key: 'assignee', label: 'Tramitador' }] : []),
                { key: 'type', label: 'Tipo' },
                { key: 'status', label: 'Estado' },
                { key: 'createdAt', label: 'Fecha' },
                { key: 'actions', label: 'Acciones' },
              ]}
              rows={tramites.map((t) => ({
                id: t.id,
                requester: `${t.requesterFirstName || ''} ${t.requesterLastName || ''}`.trim() || t.requesterEmail,
                assignee: formatAssignee(t),
                type: t.type,
                status: STATUS_LABELS[t.status] || t.status,
                createdAt: formatDate(t.createdAt),
                actions: t.id,
                _raw: t,
              }))}
              renderCell={(key, row) => {
                if (key === 'actions') {
                  const id = row.id as number;
                  return (
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button type="button" variant="secondary" onClick={() => startEdit((row as any)._raw)}>
                        Editar
                      </Button>
                      {admin && (
                        <Button type="button" variant="secondary" onClick={() => handleDelete(id)}>
                          Eliminar
                        </Button>
                      )}
                    </div>
                  );
                }
                return String(row[key] ?? '');
              }}
            />
          )}
        </Card>
      </AppShell>
    </AuthGuard>
  );
}
