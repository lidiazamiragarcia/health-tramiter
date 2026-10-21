'use client';
import React from 'react';
import AuthGuard from '../../../components/auth/AuthGuard';
import AppShell from '../../../components/layout/AppShell';
import Card from '../../../components/ui/Card';
import styles from '../../../components/auth/login.module.css';
import Button from '../../../components/ui/Button';
import pageStyles from '../../../components/layout/appShell.module.css';

export default function CreateTramitePage() {
  return (
    <AuthGuard>
      <AppShell title="Crear trámite">
        <h1 className={pageStyles.pageTitle}>Crear trámite</h1>
        <p className={pageStyles.pageSubtitle}>Completa los campos para crear un nuevo trámite</p>

        <Card>
          <form className={styles.form} noValidate>
            <label className={styles.formLabel}>
              Tipo de trámite
              <input className={styles.input} name="type" />
            </label>
            <label className={styles.formLabel}>
              Solicitante
              <input className={styles.input} name="requester" />
            </label>
            <label className={styles.formLabel}>
              Descripción
              <textarea className={styles.input} name="description" rows={4} />
            </label>
            <div className={styles.actions}>
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </Card>
      </AppShell>
    </AuthGuard>
  );
}
