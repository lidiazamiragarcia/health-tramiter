'use client';
import React from 'react';
import { useAuth } from '../../contexts/auth/AuthProvider';
import styles from './logoutButton.module.css';

export default function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      type="button"
      className={styles.sidebarBtn}
      onClick={logout}
      aria-label="Cerrar sesión"
    >
      Cerrar sesión
    </button>
  );
}
