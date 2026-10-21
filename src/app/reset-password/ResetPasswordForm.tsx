"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from '../../components/auth/login.module.css';
import Button from '../../components/ui/Button';
import httpRequest from '../../services/httpClient';

export default function ResetPasswordForm() {
  const search = useSearchParams();
  const token = search?.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle');
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (!token) setError('Token no proporcionado');
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) { setError('Token faltante'); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); return; }
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return; }
    setStatus('sending'); setError(null);
    try {
      await httpRequest('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, password }) });
      setStatus('ok');
    } catch (err: any) {
      setError(err?.message || 'Error al restablecer la contraseña');
      setStatus('error');
    }
  };

  return (
    <div className={styles.pageAuth}>
      <div className={styles.authCard}>
        <header className={styles.authHeader}>
          <div className={styles.authBrand} aria-hidden>
            <img src="/logo.png" alt="Health Tramiter" />
          </div>
          <div className={styles.title}>Restablecer contraseña</div>
          <div className={styles.subtitle}>Introduce tu nueva contraseña</div>
        </header>

        {status === 'ok' ? (
          <div style={{ padding: '1rem', textAlign: 'center' }}>
            Contraseña restablecida correctamente. <a href="/login">Inicia sesión</a>
          </div>
        ) : (
          <>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className={styles.formLabel}>
                Nueva contraseña
                <input className={styles.input} name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </label>
              <label className={styles.formLabel}>
                Confirmar contraseña
                <input className={styles.input} name="confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
              </label>
              <div className={styles.actions}>
                <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Restablecer'}</Button>
              </div>
            </form>
          </>
        )}

        <footer className={styles.authFooter}>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </footer>
      </div>
    </div>
  );
}
