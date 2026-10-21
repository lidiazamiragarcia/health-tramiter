"use client";
import React, { useState } from 'react';
import styles from './login.module.css';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/auth/AuthProvider';
import ErrorBanner from '../ui/ErrorBanner';
import { isAdmin, canManageTramites } from '../../utils/roles';

// Login con autenticación: llama al servicio de auth y persiste token en localStorage.
export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const friendlyMessage = (err: any) => {
    // Network-level error (fetch failed)
    if (!err) return 'Se produjo un error desconocido';
    if (err instanceof TypeError && /failed to fetch/i.test(err.message)) {
      return 'No se pudo conectar con el servidor. Revisa tu conexión e inténtalo de nuevo.';
    }
    const status = err.status || err?.payload?.status;
    if (status === 401) return 'Correo o contraseña incorrectos.';
    if (status === 400) return err?.message || (err?.payload && err.payload.message) || 'Solicitud inválida.';
    // Use payload message if available
    if (err?.payload?.message) return err.payload.message;
    // Default
    return err?.message || 'La solicitud falló. Intente de nuevo más tarde.';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login(email, password);
      // Redirect based on role
      if (user && isAdmin(user.role)) {
        window.location.href = '/admin';
      } else if (user && canManageTramites(user.role)) {
        window.location.href = '/tramites/disponibles';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(friendlyMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageAuth}>
      <div className={styles.authCard}>
        <header className={styles.authHeader}>
          <div className={styles.authBrand} aria-hidden>
            <img src="/logo.png" alt="Health Tramiter" />
          </div>
          <div className={styles.title}>Iniciar sesión</div>
          <div className={styles.subtitle}>Accede a tu cuenta</div>
        </header>

        <ErrorBanner message={error} variant="error" />

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <label className={styles.formLabel}>
            Email
            <input className={styles.input} name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>

          <label className={styles.formLabel}>
            Contraseña
            <input className={styles.input} name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={styles.showPasswordContainer}>
              <input id="show-password" type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
              <label htmlFor="show-password" style={{ fontWeight: 400, margin: 0 }}>Mostrar contraseña</label>
            </div>
            <a href="/recuperar" style={{ fontSize: '0.9rem' }}>¿Olvidaste tu contraseña?</a>
          </div>

          <div className={styles.actions}>
            <Button type="submit" disabled={loading}>{loading ? 'Ingresando...' : 'Ingresar'}</Button>
          </div>
        </form>

        <footer className={styles.authFooter}>
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </footer>
      </div>
    </div>
  );
}

