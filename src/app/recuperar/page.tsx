 "use client";
import React, { useState } from 'react';
import styles from '../../components/auth/login.module.css';
import Button from '../../components/ui/Button';
import httpRequest from '../../services/httpClient';

export default function RecoverPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'ok'|'error'>('idle');
  const [error, setError] = useState<string|null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      await httpRequest('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });
      setStatus('ok');
    } catch (err: any) {
      setError(err?.message || 'Error al solicitar recuperación');
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
          <div className={styles.title}>Recuperar contraseña</div>
          <div className={styles.subtitle}>Te enviaremos un enlace para restablecer tu contraseña</div>
        </header>

        {status === 'ok' ? (
          <div style={{ padding: '1rem', textAlign: 'center' }}>
            Revisa tu correo electrónico para el enlace de recuperación.
            <div style={{ marginTop: 12 }}><a href="/login">Volver al inicio de sesión</a></div>
          </div>
        ) : (
          <>
            {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label className={styles.formLabel}>
                Email
                <input className={styles.input} name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
              <div className={styles.actions}>
                <Button type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Enviando...' : 'Enviar enlace'}</Button>
              </div>
            </form>
          </>
        )}

        <footer className={styles.authFooter}>
          ¿No recuerdas tu email? <a href="/register">Regístrate</a>
        </footer>
      </div>
    </div>
  );
}

