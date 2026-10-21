'use client';
import React, { useCallback, useEffect, useState } from 'react';
import AuthGuard from '../../../components/auth/AuthGuard';
import AppShell from '../../../components/layout/AppShell';
import Card from '../../../components/ui/Card';
import Table from '../../../components/ui/Table';
import Button from '../../../components/ui/Button';
import Pagination from '../../../components/ui/Pagination';
import ErrorBanner from '../../../components/ui/ErrorBanner';
import {
  getAvailableTramites,
  takeTramite,
  STATUS_LABELS,
  Tramite,
} from '../../../services/tramiteService';
import pageStyles from '../../../components/layout/appShell.module.css';

const DEFAULT_PAGE_SIZE = 10;

function formatDate(value?: string) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('es-CO');
}

export default function TramitesDisponiblesPage() {
  const [tramites, setTramites] = useState<Tramite[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [takingId, setTakingId] = useState<number | null>(null);

  const load = useCallback(async (targetPage = page, targetPageSize = pageSize) => {
    setLoading(true);
    try {
      const data = await getAvailableTramites(targetPage, targetPageSize);
      const items = Array.isArray(data?.items) ? data.items : [];
      const nextTotal = data?.total ?? 0;
      const nextTotalPages = data?.totalPages ?? 1;
      let nextPage = data?.page ?? targetPage;

      if (items.length === 0 && nextTotal > 0 && nextPage > 1) {
        nextPage = nextPage - 1;
        const retry = await getAvailableTramites(nextPage, targetPageSize);
        setTramites(Array.isArray(retry?.items) ? retry.items : []);
        setPage(retry?.page ?? nextPage);
        setTotal(retry?.total ?? 0);
        setTotalPages(retry?.totalPages ?? 1);
      } else {
        setTramites(items);
        setPage(nextPage);
        setTotal(nextTotal);
        setTotalPages(nextTotalPages);
      }
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error cargando trámites disponibles');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    load(page, pageSize);
  }, [page, pageSize, load]);

  const handleTake = async (id: number) => {
    setErrorMsg(null);
    setTakingId(id);
    try {
      await takeTramite(id);
      setSuccessMsg('Trámite tomado correctamente. Pasó a "En proceso" y ya no aparece en disponibles.');
      setTimeout(() => setSuccessMsg(null), 4000);
      await load(page, pageSize);
    } catch (err: any) {
      setErrorMsg(err?.message || 'No se pudo tomar el trámite');
      await load(page, pageSize);
    } finally {
      setTakingId(null);
    }
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  return (
    <AuthGuard roles={['TRAMITADOR']} fallback="/dashboard">
      <AppShell title="Trámites disponibles">
        <h1 className={pageStyles.pageTitle}>Trámites disponibles</h1>
        <p className={pageStyles.pageSubtitle}>
          Solo se listan trámites en estado Pendiente sin tramitador. Al tomar uno, pasa a En proceso y desaparece de esta lista.
        </p>

        <ErrorBanner message={errorMsg} variant="error" />
        <ErrorBanner message={successMsg} variant="success" />

        <Card title="Solicitudes pendientes de tomar">
          {loading ? (
            <p>Cargando trámites…</p>
          ) : tramites.length === 0 ? (
            <p>{total === 0 ? 'No hay trámites disponibles en este momento.' : 'No hay trámites en esta página.'}</p>
          ) : (
            <>
              <Table
                columns={[
                  { key: 'id', label: 'ID' },
                  { key: 'requester', label: 'Solicitante' },
                  { key: 'type', label: 'Tipo' },
                  { key: 'description', label: 'Descripción' },
                  { key: 'status', label: 'Estado' },
                  { key: 'createdAt', label: 'Fecha' },
                  { key: 'actions', label: 'Acción' },
                ]}
                rows={tramites.map((t) => ({
                  id: t.id,
                  requester: `${t.requesterFirstName || ''} ${t.requesterLastName || ''}`.trim() || t.requesterEmail,
                  type: t.type,
                  description: t.description || '—',
                  status: STATUS_LABELS[t.status] || t.status,
                  createdAt: formatDate(t.createdAt),
                  actions: t.id,
                  _raw: t,
                }))}
                renderCell={(key, row) => {
                  if (key === 'actions') {
                    const raw = (row as any)._raw as Tramite;
                    const id = row.id as number;
                    const canTake = raw.status === 'PENDIENTE' && !raw.assignedTramitadorId;

                    if (!canTake) {
                      return <span style={{ color: 'var(--on-surface-variant)' }}>No disponible</span>;
                    }

                    return (
                      <Button
                        type="button"
                        onClick={() => handleTake(id)}
                        disabled={takingId === id}
                      >
                        {takingId === id ? 'Tomando…' : 'Tomar trámite'}
                      </Button>
                    );
                  }
                  return String(row[key] ?? '');
                }}
              />
              <Pagination
                page={page}
                pageSize={pageSize}
                total={total}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                disabled={loading || takingId !== null}
              />
            </>
          )}
        </Card>
      </AppShell>
    </AuthGuard>
  );
}
