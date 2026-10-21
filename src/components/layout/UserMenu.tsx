'use client';
import React, { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth/AuthProvider';
import UserAvatar from './UserAvatar';
import styles from './userMenu.module.css';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  if (!user) return null;

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <span className={styles.userName}>{`${user.firstName} ${user.lastName}`}</span>

      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label="Menú de usuario"
      >
        <UserAvatar
          email={user.email}
          title={`${user.firstName} ${user.lastName}`}
        />
      </button>

      {open && (
        <div id={menuId} className={styles.menu} role="menu" aria-label="Opciones de usuario">
          <div className={styles.menuHeader}>
            <UserAvatar email={user.email} size="md" title={`${user.firstName} ${user.lastName}`} />
            <div className={styles.menuIdentity}>
              <span className={styles.menuName}>{user.firstName} {user.lastName}</span>
              <span className={styles.menuEmail}>{user.email}</span>
            </div>
          </div>

          <Link
            href="/profile"
            className={styles.menuItem}
            role="menuitem"
            onClick={() => setOpen(false)}
          >
            Perfil
          </Link>

          <button
            type="button"
            className={`${styles.menuItem} ${styles.menuItemDanger}`}
            role="menuitem"
            onClick={() => {
              setOpen(false);
              logout();
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
