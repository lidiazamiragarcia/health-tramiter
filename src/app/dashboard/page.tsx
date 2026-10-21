'use client';
import React from 'react';
import Link from 'next/link';
import AuthGuard from '../../components/auth/AuthGuard';
import AppShell from '../../components/layout/AppShell';
import Grid from '../../components/ui/Grid';
import ActionCard from '../../components/ui/ActionCard';
import Card from '../../components/ui/Card';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { canManageTramites, isAdmin } from '../../utils/roles';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { user } = useAuth();
  const admin = isAdmin(user?.role);
  const manager = canManageTramites(user?.role);

  return (
    <AuthGuard>
      <AppShell title="Dashboard">
        <div className={styles.hero}>
          <div className={styles.heroTitle}>
            ¡Bienvenido(a){user?.firstName ? `, ${user.firstName}` : ''}!
          </div>
          <div className={styles.heroSubtitle}>
            {admin
              ? 'Como administrador tienes acceso completo al sistema.'
              : manager
                ? 'Toma trámites de la lista disponible y gestiona los que hayas asignado.'
                : 'Consulta el estado de tus trámites y quién te los está gestionando.'}
          </div>
        </div>

        <section className={styles.section}>
          <Grid>
            {admin ? (
              <>
                <ActionCard title="Gestión de trámites" description="Ver y administrar todos los trámites" icon="📋">
                  <Link href="/tramites/gestion" style={{ fontWeight: 600 }}>Ir a gestión →</Link>
                </ActionCard>
                <ActionCard title="Administración" description="Usuarios, roles y configuración" icon="⚙️">
                  <Link href="/admin" style={{ fontWeight: 600 }}>Ir al panel →</Link>
                </ActionCard>
              </>
            ) : manager ? (
              <>
                <ActionCard title="Trámites disponibles" description="Elige un trámite para tomarlo" icon="📥">
                  <Link href="/tramites/disponibles" style={{ fontWeight: 600 }}>Ver disponibles →</Link>
                </ActionCard>
                <ActionCard title="Mis trámites asignados" description="Gestiona los trámites que has tomado" icon="📋">
                  <Link href="/tramites/gestion" style={{ fontWeight: 600 }}>Ir a gestión →</Link>
                </ActionCard>
                <ActionCard title="Mi perfil" description="Consulta y actualiza tu información" icon="👤">
                  <Link href="/profile" style={{ fontWeight: 600 }}>Ver perfil →</Link>
                </ActionCard>
              </>
            ) : (
              <>
                <ActionCard title="Mis trámites" description="Consulta el estado y tu tramitador asignado" icon="📋">
                  <Link href="/tramites" style={{ fontWeight: 600 }}>Ver mis trámites →</Link>
                </ActionCard>
                <ActionCard title="Nuevo trámite" description="Inicia una nueva solicitud" icon="+">
                  <Link href="/tramites" style={{ fontWeight: 600 }}>Crear trámite →</Link>
                </ActionCard>
                <ActionCard title="Mi perfil" description="Consulta y actualiza tu información" icon="👤">
                  <Link href="/profile" style={{ fontWeight: 600 }}>Ver perfil →</Link>
                </ActionCard>
              </>
            )}
          </Grid>
        </section>

        <section className={styles.section}>
          <Card title="Acceso rápido">
            <p style={{ color: 'var(--on-surface-variant)', margin: 0 }}>
              {admin
                ? 'Como administrador puedes ver todos los trámites y gestionar usuarios y roles.'
                : manager
                  ? 'Como tramitador puedes tomar trámites sin asignar y gestionar solo los que hayas elegido.'
                  : 'Como usuario creas trámites y ves quién te los gestiona cuando un tramitador los toma.'}
            </p>
          </Card>
        </section>
      </AppShell>
    </AuthGuard>
  );
}
