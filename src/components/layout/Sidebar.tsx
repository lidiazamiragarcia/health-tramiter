'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/auth/AuthProvider';
import { isAdmin, canManageTramites } from '../../utils/roles';
import LogoutButton from './LogoutButton';
import styles from './sidebar.module.css';

type NavItem = {
  href: string;
  label: string;
  show: (ctx: { admin: boolean; tramitador: boolean }) => boolean;
};

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', show: () => true },
  { href: '/tramites', label: 'Mis trámites', show: ({ tramitador, admin }) => !tramitador && !admin },
  { href: '/tramites/disponibles', label: 'Trámites disponibles', show: ({ tramitador, admin }) => tramitador && !admin },
  { href: '/tramites/gestion', label: 'Mis trámites asignados', show: ({ tramitador, admin }) => tramitador && !admin },
  { href: '/tramites/gestion', label: 'Gestión de trámites', show: ({ admin }) => admin },
  { href: '/admin', label: 'Administración', show: ({ admin }) => admin },
  { href: '/users', label: 'Usuarios', show: ({ admin }) => admin },
  { href: '/roles', label: 'Roles', show: ({ admin }) => admin },
  { href: '/profile', label: 'Perfil', show: () => true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const admin = isAdmin(user?.role);
  const manager = canManageTramites(user?.role);

  const visibleItems = navItems.filter((item) =>
    item.show({ admin, tramitador: manager && !admin })
  );

  const subtitle = admin
    ? 'Panel administrativo'
    : manager
      ? 'Gestión de trámites'
      : 'Tu salud, tus documentos';

  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <img src="/logo.png" alt="Health Tramiter" className={styles.brandLogo} />
        <div className={styles.brandTitle}>Health Tramiter</div>
        <div className={styles.brandSub}>{subtitle}</div>
      </div>

      <nav className={styles.nav}>
        {visibleItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${active ? styles.linkActive : ''}`}
            >
              {item.label}
            </Link>
          );
        })}

        <div className={styles.spacer}>
          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
}
