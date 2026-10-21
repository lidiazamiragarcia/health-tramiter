'use client';
import React, { useEffect, useState } from 'react';
import AuthGuard from '../../components/auth/AuthGuard';
import AppShell from '../../components/layout/AppShell';
import Card from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import ErrorBanner from '../../components/ui/ErrorBanner';
import { getTramites, createTramite, STATUS_LABELS, formatAssignee, Tramite } from '../../services/tramiteService';
import formStyles from '../../components/auth/login.module.css';
import pageStyles from '../../components/layout/appShell.module.css';

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('es-CO');
}

export default function MisTramitesPage() {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const data = await getTramites();
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
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    try {
      await createTramite({ type, description });
      setType('');
      setDescription('');
      setShowForm(false);
      await load();
      setSuccessMsg('Trámite creado correctamente');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error creando trámite');
    }
  };

  return (
    <AuthGuard roles={['USER']} fallback="/tramites/gestion">
      <AppShell title="Mis trámites">
        <h1 className={pageStyles.pageTitle}>Mis trámites</h1>
        <p className={pageStyles.pageSubtitle}>
          Consulta el estado de tus solicitudes y quién te está gestionando cada trámite.
        </p>

        <ErrorBanner message={errorMsg} variant="error" />
        <ErrorBanner message={successMsg} variant="success" />

        <div style={{ marginBottom: '1rem' }}>
          <Button type="button" onClick={() => setShowForm((v) => !v)}>
            {showForm ? 'Cancelar' : 'Nuevo trámite'}
          </Button>
        </div>

        {showForm && (
          <Card title="Solicitar trámite">
            <form className={formStyles.form} onSubmit={handleCreate}>
              <label className={formStyles.formLabel}>
                Tipo de trámite
                <input className={formStyles.input} value={type} onChange={(e) => setType(e.target.value)} required />
              </label>
              <label className={formStyles.formLabel}>
                Descripción
                <textarea className={formStyles.input} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
              </label>
              <div className={formStyles.actions}>
                <Button type="submit">Enviar solicitud</Button>
              </div>
            </form>
          </Card>
        )}

        <Card title="Historial de trámites">
          {loading ? (
            <p>Cargando trámites…</p>
          ) : tramites.length === 0 ? (
            <p>No tienes trámites registrados.</p>
          ) : (
            <Table
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'type', label: 'Tipo' },
                { key: 'status', label: 'Estado' },
                { key: 'assignee', label: 'Tramitador' },
                { key: 'createdAt', label: 'Fecha' },
              ]}
              rows={tramites.map((t) => ({
                id: t.id,
                type: t.type,
                status: STATUS_LABELS[t.status] || t.status,
                assignee: formatAssignee(t),
                createdAt: formatDate(t.createdAt),
              }))}
            />
          )}
        </Card>
      </AppShell>
    </AuthGuard>
  );
}
